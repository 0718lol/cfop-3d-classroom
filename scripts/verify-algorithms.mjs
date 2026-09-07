// 算法数据回归测试:验证全部 case 的 setup+algorithm 演示自洽性。
// 运行: node scripts/verify-algorithms.mjs(或 npm test)
//
// 判据说明:
// - PLL:setup 打乱后,algorithm 必须把魔方完全复原(严格恒等)。
// - Cross/F2L/OLL:setup 会打乱全局,algorithm 只负责本阶段(十字/一组F2L/顶面朝向),
//   不适用恒等判据,本脚本以模拟器自检 + PLL 严格判据为主。
import { readFileSync } from 'node:fs';

// ── 载入算法数据(algorithms.js 是浏览器脚本,这里手动求值) ──
const src = readFileSync(new URL('../algorithms.js', import.meta.url), 'utf8')
  .replace(/^export const /gm, 'const ');
const { crossCases, algorithms } = new Function(`${src}; return { crossCases, algorithms };`)();

// ── cubie 级精确模拟器(旋转矩阵为整数符号阵,与 app.js moveDefs 语义一致) ──
const Rx = (k) => [[1,0,0],[0,0,-k],[0,k,0]];
const Ry = (k) => [[0,0,k],[0,1,0],[-k,0,0]];
const Rz = (k) => [[0,-k,0],[k,0,0],[0,0,1]];
function matmul(A,B){return A.map((r,i)=>r.map((_,j)=>A[i][0]*B[0][j]+A[i][1]*B[1][j]+A[i][2]*B[2][j]));}
function apply(M,v){return [0,1,2].map(i=>M[i][0]*v[0]+M[i][1]*v[1]+M[i][2]*v[2]);}
const moveDefs = {
  R:{axis:'x',q:-1,sel:p=>p[0]===1}, L:{axis:'x',q:1,sel:p=>p[0]===-1},
  U:{axis:'y',q:-1,sel:p=>p[1]===1}, D:{axis:'y',q:1,sel:p=>p[1]===-1},
  F:{axis:'z',q:-1,sel:p=>p[2]===1}, B:{axis:'z',q:1,sel:p=>p[2]===-1},
  r:{axis:'x',q:-1,sel:p=>p[0]>=0}, l:{axis:'x',q:1,sel:p=>p[0]<=0},
  u:{axis:'y',q:-1,sel:p=>p[1]>=0}, d:{axis:'y',q:1,sel:p=>p[1]<=0},
  f:{axis:'z',q:-1,sel:p=>p[2]>=0}, b:{axis:'z',q:1,sel:p=>p[2]<=0},
  M:{axis:'x',q:1,sel:p=>p[0]===0}, E:{axis:'y',q:1,sel:p=>p[1]===0},
  S:{axis:'z',q:-1,sel:p=>p[2]===0},
  x:{axis:'x',q:-1,sel:()=>true}, y:{axis:'y',q:-1,sel:()=>true}, z:{axis:'z',q:-1,sel:()=>true}
};
const cubies = [];
for (let x=-1;x<=1;x++)for(let y=-1;y<=1;y++)for(let z=-1;z<=1;z++){
  if (x===0&&y===0&&z===0) continue;
  cubies.push({home:[x,y,z], pos:[x,y,z], orient:[[1,0,0],[0,1,0],[0,0,1]]});
}
function applyMoveToken(tok){
  const m = tok.match(/^([A-Za-z])(2|')?$/);
  if(!m) throw new Error(`无法解析转动记号: ${tok}`);
  const def = moveDefs[m[1]];
  if(!def) throw new Error(`未知转动: ${tok}`);
  const prime = m[2]==="'", twice = m[2]==='2';
  const q = def.q * (prime?-1:1);
  const turns = twice?2:1;
  const k = q>0?1:-1;
  const R = def.axis==='x'?Rx(k):def.axis==='y'?Ry(k):Rz(k);
  for(let t=0;t<turns;t++)
    for(const c of cubies){
      if(!def.sel(c.pos)) continue;
      c.pos = apply(R,c.pos).map(Math.round);
      c.orient = matmul(R, c.orient);
    }
}
function applySeq(seq){ seq.trim().split(/\s+/).filter(Boolean).forEach(applyMoveToken); }
function reset(){ for(const c of cubies){ c.pos=[...c.home]; c.orient=[[1,0,0],[0,1,0],[0,0,1]]; } }
function isSolved(){
  return cubies.every(c=>{
    if (c.pos.some((v,i)=>v!==c.home[i])) return false;
    const nz = c.home.filter(v=>v!==0).length;
    if (nz===1) return true; // 中心块绕自身法向的自旋不可见
    return c.orient.every((r,i)=>r.every((v,j)=>v===(i===j?1:0)));
  });
}

// ── 模拟器自检 ──
let failed = 0;
function check(cond, msg){ if(!cond){ failed++; console.error(`  ✗ ${msg}`); } }
reset(); applySeq("R U R' U' ".repeat(6)); check(isSolved(), '自检 (R U R\' U\')×6 应复原');
reset(); applySeq("U2 U2"); check(isSolved(), '自检 U2×2 应复原');
reset(); applySeq("R U R' U' R' F R2 U' R' U' R U R' F'");
check(!isSolved(), '自检 T-perm 单次不应复原');
reset(); applySeq("R U R' U' R' F R2 U' R' U' R U R' F' R U R' U' R' F R2 U' R' U' R U R' F'");
check(isSolved(), '自检 T-perm 平方应复原');

// ── PLL 严格闭合判据 ──
let pass = 0, total = 0;
for(const c of algorithms.filter(a=>a.category==='PLL')){
  total++;
  reset(); applySeq(c.setup||''); applySeq(c.algorithm);
  if(isSolved()) pass++;
  else { failed++; console.error(`  ✗ PLL ${c.id}(${c.name}) 未闭合: setup="${c.setup}" algorithm="${c.algorithm}"`); }
}
console.log(`模拟器自检: ${failed===0?'通过':'失败'}`);
console.log(`PLL 闭合: ${pass}/${total}`);
if(pass!==total) failed++;

// ── 编号唯一性:同一 category 内 number 不得重复 ──
const byCategory = {};
for(const c of algorithms) (byCategory[c.category] ||= []).push(c);
for(const [category, list] of Object.entries(byCategory)){
  const numbers = list.map(a=>a.number);
  const unique = new Set(numbers).size;
  check(unique === list.length, `${category} 编号重复: 只有 ${unique} 个唯一编号 / ${list.length} 条`);
}
// F2L 的 number 必须等于 id 尾号(f2l-N → N,主流约定:全类连续唯一 1-41)
for(const c of algorithms.filter(a=>a.category==='F2L')){
  check(c.number === parseInt(c.id.split('-')[1], 10), `F2L ${c.id} 的 number(${c.number})应等于 id 尾号`);
}
console.log(`编号唯一性(F2L/OLL/PLL/CROSS): ${failed===0?'通过':'失败'}`);
process.exit(failed?1:0);
