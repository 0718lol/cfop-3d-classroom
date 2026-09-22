// 学员档案 API 回归测试:验证每个学员拥有独立记忆,退出后重进进度不丢。
// 运行: node scripts/verify-account-api.mjs(已并入 npm test)
// 脚本会以临时数据目录启动真实 server.js,全部断言通过后自动清理。
import { spawn } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const dataDir = mkdtempSync(join(tmpdir(), 'cfop-api-'));
const child = spawn(process.execPath, ['server.js'], {
  cwd: root,
  env: { ...process.env, PORT: '0', DATA_DIR: dataDir },
  stdio: ['ignore', 'pipe', 'pipe']
});

let passed = 0;
function check(condition, label) {
  if (!condition) throw new Error(`验证失败: ${label}`);
  passed++;
  console.log(`  ✓ ${label}`);
}
function section(title) { console.log(`\n● ${title}`); }

async function api(method, pathname, body) {
  const response = await fetch(`http://127.0.0.1:${port}${pathname}`, {
    method,
    headers: body === undefined ? {} : { 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body)
  });
  let data = null;
  try { data = await response.json(); } catch { data = null; }
  return { status: response.status, data };
}

const port = await new Promise((resolve, reject) => {
  child.stdout.on('data', chunk => {
    const match = String(chunk).match(/listening on port (\d+)/);
    if (match) resolve(Number(match[1]));
  });
  child.on('exit', code => reject(new Error(`server.js 提前退出,code=${code}`)));
  setTimeout(() => reject(new Error('等待服务器启动超时')), 10000);
});

try {
  section('启动与健康检查');
  check(Number.isInteger(port) && port > 0, `服务器以临时端口 ${port} 启动`);
  const health = await api('GET', '/api/health');
  check(health.status === 200 && health.data?.ok === true, 'GET /api/health 返回 ok');

  section('学员登录与首次建档');
  const first = await api('POST', '/api/account', { name: '小明' });
  check(first.status === 200 && first.data.created === true, '新学员「小明」首次登录自动建档');
  check(Array.isArray(first.data.profile?.mastered) && first.data.profile.mastered.length === 0, '新档案初始为空');

  section('进度同步与退出重进(核心需求)');
  const progress = {
    mastered: ['CROSS:1', 'OLL:21'],
    testResults: { 'CROSS:1': { attempts: 2, successes: 2, bestTime: 1234, needsReview: false } },
    pathExamResults: { starter: { attempts: 1, bestScore: 80 } }
  };
  const sync = await api('PUT', '/api/account', { name: '小明', profile: progress });
  check(sync.status === 200 && sync.data.ok === true, '练习进度 PUT 同步到服务器');
  const reenter = await api('POST', '/api/account', { name: '小明' });
  check(reenter.status === 200 && reenter.data.created === false, '退出后重新登录进入同一档案');
  check(reenter.data.profile.mastered.length === 2 && reenter.data.profile.mastered.includes('CROSS:1'), '已掌握公式在重进后完整保留');
  check(reenter.data.profile.testResults['CROSS:1']?.bestTime === 1234, '测试成绩在重进后完整保留');
  check(reenter.data.profile.pathExamResults.starter?.bestScore === 80, '结业测验成绩在重进后完整保留');
  const readonlyGet = await api('GET', `/api/account?name=${encodeURIComponent('小明')}`);
  check(readonlyGet.status === 200 && readonlyGet.data.profile.mastered.length === 2, 'GET 只读查询返回同一份记忆');

  section('学员之间的记忆相互独立');
  const xiaohong = await api('POST', '/api/account', { name: '小红' });
  check(xiaohong.status === 200 && xiaohong.data.created === true && xiaohong.data.profile.mastered.length === 0, '新学员「小红」拿到的档案是空的,与小明无关');
  await api('PUT', '/api/account', { name: '小红', profile: { mastered: ['PLL:Aa'], testResults: {}, pathExamResults: {} } });
  const mingAgain = await api('POST', '/api/account', { name: '小明' });
  const hongAgain = await api('POST', '/api/account', { name: '小红' });
  check(mingAgain.data.profile.mastered.join(',') === 'CROSS:1,OLL:21', '小红的进度不会混入小明的档案');
  check(hongAgain.data.profile.mastered.join(',') === 'PLL:Aa', '小明的进度不会混入小红的档案');

  section('游客进度迁移与防误并');
  const migrated = await api('POST', '/api/account', { name: '小刚', migrate: true, profile: { mastered: ['F2L:1'], testResults: {}, pathExamResults: {} } });
  check(migrated.data.created === true && migrated.data.profile.mastered.includes('F2L:1'), '游客练习过的进度可以带入新账号');
  const keepOriginal = await api('POST', '/api/account', { name: '小刚', migrate: true, profile: { mastered: ['HACK:1'], testResults: {}, pathExamResults: {} } });
  check(keepOriginal.data.profile.mastered.join(',') === 'F2L:1', '已有进度的账号不会被另一台设备的残留数据覆盖');

  section('名字归一与输入校验');
  const cased = await api('POST', '/api/account', { name: '  Da Ming ' });
  const sameOne = await api('POST', '/api/account', { name: 'da ming' });
  check(cased.data.name === 'Da Ming', '名字两端的空白被清理');
  check(sameOne.data.created === false && sameOne.data.name === 'Da Ming', '大小写不同的同一个名字进入同一份档案');
  const tooLong = await api('POST', '/api/account', { name: 'x'.repeat(25) });
  check(tooLong.status === 400, '超过 24 字的名字被拒绝');

  section('会话恢复接口');
  const missing = await api('GET', '/api/account?name=不存在的人');
  check(missing.status === 404, '查询不存在的学员返回 404,不会误建空档案');
  const noName = await api('GET', '/api/account');
  check(noName.status === 400, '缺少名字参数返回 400');

  section('静态文件安全');
  const usersJson = await fetch(`http://127.0.0.1:${port}/data/users.json`);
  check(usersJson.status === 404, '全部学员档案文件 /data/users.json 不再可被下载');
  const dotEnv = await fetch(`http://127.0.0.1:${port}/.env`);
  check(dotEnv.status === 404, '点开头的敏感文件不可被下载');
  const traversal = await fetch(`http://127.0.0.1:${port}/..%2F..%2Fpackage.json`);
  check(traversal.status === 404, '目录穿越路径被拒绝');
  const home = await fetch(`http://127.0.0.1:${port}/`);
  check(home.status === 200 && (await home.text()).includes('CFOP'), '正常页面仍然可以访问');

  section('数据落盘');
  const stored = JSON.parse(readFileSync(join(dataDir, 'users.json'), 'utf8'));
  check(Object.keys(stored).length >= 3, '档案写入本地存储文件,重启服务器后依然存在');

  console.log(`\n全部 ${passed} 项断言通过 ✅`);
} finally {
  child.kill();
  rmSync(dataDir, { recursive: true, force: true });
}
