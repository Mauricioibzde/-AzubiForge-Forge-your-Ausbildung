(function () {
  const STORAGE_KEY = "azubiforge.progress.v1";
  const app = document.querySelector("#app");
  const navLinks = document.querySelectorAll("[data-nav]");
  const { course, chapters, glossary, modules = [], learningSituations = {} } = AZUBIFORGE_DATA;
  const uiState = {
    courseQuery: "",
    courseFilter: "all",
    glossaryQuery: "",
    glossaryFilter: "all",
    globalQuery: "",
    readerTab: "explain",
    docsAiFocus: "study-plan",
    docsAiChapterId: ""
  };

  const state = loadState();

  window.addEventListener("hashchange", renderRoute);
  document.addEventListener("click", handleDocumentClick);
  document.addEventListener("input", handleDocumentInput);
  document.addEventListener("change", handleDocumentChange);

  applyPreferences();
  registerServiceWorker();
  renderRoute();

  function loadState() {
    const fallback = {
      completed: [],
      lastChapterId: chapters[0]?.id || "",
      notes: {},
      confidence: {},
      collapsedModules: {},
      preferences: {
        theme: "light",
        readingSize: "normal"
      }
    };

    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (!saved || !Array.isArray(saved.completed)) return fallback;

      const preferences = {
        ...fallback.preferences,
        ...(saved.preferences && typeof saved.preferences === "object" ? saved.preferences : {})
      };

      return {
        completed: saved.completed,
        lastChapterId: saved.lastChapterId || fallback.lastChapterId,
        notes: saved.notes && typeof saved.notes === "object" ? saved.notes : fallback.notes,
        confidence: saved.confidence && typeof saved.confidence === "object" ? saved.confidence : fallback.confidence,
        collapsedModules: saved.collapsedModules && typeof saved.collapsedModules === "object"
          ? saved.collapsedModules
          : fallback.collapsedModules,
        preferences: normalizePreferences(preferences, fallback.preferences)
      };
    } catch {
      return fallback;
    }
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function renderRoute() {
    const hash = window.location.hash || "#home";
    const [route, id] = hash.replace("#", "").split("/");

    setActiveNav(route);

    if (route === "course") {
      renderCourse();
      return;
    }

    if (route === "reader") {
      renderReader(id || state.lastChapterId || chapters[0].id);
      return;
    }

    if (route === "glossary") {
      renderGlossary();
      return;
    }

    if (route === "review") {
      renderReview();
      return;
    }

    if (route === "docs-ai") {
      renderDocsAi();
      return;
    }

    renderToday();
  }

  function setActiveNav(route) {
    navLinks.forEach((link) => {
      const key = link.dataset.nav;
      const isReader = route === "reader" && key === "course";
      link.classList.toggle("active", key === route || isReader);
    });
  }

  function renderToday() {
    const progress = getProgress();
    const today = getTodayPlan();
    const globalResults = getGlobalResults();
    const reviewChapters = getReviewQueue().slice(0, 4);
    const vocabularyPreview = getVocabularyPreview().slice(0, 8);

    app.innerHTML = `
      <section class="today-layout">
        <div class="today-main">
          <section class="today-hero">
            <div>
              <p class="eyebrow">Hoje</p>
              <h1>Forge your Ausbildung.</h1>
              <p class="lead">Uma sessao curta, clara e orientada pelos Lernfelder Westermann. Comece pelo proximo passo, revise o que esta fraco e feche com uma pergunta AP1.</p>
            </div>
            <div class="today-score">
              ${renderProgress(progress)}
            </div>
          </section>

          <section class="focus-card">
            <div>
              <span class="card-label">Foco da sessao</span>
              <h2>${today.chapter.title}</h2>
              <p>${today.chapter.description}</p>
              <div class="chapter-meta">
                <span>${today.module?.title || "Curso"}</span>
                <span>${today.situation?.title || "Lernsituation"}</span>
                ${renderConfidenceBadge(today.chapter.id)}
              </div>
            </div>
            <div class="focus-actions">
              <a class="button" href="#reader/${today.chapter.id}">Comecar sessao</a>
              <a class="button secondary" href="#review">Revisao ativa</a>
            </div>
          </section>

          <section class="study-flow" aria-label="Sessao sugerida">
            <article class="flow-step">
              <span>1</span>
              <strong>Erklaeren</strong>
              <p>Leia a ideia principal e diga em voz alta em alemao simples.</p>
            </article>
            <article class="flow-step">
              <span>2</span>
              <strong>Praxisfall</strong>
              <p>Conecte o tema a uma situacao da JIKU IT-Solutions.</p>
            </article>
            <article class="flow-step">
              <span>3</span>
              <strong>Wortschatz</strong>
              <p>Revise os termos que costumam aparecer no enunciado.</p>
            </article>
            <article class="flow-step">
              <span>4</span>
              <strong>AP1-Check</strong>
              <p>Responda antes de abrir a solucao e marque sua confianca.</p>
            </article>
          </section>
        </div>

        <aside class="today-rail">
          <section class="panel">
            <span class="card-label">Revisar hoje</span>
            <div class="mini-list">
              ${reviewChapters.map((chapter) => `
                <a href="#reader/${chapter.id}">
                  <strong>${chapter.title}</strong>
                  <span>${getChapterModule(chapter.id)?.title || "Curso"} ${renderConfidenceBadge(chapter.id)}</span>
                </a>
              `).join("") || `<p class="small-note">Marque capitulos como dificil ou revisar para montar sua fila.</p>`}
            </div>
          </section>

          <section class="panel">
            <span class="card-label">Wortschatz</span>
            <div class="term-cloud">
              ${vocabularyPreview.map((term) => `<a href="#review">${term.word}</a>`).join("")}
            </div>
          </section>
        </aside>
      </section>

      <section class="panel global-search" aria-label="Busca global">
        <div>
          <span class="card-label">Busca offline</span>
          <h2>Encontrar conteudo</h2>
          <p>Pesquise capitulos, termos do glossario e explicacoes sem sair do navegador.</p>
        </div>
        <input
          class="search-input"
          type="search"
          placeholder="Buscar por DNS, Firewall, SQL..."
          aria-label="Busca global"
          data-global-search
          value="${escapeAttribute(uiState.globalQuery)}"
        >
        ${uiState.globalQuery ? renderGlobalResults(globalResults) : ""}
      </section>

      <section class="module-progress-grid" aria-label="Progresso por Lernfeld">
        ${modules.map(renderModuleProgressCard).join("")}
      </section>

      <section class="panel data-tools" aria-label="Dados locais">
        <div>
          <span class="card-label">Dados locais</span>
          <h2>Backup offline</h2>
          <p>Exporte ou importe seu progresso, confianca e anotacoes usando um arquivo JSON.</p>
        </div>
        <div class="tool-actions">
          <button class="button secondary" data-export-progress>Exportar progresso</button>
          <label class="button secondary file-button">
            Importar progresso
            <input type="file" accept="application/json,.json" data-import-progress>
          </label>
        </div>
      </section>
    `;

    const searchInput = app.querySelector("[data-global-search]");
    if (searchInput && uiState.globalQuery) {
      searchInput.focus();
      searchInput.setSelectionRange(searchInput.value.length, searchInput.value.length);
    } else {
      focusApp();
    }
  }

  function renderHome() {
    const progress = getProgress();
    const lastChapter = findChapter(state.lastChapterId) || chapters[0];
    const suggestedChapter = getSuggestedChapter();
    const globalResults = getGlobalResults();

    app.innerHTML = `
      <section class="hero">
        <div class="intro">
          <p class="eyebrow">AzubiForge</p>
          <h1>Forge your Ausbildung.</h1>
          <p class="lead">Uma plataforma simples, offline e organizada para estudar os fundamentos da AP1 FIAE sem distrações.</p>
          <div class="actions">
            <a class="button" href="#reader/${lastChapter.id}">Continuar estudando</a>
            <a class="button secondary" href="#course">Ver curso</a>
          </div>
        </div>

        <aside class="panel course-card" aria-label="Curso disponível">
          <div>
            <p class="eyebrow">Curso disponível</p>
            <h2>${course.title}</h2>
            <p>${course.description}</p>
            ${renderCourseBasis()}
          </div>
          ${renderProgress(progress)}
        </aside>
      </section>

      <section class="panel global-search" aria-label="Busca global">
        <div>
          <span class="card-label">Busca offline</span>
          <h2>Encontrar conteúdo</h2>
          <p>Pesquise capítulos, termos do glossário e explicações sem sair do navegador.</p>
        </div>
        <input
          class="search-input"
          type="search"
          placeholder="Buscar por DNS, Firewall, SQL..."
          aria-label="Busca global"
          data-global-search
          value="${escapeAttribute(uiState.globalQuery)}"
        >
        ${uiState.globalQuery ? renderGlobalResults(globalResults) : ""}
      </section>

      <section class="quick-grid" aria-label="Resumo de estudos">
        <article class="panel study-card">
          <span class="card-label">Último capítulo</span>
          <h3>${lastChapter.title}</h3>
          <p>${lastChapter.description}</p>
          <a class="text-link" href="#reader/${lastChapter.id}">Abrir capítulo</a>
        </article>

        <article class="panel study-card">
          <span class="card-label">Próximo foco</span>
          <h3>${suggestedChapter.title}</h3>
          <p>${suggestedChapter.description}</p>
          <a class="text-link" href="#reader/${suggestedChapter.id}">Começar agora</a>
        </article>

        <article class="panel study-card">
          <span class="card-label">Notas locais</span>
          <h3>${getNotesCount()} capítulos</h3>
          <p>Anotações salvas apenas neste navegador, usando LocalStorage.</p>
          <a class="text-link" href="#reader/${lastChapter.id}">Ver anotações</a>
        </article>
      </section>

      <section class="panel data-tools" aria-label="Dados locais">
        <div>
          <span class="card-label">Dados locais</span>
          <h2>Backup offline</h2>
          <p>Exporte ou importe seu progresso e suas anotações usando um arquivo JSON no seu computador.</p>
        </div>
        <div class="tool-actions">
          <button class="button secondary" data-export-progress>Exportar progresso</button>
          <label class="button secondary file-button">
            Importar progresso
            <input type="file" accept="application/json,.json" data-import-progress>
          </label>
        </div>
      </section>
    `;

    const searchInput = app.querySelector("[data-global-search]");
    if (searchInput && uiState.globalQuery) {
      searchInput.focus();
      searchInput.setSelectionRange(searchInput.value.length, searchInput.value.length);
    } else {
      focusApp();
    }
  }

  function renderCourse() {
    const progress = getProgress();
    const nextOpen = getSuggestedChapter();
    const filteredChapters = getFilteredChapters();

    app.innerHTML = `
      <section>
        <div class="section-head">
          <div>
            <p class="eyebrow">Curso AP1</p>
            <h1>${course.title}</h1>
            <p>${course.description}</p>
            ${renderCourseBasis()}
          </div>
          <div class="panel">
            ${renderProgress(progress)}
            <p class="small-note">Sugestão: ${nextOpen.title}</p>
          </div>
        </div>

        <div class="toolbar" aria-label="Filtros do curso">
          <input
            class="search-input"
            type="search"
            placeholder="Pesquisar capítulo"
            aria-label="Pesquisar capítulo"
            data-course-search
            value="${escapeAttribute(uiState.courseQuery)}"
          >
          <div class="segmented-control" aria-label="Filtrar capítulos">
            ${renderSegment("course", "all", "Todos", uiState.courseFilter)}
            ${renderSegment("course", "open", "Em estudo", uiState.courseFilter)}
            ${renderSegment("course", "done", "Concluídos", uiState.courseFilter)}
            ${renderSegment("course", "notes", "Com notas", uiState.courseFilter)}
            ${renderSegment("course", "hard", "Dificeis", uiState.courseFilter)}
          </div>
          <p class="small-note">${filteredChapters.length} de ${chapters.length} capítulos exibidos</p>
        </div>

        ${renderCourseModules(filteredChapters)}
      </section>
    `;

    const searchInput = app.querySelector("[data-course-search]");
    if (searchInput && uiState.courseQuery) {
      searchInput.focus();
      searchInput.setSelectionRange(searchInput.value.length, searchInput.value.length);
    } else {
      focusApp();
    }
  }

  function renderCourseBasis() {
    if (!Array.isArray(course.basis) || !course.basis.length) return "";

    return `
      <div class="source-list">
        <span class="card-label">Base curricular</span>
        <ul>
          ${course.basis.map((item) => `<li>${item}</li>`).join("")}
        </ul>
        ${course.copyrightNote ? `<p class="small-note">${course.copyrightNote}</p>` : ""}
      </div>
    `;
  }

  function renderChapterItem(chapter) {
    const done = isCompleted(chapter.id);
    const hasNote = Boolean((state.notes[chapter.id] || "").trim());
    const minutes = getReadingMinutes(chapter);

    return `
      <article class="chapter-item ${done ? "done" : ""}">
        <div>
          <div class="chapter-title">
            <span class="status-dot" aria-hidden="true"></span>
            <h3>${chapter.title}</h3>
          </div>
          <p>${chapter.description}</p>
          <div class="chapter-meta">
            <span>${minutes} min leitura</span>
            ${hasNote ? "<span>Com nota</span>" : ""}
            ${done ? "<span>Concluído</span>" : ""}
          </div>
        </div>
        <a class="button secondary" href="#reader/${chapter.id}">Estudar</a>
      </article>
    `;
  }

  function renderCourseModules(filteredChapters) {
    if (!filteredChapters.length) {
      return `<p class="empty-state">Nenhum capítulo encontrado.</p>`;
    }

    if (!modules.length) {
      return `<div class="chapter-list">${filteredChapters.map(renderChapterItem).join("")}</div>`;
    }

    const filteredIds = new Set(filteredChapters.map((chapter) => chapter.id));
    const grouped = modules
      .map((module) => {
        const moduleChapters = module.chapterIds
          .map(findChapter)
          .filter((chapter) => chapter && filteredIds.has(chapter.id));

        return { module, moduleChapters };
      })
      .filter((group) => group.moduleChapters.length);

    const groupedIds = new Set(grouped.flatMap((group) => group.moduleChapters.map((chapter) => chapter.id)));
    const ungrouped = filteredChapters.filter((chapter) => !groupedIds.has(chapter.id));

    return `
      <div class="module-list">
        ${grouped.map(renderModuleSection).join("")}
        ${ungrouped.length ? `
          <section class="module-section">
            <div class="module-head">
              <div>
                <span class="card-label">Extra</span>
                <h2>Capítulos complementares</h2>
                <p>Conteúdos úteis que ainda não fazem parte da sequência principal dos módulos.</p>
              </div>
            </div>
            <div class="chapter-list">${ungrouped.map(renderChapterItem).join("")}</div>
          </section>
        ` : ""}
      </div>
    `;
  }

  function renderModuleSection(group) {
    const progress = getModuleProgress(group.module);
    const visibleIds = new Set(group.moduleChapters.map((chapter) => chapter.id));
    const situations = learningSituations[group.module.id] || [
      {
        id: `${group.module.id}-main`,
        title: group.module.subtitle,
        description: group.module.description,
        chapterIds: group.module.chapterIds
      }
    ];
    const collapsed = Boolean(state.collapsedModules[group.module.id]) && !uiState.courseQuery.trim();

    return `
      <section class="module-section ${collapsed ? "collapsed" : ""}" id="${group.module.id}">
        <div class="module-head">
          <div>
            <span class="card-label">${group.module.title}</span>
            <h2>${group.module.subtitle}</h2>
            <p>${group.module.description}</p>
            ${renderInlineProgress(progress)}
          </div>
          <button class="module-toggle" type="button" data-toggle-module="${group.module.id}" aria-expanded="${!collapsed}">
            <span class="module-count">${progress.completed} / ${progress.total}</span>
            <span>${collapsed ? "Abrir" : "Recolher"}</span>
          </button>
        </div>
        ${collapsed ? "" : `
          <div class="module-body">
            ${situations.map((situation) => renderLearningSituation(situation, visibleIds)).join("")}
          </div>
        `}
      </section>
    `;
  }

  function renderLearningSituation(situation, visibleIds) {
    const situationChapters = situation.chapterIds
      .map(findChapter)
      .filter((chapter) => chapter && visibleIds.has(chapter.id));

    if (!situationChapters.length) return "";

    const completed = situationChapters.filter((chapter) => isCompleted(chapter.id)).length;
    const percent = Math.round((completed / situationChapters.length) * 100);

    return `
      <section class="lernsituation">
        <div class="lernsituation-head">
          <div>
            <span class="card-label">Lernsituation</span>
            <h3>${situation.title}</h3>
            <p>${situation.description}</p>
          </div>
          <span class="module-count">${completed} / ${situationChapters.length}</span>
        </div>
        ${renderInlineProgress({ percent, completed, total: situationChapters.length })}
        <div class="chapter-list">
          ${situationChapters.map(renderChapterItem).join("")}
        </div>
      </section>
    `;
  }

  function renderReader(chapterId) {
    const chapter = findChapter(chapterId) || chapters[0];
    const index = chapters.findIndex((item) => item.id === chapter.id);
    const previous = chapters[index - 1];
    const next = chapters[index + 1];
    const done = isCompleted(chapter.id);
    const minutes = getReadingMinutes(chapter);
    const note = state.notes[chapter.id] || "";

    state.lastChapterId = chapter.id;
    saveState();

    app.innerHTML = `
      <section class="reader">
        <article class="article">
          <p class="eyebrow">${course.title}</p>
          <h1>${chapter.title}</h1>
          <div class="reader-meta">
            <span>${chapter.studyTime || `${minutes} min leitura`}</span>
            <span>${index + 1} de ${chapters.length}</span>
            <span>${done ? "Concluído" : "Em estudo"}</span>
          </div>
          <div class="article-body">
            ${renderReaderTabs(chapter)}
            ${renderChapterTabContent(chapter, uiState.readerTab)}

            <section class="notes-box">
              <div>
                <h2>Anotações</h2>
                <p>Salvas offline neste navegador.</p>
              </div>
              <textarea
                class="notes-input"
                data-note="${chapter.id}"
                rows="7"
                placeholder="Escreva suas observações, termos em alemão ou dúvidas deste capítulo..."
              >${escapeHtml(note)}</textarea>
            </section>
          </div>
        </article>

        <aside class="reader-side">
          <div class="panel">
            <a class="text-link back-link" href="#course">Voltar ao curso</a>
            <div class="actions">
              ${previous ? `<a class="button secondary" href="#reader/${previous.id}">Anterior</a>` : ""}
              ${next ? `<a class="button secondary" href="#reader/${next.id}">Próximo</a>` : ""}
              <button class="button ${done ? "complete" : ""}" data-complete="${chapter.id}">
                ${done ? "Concluído" : "Marcar como concluído"}
              </button>
            </div>
            ${renderConfidenceControls(chapter)}
            <div class="reader-tools">
              <span class="small-note">Leitura</span>
              <div class="segmented-control compact" aria-label="Tamanho do texto">
                ${renderSegment("reading-size", "normal", "Normal", state.preferences.readingSize)}
                ${renderSegment("reading-size", "large", "Grande", state.preferences.readingSize)}
              </div>
              <button class="button secondary" type="button" data-print-chapter>Imprimir capítulo</button>
            </div>
          </div>

          <nav class="panel chapter-mini-list" aria-label="Capítulos">
            ${chapters.map((item) => `
              <a class="${item.id === chapter.id ? "active" : ""}" href="#reader/${item.id}">
                ${isCompleted(item.id) ? "✓ " : ""}${item.title}
              </a>
            `).join("")}
          </nav>
        </aside>
      </section>
    `;

    focusApp();
  }

  function renderReaderTabs(chapter) {
    const tabs = [
      ["explain", "Erklaeren"],
      ["praxis", "Praxisfall"],
      ["vocab", "Wortschatz"],
      ["practice", "Uebungen"],
      ["ap1", "AP1-Check"]
    ];

    return `
      <div class="reader-tabs" aria-label="Kapitelbereiche">
        ${tabs.map(([value, label]) => `
          <button
            class="${uiState.readerTab === value ? "active" : ""}"
            type="button"
            data-reader-tab="${value}"
            data-reader-chapter="${chapter.id}"
          >${label}</button>
        `).join("")}
      </div>
    `;
  }

  function renderChapterTabContent(chapter, tab) {
    if (tab === "praxis") return renderPraxisTab(chapter);
    if (tab === "vocab") return renderVocabularyTab(chapter);
    if (tab === "practice") return renderPracticeTab(chapter);
    if (tab === "ap1") return renderAp1Tab(chapter);
    return renderExplainTab(chapter);
  }

  function renderExplainTab(chapter) {
    if (!chapter.fullContent) {
      return `
        <section class="chapter-section">
          <h2>Grundidee</h2>
          ${renderParagraphs(chapter.text)}
        </section>
        <section class="info-box summary">
          <h2>Resumo</h2>
          <p>${chapter.summary}</p>
        </section>
      `;
    }

    const content = chapter.fullContent;

    return `
      <section class="chapter-section compact-grid">
        <div class="info-box">
          <h2>Lernzeit</h2>
          <p>${content.studyTime}</p>
        </div>
        <div class="info-box">
          <h2>Schwierigkeit</h2>
          <p>${content.difficulty}</p>
        </div>
      </section>
      <section class="info-box ihk">
        <h2>Wichtigkeit fuer die AP1</h2>
        <p><strong>${content.importance.stars}</strong></p>
        ${renderParagraphs(content.importance.explanation)}
      </section>
      <section class="chapter-section">
        <h2>Lernziele</h2>
        ${renderList(content.objectives)}
      </section>
      <section class="chapter-section">
        <h2>Einfuehrung</h2>
        ${renderParagraphs(content.introduction)}
      </section>
      <section class="chapter-section">
        <h2>Erklaerung</h2>
        ${content.explanation.map(renderContentBlock).join("")}
      </section>
    `;
  }

  function renderPraxisTab(chapter) {
    const content = chapter.fullContent;

    return `
      ${renderPraxisfall(chapter)}
      <section class="chapter-section">
        <h2>Beispiel</h2>
        <p class="example">${chapter.example}</p>
      </section>
      ${content ? `
        <section class="chapter-section">
          <h2>Beispiele aus der Praxis</h2>
          ${renderList(content.realWorldExamples)}
        </section>
        <section class="chapter-section">
          <h2>Praktische Beispiele</h2>
          ${content.practicalExamples.map(renderContentBlock).join("")}
        </section>
        <section class="chapter-section">
          <h2>Visuelle Denkmodelle</h2>
          ${content.diagrams.map(renderDiagram).join("")}
        </section>
      ` : ""}
    `;
  }

  function renderVocabularyTab(chapter) {
    const rows = chapter.fullContent?.vocabulary || getChapterVocabulary(chapter);

    return `
      <section class="chapter-section">
        <h2>Deutscher Wortschatz</h2>
        ${rows.length ? renderVocabularyTable(rows) : `<p>Keine Wortschatzliste fuer dieses Kapitel.</p>`}
      </section>
      <section class="info-box summary">
        <h2>Active Recall</h2>
        <p>Decke die portugiesische Bedeutung ab und erklaere den deutschen Begriff zuerst selbst.</p>
      </section>
    `;
  }

  function renderPracticeTab(chapter) {
    const content = chapter.fullContent;

    return `
      <section class="chapter-section">
        <h2>Uebungen</h2>
        ${content ? `
          ${renderExerciseGroup("Einfach", content.exercises.easy)}
          ${renderExerciseGroup("Mittel", content.exercises.intermediate)}
          ${renderExerciseGroup("AP1-Stil", content.exercises.ap1Style)}
        ` : chapter.exercises.map(renderExercise).join("")}
      </section>
    `;
  }

  function renderAp1Tab(chapter) {
    const content = chapter.fullContent;

    return `
      <section class="info-box ihk">
        <h2>IHK Exam Focus</h2>
        ${content ? renderIhkFocus(content.ihkFocus) : `<p>${chapter.ihk}</p>`}
      </section>
      <section class="chapter-section">
        <h2>Haeufige Fehler</h2>
        ${content ? renderList(content.commonMistakes) : renderList(getBasicMistakes(chapter))}
      </section>
      <section class="info-box summary">
        <h2>Zusammenfassung</h2>
        ${content ? renderParagraphs(content.summary) : `<p>${chapter.summary}</p>`}
      </section>
      ${content ? `
        <section class="chapter-section">
          <h2>Mindmap</h2>
          ${renderDiagram(content.mindMap)}
        </section>
      ` : ""}
      <section class="chapter-section">
        <h2>Readiness</h2>
        ${renderChecklist(content?.revisionChecklist || getBasicChecklist(chapter))}
        ${renderConfidenceControls(chapter)}
      </section>
    `;
  }

  function renderPraxisfall(chapter) {
    const module = getChapterModule(chapter.id);
    const situation = getChapterLearningSituation(chapter.id);

    return `
      <section class="praxisfall">
        <span class="card-label">JIKU Praxisfall</span>
        <h2>${situation?.title || module?.subtitle || "Berufliche Situation"}</h2>
        <p>Bei JIKU IT-Solutions taucht dieses Thema nicht als isolierte Definition auf, sondern als Aufgabe im Kunden- oder Betriebsprozess.</p>
        <ul>
          <li>Welche Information braucht der Kunde oder das Team?</li>
          <li>Welche Fachwoerter muss ich im Auftrag erkennen?</li>
          <li>Welche Entscheidung oder Kontrolle gehoert zu diesem Kapitel?</li>
          <li>Wie begruende ich die Antwort kurz und pruefungstauglich?</li>
        </ul>
      </section>
    `;
  }

  function renderExercise(exercise, index) {
    return `
      <div class="exercise">
        <p><strong>${index + 1}. ${exercise.question}</strong></p>
        <details>
          <summary>Mostrar resposta</summary>
          <p>${exercise.answer}</p>
        </details>
      </div>
    `;
  }

  function renderBasicChapter(chapter) {
    return `
      ${chapter.text.map((paragraph) => `<p>${paragraph}</p>`).join("")}

      <section class="info-box ihk">
        <h3>Wichtig für die IHK</h3>
        <p>${chapter.ihk}</p>
      </section>

      <section class="info-box summary">
        <h3>Resumo em Português</h3>
        <p>${chapter.summary}</p>
      </section>

      <section>
        <h2>Exemplo</h2>
        <p class="example">${chapter.example}</p>
      </section>

      <section>
        <h2>Exercícios</h2>
        ${chapter.exercises.map(renderExercise).join("")}
      </section>
    `;
  }

  function renderFullChapter(chapter) {
    const content = chapter.fullContent;

    return `
      <section class="chapter-section">
        <h2>Geschätzte Lernzeit</h2>
        <p>${content.studyTime}</p>
      </section>

      <section class="chapter-section">
        <h2>Schwierigkeit</h2>
        <p>${content.difficulty}</p>
      </section>

      <section class="info-box ihk">
        <h2>Wichtigkeit für die AP1</h2>
        <p><strong>${content.importance.stars}</strong></p>
        ${renderParagraphs(content.importance.explanation)}
      </section>

      <section class="chapter-section">
        <h2>Lernziele</h2>
        ${renderList(content.objectives)}
      </section>

      <section class="chapter-section">
        <h2>Einführung</h2>
        ${renderParagraphs(content.introduction)}
      </section>

      <section class="chapter-section">
        <h2>Vollständige Erklärung</h2>
        ${content.explanation.map(renderContentBlock).join("")}
      </section>

      <section class="chapter-section">
        <h2>Beispiele aus der Praxis</h2>
        ${renderList(content.realWorldExamples)}
      </section>

      <section class="chapter-section">
        <h2>Praktische Beispiele</h2>
        ${content.practicalExamples.map(renderContentBlock).join("")}
      </section>

      <section class="chapter-section">
        <h2>Visuelle Diagramme</h2>
        ${content.diagrams.map(renderDiagram).join("")}
      </section>

      <section class="info-box ihk">
        <h2>IHK Exam Focus</h2>
        ${renderIhkFocus(content.ihkFocus)}
      </section>

      <section class="chapter-section">
        <h2>Häufige Fehler</h2>
        ${renderList(content.commonMistakes)}
      </section>

      <section class="chapter-section">
        <h2>Deutscher Wortschatz</h2>
        ${renderVocabularyTable(content.vocabulary)}
      </section>

      <section class="info-box summary">
        <h2>Zusammenfassung</h2>
        ${renderParagraphs(content.summary)}
      </section>

      <section class="chapter-section">
        <h2>Mindmap</h2>
        ${renderDiagram(content.mindMap)}
      </section>

      <section class="chapter-section">
        <h2>Übungen</h2>
        ${renderExerciseGroup("Einfach", content.exercises.easy)}
        ${renderExerciseGroup("Mittel", content.exercises.intermediate)}
        ${renderExerciseGroup("AP1-Stil", content.exercises.ap1Style)}
      </section>

      <section class="chapter-section">
        <h2>Verwandte Kapitel</h2>
        <p><strong>Vorheriges Kapitel:</strong> ${content.related.previous}</p>
        <p><strong>Nächstes Kapitel:</strong> ${content.related.next}</p>
      </section>

      <section class="chapter-section">
        <h2>Revisions-Checkliste</h2>
        ${renderChecklist(content.revisionChecklist)}
      </section>
    `;
  }

  function renderParagraphs(paragraphs) {
    const items = Array.isArray(paragraphs) ? paragraphs : [paragraphs].filter(Boolean);
    return items.map((paragraph) => `<p>${paragraph}</p>`).join("");
  }

  function renderList(items) {
    const listItems = Array.isArray(items) ? items : [];
    return `<ul>${listItems.map((item) => `<li>${item}</li>`).join("")}</ul>`;
  }

  function renderContentBlock(block) {
    return `
      <div class="content-block">
        <h3>${block.title}</h3>
        ${renderParagraphs(block.paragraphs)}
        ${block.steps ? renderList(block.steps) : ""}
      </div>
    `;
  }

  function renderDiagram(diagram) {
    return `
      <div class="diagram-block">
        <h3>${diagram.title}</h3>
        <pre><code>${escapeHtml(diagram.code)}</code></pre>
      </div>
    `;
  }

  function renderIhkFocus(focus) {
    return `
      <h3>Was kommt häufig vor?</h3>
      ${renderList(focus.appears)}
      <h3>Häufige Fehler</h3>
      ${renderList(focus.commonMistakes)}
      <h3>Wichtige Details</h3>
      ${renderList(focus.importantDetails)}
      <h3>Oft verwechselt</h3>
      ${renderList(focus.confusedConcepts)}
      <h3>Wortschatz</h3>
      ${renderList(focus.vocabulary)}
    `;
  }

  function renderVocabularyTable(rows) {
    return `
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Deutsch</th>
              <th>Português</th>
              <th>Erklärung</th>
              <th>Beispielsatz</th>
            </tr>
          </thead>
          <tbody>
            ${rows.map((row) => `
              <tr>
                <td>${row.de}</td>
                <td>${row.pt}</td>
                <td>${row.explanation}</td>
                <td>${row.example}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  function renderExerciseGroup(title, exercises) {
    return `
      <div class="exercise-group">
        <h3>${title}</h3>
        ${exercises.map((exercise, index) => `
          <div class="exercise">
            <p><strong>${index + 1}. ${exercise.question}</strong></p>
            <details>
              <summary>Antwort anzeigen</summary>
              <p><strong>Antwort:</strong> ${exercise.answer}</p>
              <p><strong>Erklärung:</strong> ${exercise.explanation}</p>
            </details>
          </div>
        `).join("")}
      </div>
    `;
  }

  function renderChecklist(items) {
    return `
      <ul class="revision-checklist">
        ${items.map((item) => `<li>☐ ${item}</li>`).join("")}
      </ul>
    `;
  }

  function renderReview() {
    const queue = getReviewQueue().slice(0, 8);
    const cards = getReviewExercises(queue).slice(0, 10);
    const terms = getVocabularyPreview().slice(0, 18);

    app.innerHTML = `
      <section>
        <div class="section-head">
          <div>
            <p class="eyebrow">Revisao ativa</p>
            <h1>Responda antes de olhar.</h1>
            <p>Treino curto de active recall: vocabulario, perguntas AP1 e capitulos marcados como revisar ou dificil.</p>
          </div>
          <div class="panel">
            <span class="card-label">Fila</span>
            <h2>${queue.length || 0}</h2>
            <p class="small-note">capitulos para revisar</p>
          </div>
        </div>

        <div class="review-layout">
          <section class="panel">
            <span class="card-label">Flashcards</span>
            <div class="flashcard-grid">
              ${terms.map((term) => `
                <details class="flashcard">
                  <summary>${term.word}</summary>
                  <strong>${term.translation}</strong>
                  <p>${term.explanation}</p>
                </details>
              `).join("")}
            </div>
          </section>

          <section class="panel">
            <span class="card-label">Perguntas rapidas</span>
            <div class="exercise-group">
              ${cards.map((card, index) => `
                <div class="exercise">
                  <p><strong>${index + 1}. ${card.question}</strong></p>
                  <details>
                    <summary>Antwort anzeigen</summary>
                    <p><strong>Antwort:</strong> ${card.answer}</p>
                    ${card.explanation ? `<p><strong>Erklaerung:</strong> ${card.explanation}</p>` : ""}
                    <a class="text-link" href="#reader/${card.chapterId}">Kapitel oeffnen</a>
                  </details>
                </div>
              `).join("") || `<p class="empty-state">Ainda nao ha perguntas suficientes. Abra capitulos e marque seu nivel de confianca.</p>`}
            </div>
          </section>
        </div>

        <section class="review-queue">
          ${queue.map((chapter) => `
            <article class="chapter-item">
              <div>
                <div class="chapter-title">
                  <span class="status-dot" aria-hidden="true"></span>
                  <h3>${chapter.title}</h3>
                </div>
                <p>${chapter.description}</p>
                <div class="chapter-meta">
                  <span>${getChapterModule(chapter.id)?.title || "Curso"}</span>
                  ${renderConfidenceBadge(chapter.id)}
                </div>
              </div>
              <a class="button secondary" href="#reader/${chapter.id}">Revisar</a>
            </article>
          `).join("")}
        </section>
      </section>
    `;

    focusApp();
  }

  function renderGlossary() {
    const terms = getFilteredGlossary();

    app.innerHTML = `
      <section>
        <div class="section-head">
          <div>
            <p class="eyebrow">Glossário</p>
            <h1>Termos essenciais</h1>
            <p>Pesquise palavras técnicas em alemão e revise a tradução em português com explicações curtas.</p>
          </div>
        </div>

        <div class="glossary-tools">
          <input
            class="search-input"
            type="search"
            placeholder="Pesquisar palavra, tradução ou explicação"
            aria-label="Pesquisar no glossário"
            data-glossary-search
            value="${escapeAttribute(uiState.glossaryQuery)}"
          >
          <div class="segmented-control" aria-label="Filtrar glossário">
            ${renderSegment("glossary", "all", "Todos", uiState.glossaryFilter)}
            ${renderSegment("glossary", "network", "Redes", uiState.glossaryFilter)}
            ${renderSegment("glossary", "security", "Segurança", uiState.glossaryFilter)}
            ${renderSegment("glossary", "database", "Dados", uiState.glossaryFilter)}
            ${renderSegment("glossary", "programming", "Programação", uiState.glossaryFilter)}
          </div>
          <p class="small-note">${terms.length} de ${glossary.length} termos encontrados</p>
        </div>

        <div class="glossary-list">
          ${terms.length ? terms.map(renderTerm).join("") : `<p class="empty-state">Nenhum termo encontrado.</p>`}
        </div>
      </section>
    `;

    const searchInput = app.querySelector("[data-glossary-search]");
    if (searchInput && uiState.glossaryQuery) {
      searchInput.focus();
      searchInput.setSelectionRange(searchInput.value.length, searchInput.value.length);
    } else {
      focusApp();
    }
  }

  function renderDocsAi() {
    const prompt = buildDocsAiPrompt();

    app.innerHTML = `
      <section>
        <div class="section-head">
          <div>
            <p class="eyebrow">Docs AI</p>
            <h1>Contexto para ChatGPT</h1>
            <p>Gere um documento com seu progresso, anotações e objetivo de estudo para copiar e enviar manualmente ao ChatGPT.</p>
          </div>
        </div>

        <div class="docs-ai-layout">
          <aside class="panel docs-ai-settings">
            <div>
              <span class="card-label">Foco</span>
              <div class="segmented-control vertical" aria-label="Foco do prompt">
                ${renderSegment("docs-ai-focus", "study-plan", "Plano de estudo", uiState.docsAiFocus || "study-plan")}
                ${renderSegment("docs-ai-focus", "chapter-help", "Ajuda no capítulo", uiState.docsAiFocus || "study-plan")}
                ${renderSegment("docs-ai-focus", "review", "Revisão AP1", uiState.docsAiFocus || "study-plan")}
              </div>
            </div>

            <label class="field">
              <span>Capítulo principal</span>
              <select data-docs-ai-chapter>
                ${chapters.map((chapter) => `
                  <option value="${chapter.id}" ${getDocsAiChapter().id === chapter.id ? "selected" : ""}>
                    ${chapter.title}
                  </option>
                `).join("")}
              </select>
            </label>

            <div class="prompt-tip">
              <strong>Como usar</strong>
              <p>Copie o texto gerado, cole no ChatGPT e peça para ele continuar seu estudo com explicações, perguntas e sugestões.</p>
            </div>
          </aside>

          <article class="panel docs-ai-output">
            <div class="docs-ai-head">
              <div>
                <span class="card-label">Prompt pronto</span>
                <h2>AzubiForge Study Context</h2>
              </div>
              <button class="button" type="button" data-copy-docs-ai>Copiar para ChatGPT</button>
            </div>

            <textarea
              class="prompt-output"
              data-docs-ai-output
              rows="24"
              aria-label="Prompt para ChatGPT"
              readonly
            >${escapeHtml(prompt)}</textarea>
            <p class="small-note" data-copy-status>Este texto fica apenas no seu navegador até você copiar manualmente.</p>
          </article>
        </div>
      </section>
    `;

    focusApp();
  }

  function renderTerm(term) {
    return `
      <article class="term">
        <div>
          <strong>${term.word}</strong>
          <span class="translation">${term.translation}</span>
        </div>
        <p>${term.explanation}</p>
      </article>
    `;
  }

  function renderGlobalResults(results) {
    if (!results.length) {
      return `<p class="empty-state">Nenhum resultado encontrado.</p>`;
    }

    return `
      <div class="global-results">
        ${results.map((result) => `
          <a class="result-item" href="${result.href}">
            <span>${result.type}</span>
            <strong>${result.title}</strong>
            <p>${result.description}</p>
          </a>
        `).join("")}
      </div>
    `;
  }

  function buildDocsAiPrompt() {
    const progress = getProgress();
    const chapter = getDocsAiChapter();
    const completedTitles = chapters
      .filter((item) => isCompleted(item.id))
      .map((item) => item.title);
    const openTitles = chapters
      .filter((item) => !isCompleted(item.id))
      .slice(0, 6)
      .map((item) => item.title);
    const notes = Object.entries(state.notes)
      .filter(([, note]) => note.trim())
      .map(([chapterId, note]) => {
        const noteChapter = findChapter(chapterId);
        return `- ${noteChapter?.title || chapterId}: ${note.trim()}`;
      });

    return [
      "Quero que você seja meu tutor para a AP1 da Ausbildung FIAE.",
      "",
      "Contexto:",
      "- Estou estudando com uma aplicação offline chamada AzubiForge.",
      "- Objetivo: estudar de forma simples, organizada e prática para a AP1.",
      "- Quero explicações claras, exemplos, perguntas de revisão e sugestões de próximos passos.",
      "",
      `Foco deste pedido: ${getDocsAiFocusLabel()}.`,
      `Progresso atual: ${progress.completed} de ${progress.total} capítulos concluídos (${progress.percent}%).`,
      `Último capítulo aberto: ${findChapter(state.lastChapterId)?.title || "não definido"}.`,
      "",
      "Capítulos concluídos:",
      completedTitles.length ? completedTitles.map((title) => `- ${title}`).join("\n") : "- Nenhum capítulo concluído ainda.",
      "",
      "Próximos capítulos pendentes:",
      openTitles.length ? openTitles.map((title) => `- ${title}`).join("\n") : "- Todos os capítulos foram marcados como concluídos.",
      "",
      "Capítulo principal para trabalhar agora:",
      `Título: ${chapter.title}`,
      `Descrição: ${chapter.description}`,
      "",
      "Texto base do capítulo:",
      chapter.text.map((paragraph) => `- ${paragraph}`).join("\n"),
      "",
      "Wichtig für die IHK:",
      chapter.ihk,
      "",
      "Resumo em Português:",
      chapter.summary,
      "",
      "Exemplo:",
      chapter.example,
      "",
      "Minhas anotações locais:",
      notes.length ? notes.join("\n") : "- Ainda não tenho anotações salvas.",
      "",
      "O que eu quero de você:",
      getDocsAiInstruction(),
      "",
      "Responda em português, mas mantenha os termos técnicos alemães importantes quando eles forem úteis para a AP1."
    ].join("\n");
  }

  function getDocsAiChapter() {
    return findChapter(uiState.docsAiChapterId) || findChapter(state.lastChapterId) || chapters[0];
  }

  function getDocsAiFocusLabel() {
    const labels = {
      "study-plan": "criar um plano de estudo curto e prático",
      "chapter-help": "me ajudar a entender melhor o capítulo selecionado",
      review: "fazer uma revisão focada para AP1"
    };

    return labels[uiState.docsAiFocus] || labels["study-plan"];
  }

  function getDocsAiInstruction() {
    const instructions = {
      "study-plan": "Crie um plano de estudo objetivo para os próximos capítulos. Priorize o que costuma ser importante para a IHK e sugira uma sequência curta de revisão.",
      "chapter-help": "Explique o capítulo principal com linguagem simples, depois faça 5 perguntas de revisão com respostas escondidas em formato markdown details/summary.",
      review: "Faça uma revisão AP1 com pontos-chave, armadilhas comuns de prova e 8 perguntas curtas para testar minha compreensão."
    };

    return instructions[uiState.docsAiFocus] || instructions["study-plan"];
  }

  function copyDocsAiPrompt() {
    const output = app.querySelector("[data-docs-ai-output]");
    const status = app.querySelector("[data-copy-status]");
    if (!output) return;

    copyText(output.value).then(() => {
      if (status) status.textContent = "Prompt copiado. Agora cole no ChatGPT.";
    }).catch(() => {
      output.focus();
      output.select();
      if (status) status.textContent = "Não consegui copiar automaticamente. O texto foi selecionado para você copiar.";
    });
  }

  function copyText(value) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(value);
    }

    return new Promise((resolve, reject) => {
      const textarea = document.createElement("textarea");
      textarea.value = value;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      const copied = document.execCommand("copy");
      textarea.remove();
      copied ? resolve() : reject(new Error("Copy failed"));
    });
  }

  function getTodayPlan() {
    const chapter = getReviewQueue()[0] || getSuggestedChapter();

    return {
      chapter,
      module: getChapterModule(chapter.id),
      situation: getChapterLearningSituation(chapter.id)
    };
  }

  function getReviewQueue() {
    const priority = { hard: 0, review: 1, ok: 2, ready: 3 };
    const marked = chapters
      .filter((chapter) => ["hard", "review"].includes(state.confidence[chapter.id]))
      .sort((a, b) => priority[state.confidence[a.id]] - priority[state.confidence[b.id]]);
    const open = chapters.filter((chapter) => !isCompleted(chapter.id)).slice(0, 8);
    const completedForRecall = chapters
      .filter((chapter) => isCompleted(chapter.id) && state.confidence[chapter.id] !== "ready")
      .slice(0, 4);

    return uniqueChapters([...marked, ...open, ...completedForRecall]);
  }

  function getReviewExercises(queue) {
    const source = queue.length ? queue : chapters.slice(0, 6);

    return source.flatMap((chapter) => (
      getChapterExercises(chapter).map((exercise) => ({
        ...exercise,
        chapterId: chapter.id
      }))
    ));
  }

  function getChapterExercises(chapter) {
    const fullExercises = chapter.fullContent?.exercises;
    if (fullExercises) {
      return [
        ...(fullExercises.easy || []),
        ...(fullExercises.intermediate || []),
        ...(fullExercises.ap1Style || [])
      ];
    }

    return Array.isArray(chapter.exercises) ? chapter.exercises : [];
  }

  function getVocabularyPreview() {
    const queueText = getReviewQueue()
      .slice(0, 6)
      .map((chapter) => `${chapter.title} ${chapter.description} ${chapter.ihk} ${chapter.summary}`)
      .join(" ")
      .toLowerCase();
    const matched = glossary.filter((term) => queueText.includes(term.word.toLowerCase()));
    return [...matched, ...glossary.filter((term) => !matched.includes(term))];
  }

  function getChapterVocabulary(chapter) {
    const searchable = `${chapter.title} ${chapter.description} ${chapter.ihk} ${chapter.summary} ${chapter.example}`.toLowerCase();
    const matched = glossary
      .filter((term) => searchable.includes(term.word.toLowerCase()))
      .slice(0, 10)
      .map((term) => ({
        de: term.word,
        pt: term.translation,
        explanation: term.explanation,
        example: chapter.example
      }));

    if (matched.length) return matched;

    return [
      {
        de: chapter.title,
        pt: "tema do capitulo",
        explanation: chapter.description,
        example: chapter.example
      }
    ];
  }

  function renderModuleProgressCard(module) {
    const progress = getModuleProgress(module);

    return `
      <a class="module-progress-card" href="#course">
        <span class="card-label">${module.title}</span>
        <strong>${module.subtitle}</strong>
        ${renderInlineProgress(progress)}
      </a>
    `;
  }

  function renderInlineProgress(progress) {
    const percent = Number.isFinite(progress.percent) ? progress.percent : 0;

    return `
      <div class="inline-progress">
        <div>
          <span>${progress.completed} de ${progress.total}</span>
          <strong>${percent}%</strong>
        </div>
        <div class="progress-track">
          <div class="progress-fill" style="width: ${percent}%"></div>
        </div>
      </div>
    `;
  }

  function renderConfidenceBadge(chapterId) {
    const value = state.confidence[chapterId];
    if (!value) return "";

    const labels = {
      ok: "Entendi",
      review: "Revisar",
      hard: "Dificil",
      ready: "Pronto AP1"
    };

    return `<span class="confidence-badge ${value}">${labels[value] || value}</span>`;
  }

  function renderConfidenceControls(chapter) {
    const current = state.confidence[chapter.id] || "";
    const options = [
      ["ok", "Entendi"],
      ["review", "Preciso revisar"],
      ["hard", "Dificil"],
      ["ready", "Pronto AP1"]
    ];

    return `
      <section class="confidence-box">
        <span class="small-note">Confianca</span>
        <div class="confidence-actions">
          ${options.map(([value, label]) => `
            <button
              class="${current === value ? "active" : ""}"
              type="button"
              data-confidence="${value}"
              data-confidence-chapter="${chapter.id}"
            >${label}</button>
          `).join("")}
        </div>
      </section>
    `;
  }

  function setConfidence(chapterId, value) {
    if (!findChapter(chapterId)) return;

    state.confidence[chapterId] = value;
    if (value === "ready" && !isCompleted(chapterId)) {
      state.completed.push(chapterId);
    }

    saveState();
    renderRoute();
  }

  function getModuleProgress(module) {
    const moduleChapters = module.chapterIds.map(findChapter).filter(Boolean);
    const completed = moduleChapters.filter((chapter) => isCompleted(chapter.id)).length;
    const total = moduleChapters.length;

    return {
      completed,
      total,
      percent: total ? Math.round((completed / total) * 100) : 0
    };
  }

  function getChapterLearningSituation(chapterId) {
    const module = getChapterModule(chapterId);
    if (!module) return null;

    return (learningSituations[module.id] || []).find((situation) => situation.chapterIds.includes(chapterId)) || null;
  }

  function getBasicMistakes(chapter) {
    return [
      `Nur eine Definition zu ${chapter.title} lernen, ohne ein Beispiel zu nennen.`,
      "Deutsche Fachwoerter im Auftrag ueberlesen.",
      "Eine technische Antwort geben, aber keine kurze Begruendung liefern."
    ];
  }

  function getBasicChecklist(chapter) {
    return [
      `Ich kann ${chapter.title} in einfachem Deutsch erklaeren.`,
      "Ich kenne die wichtigsten Fachwoerter.",
      "Ich kann ein Praxisbeispiel nennen.",
      "Ich kann eine kurze AP1-Antwort formulieren.",
      "Ich weiss, ob ich das Thema nochmal wiederholen muss."
    ];
  }

  function uniqueChapters(items) {
    const seen = new Set();

    return items.filter((chapter) => {
      if (!chapter || seen.has(chapter.id)) return false;
      seen.add(chapter.id);
      return true;
    });
  }

  function renderProgress(progress) {
    return `
      <div class="progress-block">
        <div class="progress-meta">
          <span>${progress.completed} de ${progress.total} capítulos</span>
          <strong>${progress.percent}%</strong>
        </div>
        <div class="progress-track" aria-label="Progresso do curso">
          <div class="progress-fill" style="width: ${progress.percent}%"></div>
        </div>
      </div>
    `;
  }

  function renderSegment(group, value, label, currentValue) {
    return `
      <button
        class="${currentValue === value ? "active" : ""}"
        type="button"
        data-filter-group="${group}"
        data-filter-value="${value}"
      >${label}</button>
    `;
  }

  function handleDocumentClick(event) {
    const themeButton = event.target.closest("[data-theme-toggle]");
    if (themeButton) {
      toggleTheme();
      return;
    }

    const printButton = event.target.closest("[data-print-chapter]");
    if (printButton) {
      window.print();
      return;
    }

    const copyDocsAiButton = event.target.closest("[data-copy-docs-ai]");
    if (copyDocsAiButton) {
      copyDocsAiPrompt();
      return;
    }

    const exportButton = event.target.closest("[data-export-progress]");
    if (exportButton) {
      exportProgress();
      return;
    }

    const tabButton = event.target.closest("[data-reader-tab]");
    if (tabButton) {
      uiState.readerTab = tabButton.dataset.readerTab;
      renderReader(tabButton.dataset.readerChapter || state.lastChapterId);
      return;
    }

    const moduleButton = event.target.closest("[data-toggle-module]");
    if (moduleButton) {
      const moduleId = moduleButton.dataset.toggleModule;
      state.collapsedModules[moduleId] = !state.collapsedModules[moduleId];
      saveState();
      renderCourse();
      return;
    }

    const confidenceButton = event.target.closest("[data-confidence]");
    if (confidenceButton) {
      setConfidence(confidenceButton.dataset.confidenceChapter, confidenceButton.dataset.confidence);
      return;
    }

    const filterButton = event.target.closest("[data-filter-group]");
    if (filterButton) {
      applyFilter(filterButton.dataset.filterGroup, filterButton.dataset.filterValue);
      return;
    }

    const button = event.target.closest("[data-complete]");
    if (!button) return;

    const chapterId = button.dataset.complete;
    if (isCompleted(chapterId)) {
      state.completed = state.completed.filter((id) => id !== chapterId);
    } else {
      state.completed.push(chapterId);
    }

    saveState();
    renderReader(chapterId);
  }

  function handleDocumentInput(event) {
    if (event.target.matches("[data-global-search]")) {
      uiState.globalQuery = event.target.value;
      renderToday();
      return;
    }

    if (event.target.matches("[data-course-search]")) {
      uiState.courseQuery = event.target.value;
      renderCourse();
      return;
    }

    if (event.target.matches("[data-glossary-search]")) {
      uiState.glossaryQuery = event.target.value;
      renderGlossary();
      return;
    }

    if (event.target.matches("[data-note]")) {
      state.notes[event.target.dataset.note] = event.target.value;
      saveState();
    }
  }

  function handleDocumentChange(event) {
    if (event.target.matches("[data-docs-ai-chapter]")) {
      uiState.docsAiChapterId = event.target.value;
      renderDocsAi();
      return;
    }

    if (!event.target.matches("[data-import-progress]")) return;

    const file = event.target.files[0];
    if (!file) return;

    importProgress(file);
    event.target.value = "";
  }

  function getProgress() {
    const validCompleted = state.completed.filter((id) => chapters.some((chapter) => chapter.id === id));
    const percent = Math.round((validCompleted.length / chapters.length) * 100);

    return {
      completed: validCompleted.length,
      total: chapters.length,
      percent
    };
  }

  function getFilteredChapters() {
    const query = uiState.courseQuery.trim().toLowerCase();

    return chapters.filter((chapter) => {
      const module = getChapterModule(chapter.id);
      const text = `${chapter.title} ${chapter.description} ${module?.title || ""} ${module?.subtitle || ""}`.toLowerCase();
      const matchesQuery = !query || text.includes(query);
      const hasNote = Boolean((state.notes[chapter.id] || "").trim());

      if (!matchesQuery) return false;
      if (uiState.courseFilter === "done") return isCompleted(chapter.id);
      if (uiState.courseFilter === "open") return !isCompleted(chapter.id);
      if (uiState.courseFilter === "notes") return hasNote;
      if (uiState.courseFilter === "hard") return ["hard", "review"].includes(state.confidence[chapter.id]);
      return true;
    });
  }

  function getFilteredGlossary() {
    const query = uiState.glossaryQuery.trim().toLowerCase();

    return glossary.filter((term) => {
      const searchable = `${term.word} ${term.translation} ${term.explanation}`.toLowerCase();
      const matchesQuery = !query || searchable.includes(query);
      const matchesFilter = uiState.glossaryFilter === "all" || getTermCategory(term) === uiState.glossaryFilter;
      return matchesQuery && matchesFilter;
    });
  }

  function getGlobalResults() {
    const query = uiState.globalQuery.trim().toLowerCase();
    if (!query) return [];

    const chapterResults = chapters
      .filter((chapter) => {
        const searchable = [
          chapter.title,
          chapter.description,
          ...chapter.text,
          chapter.ihk,
          chapter.summary,
          chapter.example
        ].join(" ").toLowerCase();
        return searchable.includes(query);
      })
      .slice(0, 5)
      .map((chapter) => ({
        type: "Capítulo",
        title: chapter.title,
        description: chapter.description,
        href: `#reader/${chapter.id}`
      }));

    const glossaryResults = glossary
      .filter((term) => {
        const searchable = `${term.word} ${term.translation} ${term.explanation}`.toLowerCase();
        return searchable.includes(query);
      })
      .slice(0, 5)
      .map((term) => ({
        type: "Glossário",
        title: `${term.word} - ${term.translation}`,
        description: term.explanation,
        href: "#glossary"
      }));

    return [...chapterResults, ...glossaryResults].slice(0, 8);
  }

  function applyPreferences() {
    document.documentElement.dataset.theme = state.preferences.theme;
    document.documentElement.dataset.readingSize = state.preferences.readingSize;
    const themeButton = document.querySelector("[data-theme-toggle]");

    if (themeButton) {
      themeButton.textContent = state.preferences.theme === "dark" ? "Claro" : "Escuro";
      themeButton.setAttribute(
        "aria-label",
        state.preferences.theme === "dark" ? "Alternar para tema claro" : "Alternar para tema escuro"
      );
    }
  }

  function normalizePreferences(preferences, fallback) {
    return {
      theme: ["light", "dark"].includes(preferences.theme) ? preferences.theme : fallback.theme,
      readingSize: ["normal", "large"].includes(preferences.readingSize)
        ? preferences.readingSize
        : fallback.readingSize
    };
  }

  function toggleTheme() {
    state.preferences.theme = state.preferences.theme === "dark" ? "light" : "dark";
    saveState();
    applyPreferences();
  }

  function getTermCategory(term) {
    const searchable = `${term.word} ${term.translation} ${term.explanation}`.toLowerCase();
    const categories = {
      network: ["netz", "ip", "gateway", "router", "switch", "protokoll", "subnetz"],
      security: ["firewall", "datensicherung", "verfügbarkeit", "vertraulichkeit", "integrität"],
      database: ["primärschlüssel", "fremdschlüssel", "abfrage", "banco de dados", "tabela"],
      programming: ["schleife", "loop", "programa", "instruções"]
    };

    return Object.entries(categories).find(([, keywords]) => (
      keywords.some((keyword) => searchable.includes(keyword))
    ))?.[0] || "all";
  }

  function applyFilter(group, value) {
    if (group === "course") {
      uiState.courseFilter = value;
      renderCourse();
      return;
    }

    if (group === "glossary") {
      uiState.glossaryFilter = value;
      renderGlossary();
      return;
    }

    if (group === "reading-size") {
      state.preferences.readingSize = value;
      saveState();
      applyPreferences();
      renderRoute();
      return;
    }

    if (group === "docs-ai-focus") {
      uiState.docsAiFocus = value;
      renderDocsAi();
    }
  }

  function exportProgress() {
    const payload = {
      app: "AzubiForge",
      version: 1,
      exportedAt: new Date().toISOString(),
      state
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `azubiforge-progress-${getDateStamp()}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function importProgress(file) {
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      try {
        const payload = JSON.parse(reader.result);
        const importedState = payload.state || payload;
        const sanitized = sanitizeImportedState(importedState);

        state.completed = sanitized.completed;
        state.lastChapterId = sanitized.lastChapterId;
        state.notes = sanitized.notes;
        state.confidence = sanitized.confidence;
        state.collapsedModules = sanitized.collapsedModules;
        state.preferences = sanitized.preferences;
        saveState();
        applyPreferences();
        renderToday();
      } catch {
        window.alert("Não foi possível importar este arquivo JSON.");
      }
    });

    reader.readAsText(file);
  }

  function sanitizeImportedState(importedState) {
    const validIds = new Set(chapters.map((chapter) => chapter.id));
    const completed = Array.isArray(importedState.completed)
      ? importedState.completed.filter((id) => validIds.has(id))
      : [];
    const lastChapterId = validIds.has(importedState.lastChapterId)
      ? importedState.lastChapterId
      : chapters[0].id;
    const notes = {};

    if (importedState.notes && typeof importedState.notes === "object") {
      Object.entries(importedState.notes).forEach(([chapterId, note]) => {
        if (validIds.has(chapterId) && typeof note === "string") {
          notes[chapterId] = note;
        }
      });
    }

    const confidence = {};
    const allowedConfidence = new Set(["ok", "review", "hard", "ready"]);

    if (importedState.confidence && typeof importedState.confidence === "object") {
      Object.entries(importedState.confidence).forEach(([chapterId, value]) => {
        if (validIds.has(chapterId) && allowedConfidence.has(value)) {
          confidence[chapterId] = value;
        }
      });
    }

    const collapsedModules = {};
    const validModuleIds = new Set(modules.map((module) => module.id));

    if (importedState.collapsedModules && typeof importedState.collapsedModules === "object") {
      Object.entries(importedState.collapsedModules).forEach(([moduleId, value]) => {
        if (validModuleIds.has(moduleId)) {
          collapsedModules[moduleId] = Boolean(value);
        }
      });
    }

    const preferences = {
      theme: ["light", "dark"].includes(importedState.preferences?.theme)
        ? importedState.preferences.theme
        : state.preferences.theme,
      readingSize: ["normal", "large"].includes(importedState.preferences?.readingSize)
        ? importedState.preferences.readingSize
        : state.preferences.readingSize
    };

    return { completed, lastChapterId, notes, confidence, collapsedModules, preferences };
  }

  function getDateStamp() {
    return new Date().toISOString().slice(0, 10);
  }

  function isCompleted(chapterId) {
    return state.completed.includes(chapterId);
  }

  function findChapter(chapterId) {
    return chapters.find((chapter) => chapter.id === chapterId);
  }

  function getChapterModule(chapterId) {
    return modules.find((module) => module.chapterIds.includes(chapterId));
  }

  function getSuggestedChapter() {
    return chapters.find((chapter) => !isCompleted(chapter.id)) || chapters[chapters.length - 1];
  }

  function getNotesCount() {
    return Object.values(state.notes).filter((note) => note.trim()).length;
  }

  function getReadingMinutes(chapter) {
    const content = [
      chapter.title,
      chapter.description,
      ...chapter.text,
      chapter.ihk,
      chapter.summary,
      chapter.example,
      ...chapter.exercises.flatMap((exercise) => [exercise.question, exercise.answer])
    ].join(" ");
    const words = content.trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / 180));
  }

  function escapeAttribute(value) {
    return value
      .replaceAll("&", "&amp;")
      .replaceAll('"', "&quot;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
  }

  function escapeHtml(value) {
    return value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
  }

  function focusApp() {
    app.focus({ preventScroll: true });
  }

  function registerServiceWorker() {
    const canRegister = "serviceWorker" in navigator && window.location.protocol !== "file:";
    if (!canRegister) return;

    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js").catch(() => {
        // The app works without the service worker; cache registration is a progressive enhancement.
      });
    });
  }
})();
