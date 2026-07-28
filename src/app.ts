import type { AppContext } from "./appContext";
import { getCourseData } from "./data/courseData";
import {
  canMarkReady,
  findChapter,
  getChapterExercises,
  getChapterExerciseStats,
  getNextSessionTab,
  getPrevSessionTab,
  getResumeTab,
  markDueReviewResolved,
  scheduleReviewCheck,
  getSessionProgress,
  isCompleted,
  markVisitedStep,
  touchStudied
} from "./domain/course";
import { exportState, importState, loadState, saveState } from "./state/store";
import type {
  Confidence,
  CourseFilter,
  ExamFocusMode,
  ExerciseCheck,
  GlossaryFilter,
  MockExamLength,
  ReadingSize,
  ReaderTab,
  RouteName,
  UiState
} from "./types";
import {
  closeSidebar,
  registerConnectivityListeners,
  scrollToHomeSection,
  scrollToPageTop,
  syncChrome,
  toggleSidebar
} from "./ui/navigation";
import { hydrateIcons } from "./ui/icons";
import { renderCourseView } from "./views/courseView";
import { renderDocsAiView } from "./views/docsAiView";
import { renderExamView } from "./views/examView";
import { renderGlossaryView } from "./views/glossaryView";
import { renderHomeView } from "./views/homeView";
import { renderReaderView } from "./views/readerView";
import { renderReviewView } from "./views/reviewView";
import {
  buildMockExamHistoryEntry,
  createMockExam,
  formatMockExamTimer,
  getMockExamAnsweredCount,
  getMockExamFirstUngradedIndex,
  getMockExamGradedCount,
  getMockExamRemainingMs,
  setMockExamResponse,
  setMockExamSelfCheck
} from "./domain/mockExam";

const READER_TABS: ReaderTab[] = ["explain", "praxis", "vocab", "practice", "ap1"];
const EXAM_MODES: ExamFocusMode[] = ["mock", "weak", "signals", "drill", "checklist", "mistakes"];
let mockExamTimerId: number | null = null;

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
  registerConnectivityListeners();
  registerServiceWorker();
  renderRoute(app, ctx);
  hydrateIcons();
}

function createUiState(): UiState {
  return {
    courseQuery: "",
    courseFilter: "all",
    glossaryQuery: "",
    glossaryFilter: "all",
    globalQuery: "",
    readerTab: "explain",
    readerChapterId: "",
    reviewFocusMode: "flash",
    reviewFocusIndex: 0,
    practiceFilter: "all",
    glossaryWrongOnly: false,
    reviewDeckFilter: "all",
    examDrillWrongOnly: false,
    readerVocabMode: "flash",
    readerVocabIndex: 0,
    readerPracticeMode: "flash",
    readerPracticeIndex: 0,
    glossaryMode: "flash",
    glossaryFocusIndex: 0,
    examFocusMode: "mock",
    examFocusIndex: 0,
    completeGateChapterId: "",
    confidenceGateChapterId: "",
    confidenceGateMessage: "",
    docsAiFocus: "study-plan",
    docsAiChapterId: ""
  };
}

function registerEvents(app: HTMLElement, ctx: AppContext): void {
  window.addEventListener("hashchange", () => renderRoute(app, ctx));
  document.addEventListener("click", (event) => handleClick(event, app, ctx));
  document.addEventListener("input", (event) => handleInput(event, app, ctx));
  document.addEventListener("change", (event) => void handleChange(event, app, ctx));
  document.addEventListener("keydown", (event) => handleKeydown(event, app, ctx));
  registerSwipe(app, ctx);
}

function renderRoute(app: HTMLElement, ctx: AppContext): void {
  const hash = window.location.hash || "#home";
  const [route, id, tab] = hash.replace("#", "").split("/") as [RouteName, string | undefined, string | undefined];
  const previousRoute = document.body.dataset.route as RouteName | undefined;

  closeSidebar();

  if (expireActiveMockIfNeeded(ctx) && route !== "exam") {
    // Time ran out while away from exam; keep going to the requested route.
  }

  let chapterId: string | undefined;
  if (route === "course") app.innerHTML = renderCourseView(ctx);
  else if (route === "reader") {
    chapterId = id || ctx.state.lastChapterId || ctx.data.chapters[0].id;
    const chapterChanged = ctx.ui.readerChapterId !== chapterId;
    if (chapterChanged) {
      ctx.ui.readerChapterId = chapterId;
      ctx.ui.readerTab = getResumeTab(ctx.state, chapterId);
      ctx.ui.completeGateChapterId = "";
      ctx.ui.confidenceGateChapterId = "";
      ctx.ui.confidenceGateMessage = "";
      ctx.ui.readerVocabIndex = 0;
      ctx.ui.readerPracticeIndex = 0;
    }
    if (tab && READER_TABS.includes(tab as ReaderTab)) {
      ctx.ui.readerTab = tab as ReaderTab;
    }
    setReaderHash(chapterId, ctx.ui.readerTab);
    ctx.state.lastChapterId = chapterId;
    markVisitedStep(ctx.state, chapterId, ctx.ui.readerTab);
    touchStudied(ctx.state, chapterId);
    saveState(ctx.state);
    app.innerHTML = renderReaderView(ctx, chapterId);
  } else if (route === "review") app.innerHTML = renderReviewView(ctx);
  else if (route === "glossary") app.innerHTML = renderGlossaryView(ctx);
  else if (route === "exam") {
    if (id && EXAM_MODES.includes(id as ExamFocusMode)) {
      ctx.ui.examFocusMode = id as ExamFocusMode;
    }
    setExamHash(ctx.ui.examFocusMode);
    app.innerHTML = renderExamView(ctx);
  } else if (route === "docs-ai") app.innerHTML = renderDocsAiView(ctx);
  else app.innerHTML = renderHomeView(ctx);

  syncChrome(ctx, route || "home", chapterId);
  app.focus({ preventScroll: true });

  if (route === "home" && id === "progress") scrollToHomeSection("dashboard-progress");

  hydrateIcons(app);
  hydrateIcons(document.body);

  if (previousRoute && previousRoute !== route) scrollToPageTop();
  maybeScrollReaderStep(route);
  maybeScrollMockPill(route || "home", ctx);
  syncMockExamTimer(app, ctx);
}

function maybeScrollReaderStep(route: RouteName): void {
  if (route !== "reader") return;
  window.requestAnimationFrame(() => {
    const content = document.querySelector<HTMLElement>("#session-content")
      || document.querySelector<HTMLElement>(".article-body");
    if (!content) return;
    const top = content.getBoundingClientRect().top + window.scrollY - 96;
    if (window.scrollY > top + 40 || window.scrollY < top - 160) {
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    }
  });
}

function maybeScrollMockPill(route: RouteName, ctx: AppContext): void {
  if (route !== "exam" || ctx.ui.examFocusMode !== "mock") return;
  if (!ctx.state.mockExam || ctx.state.mockExam.status === "finished") return;
  window.requestAnimationFrame(() => {
    document.querySelector<HTMLElement>(".mock-q-pill.active")?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest"
    });
  });
}

function setReaderHash(chapterId: string, tab: ReaderTab): void {
  const next = `#reader/${chapterId}/${tab}`;
  if (window.location.hash !== next) {
    history.replaceState(null, "", next);
  }
}

function setExamHash(mode: ExamFocusMode): void {
  const next = `#exam/${mode}`;
  if (window.location.hash !== next) {
    history.replaceState(null, "", next);
  }
}

function expireActiveMockIfNeeded(ctx: AppContext): boolean {
  const attempt = ctx.state.mockExam;
  if (!attempt || attempt.status !== "active") return false;
  if (getMockExamRemainingMs(attempt) > 0) return false;
  submitMockExam(ctx);
  return true;
}

function handleClick(event: MouseEvent, app: HTMLElement, ctx: AppContext): void {
  const target = event.target as Element;

  if (target.closest("[data-go-exam-mock]")) {
    ctx.ui.examFocusMode = "mock";
    setExamHash("mock");
    // hash navigation continues for <a href="#exam/mock">
  }

  if (target.closest("[data-go-review-due]")) {
    event.preventDefault();
    ctx.ui.reviewDeckFilter = "due";
    ctx.ui.reviewFocusIndex = 0;
    if ((window.location.hash.replace("#", "").split("/")[0] || "") !== "review") {
      window.location.hash = "#review";
    } else {
      renderRoute(app, ctx);
    }
    return;
  }

  if (target.closest("[data-review-mistakes]")) {
    event.preventDefault();
    ctx.ui.examFocusMode = "mistakes";
    ctx.ui.examFocusIndex = 0;
    setExamHash("mistakes");
    if ((window.location.hash.replace("#", "").split("/")[0] || "") !== "exam") {
      window.location.hash = "#exam/mistakes";
    } else {
      renderRoute(app, ctx);
    }
    return;
  }

  if (target.closest("[data-drill-mistakes]")) {
    event.preventDefault();
    ctx.ui.examFocusMode = "mistakes";
    ctx.ui.examFocusIndex = 0;
    setExamHash("mistakes");
    if ((window.location.hash.replace("#", "").split("/")[0] || "") !== "exam") {
      window.location.hash = "#exam/mistakes";
    } else {
      renderRoute(app, ctx);
    }
    return;
  }

  if (target.closest("[data-sidebar-toggle]")) {
    toggleSidebar();
    return;
  }

  if (target.closest("[data-sidebar-close]")) {
    closeSidebar();
    // allow hash links inside the sidebar to continue navigating
  }

  if (target.closest("[data-dismiss-onboarding]")) {
    ctx.state.preferences.onboardingDone = true;
    saveState(ctx.state);
    renderRoute(app, ctx);
    return;
  }

  if (target.closest("[data-edit-study-goal]")) {
    const current = ctx.state.preferences.studyGoal;
    const next = window.prompt("Seu objetivo de estudo:", current);
    if (next !== null) {
      const trimmed = next.trim();
      if (trimmed) {
        ctx.state.preferences.studyGoal = trimmed.slice(0, 240);
        saveState(ctx.state);
        renderRoute(app, ctx);
      }
    }
    return;
  }

  if (target.closest("[data-toggle-offline-tools]")) {
    const panel = app.querySelector<HTMLDetailsElement>("[data-offline-tools]");
    if (panel) {
      panel.hidden = false;
      panel.open = true;
      panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
    return;
  }

  const courseFilterLink = target.closest<HTMLElement>("[data-course-filter]");
  if (courseFilterLink?.dataset.courseFilter) {
    const nextFilter = courseFilterLink.dataset.courseFilter as CourseFilter;
    if (["all", "open", "done", "notes", "hard"].includes(nextFilter)) {
      ctx.ui.courseFilter = nextFilter;
    }
  }

  const goalButton = target.closest<HTMLElement>("[data-daily-goal]");
  if (goalButton?.dataset.dailyGoal) {
    const next = Number(goalButton.dataset.dailyGoal);
    if (Number.isFinite(next) && next >= 1 && next <= 5) {
      ctx.state.preferences.dailyGoalSessions = next;
      saveState(ctx.state);
      renderRoute(app, ctx);
    }
    return;
  }

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

  const nextButton = target.closest<HTMLElement>("[data-session-next]");
  if (nextButton?.dataset.nextTab) {
    const nextTab = nextButton.dataset.nextTab as ReaderTab;
    const chapterId = nextButton.dataset.sessionNext || ctx.ui.readerChapterId || ctx.state.lastChapterId;
    ctx.ui.readerTab = nextTab;
    if (chapterId) setReaderHash(chapterId, nextTab);
    renderRoute(app, ctx);
    return;
  }

  const reviewStep = target.closest<HTMLElement>("[data-review-step]");
  if (reviewStep?.dataset.reviewStep) {
    ctx.ui.reviewFocusIndex += Number(reviewStep.dataset.reviewStep);
    renderRoute(app, ctx);
    return;
  }

  const glossaryStep = target.closest<HTMLElement>("[data-glossary-step]");
  if (glossaryStep?.dataset.glossaryStep) {
    ctx.ui.glossaryFocusIndex += Number(glossaryStep.dataset.glossaryStep);
    renderRoute(app, ctx);
    return;
  }

  const readerVocabStep = target.closest<HTMLElement>("[data-reader-vocab-step]");
  if (readerVocabStep?.dataset.readerVocabStep) {
    ctx.ui.readerVocabIndex += Number(readerVocabStep.dataset.readerVocabStep);
    renderRoute(app, ctx);
    return;
  }

  const readerPracticeStep = target.closest<HTMLElement>("[data-reader-practice-step]");
  if (readerPracticeStep?.dataset.readerPracticeStep) {
    ctx.ui.readerPracticeIndex += Number(readerPracticeStep.dataset.readerPracticeStep);
    renderRoute(app, ctx);
    return;
  }

  const resetSession = target.closest<HTMLElement>("[data-reset-session]");
  if (resetSession?.dataset.resetSession) {
    const chapterId = resetSession.dataset.resetSession;
    delete ctx.state.sessionSteps[chapterId];
    ctx.ui.readerTab = "explain";
    ctx.ui.readerVocabIndex = 0;
    ctx.ui.readerPracticeIndex = 0;
    ctx.ui.completeGateChapterId = "";
    setReaderHash(chapterId, "explain");
    saveState(ctx.state);
    renderRoute(app, ctx);
    return;
  }

  const examStep = target.closest<HTMLElement>("[data-exam-step]");
  if (examStep?.dataset.examStep) {
    ctx.ui.examFocusIndex += Number(examStep.dataset.examStep);
    renderRoute(app, ctx);
    return;
  }

  const exerciseCheck = target.closest<HTMLElement>("[data-exercise-check]");
  if (exerciseCheck?.dataset.exerciseCheck && exerciseCheck.dataset.checkKey) {
    setExerciseCheck(
      ctx,
      exerciseCheck.dataset.checkKey,
      exerciseCheck.dataset.exerciseCheck as ExerciseCheck,
      exerciseCheck.dataset.checkChapter || ""
    );
    maybeAutoAdvance(ctx, exerciseCheck.dataset.autoAdvance);
    renderRoute(app, ctx);
    return;
  }

  const vocabCheck = target.closest<HTMLElement>("[data-vocab-check]");
  if (vocabCheck?.dataset.vocabCheck && vocabCheck.dataset.checkKey) {
    setVocabCheck(
      ctx,
      vocabCheck.dataset.checkKey,
      vocabCheck.dataset.vocabCheck as ExerciseCheck,
      vocabCheck.dataset.checkChapter || ""
    );
    maybeAutoAdvance(ctx, vocabCheck.dataset.autoAdvance);
    renderRoute(app, ctx);
    return;
  }

  const wrongPractice = target.closest<HTMLElement>("[data-show-wrong-practice]");
  if (wrongPractice) {
    ctx.ui.readerTab = "practice";
    ctx.ui.practiceFilter = "wrong";
    ctx.ui.readerPracticeMode = "flash";
    ctx.ui.readerPracticeIndex = 0;
    const chapterId = wrongPractice.dataset.showWrongPractice || ctx.ui.readerChapterId || ctx.state.lastChapterId;
    if (chapterId) setReaderHash(chapterId, "practice");
    renderRoute(app, ctx);
    return;
  }

  const tabButton = target.closest<HTMLElement>("[data-reader-tab]");
  if (tabButton) {
    const nextTab = tabButton.dataset.readerTab as ReaderTab;
    if (nextTab !== ctx.ui.readerTab) {
      ctx.ui.readerVocabIndex = 0;
      ctx.ui.readerPracticeIndex = 0;
    }
    ctx.ui.readerTab = nextTab;
    if (ctx.ui.readerTab !== "practice") ctx.ui.practiceFilter = "all";
    const chapterId = tabButton.dataset.readerChapter || ctx.ui.readerChapterId || ctx.state.lastChapterId;
    if (chapterId) setReaderHash(chapterId, nextTab);
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

  const confidenceGateCancel = target.closest<HTMLElement>("[data-confidence-gate-cancel]");
  if (confidenceGateCancel) {
    ctx.ui.confidenceGateChapterId = "";
    ctx.ui.confidenceGateMessage = "";
    renderRoute(app, ctx);
    return;
  }

  const filterButton = target.closest<HTMLElement>("[data-filter-group]");
  if (filterButton?.dataset.filterGroup && filterButton.dataset.filterValue) {
    applyFilter(ctx, filterButton.dataset.filterGroup, filterButton.dataset.filterValue);
    renderRoute(app, ctx);
    return;
  }

  const cancelComplete = target.closest<HTMLElement>("[data-complete-cancel]");
  if (cancelComplete?.dataset.completeCancel) {
    ctx.ui.completeGateChapterId = "";
    renderRoute(app, ctx);
    return;
  }

  const completeButton = target.closest<HTMLElement>("[data-complete]");
  if (completeButton?.dataset.complete) {
    toggleComplete(ctx, completeButton.dataset.complete, completeButton.dataset.completeConfirm === "true");
    renderRoute(app, ctx);
    return;
  }

  const checklistItem = target.closest<HTMLElement>("[data-exam-checklist]");
  if (checklistItem?.dataset.examChecklist !== undefined) {
    const key = checklistItem.dataset.examChecklist;
    ctx.state.examChecklist[key] = !ctx.state.examChecklist[key];
    saveState(ctx.state);
    renderRoute(app, ctx);
    return;
  }

  if (handleMockExamClick(event, app, ctx, target)) return;
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

  if (target.matches("[data-mock-notes]") && ctx.state.mockExam) {
    const questionId = target.dataset.mockNotes || "";
    const answered = Boolean(target.value.trim()) || Boolean(ctx.state.mockExam.responses[questionId]?.answered);
    ctx.state.mockExam = setMockExamResponse(ctx.state.mockExam, questionId, {
      notes: target.value,
      answered
    });
    saveState(ctx.state);
    syncMockAnsweredUi(app, ctx, questionId, answered);
  }
}

function syncMockAnsweredUi(
  app: HTMLElement,
  ctx: AppContext,
  questionId: string,
  answered: boolean
): void {
  const attempt = ctx.state.mockExam;
  if (!attempt) return;
  const total = attempt.questions.length;
  const answeredCount = getMockExamAnsweredCount(attempt);
  const countNote = app.querySelector<HTMLElement>(".mock-runner-bar .small-note");
  if (countNote) countNote.textContent = `${answeredCount}/${total} marcadas como respondidas`;

  const questionIndex = attempt.questions.findIndex((item) => item.id === questionId);
  if (questionIndex >= 0) {
    const pill = app.querySelector<HTMLElement>(`.mock-q-pill[data-mock-goto="${questionIndex}"]`);
    pill?.classList.toggle("answered", answered);
  }

  const answeredButton = app.querySelector<HTMLElement>(`[data-mock-answered="${questionId.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"]`);
  if (answeredButton) {
    answeredButton.classList.toggle("active-check", answered);
    answeredButton.textContent = answered ? "Respondida" : "Marcar como respondida";
  }

  const jump = app.querySelector<HTMLElement>("[data-mock-jump-unanswered]");
  if (jump) {
    const remaining = total - answeredCount;
    if (remaining <= 0) jump.remove();
    else jump.textContent = `Ir para a primeira sem resposta (${remaining})`;
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
  if (group === "review-focus") {
    ctx.ui.reviewFocusMode = value as UiState["reviewFocusMode"];
    ctx.ui.reviewFocusIndex = 0;
  }
  if (group === "glossary-wrong") {
    ctx.ui.glossaryWrongOnly = value === "wrong";
    ctx.ui.glossaryFocusIndex = 0;
  }
  if (group === "review-wrong") {
    const next = value as UiState["reviewDeckFilter"];
    ctx.ui.reviewDeckFilter = next === "wrong" || next === "due" ? next : "all";
    ctx.ui.reviewFocusIndex = 0;
  }
  if (group === "exam-drill-wrong") {
    ctx.ui.examDrillWrongOnly = value === "wrong";
    ctx.ui.examFocusIndex = 0;
  }
  if (group === "reader-vocab-mode") {
    ctx.ui.readerVocabMode = value as UiState["readerVocabMode"];
    ctx.ui.readerVocabIndex = 0;
  }
  if (group === "reader-practice-mode") {
    ctx.ui.readerPracticeMode = value as UiState["readerPracticeMode"];
    ctx.ui.readerPracticeIndex = 0;
  }
  if (group === "practice-filter") {
    ctx.ui.practiceFilter = value as UiState["practiceFilter"];
    ctx.ui.readerPracticeIndex = 0;
  }
  if (group === "glossary-mode") {
    ctx.ui.glossaryMode = value as UiState["glossaryMode"];
    ctx.ui.glossaryFocusIndex = 0;
  }
  if (group === "exam-focus") {
    ctx.ui.examFocusMode = value as ExamFocusMode;
    ctx.ui.examFocusIndex = 0;
    setExamHash(ctx.ui.examFocusMode);
  }
  if (group === "reading-size") {
    ctx.state.preferences.readingSize = value as ReadingSize;
    saveState(ctx.state);
    applyPreferences(ctx);
  }
}

function maybeAutoAdvance(ctx: AppContext, target?: string): void {
  if (target === "review") ctx.ui.reviewFocusIndex += 1;
  if (target === "glossary") ctx.ui.glossaryFocusIndex += 1;
  if (target === "exam") ctx.ui.examFocusIndex += 1;
  if (target === "reader-vocab") ctx.ui.readerVocabIndex += 1;
  if (target === "reader-practice") ctx.ui.readerPracticeIndex += 1;
}

function handleKeydown(event: KeyboardEvent, app: HTMLElement, ctx: AppContext): void {
  if (event.key === "Escape") {
    closeSidebar();
    return;
  }

  const route = (window.location.hash.replace("#", "").split("/")[0] || "home") as RouteName;
  const tag = (event.target as HTMLElement | null)?.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

  if (handleFlashHotkeys(event, app, ctx, route)) return;

  if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
  const delta = event.key === "ArrowRight" ? 1 : -1;

  if (route === "review") {
    event.preventDefault();
    ctx.ui.reviewFocusIndex += delta;
    renderRoute(app, ctx);
    return;
  }

  if (route === "glossary" && ctx.ui.glossaryMode === "flash") {
    event.preventDefault();
    ctx.ui.glossaryFocusIndex += delta;
    renderRoute(app, ctx);
    return;
  }

  if (route === "exam" && (ctx.ui.examFocusMode === "signals" || ctx.ui.examFocusMode === "drill" || ctx.ui.examFocusMode === "mistakes")) {
    event.preventDefault();
    ctx.ui.examFocusIndex += delta;
    renderRoute(app, ctx);
    return;
  }

  if (route === "exam" && ctx.ui.examFocusMode === "mock" && ctx.state.mockExam && ctx.state.mockExam.status !== "finished") {
    event.preventDefault();
    const attempt = ctx.state.mockExam;
    const next = Math.max(0, Math.min(attempt.questions.length - 1, attempt.currentIndex + delta));
    if (next !== attempt.currentIndex) {
      ctx.state.mockExam = { ...attempt, currentIndex: next };
      saveState(ctx.state);
      renderRoute(app, ctx);
    }
    return;
  }

  if (route === "reader") {
    event.preventDefault();
    if (ctx.ui.readerTab === "vocab" && ctx.ui.readerVocabMode === "flash") {
      ctx.ui.readerVocabIndex += delta;
      renderRoute(app, ctx);
      return;
    }
    if (ctx.ui.readerTab === "practice" && ctx.ui.readerPracticeMode === "flash") {
      ctx.ui.readerPracticeIndex += delta;
      renderRoute(app, ctx);
      return;
    }
    const chapterId = ctx.ui.readerChapterId || ctx.state.lastChapterId;
    if (!chapterId) return;
    if (delta > 0) {
      const nextTab = getNextSessionTab(ctx.state, chapterId, ctx.ui.readerTab);
      if (!nextTab) return;
      ctx.ui.readerTab = nextTab;
      setReaderHash(chapterId, nextTab);
    } else {
      const prevTab = getPrevSessionTab(ctx.ui.readerTab);
      if (!prevTab) return;
      ctx.ui.readerTab = prevTab;
      setReaderHash(chapterId, prevTab);
    }
    renderRoute(app, ctx);
  }
}

function isFlashHotkeyRoute(ctx: AppContext, route: RouteName): boolean {
  if (route === "review") return true;
  if (route === "glossary" && ctx.ui.glossaryMode === "flash") return true;
  if (route === "exam" && (ctx.ui.examFocusMode === "drill" || ctx.ui.examFocusMode === "signals" || ctx.ui.examFocusMode === "mistakes")) {
    return true;
  }
  if (route === "exam" && ctx.ui.examFocusMode === "mock" && ctx.state.mockExam?.status === "grading") return true;
  if (route === "reader" && ctx.ui.readerTab === "vocab" && ctx.ui.readerVocabMode === "flash") return true;
  if (route === "reader" && ctx.ui.readerTab === "practice" && ctx.ui.readerPracticeMode === "flash") return true;
  return false;
}

function handleFlashHotkeys(event: KeyboardEvent, _app: HTMLElement, ctx: AppContext, route: RouteName): boolean {
  if (!isFlashHotkeyRoute(ctx, route)) return false;

  if (event.key === " " || event.code === "Space") {
    const details = document.querySelector<HTMLDetailsElement>(
      ".focus-stage details.focus-reveal, .mock-question-card details.focus-reveal"
    ) || document.querySelector<HTMLDetailsElement>(".focus-stage details.focus-reveal");
    if (!details) return false;
    event.preventDefault();
    details.open = !details.open;
    return true;
  }

  if (event.key === "1" || event.key === "2") {
    const value = event.key === "1" ? "correct" : "wrong";
    const mockGrade = document.querySelector<HTMLElement>(
      `.mock-question-card [data-mock-grade="${value}"], .focus-stage [data-mock-grade="${value}"]`
    );
    if (mockGrade) {
      event.preventDefault();
      mockGrade.click();
      return true;
    }
    const button = document.querySelector<HTMLElement>(
      `.focus-stage [data-exercise-check="${value}"], .focus-stage [data-vocab-check="${value}"]`
    );
    if (!button) return false;
    event.preventDefault();
    button.click();
    return true;
  }

  return false;
}

function registerSwipe(app: HTMLElement, ctx: AppContext): void {
  let startX = 0;
  let startY = 0;
  let tracking = false;
  let mode: "deck" | "tabs" | null = null;

  document.addEventListener("touchstart", (event) => {
    const target = event.target as Element | null;
    const deck = target?.closest("[data-swipe-deck]");
    const tabs = target?.closest("[data-swipe-tabs]");
    if (!deck && !tabs) return;
    const touch = event.changedTouches[0];
    startX = touch.clientX;
    startY = touch.clientY;
    tracking = true;
    mode = deck ? "deck" : "tabs";
  }, { passive: true });

  document.addEventListener("touchend", (event) => {
    if (!tracking || !mode) return;
    tracking = false;
    const target = event.target as Element | null;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - startX;
    const dy = touch.clientY - startY;
    if (Math.abs(dx) < 56 || Math.abs(dx) < Math.abs(dy)) {
      mode = null;
      return;
    }

    const delta = dx < 0 ? 1 : -1;

    if (mode === "tabs") {
      mode = null;
      if (!target?.closest("[data-swipe-tabs]")) return;
      const currentIndex = READER_TABS.indexOf(ctx.ui.readerTab);
      if (currentIndex < 0) return;
      const nextIndex = Math.max(0, Math.min(READER_TABS.length - 1, currentIndex + delta));
      if (nextIndex === currentIndex) return;
      ctx.ui.readerTab = READER_TABS[nextIndex];
      ctx.ui.readerVocabIndex = 0;
      ctx.ui.readerPracticeIndex = 0;
      if (ctx.ui.readerTab !== "practice") ctx.ui.practiceFilter = "all";
      const chapterId = ctx.ui.readerChapterId || ctx.state.lastChapterId;
      if (chapterId) setReaderHash(chapterId, ctx.ui.readerTab);
      renderRoute(app, ctx);
      return;
    }

    const deck = target?.closest<HTMLElement>("[data-swipe-deck]");
    mode = null;
    if (!deck) return;

    if (deck.dataset.swipeDeck === "review") ctx.ui.reviewFocusIndex += delta;
    if (deck.dataset.swipeDeck === "glossary") ctx.ui.glossaryFocusIndex += delta;
    if (deck.dataset.swipeDeck === "exam") ctx.ui.examFocusIndex += delta;
    if (deck.dataset.swipeDeck === "reader-vocab") ctx.ui.readerVocabIndex += delta;
    if (deck.dataset.swipeDeck === "reader-practice") ctx.ui.readerPracticeIndex += delta;
    if (deck.dataset.swipeDeck === "mock" && ctx.state.mockExam && ctx.state.mockExam.status !== "finished") {
      const attempt = ctx.state.mockExam;
      const next = Math.max(0, Math.min(attempt.questions.length - 1, attempt.currentIndex + delta));
      if (next !== attempt.currentIndex) {
        ctx.state.mockExam = { ...attempt, currentIndex: next };
        saveState(ctx.state);
      }
    }
    renderRoute(app, ctx);
  }, { passive: true });
}

function setExerciseCheck(
  ctx: AppContext,
  key: string,
  value: ExerciseCheck,
  chapterId: string
): void {
  const previous = ctx.state.exerciseChecks[key];
  markDueReviewResolved(ctx.state, key, value, previous);
  ctx.state.exerciseChecks[key] = value;
  scheduleReviewCheck(ctx.state, key, value, previous);
  if (chapterId && findChapter(ctx.data, chapterId)) {
    touchStudied(ctx.state, chapterId);
    if (value === "wrong") {
      const current = ctx.state.confidence[chapterId];
      if (current !== "hard") ctx.state.confidence[chapterId] = "review";
    }
  }
  saveState(ctx.state);
}

function setVocabCheck(
  ctx: AppContext,
  key: string,
  value: ExerciseCheck,
  chapterId: string
): void {
  const previous = ctx.state.vocabChecks[key];
  markDueReviewResolved(ctx.state, key, value, previous);
  ctx.state.vocabChecks[key] = value;
  scheduleReviewCheck(ctx.state, key, value, previous);
  if (chapterId && findChapter(ctx.data, chapterId)) {
    touchStudied(ctx.state, chapterId);
    if (value === "wrong") {
      const current = ctx.state.confidence[chapterId];
      if (current !== "hard") ctx.state.confidence[chapterId] = "review";
    }
  }
  saveState(ctx.state);
}

function handleMockExamClick(event: MouseEvent, app: HTMLElement, ctx: AppContext, target: Element): boolean {
  const start = target.closest<HTMLElement>("[data-mock-start]");
  if (start?.dataset.mockStart) {
    event.preventDefault();
    ctx.ui.examFocusMode = "mock";
    ctx.state.mockExam = createMockExam(ctx.data, start.dataset.mockStart as MockExamLength);
    saveState(ctx.state);
    renderRoute(app, ctx);
    return true;
  }

  const step = target.closest<HTMLElement>("[data-mock-step]");
  if (step?.dataset.mockStep && ctx.state.mockExam) {
    const delta = Number(step.dataset.mockStep);
    const attempt = ctx.state.mockExam;
    ctx.state.mockExam = {
      ...attempt,
      currentIndex: Math.max(0, Math.min(attempt.questions.length - 1, attempt.currentIndex + delta))
    };
    saveState(ctx.state);
    renderRoute(app, ctx);
    return true;
  }

  const goTo = target.closest<HTMLElement>("[data-mock-goto]");
  if (goTo?.dataset.mockGoto !== undefined && ctx.state.mockExam) {
    const index = Number(goTo.dataset.mockGoto);
    if (Number.isFinite(index)) {
      ctx.state.mockExam = {
        ...ctx.state.mockExam,
        currentIndex: Math.max(0, Math.min(ctx.state.mockExam.questions.length - 1, index))
      };
      saveState(ctx.state);
      renderRoute(app, ctx);
    }
    return true;
  }

  if (target.closest("[data-mock-jump-unanswered]") && ctx.state.mockExam) {
    const attempt = ctx.state.mockExam;
    const unanswered = attempt.questions.findIndex((item) => !attempt.responses[item.id]?.answered);
    if (unanswered >= 0) {
      ctx.state.mockExam = { ...attempt, currentIndex: unanswered };
      saveState(ctx.state);
      renderRoute(app, ctx);
    }
    return true;
  }

  if (target.closest("[data-mock-jump-ungraded]") && ctx.state.mockExam) {
    const attempt = ctx.state.mockExam;
    const ungraded = getMockExamFirstUngradedIndex(attempt);
    if (ungraded >= 0) {
      ctx.state.mockExam = { ...attempt, currentIndex: ungraded };
      saveState(ctx.state);
      renderRoute(app, ctx);
    }
    return true;
  }

  const answered = target.closest<HTMLElement>("[data-mock-answered]");
  if (answered?.dataset.mockAnswered && ctx.state.mockExam) {
    const questionId = answered.dataset.mockAnswered;
    const current = Boolean(ctx.state.mockExam.responses[questionId]?.answered);
    ctx.state.mockExam = setMockExamResponse(ctx.state.mockExam, questionId, { answered: !current });
    saveState(ctx.state);
    renderRoute(app, ctx);
    return true;
  }

  const grade = target.closest<HTMLElement>("[data-mock-grade]");
  if (grade?.dataset.mockGrade && grade.dataset.mockQuestion && ctx.state.mockExam) {
    ctx.state.mockExam = setMockExamSelfCheck(
      ctx.state.mockExam,
      grade.dataset.mockQuestion,
      grade.dataset.mockGrade as ExerciseCheck
    );
    const question = ctx.state.mockExam.questions.find((item) => item.id === grade.dataset.mockQuestion);
    if (question) {
      const key = `mock:${question.chapterId}:${question.id}`;
      ctx.state.exerciseChecks[key] = grade.dataset.mockGrade as ExerciseCheck;
      const drillKey = `exam:${question.chapterId}:${question.style}:${question.question}`;
      ctx.state.exerciseChecks[drillKey] = grade.dataset.mockGrade as ExerciseCheck;
      if (grade.dataset.mockGrade === "wrong") {
        const current = ctx.state.confidence[question.chapterId];
        if (current !== "hard") ctx.state.confidence[question.chapterId] = "review";
      }
    }
    const attempt = ctx.state.mockExam;
    if (attempt.status === "grading" && attempt.currentIndex < attempt.questions.length - 1) {
      ctx.state.mockExam = { ...attempt, currentIndex: attempt.currentIndex + 1 };
    } else if (ctx.ui.examFocusMode === "mistakes" && grade.dataset.mockGrade === "correct") {
      // Stay on same index; list shrinks so next wrong appears here.
      ctx.ui.examFocusIndex = Math.max(0, ctx.ui.examFocusIndex);
    } else if (ctx.ui.examFocusMode === "mistakes") {
      ctx.ui.examFocusIndex += 1;
    }
    saveState(ctx.state);
    renderRoute(app, ctx);
    return true;
  }

  if (target.closest("[data-mock-submit]") && ctx.state.mockExam) {
    const attempt = ctx.state.mockExam;
    if (attempt.status === "active") {
      const answered = getMockExamAnsweredCount(attempt);
      const remaining = attempt.questions.length - answered;
      if (remaining > 0) {
        const confirmed = window.confirm(
          `Ainda faltam ${remaining} pergunta(s) sem marcar como respondida. Entregar mesmo assim?`
        );
        if (!confirmed) return true;
      }
    }
    submitMockExam(ctx);
    renderRoute(app, ctx);
    return true;
  }

  if (target.closest("[data-mock-finish]") && ctx.state.mockExam) {
    const attempt = ctx.state.mockExam;
    if (attempt.status === "grading") {
      const graded = getMockExamGradedCount(attempt);
      const remaining = attempt.questions.length - graded;
      if (remaining > 0) {
        const confirmed = window.confirm(
          `Ainda faltam ${remaining} pergunta(s) sem correcao. Calcular resultado mesmo assim?`
        );
        if (!confirmed) return true;
      }
    }
    finishMockExam(ctx);
    renderRoute(app, ctx);
    return true;
  }

  if (target.closest("[data-mock-clear]")) {
    ctx.state.mockExam = null;
    if (ctx.ui.examFocusMode === "mistakes") ctx.ui.examFocusMode = "mock";
    saveState(ctx.state);
    renderRoute(app, ctx);
    return true;
  }

  if (target.closest("[data-mock-abandon]") && ctx.state.mockExam) {
    const confirmed = window.confirm("Abandonar este simulado? O progresso da prova atual sera perdido.");
    if (confirmed) {
      ctx.state.mockExam = null;
      saveState(ctx.state);
      renderRoute(app, ctx);
    }
    return true;
  }

  return false;
}

function submitMockExam(ctx: AppContext): void {
  const attempt = ctx.state.mockExam;
  if (!attempt || attempt.status !== "active") return;
  ctx.state.mockExam = {
    ...attempt,
    status: "grading",
    currentIndex: 0,
    finishedAt: new Date().toISOString()
  };
  saveState(ctx.state);
}

function finishMockExam(ctx: AppContext): void {
  const attempt = ctx.state.mockExam;
  if (!attempt || attempt.status === "finished") return;
  const finished = {
    ...attempt,
    status: "finished" as const,
    finishedAt: attempt.finishedAt || new Date().toISOString()
  };
  ctx.state.mockExam = finished;
  ctx.state.mockExamHistory = [buildMockExamHistoryEntry(finished), ...ctx.state.mockExamHistory].slice(0, 20);
  saveState(ctx.state);
}

function syncMockExamTimer(app: HTMLElement, ctx: AppContext): void {
  if (mockExamTimerId !== null) {
    window.clearInterval(mockExamTimerId);
    mockExamTimerId = null;
  }

  const attempt = ctx.state.mockExam;
  if (!attempt || attempt.status !== "active") return;

  const tick = (): void => {
    const current = ctx.state.mockExam;
    if (!current || current.status !== "active") {
      if (mockExamTimerId !== null) {
        window.clearInterval(mockExamTimerId);
        mockExamTimerId = null;
      }
      return;
    }

    const remaining = getMockExamRemainingMs(current);
    const timer = document.querySelector<HTMLElement>("[data-mock-timer]");
    if (timer) {
      timer.textContent = formatMockExamTimer(remaining);
      timer.classList.toggle("urgent", remaining <= 5 * 60_000);
    }

    if (remaining <= 0) {
      submitMockExam(ctx);
      if (mockExamTimerId !== null) {
        window.clearInterval(mockExamTimerId);
        mockExamTimerId = null;
      }
      const route = (window.location.hash.replace("#", "").split("/")[0] || "home") as RouteName;
      if (route === "exam") {
        ctx.ui.examFocusMode = "mock";
        setExamHash("mock");
      }
      renderRoute(app, ctx);
    }
  };

  tick();
  mockExamTimerId = window.setInterval(tick, 1000);
}

function toggleComplete(ctx: AppContext, chapterId: string, confirmed = false): void {
  const chapter = findChapter(ctx.data, chapterId);
  if (!chapter) return;

  const markingDone = !isCompleted(ctx.state, chapterId);
  if (markingDone) {
    const session = getSessionProgress(ctx.state, chapterId);
    const stats = getChapterExerciseStats(ctx.state, chapterId, getChapterExercises(chapter).length);
    const needsConfirm = session.percent < 100 || stats.answered === 0;
    if (needsConfirm && !confirmed && ctx.ui.completeGateChapterId !== chapterId) {
      ctx.ui.completeGateChapterId = chapterId;
      return;
    }
    ctx.ui.completeGateChapterId = "";
    touchStudied(ctx.state, chapterId);
  } else {
    ctx.ui.completeGateChapterId = "";
  }

  ctx.state.completed = markingDone
    ? [...ctx.state.completed, chapterId]
    : ctx.state.completed.filter((id) => id !== chapterId);
  saveState(ctx.state);
}

function setConfidence(ctx: AppContext, chapterId: string, value: Confidence): void {
  if (!findChapter(ctx.data, chapterId)) return;

  if (value === "ready") {
    const gate = canMarkReady(ctx.data, ctx.state, chapterId);
    if (!gate.ok) {
      ctx.ui.confidenceGateChapterId = chapterId;
      ctx.ui.confidenceGateMessage = gate.message;
      return;
    }
  }

  ctx.ui.confidenceGateChapterId = "";
  ctx.ui.confidenceGateMessage = "";
  ctx.state.confidence[chapterId] = value;
  touchStudied(ctx.state, chapterId);
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
  const dark = ctx.state.preferences.theme === "dark";
  const label = dark ? "Claro" : "Escuro";

  document.querySelectorAll(".theme-toggle[data-theme-toggle]").forEach((themeButton) => {
    const textLabel = themeButton.querySelector(".theme-toggle-label");
    if (textLabel) textLabel.textContent = label;
    else themeButton.textContent = label;
    themeButton.setAttribute(
      "aria-label",
      dark ? "Alternar para tema claro" : "Alternar para tema escuro"
    );
  });
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
