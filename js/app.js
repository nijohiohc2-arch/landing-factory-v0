/* Landing Factory V0 — app shell + routes */

const $app = () => document.getElementById("app");

function parseHash() {
  const raw = (location.hash || "#/").replace(/^#/, "");
  const parts = raw.split("/").filter(Boolean);
  return { parts, path: "/" + parts.join("/") };
}

function go(hash) {
  location.hash = hash;
}

function field(name, label, { textarea, required, placeholder, value } = {}) {
  const tag = textarea
    ? `<textarea name="${name}" rows="3" placeholder="${placeholder || ""}">${value || ""}</textarea>`
    : `<input name="${name}" ${required ? "required" : ""} placeholder="${placeholder || ""}" value="${value || ""}">`;
  return `<label class="f ${required ? "req" : ""}"><span>${label}</span>${tag}</label>`;
}

function viewHome() {
  const projects = Store.allProjects();
  return `
    <div class="shell">
      <header class="topbar">
        <div class="brand">LANDING FACTORY <em>V0</em></div>
        <nav><a class="ghost" href="#/new">새 실험</a></nav>
      </header>
      <section class="hero-factory">
        <p class="kicker">시장 가설 생성기</p>
        <h1>한 번 입력하면<br>전략이 다른 랜딩이 10개.</h1>
        <p class="lede">완벽한 한 장을 만드는 빌더가 아닙니다. 서로 다른 설득 가설을 빠르게 만들어 비교합니다.</p>
        <a class="btn primary" href="#/new">상품 정보 입력</a>
      </section>
      <section class="panel">
        <div class="panel-h">
          <h2>프로젝트</h2>
          <span>${projects.length}개</span>
        </div>
        ${
          projects.length
            ? `<ul class="proj-list">${projects
                .map((p) => {
                  const n = Store.landingsByProject(p.id).length;
                  return `<li>
                    <a href="#/project/${p.id}">
                      <strong>${escapeHtml(p.brand)}</strong>
                      <span>${escapeHtml(p.product)}</span>
                    </a>
                    <em>${n} landings</em>
                  </li>`;
                })
                .join("")}</ul>`
            : `<p class="empty">아직 생성된 실험이 없습니다. 황금시대 예시로 바로 시작할 수 있습니다.</p>`
        }
      </section>
    </div>`;
}

function viewNew() {
  const s = Engine.SAMPLE;
  return `
    <div class="shell narrow">
      <header class="topbar">
        <a class="back" href="#/">←</a>
        <div class="brand">새 실험</div>
      </header>
      <form id="create-form" class="card form-grid">
        <p class="form-intro">필수 5개만 채우면 10개의 시장 가설이 만들어집니다.</p>
        ${field("product", "상품/서비스", { required: true, placeholder: s.product })}
        ${field("target", "타깃 고객", { required: true, placeholder: s.target })}
        ${field("problem", "고객의 문제", { required: true, textarea: true, placeholder: s.problem })}
        ${field("action", "원하는 행동", { required: true, placeholder: s.action })}
        ${field("brand", "브랜드명", { required: true, placeholder: s.brand })}
        <details class="more">
          <summary>선택 입력</summary>
          ${field("brandDesc", "브랜드 설명", { textarea: true })}
          ${field("benefits", "주요 혜택", { textarea: true, placeholder: "줄바꿈으로 구분" })}
          ${field("price", "가격")}
          ${field("contact", "연락처")}
          ${field("address", "주소")}
          ${field("image", "이미지 URL")}
          ${field("notes", "참고 문구", { textarea: true })}
        </details>
        <div class="form-actions">
          <button type="button" class="btn ghost" id="fill-sample">예시 채우기</button>
          <button type="submit" class="btn primary">랜딩 10개 생성</button>
        </div>
      </form>
    </div>`;
}

function viewProject(id) {
  const project = Store.getProject(id);
  if (!project) return `<div class="shell"><p class="empty">프로젝트를 찾을 수 없습니다. <a href="#/">홈</a></p></div>`;
  const landings = Store.landingsByProject(id);
  return `
    <div class="shell">
      <header class="topbar">
        <a class="back" href="#/">←</a>
        <div class="brand">${escapeHtml(project.brand)} <em>${escapeHtml(project.product)}</em></div>
        <nav>
          <button class="ghost" id="regen">다시 생성</button>
          <button class="ghost danger" id="wipe">삭제</button>
        </nav>
      </header>
      <section class="meta-line">
        <span>타깃 ${escapeHtml(project.target)}</span>
        <span>행동 ${escapeHtml(project.action)}</span>
        <span>${landings.length} hypotheses</span>
      </section>
      <ul class="lp-list">
        ${landings
          .map(
            (l) => `<li class="lp-row theme-chip-${escapeHtml(l.design)}">
              <div class="idx">${String(l.index).padStart(2, "0")}</div>
              <div class="info">
                <strong>${escapeHtml(l.strategyLabel)}</strong>
                <span>${escapeHtml(l.focus)}</span>
                <code>/p/${escapeHtml(l.slug)}</code>
              </div>
              <div class="tags">
                <em>${escapeHtml(l.design)}</em>
                <i>${escapeHtml(l.status)}</i>
              </div>
              <div class="acts">
                <a href="#/p/${escapeHtml(l.slug)}">미리보기</a>
                <a href="#/edit/${escapeHtml(l.id)}">수정</a>
                <button data-clone="${escapeHtml(l.id)}">복제</button>
                <button type="button" data-copy-link="${escapeHtml(l.slug)}">링크 복사</button>
              </div>
            </li>`
          )
          .join("")}
      </ul>
    </div>`;
}

function viewEdit(id) {
  const landing = Store.getLanding(id);
  if (!landing) return `<div class="shell"><p class="empty">랜딩을 찾을 수 없습니다.</p></div>`;
  const c = landing.content;
  const project = Store.getProject(landing.projectId);
  return `
    <div class="shell narrow">
      <header class="topbar">
        <a class="back" href="#/project/${landing.projectId}">←</a>
        <div class="brand">수정 · ${escapeHtml(landing.strategyLabel)}</div>
        <nav><a class="ghost" href="#/p/${escapeHtml(landing.slug)}">미리보기</a></nav>
      </header>
      <form id="edit-form" class="card form-grid">
        <p class="form-intro">${escapeHtml(project?.brand || "")} / ${escapeHtml(landing.design)} / ${escapeHtml(landing.slug)}</p>
        ${field("headline", "HEADLINE", { value: escapeHtml(c.headline) })}
        ${field("subheadline", "SUB HEADLINE", { textarea: true, value: escapeHtml(c.subheadline) })}
        ${field("cta", "CTA", { value: escapeHtml(c.cta) })}
        ${field("problemTitle", "문제 제목", { value: escapeHtml(c.problemTitle) })}
        ${field("problemBody", "문제 본문", { textarea: true, value: escapeHtml(c.problemBody) })}
        ${field("solutionTitle", "해결 제목", { value: escapeHtml(c.solutionTitle) })}
        ${field("solutionBody", "해결 본문", { textarea: true, value: escapeHtml(c.solutionBody) })}
        ${field("storyTitle", "스토리 제목", { value: escapeHtml(c.storyTitle) })}
        ${field("storyBody", "스토리 본문", { textarea: true, value: escapeHtml(c.storyBody) })}
        <label class="f"><span>디자인</span>
          <select name="design">
            ${Engine.designs.map((d) => `<option value="${d.key}" ${d.key === landing.design ? "selected" : ""}>${d.label}</option>`).join("")}
          </select>
        </label>
        <label class="f"><span>상태</span>
          <select name="status">
            <option value="published" ${landing.status === "published" ? "selected" : ""}>published</option>
            <option value="draft" ${landing.status === "draft" ? "selected" : ""}>draft</option>
          </select>
        </label>
        <div class="form-actions">
          <button class="btn primary" type="submit">저장</button>
        </div>
      </form>
    </div>`;
}

function viewPublic(slug, chrome) {
  const landing = Store.allLandings().find((l) => l.slug === slug);
  if (!landing) {
    return `<div class="shell"><p class="empty">페이지를 찾을 수 없습니다. <a href="#/">홈으로</a></p></div>`;
  }
  const project = Store.getProject(landing.projectId);
  return Renderer.page(landing, project, { chrome });
}

function landingUrl(slug) {
  return `${location.origin}${location.pathname.replace(/\/$/, "")}#/p/${slug}`;
}

function bindPublic(slug) {
  document.querySelectorAll("[data-device]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const mode = btn.dataset.device;
      document.body.classList.toggle("device-mobile", mode === "mobile");
      document.body.classList.toggle("device-desktop", mode !== "mobile");
      document.querySelectorAll("[data-device]").forEach((b) => b.classList.toggle("is-on", b === btn));
    });
  });
  document.querySelectorAll("[data-copy-link]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const url = landingUrl(btn.dataset.copyLink || slug);
      try {
        await navigator.clipboard.writeText(url);
        btn.textContent = "복사됨";
        setTimeout(() => { btn.textContent = "링크 복사"; }, 1400);
      } catch {
        prompt("링크를 복사하세요", url);
      }
    });
  });
}

function bindHome() {}

function formToObject(form) {
  const data = {};
  new FormData(form).forEach((v, k) => { data[k] = v; });
  return data;
}

function bindNew() {
  document.getElementById("fill-sample")?.addEventListener("click", () => {
    const form = document.getElementById("create-form");
    Object.entries(Engine.SAMPLE).forEach(([k, v]) => {
      if (form[k]) form[k].value = v;
    });
  });
  document.getElementById("create-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = formToObject(e.target);
    const project = Engine.createProject(input);
    const landings = Engine.generateLandings(project);
    Store.saveProject(project);
    Store.saveLandings(landings);
    go(`#/project/${project.id}`);
  });
}

function bindProject(id) {
  document.getElementById("regen")?.addEventListener("click", () => {
    const project = Store.getProject(id);
    if (!project) return;
    if (!confirm("기존 랜딩을 지우고 10개를 다시 생성할까요?")) return;
    Store.allLandings().filter((l) => l.projectId === id).forEach((l) => Store.deleteLanding(l.id));
    Store.saveLandings(Engine.generateLandings(project));
    render();
  });
  document.getElementById("wipe")?.addEventListener("click", () => {
    if (!confirm("프로젝트와 랜딩을 모두 삭제할까요?")) return;
    Store.deleteProject(id);
    go("#/");
  });
  document.querySelectorAll("[data-clone]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const src = Store.getLanding(btn.dataset.clone);
      if (!src) return;
      Store.saveLanding(Engine.cloneLanding(src));
      render();
    });
  });
  bindPublic();
}

function bindEdit(id) {
  document.getElementById("edit-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const landing = Store.getLanding(id);
    const data = formToObject(e.target);
    landing.design = data.design;
    landing.status = data.status;
    landing.updatedAt = Date.now();
    ["headline", "subheadline", "cta", "problemTitle", "problemBody", "solutionTitle", "solutionBody", "storyTitle", "storyBody"].forEach((k) => {
      if (data[k] != null) landing.content[k] = data[k];
    });
    Store.saveLanding(landing);
    go(`#/p/${landing.slug}`);
  });
}

function render() {
  const { parts } = parseHash();
  const root = $app();
  document.body.classList.remove("public-mode");
  if (parts[0] === "new") { root.innerHTML = viewNew(); bindNew(); return; }
  if (parts[0] === "project" && parts[1]) { root.innerHTML = viewProject(parts[1]); bindProject(parts[1]); return; }
  if (parts[0] === "edit" && parts[1]) { root.innerHTML = viewEdit(parts[1]); bindEdit(parts[1]); return; }
  if (parts[0] === "p" && parts[1]) {
    document.body.classList.add("public-mode", "device-desktop");
    root.innerHTML = viewPublic(parts[1], true);
    bindPublic(parts[1]);
    return;
  }
  root.innerHTML = viewHome();
  bindHome();
}

window.addEventListener("hashchange", render);
window.addEventListener("DOMContentLoaded", render);
