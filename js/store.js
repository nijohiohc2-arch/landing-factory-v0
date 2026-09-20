/* Landing Factory V0 — LocalStorage data layer */

const LF_KEYS = {
  projects: "lf_v0_projects",
  landings: "lf_v0_landings",
};

function uid(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-4)}`;
}

function slugify(text) {
  const map = {
    황금시대: "gold",
    금은방: "goldshop",
    금시세: "goldprice",
  };
  if (map[text]) return map[text];
  const ascii = String(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]+/g, "-")
    .replace(/^-|-$/g, "");
  if (/^[a-z0-9-]+$/.test(ascii) && ascii.length >= 2) return ascii.slice(0, 16);
  return "lp";
}

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

const Store = {
  allProjects() {
    return read(LF_KEYS.projects, []);
  },
  allLandings() {
    return read(LF_KEYS.landings, []);
  },
  getProject(id) {
    return this.allProjects().find((p) => p.id === id) || null;
  },
  getLanding(id) {
    return this.allLandings().find((l) => l.id === id) || null;
  },
  landingsByProject(projectId) {
    return this.allLandings()
      .filter((l) => l.projectId === projectId)
      .sort((a, b) => a.index - b.index);
  },
  saveProject(project) {
    const list = this.allProjects();
    const i = list.findIndex((p) => p.id === project.id);
    if (i >= 0) list[i] = project;
    else list.unshift(project);
    write(LF_KEYS.projects, list);
    return project;
  },
  saveLanding(landing) {
    const list = this.allLandings();
    const i = list.findIndex((l) => l.id === landing.id);
    if (i >= 0) list[i] = landing;
    else list.push(landing);
    write(LF_KEYS.landings, list);
    return landing;
  },
  saveLandings(landings) {
    const list = this.allLandings();
    landings.forEach((landing) => {
      const i = list.findIndex((l) => l.id === landing.id);
      if (i >= 0) list[i] = landing;
      else list.push(landing);
    });
    write(LF_KEYS.landings, list);
  },
  deleteLanding(id) {
    write(
      LF_KEYS.landings,
      this.allLandings().filter((l) => l.id !== id)
    );
  },
  deleteProject(id) {
    write(
      LF_KEYS.projects,
      this.allProjects().filter((p) => p.id !== id)
    );
    write(
      LF_KEYS.landings,
      this.allLandings().filter((l) => l.projectId !== id)
    );
  },
  nextSlug(brand, index) {
    const base = slugify(brand);
    const n = String(index).padStart(2, "0");
    let slug = `${base}-${n}`;
    const existing = new Set(this.allLandings().map((l) => l.slug));
    let k = 0;
    while (existing.has(slug)) {
      k += 1;
      slug = `${base}-${n}-${k}`;
    }
    return slug;
  },
};
