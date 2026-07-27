import type { AppContext } from "../appContext";
import { findChapter, getChapterModule } from "../domain/course";
import type { RouteName } from "../types";

export function syncChrome(ctx: AppContext, route: RouteName, chapterId?: string): void {
  document.body.dataset.route = route;
  setActiveNav(route);
  updateContinueChip(ctx, route);
  updateContextBar(ctx, route, chapterId);
}

export function setActiveNav(route: RouteName): void {
  const activeKey = route === "reader" ? "course" : route;
  const secondaryOpen = route === "glossary" || route === "docs-ai";

  document.querySelectorAll<HTMLElement>("[data-nav]").forEach((link) => {
    const key = link.dataset.nav || "";
    const active = key === activeKey || (route === "reader" && key === "course");
    link.classList.toggle("active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });

  document.querySelectorAll<HTMLElement>("[data-more-nav]").forEach((button) => {
    button.classList.toggle("active", secondaryOpen);
    button.setAttribute("aria-expanded", String(isMoreSheetOpen()));
  });
}

export function updateContinueChip(ctx: AppContext, route: RouteName): void {
  const chip = document.querySelector<HTMLAnchorElement>("[data-continue-study]");
  if (!chip) return;

  const chapter = findChapter(ctx.data, ctx.state.lastChapterId) || ctx.data.chapters[0];
  const hideOnReader = route === "reader";
  const useful = Boolean(chapter) && !hideOnReader;

  chip.hidden = !useful;
  if (!chapter) return;

  chip.href = `#reader/${chapter.id}`;
  chip.textContent = route === "home" ? `Continuar: ${chapter.title}` : "Continuar estudo";
  chip.title = chapter.title;
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
    action.href = "#review";
    action.textContent = "Revisao";
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
    action.href = "#course";
    action.textContent = "Trilha";
    return;
  }

  bar.hidden = true;
}

export function openMoreSheet(): void {
  const sheet = document.querySelector<HTMLElement>("[data-more-sheet]");
  if (!sheet) return;
  sheet.hidden = false;
  document.body.classList.add("more-open");
  document.querySelectorAll<HTMLElement>("[data-more-nav]").forEach((button) => {
    button.setAttribute("aria-expanded", "true");
  });
}

export function closeMoreSheet(): void {
  const sheet = document.querySelector<HTMLElement>("[data-more-sheet]");
  if (!sheet) return;
  sheet.hidden = true;
  document.body.classList.remove("more-open");
  document.querySelectorAll<HTMLElement>("[data-more-nav]").forEach((button) => {
    button.setAttribute("aria-expanded", "false");
    button.classList.toggle("active", document.body.dataset.route === "glossary" || document.body.dataset.route === "docs-ai");
  });
}

export function toggleMoreSheet(): void {
  if (isMoreSheetOpen()) closeMoreSheet();
  else openMoreSheet();
}

export function isMoreSheetOpen(): boolean {
  const sheet = document.querySelector<HTMLElement>("[data-more-sheet]");
  return Boolean(sheet && !sheet.hidden);
}

export function scrollToPageTop(): void {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
