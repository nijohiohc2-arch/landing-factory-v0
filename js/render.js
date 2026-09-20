/* Landing Factory V0 — data → HTML renderer */

function escapeHtml(str) {
  return String(str ?? "")
    .replace(/&/g, "&")
    .replace(/</g, "<")
    .replace(/>/g, ">")
    .replace(/"/g, """);
}

function blockHtml(name, landing, project) {
  const c = landing.content;
  const brand = project?.brand || "";
  const contact = project?.contact || "";
  const address = project?.address || "";
  const image = project?.image || "";

  switch (name) {
    case "hero":
      return `
        <section class="lp-hero">
          <div class="lp-wrap">
            <p class="lp-eyebrow">${escapeHtml(c.eyebrow)}</p>
            <h1>${escapeHtml(c.headline)}</h1>
            <p class="lp-sub">${escapeHtml(c.subheadline)}</p>
            <a class="lp-btn" href="#form">${escapeHtml(c.cta)}</a>
            ${image ? `<img class="lp-hero-img" src="${escapeHtml(image)}" alt="">` : ""}
          </div>
        </section>`;
    case "problem":
      return `
        <section class="lp-section">
          <div class="lp-wrap">
            <p class="lp-kicker">문제</p>
            <h2>${escapeHtml(c.problemTitle)}</h2>
            <p class="lp-lead">${escapeHtml(c.problemBody)}</p>
          </div>
        </section>`;
    case "solution":
      return `
        <section class="lp-section lp-alt">
          <div class="lp-wrap">
            <p class="lp-kicker">해결</p>
            <h2>${escapeHtml(c.solutionTitle)}</h2>
            <p class="lp-lead">${escapeHtml(c.solutionBody)}</p>
          </div>
        </section>`;
    case "benefits":
      return `
        <section class="lp-section">
          <div class="lp-wrap">
            <p class="lp-kicker">핵심 혜택</p>
            <h2>이 상담에서 얻는 것</h2>
            <div class="lp-grid">
              ${c.benefits
                .map(
                  (b) => `<article class="lp-card">
                    <h3>${escapeHtml(b.title)}</h3>
                    <p>${escapeHtml(b.desc)}</p>
                  </article>`
                )
                .join("")}
            </div>
          </div>
        </section>`;
    case "trust":
      return `
        <section class="lp-section lp-alt">
          <div class="lp-wrap">
            <p class="lp-kicker">신뢰</p>
            <h2>맡길 수 있는 이유</h2>
            <div class="lp-grid lp-grid-4">
              ${c.trustItems
                .map(
                  (b) => `<article class="lp-card">
                    <h3>${escapeHtml(b.title)}</h3>
                    <p>${escapeHtml(b.desc)}</p>
                  </article>`
                )
                .join("")}
            </div>
          </div>
        </section>`;
    case "steps":
      return `
        <section class="lp-section">
          <div class="lp-wrap">
            <p class="lp-kicker">진행 방법</p>
            <h2>세 단계면 충분합니다</h2>
            <ol class="lp-steps">
              ${c.steps
                .map(
                  (s) => `<li>
                    <span>${escapeHtml(s.n)}</span>
                    <div><strong>${escapeHtml(s.title)}</strong><p>${escapeHtml(s.desc)}</p></div>
                  </li>`
                )
                .join("")}
            </ol>
          </div>
        </section>`;
    case "story":
      return `
        <section class="lp-section lp-alt">
          <div class="lp-wrap">
            <p class="lp-kicker">이야기</p>
            <h2>${escapeHtml(c.storyTitle)}</h2>
            <p class="lp-lead">${escapeHtml(c.storyBody)}</p>
          </div>
        </section>`;
    case "compare":
      return `
        <section class="lp-section">
          <div class="lp-wrap">
            <p class="lp-kicker">비교</p>
            <h2>한눈에 다른 길</h2>
            <div class="lp-compare">
              <div>
                <h3>${escapeHtml(c.compareLeftTitle)}</h3>
                <ul>${c.compareLeft.map((x) => `<li>${escapeHtml(x)}</li>`).join("")}</ul>
              </div>
              <div class="lp-compare-win">
                <h3>${escapeHtml(c.compareRightTitle)}</h3>
                <ul>${c.compareRight.map((x) => `<li>${escapeHtml(x)}</li>`).join("")}</ul>
              </div>
            </div>
          </div>
        </section>`;
    case "faq":
      return `
        <section class="lp-section lp-alt">
          <div class="lp-wrap">
            <p class="lp-kicker">FAQ</p>
            <h2>자주 묻는 질문</h2>
            <div class="lp-faq">
              ${c.faqs
                .map(
                  (f) => `<details>
                    <summary>${escapeHtml(f.q)}</summary>
                    <p>${escapeHtml(f.a)}</p>
                  </details>`
                )
                .join("")}
            </div>
          </div>
        </section>`;
    case "cta":
      return `
        <section class="lp-cta-band">
          <div class="lp-wrap">
            <h2>${escapeHtml(c.headline)}</h2>
            <p>${escapeHtml(c.subheadline)}</p>
            <a class="lp-btn" href="#form">${escapeHtml(c.cta)}</a>
          </div>
        </section>`;
    case "form":
      return `
        <section class="lp-section" id="form">
          <div class="lp-wrap lp-form-wrap">
            <p class="lp-kicker">문의</p>
            <h2>${escapeHtml(c.formTitle)}</h2>
            <p class="lp-lead">${escapeHtml(c.formHint)}</p>
            <form class="lp-form" onsubmit="event.preventDefault(); this.querySelector('.lp-form-done').hidden=false;">
              <label>이름<input name="name" placeholder="이름" required></label>
              <label>연락처<input name="phone" placeholder="010-0000-0000" required></label>
              <label>메모<textarea name="memo" rows="3" placeholder="현황을 한 줄로"></textarea></label>
              <button class="lp-btn" type="submit">${escapeHtml(c.cta)}</button>
              <p class="lp-form-done" hidden>V0 데모입니다. 실제 전송은 연결되지 않습니다.</p>
            </form>
            ${
              contact || address
                ? `<p class="lp-contact">${escapeHtml([contact, address].filter(Boolean).join(" · "))}</p>`
                : ""
            }
          </div>
        </section>`;
    default:
      return "";
  }
}

const Renderer = {
  page(landing, project, opts = {}) {
    const order = (landing.blockOrder || []).filter((b) => b !== "cta" || landing.strategy === "direct");
    const blocks = [...order, "form"];
    const inner = blocks.map((b) => blockHtml(b, landing, project)).join("\n");
    const previewBar = opts.chrome
      ? `<div class="lp-preview-bar">
           <a href="#/project/${escapeHtml(landing.projectId)}">← 목록</a>
           <span>${escapeHtml(landing.strategyLabel)} · ${escapeHtml(landing.design)} · /p/${escapeHtml(landing.slug)}</span>
           <a href="#/edit/${escapeHtml(landing.id)}">수정</a>
         </div>`
      : "";
    return `
      ${previewBar}
      <article class="lp theme-${escapeHtml(landing.design)}">
        <header class="lp-top">
          <div class="lp-wrap lp-top-inner">
            <strong>${escapeHtml(project?.brand || "")}</strong>
            <a href="#form">${escapeHtml(landing.content.cta)}</a>
          </div>
        </header>
        ${inner}
        <footer class="lp-foot">
          <div class="lp-wrap">
            <p>${escapeHtml(landing.content.footerNote)}</p>
            <small>Landing Factory V0 · 가설 ${escapeHtml(landing.strategyLabel)}</small>
          </div>
        </footer>
      </article>`;
  },
};
