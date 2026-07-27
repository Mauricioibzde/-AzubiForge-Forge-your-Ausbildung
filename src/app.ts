import type { AppContext } from "./appContext";
import { getCourseData } from "./data/courseData";
import { findChapter, isCompleted } from "./domain/course";
import { exportState, importState, loadState, saveState } from "./state/store";
import type { Confidence, CourseFilter, GlossaryFilter, ReadingSize, ReaderTab, RouteName, UiState } from "./types";
import { renderCourseView } from "./views/courseView";
import { renderDocsAiView } from "./views/docsAiView";
import { renderGlossaryView } from "./views/glossaryView";
import { renderHomeView } from "./views/homeView";
import { renderReaderView } from "./views/readerView";
import { renderReviewView } from "./views/reviewView";

export function startApp(): void {
  const app = document.querySelector<HTMLElement>("#app");
  if (!app) throw new Error("Missing #app root element.");

  const data = getCourseData();
  const ctx: AppContext = {
    data,
    state: loadState(data),
    ui: createUiState()
  };

  applyPreferences(ctx);
  registerEvents(app, ctx);
  registerServiceWorker();
  renderRoute(app, ctx);
}

function createUiState(): UiState {
  return {
    courseQuery: "",
    courseFilter: "all",
    glossaryQuery: "",
    glossaryFilter: "all",
    globalQuery: "",
    readerTab: "explain",
    docsAiFocus: "study-plan",
    docsAiChapterId: ""
  };
}

function registerEvents(app: HTMLElement, ctx: AppContext): void {
  window.addEventListener("hashchange", () => renderRoute(app, ctx));
  document.addEventListener("click", (event) => handleClick(event, app, ctx));
  document.addEventListener("input", (event) => handleInput(event, app, ctx));
  document.addEventListener("change", (event) => void handleChange(event, app, ctx));
}

function renderRoute(app: HTMLElement, ctx: AppContext): void {
  const hash = window.location.hash || "#home";
  const [route, id] = hash.replace("#", "").split("/") as [RouteName, string | undefined];

  setActiveNav(route);

  if (route === "course") app.innerHTML = renderCourseView(ctx);
  else if (route === "reader") {
    const chapterId = id || ctx.state.lastChapterId || ctx.data.chapters[0].id;
    ctx.state.lastChapterId = chapterId;
    saveState(ctx.state);
    app.innerHTML = renderReaderView(ctx, chapterId);
  } else if (route === "review") app.innerHTML = renderReviewView(ctx);
  else if (route === "glossary") app.innerHTML = renderGlossaryView(ctx);
  else if (route === "docs-ai") app.innerHTML = renderDocsAiView(ctx);
  else app.innerHTML = renderHomeView(ctx);

  app.focus({ preventScroll: true });
}

function setActiveNav(route: RouteName): void {
  document.querySelectorAll<HTMLElement>("[data-nav]").forEach((link) => {
    const key = link.dataset.nav;
    const isReader = route === "reader" && key === "course";
    link.classList.toggle("active", key === route || isReader);
  });
}

function handleClick(event: MouseEvent, app: HTMLElement, ctx: AppContext): void {
  const target = event.target as Element;
  const themeButton = target.closest("[data-theme-toggle]");
  if (themeButton) {
    toggleTheme(ctx);
    return;
  }

  if (target.closest("[data-print-chapter]")) {
    window.print();
    return;
  }

  if (target.closest("[data-export-progress]")) {
    exportState(ctx.state);
    return;
  }

  if (target.closest("[data-copy-docs-ai]")) {
    copyDocsAiPrompt(app);
    return;
  }

  const tabButton = target.closest<HTMLElement>("[data-reader-tab]");
  if (tabButton) {
    ctx.ui.readerTab = tabButton.dataset.readerTab as ReaderTab;
    renderRoute(app, ctx);
    return;
  }

  const moduleButton = target.closest<HTMLElement>("[data-toggle-module]");
  if (moduleButton?.dataset.toggleModule) {
    const moduleId = moduleButton.dataset.toggleModule;
    ctx.state.collapsedModules[moduleId] = !ctx.state.collapsedModules[moduleId];
    saveState(ctx.state);
    renderRoute(app, ctx);
    return;
  }

  const confidenceButton = target.closest<HTMLElement>("[data-confidence]");
  if (confidenceButton?.dataset.confidenceChapter && confidenceButton.dataset.confidence) {
    setConfidence(ctx, confidenceButton.dataset.confidenceChapter, confidenceButton.dataset.confidence as Confidence);
    renderRoute(app, ctx);
    return;
  }

  const filterButton = target.closest<HTMLElement>("[data-filter-group]");
  if (filterButton?.dataset.filterGroup && filterButton.dataset.filterValue) {
    applyFilter(ctx, filterButton.dataset.filterGroup, filterButton.dataset.filterValue);
    renderRoute(app, ctx);
    return;
  }

  const completeButton = target.closest<HTMLElement>("[data-complete]");
  if (completeButton?.dataset.complete) {
    toggleComplete(ctx, completeButton.dataset.complete);
    renderRoute(app, ctx);
  }
}

function handleInput(event: Event, app: HTMLElement, ctx: AppContext): void {
  const target = event.target as HTMLInputElement | HTMLTextAreaElement;

  if (target.matches("[data-global-search]")) {
    ctx.ui.globalQuery = target.value;
    app.innerHTML = renderHomeView(ctx);
    restoreTextSelection(app, "[data-global-search]", ctx.ui.globalQuery);
    return;
  }

  if (target.matches("[data-course-search]")) {
    ctx.ui.courseQuery = target.value;
    app.innerHTML = renderCourseView(ctx);
    restoreTextSelection(app, "[data-course-search]", ctx.ui.courseQuery);
    return;
  }

  if (target.matches("[data-glossary-search]")) {
    ctx.ui.glossaryQuery = target.value;
    app.innerHTML = renderGlossaryView(ctx);
    restoreTextSelection(app, "[data-glossary-search]", ctx.ui.glossaryQuery);
    return;
  }

  if (target.matches("[data-note]")) {
    ctx.state.notes[target.dataset.note || ""] = target.value;
    saveState(ctx.state);
  }
}

async function handleChange(event: Event, app: HTMLElement, ctx: AppContext): Promise<void> {
  const target = event.target as HTMLInputElement | HTMLSelectElement;

  if (target.matches("[data-docs-ai-chapter]")) {
    ctx.ui.docsAiChapterId = target.value;
    app.innerHTML = renderDocsAiView(ctx);
    return;
  }

  if (!target.matches("[data-import-progress]")) return;
  const input = target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;

  try {
    ctx.state = await importState(file, ctx.data, ctx.state);
    saveState(ctx.state);
    applyPreferences(ctx);
    renderRoute(app, ctx);
  } catch {
    window.alert("Nao foi possivel importar este arquivo JSON.");
  } finally {
    input.value = "";
  }
}

function applyFilter(ctx: AppContext, group: string, value: string): void {
  if (group === "course") ctx.ui.courseFilter = value as CourseFilter;
  if (group === "glossary") ctx.ui.glossaryFilter = value as GlossaryFilter;
  if (group === "docs-ai-focus") ctx.ui.docsAiFocus = value as UiState["docsAiFocus"];
  if (group === "reading-size") {
    ctx.state.preferences.readingSize = value as ReadingSize;
    saveState(ctx.state);
    applyPreferences(ctx);
  }
}

function toggleComplete(ctx: AppContext, chapterId: string): void {
  if (!findChapter(ctx.data, chapterId)) return;

  ctx.state.completed = isCompleted(ctx.state, chapterId)
    ? ctx.state.completed.filter((id) => id !== chapterId)
    : [...ctx.state.completed, chapterId];
  saveState(ctx.state);
}

function setConfidence(ctx: AppContext, chapterId: string, value: Confidence): void {
  if (!findChapter(ctx.data, chapterId)) return;

  ctx.state.confidence[chapterId] = value;
  if (value === "ready" && !isCompleted(ctx.state, chapterId)) {
    ctx.state.completed = [...ctx.state.completed, chapterId];
  }
  saveState(ctx.state);
}

function toggleTheme(ctx: AppContext): void {
  ctx.state.preferences.theme = ctx.state.preferences.theme === "dark" ? "light" : "dark";
  saveState(ctx.state);
  applyPreferences(ctx);
}

function applyPreferences(ctx: AppContext): void {
  document.documentElement.dataset.theme = ctx.state.preferences.theme;
  document.documentElement.dataset.readingSize = ctx.state.preferences.readingSize;

  const themeButton = document.querySelector("[data-theme-toggle]");
  if (themeButton) {
    themeButton.textContent = ctx.state.preferences.theme === "dark" ? "Claro" : "Escuro";
    themeButton.setAttribute(
      "aria-label",
      ctx.state.preferences.theme === "dark" ? "Alternar para tema claro" : "Alternar para tema escuro"
    );
  }
}

function restoreTextSelection(app: HTMLElement, selector: string, value: string): void {
  const input = app.querySelector<HTMLInputElement>(selector);
  if (!input) return;

  input.focus();
  input.setSelectionRange(value.length, value.length);
}

function copyDocsAiPrompt(app: HTMLElement): void {
  const output = app.querySelector<HTMLTextAreaElement>("[data-docs-ai-output]");
  const status = app.querySelector<HTMLElement>("[data-copy-status]");
  if (!output) return;

  copyText(output.value)
    .then(() => {
      if (status) status.textContent = "Prompt copiado. Agora cole no ChatGPT.";
    })
    .catch(() => {
      output.focus();
      output.select();
      if (status) status.textContent = "Nao consegui copiar automaticamente. O texto foi selecionado.";
    });
}

function copyText(value: string): Promise<void> {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(value);
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "true");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();

  try {
    document.execCommand("copy");
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  } finally {
    textarea.remove();
  }
}

function registerServiceWorker(): void {
  if (!("serviceWorker" in navigator) || window.location.protocol === "file:" || import.meta.env.DEV) return;

  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {
      // Offline cache is an enhancement; the app remains usable without it.
    });
  });
}
