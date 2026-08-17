const http = require('http');
const fs = require('fs');
const path = require('path');

const root = __dirname;
const storeDir = path.join(root, 'data');
const storeFile = path.join(storeDir, 'users.json');
fs.mkdirSync(storeDir, { recursive: true });
if (!fs.existsSync(storeFile)) fs.writeFileSync(storeFile, '{}');

let firebaseState = null;
let firebaseInitPromise = null;

function readUsers() {
  try { return JSON.parse(fs.readFileSync(storeFile, 'utf8')); } catch { return {}; }
}
function writeUsers(users) {
  const temp = `${storeFile}.tmp`;
  fs.writeFileSync(temp, JSON.stringify(users, null, 2));
  fs.renameSync(temp, storeFile);
}
function keyFor(name) { return name.trim().toLocaleLowerCase('zh-CN'); }
function send(res, status, body, type = 'application/json; charset=utf-8') {
  res.writeHead(status, { 'Content-Type': type, 'Cache-Control': 'no-store' });
  res.end(type.startsWith('application/json') ? JSON.stringify(body) : body);
}
function collect(req) {
  return new Promise((resolve, reject) => {
    let value = '';
    req.on('data', chunk => { value += chunk; if (value.length > 1_000_000) req.destroy(); });
    req.on('end', () => { try { resolve(JSON.parse(value || '{}')); } catch (error) { reject(error); } });
    req.on('error', reject);
  });
}
function safeProfile(value) {
  return {
    mastered: Array.isArray(value?.mastered) ? value.mastered : [],
    testResults: value?.testResults && typeof value.testResults === 'object' ? value.testResults : {},
    pathExamResults: value?.pathExamResults && typeof value.pathExamResults === 'object' ? value.pathExamResults : {}
  };
}
function loadFirebaseServiceAccount() {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (raw) return JSON.parse(raw);
  const file = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (file && fs.existsSync(file)) return JSON.parse(fs.readFileSync(file, 'utf8'));
  return null;
}
function encodeDocId(value) {
  return Buffer.from(value, 'utf8').toString('base64url');
}
async function initFirebase() {
  if (firebaseInitPromise) return firebaseInitPromise;
  firebaseInitPromise = (async () => {
    const serviceAccount = loadFirebaseServiceAccount();
    if (!serviceAccount) return null;
    const { initializeApp, cert, getApps } = require('firebase-admin/app');
    const { getFirestore, FieldValue } = require('firebase-admin/firestore');
    if (!getApps().length) {
      initializeApp({
        credential: cert(serviceAccount),
        projectId: process.env.FIREBASE_PROJECT_ID || serviceAccount.project_id
      });
    }
    const db = getFirestore();
    return { db, FieldValue };
  })().catch(error => {
    console.warn('Firebase initialization failed, using local file store.', error);
    return null;
  });
  firebaseState = await firebaseInitPromise;
  return firebaseState;
}
async function getBackend() {
  return initFirebase();
}
async function importLegacyUsersIfNeeded(backend) {
  if (!backend || backend.legacyImported) return;
  const legacyUsers = readUsers();
  const entries = Object.entries(legacyUsers);
  if (!entries.length) {
    backend.legacyImported = true;
    return;
  }
  const batch = backend.db.batch();
  for (const [key, value] of entries) {
    const ref = backend.db.collection('users').doc(encodeDocId(key));
    const snapshot = await ref.get();
    if (snapshot.exists) continue;
    batch.set(ref, {
      key,
      name: value?.name || key,
      profile: safeProfile(value?.profile),
      createdAt: value?.createdAt || new Date().toISOString(),
      updatedAt: value?.updatedAt || new Date().toISOString()
    });
  }
  await batch.commit();
  backend.legacyImported = true;
}
async function getUserRecord(name) {
  const key = keyFor(name);
  const backend = await getBackend();
  if (backend) {
    await importLegacyUsersIfNeeded(backend);
    const snapshot = await backend.db.collection('users').doc(encodeDocId(key)).get();
    if (!snapshot.exists) return null;
    const data = snapshot.data();
    return {
      key,
      name: data.name || name,
      profile: safeProfile(data.profile),
      createdAt: data.createdAt || null,
      updatedAt: data.updatedAt || null
    };
  }
  const users = readUsers();
  return users[key] || null;
}
async function saveUserRecord(name, profile, migrate = false) {
  const cleanedName = String(name || '').trim().replace(/[<>]/g, '');
  const key = keyFor(cleanedName);
  const backend = await getBackend();
  if (backend) {
    await importLegacyUsersIfNeeded(backend);
    const ref = backend.db.collection('users').doc(encodeDocId(key));
    const snapshot = await ref.get();
    if (!snapshot.exists) {
      const now = new Date().toISOString();
      await ref.set({
        key,
        name: cleanedName,
        profile: safeProfile(migrate ? profile : {}),
        createdAt: now,
        updatedAt: now
      });
      return { name: cleanedName, profile: safeProfile(migrate ? profile : {}), created: true };
    }
    const current = snapshot.data();
    const currentProfile = safeProfile(current.profile);
    const canMigrate = migrate && !currentProfile.mastered.length && !Object.keys(currentProfile.testResults).length && !Object.keys(currentProfile.pathExamResults).length;
    const nextProfile = canMigrate ? safeProfile(profile) : safeProfile(current.profile);
    await ref.set({
      key,
      name: current.name || cleanedName,
      profile: nextProfile,
      createdAt: current.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }, { merge: true });
    return { name: current.name || cleanedName, profile: nextProfile, created: false };
  }
  const users = readUsers();
  const exists = Boolean(users[key]);
  if (!exists) {
    users[key] = {
      name: cleanedName,
      profile: migrate ? safeProfile(profile) : safeProfile({}),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  } else if (migrate && Object.keys(users[key].profile?.testResults || {}).length === 0 && users[key].profile?.mastered?.length === 0) {
    users[key].profile = safeProfile(profile);
  }
  users[key].updatedAt = new Date().toISOString();
  writeUsers(users);
  return { name: users[key].name, profile: safeProfile(users[key].profile), created: !exists };
}
async function updateUserRecord(name, profile) {
  const cleanedName = String(name || '').trim();
  const key = keyFor(cleanedName);
  const backend = await getBackend();
  if (backend) {
    await importLegacyUsersIfNeeded(backend);
    const ref = backend.db.collection('users').doc(encodeDocId(key));
    const snapshot = await ref.get();
    if (!snapshot.exists) return false;
    const current = snapshot.data();
    await ref.set({
      key,
      name: current.name || cleanedName,
      profile: safeProfile(profile),
      createdAt: current.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }, { merge: true });
    return true;
  }
  const users = readUsers();
  if (!users[key]) return false;
  users[key].profile = safeProfile(profile);
  users[key].updatedAt = new Date().toISOString();
  writeUsers(users);
  return true;
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  if (url.pathname === '/api/account' && req.method === 'POST') {
    try {
      const payload = await collect(req);
      const name = String(payload.name || '').trim().replace(/[<>]/g, '');
      if (name.length < 1 || name.length > 24) return send(res, 400, { error: '名字需要为 1-24 个字符' });
      const record = await saveUserRecord(name, payload.profile, Boolean(payload.migrate));
      return send(res, 200, record);
    } catch { return send(res, 400, { error: '请求格式无效' }); }
  }
  if (url.pathname === '/api/account' && req.method === 'PUT') {
    try {
      const payload = await collect(req);
      const name = String(payload.name || '').trim();
      const ok = await updateUserRecord(name, payload.profile);
      if (!ok) return send(res, 404, { error: '账号不存在' });
      return send(res, 200, { ok: true });
    } catch { return send(res, 400, { error: '请求格式无效' }); }
  }
  if (url.pathname === '/' || !url.pathname.startsWith('/api/')) {
    const requested = url.pathname === '/' ? '/index.html' : url.pathname;
    const file = path.normalize(path.join(root, requested));
    if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) return send(res, 404, 'Not found', 'text/plain; charset=utf-8');
    const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8' };
    return send(res, 200, fs.readFileSync(file), types[path.extname(file)] || 'application/octet-stream');
  }
  send(res, 404, { error: 'Not found' });
});
server.listen(Number(process.env.PORT) || 3000, '0.0.0.0');
