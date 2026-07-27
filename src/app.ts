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
  scrollToPageTop,
  syncChrome,
  toggleSidebar
} from "./ui/navigation";
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
  getMockExamRemainingMs,
  setMockExamResponse,
  setMockExamSelfCheck
} from "./domain/mockExam";

const READER_TABS: ReaderTab[] = ["explain", "praxis", "vocab", "practice", "ap1"];
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

  let chapterId: string | undefined;
  if (route === "course") app.innerHTML = renderCourseView(ctx);
  else if (route === "reader") {
    chapterId = id || ctx.state.lastChapterId || ctx.data.chapters[0].id;
    if (ctx.ui.readerChapterId !== chapterId) {
      ctx.ui.readerChapterId = chapterId;
      ctx.ui.readerTab = getResumeTab(ctx.state, chapterId);
      ctx.ui.completeGateChapterId = "";
      ctx.ui.confidenceGateChapterId = "";
      ctx.ui.confidenceGateMessage = "";
    }
    if (tab && READER_TABS.includes(tab as ReaderTab)) {
      ctx.ui.readerTab = tab as ReaderTab;
    }
    ctx.state.lastChapterId = chapterId;
    markVisitedStep(ctx.state, chapterId, ctx.ui.readerTab);
    touchStudied(ctx.state, chapterId);
    saveState(ctx.state);
    app.innerHTML = renderReaderView(ctx, chapterId);
  } else if (route === "review") app.innerHTML = renderReviewView(ctx);
  else if (route === "glossary") app.innerHTML = renderGlossaryView(ctx);
  else if (route === "exam") {
    if (ctx.state.mockExam && ctx.state.mockExam.status !== "finished" && ctx.ui.examFocusMode !== "mock") {
      ctx.ui.examFocusMode = "mock";
    }
    app.innerHTML = renderExamView(ctx);
  } else if (route === "docs-ai") app.innerHTML = renderDocsAiView(ctx);
  else app.innerHTML = renderHomeView(ctx);

  syncChrome(ctx, route || "home", chapterId);
  app.focus({ preventScroll: true });

  if (previousRoute && previousRoute !== route) scrollToPageTop();
  maybeScrollReaderStep(route);
  syncMockExamTimer(app, ctx, route || "home");
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

function handleClick(event: MouseEvent, app: HTMLElement, ctx: AppContext): void {
  const target = event.target as Element;

  if (target.closest("[data-go-exam-mock]")) {
    ctx.ui.examFocusMode = "mock";
    // hash navigation continues for <a href="#exam">
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
    ctx.ui.readerTab = nextButton.dataset.nextTab as ReaderTab;
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
    renderRoute(app, ctx);
    return;
  }

  const tabButton = target.closest<HTMLElement>("[data-reader-tab]");
  if (tabButton) {
    ctx.ui.readerTab = tabButton.dataset.readerTab as ReaderTab;
    if (ctx.ui.readerTab !== "practice") ctx.ui.practiceFilter = "all";
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
    ctx.state.mockExam = setMockExamResponse(ctx.state.mockExam, questionId, {
      notes: target.value,
      answered: Boolean(target.value.trim()) || ctx.state.mockExam.responses[questionId]?.answered
    });
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
  if (group === "review-focus") {
    ctx.ui.reviewFocusMode = value as UiState["reviewFocusMode"];
    ctx.ui.reviewFocusIndex = 0;
  }
  if (group === "practice-filter") {
    ctx.ui.practiceFilter = value as UiState["practiceFilter"];
  }
  if (group === "glossary-mode") {
    ctx.ui.glossaryMode = value as UiState["glossaryMode"];
    ctx.ui.glossaryFocusIndex = 0;
  }
  if (group === "exam-focus") {
    ctx.ui.examFocusMode = value as ExamFocusMode;
    ctx.ui.examFocusIndex = 0;
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
}

function handleKeydown(event: KeyboardEvent, app: HTMLElement, ctx: AppContext): void {
  if (event.key === "Escape") {
    closeSidebar();
    return;
  }

  const route = (window.location.hash.replace("#", "").split("/")[0] || "home") as RouteName;
  const tag = (event.target as HTMLElement | null)?.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

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

  if (route === "exam" && (ctx.ui.examFocusMode === "signals" || ctx.ui.examFocusMode === "drill")) {
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
    const chapterId = ctx.ui.readerChapterId || ctx.state.lastChapterId;
    if (!chapterId) return;
    if (delta > 0) {
      const nextTab = getNextSessionTab(ctx.state, chapterId, ctx.ui.readerTab);
      if (!nextTab) return;
      ctx.ui.readerTab = nextTab;
    } else {
      const prevTab = getPrevSessionTab(ctx.ui.readerTab);
      if (!prevTab) return;
      ctx.ui.readerTab = prevTab;
    }
    renderRoute(app, ctx);
  }
}

function registerSwipe(app: HTMLElement, ctx: AppContext): void {
  let startX = 0;
  let startY = 0;
  let tracking = false;

  document.addEventListener("touchstart", (event) => {
    const target = event.target as Element | null;
    if (!target?.closest("[data-swipe-deck]")) return;
    const touch = event.changedTouches[0];
    startX = touch.clientX;
    startY = touch.clientY;
    tracking = true;
  }, { passive: true });

  document.addEventListener("touchend", (event) => {
    if (!tracking) return;
    tracking = false;
    const target = event.target as Element | null;
    const deck = target?.closest<HTMLElement>("[data-swipe-deck]");
    if (!deck) return;

    const touch = event.changedTouches[0];
    const dx = touch.clientX - startX;
    const dy = touch.clientY - startY;
    if (Math.abs(dx) < 56 || Math.abs(dx) < Math.abs(dy)) return;

    const delta = dx < 0 ? 1 : -1;
    if (deck.dataset.swipeDeck === "review") ctx.ui.reviewFocusIndex += delta;
    if (deck.dataset.swipeDeck === "glossary") ctx.ui.glossaryFocusIndex += delta;
    if (deck.dataset.swipeDeck === "exam") ctx.ui.examFocusIndex += delta;
    renderRoute(app, ctx);
  }, { passive: true });
}

function setExerciseCheck(
  ctx: AppContext,
  key: string,
  value: ExerciseCheck,
  chapterId: string
): void {
  ctx.state.exerciseChecks[key] = value;
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
  ctx.state.vocabChecks[key] = value;
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
      if (grade.dataset.mockGrade === "wrong") {
        const current = ctx.state.confidence[question.chapterId];
        if (current !== "hard") ctx.state.confidence[question.chapterId] = "review";
      }
    }
    const attempt = ctx.state.mockExam;
    if (attempt.currentIndex < attempt.questions.length - 1) {
      ctx.state.mockExam = { ...attempt, currentIndex: attempt.currentIndex + 1 };
    }
    saveState(ctx.state);
    renderRoute(app, ctx);
    return true;
  }

  if (target.closest("[data-mock-submit]") && ctx.state.mockExam) {
    submitMockExam(ctx);
    renderRoute(app, ctx);
    return true;
  }

  if (target.closest("[data-mock-finish]") && ctx.state.mockExam) {
    finishMockExam(ctx);
    renderRoute(app, ctx);
    return true;
  }

  if (target.closest("[data-mock-clear]")) {
    ctx.state.mockExam = null;
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

function syncMockExamTimer(app: HTMLElement, ctx: AppContext, route: RouteName): void {
  if (mockExamTimerId !== null) {
    window.clearInterval(mockExamTimerId);
    mockExamTimerId = null;
  }

  const attempt = ctx.state.mockExam;
  const shouldRun = route === "exam" && ctx.ui.examFocusMode === "mock" && attempt?.status === "active";
  if (!shouldRun || !attempt) return;

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
    const timer = app.querySelector<HTMLElement>("[data-mock-timer]");
    if (timer) {
      timer.textContent = formatMockExamTimer(remaining);
      timer.classList.toggle("urgent", remaining <= 5 * 60_000);
    }

    if (remaining <= 0) {
      submitMockExam(ctx);
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

  document.querySelectorAll(".theme-toggle[data-theme-toggle]").forEach((themeButton) => {
    themeButton.textContent = dark ? "Claro" : "Escuro";
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
