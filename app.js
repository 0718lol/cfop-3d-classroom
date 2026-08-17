import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { algorithms, crossCases } from './algorithms.js';

const allStages = [
  { id: 'cross', short: '十字', en: 'CROSS', cases: crossCases },
  { id: 'f2l', short: '前两层', en: 'F2L', cases: algorithms.filter(item => item.category === 'F2L') },
  { id: 'oll', short: '顶面定向', en: 'OLL', cases: algorithms.filter(item => item.category === 'OLL') },
  { id: 'pll', short: '顶层排列', en: 'PLL', cases: algorithms.filter(item => item.category === 'PLL') }
];

const learningPaths = [
  {
    id: 'starter', number: '01', title: '起步', subtitle: '2-Look 最小闭环',
    description: '先建立最后一层的完整解题闭环：十字、基础 OLL 和最常用 PLL。',
    includes: item => (item.category === 'CROSS' && item.difficulty <= 1) || (item.category === 'OLL' && item.number >= 21 && item.number <= 28) || (item.category === 'PLL' && ['Aa', 'E', 'Ua', 'Ub', 'H', 'Z'].includes(item.name))
  },
  {
    id: 'accelerate', number: '02', title: '加速', subtitle: '高频 F2L + 全 PLL',
    description: '先把常见 F2L 结构和全部 PLL 建成肌肉记忆，明显减少停顿。',
    includes: item => (item.category === 'CROSS' && item.difficulty <= 2) || (item.category === 'F2L' && Number(item.name.split(' ')[1]) <= 16) || item.category === 'PLL'
  },
  {
    id: 'advanced', number: '03', title: '进阶', subtitle: '完整最后一层',
    description: '集中完成 57 OLL 与 21 PLL，训练识别和持 cube 方向。',
    includes: item => (item.category === 'CROSS' && item.difficulty <= 3) || item.category === 'OLL' || item.category === 'PLL'
  },
  {
    id: 'mastery', number: '04', title: '精通', subtitle: '完整 CFOP 案例库',
    description: '开放 15 个十字训练与全部 119 个 CFOP 公式，系统补齐每个薄弱项。',
    includes: () => true
  }
];

const stageCopy = {
  CROSS: {
    goal: '通过固定白底十字案例练习观察、规划和八步内复原，理解每一步怎样同时处理多个棱块。',
    focus: '白色中心保持在底面，先规划四个白色棱块的顺序，再观察侧色是否与中心对齐。'
  },
  F2L: {
    goal: '识别角块与棱块的相对位置，先配对，再把这一对插入正确槽位。',
    focus: '观察角块和棱块如何从当前形态转成配对状态，再一起进入右前槽。'
  },
  OLL: {
    goal: '只调整最后一层块的朝向，让顶面成为统一颜色，侧面暂时不要求归位。',
    focus: '辨认顶面图案和侧面黄色贴纸的位置，再选择对应 OLL。'
  },
  PLL: {
    goal: '保持顶面朝向不变，交换最后一层块的位置，完成整个魔方。',
    focus: '先找侧面的色块、车灯或完整色条，再判断 PLL 类型和持 cube 方向。'
  }
};

const movesOf = value => value.split(/\s+/).filter(Boolean);

const sceneHost = document.getElementById('scene');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
camera.position.set(7.6, 6.4, 8.6);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
sceneHost.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 7;
controls.maxDistance = 18;
controls.target.set(0, 0, 0);

scene.add(new THREE.HemisphereLight(0xffffff, 0x839087, 2.4));
const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
keyLight.position.set(5, 9, 7);
keyLight.castShadow = true;
scene.add(keyLight);
const fillLight = new THREE.DirectionalLight(0xffffff, 1.6);
fillLight.position.set(-6, 2, -4);
scene.add(fillLight);

const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.ShadowMaterial({ color: 0x414842, opacity: 0.14 })
);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -2.35;
ground.receiveShadow = true;
scene.add(ground);

const cubeRoot = new THREE.Group();
cubeRoot.rotation.x = -0.05;
scene.add(cubeRoot);

const COLORS = {
  R: 0xd9463b, L: 0xef7f22, U: 0xf1cf2f,
  D: 0xf4f5ef, F: 0x2c9a62, B: 0x2f65c5,
  body: 0x171a18, hidden: 0x202420
};
const cubies = [];
const cubieSize = 1.34;
const gap = 0.12;

function faceMaterials(x, y, z) {
  const material = value => new THREE.MeshStandardMaterial({ color: value, roughness: 0.34, metalness: 0.02 });
  return [
    material(x === 1 ? COLORS.R : COLORS.body),
    material(x === -1 ? COLORS.L : COLORS.body),
    material(y === 1 ? COLORS.U : COLORS.body),
    material(y === -1 ? COLORS.D : COLORS.body),
    material(z === 1 ? COLORS.F : COLORS.body),
    material(z === -1 ? COLORS.B : COLORS.body)
  ];
}

function buildCube() {
  for (let x = -1; x <= 1; x++) for (let y = -1; y <= 1; y++) for (let z = -1; z <= 1; z++) {
    if (x === 0 && y === 0 && z === 0) continue;
    const geometry = new THREE.BoxGeometry(cubieSize, cubieSize, cubieSize, 2, 2, 2);
    const cubie = new THREE.Mesh(geometry, faceMaterials(x, y, z));
    cubie.position.set(x * (cubieSize + gap), y * (cubieSize + gap), z * (cubieSize + gap));
    cubie.castShadow = true;
    cubie.receiveShadow = true;
    cubie.userData.coord = new THREE.Vector3(x, y, z);
    cubies.push(cubie);
    cubeRoot.add(cubie);
  }
}
buildCube();

const quarter = Math.PI / 2;
const moveDefs = {
  R: { axis: 'x', angle: -quarter, select: value => value === 1 },
  L: { axis: 'x', angle: quarter, select: value => value === -1 },
  U: { axis: 'y', angle: -quarter, select: value => value === 1 },
  D: { axis: 'y', angle: quarter, select: value => value === -1 },
  F: { axis: 'z', angle: -quarter, select: value => value === 1 },
  B: { axis: 'z', angle: quarter, select: value => value === -1 },
  r: { axis: 'x', angle: -quarter, select: value => value >= 0 },
  l: { axis: 'x', angle: quarter, select: value => value <= 0 },
  u: { axis: 'y', angle: -quarter, select: value => value >= 0 },
  d: { axis: 'y', angle: quarter, select: value => value <= 0 },
  f: { axis: 'z', angle: -quarter, select: value => value >= 0 },
  b: { axis: 'z', angle: quarter, select: value => value <= 0 },
  M: { axis: 'x', angle: quarter, select: value => value === 0 },
  E: { axis: 'y', angle: quarter, select: value => value === 0 },
  S: { axis: 'z', angle: -quarter, select: value => value === 0 },
  x: { axis: 'x', angle: -quarter, select: () => true },
  y: { axis: 'y', angle: -quarter, select: () => true },
  z: { axis: 'z', angle: -quarter, select: () => true }
};

let activePath = 0;
let activeStage = 0;
let activeCase = 0;
let step = 0;
let moving = false;
let playing = false;
let speed = 1;
let playTimer = null;
let studyMode = 'learn';
let formulaRevealed = true;
let testState = 'idle';
let testResult = null;
let testStartedAt = 0;
let testElapsed = 0;
let testTimerId = null;
let pathExamActive = false;
let pathExamQueue = [];
let pathExamIndex = 0;
let pathExamSuccesses = 0;
let pathExamElapsed = 0;
let testTimedOut = false;
const pathExamQuestionLimit = 10;
const pathExamTimeLimit = 15000;
const masteredStorageKey = 'cfop-3d-classroom-mastered-v1';
const masteredCases = new Set(JSON.parse(localStorage.getItem(masteredStorageKey) || '[]'));
const testResultsStorageKey = 'cfop-3d-classroom-test-results-v1';
const testResults = JSON.parse(localStorage.getItem(testResultsStorageKey) || '{}');
const pathExamResultsStorageKey = 'cfop-3d-classroom-path-exams-v1';
const pathExamResults = JSON.parse(localStorage.getItem(pathExamResultsStorageKey) || '{}');
let currentAccount = null;
let syncTimer = null;

function localProfile() {
  return { mastered: [...masteredCases], testResults, pathExamResults };
}

function applyProfile(profile) {
  masteredCases.clear();
  (Array.isArray(profile?.mastered) ? profile.mastered : []).forEach(key => masteredCases.add(key));
  Object.keys(testResults).forEach(key => delete testResults[key]);
  Object.assign(testResults, profile?.testResults || {});
  Object.keys(pathExamResults).forEach(key => delete pathExamResults[key]);
  Object.assign(pathExamResults, profile?.pathExamResults || {});
  localStorage.setItem(masteredStorageKey, JSON.stringify([...masteredCases]));
  localStorage.setItem(testResultsStorageKey, JSON.stringify(testResults));
  localStorage.setItem(pathExamResultsStorageKey, JSON.stringify(pathExamResults));
}

function syncProfile() {
  if (!currentAccount) return;
  clearTimeout(syncTimer);
  syncTimer = setTimeout(async () => {
    try {
      await fetch('/api/account', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: currentAccount, profile: localProfile() }) });
    } catch (error) { console.warn('Profile sync unavailable', error); }
  }, 250);
}

function setAccountLabel(name) { document.getElementById('accountName').textContent = name || '游客'; }

function showAuthScreen() {
  document.getElementById('authScreen').hidden = false;
}

function hideAuthScreen() {
  document.getElementById('authScreen').hidden = true;
}

async function enterAccount(name, migrate = false) {
  const response = await fetch('/api/account', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, migrate, profile: localProfile() }) });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || '无法接入档案');
  currentAccount = result.name;
  applyProfile(result.profile);
  setAccountLabel(currentAccount);
  hideAuthScreen();
  renderLesson();
  await prepareCase();
}

function enterGuest() {
  currentAccount = null;
  setAccountLabel('游客');
  hideAuthScreen();
}

document.getElementById('authForm').addEventListener('submit', async event => {
  event.preventDefault();
  const input = document.getElementById('authName');
  const error = document.getElementById('authError');
  error.hidden = true;
  try { await enterAccount(input.value.trim(), input.value.trim() === '王安畅'); }
  catch (reason) { error.textContent = reason.message; error.hidden = false; }
});
document.getElementById('guestEntry').addEventListener('click', enterGuest);
document.getElementById('logoutAccount').addEventListener('click', () => {
  currentAccount = null;
  document.getElementById('authName').value = '';
  document.getElementById('authError').hidden = true;
  showAuthScreen();
});

function parseMove(notation) {
  const base = moveDefs[notation[0]];
  if (!base) throw new Error(`Unsupported move: ${notation}`);
  const prime = notation.includes("'");
  const twice = notation.includes('2');
  return { ...base, angle: base.angle * (prime ? -1 : 1) * (twice ? 2 : 1) };
}

function inverseMove(notation) {
  if (notation.includes('2')) return notation;
  return notation.includes("'") ? notation[0] : `${notation}'`;
}

function rotateCoord(coord, axis, angle) {
  const v = coord.clone();
  const q = new THREE.Quaternion().setFromAxisAngle(
    new THREE.Vector3(axis === 'x' ? 1 : 0, axis === 'y' ? 1 : 0, axis === 'z' ? 1 : 0), angle
  );
  v.applyQuaternion(q);
  v.set(Math.round(v.x), Math.round(v.y), Math.round(v.z));
  return v;
}

function executeMove(notation, animate = true) {
  if (moving) return Promise.resolve(false);
  moving = true;
  document.querySelector('#turnBadge strong').textContent = notation;
  const def = parseMove(notation);
  const selected = cubies.filter(c => def.select(Math.round(c.userData.coord[def.axis])));
  const pivot = new THREE.Group();
  cubeRoot.add(pivot);
  selected.forEach(c => pivot.attach(c));
  const duration = animate ? 440 / speed * (notation.includes('2') ? 1.35 : 1) : 0;
  const started = performance.now();
  return new Promise(resolve => {
    function frame(now) {
      const t = duration ? Math.min(1, (now - started) / duration) : 1;
      const eased = 1 - Math.pow(1 - t, 3);
      pivot.rotation[def.axis] = def.angle * eased;
      if (t < 1) return requestAnimationFrame(frame);
      pivot.rotation[def.axis] = def.angle;
      pivot.updateMatrixWorld();
      selected.forEach(c => {
        cubeRoot.attach(c);
        c.userData.coord = rotateCoord(c.userData.coord, def.axis, def.angle);
        c.position.set(
          c.userData.coord.x * (cubieSize + gap),
          c.userData.coord.y * (cubieSize + gap),
          c.userData.coord.z * (cubieSize + gap)
        );
        c.rotation.x = Math.round(c.rotation.x / (Math.PI / 2)) * (Math.PI / 2);
        c.rotation.y = Math.round(c.rotation.y / (Math.PI / 2)) * (Math.PI / 2);
        c.rotation.z = Math.round(c.rotation.z / (Math.PI / 2)) * (Math.PI / 2);
      });
      cubeRoot.remove(pivot);
      moving = false;
      resolve(true);
    }
    requestAnimationFrame(frame);
  });
}

function restoreSolved() {
  stopPlayback();
  cubies.forEach(c => cubeRoot.remove(c));
  cubies.splice(0).forEach(c => { c.geometry.dispose(); c.material.forEach(m => m.dispose()); });
  buildCube();
}

async function prepareCase() {
  restoreSolved();
  step = 0;
  const sequence = movesOf(currentCase().setup);
  for (const move of sequence) await executeMove(move, false);
  document.querySelector('#turnBadge strong').textContent = '准备';
  updateProgress();
  updateModeUI();
}

function currentCase() {
  return visibleStages()[activeStage].cases[activeCase];
}

function currentMoves() {
  return movesOf(currentCase().algorithm);
}

function visibleStages() {
  const path = learningPaths[activePath];
  return allStages
    .map(stage => ({ ...stage, cases: stage.cases.filter(path.includes) }))
    .filter(stage => stage.cases.length);
}

function caseKey(item) {
  return `${item.category}:${item.name}`;
}

function persistMasteredCases() {
  localStorage.setItem(masteredStorageKey, JSON.stringify([...masteredCases]));
  syncProfile();
}

function persistTestResults() {
  localStorage.setItem(testResultsStorageKey, JSON.stringify(testResults));
  syncProfile();
}

function formatTestTime(milliseconds) {
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = Math.floor(milliseconds / 1000) % 60;
  const tenths = Math.floor(milliseconds / 100) % 10;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${tenths}`;
}

function formatCountdown(milliseconds) {
  return formatTestTime(Math.ceil(Math.max(0, milliseconds) / 100) * 100);
}

function updateTestTimer() {
  const elapsed = testState === 'running' ? performance.now() - testStartedAt : testElapsed;
  if (pathExamActive) {
    const remaining = testState === 'idle'
      ? pathExamTimeLimit
      : Math.max(0, pathExamTimeLimit - elapsed);
    document.getElementById('testTimer').textContent = formatCountdown(remaining);
    if (testState === 'running' && elapsed >= pathExamTimeLimit) finishTestRound(true);
    return;
  }
  document.getElementById('testTimer').textContent = formatTestTime(elapsed);
}

function stopTestClock() {
  clearInterval(testTimerId);
  testTimerId = null;
}

function resetModeState() {
  stopTestClock();
  testState = 'idle';
  testResult = null;
  testElapsed = 0;
  pathExamActive = false;
  pathExamQueue = [];
  pathExamIndex = 0;
  pathExamSuccesses = 0;
  pathExamElapsed = 0;
  testTimedOut = false;
  formulaRevealed = studyMode === 'learn';
  updateTestTimer();
}

function pathCases(path) {
  return allStages.flatMap(stage => stage.cases).filter(path.includes);
}

function shuffled(items) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index--) {
    const target = Math.floor(Math.random() * (index + 1));
    [result[index], result[target]] = [result[target], result[index]];
  }
  return result;
}

function selectCaseItem(item) {
  const stages = visibleStages();
  activeStage = stages.findIndex(stage => stage.en === item.category);
  activeCase = stages[activeStage].cases.findIndex(candidate => caseKey(candidate) === caseKey(item));
}

function persistPathExamResults() {
  localStorage.setItem(pathExamResultsStorageKey, JSON.stringify(pathExamResults));
  syncProfile();
}

function renderPathExamEntry() {
  const path = learningPaths[activePath];
  const items = pathCases(path);
  const completed = items.filter(item => masteredCases.has(caseKey(item))).length;
  const unlocked = completed === items.length;
  const result = pathExamResults[path.id];
  const button = document.getElementById('pathExamButton');
  button.disabled = !unlocked;
  button.classList.toggle('active', pathExamActive);
  button.classList.toggle('passed', !pathExamActive && result?.bestScore >= 80);
  document.getElementById('pathExamTitle').textContent = `${path.title}结业测验`;
  document.getElementById('pathExamStatus').textContent = unlocked
    ? `${Math.min(pathExamQuestionLimit, items.length)} 道随机题 · 每题 15 秒`
    : `${completed}/${items.length} 完成后解锁`;
  document.getElementById('pathExamScore').textContent = result ? `最好 ${result.bestScore}%` : unlocked ? '可测验' : '锁定';
}

async function startPathExam() {
  const path = learningPaths[activePath];
  const items = pathCases(path);
  if (moving || items.some(item => !masteredCases.has(caseKey(item)))) return;
  stopPlayback();
  resetModeState();
  studyMode = 'test';
  pathExamActive = true;
  pathExamQueue = shuffled(items).slice(0, Math.min(pathExamQuestionLimit, items.length));
  selectCaseItem(pathExamQueue[0]);
  formulaRevealed = false;
  updateTestTimer();
  renderLesson();
  await prepareCase();
}

function reviewCases() {
  return allStages.flatMap(stage => stage.cases).filter(item => testResults[caseKey(item)]?.needsReview);
}

function renderReviewBoard() {
  const items = reviewCases();
  document.getElementById('reviewCount').textContent = items.length;
  const host = document.getElementById('reviewList');
  const indexedItems = items.map((item, index) => ({ item, index }));
  host.innerHTML = allStages.map(stage => {
    const groupItems = indexedItems.filter(entry => entry.item.category === stage.en);
    const list = groupItems.length
      ? groupItems.map(({ item, index }) => `<button class="review-item" data-review-index="${index}" type="button"><span>${item.category}</span><strong>${item.name}</strong></button>`).join('')
      : '<p class="review-empty">暂无待复习公式</p>';
    return `<details class="review-group">
      <summary><span class="review-group-name"><b>${stage.short}</b><small>${stage.en}</small></span><em>${groupItems.length}</em></summary>
      <div class="review-group-list">${list}</div>
    </details>`;
  }).join('');

  host.querySelectorAll('button').forEach(button => button.addEventListener('click', async () => {
    if (moving) return;
    const item = items[Number(button.dataset.reviewIndex)];
    stopPlayback();
    const currentPath = learningPaths[activePath];
    if (!currentPath.includes(item)) activePath = learningPaths.findIndex(path => path.includes(item));
    const stages = visibleStages();
    activeStage = stages.findIndex(stage => stage.en === item.category);
    activeCase = stages[activeStage].cases.findIndex(candidate => caseKey(candidate) === caseKey(item));
    studyMode = 'practice';
    resetModeState();
    renderLesson();
    await prepareCase();
  }));
}

function renderPaths() {
  const active = learningPaths[activePath];
  const host = document.getElementById('pathList');
  host.innerHTML = learningPaths.map((path, index) => {
    const total = pathCases(path).length;
    const completed = pathCases(path).filter(item => masteredCases.has(caseKey(item))).length;
    return `<button class="path-button ${index === activePath ? 'active' : ''}" data-path="${index}" type="button">
      <span class="path-index">${path.number}</span>
      <span class="path-name"><strong>${path.title}</strong><span>${path.subtitle}</span></span>
      <span class="path-count">${completed}/${total}</span>
    </button>`;
  }).join('');
  document.getElementById('pathTitle').textContent = `${active.title}路径`;
  document.getElementById('pathDescription').textContent = active.description;
  const notationGuide = document.getElementById('notationGuide');
  notationGuide.hidden = active.id !== 'starter';
  if (notationGuide.hidden) notationGuide.open = false;
  renderReviewBoard();
  const activeCases = pathCases(active);
  const activeCompleted = activeCases.filter(item => masteredCases.has(caseKey(item))).length;
  document.getElementById('pathProgress').innerHTML = `<span>已掌握</span><strong>${activeCompleted} / ${activeCases.length}</strong><i><b style="width:${activeCases.length ? activeCompleted / activeCases.length * 100 : 0}%"></b></i>`;
  host.querySelectorAll('button').forEach(button => button.addEventListener('click', async () => {
    if (moving || Number(button.dataset.path) === activePath) return;
    stopPlayback();
    activePath = Number(button.dataset.path);
    activeStage = 0;
    activeCase = 0;
    resetModeState();
    renderLesson();
    await prepareCase();
  }));
}

function renderStages() {
  const stages = visibleStages();
  const host = document.getElementById('stageList');
  host.innerHTML = stages.map((stage, index) => `
    <button class="stage-button ${index === activeStage ? 'active' : ''}" data-stage="${index}" type="button">
      <span class="stage-index">${String(index + 1).padStart(2, '0')}</span>
      <span class="stage-name"><strong>${stage.short}</strong><span>${stage.en}</span></span>
      <span class="stage-count">${stage.cases.filter(item => masteredCases.has(caseKey(item))).length}/${stage.cases.length}</span>
    </button>`).join('');
  host.querySelectorAll('button').forEach(button => button.addEventListener('click', async () => {
    if (moving) return;
    activeStage = Number(button.dataset.stage);
    activeCase = 0;
    resetModeState();
    renderLesson();
    await prepareCase();
  }));
  renderPathExamEntry();
}

function renderCasePicker() {
  const picker = document.getElementById('caseSelect');
  const stage = visibleStages()[activeStage];
  picker.innerHTML = stage.cases.map((item, index) => {
    const prefix = stage.en === 'PLL' ? `PLL ${item.name}` : item.name;
    const key = caseKey(item);
    const status = masteredCases.has(key) ? '✓ 已掌握 · ' : testResults[key]?.needsReview ? '↻ 待复习 · ' : '';
    return `<option value="${index}" ${index === activeCase ? 'selected' : ''}>${status}${prefix} · ${item.group}</option>`;
  }).join('');
}

function renderLesson() {
  const stage = visibleStages()[activeStage];
  const item = currentCase();
  const copy = stageCopy[stage.en];
  const title = stage.en === 'PLL' ? `PLL ${item.name}` : item.name;
  renderPaths();
  renderStages();
  renderCasePicker();
  document.getElementById('stageProgress').textContent = `${stage.cases.filter(item => masteredCases.has(caseKey(item))).length} / ${stage.cases.length}`;
  document.getElementById('stageNumber').textContent = String(item.number).padStart(2, '0');
  document.getElementById('stageEnglish').textContent = `${stage.en} · ${item.group}`;
  document.getElementById('lessonTitle').textContent = title;
  document.getElementById('lessonGoal').textContent = copy.goal;
  document.getElementById('focusText').textContent = copy.focus;
  document.getElementById('algorithm').innerHTML = currentMoves().map((move, index) => `<span class="move-token" data-step="${index}">${move}</span>`).join('');
  updateMasteryButton();
  updateProgress();
  updateModeUI();
}

function updateModeUI() {
  const stage = visibleStages()[activeStage];
  const item = currentCase();
  const copy = stageCopy[stage.en];
  const title = stage.en === 'PLL' ? `PLL ${item.name}` : item.name;
  const isPractice = studyMode === 'practice';
  const isTest = studyMode === 'test';
  const concealed = studyMode !== 'learn' && !formulaRevealed;

  document.querySelectorAll('.mode-switch button').forEach(button => {
    const active = button.dataset.mode === studyMode;
    button.classList.toggle('active', active);
    button.setAttribute('aria-selected', String(active));
  });

  const algorithmBlock = document.querySelector('.algorithm-block');
  algorithmBlock.classList.toggle('concealed', concealed);
  document.querySelector('.algorithm-heading span:first-child').textContent = concealed ? '回忆公式' : studyMode === 'learn' ? '演示公式' : '参考公式';
  document.getElementById('stepCount').textContent = concealed ? '隐藏' : `${step} / ${currentMoves().length}`;

  const mask = document.getElementById('formulaMask');
  mask.querySelector('strong').textContent = isTest && testState === 'running' ? '测试进行中' : pathExamActive ? '等待结业测验' : isTest ? '等待测试' : '公式已隐藏';
  mask.querySelector('span').textContent = isTest ? `${pathExamActive ? '完成本题' : '完成计时'}后显示答案` : '先回忆动作，再查看答案';

  document.getElementById('transport').hidden = isTest || concealed;
  document.getElementById('formulaToggle').hidden = !isPractice;
  document.getElementById('formulaToggle').textContent = formulaRevealed ? '重新隐藏公式' : '查看答案';
  document.getElementById('formulaToggle').setAttribute('aria-pressed', String(formulaRevealed));
  document.getElementById('testPanel').hidden = !isTest;
  document.getElementById('testTimeLabel').textContent = pathExamActive ? '本题剩余' : '测试计时';
  document.getElementById('casePicker').hidden = isTest;
  document.getElementById('speedControl').hidden = isTest || concealed;
  document.getElementById('keyboardNote').hidden = studyMode !== 'learn';
  document.getElementById('markLearned').hidden = !isPractice;

  const examSession = document.getElementById('pathExamSession');
  examSession.hidden = !pathExamActive;
  if (pathExamActive) {
    const path = learningPaths[activePath];
    const answered = pathExamIndex + (['reviewed', 'exam-complete'].includes(testState) ? 1 : 0);
    document.getElementById('pathExamSessionTitle').textContent = `${path.title}结业测验`;
    document.getElementById('pathExamQuestion').textContent = `${Math.min(pathExamIndex + 1, pathExamQueue.length)} / ${pathExamQueue.length}`;
    document.getElementById('pathExamBar').style.width = `${pathExamQueue.length ? answered / pathExamQueue.length * 100 : 0}%`;
  }

  const testAction = document.getElementById('testAction');
  testAction.classList.toggle('running', testState === 'running');
  testAction.hidden = isTest && testState === 'finished';
  testAction.textContent = pathExamActive
    ? testState === 'running' ? '完成本题' : testState === 'reviewed' ? '下一题' : testState === 'exam-complete' ? '重新测验' : '开始结业测验'
    : testState === 'running' ? '完成测试' : testState === 'reviewed' ? '再次测试' : '开始测试';

  document.getElementById('testResultActions').hidden = !isTest || testState !== 'finished';
  const feedback = document.getElementById('testFeedback');
  feedback.hidden = !isTest || (pathExamActive ? !['reviewed', 'exam-complete'].includes(testState) : testState !== 'reviewed');
  feedback.classList.toggle('review', pathExamActive && testState === 'exam-complete' ? pathExamSuccesses < pathExamQueue.length : testResult === 'review');
  feedback.textContent = pathExamActive && testState === 'exam-complete'
    ? `测验完成 · 成功 ${pathExamSuccesses} · 待复习 ${pathExamQueue.length - pathExamSuccesses} · 总用时 ${formatTestTime(pathExamElapsed)}`
    : testTimedOut
      ? '已超时 · 自动加入待复习'
      : testResult === 'success'
      ? `已记录成功 · 用时 ${formatTestTime(testElapsed)}`
      : `已加入待复习 · 本次用时 ${formatTestTime(testElapsed)}`;

  if (pathExamActive && ['idle', 'running'].includes(testState)) {
    const path = learningPaths[activePath];
    document.getElementById('stageNumber').textContent = String(pathExamIndex + 1).padStart(2, '0');
    document.getElementById('stageEnglish').textContent = `${path.title} · 结业测验`;
    document.getElementById('lessonTitle').textContent = `第 ${pathExamIndex + 1} 题 · 识别并完成`;
    document.getElementById('lessonGoal').textContent = testState === 'running'
      ? '计时进行中。请识别当前案例并在实体魔方上完成，完成后立即停止计时。'
      : `本次从${path.title}路径随机抽取 ${pathExamQueue.length} 道，逐题记录成功或需要复习。`;
    document.getElementById('focusText').textContent = '先观察魔方状态并独立判断案例，再回忆对应公式。';
  } else if (pathExamActive && testState === 'exam-complete') {
    const path = learningPaths[activePath];
    document.getElementById('stageNumber').textContent = '✓';
    document.getElementById('stageEnglish').textContent = `${path.title} · 结业测验`;
    document.getElementById('lessonTitle').textContent = '测验完成';
    document.getElementById('lessonGoal').textContent = `共 ${pathExamQueue.length} 题，成功 ${pathExamSuccesses} 题，需要复习 ${pathExamQueue.length - pathExamSuccesses} 题。`;
    document.getElementById('focusText').textContent = pathExamSuccesses === pathExamQueue.length ? '本次全部成功，可以继续下一条学习路径。' : '待复习公式已经加入左侧列表，复习后可以重新测验。';
  } else if (isTest && ['idle', 'running'].includes(testState)) {
    document.getElementById('stageNumber').textContent = String(item.number).padStart(2, '0');
    document.getElementById('stageEnglish').textContent = `${stage.en} · 当前公式测试`;
    document.getElementById('lessonTitle').textContent = title;
    document.getElementById('lessonGoal').textContent = testState === 'running'
      ? '计时进行中。请在实体魔方上完成当前公式，完成后立即停止计时。'
      : '点击开始，测试当前选择的公式；计时期间公式步骤会保持隐藏。';
    document.getElementById('focusText').textContent = copy.focus;
  } else {
    document.getElementById('stageNumber').textContent = String(item.number).padStart(2, '0');
    document.getElementById('stageEnglish').textContent = `${stage.en} · ${item.group}`;
    document.getElementById('lessonTitle').textContent = title;
    document.getElementById('lessonGoal').textContent = copy.goal;
    document.getElementById('focusText').textContent = copy.focus;
  }
}

function updateMasteryButton() {
  const button = document.getElementById('markLearned');
  const mastered = masteredCases.has(caseKey(currentCase()));
  button.classList.toggle('mastered', mastered);
  button.setAttribute('aria-pressed', String(mastered));
  button.querySelector('span').textContent = mastered ? '已掌握' : '标记已掌握';
}

function refreshMasteryProgress() {
  const stage = visibleStages()[activeStage];
  renderPaths();
  renderStages();
  renderCasePicker();
  document.getElementById('stageProgress').textContent = `${stage.cases.filter(item => masteredCases.has(caseKey(item))).length} / ${stage.cases.length}`;
  updateMasteryButton();
}

function updateProgress() {
  const algorithm = currentMoves();
  document.getElementById('stepCount').textContent = `${step} / ${algorithm.length}`;
  document.querySelectorAll('.move-token').forEach((token, index) => {
    token.classList.toggle('done', index < step);
    token.classList.toggle('current', index === step && step < algorithm.length);
  });
  document.getElementById('previous').disabled = step === 0 || moving;
  document.getElementById('next').disabled = step === algorithm.length || moving;
  if (step === algorithm.length) {
    document.querySelector('#turnBadge strong').textContent = '完成演示';
  }
}

async function nextStep() {
  const algorithm = currentMoves();
  if (moving || step >= algorithm.length) return false;
  const ok = await executeMove(algorithm[step]);
  if (ok) step++;
  updateProgress();
  return ok;
}

async function previousStep() {
  if (moving || step <= 0) return;
  stopPlayback();
  const move = currentMoves()[step - 1];
  const ok = await executeMove(inverseMove(move));
  if (ok) step--;
  updateProgress();
}

function stopPlayback() {
  playing = false;
  clearTimeout(playTimer);
  const play = document.getElementById('play');
  play.classList.remove('playing');
  play.querySelector('span').textContent = '播放演示';
}

async function playback() {
  if (!playing) return;
  const advanced = await nextStep();
  if (!advanced || step >= currentMoves().length) return stopPlayback();
  playTimer = setTimeout(playback, 240 / speed);
}

async function startTestRound() {
  if (moving) return;
  stopPlayback();
  stopTestClock();
  if (pathExamActive && testState === 'reviewed') {
    pathExamIndex++;
    selectCaseItem(pathExamQueue[pathExamIndex]);
  }
  formulaRevealed = false;
  testState = 'running';
  testResult = null;
  testElapsed = 0;
  testTimedOut = false;
  renderLesson();
  await prepareCase();
  testStartedAt = performance.now();
  updateTestTimer();
  testTimerId = setInterval(updateTestTimer, 100);
  document.querySelector('#turnBadge strong').textContent = '计时中';
}

function finishTestRound(timedOut = false) {
  if (testState !== 'running') return;
  testElapsed = timedOut && pathExamActive
    ? pathExamTimeLimit
    : performance.now() - testStartedAt;
  testTimedOut = timedOut && pathExamActive;
  stopTestClock();
  testState = 'finished';
  formulaRevealed = true;
  updateTestTimer();
  renderLesson();
  if (testTimedOut) {
    recordTestResult('review');
    document.querySelector('#turnBadge strong').textContent = '超时';
  } else {
    document.querySelector('#turnBadge strong').textContent = '测试完成';
  }
}

function recordTestResult(result) {
  if (testState !== 'finished') return;
  const key = caseKey(currentCase());
  const previous = testResults[key] || { attempts: 0, successes: 0, bestTime: null, needsReview: false };
  const success = result === 'success';
  testResults[key] = {
    attempts: previous.attempts + 1,
    successes: previous.successes + (success ? 1 : 0),
    bestTime: success && (previous.bestTime === null || testElapsed < previous.bestTime) ? Math.round(testElapsed) : previous.bestTime,
    lastTime: Math.round(testElapsed),
    lastResult: result,
    lastTestedAt: new Date().toISOString(),
    needsReview: !success
  };
  persistTestResults();
  testResult = result;
  if (pathExamActive) {
    pathExamSuccesses += success ? 1 : 0;
    pathExamElapsed += testElapsed;
    const complete = pathExamIndex === pathExamQueue.length - 1;
    testState = complete ? 'exam-complete' : 'reviewed';
    if (complete) {
      const path = learningPaths[activePath];
      const score = Math.round(pathExamSuccesses / pathExamQueue.length * 100);
      const previousExam = pathExamResults[path.id] || { attempts: 0, bestScore: 0 };
      pathExamResults[path.id] = {
        attempts: previousExam.attempts + 1,
        bestScore: Math.max(previousExam.bestScore, score),
        lastScore: score,
        lastCompletedAt: new Date().toISOString()
      };
      persistPathExamResults();
    }
    renderPathExamEntry();
  } else {
    testState = 'reviewed';
  }
  renderReviewBoard();
  renderCasePicker();
  updateModeUI();
  document.querySelector('#turnBadge strong').textContent = success ? '成功' : '待复习';
}

document.querySelectorAll('.mode-switch button').forEach(button => button.addEventListener('click', async () => {
  if (moving || button.dataset.mode === studyMode) return;
  stopPlayback();
  studyMode = button.dataset.mode;
  resetModeState();
  renderLesson();
  await prepareCase();
}));

document.getElementById('formulaToggle').addEventListener('click', async () => {
  if (moving) return;
  stopPlayback();
  formulaRevealed = !formulaRevealed;
  if (!formulaRevealed) await prepareCase();
  updateModeUI();
});

document.getElementById('testAction').addEventListener('click', async () => {
  if (moving) return;
  if (testState === 'running') finishTestRound();
  else if (pathExamActive && testState === 'exam-complete') await startPathExam();
  else await startTestRound();
});
document.getElementById('testSuccess').addEventListener('click', () => recordTestResult('success'));
document.getElementById('testReview').addEventListener('click', () => recordTestResult('review'));
document.getElementById('pathExamButton').addEventListener('click', startPathExam);

document.getElementById('play').addEventListener('click', async () => {
  if (playing) return stopPlayback();
  if (step >= currentMoves().length) await prepareCase();
  playing = true;
  const play = document.getElementById('play');
  play.classList.add('playing');
  play.querySelector('span').textContent = '暂停演示';
  playback();
});
document.getElementById('next').addEventListener('click', () => { stopPlayback(); nextStep(); });
document.getElementById('previous').addEventListener('click', previousStep);
document.getElementById('markLearned').addEventListener('click', () => {
  const key = caseKey(currentCase());
  if (masteredCases.has(key)) masteredCases.delete(key);
  else {
    masteredCases.add(key);
    if (testResults[key]?.needsReview) {
      testResults[key] = { ...testResults[key], needsReview: false };
      persistTestResults();
    }
  }
  persistMasteredCases();
  refreshMasteryProgress();
});
document.getElementById('resetLesson').addEventListener('click', async () => {
  resetModeState();
  renderLesson();
  await prepareCase();
});
document.getElementById('caseSelect').addEventListener('change', async event => {
  if (moving) return;
  activeCase = Number(event.target.value);
  resetModeState();
  renderLesson();
  await prepareCase();
});
document.getElementById('resetView').addEventListener('click', () => {
  camera.position.set(7.6, 6.4, 8.6);
  controls.target.set(0, 0, 0);
  controls.update();
});
document.getElementById('speed').addEventListener('input', event => {
  speed = Number(event.target.value);
  document.getElementById('speedValue').textContent = `${speed.toFixed(1)}×`;
});
window.addEventListener('keydown', event => {
  if (event.target.matches('input, button')) return;
  const playbackAvailable = studyMode === 'learn' || (studyMode === 'practice' && formulaRevealed);
  if (event.key === 'ArrowRight' && playbackAvailable) nextStep();
  if (event.key === 'ArrowLeft' && playbackAvailable) previousStep();
  if (event.code === 'Space' && playbackAvailable) { event.preventDefault(); document.getElementById('play').click(); }
});

function resize() {
  const width = sceneHost.clientWidth;
  const height = sceneHost.clientHeight;
  renderer.setSize(width, height, false);
  camera.aspect = width / Math.max(height, 1);
  camera.updateProjectionMatrix();
}
new ResizeObserver(resize).observe(sceneHost);

function render() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

renderLesson();
prepareCase();
resize();
render();
