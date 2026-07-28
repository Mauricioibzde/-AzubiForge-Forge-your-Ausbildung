import type { AppContext } from "../appContext";
import { findChapter, getChapterModule, getDueReviewItemCount, getResumeTab } from "../domain/course";
import type { RouteName } from "../types";

const ROUTE_TITLES: Record<RouteName, string> = {
  home: "Hoje",
  course: "Trilha",
  reader: "Capitulo",
  review: "Revisao",
  glossary: "Glossario",
  exam: "AP1",
  "docs-ai": "Docs AI"
};

export function syncChrome(ctx: AppContext, route: RouteName, chapterId?: string): void {
  document.body.dataset.route = route;
  setActiveNav(route);
  updateContinueChip(ctx, route);
  updateReviewDueChip(ctx);
  updateTopbarTitle(ctx, route, chapterId);
  updateContextBar(ctx, route, chapterId);
  updateDocumentTitle(ctx, route, chapterId);
  updateConnectivityBanner();
  closeSidebar();
}

export function setActiveNav(route: RouteName): void {
  const activeKey = route === "reader" ? "course" : route;

  document.querySelectorAll<HTMLElement>("[data-nav]").forEach((link) => {
    const key = link.dataset.nav || "";
    const active = key === activeKey || (route === "reader" && key === "course");
    link.classList.toggle("active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
}

export function updateContinueChip(ctx: AppContext, route: RouteName): void {
  const chapter = findChapter(ctx.data, ctx.state.lastChapterId) || ctx.data.chapters[0];
  const hideOnReader = route === "reader";
  const useful = Boolean(chapter) && !hideOnReader;
  const resumeTab = chapter ? getResumeTab(ctx.state, chapter.id) : "explain";
  const href = chapter ? `#reader/${chapter.id}/${resumeTab}` : "#home";
  const label = route === "home" ? `Continuar: ${chapter?.title || "estudo"}` : "Continuar estudo";

  document.querySelectorAll<HTMLAnchorElement>("[data-continue-study]").forEach((chip) => {
    chip.hidden = !useful;
    if (!chapter) return;
    chip.href = href;
    chip.title = chapter.title;

    const textLabel = chip.querySelector<HTMLElement>("[data-continue-label]");
    if (textLabel) textLabel.textContent = label;
    else chip.textContent = label;
  });
}

function updateReviewDueChip(ctx: AppContext): void {
  const dueCount = getDueReviewItemCount(ctx.state);
  document.querySelectorAll<HTMLAnchorElement>("[data-go-review-due]").forEach((chip) => {
    chip.hidden = dueCount <= 0;
    const label = chip.querySelector<HTMLElement>("[data-review-due-label]");
    if (label) label.textContent = dueCount > 0 ? `Revisar hoje (${dueCount})` : "Revisar hoje";
  });
}

function updateTopbarTitle(ctx: AppContext, route: RouteName, chapterId?: string): void {
  const eyebrow = document.querySelector<HTMLElement>("[data-topbar-eyebrow]");
  const title = document.querySelector<HTMLElement>("[data-topbar-title]");
  if (!eyebrow || !title) return;

  if (route === "course") {
    eyebrow.textContent = "Trilha AP1";
    title.textContent = ctx.data.course.title;
    return;
  }

  if (route === "reader" && chapterId) {
    const chapter = findChapter(ctx.data, chapterId);
    const module = chapter ? getChapterModule(ctx.data, chapter.id) : null;
    eyebrow.textContent = module ? `${module.title} · ${module.subtitle}` : "Capitulo";
    title.textContent = chapter?.title || "Capitulo";
    return;
  }

  eyebrow.textContent = "AzubiForge";
  title.textContent = ROUTE_TITLES[route] || "AzubiForge";
}

export function scrollToHomeSection(sectionId: string): void {
  window.requestAnimationFrame(() => {
    const target = document.getElementById(sectionId);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  });
}

export function updateContextBar(ctx: AppContext, route: RouteName, chapterId?: string): void {
  const bar = document.querySelector<HTMLElement>("[data-context-bar]");
  const eyebrow = document.querySelector<HTMLElement>("[data-context-eyebrow]");
  const title = document.querySelector<HTMLElement>("[data-context-title]");
  const back = document.querySelector<HTMLAnchorElement>("[data-context-back]");
  const action = document.querySelector<HTMLAnchorElement>("[data-context-action]");
  if (!bar || !eyebrow || !title || !back || !action) return;

  if (route === "reader" && chapterId) {
    const chapter = findChapter(ctx.data, chapterId) || ctx.data.chapters[0];
    const module = getChapterModule(ctx.data, chapter.id);
    bar.hidden = false;
    eyebrow.textContent = module ? `${module.title} · ${module.subtitle}` : ctx.data.course.title;
    title.textContent = chapter.title;
    back.href = "#course";
    back.textContent = "Trilha";
    action.hidden = false;
    action.href = "#exam";
    action.textContent = "AP1";
    return;
  }

  if (route === "course") {
    bar.hidden = false;
    eyebrow.textContent = "Curso AP1";
    title.textContent = "Trilha de aprendizado";
    back.href = "#home";
    back.textContent = "Hoje";
    action.hidden = true;
    return;
  }

  if (route === "review") {
    bar.hidden = false;
    eyebrow.textContent = "Pratica";
    title.textContent = "Revisao ativa";
    back.href = "#home";
    back.textContent = "Hoje";
    action.hidden = false;
    action.href = "#exam";
    action.textContent = "AP1";
    return;
  }

  if (route === "exam") {
    bar.hidden = false;
    eyebrow.textContent = "Pruefungstraining";
    title.textContent = "Treino para a AP1";
    back.href = "#home";
    back.textContent = "Hoje";
    action.hidden = false;
    action.href = "#review";
    action.textContent = "Revisao";
    return;
  }

  bar.hidden = true;
}

export function openSidebar(): void {
  const backdrop = document.querySelector<HTMLElement>(".sidebar-backdrop");
  document.body.classList.add("sidebar-open");
  if (backdrop) backdrop.hidden = false;
  document.querySelectorAll<HTMLElement>("[data-sidebar-toggle]").forEach((button) => {
    button.setAttribute("aria-expanded", "true");
    button.setAttribute("aria-label", "Fechar menu");
  });
}

export function closeSidebar(): void {
  const backdrop = document.querySelector<HTMLElement>(".sidebar-backdrop");
  document.body.classList.remove("sidebar-open");
  if (backdrop) backdrop.hidden = true;
  document.querySelectorAll<HTMLElement>("[data-sidebar-toggle]").forEach((button) => {
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", "Abrir menu");
  });
}

export function toggleSidebar(): void {
  if (isSidebarOpen()) closeSidebar();
  else openSidebar();
}

export function isSidebarOpen(): boolean {
  return document.body.classList.contains("sidebar-open");
}

/** @deprecated use closeSidebar - kept for gradual migration */
export function closeMoreSheet(): void {
  closeSidebar();
}

/** @deprecated use toggleSidebar */
export function toggleMoreSheet(): void {
  toggleSidebar();
}

/** @deprecated use isSidebarOpen */
export function isMoreSheetOpen(): boolean {
  return isSidebarOpen();
}

export function scrollToPageTop(): void {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function updateDocumentTitle(ctx: AppContext, route: RouteName, chapterId?: string): void {
  if (route === "reader" && chapterId) {
    const chapter = findChapter(ctx.data, chapterId);
    document.title = chapter ? `${chapter.title} · AzubiForge` : "AzubiForge";
    return;
  }
  document.title = `${ROUTE_TITLES[route] || "AzubiForge"} · AzubiForge`;
}

export function updateConnectivityBanner(): void {
  const banner = document.querySelector<HTMLElement>("[data-connectivity-banner]");
  if (!banner) return;
  banner.hidden = navigator.onLine;
}

export function registerConnectivityListeners(): void {
  window.addEventListener("online", updateConnectivityBanner);
  window.addEventListener("offline", updateConnectivityBanner);
  updateConnectivityBanner();
}
