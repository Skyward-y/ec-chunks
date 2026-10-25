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

function loadApp() {
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
    getElementById() {
      return makeEl();
    },
    querySelector() {
      return makeEl();
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
    location: { href: 'http://localhost/', origin: 'http://localhost' },
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
test('提示词带上难度、主题和词块本里还没掌握的表达式', () => {
  const r = run(`(function(){
    state = defaultState();
    state.chunks = [
      normalizeChunk({ chunk: 'take off', meaning: '起飞' }),
      normalizeChunk({ chunk: 'catch up', meaning: '赶上' }),
      normalizeChunk({ chunk: 'old one', meaning: '老词块', mastered: true })
    ];
    return buildAiPrompt();
  })()`);
  assert.ok(r.includes('中级'), '要写清难度');
  assert.ok(r.includes('日常生活'), '没填主题就用默认主题');
  assert.ok(r.includes('take off') && r.includes('catch up'), '要把待掌握的表达交给 AI');
  assert.ok(!r.includes('old one'), '已掌握的不要再塞进去');
  assert.ok(r.includes('【英文】') && r.includes('【中文】'), '要给逐句输出的格式约定');
});

test('提示词与复制按钮都走 app.js，HTML 里没有内联事件', () => {
  const html = fs.readFileSync(HTML, 'utf8');
  assert.ok(/id="page-mistakes"/.test(html), '错题本要是独立页面');
  assert.ok(/data-page="mistakes"/.test(html), '要有 tab 入口');
  assert.ok(/id="mistakeBody"/.test(html) && /id="mistakeChips"/.test(html));
  assert.ok(/id="aPrompt"/.test(html) && /id="btnCopyPrompt"/.test(html), '文章弹窗里要有提示词框和复制按钮');
  assert.ok(/bindMistakeEvents\(\);/.test(src), '错题本事件要在 init 里绑定');
  assert.ok(/#mistakeChips/.test(src) && /#btnCopyPrompt/.test(src));
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
  assert(/data-cloze-check=/.test(src) && /function judgeCloze\(i\)/.test(src), '判定要抽成一个函数，逐题与全部检查共用同一套规则');
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

console.log('题目中文');
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

console.log('\n' + passed + ' 个用例通过' + (process.exitCode ? '，有失败' : ''));
process.exit(process.exitCode || 0);
