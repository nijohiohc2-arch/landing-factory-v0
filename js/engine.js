/* Landing Factory V0 — mock generation engine
   10 market hypotheses × 5 design systems */

const STRATEGIES = [
  { key: "price", label: "가격형", focus: "지금 내 금의 가치", order: ["hero", "benefits", "problem", "solution", "steps", "trust", "faq", "cta"] },
  { key: "loss", label: "손실회피형", focus: "잘못 팔면 손해", order: ["hero", "problem", "solution", "benefits", "trust", "steps", "faq", "cta"] },
  { key: "free", label: "무료혜택형", focus: "무료 혜택을 먼저", order: ["hero", "benefits", "steps", "trust", "problem", "solution", "faq", "cta"] },
  { key: "trust", label: "신뢰형", focus: "전문성과 신뢰", order: ["hero", "trust", "steps", "solution", "benefits", "problem", "faq", "cta"] },
  { key: "edu", label: "교육형", focus: "사전에 알아야 할 것", order: ["hero", "problem", "solution", "benefits", "steps", "faq", "trust", "cta"] },
  { key: "urgency", label: "긴급성형", focus: "지금 바로 확인", order: ["hero", "problem", "benefits", "steps", "solution", "trust", "faq", "cta"] },
  { key: "solve", label: "문제해결형", focus: "고민을 한 번에 정리", order: ["hero", "problem", "solution", "steps", "benefits", "trust", "faq", "cta"] },
  { key: "story", label: "스토리형", focus: "고객 경험/사례", order: ["hero", "story", "problem", "solution", "benefits", "trust", "faq", "cta"] },
  { key: "compare", label: "비교형", focus: "일반 판매 vs 전문 상담", order: ["hero", "compare", "solution", "benefits", "trust", "steps", "faq", "cta"] },
  { key: "direct", label: "직관형", focus: "짧고 강력한 CTA", order: ["hero", "benefits", "cta", "steps", "trust", "faq"] },
];

const DESIGNS = [
  { key: "premium", label: "Premium" },
  { key: "minimal", label: "Minimal" },
  { key: "trust", label: "Trust" },
  { key: "direct", label: "Direct" },
  { key: "editorial", label: "Editorial" },
];

const DESIGN_PAIRING = ["premium", "direct", "minimal", "trust", "editorial", "direct", "trust", "editorial", "premium", "minimal"];

function pick(input, key, fallback) {
  const v = (input[key] || "").trim();
  return v || fallback;
}
function brandOf(input) { return pick(input, "brand", "브랜드"); }
function actionOf(input) { return pick(input, "action", "문의하기"); }
function productOf(input) { return pick(input, "product", "서비스"); }
function targetOf(input) { return pick(input, "target", "고객"); }
function problemOf(input) { return pick(input, "problem", "필요한 정보를 혼자 판단하기 어렵습니다."); }
function notesOf(input) { return (input.notes || "").trim(); }
function extraBenefits(input) {
  const raw = (input.benefits || "").trim();
  if (!raw) return [];
  return raw.split(/\n|•|,/).map((s) => s.trim()).filter(Boolean).slice(0, 4);
}

function generateContent(input, strategy) {
  const brand = brandOf(input);
  const action = actionOf(input);
  const product = productOf(input);
  const target = targetOf(input);
  const problem = problemOf(input);
  const brandDesc = pick(input, "brandDesc", `${brand}는 ${target}을 위한 ${product}를 제공합니다.`);
  const price = (input.price || "").trim();
  const extras = extraBenefits(input);

  const templates = {
    price: {
      eyebrow: "VALUE CHECK",
      headline: `지금, 내 것은 얼마일까요?`,
      subheadline: `${target}을 위한 ${product}. 추측이 아니라 현재 기준의 예상 가치를 먼저 확인하세요.`,
      cta: action,
      problemTitle: "가치를 모른 채 결정하는 순간",
      problemBody: problem,
      solutionTitle: `${brand}의 해법`,
      solutionBody: `${brandDesc} 가격·조건·다음 행동을 한 자리에서 정리해 드립니다.`,
      benefits: [
        { title: "현재 기준 확인", desc: "감이 아닌 오늘의 기준으로 예상 가치를 뱃니다." },
        { title: "손해 구간 점검", desc: "급하게 처분할 때 흔히 놓치는 지점을 집습니다." },
        { title: "다음 선택지 정리", desc: "팔지, 기다릴지, 상담이 필요한지 먼저 가릅니다." },
      ],
      storyTitle: "가치가 보이면 선택이 쉬워집니다",
      storyBody: `많은 ${target}이 “대충 이 정도겠지”로 결정을 미루다 타이밍을 놓칩니다. ${brand}는 숫자부터 맞춰 드립니다.`,
      compareLeftTitle: "혼자 알아보기",
      compareRightTitle: `${brand} 상담`,
      compareLeft: ["시세와 실제 조건이 따로 논다", "급하면 낮은 제안에 흔들린다", "다음에 뭘 해야 할지 남는다"],
      compareRight: ["현재 기준을 먼저 맞춘다", "조건의 차이를 설명받는다", `${action}으로 바로 이어진다`],
    },
    loss: {
      eyebrow: "DON'T LOSE VALUE",
      headline: `잘못 팔면, 그대로 손해입니다`,
      subheadline: `${problem} ${brand}에서 처분 전에 한 번만 점검하세요.`,
      cta: `손해 보기 전에 ${action}`,
      problemTitle: "가장 비싼 실수는 ‘잘 모름’입니다",
      problemBody: problem,
      solutionTitle: "팔기 전에 확인하는 한 단계",
      solutionBody: `${product}로 현재 조건과 리스크를 먼저 분리합니다. 결정은 그 다음입니다.`,
      benefits: [
        { title: "성급한 처분 방지", desc: "낮은 제안에도 이유를 알고 거절할 수 있습니다." },
        { title: "숨은 비용 점검", desc: "수수료·감가·조건 차이를 미리 뱃니다." },
        { title: "판단 기준 확보", desc: "감정 대신 기준을 들고 협상할 수 있습니다." },
      ],
      storyTitle: "이미 손해를 본 뒤에 오는 경우가 많습니다",
      storyBody: `“나중에 알아보니 너무 싸게 넘겼어요.” ${target}이 가장 많이 하는 말입니다. ${brand}는 그 문장 앞에 서고 싶습니다.`,
      compareLeftTitle: "급하게 처분",
      compareRightTitle: "점검 후 결정",
      compareLeft: ["첫 제안을 거의 수용", "비교할 기준이 없음", "나중에야 후회"],
      compareRight: ["기준을 먼저 확보", "조건을 비교 가능", "선택에 이유가 남음"],
    },
    free: {
      eyebrow: "FREE CONSULT",
      headline: `부담 없이, 먼저 확인하세요`,
      subheadline: `${product}. 비용이 아닌 확인부터 시작합니다.`,
      cta: action,
      problemTitle: "상담이 부담스러워 미루게 됩니다",
      problemBody: problem,
      solutionTitle: "무료로 시작하는 이유",
      solutionBody: `${brand}는 확인 자체를 장벽으로 두지 않습니다. ${brandDesc}`,
      benefits: [
        { title: "선결제 없음", desc: price ? `기본 확인은 무료, 이후 안내는 ${price}.` : "가치 확인 단계에는 비용이 없습니다." },
        { title: "짧은 소요 시간", desc: "필요한 정보만 받고 바로 방향을 잡습니다." },
        { title: "강제 없는 안내", desc: "확인 후 진행 여부는 전적으로 고객 선택입니다." },
      ],
      storyTitle: "무료인 이유가 있습니다",
      storyBody: `확신이 없는 상태에서 큰 결정을 강요하지 않습니다. ${target}이 먼저 숫자를 보게 하는 것이 ${brand}의 방식입니다.`,
      compareLeftTitle: "유료부터 시작",
      compareRightTitle: `${brand} 무료 확인`,
      compareLeft: ["시작 전에 비용 고민", "정보가 부족한 채 계약", "이탈이 큼"],
      compareRight: ["확인은 무료", "이해한 뒤 결정", "다음 단계만 선택"],
    },
    trust: {
      eyebrow: "TRUST FIRST",
      headline: `믿을 수 있어야 맡깁니다`,
      subheadline: `${target}이 ${product}를 찾는 이유는 하나, 과정이 투명해야 하기 때문입니다.`,
      cta: `${brand}에 ${action}`,
      problemTitle: "정보가 닫혀 있으면 불안합니다",
      problemBody: problem,
      solutionTitle: "과정을 열어 드립니다",
      solutionBody: `${brandDesc} 무엇을 보고, 어떻게 산정하고, 다음에 무엇을 하는지를 설명합니다.`,
      benefits: [
        { title: "설명 가능한 기준", desc: "왜 이 숫자인지 말로 풀어 드립니다." },
        { title: "과장 없는 안내", desc: "가능한 것과 아닌 것을 구분합니다." },
        { title: "기록으로 남는 상담", desc: "상담 내용을 고객이 다시 확인할 수 있게 합니다." },
      ],
      storyTitle: "신뢰는 구호가 아니라 과정입니다",
      storyBody: `${brand}를 찾는 ${target}은 “더 비싸게”보다 “납득되게”를 원합니다. 그 기대에 맞춰 일합니다.`,
      compareLeftTitle: "불투명한 거래",
      compareRightTitle: `${brand} 방식`,
      compareLeft: ["산정 근거가 흐림", "질문이 막힘", "결과만 통보"],
      compareRight: ["근거를 설명", "질문을 환영", "다음 단계까지 공유"],
    },
    edu: {
      eyebrow: "BEFORE YOU DECIDE",
      headline: `결정 전에 꼭 알아야 할 것`,
      subheadline: `${product} 전에, ${target}이 먼저 이해해야 하는 기준을 정리했습니다.`,
      cta: `기준 확인하고 ${action}`,
      problemTitle: "모르는 상태에서 서명하지 마세요",
      problemBody: problem,
      solutionTitle: "짧은 사전 가이드",
      solutionBody: `${brand}는 판매 기술이 아니라 판단에 필요한 질문을 먼저 드립니다. ${brandDesc}`,
      benefits: [
        { title: "시세 ≠ 실제 조건", desc: "보이는 숫자와 받을 수 있는 조건은 다릅니다." },
        { title: "급할수록 기준이 필요", desc: "급한 마음일수록 체크리스트가 필요합니다." },
        { title: "질문 목록 제공", desc: "어디서든 써먹을 수 있는 확인 항목을 드립니다." },
      ],
      storyTitle: "알고 나면 서두르지 않습니다",
      storyBody: `상담을 받은 ${target} 중 상당수는 “바로 팔지 않아도 되겠다”는 안도를 먼저 얻습니다. 그것도 성과입니다.`,
      compareLeftTitle: "지식 없이 진행",
      compareRightTitle: "기준을 가진 진행",
      compareLeft: ["상대 말에 의존", "비교 불가", "사후 의심"],
      compareRight: ["질문할 수 있음", "비교 가능", "결정에 이유가 있음"],
    },
    urgency: {
      eyebrow: "CHECK TODAY",
      headline: `오늘은 어제의 가격이 아닙니다`,
      subheadline: `변동하는 기준을 어제 기억으로 판단하지 마세요. ${product}로 지금을 확인하세요.`,
      cta: `지금 ${action}`,
      problemTitle: "미루면 기준이 바뀍니다",
      problemBody: problem,
      solutionTitle: "오늘 기준으로 다시 맞추기",
      solutionBody: `${brand}는 현재 시점의 조건부터 맞춰 드립니다. 결정은 그 숫자를 본 뒤에 해도 됩니다.`,
      benefits: [
        { title: "현재 시점 확인", desc: "기억 속 시세가 아니라 오늘의 기준입니다." },
        { title: "짧은 응답", desc: "오래 끌지 않고 핵심만 전달합니다." },
        { title: "타이밍 판단", desc: "지금이 나은지, 조금 더 볼지 가늦합니다." },
      ],
      storyTitle: "미루 사이에 조건이 바뀌었습니다",
      storyBody: `“나중에 하려고요.” 그 한마디가 가장 흔한 손실 이유입니다. ${brand}는 확인만이라도 오늘 하시길 권합니다.`,
      compareLeftTitle: "나중에",
      compareRightTitle: "오늘 확인",
      compareLeft: ["기억에 의존", "변동을 놓침", "결정이 더 어려움"],
      compareRight: ["오늘 숫자 확보", "변동을 인지", "다음 행동이 명확"],
    },
    solve: {
      eyebrow: "ONE CLEAR PATH",
      headline: `처분 고민, 여기서 끝냅니다`,
      subheadline: `${problem} ${brand}가 선택지를 단순하게 만들어 드립니다.`,
      cta: `고민 정리하고 ${action}`,
      problemTitle: "문제는 복잡하지 않습니다. 정보가 흐어져 있을 뿐입니다",
      problemBody: problem,
      solutionTitle: "한 줄로 정리되는 다음 행동",
      solutionBody: `${product}를 통해 현재 상태 → 선택지 → 추천 순서를 정리합니다. ${brandDesc}`,
      benefits: [
        { title: "상태 파악", desc: "지금 가진 것과 알고 싶은 것을 먼저 맞춥니다." },
        { title: "선택지 정리", desc: "팔기 / 보류 / 추가 확인 세 갈래로 나눔니다." },
        { title: "실행 지원", desc: "진행을 원하면 바로 다음 단계로 연결합니다." },
      ],
      storyTitle: "고민은 길었지만 결론은 짧았습니다",
      storyBody: `${target}이 ${brand}를 찾는 이유는 복잡한 공부가 아니라, 오늘 내릴 결정 하나를 위해서입니다.`,
      compareLeftTitle: "혼자 검색",
      compareRightTitle: `${brand} 정리`,
      compareLeft: ["정보가 너무 많음", "내 상황에 안 맞음", "결론이 없음"],
      compareRight: ["내 상황 기준", "선택지 3개로 압축", "다음 행동 제시"],
    },
    story: {
      eyebrow: "REAL CASES",
      headline: `같은 고민을 먼저 지나온 사람들`,
      subheadline: `${target}이 ${brand}에서 ${product}를 받고 난 뒤, 가장 자주 하는 말은 “이제야 감이 온다”입니다.`,
      cta: `나도 ${action}`,
      problemTitle: "혼자면 기준이 없습니다",
      problemBody: problem,
      solutionTitle: "경험에서 나온 안내",
      solutionBody: `${brandDesc} 비슷한 상황에서 고객이 실제로 선택했던 길을 참고해 안내합니다.`,
      benefits: [
        { title: "비슷한 사례", desc: "나이·목적·급함에 가까운 사례를 기준으로 설명합니다." },
        { title: "과한 기대 조정", desc: "될 것과 안 될 것을 사례로 보여 드립니다." },
        { title: "결정 후의 안심", desc: "왜 그 선택을 했는지 남는 설명을 드립니다." },
      ],
      storyTitle: "“얼마인지 몰라 불안했어요”",
      storyBody: `30~50대 고객이 가장 많이 꺼내는 문장입니다. 상담 후 돌아가는 이유는 거창한 혜택이 아니라, 숫자가 생겼기 때문입니다.`,
      compareLeftTitle: "남의 후기만 보기",
      compareRightTitle: "내 상황으로 번역",
      compareLeft: ["상황이 다름", "숫자를 내 것에 대입 못함", "여전히 막연"],
      compareRight: ["내 조건으로 재해석", "예상 범위를 제시", "다음 질문까지 준비"],
    },
    compare: {
      eyebrow: "COMPARE",
      headline: `그냥 팔는 것과, 확인하고 팔는 것`,
      subheadline: `${product}의 차이는 화려함이 아니라 기준입니다. ${brand}와 일반 진행을 나란히 보세요.`,
      cta: `차이 확인하고 ${action}`,
      problemTitle: "같은 물건도 과정이 다르면 결과가 다릅니다",
      problemBody: problem,
      solutionTitle: "비교가 가능한 상담",
      solutionBody: `${brand}는 “우리가 최고”보다 “무엇이 다른지”를 먼저 보여 드립니다.`,
      benefits: [
        { title: "조건 비교", desc: "어디가 유리한지 항목별로 뱃니다." },
        { title: "과대광고 제거", desc: "문구가 아니라 실제로 남는 것을 비교합니다." },
        { title: "선택권 유지", desc: "비교 후에도 진행 여부는 고객에게 있습니다." },
      ],
      storyTitle: "비교하지 않으면 항상 상대의 안이 됩니다",
      storyBody: `첫 제안을 기준점이라고 믿으면 협상은 이미 끝난 것과 같습니다. ${brand}는 두 번째 기준점을 만들어 드립니다.`,
      compareLeftTitle: "일반 판매",
      compareRightTitle: `${brand} 전문 상담`,
      compareLeft: ["제시된 숫자를 거의 수용", "과정 설명이 짧음", "비교 자료가 없음"],
      compareRight: ["산정 근거를 설명", "선택지를 나란히 제시", `${action}으로 연결`],
    },
    direct: {
      eyebrow: "START",
      headline: `${action}`,
      subheadline: `${product} — ${target}을 위한 가장 짧은 길.`,
      cta: action,
      problemTitle: "길게 설명할 필요가 없는 이유",
      problemBody: problem,
      solutionTitle: "지금 할 일 하나",
      solutionBody: `정보를 남기면 ${brand}가 현재 기준을 안내합니다. ${brandDesc}`,
      benefits: [
        { title: "한 번의 요청", desc: "복잡한 설정 없이 신청만 하면 됩니다." },
        { title: "핵심만 회신", desc: "필요하지 않은 설명은 줄입니다." },
        { title: "바로 다음 단계", desc: "확인 후 진행이 자연스럽게 이어집니다." },
      ],
      storyTitle: "결정은 짧아도 됩니다",
      storyBody: `긴 페이지가 확신을 만들지는 않습니다. ${brand}는 필요한 행동 하나를 분명하게 보여 드립니다.`,
      compareLeftTitle: "둘러보기",
      compareRightTitle: "바로 신청",
      compareLeft: ["정보가 많아 지침", "행동이 뒤로 밀림"],
      compareRight: ["CTA가 분명", "신청 후 안내"],
    },
  };

  const t = templates[strategy.key];
  extras.forEach((b, i) => {
    if (t.benefits[i]) t.benefits[i].desc = `${t.benefits[i].desc} ${b}`;
    else t.benefits.push({ title: "추가 혜택", desc: b });
  });

  const steps = [
    { n: "01", title: "정보 남기기", desc: `간단한 현황과 연락처만 주시면 됩니다.` },
    { n: "02", title: "기준 확인", desc: `${brand}가 현재 조건과 예상 범위를 안내합니다.` },
    { n: "03", title: "다음 선택", desc: `진행·보류·재확인 중 원하는 길로 이어갑니다.` },
  ];
  const trustItems = [
    { title: "과정 공개", desc: "산정과 안내 순서를 숨기지 않습니다." },
    { title: "강요 없는 상담", desc: "확인과 계약은 분리되어 있습니다." },
    { title: `${target} 기준`, desc: "일반적인 설명이 아니라 고객 상황에 맞춥니다." },
    { title: brand, desc: brandDesc },
  ];
  const faqs = [
    { q: `${action}에는 비용이 드나요?`, a: price ? `기본 확인은 상담 신청으로 시작하며, 이후 안내는 ${price} 기준으로 설명드립니다.` : `V0 기준 안내 단계는 부담을 낮추는 방향으로 설계되어 있습니다. 진행 여부는 확인 후 선택하시면 됩니다.` },
    { q: "어떤 정보를 미리 준비하면 좋나요?", a: `현황을 대략이라도 알고 오시면 더 정확한 안내가 가능합니다. 모르셔도 ${product}부터 시작할 수 있습니다.` },
    { q: `${target}이 아니어도 가능한가요?`, a: `주 타깃은 ${target}이지만, 같은 고민이라면 상담 가능 여부를 안내해 드립니다.` },
    { q: "바로 진행해야 하나요?", a: `아닙니다. ${brand}의 목적은 성급한 결정이 아니라 기준을 만드는 것입니다.` },
  ];
  if (notesOf(input)) faqs.push({ q: "추가로 알아두면 좋은 점", a: notesOf(input) });

  return {
    eyebrow: t.eyebrow, headline: t.headline, subheadline: t.subheadline, cta: t.cta,
    problemTitle: t.problemTitle, problemBody: t.problemBody,
    solutionTitle: t.solutionTitle, solutionBody: t.solutionBody,
    benefits: t.benefits, trustItems, steps, faqs,
    storyTitle: t.storyTitle, storyBody: t.storyBody,
    compareLeftTitle: t.compareLeftTitle, compareRightTitle: t.compareRightTitle,
    compareLeft: t.compareLeft, compareRight: t.compareRight,
    formTitle: `${action}`, formHint: "연락처만 남기시면 안내드립니다.",
    footerNote: `${brand} · ${product}`,
  };
}

function Engine() {}
Engine.strategies = STRATEGIES;
Engine.designs = DESIGNS;
Engine.createProject = function (input) {
  return {
    id: uid("prj"),
    brand: brandOf(input), product: productOf(input), target: targetOf(input),
    problem: problemOf(input), action: actionOf(input),
    brandDesc: (input.brandDesc || "").trim(), benefits: (input.benefits || "").trim(),
    price: (input.price || "").trim(), contact: (input.contact || "").trim(),
    address: (input.address || "").trim(), image: (input.image || "").trim(),
    notes: (input.notes || "").trim(), createdAt: Date.now(),
  };
};
Engine.generateLandings = function (project) {
  return STRATEGIES.map((strategy, i) => {
    const index = i + 1;
    return {
      id: uid("lp"), projectId: project.id, slug: Store.nextSlug(project.brand, index), index,
      strategy: strategy.key, strategyLabel: strategy.label, focus: strategy.focus,
      design: DESIGN_PAIRING[i], status: "published", blockOrder: strategy.order,
      content: generateContent(project, strategy), createdAt: Date.now(), updatedAt: Date.now(),
    };
  });
};
Engine.cloneLanding = function (landing) {
  const copy = JSON.parse(JSON.stringify(landing));
  copy.id = uid("lp");
  copy.slug = `${landing.slug}-copy`;
  const existing = new Set(Store.allLandings().map((l) => l.slug));
  let n = 2;
  while (existing.has(copy.slug)) { copy.slug = `${landing.slug}-copy${n}`; n += 1; }
  copy.status = "draft";
  copy.createdAt = Date.now();
  copy.updatedAt = Date.now();
  return copy;
};
Engine.SAMPLE = {
  product: "금은방 무료 금시세 상담",
  target: "30~50대 여성",
  problem: "내가 가진 금이 현재 얼마인지 모르고, 금을 팔 때 손해 볼까 걱정한다.",
  action: "무료 상담 신청",
  brand: "황금시대",
  brandDesc: "시세만 던지지 않고, 예상 가치와 다음 선택을 함께 정리하는 금시세 상담.",
  benefits: "무료 시세 확인\n처분 전 손해 구간 점검\n강요 없는 안내",
  price: "상담 무료",
  contact: "02-0000-0000",
  address: "서울",
  image: "",
  notes: "급하게 팔지 않아도 됩니다. 확인이 목적입니다.",
};
