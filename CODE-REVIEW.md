# ec-chunks 代码质量评审（只评估，未改动任何源码）

> **处理状态（评审之后追加）**：本报告的四档结论已按用户的指令分三轮落地 —— P0 提交 `776d86d`（18 files, +2505/−125）、P1 提交 `3098b3d`（5 files, +402/−53）、P2 提交 `6edf1a0`（5 files, +252/−33）。最后一轮讨论的两个可选项（拆多模块、引入 Playwright）经复核后**决定都不做**，理由与复核数据见 P2 的「明确不做的两项」与「取舍复核」。
>
> *P0*
> - P0-1（站外导航同源判定）：`electron/main.js` 新增 `isSameOrigin(url, base)`，`will-navigate` 改用 `new URL(url).origin === base`。
> - P0-3（`init()` 容错）：`app.js` 新增 `bind(target, evt, fn)` 与 `bindMisses`，init 里 40+ 处裸绑定全部改走它；新增 `reportUiIssue()` 与 `boot()`，抛错时页面底部显示红条（说明笔记未丢）并留一条 `console.error`。
> - P0-2（提交）：0.7.1 全部改动已入库，含 `tools/build-dict.js`、`tools/build-lemma.js`、`tools/preview.js`。
> - P0-4（data 入库）：`data/dict.json`（2.3MB）、`data/lemma.json`（90KB）已入库；原始 `ecdict.csv` / `lemma.en.txt` 仍由 `.gitignore:35-36` 挡在外面，与 README 第 70 行的说法一致。
> - 配套：`sw.js` 的 `CACHE_VERSION` 重算为 `9672b2a55a`；冒烟用例 81 → 84（新增 init 绑定契约、启动兜底、桩 DOM 跑完 init）；`CHANGELOG.md` 加了「未发布」一节。
>
> *P1*
> - P1-1 / 2.1（存储天花板）：译文缓存搬出笔记键（`CACHE_KEY = 'ecChunksCache_v1'`），笔记键只装笔记；`TR_CACHE_BUDGET = 1200000` 字符预算，超了从最老的删；写失败砍半重试一次、再失败就放弃这一次；老数据内联的缓存读取时自动搬迁（与缓存键取并集）；导出备份不再带缓存。
> - P1-2 / 2.2（沙箱开关）：`electron/main.js` 把五个启动开关收进 `USE_SANDBOX`，`EC_CHUNKS_SANDBOX=1` 可开着沙箱 + 硬件加速启动一次（`webPreferences.sandbox` 同步），启动日志记当前模式。默认仍是关——那台 Win11 26000+ 的崩溃是真实的。
> - P1-3 / 2.3（切句）：规则收敛为 `EN_SENT_RE` / `ZH_SENT_RE` 两个常量，列表版与保留位置版共用；`splitEnSentences` / `splitZhSentences` 退化为薄壳；顺带修「段落以标点开场丢字」「中文省略号被切两半」「末段无标点时整段消失」。带缩写的段落现在能精确对回中文那一句（`zhForSentence` 返回 `scope:'sentence'`）。
> - P1-4 / 2.4（合并性质）：补幂等/交换/结合/吸收四条用例，并因此测出真实 bug——`pickChunk` / `pickLesson` 并列时无条件返回远端那条，破坏交换律；改为按 `stableStringify` 确定性择一。
> - 配套：冒烟用例 84 → 93；`CHANGELOG.md` 未发布一节补了四条。
>
> *P2*
> - P2-1（`isChunkCollected` 线性扫描）：新增 `collectedChunkKeys()`（一次建小写集合），`renderLearnList` 与 `renderChunkRows` 改用它。实测 60 篇 × 12 词块 × 2000 条词块本：144 万次比较 99ms → 2ms；词块页（1 篇 × 8 词块 × 3000 条）端到端 10ms → 8ms、输出逐字相同。用例把 `state.chunks.some` 换成记数桩，钉住两条渲染路径都不再碰它。
> - P2-2（无 CI）：新增 `.github/workflows/check.yml`，Windows runner 上 `npm ci` → 检查 `data/*.json` 在库里 → `npm run check` → `prettier --check .` → `stamp-sw.js --check`。后两步专门拦本仓库真实出过的故障（词典没入库、缓存指纹忘重算）。
> - P2-3（巨型函数）：`init()` 437 行 → 34 行，接线按功能拆成 14 个 `bind*()`（`bindTabs` … `bindLifecycleFlush`），`showPage` 提到顶层；`bind(` 调用仍是 41 处、`addEventListener` 仍是 19 处，属纯搬运。用例钉住「`init()` 不许超过 80 行」「每块都要被调用」。
> - P2-4（空 catch）：读/写云同步配置、排云同步三处改为 `debugLog(环节名, err)`（默认闭嘴，`?debug=1` 或 `ecChunksDebug=1` 才 `console.warn`）。其余空 catch 逐条看过：要么已有注释与降级路径（`writeTrCache` 配额重试、翻译失败写状态行）、要么失败无副作用（`speechSynthesis`、`reportUiIssue` 自身），不改。
> - **明确不做的两项**：①把 5000 多行 `app.js` 拆成多模块——这个仓库没有构建步骤，靠经典 `<script>` 加载多个全局文件只会把「一个文件里搜得到」换成「七个文件里搜」，真正拆模块要先引入打包器，和「零运行时依赖」的取舍冲突；②为 DOM 端到端引入 Playwright/Puppeteer —— 那是一个几百 MB 的 devDependency，而现有「桩 DOM 上跑完 `boot()`」的用例已经能拦住接线类错误（后来复核补充：这条理由只对「接线类错误」成立 —— 划词、剪贴板、SW 注册、Electron 启动四条路径仍无覆盖，见下文「取舍复核」）。`tools/inno-setup/`（7.1MB）保持入库：它让打包能离线完成，挪走会让「克隆下来就能打包」失效。
> - 配套：冒烟用例 93 → 96；`sw.js` 的 `CACHE_VERSION` 重算为 `910977d809`。
>
> *取舍复核（用户问「拆模块 / Playwright 值不值」之后又重新量了一遍）*
> - 支持「不拆」的实测：`app.js` 5401 行里静态语料只占 387 行（7%）；261 个顶层函数的行数中位数只有 **12 行**，超过 100 行的只剩 3 个（`bindLessonDetailEvents` 363 行、`mergeStates` 126 行、`bindArticleForm` 103 行）。也就是说 P2 拆完 `init()` 之后，「大函数全塞在一个文件里」这个立论已经不成立了。
> - 拆模块的真实成本：96 条用例里 **81 处是读 `app.js` 源码做正则断言**（`loadApp()` 用 `fs.readFileSync(APP)` 丢进 `vm` 跑），ESM 没法这样加载；13 个文件点名 `app.js`（`ec-chunks-fixed.html:583`、`eslint.config.js:52`、`package.json:17` 与 `:47`、`sw.js:24`、`tools/repack-unpacked.js:29` 等）；经典 `<script>` 下 85 个顶层声明仍是全局，重复声明会从 SyntaxError 退化成静默覆盖；`no-undef` 对跨文件引用会误报，只能关规则或手写 `/* global */`。顺序敏感只有 2 行（`app.js:1311` 的 `let state = loadState();`、`app.js:4382` 的 `var cloudCfg = loadCloudCfg();`），但会静默炸。
> - e2e 的真实空白（记录在案，暂不补）：桩 DOM 没有 `getSelection` / `createRange` / `navigator.clipboard` / `FileReader`，因此划词弹窗（`app.js:3329`）、复制（`app.js:4006`）、Service Worker 注册（`pwa.js`）、Electron 启动（`-2147483645` 那次）这四条路径**没有任何自动化覆盖**，靠发版前手动点一遍兜底。将来若要补，优先 `playwright-core` + `_electron`（不带浏览器、测的就是发货引擎），而不是全套 Playwright。
>
> 下文保留评审当时的原始结论与行号（行号是改动前的），用于对照。

评审对象：`D:\deepseek-harness\default-workspace`（ec-chunks「语境词块本」v0.7.1）
评审方式：只读勘察 + 实际执行既有校验脚本。**本次没有修改、格式化、重排任何项目文件**，仅在根目录新增本报告（可随时删除）。

---

## 0. 先给结论

这个项目的工程质量**明显高于**同体量的个人项目：零运行时依赖、CSP 收得很紧、Electron 侧有目录穿越防护、数据迁移带版本号、云同步用并集合并而不是覆盖、Service Worker 版本号由内容哈希生成、落盘有 250ms 合并窗口并在三处兜底补写、有 81 个不上浏览器的逻辑测试。这些都不是"顺手写的"，是踩过坑之后补上的。

所以下面的问题**不是"代码烂"**，而是四类：

| 类别 | 一句话 | 风险等级 |
|---|---|---|
| A. 具体边界错误 | `will-navigate` 的同源判定用字符串前缀，可被 `127.0.0.1:53124.evil.com` 绕过；`init()` 无容错，任一元素缺失整页绑定链断掉 | 高（改动小） |
| B. 规模阈值 | `app.js` 5182 行单文件、约 1000 行语料与逻辑混排、440 行 `init()`、363 行 `bindLessonDetailEvents()`、20 个模块级可变变量 | 中（越晚拆越贵） |
| C. 数据层天花板 | localStorage 单键全量写 + 译文缓存上限 3000 条，理论上限与 5MB 配额同一量级 | 中高（用户数据风险） |
| D. 仓库纪律 | `data/*.json` 从未入库却被打包配置和 SW 预缓存依赖；无 CI；版本号与 git 历史漂移 | 高（发布即故障） |

实测基线（好消息，先立住）：

```
node tools/smoke.js        → 81 个用例通过
npx eslint app.js pwa.js redirect.js sw.js electron tools → 0 error 0 warning
npx prettier --check ...   → All matched files use Prettier code style
node v24.21.0 / npm 11.19.0 / git 2.55.0
```

> 环境注记：本机 `ops_bash` 执行器不可用（`CreateFileMapping ... Win32 error 5`），全部命令改用 PowerShell 执行并成功，不影响结论。

---

## 1. P0：建议下一轮就修的三处

### 1.1 `will-navigate` 的同源判定可被绕过（安全，改动 1 行）

`electron/main.js:160` 声明 `let origin = '';`，`electron/main.js:231` 赋值：

```js
origin = `http://127.0.0.1:${port}`;
```

`electron/main.js:288-292` 用它判同源：

```js
win.webContents.on('will-navigate', (e, url) => {
  if (url.startsWith(origin)) return;   // ← 字符串前缀，不是 origin 比较
  e.preventDefault();
  if (/^https?:/i.test(url)) shell.openExternal(url);
});
```

`startsWith` 对下面两种 URL 都返回 `true`，于是导航被放行：

- `http://127.0.0.1:53124.evil.com/` —— 前缀完全匹配，实际 host 是 `127.0.0.1` 的"子域"写法（浏览器会解析成 DNS 名，但字符串前缀成立）
- `http://127.0.0.1:53124@evil.com/` —— userinfo 构造，字符串前缀成立，实际 host 是 `evil.com`

触发路径存在：页面内任何 `location.href = ...`（应用会渲染用户粘贴的文章、AI 生成内容，`innerHTML` 47 处）都会走到这个 handler。一旦放行，窗口就显示站外页面，CSP 与"只在本地壳里跑"的假设同时失效。

**建议**：改成结构化比较

```js
let sameOrigin = false;
try { sameOrigin = new URL(url).origin === origin; } catch {}
if (sameOrigin) return;
```

并顺手补一条注释说明为什么不用字符串前缀（这个坑值得留痕）。

### 1.2 `init()` 没有容错，缺一个元素就整页"半死"

`app.js:4766-4769` 连续四个直接赋值，没有判空：

```js
$('#btnAddToday').onclick  = () => openModal();
$('#btnAddChunks').onclick = () => openModal();
$('#btnGoLearn').onclick   = () => showPage('learn');
$('#btnGoReview').onclick  = () => { reviewState = {...}; showPage('review'); };
```

而同一个 `init()` 里，几十行之后的 `app.js:4809-4810` 是判空的：

```js
const btnCopyPrompt = $('#btnCopyPrompt');
if (btnCopyPrompt) btnCopyPrompt.onclick = async () => {
```

调用点也没有兜底（`app.js:5181-5182`）：

```js
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();
```

后果：改 HTML 时改掉或误删一个 id → `init()` 在第一行抛 `TypeError` → 后面所有事件接线、`renderAll()`、`setInterval` 全部不执行。表现出来就是"页面能打开但按钮全没反应"，而 `console.*` 全文件只有 2 处，用户肉眼拿不到任何线索。

**建议**（不引依赖，约 20 行）：

1. 加一个 `on(id, handler)` 帮助函数，内部判空 + 缺失时记录到数组；把 70 处 `.onclick =` 逐步换成它（可以只换 `init()` 里那批）。
2. `init()` 外层包一层 `try/catch`，catch 里把错误写进页面顶部的红条（而不是只 console），并继续执行剩余不相关的接线。

### 1.3 `data/*.json` 未入库，但打包和离线词典都依赖它

证据：

- `git ls-files data` → **0 条**
- 但 `data/dict.json` 2,377,393 字节、`data/lemma.json` 92,309 字节实际存在于工作区
- `package.json:53` 的 `build.files` 含 `"data/*.json"`
- `sw.js:30-31` 的 `PRE_CACHE` 也列了这两个文件
- `README.md:70` 却声称"精简结果要提交"

后果分三处爆炸：

1. **干净克隆构建**出来的安装包里没有离线词典 → `lookupGloss` / `dictGloss` / `metaSenses` 全部落到兜底分支，词块卡片少了释义。
2. **GitHub Pages 部署**（`README` 里有这套流程）时 SW 的 `PRE_CACHE` 拿到 404。
3. `git status` 里 `data/` 一直是"未跟踪"，任何人 `git clean -xdf` 或换机器都会丢，而这 2.3MB 无法从脚本重新生成（生成要联网抓词表）。

**建议**：二选一并写进 README：要么把 `data/*.json` 提交（2.4MB，可接受），要么把 `README.md:70` 和 `sw.js` 的 `PRE_CACHE` 改成"构建时由 `tools/build-dict.js` 生成，缺失则跳过预缓存"。当前状态是两套说法同时存在，最终一定会在发布时出问题。

---

## 2. P1：数据层与安全余量

### 2.1 localStorage 单键全量写 + 译文缓存，理论上限逼近配额

落盘路径（`app.js:1271-1306`）：

```js
localStorage.setItem(STORE_KEY, JSON.stringify(state));
```

- 只有一个键 `'ecChunksApp_v3'`（`app.js:1174`），每次落盘**序列化整个 state**
- 译文缓存 `TR_CACHE_MAX = 3000`（`app.js:1221`），键截断 400 字符、值截断 600 字符（`app.js:1160`、`app.js:1228`）
- 粗算上限：`3000 × (400 + 600)` ≈ **3MB 字符**，再叠加卡片的 `sentence/meaning/mine` 和自定义文章全文。localStorage 配额通常 5MB/源（按 UTF-16 计字符数）
- 写失败的处理只有一次 toast + `storageOK = false`（`app.js:1284-1290`），之后静默

也就是说：**重度用户读到第 3000 条译文缓存时，笔记可能已经开始写不进去了**，而提示只在第一次失败时出现。加上 250ms 合并窗口意味着每次保存都要在主线程 `JSON.stringify` 一个含 3MB 缓存的对象。

**建议**：

1. 把 `trCache` 从 `state` 里挪出去，单独键（`ecChunks_trCache_v1`）或 IndexedDB。缓存丢了无所谓，笔记丢了是灾难——两者不该共用一个键、共用一次序列化。
2. 落盘前用 `JSON.stringify(state).length` 和配额做比例判断（或在 `QuotaExceededError` 时主动砍掉缓存再重试一次），而不是只 toast。
3. 如果短期不动结构：至少把 `TR_CACHE_MAX` 从 3000 降到 800 并加注释说明测算依据。

### 2.2 全局关沙箱没有开关，CSP 成了唯一防线

`electron/main.js:22-29` 无条件执行：

```js
app.disableHardwareAcceleration();
app.commandLine.appendSwitch('no-sandbox');
app.commandLine.appendSwitch('disable-gpu-sandbox');
app.commandLine.appendSwitch('disable-renderer-sandbox');
app.commandLine.appendSwitch('disable-features', 'RendererCodeIntegrity');
```

配合 `electron/main.js:257-263` 的 `sandbox: false`，理由（Win11 build 26000+ 的 `STATUS_BREAKPOINT(-2147483645)`）是真实的，注释也写清楚了——这点值得肯定。但代价是：**进程沙箱在所有机器、所有版本上都被关掉了**，而渲染层有 47 处 `innerHTML`，转义全靠 119 处手工 `esc()`（`app.js:952`）。只要有一处漏了 `esc()`，此时没有任何一条防线兜底（CSP 只挡住内联脚本和外部脚本，挡不住已注入的 `<img onerror>`——虽然 CSP 的 `script-src 'self'` 会拦内联事件处理器，`'unsafe-inline'` 只在 `style-src` 上，所以这条线其实还行；但**没有进程隔离**这件事本身是零余量）。

**建议**（不改默认体验，只加余量）：

1. 改成"先正常沙箱启动，检测到启动失败再降级重试"：首次启动用默认沙箱，若 3 秒内 `did-fail-load` 或 `render-process-gone` 带 `STATUS_BREAKPOINT`，写一个标记文件到 `app.getPath('userData')`，下次启动才追加那几个 switch。这样老系统拿到完整隔离，新系统自动降级。
2. 或最少加一个环境变量逃生门：`if (!process.env.EC_CHUNKS_SAFE) { ...appendSwitch... }`，让排查问题和安全敏感用户能开。

### 2.3 切句有两套实现、行为不同，而它们要互相"对齐"

| 函数 | 位置 | 处理 `Mr.` / 小数 | 处理句末引号 |
|---|---|---|---|
| `splitEnglishSentences` | `app.js:1050-1055`（先用 `holdSentenceDots` 保护 `SENT_DOT_*`） | ✅ | 未专门处理 |
| `splitEnSentences` | `app.js:2410-2424`（手写字符扫描） | ❌ | ✅ |
| `splitChineseSentences` | `app.js:1057` | —（按 `。！？…`） | — |
| `splitZhSentences` | `app.js:2425`（`(?<=[。！？…])` 后行断言） | — | — |

`app.js:2407` 的注释自己承认了风险：「33 段里 29 段句数完全相等」——也就是**有 4 段不相等**。两条路径分别用于"翻译/对齐"和"错题解析引用原句"（`exampleFor` 在 `app.js:2183-2207`），句数不一致会导致引用的中文句子错位到别的句子。

**建议**：

1. 保留手写扫描版（它处理了句末引号，更接近真实文本），把 `Mr./Mrs./Dr./e.g./U.S.` 缩写表和小数保护合并进去，另一套改成 `trim` + 调用的薄壳。
2. 加一个 smoke 用例：对 `LESSONS` 全部语料断言两条路径切出的句数逐一相等。现有 81 个用例没有覆盖这个不变量。

### 2.4 `mergeStates` 缺性质测试

`app.js:4351-4474` 共 123 行，做并集合并 + 墓碑（`goneLessons/goneChunks/goneMistakes`）+ `chunkScore/pickChunk` 取更熟的一条，注释写明原则「宁可多留一条，也不悄悄删笔记」——原则是对的，但这种函数最容易出的 bug 是**不幂等**（合并两次结果不同，云端会来回弹）或**不交换律**（谁先同步谁赢）。80 个用例里没有针对它的代数性质断言。

**建议**：加 3 个断言——`merge(a,a) === a`、`merge(a,b) === merge(b,a)`、`merge(merge(a,b),c) === merge(a,merge(b,c))`（用构造的 3~4 个 state 即可，不需要真实 Supabase）。

---

## 3. P2：可维护性（规模阈值，越晚拆越贵）

### 3.1 5182 行单文件里混着约 1000 行静态语料

```
LESSONS      app.js:18-283
CHUNK_META   app.js:284-372
WORD_POS_BY  app.js:373
WORD_POS     app.js:379
WORD_SENSES  app.js:396
NUM_WORD     app.js:697
NUM_UNIT_ZH  app.js:703
PLAN         app.js:4247
```

前 ~1000 行是语料，后面 ~4200 行是逻辑。后果不是"文件大"这么抽象，而是具体的：

- 改逻辑时 `Ctrl+F` 命中大量语料文本，`LESSONS` 里出现的英文句子会干扰搜索
- 语料改动和逻辑改动混在同一个 diff 里，review 和 `git blame` 都变糊
- `.prettierignore` 排除了 `app.js`（`.prettierignore:1-15`），理由写在注释里（高密度单行风格，格式化会产生几千行噪音）——这个决定**是合理的**，但它同时也意味着 `app.js` 没有自动格式化的保护

**建议**：不需要引入构建工具。CSP 是 `script-src 'self'`，多文件 `<script src>` 完全被允许。最小动作：把语料抽到 `data/lessons.js`（`const LESSONS = [...]`）单独 `<script>` 引入，`app.js` 从 5182 行降到 ~4200 行，语料可以正常走 prettier。若再进一步，`EC_CHUNKS` 全局命名空间 + 三个 `<script>`（语料 / 领域逻辑 / 渲染）已经够用。

### 3.2 `init()` 440 行、`bindLessonDetailEvents()` 363 行

- `init()`：`app.js:4741` 到 `app.js:5179`，包含所有页面的接线、`setInterval`、`visibilitychange` 兜底
- `bindLessonDetailEvents()`：`app.js:2800-3163`，363 行事件绑定墙

这类函数的真实成本是**读不出来流程**：想知道"点保存按钮发生了什么"，得在一个 440 行的函数里靠 `id` 名字推测。测试也只能靠 DOM 桩间接验证。

**建议**：按页面切成 `bindToday() / bindChunks() / bindLearn() / bindReview() / bindCloud()`，每个 50-80 行，`init()` 变成 10 行调度。纯机械拆分，不改逻辑，风险很低，能立刻改善定位成本。

### 3.3 20 个模块级可变变量 + `state` 无封装

`app.js:1270` 的 `let state = loadState()`，另有 `learnState`（`:1716`）、`grammarState`（`:1719`）、`reviewState`（`:4046`）、`reviewMode`（`:4048`）、`chunkFilter/searchTerm/sortBy/chunkSource`（`:3985`）、`pickedIds`（`:3988`）、`saveSoonTimer`（`:1282`）等，共 20 处模块级 `let`。

问题不在"有全局变量"，而在**"改了 state 之后要不要重渲染、要不要落盘"没有任何约束**：全靠调用者记得手动 `renderAll()` 或 `saveState()`。目前没出 bug 是因为代码量还压得住。

**建议**：引入一个 30 行的 store（`get() / update(fn) / subscribe(fn)`），`update` 内统一触发 `saveState()` + 标脏，`renderAll` 订阅标脏。不引库，符合零依赖约束。

### 3.4 性能热路径

- `isChunkCollected`（`app.js:2209`）是 `state.chunks.some(...)` 线性扫描，且在 `renderLearnList` 里对每篇文章的每个词块调用（`app.js:2354`）→ O(课程 × 词块 × 已收词块数)。1000 条词块 + 10 篇文章 → 每次渲染约 10⁴ 次 `toLowerCase()`。
- `renderChunks`（`app.js:4018-4043`）对每张卡片现算 `chunkMeta/metaSenses/dictGloss`；搜索分支还要拼 `metaSenses` 结果（`app.js:4005`）。

**建议**：维护一个 `collectedSet`（小写 chunk 的 Set），在改动 `state.chunks` 的少数几个函数里同步更新；`metaSenses` 结果按 chunk 字符串记忆化，词典加载完成后清一次。两处都是 10 行以内。

---

## 4. P2：测试与仓库纪律

### 4.1 81 个用例很好，但全部是 VM + DOM 桩

`tools/smoke.js` 1486 行覆盖了落盘合并尾写、迁移带 `trCache`、云同步并集、SW 版本号由内容哈希决定、免安装 zip 由脚本生成、asar 清单与 `build.files` 对齐——这些**恰好是最容易回归的地方**，选择很准。

但它是 `vm` 里跑 `app.js` + 手搭 DOM 桩，下面这些无法被验证：CSP 是否真的生效、`innerHTML` 渲染后的实际 DOM、363 行事件绑定是否接对、Electron 外壳的同源拦截。**上面 P0 的两个 bug（1.1、1.2）都在这个盲区里。**

**建议**：不要求上完整 E2E。最小增量：一个 `tools/smoke-dom.js`，在 `vm` 里遍历 `ec-chunks-fixed.html` 里所有 `id`，断言 `init()` 里 `$('#...')` 引用的 id 全部存在。这一条就能兜住 1.2 那类"改 id 改挂整页"的事故，而且不需要浏览器。

### 4.2 没有 CI

根目录无 `.github/`。`package.json:24` 已经有 `check = lint:all && test`，但完全依赖本地习惯。`package.json` 里 `npm run check` 的存在说明作者想过这件事，只是没接上。

**建议**：加一个 20 行的 workflow：`node 24 + npm ci + npm run check + npx prettier --check .`。对这类零依赖项目成本几乎为零，收益是"提交前不用记得"。

### 4.3 版本号与 git 历史漂移

- `package.json:3` 是 `0.7.1`
- `git log` 最新提交仍停在「4b297aa 0.6.0 收尾」
- 工作区有 12 个已修改文件（`app.js`、`ec-chunks-fixed.html`、`sw.js`、`package.json`、`tools/smoke.js` 等）+ 4 个未跟踪路径（`data/`、`tools/build-dict.js`、`tools/build-lemma.js`、`tools/preview.js`）

0.7.1 的全部工作量和 `data/` 的生成脚本都还只在工作区里。这是**本次评审最担心的一条**：任何一次误操作（`git clean`、换机器、磁盘故障）都会丢掉 2.3MB 无法再生的词典和 `tools/build-dict.js`。

**建议**：先提交，再谈重构。`data/` 是否入库按 1.3 的决定走，但 `tools/build-dict.js`、`tools/build-lemma.js`、`tools/preview.js` 三个脚本必须立刻入库——它们是再生词典的唯一途径。

### 4.4 `tools/inno-setup/` 21 个文件 7.1MB 已入库

```
tools/inno-setup/Setup.e32   2511 KB
tools/inno-setup/ISCmplr.dll 1382 KB
tools/inno-setup/ISPP.dll     989 KB
tools/inno-setup/ISCC.exe     852 KB
...
```

这是仓库最大的跟踪体积来源（`app.js` 只有 295KB，`.git` 3.7MB 里大头就是它们），而它们只是构建安装器用的第三方编译器，与源码无关。

**建议**：移到构建时下载，或挂到 release 附件，`.gitignore` 掉。`package.json:15-16` 的 `dist:inno` 改成"检测本地 `tools/inno-setup/ISCC.exe` 存在则用，不存在则提示下载"。这个改动不影响 `pack:app` / `repack:dir` 那条主链路。

### 4.5 注释与代码脱节

`electron/main.js:196` 的注释写「相邻的 10 个端口」，但 `electron/main.js:110-113` 定义的是 `PORT_TRIES = 30`。同一文件 `electron/main.js:224` 的注释又正确写了「30 个端口」。一处 30 一处 10，读者会怀疑哪个是真的。

**建议**：注释里不要硬编码数字，写 `PORT_TRIES`。

### 4.6 `catch {}` 空吞 13 处

`catch` 共 41 处，其中 13 处是完全空的 `catch {}`。多数是合理的（`localStorage` 读、`JSON.parse`、`AbortController`），但没有任何注释说明"为什么可以吞"。

**建议**：给每一处加半行注释（`// 解析失败就当没有，后面有兜底`）。不改逻辑，纯可读性，但能让后来者不敢乱改。

---

## 5. 文档

- `README.md` 323 行，混排"用户怎么用""开发者怎么构建""GitHub Pages 怎么部署"三类读者
- `CHANGELOG.md` 38KB

**建议**：README 只留 60 行的快速开始 + 一张截图 + 三个链接；构建/发布流程进 `docs/BUILD.md`，Pages 部署进 `docs/DEPLOY.md`。另外 `README.md:70` 与实际不符（见 1.3），必须改。

---

## 6. 建议的修复顺序

| 优先级 | 事项 | 依据 | 预估 |
|---|---|---|---|
| **P0-1** | `will-navigate` 改 `URL.origin` 比较 | 1.1 | 1 行 |
| **P0-2** | 先 `git add` + 提交（含 `tools/build-*.js`、`tools/preview.js`） | 4.3 | 10 分钟 |
| **P0-3** | `init()` 加 `try/catch` + `on(id, fn)` 帮助函数 | 1.2 | 1 小时 |
| **P0-4** | 决定 `data/*.json` 入库或改文档/`PRE_CACHE` | 1.3 | 30 分钟 |
| **P1-1** | `trCache` 拆出 `state`（或降 `TR_CACHE_MAX` + 加配额判断） | 2.1 | 2 小时 |
| **P1-2** | 沙箱降级改为"失败后重试"，或加 `EC_CHUNKS_SAFE` | 2.2 | 2 小时 |
| **P1-3** | 统一切句实现 + 加句数一致性用例 | 2.3 | 3 小时 |
| **P1-4** | `mergeStates` 加 3 条代数性质断言 | 2.4 | 1 小时 |
| **P2-1** | 语料抽到 `data/lessons.js` | 3.1 | 2 小时 |
| **P2-2** | 拆 `init()` / `bindLessonDetailEvents()` | 3.2 | 半天 |
| **P2-3** | 加 `id` 一致性 smoke + GitHub Actions | 4.1 / 4.2 | 2 小时 |
| **P2-4** | `isChunkCollected` 改 Set、`metaSenses` 记忆化 | 3.4 | 1 小时 |
| **P3** | 内联样式提 class 去掉 `unsafe-inline`；`inno-setup` 出仓库；注释数字；空 catch 注释 | 2.2 / 4.4 / 4.5 / 4.6 | 半天 |

---

## 7. 我认为**不需要**改的地方（免得白折腾）

说几个看起来"不规范"、但改了对这个项目是负收益的：

1. **`app.js` 不格式化**。`.prettierignore:1-15` 的理由成立：一行多语句的高密度风格是刻意选择，格式化会淹没真实 diff。保留。
2. **零运行时依赖**。`devDependencies` 只有 electron / electron-builder / eslint / prettier，没有任何 UI 框架和状态库。这是这个项目最大的优势之一，不要为了"现代化"引入 React/Vue。
3. **不用 `file://` 而用 `127.0.0.1:<port>`**。这是正确的：Service Worker、`localStorage` 的稳定 origin、以及现代 Web API 都要求安全上下文/HTTP 源。代价（端口变化 = 数据看起来丢了）已经用 `port.json` + 标题标记处理了，`electron/main.js:106-116` 的注释把取舍写得很清楚。
4. **98 端口段顺延 30 个端口**。设计合理，`electron/main.js:224-228` 连"全部被占则退回随机端口"的极端情况都想到并写了日志，不需要动。
5. **总共 41 处 catch、只有 2 处 console**。对一个离线优先、不收集日志的工具来说，"不往用户控制台刷错误"是合理的产品决策。只需要补注释（见 4.6），不需要加日志框架。
6. **`pickedIds` 这类 UI 状态放模块级 `let`**。在这个规模下完全可接受，和第 3.3 条说的"store 化"是两件事——先做 store 的保存/渲染联动，UI 临时状态继续那么写没问题。

---

## 8. 一句话总评

**这是一个"防线思维"很强的项目**：CSP、contextIsolation、目录穿越防护、数据版本迁移、合并窗口落盘、内容哈希 SW 版本、81 个针对性用例——上面这些在同类个人 Electron 应用里都少见。

**两个真实的窟窿**都很小、都能在半小时内堵上：`electron/main.js:289` 的字符串前缀判同源，和 `app.js:5181-5182` 裸调 `init()`。**最需要立刻行动的其实不是代码，而是 4.3**——0.7.1 的全部工作还躺在工作区里没提交，其中 2.3MB 的离线词典不可再生。

代码本身不需要重构，需要的是"别在规模增长到 8000 行时才想起拆文件"这个时间线管理。
