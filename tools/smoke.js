#!/usr/bin/env node
/**
 * 冒烟测试：把 app.js 放进一个极简 DOM 桩里跑起来，检查「数据不会悄悄丢」的硬约束。
 * 不依赖任何第三方包，node tools/smoke.js 即可。
 *
 * 为什么要有它：这个 App 的逻辑全在 app.js 里，而数据可靠性的坑（改动只写内存、
 * 迁移静默丢字段、云同步整盘覆盖）不会报错、只会悄悄消失，靠手点是测不出来的。
 */
const fs = require('fs');
const vm = require('vm');
const assert = require('assert');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const HTML = path.join(ROOT, 'ec-chunks-fixed.html');
const APP = path.join(ROOT, 'app.js');

let passed = 0;
function test(name, fn) {
  try {
    fn();
    passed++;
    console.log('  ok   ' + name);
  } catch (e) {
    console.log('  FAIL ' + name + '\n       ' + (e && e.message));
    process.exitCode = 1;
  }
}

/* ---------- 极简 DOM 桩：只够顶层脚本加载，不渲染任何东西 ---------- */
function makeEl() {
  const el = {
    style: {},
    dataset: {},
    children: [],
    textContent: '',
    innerHTML: '',
    value: '',
    checked: false,
    hidden: false,
    disabled: false,
    files: null,
    parentNode: null,
    classList: {
      add() {},
      remove() {},
      toggle() {},
      contains() {
        return false;
      }
    },
    addEventListener() {},
    removeEventListener() {},
    appendChild(c) {
      return c;
    },
    removeChild() {
      return null;
    },
    querySelector() {
      return makeEl();
    },
    querySelectorAll() {
      return [];
    },
    closest() {
      return null;
    },
    setAttribute() {},
    getAttribute() {
      return null;
    },
    removeAttribute() {},
    focus() {},
    blur() {},
    insertAdjacentHTML() {},
    remove() {},
    click() {},
    getBoundingClientRect() {
      return { top: 0, left: 0, width: 0, height: 0 };
    }
  };
  return el;
}

function loadApp(opts) {
  opts = opts || {};
  const code = fs.readFileSync(APP, 'utf8');

  const store = new Map();
  const localStorage = {
    getItem: (k) => (store.has(k) ? store.get(k) : null),
    setItem: (k, v) => store.set(k, String(v)),
    removeItem: (k) => store.delete(k),
    clear: () => store.clear()
  };
  const doc = {
    addEventListener() {},
    createElement() {
      return makeEl();
    },
    getElementById(id) {
      return (opts.els && opts.els[id]) || makeEl();
    },
    querySelector(s) {
      /* 和 getElementById 一样认 opts.els：注入的元素要能被 $('#x') 取到 */
      const extra = opts.els && opts.els[String(s).replace(/^#/, '')];
      return extra || makeEl();
    },
    querySelectorAll() {
      return [];
    },
    body: makeEl(),
    head: makeEl(),
    documentElement: makeEl()
  };
  const ctx = {
    console,
    localStorage,
    document: doc,
    setTimeout,
    clearTimeout,
    setInterval,
    clearInterval,
    Date,
    Math,
    JSON,
    Number,
    String,
    Object,
    Array,
    RegExp,
    Error,
    Map,
    Set,
    Promise,
    URL,
    Symbol,
    isNaN,
    parseInt,
    parseFloat,
    fetch: async () => {
      throw new Error('冒烟测试不联网');
    },
    confirm: () => true,
    alert() {},
    Blob: function () {},
    location: {
      href: 'http://localhost/',
      search: opts.search || '',
      origin: 'http://localhost',
      protocol: opts.protocol || 'http:'
    },
    navigator: { userAgent: 'node', language: 'zh-CN', onLine: true },
    speechSynthesis: { speak() {}, cancel() {} },
    SpeechSynthesisUtterance: function () {},
    requestAnimationFrame: () => 0,
    matchMedia: () => ({ matches: false, addEventListener() {} }),
    indexedDB: undefined
  };
  ctx.window = ctx;
  ctx.self = ctx;
  ctx.globalThis = ctx;
  vm.createContext(ctx);
  vm.runInContext(code, ctx, { filename: 'app.js' });
  return { ctx, store, run: (src) => vm.runInContext(src, ctx) };
}

const app = loadApp();
const run = app.run;
const src = fs.readFileSync(APP, 'utf8');

console.log('脚本加载');
test('顶层加载不抛异常，store 可读写', () => {
  assert.strictEqual(typeof run('typeof state'), 'string');
  assert.strictEqual(run('typeof state'), 'object');
});

console.log('数据迁移');
test('migrate 保留 progress / lessonEdits', () => {
  const r = run(`(function(){
    const s = migrate({ version: 3, chunks: [], progress: { A: { quiz: { 0: 1 } } }, lessonEdits: { A: { textZh: { 0: '你好' } } } });
    return { quiz: Object.keys(s.progress.A.quiz), zh: s.lessonEdits.A.textZh[0] };
  })()`);
  assert.deepStrictEqual(r.quiz, ['0']);
  assert.strictEqual(r.zh, '你好');
});

test('读到更新版本的数据时记下版本号（供 init 提醒）', () => {
  assert.strictEqual(run('migrate({ version: 99 }).version'), run('DATA_VERSION'));
  assert.strictEqual(run('newerDataVersion'), 99);
});

test('loadState 把旧版本键迁到新键并删掉旧键', () => {
  const r = run(`(function(){
    localStorage.clear();
    localStorage.setItem('ecChunksApp_v2', JSON.stringify({ version: 2, chunks: [{ chunk: 'take off', meaning: '起飞' }] }));
    const s = loadState();
    return {
      n: s.chunks.length,
      hasNew: !!localStorage.getItem('ecChunksApp_v3'),
      hasOld: !!localStorage.getItem('ecChunksApp_v2')
    };
  })()`);
  assert.strictEqual(r.n, 1);
  assert.strictEqual(r.hasNew, true, '迁移后应写回新键');
  assert.strictEqual(r.hasOld, false, '旧键应被清掉，否则每次启动都读回老数据');
});

console.log('学习进度持久化');
test('lessonProg 与 learnState 指向同一份字典', () => {
  const r = run(`(function(){
    state = defaultState();
    const p = lessonProg('L1');
    p.quiz[0] = 2;
    return {
      same: lessonProg('L1').quiz === p.quiz,
      link: learnState.quizAnswers['L1'] === p.quiz,
      stored: state.progress['L1'].quiz[0]
    };
  })()`);
  assert.strictEqual(r.same, true);
  assert.strictEqual(r.link, true);
  assert.strictEqual(r.stored, 2);
});

test('clearLessonProg 清空内容但保留对象（引用不断开）', () => {
  const r = run(`(function(){
    state = defaultState();
    const p = lessonProg('L2');
    p.quiz[1] = 0; p.cloze[0] = 'x'; p.clozeRes[0] = true;
    clearLessonProg('L2');
    return { same: learnState.quizAnswers['L2'] === p.quiz, len: Object.keys(p.quiz).length + Object.keys(p.cloze).length + Object.keys(p.clozeRes).length };
  })()`);
  assert.strictEqual(r.same, true);
  assert.strictEqual(r.len, 0);
});

test('答题结果会写进 state（刷新后不丢）', () => {
  const r = run(`(function(){
    state = defaultState();
    lessonProg('L3').quiz[0] = 3;
    saveState();
    flushSave();   /* 落盘有 250ms 合并窗口，读盘前先 flush */
    const raw = JSON.parse(localStorage.getItem('ecChunksApp_v3'));
    return raw.progress['L3'].quiz[0];
  })()`);
  assert.strictEqual(r, 3);
});

console.log('内置文章改动层');
test('applyLessonEdits 覆盖译文/意思/例句并追加补充词块', () => {
  const r = run(`(function(){
    state = defaultState();
    state.lessonEdits = { B: { textZh: { 0: '第一句' }, chunkMeaning: { 'take off': '脱下' }, chunkSentZh: { 'take off': '他脱了外套' }, extraChunks: [{ chunk: 'wrap up', meaning: '收尾' }] } };
    const lesson = { id: 'B', text: ['Take off.', 'We wrap up.'], textZh: ['', ''], chunks: [{ chunk: 'take off', meaning: '起飞', sentence: 'Take off.' }] };
    applyLessonEdits(lesson);
    applyLessonEdits(lesson);  /* 每次渲染都会调，必须幂等 */
    return { zh: lesson.textZh[0], meaning: lesson.chunks[0].meaning, sentZh: lesson.chunks[0].sentZh, chunks: lesson.chunks.length };
  })()`);
  assert.strictEqual(r.zh, '第一句');
  assert.strictEqual(r.meaning, '脱下');
  assert.strictEqual(r.sentZh, '他脱了外套');
  assert.strictEqual(r.chunks, 2, '重复调用不应重复追加词块');
});

test('rememberLessonEdit 对内置文章写 overrides，对自建文章走 saveState', () => {
  const r = run(`(function(){
    state = defaultState();
    rememberLessonEdit({ id: 'builtin' }, e => { e.textZh = { 0: 'x' }; });
    const builtin = !!(state.lessonEdits.builtin && state.lessonEdits.builtin.textZh);
    rememberLessonEdit({ id: 'mine', custom: true }, e => { e.whatever = 1; });
    return { builtin, customTouched: !!(state.lessonEdits.mine) };
  })()`);
  assert.strictEqual(r.builtin, true);
  assert.strictEqual(r.customTouched, false, '自建文章本来就在 state 里，不该再记一层 overrides');
});

console.log('云同步：判新旧与合并');
test('内容指纹与键序无关，内容变则指纹变', () => {
  const r = run(`(function(){
    const a = { x: 1, y: [1, 2], z: { k: 'v', j: 0 } };
    const b = { z: { j: 0, k: 'v' }, y: [1, 2], x: 1 };
    const c = { x: 1, y: [1, 2], z: { k: 'v2', j: 0 } };
    return { same: cloudHash(a) === cloudHash(b), diff: cloudHash(a) !== cloudHash(c) };
  })()`);
  assert.strictEqual(r.same, true, '同内容不同键序必须得出同一个指纹，否则每次启动都判成「改过」');
  assert.strictEqual(r.diff, true);
});

test('合并词块：按 id 取更熟的那条，两边的都留着', () => {
  const r = run(`(function(){
    const local = defaultState();
    local.chunks = [{ id:'c1', chunk:'take off', stage:2, meaning:'起飞' }, { id:'c2', chunk:'wrap up', stage:0 }];
    const remote = defaultState();
    remote.chunks = [{ id:'c1', chunk:'take off', stage:4, meaning:'脱下' }, { id:'c3', chunk:'pull off', stage:1 }];
    const m = mergeStates(local, remote);
    return { ids: m.chunks.map(c => c.id).sort(), stage: m.chunks.find(c => c.id === 'c1').stage };
  })()`);
  assert.deepStrictEqual(r.ids, ['c1', 'c2', 'c3'], '本机独有的 c2 和云端独有的 c3 都要在');
  assert.strictEqual(r.stage, 4, '同一条词块取复习得更深的那份');
});

test('合并时删掉的不会复活（deletedLessons 墓碑 / trash）', () => {
  const r = run(`(function(){
    const local = defaultState();
    local.deletedLessons = { L1: '2026-01-01T00:00:00Z' };
    local.trash = [{ id:'c9', chunk:'gone' }];
    local.chunks = [];
    const remote = defaultState();
    remote.customLessons = [{ id:'L1', title:'删掉的文章', text:['hello'] }];
    remote.chunks = [{ id:'c9', chunk:'gone' }, { id:'c8', chunk:'keep' }];
    const m = mergeStates(local, remote);
    return { lessons: m.customLessons.map(l => l.id), chunks: m.chunks.map(c => c.id) };
  })()`);
  assert.deepStrictEqual(r.lessons, [], '本机删过的文章不能被云端带回来');
  assert.deepStrictEqual(r.chunks, ['c8'], '回收站里的词块也不该复活');
});

test('合并进度与日志取并集，设置以本机为准', () => {
  const r = run(`(function(){
    const local = defaultState();
    local.logs = { '2026-01-01': { inputDone:true, outputDone:false, reviewed:2 } };
    local.settings = { currentWeek: 3 };
    local.progress = { L: { quiz: { 0: 1 }, cloze: {}, clozeRes: {} } };
    local.lessonEdits = { L: { chunkMeaning: { 'take off': '本机译文' } } };
    const remote = defaultState();
    remote.logs = { '2026-01-01': { inputDone:false, outputDone:true, reviewed:5 }, '2026-01-02': { inputDone:true, outputDone:false, reviewed:1 } };
    remote.settings = { currentWeek: 1 };
    remote.progress = { L: { quiz: { 0: 3, 1: 2 }, cloze: {}, clozeRes: {} } };
    remote.lessonEdits = { L: { chunkMeaning: { 'wrap up': '云端译文' } } };
    const m = mergeStates(local, remote);
    return {
      log1: m.logs['2026-01-01'], log2: !!m.logs['2026-01-02'],
      week: m.settings.currentWeek,
      quiz: m.progress.L.quiz,
      meaning: m.lessonEdits.L.chunkMeaning
    };
  })()`);
  /* vm 里造出来的对象原型不同，deepStrictEqual 会误报，统一比 JSON */
  assert.strictEqual(JSON.stringify(r.log1), JSON.stringify({ inputDone: true, outputDone: true, reviewed: 5 }));
  assert.strictEqual(r.log2, true, '云端多出来的那一天要保留');
  assert.strictEqual(r.week, 3, '设置类以本机为准');
  assert.strictEqual(JSON.stringify(r.quiz), JSON.stringify({ 0: 1, 1: 2 }), '同一题本机答案优先，云端独有题补上');
  assert.strictEqual(r.meaning['take off'], '本机译文');
  assert.strictEqual(r.meaning['wrap up'], '云端译文');
});

test('同步契约：不整盘覆盖、不用本机时钟判新旧、失败要留痕', () => {
  assert(!/state = migrate\(row\.data\);/.test(src), 'applyCloudRow 不能再用云端数据整盘替换 state');
  assert(/if \(remoteChanged\) applyCloudRow\(row\)/.test(src), '启动同步应先合并再决定是否回传');
  assert(!/const remoteAt = Date\.parse\(row\.updated_at/.test(src), '不应再拿本机时钟和云端时间戳比大小');
  assert(/lastHash/.test(src) && /cloudHash\(state\)/.test(src), '应有内容指纹记录');
  assert(/setCloudError\(e\)/.test(src), '同步失败必须记录，不能静默 catch');
});

console.log('桌面版：端口变化要可见');
test('端口记账 + 变化时弹窗告知（源码契约）', () => {
  const main = fs.readFileSync(path.join(ROOT, 'electron', 'main.js'), 'utf8');
  assert(/const PORT_FILE = /.test(main), '应把上次端口记到数据目录里，才可能发现端口变了');
  assert(/function readLastPort\(/.test(main) && /function writeLastPort\(/.test(main));
  assert(/if \(prev && prev !== port\) portChangedFrom = prev;/.test(main), '启动成功后要对比上次端口');
  assert(/if \(portChangedFrom\) \{/.test(main), '端口变了要有对应处理');
  assert(/dialog\.showMessageBox\(/.test(main), '端口变了必须弹窗告诉用户，而不是只写一行日志');
  assert(/page-title-updated/.test(main), '弹窗关掉后标题上也要留痕');
  assert(/const PORT_TRIES = 30;/.test(main), '顺延范围要够大且顺序确定，减少落到随机端口（随机端口下次又变）');
});

console.log('CSP 与脚本边界');
test('HTML 不再有内联脚本与 on* 属性，CSP 只允许 self 脚本', () => {
  const html = fs.readFileSync(HTML, 'utf8');
  const inlineTags = html.match(/<script(?![^>]*\ssrc=)[^>]*>/g) || [];
  assert.deepStrictEqual(inlineTags, [], 'HTML 里不允许再出现内联脚本');
  assert(!/\son[a-z]+\s*=/i.test(html), '不允许 on* 内联事件属性（CSP 会拦掉）');
  assert(/<meta http-equiv="Content-Security-Policy"/.test(html), '缺少 CSP');
  const csp = (html.match(/<meta http-equiv="Content-Security-Policy" content="([^"]*)"/) || [])[1] || '';
  const cspDir = (name) =>
    csp
      .split(';')
      .map((d) => d.trim())
      .find((d) => d.indexOf(name) === 0) || '';
  assert(/^script-src/.test(cspDir('script-src')), 'CSP 要有独立的 script-src');
  assert(/script-src 'self'/.test(cspDir('script-src')), "script-src 必须是 'self'");
  assert(!/unsafe-inline/.test(cspDir('script-src')), '不能给 script-src 放开 unsafe-inline');
  assert(!/unsafe-eval/.test(cspDir('script-src')), '不能给 script-src 放开 unsafe-eval');
  assert(/<script src="\.\/app\.js"><\/script>/.test(html), '应通过 <script src> 加载 app.js');
});

test('文章卡片走事件委托（内联 onclick 在 CSP 下会失效）', () => {
  assert(/lessonGrid\.addEventListener\('click'/.test(src), '卡片点击应走委托');
  assert(/lessonGrid\.addEventListener\('keydown'/.test(src), '键盘打开也应走委托');
  assert(/data-edit-lesson/.test(src) && /data-del-lesson/.test(src));
  assert(!/onclick=/.test(src) && !/onkeydown=/.test(src), 'app.js 里不应再有内联事件属性');
});

console.log('交互契约（静态检查）');
test('重复词块不再静默插入，而是更新已有那条', () => {
  assert(/else if \(dup\)\{ updateChunk\(dup\.id, data\)/.test(src), '提交分支应改为更新已有词块');
});

test('批量删除的勾选态来自 pickedIds，并在渲染时回填 checked', () => {
  assert(/pickedIds\.has\(c\.id\) \? ' checked' : ''/.test(src), '渲染时应回填勾选状态');
  assert(/const ids = Array\.from\(pickedIds\)/.test(src), '批量删除应读 pickedIds 而不是现查 DOM');
  assert(!/#chunkList \[data-pick\]:checked/.test(src), '不应再从 DOM 现读勾选状态');
});

test('删文章时级联清掉该课的学习记录与改动', () => {
  assert(/delete state\.progress\[id\]/.test(src));
  assert(/delete state\.lessonEdits\[id\]/.test(src));
});

console.log('错题本');
test('答错的题记进错题本，同一题反复错只累加次数', () => {
  const r = run(`(function(){
    state = defaultState();
    const lesson = { id: 'L1', title: '测试文章', quiz: [{ q: '他去哪儿了？', options: ['学校','医院'], answer: 0 }] };
    recordMistake(lesson, 'quiz', 0, { q: '他去哪儿了？', options: ['学校','医院'], answer: 0, my: 1 });
    recordMistake(lesson, 'quiz', 0, { q: '他去哪儿了？', options: ['学校','医院'], answer: 0, my: 1 });
    const list = getMistakes();
    return { n: list.length, wrong: list[0].wrong, id: list[0].id, my: list[0].my, title: list[0].lessonTitle };
  })()`);
  assert.strictEqual(r.n, 1); // 同一题不重复堆卡片
  assert.strictEqual(r.wrong, 2);
  assert.strictEqual(r.id, 'L1|quiz|0');
  assert.strictEqual(r.my, 1); // 存了「上次选了什么」
  assert.strictEqual(r.title, '测试文章');
});

test('订正用 fixed 标记而不是删条目，再错会回到待订正', () => {
  const r = run(`(function(){
    state = defaultState();
    recordMistake({ id: 'L2', title: 'T' }, 'cloze', 3, { answer: 'went', my: 'go' });
    const id = Object.keys(state.mistakes)[0];
    const before = state.mistakes[id].fixed;
    const changed = setMistakeFixed(id, true);
    const after = state.mistakes[id].fixed;
    recordMistake({ id: 'L2', title: 'T' }, 'cloze', 3, { answer: 'went', my: 'go' });
    return { before, changed, after, again: state.mistakes[id].fixed, wrong: state.mistakes[id].wrong, kept: !!state.mistakes[id] };
  })()`);
  assert.strictEqual(r.before, false);
  assert.strictEqual(r.changed, true);
  assert.strictEqual(r.after, true);
  assert.strictEqual(r.again, false);
  assert.strictEqual(r.wrong, 2);
  assert.strictEqual(r.kept, true); // 条目一直在：云同步并集不会把它复活成「未订正」
});

test('迁移与云同步都带上错题本：次数取大值、订正取或', () => {
  const r = run(`(function(){
    const local = migrate({ chunks: [], mistakes: { 'L3|quiz|1': { id:'L3|quiz|1', lessonId:'L3', kind:'quiz', idx:1, wrong:1, fixed:true, at:'2026-01-02T00:00:00Z' } } });
    const remote = migrate({ chunks: [], mistakes: {
      'L3|quiz|1': { id:'L3|quiz|1', lessonId:'L3', kind:'quiz', idx:1, wrong:3, fixed:false, at:'2026-01-01T00:00:00Z' },
      'L3|cloze|0': { id:'L3|cloze|0', lessonId:'L3', kind:'cloze', idx:0, wrong:1, fixed:false, at:'2026-01-01T00:00:00Z' }
    } });
    const m = mergeStates(local, remote);
    return {
      n: Object.keys(m.mistakes).length,
      wrong: m.mistakes['L3|quiz|1'].wrong,
      fixed: m.mistakes['L3|quiz|1'].fixed,
      migrated: Object.keys(migrate({ mistakes: { a: { id:'a' } } }).mistakes).length
    };
  })()`);
  assert.strictEqual(r.migrated, 1); // migrate 不能把新字段剪掉
  assert.strictEqual(r.n, 2); // 两边独有的都留着
  assert.strictEqual(r.wrong, 3); // 次数相加会虚高，取大值
  assert.strictEqual(r.fixed, true);
});

test('删文章时把它名下的错题一起清掉', () => {
  const r = run(`(function(){
    state = defaultState();
    recordMistake({ id: 'L4', title: 'A' }, 'quiz', 0, { q: 'q', options: ['a'], answer: 0, my: 0 });
    recordMistake({ id: 'L5', title: 'B' }, 'quiz', 0, { q: 'q', options: ['a'], answer: 0, my: 0 });
    dropLessonMistakes('L4');
    return Object.keys(state.mistakes);
  })()`);
  assert.deepStrictEqual(r, ['L5|quiz|0']);
});

console.log('AI 提示词');
test('提示词是新版模板：参数填进等级/主题/句数，重点词块要词性、多义与助记', () => {
  const r = run(`(function(){
    state = defaultState();
    state.chunks = [
      normalizeChunk({ chunk: 'take off', meaning: '起飞' }),
      normalizeChunk({ chunk: 'catch up', meaning: '赶上' }),
      normalizeChunk({ chunk: 'old one', meaning: '老词块', mastered: true })
    ];
    return buildAiPrompt();
  })()`);
  assert.ok(r.includes('你是一位英语教学材料作者'), '开头那句照抄模板');
  assert.ok(
    /## 参数/.test(r) && /- 等级：中级/.test(r) && /- 主题：日常生活/.test(r) && /- 句数：10/.test(r),
    '参数要填成当前选择',
    r.slice(0, 120)
  );
  assert.ok(/## 写作要求/.test(r) && /## 难度标准/.test(r) && /## 输出格式/.test(r), '三段结构都要在');
  assert.ok(
    /### 英文标题/.test(r) && /### 英文原文/.test(r) && /### 中文翻译/.test(r) && /### 重点词块/.test(r),
    '输出小节要留住'
  );
  assert.ok(/词性必须标出来/.test(r) && /助记/.test(r) && /好几个常见意思/.test(r), '重点词块要说清词性、多义与助记');
  assert.ok(r.includes('take off') && r.includes('catch up'), '没掌握的表达顺手用上');
  assert.ok(!r.includes('old one'), '已掌握的不要再塞进去');
  assert.ok(!/【英文】/.test(r), '旧的两段式格式已经换成 Markdown 小节');
});

test('提示词按句数定词块数，并要求词块原样出现在正文里', () => {
  const withCount = (n) => {
    const el = makeEl();
    el.value = String(n);
    return loadApp({ els: { aSentCount: el } }).run('buildAiPrompt()');
  };
  const ten = withCount(10);
  assert.ok(/从上面挑 7 个/.test(ten), '10 句要 7 个词块，不是写死的 6–12 个');
  assert.ok(/全文至少 7 个/.test(ten), '写作要求和词块数要一致');
  assert.ok(/原样出现在上面的英文原文里/.test(ten), '词块必须能在原文里对上，否则对齐时会丢');
  assert.ok(/a\.m\./.test(ten) && /U\.S\./.test(ten), '分句的坑要在提示词里点名 a.m. / U.S.');
  assert.ok(!/6–12 个/.test(ten), '旧的固定区间要去掉');
  assert.ok(/从上面挑 4 个/.test(withCount(4)), '句数少，词块也少');
  assert.ok(/从上面挑 12 个/.test(withCount(30)), '句数多也只到 12 个');
  assert.ok(/从上面挑 7 个/.test(withCount(99)), '越界的句数回落到 10 句');
});

test('提示词只讲当前等级那一段，例子不摆两遍', () => {
  const p = loadApp().run('buildAiPrompt()');
  /* 主题分类那行 `- 主题要求：…` 最长的要求约 50 字，所以上限从 1400 放到 1450；
     下面「每个分类的提示词都在 1450 字以内」会逐条兜住，别指望这句。 */
  assert.ok(p.length < 1450, '提示词瘦到 1450 字以内，现在 ' + p.length);
  assert.ok(/## 难度标准\n- 中级：/.test(p), '难度标准只给当前等级那一条');
  assert.ok(!/初级：/.test(p) && !/高级：/.test(p), '别的等级不占字数');
  assert.strictEqual((p.match(/look forward to/g) || []).length, 1, '常见搭配的例子只在要求 7 里出现一次');
  assert.ok(/全文至少 7 个/.test(p), '删例子不能把词块数删掉');
});

console.log('主题分类');
test('主题下拉的选项跟 TOPIC_CATEGORIES 对得上，不缺不多', () => {
  const html = fs.readFileSync(HTML, 'utf8');
  const box = html.slice(html.indexOf('<select id="aTopic"'), html.indexOf('<option value="__custom__">'));
  /* 表里带出来的数组是 vm 里的数组（另一个 realm），比之前先搬成本地数组 */
  const labels = Array.from(app.run('[...TOPIC_GUIDE.keys()]'));
  const options = [...box.matchAll(/<option value="([^"]+)"/g)].map((m) => m[1]);
  assert.deepStrictEqual(options, labels, 'HTML 里的选项要和表一一对应，顺序也一样');
  const groups = Array.from(app.run('TOPIC_CATEGORIES.map(g => g.group)'));
  const optgroups = [...box.matchAll(/<optgroup label="([^"]+)"/g)].map((m) => m[1]);
  assert.deepStrictEqual(optgroups, groups, '分组名也要对得上');
  assert.ok(labels.length >= 20, '分类要够多，用户才有得挑，现在 ' + labels.length);
  assert.strictEqual(new Set(labels).size, labels.length, '分类名不能重复（重复会互相覆盖提示词）');
});

test('每个分类都有一段专属要求，长度适中', () => {
  const table = app.run('TOPIC_CATEGORIES.flatMap(g => g.items.map(it => ({ label: it.label, guide: it.guide })))');
  assert.strictEqual(table.length, app.run('TOPIC_GUIDE.size'), '每个分类都得在 Map 里查得到');
  table.forEach((it) => {
    assert.ok(it.guide && it.guide.trim().length >= 15, it.label + ' 的专属要求太短，等于没写：' + it.guide);
    assert.ok(it.guide.length <= 60, it.label + ' 的专属要求太长，会把提示词撑胖：' + it.guide);
  });
});

test('内置文章的主题都在分类表里，编辑时不会掉进「自定义」', () => {
  const topics = Array.from(app.run('[...new Set(allLessons().map(l => l.topic))]'));
  const labels = new Set(Array.from(app.run('[...TOPIC_GUIDE.keys()]')));
  /* 「复习」是复习短文自己生成的临时文章，不会进编辑弹窗 */
  const missing = topics.filter((t) => t !== '复习' && !labels.has(t));
  assert.deepStrictEqual(missing, [], '这些内置主题在分类表里查不到：' + missing.join('、'));
});

test('选了分类，提示词带上这个分类的专属要求', () => {
  const withTopic = (value) => {
    const el = makeEl();
    el.value = value;
    return loadApp({ els: { aTopic: el } }).run('buildAiPrompt()');
  };
  const p = withTopic('科普');
  assert.ok(/- 主题：科普/.test(p), '主题名要进参数区');
  assert.ok(/- 主题要求：.*因果关系要清楚/.test(p), '分类专属要求要进提示词');
  assert.ok(p.length < 1450, '带上要求也不能撑爆，现在 ' + p.length);
  /* 换一个分类，要求跟着换 */
  const q = withTopic('旅行与出行');
  assert.ok(/- 主题：旅行与出行/.test(q) && /- 主题要求：.*攻略/.test(q), '换分类就换要求');
  assert.ok(!/因果关系要清楚/.test(q), '不能留下上一个分类的要求');
});

test('自定义主题：用用户原话，且不硬塞一段无关的专属要求', () => {
  const sel = makeEl();
  sel.value = '__custom__';
  const input = makeEl();
  input.value = '和邻居的一次小摩擦';
  const r = loadApp({ els: { aTopic: sel, aTopicCustom: input } }).run('buildAiPrompt()');
  assert.ok(/- 主题：和邻居的一次小摩擦/.test(r), '自定义要原样进提示词');
  assert.ok(!/主题要求：/.test(r), '自定义没有专属要求，整行不该出现');
  /* 选着自定义却什么都没填：别让提示词里「主题：」后面空一截 */
  const empty = makeEl();
  empty.value = '__custom__';
  const r2 = loadApp({ els: { aTopic: empty, aTopicCustom: makeEl() } }).run('buildAiPrompt()');
  assert.ok(/- 主题：日常生活/.test(r2), '空的自定义回落到默认分类');
});

test('打开已有文章：认识的分类选中，认不出的老主题落自定义并回填', () => {
  const sel = makeEl();
  const input = makeEl();
  const wrap = makeEl();
  const a = loadApp({ els: { aTopic: sel, aTopicCustom: input, aTopicCustomWrap: wrap } });
  a.run('setTopicField("科普")');
  assert.strictEqual(sel.value, '科普', '认识的分类直接选中');
  assert.strictEqual(input.value, '', '选分类时输入框要清空');
  assert.strictEqual(wrap.hidden, true, '不是自定义就把输入框收起来');
  a.run('setTopicField("跟老外点咖啡")');
  assert.strictEqual(sel.value, '__custom__', '不认识的老主题落到自定义');
  assert.strictEqual(input.value, '跟老外点咖啡', '原文要回填，编辑时不能丢');
  assert.strictEqual(wrap.hidden, false, '自定义要把输入框露出来');
  assert.strictEqual(a.run('currentTopicField().topic'), '跟老外点咖啡', '存回去还是原来那句');
  a.run('setTopicField("")');
  assert.strictEqual(a.run('currentTopicField().topic'), '日常生活', '没填主题就用默认分类');
});

test('待练词块按到期日挑，带上中文意思，已掌握的就不再塞进提示词', () => {
  const a = loadApp();
  a.run(`
    state.chunks = [
      { id:'1', chunk:'give up', meaning:'放弃；分发', nextReview:'2026-11-01', added:'2026-10-01' },
      { id:'2', chunk:'in the end', meaning:'最终', nextReview:'2026-10-20', added:'2026-10-02' },
      { id:'3', chunk:'light', meaning:'光', nextReview:'2026-10-25', added:'2026-10-03' },
      { id:'4', chunk:'taken away', meaning:'已掌握', mastered:true, nextReview:'2026-12-01', added:'2026-09-01' }
    ]; "ok"`);
  assert.strictEqual(
    a.run('pickPromptChunks(2).join(" | ")'),
    'in the end（最终） | light（光）',
    '按到期日挑最该练的，括号里带第一个中文意思，不再是「按加入顺序取最后几条」'
  );
  assert.strictEqual(a.run('pickPromptChunks(9).length'), 3, '已掌握的词块不再进提示词');
  const prompt = a.run('buildAiPrompt()');
  assert.ok(/至少用上 3 个/.test(prompt), '要给下限，不能只说「能用几个算几个」');
  assert.ok(/- in the end（最终）/.test(prompt), '词块带着中文意思进提示词');
  assert.ok(prompt.indexOf('taken away') === -1, '已掌握的不出现');
});

test('分句：缩写和小数里的句点不当句末（a.m. / U.S. / 3.50）', () => {
  const a = loadApp();
  const split = (s) => a.run('splitEnglishSentences(' + JSON.stringify(s) + ')').join(' | ');
  assert.strictEqual(split('We left at 9 a.m. It was cold.'), 'We left at 9 a.m. | It was cold.');
  assert.strictEqual(split('He lives in the U.S. She lives in Canada.'), 'He lives in the U.S. | She lives in Canada.');
  assert.strictEqual(split('It cost $3.50. I paid cash.'), 'It cost $3.50. | I paid cash.');
  assert.strictEqual(split('That is Mr. Smith. He is nice.'), 'That is Mr. Smith. | He is nice.');
  assert.strictEqual(split('I saw e.g. a cat. Then I left.'), 'I saw e.g. a cat. | Then I left.');
  assert.strictEqual(
    split('Meet me at 3 p.m. tomorrow.'),
    'Meet me at 3 p.m. tomorrow.',
    'p.m. 后面接小写，说明句子还没完'
  );
  assert.strictEqual(split('Wait... what? Really!'), 'Wait... | what? | Really!', '省略号和问号感叹号照旧切开');
  assert.strictEqual(a.run("splitEnglishSentences('').length"), 0, '空输入仍然返回空数组');
  assert.strictEqual(split('No dot at all'), 'No dot at all', '没有句点就整段当一句');
});

test('调试日志默认闭嘴，?debug=1 才说话', () => {
  const quiet = run(`(function(){
    var warns = [];
    var realWarn = console.warn;
    console.warn = function(){ warns.push(Array.prototype.join.call(arguments, ' ')); };
    try{
      debugLog('测试', new Error('x'));
      saveCloudCfg();
      return { isDebug: DEBUG_LOG, n: warns.length };
    } finally { console.warn = realWarn; }
  })()`);
  assert.strictEqual(quiet.isDebug, false, '没开开关时必须闭嘴，否则控制台全是噪音');
  assert.strictEqual(quiet.n, 0);

  const loud = loadApp({ search: '?debug=1' });
  const r2 = loud.run(`(function(){
    var warns = [];
    var realWarn = console.warn;
    console.warn = function(){ warns.push(Array.prototype.join.call(arguments, ' ')); };
    try{
      debugLog('读云同步配置', new Error('boom'));
      return { isDebug: DEBUG_LOG, n: warns.length, text: warns[0] || '' };
    } finally { console.warn = realWarn; }
  })()`);
  assert.strictEqual(r2.isDebug, true, '?debug=1 要能打开开关');
  assert.strictEqual(r2.n, 1);
  assert.match(r2.text, /\[debug\] 读云同步配置/, '日志要带上出事的环节名');
});

test('词块「收过没有」用集合查，不再逐条扫词块本', () => {
  const r = run(`(function(){
    var lesson = allLessons()[0];
    var first = lesson.chunks[0];
    state.chunks = [{ chunk: first.chunk.toUpperCase(), meaning: 'x' }];
    var scans = 0;
    state.chunks.some = function(){ scans++; return Array.prototype.some.apply(this, arguments); };
    var rows = renderChunkRows(lesson);
    var afterRows = scans;
    renderLearnList();
    return { scansRows: afterRows, scansList: scans, marked: rows.indexOf('已收录') >= 0 };
  })()`);
  assert.strictEqual(r.marked, true, '词块本里已经收过的表达，按钮应该是「已收录」');
  assert.strictEqual(r.scansRows, 0, 'renderChunkRows 不该再对每张卡片线性扫描一遍词块本');
  assert.strictEqual(r.scansList, 0, 'renderLearnList 不该再对每张卡片线性扫描一遍词块本');
});

test('切句只有一套规则：列表版与保留位置版给出同样的句子', () => {
  const r = run(`(function(){
    var cases = [
      'We left at 9 a.m. It was cold.',
      'He lives in the U.S. She lives in Canada.',
      'Wait... what? Really!',
      'She said "Hi." Then she left.',
      'It cost $3.50. I paid cash.',
      'No dot at all'
    ];
    return cases.map(function(s){
      var list = splitEnglishSentences(s).join(' | ');
      var segs = splitEnSegments(s).map(function(x){ return x.text.trim(); }).join(' | ');
      return { list: list, same: list === segs };
    });
  })()`);
  assert.strictEqual(r[2].list, 'Wait... | what? | Really!', '连写的句末标点算一个，别切成一串点');
  assert.strictEqual(r[3].list, 'She said "Hi." | Then she left.', '句末引号属于上一句');
  r.forEach((one, i) => assert.strictEqual(one.same, true, '第 ' + i + ' 个例子两种切法不一致：' + one.list));
});

test('中文省略号整串算一个句末，不从中间切开', () => {
  const r = run(
    "[splitChineseSentences('他想了很久……然后走了。').join(' | '), splitChineseSentences('好…').join(' | '), splitChineseSentences('就这样吧').join(' | ')]"
  );
  assert.strictEqual(r[0], '他想了很久…… | 然后走了。');
  assert.strictEqual(r[1], '好…');
  assert.strictEqual(r[2], '就这样吧', '没有句末标点时整段当一句，不能丢');
});

test('全部语料：两种切法一致，切完不丢字', () => {
  const r = run(`(function(){
    var bad = [];
    allLessons().forEach(function(l){
      (l.text || []).forEach(function(p, idx){
        var list = splitEnglishSentences(p);
        var segs = splitEnSegments(p).map(function(x){ return x.text.trim(); });
        if (list.join('|') !== segs.join('|')) bad.push('EN 不一致 ' + l.id + '#' + idx);
        if (list.join('').replace(/\\s+/g, '') !== String(p).replace(/\\s+/g, '')) bad.push('EN 丢字 ' + l.id + '#' + idx);
      });
      (l.textZh || []).forEach(function(p, idx){
        var list = splitChineseSentences(p);
        var segs = splitZhSegments(p).map(function(x){ return x.text.trim(); });
        if (list.join('|') !== segs.join('|')) bad.push('ZH 不一致 ' + l.id + '#' + idx);
        if (list.join('').replace(/\\s+/g, '') !== String(p).replace(/\\s+/g, '')) bad.push('ZH 丢字 ' + l.id + '#' + idx);
      });
    });
    return { n: bad.length, sample: bad.slice(0, 5) };
  })()`);
  assert.strictEqual(r.n, 0, '有段落不一致或丢了字：' + JSON.stringify(r.sample));
});

test('带缩写的段落也能把英文句对回中文那一句（以前会退回整段）', () => {
  const r = run(`(function(){
    var lesson = {
      id: 'T', custom: true,
      text: ['We left at 9 a.m. It was cold.'],
      textZh: ['我们九点离开的。天很冷。']
    };
    var hit = zhForSentence(lesson, 'It was cold.');
    return { zh: hit && hit.zh, scope: hit && hit.scope };
  })()`);
  assert.strictEqual(r.scope, 'sentence', '英文两句对中文两句，应该能精确到句；退回整段就说明切句又不一致了');
  assert.strictEqual(r.zh, '天很冷。');
});

test('沙箱默认关，但可以用 EC_CHUNKS_SANDBOX=1 打开', () => {
  const src = fs.readFileSync(path.join(ROOT, 'electron', 'main.js'), 'utf8');
  const start = src.indexOf('function sandboxRequested()');
  assert.ok(start > 0, 'electron/main.js 里找不到 sandboxRequested');
  const end = src.indexOf('\n}', start) + 2;
  assert.match(src.slice(start, end), /process\.env\.EC_CHUNKS_SANDBOX/, '开关要读环境变量');
  const read = (env) => {
    const box = vm.createContext({ process: { env } });
    vm.runInContext(src.slice(start, end), box);
    return vm.runInContext('sandboxRequested()', box);
  };
  assert.strictEqual(read({}), false, '没设变量时必须保持今天的默认（关沙箱），不然老机器起不来');
  assert.strictEqual(read({ EC_CHUNKS_SANDBOX: '0' }), false);
  assert.strictEqual(read({ EC_CHUNKS_SANDBOX: '1' }), true);
  assert.strictEqual(read({ EC_CHUNKS_SANDBOX: ' ON ' }), true, '手写的环境变量常带空格和大写');
  /* 开关必须真的落到启动参数与窗口设置上，否则等于只是个摆设 */
  assert.match(src, /if \(!USE_SANDBOX\) \{\r?\n\s*app\.disableHardwareAcceleration\(\);/);
  assert.match(src, /app\.commandLine\.appendSwitch\('no-sandbox'\)/);
  assert.match(src, /sandbox: USE_SANDBOX,/);
});

test('AI 的整段回答能按小节拆成标题、英文与中文', () => {
  const raw = [
    '### 英文标题',
    'A Small Habit',
    '',
    '### 中文标题',
    '一个小习惯',
    '',
    '### 英文原文',
    '1. I get up early every day.',
    '2. Then I make breakfast for my family!',
    '3. In the end, I feel ready for work.',
    '',
    '### 中文翻译',
    '第 1 句中文。',
    '第 2 句中文。',
    '第 3 句中文。',
    '',
    '### 重点词块（仅供参考，不需要导入）',
    '- make breakfast（v.+n.）：做早饭｜助记：给家人做饭',
    '- in the end（prep. phr.）：最终｜助记：走到尽头'
  ].join('\n');
  const r = run(`(function(){
    var out = parseAiOutput(${JSON.stringify(raw)});
    var legacy = parseAiOutput('【英文】\\nA cat sat. \\n【中文】\\n一只猫坐着。');
    /* vm 里造出来的数组跨 realm，deepStrictEqual 会误报，统一转成字符串再比 */
    return { tEn: out.titleEn, tZh: out.titleZh, en: out.en.join(' | '), zh: out.zh.join(' | '), blocks: out.blockLines, chunks: out.chunks.map(function(c){ return c.chunk + '/' + c.pos; }).join(' , '), legacy: legacy ? legacy.en.join(' | ') : '' };
  })()`);
  assert.strictEqual(r.tEn, 'A Small Habit', '英文标题要去掉 ### 与编号');
  assert.strictEqual(r.tZh, '一个小习惯', '中文标题同理');
  assert.strictEqual(
    r.en,
    'I get up early every day. | Then I make breakfast for my family! | In the end, I feel ready for work.',
    '英文去掉「1.」这类序号，仍逐句切'
  );
  assert.strictEqual(r.zh, '第 1 句中文。 | 第 2 句中文。 | 第 3 句中文。', '中文一行一句原样搬');
  assert.strictEqual(r.blocks, 2, '重点词块要按行收进课程数据');
  assert.strictEqual(r.chunks, 'make breakfast/v.+n. , in the end/prep. phr.', '词块连同词性一起解析出来');
  assert.strictEqual(r.legacy, 'A cat sat.', '老提示词的【英文】格式也还认得');
});

test('词块卡片带上词性、多义与助记（内置文章照表显示）', () => {
  const r = run(`(function(){
    var lesson = LESSONS[0];
    var html = renderChunkRows(lesson);
    var meta = chunkMeta('wake up', lesson);
    var multi = chunkMeta("can't help it", lesson);
    /* 表里没有的词块（「我的文章」里自动提上来的那种）：词性靠词形推断，多义和助记不编，留空 */
    var unknown = chunkMeta('some unknown phrase', lesson);
    var guessN = chunkMeta('in the morning light', lesson);
    var guessAdv = chunkMeta('constantly', lesson);
    var guessNone = chunkMeta('zzz', lesson);
    return { html: html, pos: meta.pos, mem: meta.mnemonic, senses: (multi.senses || []).join('、'),
      unknownPos: unknown.pos, unknownMem: unknown.mnemonic, unknownSenses: (unknown.senses || []).length,
      guessN: guessN.pos, guessAdv: guessAdv.pos, guessNone: guessNone.pos };
  })()`);
  assert.strictEqual(r.pos, 'v. phr.', '内置词块要有词性');
  assert.ok(/助记：/.test(r.mem) || r.mem.length > 0, '内置词块要有助记');
  assert.ok(/ci-pos/.test(r.html), '卡片上要渲染词性');
  assert.ok(/助记：/.test(r.html), '卡片上要渲染助记');
  assert.ok(/其他义项/.test(r.html), '「忍不住／控制不了」这类要拆成主意思 + 其他义项');
  assert.strictEqual(r.unknownPos, 'n. phr.', '表里没有的短语按词形推断词性（some X 是名词短语）');
  assert.strictEqual(r.unknownMem, '', '助记不凭空生成');
  assert.strictEqual(r.unknownSenses, 0, '多义不凭空生成');
  assert.strictEqual(r.guessN, 'prep. phr.', 'in the morning light 按首词推断成介词短语');
  assert.strictEqual(r.guessAdv, 'adv.', '-ly 结尾推断成副词');
  assert.strictEqual(r.guessNone, '', '判不出来就留空，卡片上给「＋ 词性」');
});

test('AI 写的文章：重点词块解析成词性/多义/助记，并补上空着的中文意思', () => {
  const r = run(`(function(){
    var parsed = parseAiOutput('### 重点词块\\n- make breakfast（v.+n.）：做早饭；把早餐做好｜助记：把早餐做出来\\n- in the end (prep. phr.): 最终 | 助记：走到尽头');
    var notes = chunkNotesFromParsed(parsed.chunks);
    var lesson = normalizeLesson({ title:'t', text:['I make breakfast.'], textZh:['我做早餐。'], chunks:[{ chunk:'make breakfast', sentence:'I make breakfast.', meaning:'' }] });
    var filled = applyChunkNotes(lesson, notes);
    var kept = normalizeLesson(lesson).chunkNotes;
    return { n: parsed.chunks.length, pos: notes['make breakfast'].pos, mem: notes['make breakfast'].mnemonic, senses: notes['make breakfast'].senses.join('、'), filled: filled, meaning: lesson.chunks[0].meaning, kept: Object.keys(kept).join(','), inline: notes['in the end'].mnemonic };
  })()`);
  assert.strictEqual(r.n, 2, '两行重点词块都要解析出来');
  assert.strictEqual(r.pos, 'v.+n.', '全角括号里的词性');
  assert.strictEqual(r.senses, '做早饭、把早餐做好', '「；」隔开的多义');
  assert.strictEqual(r.mem, '把早餐做出来');
  assert.strictEqual(r.inline, '走到尽头', '半角括号 + 竖线的版本也认得');
  assert.strictEqual(r.filled, 1, '空着的中文意思要用它补上');
  assert.strictEqual(r.meaning, '做早饭');
  assert.strictEqual(r.kept, 'make breakfast,in the end', '词块附加信息跟着文章存，读盘后还在');
});

test('AI 写的助记要过筛：把意思换个说法、只写「记住」的都不收', () => {
  const r = run(`(function(){
    var one = function(s){ var p = parseChunkLine(s); return p ? p.mnemonic : 'parse-failed'; };
    return {
      repeat: one('- give up（v. phr.）：放弃；分发｜助记：记住它表示放弃'),
      slogan: one('- in the end（prep. phr.）：最终｜助记：多读几遍'),
      bland: one('- light（n.）：光｜助记：记住这个搭配'),
      sense: one('- make breakfast（v.+n.）：做早饭｜助记：做早饭要早起'),
      ok1: one('- make breakfast（v.+n.）：做早饭｜助记：把早餐做出来'),
      ok2: one('- take off（v. phr.）：起飞｜助记：登机前飞机离开地面的样子'),
      none: one('- light（n.）：光')
    };
  })()`);
  assert.strictEqual(r.repeat, '', '「记住它表示放弃」就是复述，不算助记');
  assert.strictEqual(r.slogan, '', '「多读几遍」是口号，不是记忆钩子');
  assert.strictEqual(r.bland, '', '「记住这个搭配」同理');
  assert.strictEqual(r.sense, '', '助记里把主意思整段再说一遍也丢掉');
  assert.strictEqual(r.ok1, '把早餐做出来', '有画面的助记要留下');
  assert.strictEqual(r.ok2, '登机前飞机离开地面的样子');
  assert.strictEqual(r.none, '', '没写助记不报错，卡片上就是空着');
});

test('我的文章：词性靠推断，卡片上不再有任何「问 AI / 手动补」的入口', () => {
  const r = run(`(function(){
    var lesson = normalizeLesson({ id:'c1', custom:true, title:'My Morning', text:['The morning light comes through the window.'], textZh:['早晨的光透过窗户照进来。'], chunks:[
      { chunk:'the morning light', sentence:'The morning light comes through the window.', meaning:'' },
      { chunk:'comes through', sentence:'The morning light comes through the window.', meaning:'穿过' }
    ] });
    state.customLessons.push(lesson);
    var m1 = chunkMeta('the morning light', lesson);
    var html = renderChunkRows(lesson);
    return { pos: m1.pos, inferred: m1.inferred, mem: m1.mnemonic,
      manual: (html.match(/data-note=/g) || []).length + (html.match(/data-ask=/g) || []).length,
      copyPrompt: html.indexOf('提示词') > -1 };
  })()`);
  assert.strictEqual(r.pos, 'n. phr.', '内置表里没有的词块按词形推断词性');
  assert.strictEqual(r.inferred, true, '推断出来的要标出来（虚线圈）');
  assert.strictEqual(r.mem, '', '助记不凭空编');
  assert.strictEqual(r.manual, 0, '卡片上不再有逐条的「改词性/加助记/加其他义项/问 AI」');
  assert.strictEqual(r.copyPrompt, false, '卡片上也不再出现复制提示词的入口');
  const src = fs.readFileSync(APP, 'utf8');
  assert.strictEqual(src.indexOf('btnChunkNotesAi'), -1, '整篇补全那颗按钮已去掉');
  assert.strictEqual(src.indexOf('buildChunkNotesPrompt'), -1, '整篇补全的提示词已去掉');
  assert.strictEqual(src.indexOf('data-ask-chunk'), -1, '词块本里的「问 AI」已去掉');
  assert.strictEqual(src.indexOf('buildWordPrompt'), -1, '只问一个词的提示词已去掉');
});

test('自动分段：行内小节、开场白、光秃秃的小节名都分得开', () => {
  const r = run(`(function(){
    var a = parseAiOutput('好的，下面是文章。\\n### 英文标题：A Quiet Morning\\n### 中文标题：安静的早晨\\n### 英文原文：The light comes in. I get up early.\\n### 中文翻译：光透进来。我早起。\\n### 重点词块\\n- morning light（n. phr.）：晨光｜助记：morning 早晨');
    var b = parseAiOutput('英文标题：My Weekend\\n中文标题：我的周末\\n英文原文：\\nI go to the park.\\n中文翻译：\\n我去公园。');
    return {
      a: [a.titleEn, a.titleZh, a.en.length, a.zh.length, a.chunks.length, a.ignored].join('|'),
      b: [b.titleEn, b.titleZh, b.en.length, b.zh.length].join('|')
    };
  })()`);
  assert.strictEqual(
    r.a,
    'A Quiet Morning|安静的早晨|2|1|1|1',
    '「### 英文标题：内容」同行写法要认出标题，开场白要跳过'
  );
  assert.strictEqual(r.b, 'My Weekend|我的周末|1|1', '没有 ### 的「英文原文：」也要当成小节头');
});

test('AI 的重点词块会和自动提取的词块对齐：碎片被替换、缺的补进来', () => {
  const r = run(`(function(){
    var lesson = normalizeLesson({ id:'c2', custom:true, title:'t', text:['The morning light comes through the window.','In the end, I decided to get up.'], textZh:['早晨的光透过窗户照进来。','最后我决定起床。'], chunks:[] });
    lesson.chunks = extractChunks(lesson.text, 18);
    var parsed = parseAiOutput('### 重点词块\\n- morning light（n. phr.）：晨光\\n- in the end（prep. phr.）：最终');
    var filled = applyChunkNotes(lesson, chunkNotesFromParsed(parsed.chunks));
    var names = lesson.chunks.map(function(c){ return c.chunk; }).join(',');
    var note = lesson.chunkNotes['morning light'] || {};
    var endNote = lesson.chunkNotes['in the end'] || {};
    return { dirty: lesson.chunks.some(function(c){ return /[,.;]/.test(c.chunk); }), crossed: lesson.chunks.some(function(c){ return chunkLooseKey(c.chunk) === 'decision get'; }), names: names, filled: filled, pos: note.pos, endPos: endNote.pos, meaning: (lesson.chunks.filter(function(c){ return c.chunk === 'morning light'; })[0] || {}).meaning || '' };
  })()`);
  assert.strictEqual(r.dirty, false, '提取出来的词块不该带标点碎片');
  assert.ok(r.names.indexOf('morning light') > -1, 'AI 说的词块要补进这篇：' + r.names);
  assert.ok(r.names.indexOf('in the end') > -1, '不在提取结果里的 AI 词块也要补进来（能找到原句才加）：' + r.names);
  assert.strictEqual(r.pos, 'n. phr.', '对齐后词性要挂上');
  assert.strictEqual(r.endPos, 'prep. phr.');
  assert.strictEqual(r.meaning, '晨光', '空着的中文意思用第一个义项补');
  assert.strictEqual(r.crossed, false, '跨意群的碎片（decision to get）要被清掉：' + r.names);
});

test('数字短语：twenty minutes 这类直接算出中文意思和词性，不用去问 AI', () => {
  const r = run(`(function(){
    var a = normalizeLesson({ id:'c3', custom:true, title:'t', text:['Getting ready for work takes me about twenty minutes.','I stayed there for three days.'], textZh:['准备上班大概花我二十分钟。','我在那儿待了三天。'], chunks:[] });
    a.chunks = extractChunks(a.text, 18);
    var pick = function(n){ return a.chunks.filter(function(c){ return c.chunk === n; })[0] || {}; };
    return { twenty: numPhraseGloss('twenty minutes'), three: numPhraseGloss('three days'), pos: inferPos('twenty minutes'), word: inferPos('twenty'), none: numPhraseGloss('morning light'),
      names: a.chunks.map(function(c){ return c.chunk; }).join(','), got: pick('twenty minutes').meaning || '' };
  })()`);
  assert.strictEqual(r.twenty, '二十分钟');
  assert.strictEqual(r.three, '三天');
  assert.strictEqual(r.pos, 'num.+n.');
  assert.strictEqual(r.word, 'num.', '单个数字词也是 num.');
  assert.strictEqual(r.none, '', '不是数字短语就不猜');
  assert.strictEqual(r.got, '二十分钟', '提取词块时就自动填上，卡片不会空着：' + r.names);
});

test('不粘 AI 回答时，词性、多义也从本地表里自动来', () => {
  const r = run(`(function(){
    var light = chunkMeta('light', null);
    var decision = chunkMeta('decision', null);
    var unknown = chunkMeta('zzz', null);
    return { lightPos: light.pos, lightSenses: light.senses.join('、'), decisionPos: decision.pos, unknownPos: unknown.pos, unknownSenses: unknown.senses.length };
  })()`);
  assert.ok(/n\./.test(r.lightPos) && /v\./.test(r.lightPos), 'light 是名词也是动词，查表要给出多个：' + r.lightPos);
  assert.ok(r.lightSenses.indexOf('轻的') > -1, '一词多义要自动带上：' + r.lightSenses);
  assert.strictEqual(r.decisionPos, 'n.', '词性按表/后缀自动给');
  assert.strictEqual(r.unknownPos, '', '判不出来就留空，不瞎标');
  assert.strictEqual(r.unknownSenses, 0);
});

test('带冠词的长短语整串查不到意思时，退回子串的意思', () => {
  const r = run(`(function(){
    var chunks = extractChunks(['The alarm rings at six in the morning.'], 18);
    var one = chunks.filter(function(c){ return c.chunk === 'alarm rings'; })[0] || {};
    return { meaning: one.meaning || '', sub: subChunkGloss('the alarm rings'), none: subChunkGloss('zzz qqq') };
  })()`);
  assert.strictEqual(r.sub, '闹钟响', 'the alarm rings → 退回 alarm rings 的意思');
  assert.strictEqual(r.meaning, '闹钟响', '自动提取出来的词块直接带上这个意思');
  assert.strictEqual(r.none, '', '查不到就空着，不瞎给');
});

test('子串释义只许丢开头的实词，末尾实词不许丢', () => {
  const dict = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'dict.json'), 'utf8')).words;
  const a = loadApp();
  a.run('OFFLINE_DICT = ' + JSON.stringify(dict) + '; "ok"');
  const sub = (s) => a.run('subChunkGloss(' + JSON.stringify(s) + ')');
  assert.strictEqual(sub('the alarm rings'), '闹钟响', '带冠词的长短语照样能退回子串');
  assert.strictEqual(sub('say good morning'), '早上好', '丢掉开头的实词还行：say good morning → good morning');
  assert.strictEqual(sub('like to get'), '', 'like to 只剩一个实词，不算（以前判成「差点儿就要」）');
  assert.strictEqual(sub('run for fifteen'), '', 'run for 只剩 run，不算（以前判成「竞选」）');
  assert.strictEqual(sub('to-do list'), '', 'to do 只剩 do，不算（以前判成「要做某事」）');
});

test('词形表：不规则变形能查回原形再拿到意思', () => {
  const a = loadApp();
  a.run(`OFFLINE_DICT = { go: 'v. 去；走', good: 'adj. 好的' }; LEMMA = { went: 'go', better: 'good' }; 'ok'`);
  assert.strictEqual(a.run(`glossOfWord('went')`), '去', 'went 先查回 go 再取第一个义项');
  assert.strictEqual(a.run(`glossOfWord('better')`), '好的');
  assert.strictEqual(a.run(`lemmaOf('Went')`), 'go', '大小写不敏感');
  assert.strictEqual(a.run(`glossOfWord('zzz')`), '', '查不到就空着，不硬编');
});

test('接上离线词典后，短语词块能靠每个词的意思拼出助记', () => {
  const dict = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'dict.json'), 'utf8')).words;
  const lemma = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'lemma.json'), 'utf8')).words;
  const src =
    "(function(){\n  var before = buildPhraseMnemonic('light bag');\n  var plainHood = glossOfWord('wardrobe');\n  OFFLINE_DICT = __DICT__;\n  LEMMA = __LEMMA__;\n  var after = buildPhraseMnemonic('light bag');\n  return { before: before, after: after, plainHood: plainHood, hood: glossOfWord('wardrobe'), went: glossOfWord('went') };\n})()"
      .replace('__DICT__', JSON.stringify(dict))
      .replace('__LEMMA__', JSON.stringify(lemma));
  const r = run(src);
  assert.strictEqual(r.before, '', '没有词典时两个词都认不出，就空着');
  assert.ok(r.after.indexOf('光') > -1, '有词典后能拼出 light（光）；现在：' + r.after);
  assert.strictEqual(r.plainHood, '', '没词典时 wardrobe 没有释义');
  assert.strictEqual(r.hood, '衣橱');
  assert.ok(r.went !== '', 'went 要能查回 go 拿到意思：' + r.went);
});
test('离线词典的 | 分块：别的词性进「其他义项」，同义词不重复列', () => {
  const a = loadApp();
  a.run("OFFLINE_DICT = { light: 'n. 光, 光亮 | adj. 轻的, 少量', hood: 'n. 罩；风帽' }; 'ok'");
  assert.strictEqual(a.run("dictGloss('light')"), '光', '只取第一块第一项');
  assert.strictEqual(a.run("dictSenses('light')").join(' / '), 'adj. 轻的', '换词性的那一块才算其他义项');
  assert.strictEqual(a.run("dictSenses('hood')").join(' / '), '风帽', '只有一块时靠分号拆');
  assert.strictEqual(a.run("dictSenses('zzz')").length, 0);
});

test('data/dict.json 装的是能直接用的中文释义', () => {
  const p = path.join(ROOT, 'data', 'dict.json');
  assert.ok(fs.existsSync(p), '要随仓库提交 data/dict.json');
  /* 2 万单词约 950KB，加上 3.6 万条常见搭配后约 2.3MB；再大就说明收进了不该收的条目 */
  assert.ok(
    fs.statSync(p).size < 4 * 1024 * 1024,
    '词典别超过 4MB（现在 ' + Math.round(fs.statSync(p).size / 1024) + 'KB）'
  );
  const j = JSON.parse(fs.readFileSync(p, 'utf8'));
  const lp = path.join(ROOT, 'data', 'lemma.json');
  const a = loadApp();
  a.run(
    'OFFLINE_DICT = ' +
      JSON.stringify(j.words) +
      '; LEMMA = ' +
      JSON.stringify(JSON.parse(fs.readFileSync(lp, 'utf8')).words) +
      '; "ok"'
  );
  assert.strictEqual(a.run("dictGloss('morning')"), '早晨');
  assert.ok(
    a.run("dictSenses('light')").some((s) => s.indexOf('adj. 轻的') === 0),
    'light 的形容词义项要进其他义项'
  );
  assert.strictEqual(a.run("glossOfWord('light')"), '光');
  assert.strictEqual(a.run("lookupGloss('wardrobe')"), '衣橱');
});

test('短语也进词典：提取出来的 2–3 词搭配直接带中文', () => {
  const j = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'dict.json'), 'utf8'));
  const a = loadApp();
  a.run('OFFLINE_DICT = ' + JSON.stringify(j.words) + '; "ok"');
  assert.strictEqual(a.run("lookupGloss('coffee shop')"), '咖啡店', '整串短语要能直接查到');
  assert.strictEqual(a.run("dictGloss('software engineer')"), '软件工程师');
  assert.strictEqual(a.run("dictGloss('In The End')"), '最后', '大小写不敏感');
  /* 端到端：一篇文章里自动提取出的搭配本身就带上中文，不用手填 */
  const got = a.run(
    "(function(){ var s = splitEnglishSentences('We met at a coffee shop near the station.'); " +
      "return extractChunks(s, 8).filter(function(c){ return c.meaning; }).map(function(c){ return c.chunk + '=' + c.meaning; }); })()"
  );
  /* 提取可能给出 coffee shop 也可能给出 coffee shop near，两者都该拿到「咖啡店」 */
  assert.ok(
    got.some(function (s) {
      return s.indexOf('coffee shop') === 0 && /咖啡店$/.test(s);
    }),
    '提取出的 coffee shop 要有中文：' + got.join(' | ')
  );
});

test('词典构建：短语只收每个词都认得的，且必须有中文', () => {
  const { buildDict } = require(path.join(ROOT, 'tools', 'build-dict.js'));
  const rows = [
    ['word', 'translation', 'tag', 'bnc', 'frq'],
    ['coffee', 'n. 咖啡', '', '1000', '1000'],
    ['shop', 'n. 商店', '', '1200', '1200'],
    ['coffee shop', '咖啡店', '', '1500', '1500'],
    ['coffee zzz', '咖啡某物', '', '1600', '1600'],
    ['coffee shop bar', '[网络] 咖啡吧', '', '1700', '1700'],
    ['shop coffee', 'shop coffee', '', '1800', '1800']
  ];
  const built = buildDict(rows, { limit: 2, phrases: Infinity });
  assert.strictEqual(built.words['coffee shop'], '咖啡店', '两个词都认得就收进来');
  assert.ok(!('coffee zzz' in built.words), '有一个词不在词表里，整条不收');
  assert.ok(!('coffee shop bar' in built.words), '只有 [领域] 标注的条目跳过');
  assert.ok(!('shop coffee' in built.words), '没有中文的条目跳过');
  assert.strictEqual(built.phraseCount, 1);
});

test('data/lemma.json 是一份精简可用的词形表', () => {
  const p = path.join(ROOT, 'data', 'lemma.json');
  assert.ok(fs.existsSync(p), '要随仓库提交 data/lemma.json');
  const j = JSON.parse(fs.readFileSync(p, 'utf8'));
  assert.strictEqual(j.words.went, 'go');
  assert.strictEqual(j.words.children, 'child');
  assert.strictEqual(j.words.mice, 'mouse');
  assert.ok(fs.statSync(p).size < 200 * 1024, '表要精简（现在 ' + fs.statSync(p).size + ' 字节）');
});

test('离线词典：放上 data/dict.json 就补中文意思和其他义项，没有也不影响', () => {
  const a = loadApp();
  assert.strictEqual(a.run(`lookupGloss('hood')`), '', '没有词典文件时不该凭空造意思');
  assert.strictEqual(a.run(`dictGloss('hood')`), '');
  a.run(`OFFLINE_DICT = { hood: 'n. 罩；风帽；面罩', wander: 'v. 漫步；走神', organizing: 'v. 组织' }; 'ok'`);
  assert.strictEqual(a.run(`lookupGloss('hood')`), '罩', '单词语块要能查到词典里的中文');
  assert.strictEqual(a.run(`glossOfWord('Wander')`), '漫步', '大小写不敏感');
  assert.strictEqual(a.run(`dictSenses('hood').join(',')`), '风帽,面罩', '其余义项去掉词性后分开');
  assert.strictEqual(a.run(`chunkMeta('hood', null).senses.join(',')`), '风帽,面罩', '卡片上的「其他义项」用词典兜底');
  assert.ok(/轻/.test(a.run(`chunkMeta('light', null).senses.join(',')`)), '内置表里的词不被词典覆盖');
  assert.strictEqual(a.run(`chunkMeta('organizing', null).pos`), 'v.ing', '词性还是按词形推断，不靠词典');
});

test('词块本与复习卡片也用上词典的其他义项，主意思重复的不列', () => {
  const a = loadApp();
  a.run(`OFFLINE_DICT = { hood: 'n. 罩；风帽；面罩', light: 'n. 光, 光亮 | adj. 轻的 | v. 点燃' }; 'ok'`);
  assert.strictEqual(
    a.run(`metaSenses(chunkMeta('hood', null), '罩').join(',')`),
    '风帽,面罩',
    '词块本里没填多义的词，其他义项从词典来'
  );
  assert.strictEqual(
    a.run(`metaSenses(chunkMeta('light', null), '轻的').join(',')`),
    '点燃',
    '主意思就是「轻的」，别再列一遍'
  );
  assert.strictEqual(a.run(`metaSenses(chunkMeta('zzz', null), '').length`), 0, '查不到就什么都不显示');
  /* 渲染层：三处都要真用到它（词块本卡片 / 复习揭晓 / 搜索） */
  const src = fs.readFileSync(path.join(ROOT, 'app.js'), 'utf8');
  assert.ok(/<p class="senses"><span class="lbl">其他义项<\/span>/.test(src), '词块本卡片要显示其他义项');
  assert.ok(/rev-extra">其他义项/.test(src), '复习揭晓后要带其他义项');
  assert.ok(/metaSenses\(chunkMeta\(c\.chunk\), c\.meaning\)\.join\(' '\)/.test(src), '搜「轻的」要能找到 light');
  assert.ok(/const meaning = c\.meaning \|\| dictGloss\(c\.chunk\)/.test(src), '老词块没填意思时用词典首义兜底');
});

test('构词助记认词根，短语助记先认整条、拆词只当退路', () => {
  const r = run(`(function(){
    return {
      inspect: buildMorphMnemonic('inspect', ''),
      invisible: buildMorphMnemonic('invisible', ''),
      remote: buildMorphMnemonic('remote', ''),
      unhappy: buildMorphMnemonic('unhappiness', ''),
      phrase: buildPhraseMnemonic('light taste'),
      phraseNone: buildPhraseMnemonic('zzz qqq'),
      prefixes: Object.keys(PREFIX_META).length,
      roots: Object.keys(ROOT_META).length,
      viaMeta: chunkMeta('invisible', null).mnemonic || ''
    };
  })()`);
  assert.ok(/spect（看）/.test(r.inspect), 'inspect 要能拆出词根 spect（看）：' + r.inspect);
  assert.ok(/vis（看）/.test(r.invisible), 'invisible = in + vis + ible：' + r.invisible);
  assert.strictEqual(r.remote, '', 'remote 不该被误拆成 re + mote');
  assert.ok(/un-/.test(r.unhappy) && /-ness/.test(r.unhappy), '前后缀还是要照旧拆：' + r.unhappy);
  assert.ok(/light（光）/.test(r.phrase), '两个词都查得到意思时拼成助记：' + r.phrase);
  assert.strictEqual(r.phraseNone, '', '一个词都查不到就不硬拼');
  assert.ok(r.prefixes >= 50, '前缀表要扩到 50 条以上：' + r.prefixes);
  assert.ok(r.roots >= 40, '词根表至少 40 条：' + r.roots);
  assert.ok(/vis（看）/.test(r.viaMeta), 'chunkMeta 取到的助记走的是同一套构词逻辑：' + r.viaMeta);
});

test('构词助记不硬凑：词干既没意思也认不出词根就留空', () => {
  const dict = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'dict.json'), 'utf8')).words;
  const lemma = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'lemma.json'), 'utf8')).words;
  const a = loadApp();
  a.run('OFFLINE_DICT = ' + JSON.stringify(dict) + '; LEMMA = ' + JSON.stringify(lemma) + '; "ok"');
  const m = (w) => a.run('buildMorphMnemonic(' + JSON.stringify(w) + ', "")');
  assert.strictEqual(m('intentional'), '', 'in- + -al 拆完词干没意思，不如不写');
  assert.strictEqual(m('anticipation'), '', 'anti 是「反对」不是「在前」，不能乱认前缀');
  assert.strictEqual(m('reinforced'), '', '把屈折 -ed 当构词后缀会教错');
  const conv = m('conversation');
  assert.ok(conv.indexOf('co-') === -1, 'co 不是前缀：' + conv);
  assert.ok(/vers（转）/.test(conv), '认得出词根就照常讲：' + conv);
  assert.ok(/steady（稳定）/.test(m('steadily')), 'steadily 要还原成 steady 再讲：' + m('steadily'));
  assert.ok(/hope（希望）/.test(m('hopeless')), '词干短但有后缀的照样讲：' + m('hopeless'));
  assert.ok(/poss（能）/.test(m('impossible')), 'impossible = im + poss + ible');
  assert.strictEqual(m('remote'), '', 'remote 不该被误解成 re + mote');
});

test('短语助记先认整条意思：give up 是「放弃」，不再拆成「弹性 + 向上的」', () => {
  const dict = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'dict.json'), 'utf8')).words;
  const lemma = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'lemma.json'), 'utf8')).words;
  const a = loadApp();
  a.run('OFFLINE_DICT = ' + JSON.stringify(dict) + '; LEMMA = ' + JSON.stringify(lemma) + '; "ok"');
  const m = (s) => a.run('buildPhraseMnemonic(' + JSON.stringify(s) + ')');
  assert.strictEqual(m('give up'), '放弃', '整条有义就别拆词');
  assert.strictEqual(m('in the end'), '最终');
  assert.strictEqual(m('coffee shop'), '咖啡店', '词典里的短语条目直接用');
  assert.strictEqual(m('take off'), '起飞');
  assert.strictEqual(m('twenty minutes'), '二十分钟', '数字短语也算整条义');
  assert.strictEqual(m('care about'), '在意');
  /* 拆词只留给整条查不到的时候，而且虚词不能参与 */
  assert.ok(/light（光）/.test(m('light taste')), '整条没有时才拆词：' + m('light taste'));
  const withThe = m('light the bag');
  assert.ok(withThe.indexOf('the（') === -1, 'the/in/up 这些虚词不许摆进助记：' + withThe);
  /* 屈折形按原形取义（felt 的词典首义是「毛毯」） */
  assert.ok(m('felt heavy').indexOf('毛毯') === -1, 'felt 要按 feel 取义：' + m('felt heavy'));
});

test('短语里的三单和复数按原形取义：feels 是「感觉」不是「毛毯」', () => {
  const dict = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'dict.json'), 'utf8')).words;
  const lemma = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'lemma.json'), 'utf8')).words;
  const a = loadApp();
  a.run('OFFLINE_DICT = ' + JSON.stringify(dict) + '; LEMMA = ' + JSON.stringify(lemma) + '; "ok"');
  /* 词形表把 feels 收成了 felt（毛毯），所以规则必须先于词形表 */
  assert.strictEqual(a.run('phraseBaseOf("feels")'), 'feel');
  assert.strictEqual(a.run('phraseBaseOf("starts")'), 'start');
  assert.strictEqual(a.run('phraseBaseOf("habits")'), 'habit');
  assert.strictEqual(a.run('phraseBaseOf("reduces")'), 'reduce');
  const m = a.run('buildPhraseMnemonic("feels calm")');
  assert.ok(m.indexOf('感觉') > -1 && m.indexOf('毛毯') === -1, 'feels 要按 feel 取义：' + m);
  assert.ok(a.run('buildMorphMnemonic("overnight","")').indexOf('越过') > -1, 'over- 不只有「过度」');
});

test('词块提取丢掉切碎的半句，只留下值得记的语块', () => {
  const r = run(`(function(){
    var text = ['I get dressed and pack my bag before work.','Getting ready takes me twenty minutes.','Sarah walks to the coffee shop and knows it is early.'];
    var cs = extractChunks(text, 18);
    var names = cs.map(function(c){ return c.chunk; });
    function has(w){ return names.indexOf(w) > -1; }
    return {
      names: names.join(','),
      count: cs.length,
      linkerPiece: names.some(function(n){ return n.split(' ').indexOf('and') > -1; }),
      subjectVerb: has('Sarah walks'),
      numberPiece: has('takes me twenty'),
      worth: [chunkWorth('Sarah walks','',1,false), chunkWorth('dressed and pack','',1,false), chunkWorth('takes me twenty','',1,false), chunkWorth('make breakfast','做早餐',1,false), chunkWorth('morning light','',1,false)].map(function(b){ return b ? 'y' : 'n'; }).join(''),
      clock: numPhraseGloss("seven o'clock"),
      meaningFirst: !!(cs[0] && cs[0].meaning)
    };
  })()`);
  assert.ok(r.count <= 12, '筛完不该还是 18 条：' + r.names);
  assert.strictEqual(r.linkerPiece, false, '「dressed and pack」这类并列碎片要丢掉：' + r.names);
  assert.strictEqual(r.subjectVerb, false, '「Sarah walks」这种主谓被切成两词的碎片要丢掉：' + r.names);
  assert.strictEqual(r.numberPiece, false, '「takes me twenty」这种缺单位词的数字碎片要丢掉：' + r.names);
  assert.strictEqual(r.worth, 'nnnyy', '碎片丢、真搭配留（含查得到中文的）');
  assert.strictEqual(r.clock, '七点', "seven o'clock 也要算出中文");
  assert.strictEqual(r.meaningFirst, true, '查得到中文的排在最前面');
});

test('问 AI 的站点里有千问，下拉与配置同步', () => {
  const names = run(`(function(){ return AI_SITES.map(function(s){ return s.name + ' ' + s.url; }).join('|'); })()`);
  assert.ok(/千问 https:\/\/www\.qianwen\.com\//.test(names), 'AI_SITES 里要有千问', names);
  const html = fs.readFileSync(HTML, 'utf8');
  assert.ok(/<option value="https:\/\/www\.qianwen\.com\/">千问<\/option>/.test(html), '统计页下拉也要有这一项');
  assert.ok(
    /aSentCount/.test(html) && /id="aAiRaw"/.test(html) && /id="btnParseAi"/.test(html),
    '弹窗要有句数输入和「自动分段」入口'
  );
});

test('提示词与复制按钮都走 app.js，HTML 里没有内联事件', () => {
  const html = fs.readFileSync(HTML, 'utf8');
  assert.ok(/id="page-mistakes"/.test(html), '错题本要是独立页面');
  assert.ok(/data-page="mistakes"/.test(html), '要有 tab 入口');
  assert.ok(/id="mistakeBody"/.test(html) && /id="mistakeChips"/.test(html));
  assert.ok(/id="aPrompt"/.test(html) && /id="btnCopyPrompt"/.test(html), '文章弹窗里要有提示词框和复制按钮');
  assert.ok(/bind\('#btnParseAi', 'click', fillFromAiOutput\)/.test(src), '「自动分段」按钮要接到 fillFromAiOutput');
  assert.ok(/bindMistakeEvents\(\);/.test(src), '错题本事件要在 init 里绑定');
  assert.ok(/#mistakeChips/.test(src) && /#btnCopyPrompt/.test(src));
});

console.log('初始化容错');
test('init 里不再裸取元素：缺 id 只提示、不中断整页', () => {
  /* 以前是 $('#x').onclick = ...，改页面时漏掉或改名一个 id，init() 就在那一行抛
     TypeError，后面的接线、renderAll()、定时器全都不执行，表现成「能打开但按钮全哑」。
     现在统一走 bind()：元素不在只记一条，启动后给一句可关闭的提示。 */
  const initBody = src.slice(src.indexOf('function init(){'));
  assert.ok(initBody.length > 500, 'init() 要从源码里切出来');
  /* 接线本身已经按功能块拆到 bind*() 里了（见下面那条用例），所以「不许裸取元素」这条
     要查从第一块接线到文件末尾的整段，而不是只看 init 的函数体。 */
  const wiring = src.slice(src.indexOf('init() 里按功能块拆出来的接线'));
  assert.ok(wiring.length > 10000, '要能切出接线那一段');
  assert.ok(!/\$\('#[\w-]+'\)\.onclick\s*=/.test(wiring), '接线里不该再有裸的 onclick 赋值');
  assert.ok(!/\$\('#[\w-]+'\)\.addEventListener\(/.test(wiring), '接线里不该再对 $() 的返回值直接 addEventListener');
  assert.ok(/function bind\(target, evt, fn\)\{/.test(src), '要有 bind() 帮助函数');
  assert.ok(
    /if \(!el\)\{ if \(typeof target === 'string'\) bindMisses\.push\(target\); return null; \}/.test(src),
    'bind 缺元素时只记账、不抛错'
  );
});

test('init() 只负责按顺序调用接线块，不再是一个 400 多行的函数', () => {
  const start = src.indexOf('function init(){');
  let depth = 0;
  let end = -1;
  for (let i = start; i < src.length; i++) {
    if (src[i] === '{') depth++;
    else if (src[i] === '}') {
      depth--;
      if (depth === 0) {
        end = i + 1;
        break;
      }
    }
  }
  assert.ok(start > 0 && end > start, '要能切出 init() 的完整函数体');
  const body = src.slice(start, end);
  const lines = body.split('\n').length;
  assert.ok(lines < 80, 'init() 又长回去了（现在 ' + lines + ' 行）：该拆的接线请拆到 bind*() 里');
  const calls = body.match(/^ {2}bind[A-Z]\w*\(\);/gm) || [];
  assert.ok(calls.length >= 12, 'init() 里应该是一串接线调用，实际只有 ' + calls.length + ' 个：' + calls.join(' '));
  /* 拆出去的那几块必须真的被调用，不能拆完忘了接 */
  ['bindTabs', 'bindLessonListEvents', 'bindPromptPanel', 'bindArticleForm', 'bindBackupEvents'].forEach((name) => {
    assert.ok(new RegExp('^ {2}' + name + '\\(\\);', 'm').test(body), 'init() 里漏了 ' + name + '()');
    assert.ok(new RegExp('function ' + name + '\\(\\)\\{').test(src), '找不到 ' + name + ' 的定义');
  });
});

test('启动走带兜底的 boot()，失败要在界面上说得清', () => {
  assert.ok(/function boot\(\)\{/.test(src), '要有 boot() 包一层');
  assert.ok(
    /document\.addEventListener\('DOMContentLoaded', boot\)/.test(src) && /else boot\(\);/.test(src),
    'DOMContentLoaded 与同步两条路径都要走 boot'
  );
  assert.ok(/function reportUiIssue\(title, detail\)\{/.test(src), '要有可见的错误提示');
  assert.ok(/reportUiIssue\('界面初始化失败'/.test(src), 'init 抛错时要提示');
  assert.ok(/catch\(err\)\{\s*\n\s*console\.error\('\[init\]/.test(src), '失败路径要留一条 console.error 方便排查');
});

test('init 在桩 DOM 上能从头跑到尾（兜接线拼写错误）', () => {
  /* 桩 DOM 的 querySelector 永远返回元素，所以不会走到 bind() 的缺元素分支；
     这里要的是「四十多处事件名、选择器拼错一个就当场炸」这种保护。 */
  const fresh = loadApp();
  fresh.run('boot()');
  assert.ok(true, 'init() 完整跑完');
});

console.log('填空逐题判');
test('填空题每题都有自己的「看这题答案」，默认不展开答案', () => {
  const r = run(`(function(){
    var lesson = { id:'T', title:'t', chunks:[], cloze:[
      { before:'I ', answer:'made', after:' breakfast.', hint:'做（饭）', sentence:'I made breakfast.' },
      { before:'She ', answer:'woke', after:' up early.', hint:'醒来', sentence:'She woke up early.' }
    ] };
    var html = renderClozeItems(lesson, { cloze:{}, clozeRes:{} });
    return {
      n: (lesson.cloze || []).length,
      btns: (html.match(/data-cloze-check="/g) || []).length,
      opened: (html.match(/cloze-res"[^>]*hidden/g) || []).length,
      label: /看这题答案/.test(html)
    };
  })()`);
  assert.ok(r.n > 0, '内置文章里要有填空题可测', r.n);
  assert.strictEqual(r.btns, r.n, '每道题都要有自己的判定按钮');
  assert.strictEqual(r.opened, r.n, '默认每题的答案框都收着，不该一进来就摊开');
  assert.ok(r.label, '按钮文案要说清是「看这题答案」');
  assert(
    /data-cloze-check=/.test(src) && /function judgeCloze\(i\)/.test(src),
    '判定要抽成一个函数，逐题与全部检查共用同一套规则'
  );
  assert(/全部检查/.test(src), '整卷判定的按钮要叫「全部检查」');
  assert(!/results\[i\] = ok;/.test(src), '全部检查里那句「空着也判错」的老逻辑要消失');
});

console.log('错题本清理');
test('清空已订正的错题会留墓碑，云同步不会把它搬回来', () => {
  const r = run(`(function(){
    state.mistakes = {
      'A|quiz|0': { id:'A|quiz|0', lessonId:'A', kind:'quiz', idx:0, wrong:1, fixed:true, at:'2026-01-01T00:00:00.000Z' },
      'A|quiz|1': { id:'A|quiz|1', lessonId:'A', kind:'quiz', idx:1, wrong:1, fixed:false, at:'2026-01-02T00:00:00.000Z' }
    };
    state.deletedMistakes = {};
    var n = clearFixedMistakes();
    var after = Object.keys(state.mistakes);
    var tomb = Object.keys(state.deletedMistakes);
    var merged = mergeStates(migrate(JSON.parse(JSON.stringify(state))), { version: DATA_VERSION, mistakes: {
      'A|quiz|0': { id:'A|quiz|0', lessonId:'A', kind:'quiz', idx:0, wrong:1, fixed:true, at:'2026-01-01T00:00:00.000Z' },
      'A|quiz|1': { id:'A|quiz|1', lessonId:'A', kind:'quiz', idx:1, wrong:1, fixed:false, at:'2026-01-02T00:00:00.000Z' }
    } });
    /* 同题又错一次：墓碑要撤掉，否则白记 */
    recordMistake({ id:'A', title:'t' }, 'quiz', 0, { q:'x' });
    return { n: n, after: after.join(','), tomb: tomb.join(','), merged: Object.keys(merged.mistakes).join(','), tombAfterRetry: Object.keys(state.deletedMistakes).join(',') };
  })()`);
  assert.strictEqual(r.n, 1, '只清已订正的那一条');
  assert.strictEqual(r.after, 'A|quiz|1', '待订正的必须留着');
  assert.strictEqual(r.tomb, 'A|quiz|0', '清掉的 id 要记进墓碑');
  assert.strictEqual(r.merged, 'A|quiz|1', '合并云端时墓碑要盖住云端搬回来的旧条目');
  assert.strictEqual(r.tombAfterRetry, '', '同一题又错了，墓碑要撤掉');
  assert(/清空已订正/.test(src) && /data-mclear="fixed"/.test(src), '错题本上要有清理入口');
});

console.log('问 AI 的站点');
test('AI 站点可换，非法网址不保存', () => {
  const r = run(`(function(){
    state.settings = { currentWeek: 1 };
    return {
      def: aiHelperUrl(),
      defName: aiSiteName(),
      okSave: setAiSite('https://kimi.moonshot.cn/'),
      after: aiHelperUrl(),
      afterName: aiSiteName(),
      bad: setAiSite('javascript:alert(1)'),
      stillAfter: aiHelperUrl(),
      reset: setAiSite(''),
      back: aiHelperUrl()
    };
  })()`);
  assert.strictEqual(r.def, 'https://chat.deepseek.com/', '默认还是 DeepSeek');
  assert.strictEqual(r.okSave, true);
  assert.strictEqual(r.after, 'https://kimi.moonshot.cn/');
  assert.strictEqual(r.afterName, 'Kimi', '下拉里认识的站点要给中文/品牌名');
  assert.strictEqual(r.bad, false, '不是 http(s) 的网址要拒绝，别把用户带到 javascript: 上');
  assert.strictEqual(r.stillAfter, 'https://kimi.moonshot.cn/', '拒绝时不能把已保存的改掉');
  assert.strictEqual(r.back, 'https://chat.deepseek.com/', '留空就是回默认');
  assert(/id="aiSiteSelect"/.test(fs.readFileSync(HTML, 'utf8')), '统计页要有站点选择器');
});

console.log('每句翻译开关');
test('每句都有独立的翻译按钮，默认收起、互不影响', () => {
  const r = run(`(function(){
    var lesson = allLessons()[0];
    var html = renderParaBlocks(lesson, lesson.textZh);
    return {
      boxes: (html.match(/data-trans-box=/g) || []).length,
      btns: (html.match(/data-trans-toggle="/g) || []).length,
      hidden: (html.match(/class="para-trans hidden" data-trans-box/g) || []).length,
      visible: (html.match(/class="para-trans" data-trans-box/g) || []).length,
      labels: (html.match(/data-trans-toggle="[0-9]+" aria-expanded="false" type="button">翻译</g) || []).length,
      paras: lesson.text.filter(function(p){ return !!p; }).length
    };
  })()`);
  assert.strictEqual(r.btns, r.paras, '每段都要有翻译按钮');
  assert.strictEqual(r.boxes, r.paras, '每段都要有可切换的译文框');
  assert.strictEqual(r.visible, 0, '默认全部收起，不该一进来就铺满中文');
  assert.strictEqual(r.hidden, r.paras);
  assert.strictEqual(r.labels, r.paras, '收起时按钮写「翻译」');
  assert(/let transState = \{ open:\{\} \};/.test(src), '单句展开状态要独立于 learnState');
  assert(/learnState\.showTrans \|\| transState\.open\[i\]/.test(src), '全局显示翻译与单句开关取或');
});

console.log('语法解读');
test('语法解读认得从句与时态，最多 4 条，简单句不硬凑', () => {
  const r = run(
    "(function(){ var t = grammarTags('The book that I bought yesterday has been read by many students.'); var plain = grammarTags('I like apples.'); var html = grammarHtml('The book that I bought yesterday has been read by many students.'); return { n: t.length, tags: t.map(function(x){ return x.t; }), plain: plain.length, html: html }; })()"
  );
  assert(r.n >= 2, '复杂句应命中至少两种结构，实际：' + r.tags.join('、'));
  assert(r.n <= 4, '标签最多 4 条，多了只是噪音');
  assert(
    r.tags.some((t) => /从句|被动|完成/.test(t)),
    '应命中从句/被动/完成时之一：' + r.tags.join('、')
  );
  assert.strictEqual(r.plain, 0, '简单句不该被硬凑出标签');
  assert(/gm-note/.test(r.html), '要标明是关键词自动匹配，不是逐词标注');
  assert(/gm-list/.test(r.html), '命中的结构要列出来');
});

test('语法默认收起，展开状态独立于 learnState', () => {
  const r = run(
    "(function(){ grammarState = { all:false, open:{} }; var lesson = { text:['I like apples.'], textZh:{}, chunks:[], progress:{} }; var closed = renderParaBlocks(lesson, {}); grammarState.open[0] = true; var opened = renderParaBlocks(lesson, {}); grammarState = { all:false, open:{} }; return { closed: closed, opened: opened }; })()"
  );
  assert(/data-grammar-box="0" hidden/.test(r.closed), '默认应收起，否则一篇长文会被语法撑爆');
  assert(/data-grammar="0"/.test(r.closed), '每句都要有展开按钮');
  assert(!/data-grammar-box="0" hidden/.test(r.opened), '展开后不该再 hidden');
  assert(/let grammarState = \{ all:false, open:\{\} \};/.test(src), '展开状态要独立保存：learnState 有几处被整体重写');
  assert(/id="btnToggleGrammar"/.test(src), '卡片头要有「全部语法」一键开关');
});

console.log('全站框选与译文缓存');
test('框选翻译覆盖全站，不再只认正文 .para', () => {
  const html = fs.readFileSync(HTML, 'utf8');
  assert(/id="selBar"/.test(html), 'HTML 里要有译文条的容器');
  assert(/function bindGlobalSelection\(/.test(src), '应改为在 document 上统一监听');
  assert(/^\s*bindGlobalSelection\(\);$/m.test(src), '要真的在 init 里绑上');
  assert(!/bindSelectToAdd/.test(src), '逐个 .para 绑定的旧实现应已删除');
  assert(/closest\('#selPopup, #selBar'\)/.test(src), '点在弹层里不能当成新选区，否则点按钮就闪没');
  assert(/function showSelBar\(/.test(src) && /function hideSelBar\(/.test(src));
  assert(/showSelPopup\(rect, text, contextText \|\| text, null, \{/.test(src), '非正文选中时不该假装属于某篇文章');
});

test('选区里粘上的句子序号、题号与朗读图标会被洗掉', () => {
  const r = run(`(function(){
    function fake(badgeText){
      var badge = badgeText === null ? null : { textContent: badgeText };
      return { closest: function(sel){
        if (sel !== '.para') return null;
        return { querySelector: function(s){ return s === '.sent-idx' ? badge : null; } };
      } };
    }
    function fakeQuiz(){
      return { closest: function(sel){ return sel === '.quiz-q, .opt' ? {} : null; } };
    }
    return {
      full: cleanSelectionText('3Every morning I wake up at seven.🔊', fake('3')),
      mid: cleanSelectionText('wake up at seven.🔊', fake('3')),
      year: cleanSelectionText('2024 was a strange year.', fake('2024')),
      plain: cleanSelectionText('  hello   world  ', null),
      quizQ: cleanSelectionText('1. What does the writer make?', fakeQuiz()),
      quizOpt: cleanSelectionText('B. Eggs and toast', fakeQuiz())
    };
  })()`);
  assert.strictEqual(
    r.full,
    'Every morning I wake up at seven.',
    '整段选中会把序号和 🔊 一起带上，送去翻译就是「3每早…」'
  );
  assert.strictEqual(r.mid, 'wake up at seven.', '从句子中间开始选时本来就没有序号，不该乱剥');
  assert.strictEqual(r.year, '2024 was a strange year.', '正文自己以数字开头时不能当序号剥掉');
  assert.strictEqual(r.plain, 'hello world', '普通选区只做空白归一');
  assert.strictEqual(r.quizQ, 'What does the writer make?', '题干前的「1.」不该跟着去翻译');
  assert.strictEqual(r.quizOpt, 'Eggs and toast', '选项前的「B.」同理');
});

test('译文缓存：迁移带过去、云同步取并集、命中就不联网', () => {
  const r = run(
    "(function(){ var migrated = migrate({ version: 4, trCache: { hello: '你好' } }); var L = defaultState(); L.trCache = { a: '1' }; var R = defaultState(); R.trCache = { b: '2' }; var merged = mergeStates(L, R); trCacheSet('world', '世界'); return { migrated: migrated.trCache.hello, keys: Object.keys(merged.trCache).sort().join(','), got: trCacheGet('world') }; })()"
  );
  assert.strictEqual(r.migrated, '你好', '旧数据里的翻译缓存不能在迁移时丢掉');
  assert.strictEqual(r.keys, 'a,b', '两端的缓存要合并，不能本机覆盖云端');
  assert.strictEqual(r.got, '世界');
  assert(/TR_CACHE_MAX/.test(src), '缓存要有上限，否则 localStorage 会被撑爆');
});

console.log('译文缓存分键存放');
test('缓存落在自己的键里，笔记键不再背着它', () => {
  const r = run(`(function(){
    localStorage.clear();
    state = defaultState();
    trCacheSet('hello', '你好');
    writeStateNow();
    var smallNotes = localStorage.getItem(STORE_KEY).length;
    /* 再塞一条 5000 字符的缓存：笔记键的大小不该跟着变 */
    trCacheSet('big', new Array(5000).join('y'));
    writeStateNow();
    var notes = JSON.parse(localStorage.getItem(STORE_KEY));
    var cache = JSON.parse(localStorage.getItem(CACHE_KEY));
    return {
      notesHasCache: Object.prototype.hasOwnProperty.call(notes, 'trCache'),
      cacheHasIt: cache && cache.hello,
      notesFlat: localStorage.getItem(STORE_KEY).length === smallNotes,
      reloaded: loadState().trCache.hello
    };
  })()`);
  assert.strictEqual(r.notesHasCache, false, '笔记键里不该再有 trCache，否则每次落盘都要序列化整份缓存');
  assert.strictEqual(r.cacheHasIt, '你好', '缓存要落在自己的键里');
  assert.strictEqual(r.notesFlat, true, '缓存长得再大，笔记键的大小都不该变');
  assert.strictEqual(r.reloaded, '你好', '读盘时缓存要并回内存里的 state.trCache');
});

test('老数据里内联的缓存能迁出来；缓存写失败不能连累笔记', () => {
  const r = run(`(function(){
    localStorage.clear();
    /* 0.7.1 的形状：缓存内联在笔记键里 */
    localStorage.setItem(STORE_KEY, JSON.stringify({
      version: 5, chunks: [{ id: 'c1', chunk: 'take off' }], trCache: { hello: '你好' }
    }));
    var st = loadState();
    var loaded = st.trCache.hello;
    state = st;
    trCacheSet('world', '世界');
    /* 模拟配额满：只让缓存键写失败，笔记键照常 */
    var orig = localStorage.setItem;
    localStorage.setItem = function(k, v){
      if (k === CACHE_KEY){ var e = new Error('QuotaExceededError'); e.name = 'QuotaExceededError'; throw e; }
      return orig(k, v);
    };
    writeStateNow();
    var raw = localStorage.getItem(STORE_KEY);
    localStorage.setItem = orig;
    return { loaded: loaded, notesChunks: raw ? JSON.parse(raw).chunks.length : -1, ok: storageOK };
  })()`);
  assert.strictEqual(r.loaded, '你好', '旧版内联的缓存读盘时要并回 state.trCache，不能丢');
  assert.strictEqual(r.notesChunks, 1, '缓存写失败时笔记仍要写进去——这是分键的意义');
  assert.strictEqual(r.ok, true, '别因为缓存写失败就把 storageOK 打成 false');
});

test('缓存超预算时从最老的开始删，不整块丢掉', () => {
  const r = run(`(function(){
    localStorage.clear();
    state = defaultState();
    for (var i = 0; i < 5000; i++) state.trCache['k' + i] = new Array(300).join('x');
    writeStateNow();
    var cache = JSON.parse(localStorage.getItem(CACHE_KEY)) || {};
    var keys = Object.keys(cache);
    var total = 0;
    keys.forEach(function(k){ total += k.length + cache[k].length; });
    return { n: keys.length, total: total, hasNewest: !!cache.k4999, hasOldest: !!cache.k0 };
  })()`);
  assert(r.total <= 1200000, '落盘的缓存体积要在预算内，实际 ' + r.total);
  assert.strictEqual(r.hasNewest, true, '最新的要留着');
  assert.strictEqual(r.hasOldest, false, '最老的先被淘汰');
  assert(r.n > 100, '只删超出预算的那部分，不是整块丢掉，实际剩 ' + r.n + ' 条');
});

/* 合并函数最容易出的不是「合错了」，而是「合完再合又变了」：两台设备各推一次，
   云端值来回翻，用户看到词块的意思在闪。下面这组断言把代数性质钉住，
   同时也是「宁可多留一条，也不悄悄删笔记」这条原则的可执行版本。 */
test('mergeStates 的代数性质：幂等、交换、结合、吸收', () => {
  run(`(function(){
    function mk(over){ return migrate(Object.assign({ version: 5 }, over)); }
    function sortById(list){
      return (Array.isArray(list) ? list : []).slice()
        .sort(function(x, y){ return String(x && x.id).localeCompare(String(y && y.id)); });
    }
    /* 顺序不算（chunks/customLessons 的先后是显示顺序，不是数据）；settings 也不算，
       它按设计「以本机为准」，交换之后必然不同。其余字段一律参与比较。 */
    globalThis._canon = function(s){
      return stableStringify({
        chunks: sortById(s.chunks), lessons: sortById(s.customLessons), trash: sortById(s.trash),
        progress: s.progress, logs: s.logs, lessonEdits: s.lessonEdits, mistakes: s.mistakes,
        trCache: s.trCache, deletedLessons: s.deletedLessons, deletedMistakes: s.deletedMistakes,
        streak: s.streak, lastActive: s.lastActive
      });
    };
    globalThis._a = mk({
      chunks: [
        { id: 'c1', chunk: 'take off', added: '2026-01-02', stage: 2 },
        { id: 'c2', chunk: 'run out', meaning: '本机写法', added: '2026-01-01' }
      ],
      logs: { '2026-01-01': { inputDone: true, reviewed: 1 }, '2026-01-02': { outputDone: true, reviewed: 3 } },
      streak: 3, lastActive: '2026-01-02', settings: { currentWeek: 2 },
      progress: { A: { quiz: { 0: 1 }, cloze: { 2: 1 } } },
      lessonEdits: { A: { chunkMeaning: { 'take off': '起飞' } } },
      customLessons: [{ id: 'L1', title: '一', text: ['Hello there.'], textZh: ['你好。'] }],
      mistakes: { 'A|take off': { wrong: 2, fixed: false, at: '2026-01-02' } },
      trCache: { hello: '你好' }
    });
    globalThis._b = mk({
      chunks: [
        { id: 'c1', chunk: 'take off', added: '2026-01-02', stage: 5, mastered: true },
        { id: 'c2', chunk: 'run out', meaning: '云端写法', added: '2026-01-01' },
        { id: 'c3', chunk: 'give up', added: '2026-01-03' }
      ],
      logs: { '2026-01-02': { inputDone: true, reviewed: 9 } },
      streak: 1, lastActive: '2026-01-03', settings: { currentWeek: 3 },
      progress: { A: { quiz: { 1: 1 } }, B: { quiz: { 0: 1 } } },
      mistakes: { 'A|take off': { wrong: 5, fixed: true, at: '2026-01-03' } },
      trCache: { world: '世界' },
      trash: [{ id: 'c4', chunk: 'drop by' }]
    });
    /* c 里有 c4（已被 b 的 trash 判死）与 L1（被 c 的 deletedLessons 判死）：
       结合律测试要跨过墓碑，才能证明「删掉的东西不会从更深一层合并里复活」。 */
    globalThis._c = mk({
      chunks: [{ id: 'c4', chunk: 'drop by', added: '2026-01-04' }, { id: 'c5', chunk: 'look after' }],
      deletedLessons: { L1: 1 }, trCache: { other: '别的' }
    });
    return true;
  })()`);

  /* 幂等要对着「合并自己的输出」比，而不是对着原始 state：mergeStates 会顺手把
     logs / progress / lessonEdits 补成规范形状（outputDone:false、clozeRes:{} 这类），
     第一次合并本来就该改形状，之后就不该再动。 */
  const idem = run('({ once: _canon(mergeStates(_a, _a)), twice: _canon(mergeStates(mergeStates(_a, _a), _a)) })');
  assert.strictEqual(idem.twice, idem.once, '幂等：合并过一遍之后再合一遍，结果必须一样');

  const comm = run('({ ab: _canon(mergeStates(_a, _b)), ba: _canon(mergeStates(_b, _a)) })');
  assert.strictEqual(comm.ab, comm.ba, '交换律：谁先发起同步，合并结果必须一样，否则云端会来回翻');

  const assoc = run(
    '({ left: _canon(mergeStates(mergeStates(_a, _b), _c)), right: _canon(mergeStates(_a, mergeStates(_b, _c))) })'
  );
  assert.strictEqual(assoc.left, assoc.right, '结合律：三次同步分两两合并的顺序不该影响结果');

  const absorb = run('({ first: _canon(mergeStates(_a, _b)), again: _canon(mergeStates(mergeStates(_a, _b), _b)) })');
  assert.strictEqual(absorb.again, absorb.first, '吸收律：合并完再合一遍云端，结果不该再变（防来回弹）');

  const tombs = run(`(function(){
    var m = mergeStates(_b, _c);
    return {
      hasC4: m.chunks.some(function(c){ return c.id === 'c4'; }),
      hasL1: m.customLessons.some(function(l){ return l.id === 'L1'; }),
      hasC5: m.chunks.some(function(c){ return c.id === 'c5'; })
    };
  })()`);
  assert.strictEqual(tombs.hasC4, false, '被 trash 删掉的词块不能从另一端的合并里复活');
  assert.strictEqual(tombs.hasL1, false, '被 deletedLessons 删掉的文章同理');
  assert.strictEqual(tombs.hasC5, true, '但没被删的必须留下——「宁可多留一条，也不悄悄删笔记」');

  const settings = run(
    '({ localA: mergeStates(_a, _b).settings.currentWeek, localB: mergeStates(_b, _a).settings.currentWeek })'
  );
  assert.strictEqual(settings.localA, 2, '设置以本机为准：第一个参数是本机');
  assert.strictEqual(settings.localB, 3, '反过来也以「本机」为准，这是设计，不是 bug');
});

test('解析里的中文只出现一次，不再整块重复', () => {
  const r = run(
    "(function(){ var lesson = allLessons()[0]; var q = lesson.quiz[0]; var html = buildQuizExplain(q, lesson, 0); var cloze = clozeResHtml({ before:'I', answer:'like', after:'apples.' }, true, { chunks: [] }, 0); return { html: html, cloze: cloze, zhCount: (html.match(/鸡蛋和吐司/g) || []).length }; })()"
  );
  assert(!/zh-text|data-quiz-zh/.test(r.html), '那块「中文」重复区整块去掉，别再长回来');
  assert(!/原文：/.test(r.html), '「原文：」前缀必须剥掉，否则界面上凭空多出两个字');
  assert.strictEqual(r.zhCount, 1, '同一句中文一屏里只该出现一次，实际 ' + r.zhCount + ' 次');
  assert(/data-qai="0"/.test(r.html), '想细讲就交给 AI，而不是再翻译一遍');
  assert(/data-cloze-zh="0"/.test(r.cloze), '填空题的句意仍要保留');
});

console.log('错题回原文与 AI 追问');
test('原句能对回正文的那一段，直接借它的中文', () => {
  const r = run(`(function(){
    var lesson = allLessons()[0];
    var sent = 'Then I make breakfast — usually eggs and toast.';
    var hit = locateSentence(lesson, sent);
    var zh = zhForSentence(lesson, sent);
    var miss = locateSentence(lesson, 'This sentence appears nowhere in the article.');
    return { para: hit && hit.para, sent: hit && hit.sent, zh: zh && zh.zh, scope: zh && zh.scope, miss: miss };
  })()`);
  assert.strictEqual(r.para, 0, '这句在第一段，对错段就会跳错地方');
  assert.strictEqual(r.sent, 3, '同段里是第 4 句');
  assert.strictEqual(r.scope, 'sentence', '中英句子数相等时取同一句，比整段译文准');
  assert(/鸡蛋和吐司/.test(r.zh), '应拿到正文那段的现成中文：' + r.zh);
  assert.strictEqual(r.miss, null, '正文里没有的句子要老实返回 null，不能随便指一段');
});

test('解析里的原句中文不用再点按钮', () => {
  const r = run(`(function(){
    var lesson = allLessons()[0];
    return buildQuizExplain(lesson.quiz[0], lesson, 0);
  })()`);
  assert(/然后我做早餐/.test(r), '正文里有这句的中文，就该直接显示：' + r.slice(0, 200));
  assert(!/原文：/.test(r), '「原文：」前缀不能漏到界面上');
});

test('解析不联网：答了才渲染，渲染完就带中文', () => {
  const r = run(`(function(){
    var lesson = allLessons()[0];
    var none = renderQuizItems(lesson, {});
    var one = renderQuizItems(lesson, { 0: 0 });
    return { noneExplain: /quiz-explain/.test(none), oneExplain: /quiz-explain/.test(one), oneZh: /鸡蛋和吐司/.test(one) };
  })()`);
  assert.strictEqual(r.noneExplain, false, '没答的题不展开解析，进详情页也就不发任何翻译请求');
  assert.strictEqual(r.oneExplain, true);
  assert.strictEqual(r.oneZh, true, '答完立刻有中文（来自正文译文），不靠联网');
});

test('错题卡标题就是回原文的入口，AI 追问带全上下文', () => {
  const r = run(`(function(){
    state = defaultState();
    var lesson = allLessons()[0];
    var q = lesson.quiz[0];
    recordMistake(lesson, 'quiz', 0, { q: q.q, options: q.options, answer: q.answer, my: 0 });
    var m = getMistakes()[0];
    return { card: mistakeCardHtml(m), prompt: buildMistakeAiPrompt(m), sent: mistakeSentence(m) };
  })()`);
  assert(/<button class="mistake-src"[^>]*data-mopen="/.test(r.card), '标题要能点，底部那个按钮才撤得掉');
  assert(!/打开原文/.test(r.card), '「打开原文」按钮应该已经撤掉');
  assert(/data-mai="/.test(r.card), '每道错题要能一键交给 AI');
  assert(/usually eggs and toast/.test(r.sent), '错题要能还原出原句：' + r.sent);
  assert(
    /【原句】/.test(r.prompt) && /【正确答案】/.test(r.prompt) && /【我选的】/.test(r.prompt),
    '提示词要带题干、我的答案与正确答案'
  );
  assert(/鸡蛋和吐司/.test(r.prompt), '还要带出事那段的中文参考，AI 才不用猜');
  assert(/AI_HELPER_URL/.test(src), '打开哪个 AI 站点应是一个可改的常量');
});

test('错题标题直接回原文顶部，不再做段落定位', () => {
  const markup = fs.readFileSync(HTML, 'utf8');
  assert(/window\.openLesson = function\(id\)\{/.test(src), 'openLesson 不该再有 opts 参数');
  assert(!/scrollToPara/.test(src), '段落定位已撤掉，留着就是死代码');
  assert(!/data-sent=/.test(src), '不再需要段落下标锚点');
  assert(!/paraFlash/.test(markup), '闪烁提示也一并去掉');
});

test('翻译与语法都能交给 AI 讲', () => {
  const r = run(`(function(){
    var lesson = allLessons()[0];
    var sent = 'The book that I bought yesterday has been read by many students.';
    var prompt = buildSentenceAiPrompt({ title: lesson.title, sentence: sent, zh: '我昨天买的那本书已经被很多学生读过了。', tags: grammarTags(sent).map(function(t){ return t.t; }) });
    var blocks = renderParaBlocks(lesson, lesson.textZh);
    return { prompt: prompt, hasGai: /data-gai="0"/.test(blocks), gaiCount: (blocks.match(/data-gai=/g) || []).length, paras: lesson.text.filter(function(p){ return !!p; }).length };
  })()`);
  assert(/【句子】/.test(r.prompt) && /【参考译文】/.test(r.prompt), '提示词带上句子与现成译文，AI 不用再翻一遍');
  assert(/【这句里的语法点】/.test(r.prompt), '本地命中的语法点要一起给，AI 才讲得准');
  assert(/划分结构/.test(r.prompt), '要明确让它拆句子结构');
  assert.strictEqual(r.hasGai, true, '正文每句的语法框里要有「问 AI」');
  assert.strictEqual(r.gaiCount, r.paras, '每段都得有入口，实际 ' + r.gaiCount + '/' + r.paras);
});

console.log('落盘与缓存版本');
test('落盘合并：即时的写立刻落盘，窗口内的改动合并成一次尾写', () => {
  const r = run(`(function(){
    state = defaultState();
    lastSaveAt = 0;                        // 假装上次落盘很久以前
    saveState();
    const first = !!localStorage.getItem(STORE_KEY);
    state.chunks.push({ id: 'zz-test', chunk: 'x', meaning: 'y' });
    saveState();                            // 250ms 窗口内 → 排队，不立刻写
    const merged = JSON.parse(localStorage.getItem(STORE_KEY)).chunks.some(c => c.id === 'zz-test');
    flushSave();                            // 离开页面前补最后一下
    const flushed = JSON.parse(localStorage.getItem(STORE_KEY)).chunks.some(c => c.id === 'zz-test');
    state = defaultState(); flushSave();
    return { first, merged, flushed };
  })()`);
  assert.strictEqual(r.first, true, '常规操作必须立刻可见，不能被合并窗口拖住');
  assert.strictEqual(r.merged, false, '窗口内的连续改动应合并，而不是每次同步整盘写');
  assert.strictEqual(r.flushed, true, 'flushSave 必须把排队中的改动落盘');
});

test('页面隐藏 / 关闭前会补落盘', () => {
  assert(/document\.addEventListener\('visibilitychange'/.test(src));
  assert(/window\.addEventListener\('pagehide', flushSave\)/.test(src));
  assert(/window\.addEventListener\('beforeunload', flushSave\)/.test(src));
});

test('sw.js 的缓存版本由资源内容决定，不手写', () => {
  const sw = fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8');
  const m = sw.match(/const CACHE_VERSION = '([^']*)';/);
  assert(m, 'sw.js 里应有 CACHE_VERSION');
  assert(!/^v\d+$/.test(m[1]), '不应再是手写的 v1 / v2 这种版本号');
  assert(/CACHE_VERSION/.test(sw) && /\.\/app\.js/.test(sw), '脚本应进预缓存，否则首次离线打开点不动');
  const stamp = fs.readFileSync(path.join(ROOT, 'tools', 'stamp-sw.js'), 'utf8');
  assert(/'app\.js'/.test(stamp) && /'pwa\.js'/.test(stamp), '指纹应覆盖页面脚本');
});

test('详情页拆分后 renderLessonDetail 只做编排', () => {
  for (const fn of [
    'renderParaBlocks',
    'renderChunkRows',
    'renderQuizItems',
    'renderClozeItems',
    'lessonDetailHtml',
    'bindLessonDetailEvents'
  ]) {
    assert(new RegExp('function ' + fn + '\\(').test(src), '缺少 ' + fn);
  }
  const body = src.slice(src.indexOf('function renderLessonDetail(lesson){'));
  const len = body.slice(0, body.indexOf('\n}')).split('\n').length;
  assert(len < 40, 'renderLessonDetail 又长回去了：' + len + ' 行');
});

test('免安装版的启动脚本指向真正的 exe', () => {
  const dir = path.join(ROOT, 'electron', 'portable');
  const bats = fs.readdirSync(dir).filter((f) => f.toLowerCase().endsWith('.bat'));
  assert(bats.length >= 1, 'electron/portable 下应有 .bat 启动脚本');
  for (const name of bats) {
    const body = fs.readFileSync(path.join(dir, name), 'utf8');
    // electron-builder 会把 exe 改名成 productName，写死 electron.exe 的话双击 bat 必然找不到文件
    assert(/EcChunks\.exe/.test(body), name + ' 应调用 EcChunks.exe');
    assert(!/electron\.exe/.test(body), name + ' 不该再调用 electron.exe');
    assert(/-\-no-sandbox/.test(body), name + ' 要带兜底参数');
    // cmd 只认 CRLF，LF 结尾的 bat 会静默错行
    assert(!/[^\r]\n/.test(body), name + ' 必须是 CRLF 行尾');
    assert(body.split('@echo off').length === 2, name + ' 里 @echo off 只该出现一次');
  }
});

test('免安装 zip 由脚本生成，不再手工打包', () => {
  const build = fs.readFileSync(path.join(ROOT, 'tools', 'build-portable.js'), 'utf8');
  assert(/win-unpacked/.test(build), '应基于 dist/win-unpacked 打包');
  assert(/electron', 'portable'/.test(build), '启动脚本应从 electron/portable 取');
  assert(/CreateEntryFromFile/.test(build), '应流式写 zip，不把 250MB 的 exe 全读进内存');
  const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
  assert(pkg.scripts['dist:portable'], 'package.json 里要注册 dist:portable');
  assert(/build-portable\.js/.test(pkg.scripts.dist), 'npm run dist 应顺带产出免安装 zip');
});

test('网页版预览走 http：离线词典才拿得到，Service Worker 不让它挡缓存', () => {
  const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
  assert.strictEqual(pkg.scripts.preview, 'node tools/preview.js', 'package.json 里要注册 preview');
  const src = fs.readFileSync(path.join(ROOT, 'tools', 'preview.js'), 'utf8');
  assert.ok(/pathname === '\/sw\.js'/.test(src), '预览时要把 sw.js 换成空文件，否则旧缓存挡住改动');
  assert.ok(/EADDRINUSE/.test(src), '端口被占要顺延，不能直接退出');
  assert.ok(/startsWith\(ROOT \+ path\.sep\)/.test(src), '只服务工作区里的文件，拼出去的要挡掉');
  assert.ok(/data\/dict\.json/.test(src), '脚本注释里要说清它解决了什么：file:// 下 fetch 读不到词典');
});

test('双击打开时提示「离线词典要用桌面版」，点掉之后不再烦', () => {
  const tip = makeEl();
  tip.hidden = true;
  const btn = makeEl();
  const fileApp = loadApp({ protocol: 'file:', els: { fileTip: tip, btnFileTipClose: btn } });
  assert.strictEqual(fileApp.run('offlineDataBlocked()'), true, 'file:// 要认出来');
  fileApp.run('loadOfflineData()');
  assert.strictEqual(tip.hidden, false, 'file:// 下要显示出提示条');
  btn.onclick();
  assert.strictEqual(tip.hidden, true, '点「知道了」要收起');
  assert.strictEqual(fileApp.store.get('ecChunksFileTipOff'), '1', '关过要记住，别每次开都弹');
  tip.hidden = true;
  fileApp.run('showOfflineTip()');
  assert.strictEqual(tip.hidden, true, '记住之后就不再显示');
  const httpApp = loadApp();
  assert.strictEqual(httpApp.run('offlineDataBlocked()'), false, 'http 下词典能加载，不该提示');
  const html = fs.readFileSync(HTML, 'utf8');
  assert(/id="fileTip"[^>]*hidden/.test(html), '提示条默认要藏着，靠 script 打开');
  assert(/id="btnFileTipClose"/.test(html), '要有收起按钮');
});

test('手工重打 app.asar 的文件清单与 build.files 对齐', () => {
  const script = fs.readFileSync(path.join(ROOT, 'tools', 'repack-unpacked.js'), 'utf8');
  const ONLY_JSON_RE = /ONLY_JSON = new Set\(\['data'\]\)/;
  const m = script.match(/const ITEMS = \[([\s\S]*?)\];/);
  assert.ok(m, 'repack-unpacked.js 里要有 ITEMS 清单');
  const items = (m[1].match(/'[^']+'/g) || []).map((s) => s.slice(1, -1));
  const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
  const files = pkg.build.files;
  for (const f of files) {
    if (f === 'electron/**/*') {
      assert.ok(items.includes('electron'), 'electron/ 必须一起打进 asar');
      continue;
    }
    if (f.startsWith('data/')) {
      // data/ 下的离线词典与词形表要带上，但只能带 *.json：同目录还放着 ecdict.csv（65MB）这类
      // 原始数据，整个目录搬进去 app.asar 会从 1MB 涨到 69MB，安装包白胖 70MB
      const dir = f.split('/')[0];
      assert.ok(items.includes(dir), 'ITEMS 里缺 ' + dir + '，装完就没有离线释义了');
      assert.ok(fs.existsSync(path.join(ROOT, dir)), dir + '/ 目录要存在');
      assert.ok(ONLY_JSON_RE.test(script), 'repack 的 data/ 要按 *.json 过滤');
      continue;
    }
    if (f.includes('*')) {
      // '*.html' / '*.js' 这类通配：仓库根目录下命中的真实文件都要在 ITEMS 里
      const re = new RegExp('^' + f.replace(/\./g, '\\.').replace(/\*/g, '.*') + '$');
      const hit = fs.readdirSync(ROOT).filter((n) => re.test(n));
      assert.ok(hit.length > 0, f + ' 应该能命中真实文件');
      for (const n of hit) assert.ok(items.includes(n), 'ITEMS 里缺 ' + n + '，装完会白页');
      continue;
    }
    assert.ok(items.includes(f), 'ITEMS 里缺 ' + f);
  }
});

console.log('\n' + passed + ' 个用例通过' + (process.exitCode ? '，有失败' : ''));
process.exit(process.exitCode || 0);
