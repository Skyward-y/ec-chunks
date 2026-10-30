# 语境词块本 · 不背单词，在句子里记住它

一个**零依赖、可离线**的英语学习工具：从真实文章里收集「词块 ／ 句子」，按间隔重复复习，自带逐句对照、朗读、理解题、填空题，还能按你的等级和学习进度生成复习短文。

网页版是单个 HTML 文件，双击就能用；桌面版是 Windows 安装包，装完像普通软件一样打开。

---

## ⬇️ 下载 Windows 版

| 版本 | 文件 | 大小 | 怎么用 |
| :--: | --- | :--: | --- |
| **安装版**<br>（推荐） | [`EcChunks-0.7.3-setup.exe`](https://github.com/Skyward-y/ec-chunks/releases/download/v0.7.3/EcChunks-0.7.3-setup.exe) | 103 MB | 双击安装 → 桌面和开始菜单出现「语境词块本」 |
| **免安装版** | [`EcChunks-v0.7.3-win64.zip`](https://github.com/Skyward-y/ec-chunks/releases/download/v0.7.3/EcChunks-v0.7.3-win64.zip) | 140 MB | 解压 → 双击里面的 `EcChunks.exe` |

全部下载都在 [Releases](https://github.com/Skyward-y/ec-chunks/releases) 页面。

> **首次运行的两个提示（都正常）**
> 1. Windows 可能弹「已保护你的电脑」——因为没有买代码签名证书，点 **更多信息 → 仍要运行**。
> 2. 杀毒软件可能询问是否允许 —— 选**允许**。

> **安装路径不要选 `C:\Program Files`。**
> 笔记固定保存在「程序目录下的 `data` 文件夹」，整个文件夹拷到 U 盘或别的电脑笔记就跟着走。目录不可写时会直接报错退出（安装包默认装到 `%LOCALAPPDATA%\Programs\EcChunks`，不用改）。

不想安装？**[直接用网页版](#网页版零安装)**：双击 `ec-chunks-fixed.html` 就行。

---

## 桌面版 vs 网页版

|  | 桌面版（.exe） | 网页版（.html） |
| --- | --- | --- |
| 打开方式 | 桌面 / 开始菜单快捷方式 | 双击 HTML，浏览器打开 |
| 数据位置 | 程序目录下的 `data` 文件夹（可整体拷走） | 浏览器 localStorage |
| 离线 | 完整可用 | 完整可用（PWA 需先部署到 https） |
| 自动翻译 | 需要联网 | 需要联网 |
| 手机 | 不支持 | 支持（部署后可添加到主屏） |
| 便携 | 整个文件夹拷走即可 | 单个 HTML 文件 |

桌面版是一个 Chromium 外壳，用同一份 `ec-chunks-fixed.html`，所以功能完全一致，只是把数据放到了程序自己的目录里，并且能像普通软件一样双击打开。

**桌面版排障**：双击没反应时，看 `%TEMP%\ecchunks-startup.log`，里面记录了每次启动的关键步骤。

---

## 它解决什么问题

传统背单词是「单词 ↔ 意思」的孤立记忆，忘得快、也不会用。这个工具让你：

1. **读**一篇真的英文文章（内置 6 篇，或你自己粘进来的）；
2. **点**原文里的重点词块，连原句一起收进词块本；
3. **复**习时看原句挖空、或看中文说英文，按「记住了 / 有点模糊 / 没记住」自评，系统按 `2 → 4 → 7 → 14 → 30` 天排期；
4. **用**它造句，写进词块自己的「我的句子」。

---

## 功能

**读**
- 逐句中英对照，英文词块绿色高亮，中文按**句级对齐**同步高亮；定位不到的意思会以 `词块｜意思` 小标签列出
- **页面上任何英文都能框选**：正文里选中直接进「加词块」窗口（能改词块、能补中文、会回写到这一课）；题干、选项、解析、例句这些位置选中先给译文条，想收进词块本再点一下，来源记成「页面：X」
- 每句英文下面有一行按钮：「翻译」只展开这一句的中文（再点收起，和卡片头那个「显示翻译」可以叠加）、「语法」、「问 AI」
- 「语法」（卡片头有「全部语法」一键开关）：按结构关键词提示从句、完成时、被动语态、非谓语等，最多 4 条，长句另给提示——是阅读提示，不是逐词语法标注。想要逐词拆解就点同一个位置上的「问 AI」：提示词带这句原文、正文现成的译文和命中的语法点，复制好并打开 AI 站点（默认 DeepSeek，可在统计页换成 ChatGPT / Kimi / 豆包 / 元宝，或自填网址；始终不经过任何服务器、本地不存 API Key）
- 一键逐句自动翻译（Google 免费接口，失败自动回退 MyMemory）
- 每段 / 每个词块 / 例句都能点 🔊 朗读（浏览器自带 TTS）
- 理解题（选择题）+ 填空练习，答完直接给正确答案与解析：正确答案（带中文）、原句、翻译（填空给「句意」）。原句的中文优先从正文那段的译文里直接取（句数对得上就取同一句，对不上给整段），所以答完立刻有中文、不发请求、也不用点按钮；解析里不再另列一块重复的中文。想听更细的讲解就点「让 AI 讲讲这句」。填空可以一题一题对：每题下面有「看这题答案」，只判这一题、只展开这一题的答案；卡片头那颗「全部检查」只统计真的填了的题，空着的不判也不展开
- 文章底部「上一篇 / 下一篇」，列表显示每篇「已收 x / y 个词块」
- 「＋ 添加我的英文文章」里带一段可复制的 AI 提示词：按所选等级 / 主题 / 句数生成英文短文，写作要求（一句一句、每 1–2 句一个常用搭配，词块条数随句数定，难度标准只讲当前等级那一段）与输出格式（英文标题、中文标题、英文逐句、中文逐句、重点词块）都写死，重点词块还要求标词性、列多个义项、附助记，且每个词块必须原样出现在英文原文里；词块本里还没掌握的表达会附在末尾（按到期日挑 8 条、每条带一个中文意思，并要求至少用上 3 个）。拿到 AI 的回答后整段粘进「从 AI 的回答里自动分段」，标题、英文、中文会自动分开填好，那一节的词性 / 多义 / 助记也会跟着进「重点词块」卡片（内置 67 个词块的这一层写在 `CHUNK_META` 表里）。「我的文章」里自动提出来的词块：分析这一步就补齐三样——词性查 `WORD_POS`（约 400 个常见词）或按词形推断（`in the morning light` → `prep. phr.`，推不准就空着，推断来的用虚线圈标出），一词多义查 `WORD_SENSES`（约 75 个真多义词），助记由 `buildMorphMnemonic` 拆前后缀给出（屈折形先还原成原形再讲，弱前缀碰上后缀只讲后半截，词干既没意思也认不出词根就留空——拆不出可靠结构就不写）；2–3 个词的短语反过来，先认整条（`give up` → 放弃、`coffee shop near` → 咖啡店），整条查不到才逐词拆，虚词不参与拼装，三单/复数按原形取义（`feels` → feel）。卡片上没有需要逐条点的入口，能离线算的都自动算好；`twenty minutes` 这类数字短语分析时就给出「二十分钟」和 `num.+n.` 的词性。想把词性和助记补得更准，就在添加 / 编辑文章时把 AI 的整段回答粘进「从 AI 的回答里自动分段」，`### 重点词块` 一节会连带导入。

- 中文意思有内置词典兜底：随包的 `data/dict.json`（约 20000 个常用词 + 3.6 万条 2–3 词常见搭配，2.3MB）与 `data/lemma.json`（4508 条不规则变形：`went` → `go`、`children` → `child`）由 `tools/build-dict.js` / `tools/build-lemma.js` 从 [ECDICT](https://github.com/skywind3000/ECDICT)（MIT）生成，原始 csv 不进仓库；启动时异步加载，读不到就静默跳过。词典按词性分块存（`light` → `n. 光, 光亮, 灯 | adj. 轻的, 少量的`），卡片取第一块当意思、其余块进「其他义项」（文章的重点词块、词块本卡片、复习揭晓三处共用一份规则，和主意思重复的项会先剔掉；搜索框也认义项）。短语也按整串收了一条（自动提取只产 2–3 词语块，只收单词键的话这类搭配永远空着）：`coffee shop` → `咖啡店`、`in the end` → `最后`、`make a decision` → `作决定`。为避免体积失控，短语只收「每个词都在这 2 万高频词里、且确实有中文」的——ECDICT 全量 33.6 万条短语过滤后剩 3.6 万条。构词助记仍只信内置的小词表，不拿大词典凑（否则 `remote` 会被拆成 `re + mote（微尘）`）

**收藏与复习**
- 词块本：搜索、按待复习 / 已掌握筛选、按来源筛选、排序、批量删除
- 删除可撤销（右下角「撤销」+ 统计页「最近删除」回收站，最多 100 条）
- 复习：英→中 / 中→英 双向、键盘 1-2-3 快捷键、「只练这次没记住的」、结束后造句收尾（自动勾上今日「输出」）
- 错题本：答错的理解题与填空自动收进来（题干、正确答案、你上次选的、错了几次都在），可按「待订正 / 已订正」筛选、把原题重做一遍。卡片最前面的《文章标题》就是按钮，点一次直接打开那篇文章；「让 AI 讲讲」把题目、你的答案、正确答案和那段原文/译文拼成中文提示词，复制好并打开 AI 站点，粘上去就能问。已订正的条目攒多了可以在筛选行点「清空已订正」（只清 `fixed` 的，清掉同时留墓碑，云同步不会把它们搬回来）

**进度与计划**
- 今日流程清单（输入 / 收集 / 输出 / 复习）
- 连续学习天数、最近 7 天新增、记忆阶段分布
- 8 周阶段计划表、每周节奏模板
- 按等级 + 进度自动生成复习短文（从现有语料里挑出命中你到期词块的句子，中英都是原句原文）

**数据**
- 默认**完全本地**：网页版存在浏览器 `localStorage`（键名 `ecChunksApp_v3`），桌面版存在程序目录的 `data` 文件夹，都不上传任何服务器
- **可选云同步**（Supabase）：换设备 / 换浏览器不用导出导入，配置后自动上传，详见下文
- 导出 / 导入 JSON 备份，导出 CSV（Excel 友好）、导出 Anki（Tab 分隔）
- 攒到 20 条以上且 7 天没导出会提醒备份

---

## 网页版（零安装）

### 方式一：本地双击

下载 `ec-chunks-fixed.html`，双击用浏览器打开即可。

> 双击打开的 `file://` 页面里，交互和数据功能全都在（词块本、复习、理解题、填空、AI 提示词、云同步），**唯一拿不到的是离线词典**：浏览器不允许 `file://` 页面用 `fetch` 读本地 json，所以 `data/dict.json` / `data/lemma.json` 加载不了——「我的文章」里自动提出的词块会因此少掉中文意思、其他义项、词形还原和逐词助记（内置 6 篇和内置表里的 251 条照旧）。PWA 离线安装在这个协议下也不可用。
>
> 想要和安装版一模一样，用下面的方式二（部署成网站），或者在源码目录里 `npm run preview`（起本地静态服务器，见「本地开发与自检」）。

### 方式二：部署成网站（推荐，可手机安装）

**GitHub Pages（免费，5 分钟）**

```bash
git init
git add .
git commit -m "init: 语境词块本"
git branch -M main
git remote add origin https://github.com/<你的账号>/<仓库名>.git
git push -u origin main
```

然后在仓库 **Settings → Pages** 里：

- Source 选 `Deploy from a branch`
- Branch 选 `main`，目录选 `/ (root)`
- 保存，等 1 分钟左右，访问 `https://<你的账号>.github.io/<仓库名>/`

打开首页会通过 `index.html` 自动跳到应用本体。

**Cloudflare Pages / Vercel / Netlify** 同理：把整个目录作为静态站点上传即可，不需要构建命令。

### 方式三：装到桌面 / 手机（PWA）

部署到 **https** 之后：

- **Chrome / Edge（桌面）**：地址栏右侧出现「安装」图标，点一下就有独立窗口和开始菜单项
- **Android Chrome**：菜单 → 「添加到主屏幕 / 安装应用」
- **iOS Safari**：分享 → 「添加到主屏幕」（iOS 只认 PNG 图标，这里只有 SVG，所以主屏图标可能是网页截图，功能不受影响）

离线：Service Worker 会缓存应用外壳，断网也能打开已缓存页面、复习、看统计；只有自动翻译不可用。

---

## 云同步（可选，Supabase）

本地仍是主存储（断网可用），云端只是镜像。配置入口：**统计 → 云同步（可选）**。

**一次性准备（约 5 分钟）**

1. 到 [supabase.com](https://supabase.com) 新建一个免费项目；
2. 左侧 **SQL Editor** 执行：

```sql
create table if not exists public.states (
  user_id uuid primary key references auth.users(id) on delete cascade,
  data jsonb not null,
  updated_at timestamptz not null default now()
);
alter table public.states enable row level security;
create policy "own select" on public.states for select using (auth.uid() = user_id);
create policy "own insert" on public.states for insert with check (auth.uid() = user_id);
create policy "own update" on public.states for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
```

3. **Project Settings → API** 里复制 `Project URL` 与 `anon public key`；
4. 回到应用「统计 → 云同步」填这两项 → 保存配置 → 用邮箱 + 密码「注册」（若项目开了邮箱验证，先去邮箱点确认链接，再「登录」）。

**同步行为**

- 登录后自动上传一次；之后每次改动（收录、复习、改文章…）3 秒内自动上传，可关掉「自动同步」手动控制。
- 打开页面时先拉云端：如果云端比本地新（另一台设备写过），会弹窗问「用云端覆盖本地」还是「保留本地并上传」。
- 手动按钮：「立即上传」「从云端恢复」。
- 冲突策略是**最后写入者覆盖**，单人单设备/多设备交替使用足够；不适合多人同时编辑同一份。

**注意**

- 登录 token 存在本机 `localStorage['ecChunksCloud_v1']`，与学习数据分开；公共电脑用完请「退出登录」。
- 表上开了 RLS，`anon key` 泄露也只能读写**自己那一行**（前提是按上面 SQL 建了策略）。
- 云同步只同步学习数据，不同步「云同步配置」本身——换设备时需要在那边再填一次 URL/key 并登录。

---

## 目录

```
.
├── ec-chunks-fixed.html    # 应用本体：结构 + 样式（桌面版也用它）
├── app.js                  # 应用逻辑（原先是 HTML 里的内联 <script>，为了能用 CSP 才拆出来）
├── pwa.js                  # 注册 Service Worker（独立出来同样是 CSP 的要求）
├── index.html              # 网页版入口（GitHub Pages 根路径需要，脚本在 redirect.js）
├── redirect.js             # 入口页跳转到应用本体
├── manifest.webmanifest    # PWA 清单
├── sw.js                   # Service Worker（离线缓存）
├── icon.svg                # 网页图标
├── electron/               # 桌面版外壳
│   ├── main.js             #   主进程：本地静态服务器 + 窗口 + 选择数据目录
│   ├── icon.ico            #   exe / 安装包图标
│   └── installer.iss       #   Inno Setup 安装脚本
├── tools/
│   ├── build-installer.js  #   一条命令产出安装包
│   ├── update-app.js       #   把网页打进 app.asar
│   ├── repack-unpacked.js  #   只重打 dist/win-unpacked 里的 app.asar（沙箱里 electron-builder 起不来时用）
│   ├── stamp-sw.js         #   按资源内容重算 sw.js 的缓存版本号（打包时自动跑）
│   ├── smoke.js            #   npm test：把 app.js 放进 DOM 桩里跑的冒烟测试
│   ├── lint-html.js        #   npm run lint:html：检查页面无内联脚本 / 有 CSP
│   └── inno-setup/         #   内置编译器（已带中文语言包，无需联网）
├── eslint.config.js        # 代码检查配置（只开会出 bug 的规则，格式交给 prettier）
├── .prettierrc.json        # 格式配置
├── BUILD-EXE.md            # 打包 / 安装包说明与踩坑记录
├── README.md
├── CHANGELOG.md
└── LICENSE
```

> 仓库只需要上面这些文件。`node_modules/`、`dist/`、`.cache/` 已被 `.gitignore` 排除。

---

## 自己打包 Windows 版

```powershell
npm install
npm run dist          # = 下面两条
npm run dist:dir      # electron-builder 生成 dist/win-unpacked
npm run dist:inno     # Inno Setup 压成 dist/EcChunks-<version>-setup.exe
```

只改了网页（`ec-chunks-fixed.html`）也要重跑 `npm run dist`，因为页面是打进 `resources/app.asar` 的。改版本号只需改 `package.json` 的 `version`，安装包文件名会自动跟着变。

细节（为什么不用 NSIS、常见报错、图标替换等）见 [BUILD-EXE.md](./BUILD-EXE.md)。

---

## 本地开发与自检

```powershell
npm run check       # = lint + lint:html + test，改完跑一次
npm run lint        # ESLint：electron/、tools/、sw.js、app.js、pwa.js、redirect.js
npm run lint:html   # 页面守则：不许内联 <script>、不许 on* 属性、必须有 CSP
npm test            # 冒烟测试：把 app.js 放进 DOM 桩里跑，不需要浏览器
npm run format      # prettier --write .
npm run preview     # 本地静态服务器预览 http://127.0.0.1:8000（离线词典可用；双击 file:// 拿不到它）
```

两个约定，不遵守会踩坑：

- **页面里有 CSP（`script-src 'self'`）**：别再往 HTML 里写 `<script>` 或 `onclick=`——浏览器会直接拦掉，而且**控制台不报错**，表现就是"这块点了没反应"。交互统一写在 `app.js` 里，用 `data-*` + 事件委托挂（`renderLearnList` 的卡片就是这么改的）。
- **别手改 `sw.js` 的 `CACHE_VERSION`**：版本号由 `tools/stamp-sw.js` 按静态资源内容算，`npm run dist:dir` 会自动跑；手写版本号一旦忘记 bump，装过的用户会一直停在旧缓存上。

---

## 数据结构

存在 `localStorage['ecChunksApp_v3']`（桌面版即在 `data` 目录下的 Chromium 存储里），整体是一个 JSON：

```jsonc
{
  "version": 5,            // DATA_VERSION：读到比它大的数字会先提醒导出备份
  "chunks": [            // 词块本
    {
      "id": "…", "chunk": "wake up", "sentence": "I wake up at seven.",
      "meaning": "醒来", "mine": "（我自己造的句子）", "source": "A Morning Routine",
      "added": "2026-10-24", "nextReview": "2026-10-26",
      "stage": 0, "mastered": false, "lastReviewed": null
    }
  ],
  "trash": [],           // 回收站（带 deletedAt）
  "logs": { "2026-10-24": { "inputDone": true, "outputDone": false, "reviewed": 3 } },
  "streak": 5, "lastActive": "2026-10-24",
  "settings": { "currentWeek": 1, "lastLessonId": "b1", "exportedAt": "…" },
  "customLessons": [],   // 你自己加的文章 + 自动生成的复习短文（id 以 gen_ 开头）
  "mistakes": {},        // 错题本：键是 `课程id|quiz|题号`，同题反复错只累加次数
  "trCache": {},         // 机器翻译缓存（英文 → 中文），上限 3000 条，云同步时取并集
  "deletedLessons": {},  // 删掉的课程墓碑：并集合并时靠它避免"删了又被云端拉回来"
  "deletedMistakes": {}  // 清掉的错题墓碑：同上，清掉后云同步不会把它搬回来
}
```

复习间隔：`INTERVALS = [2, 4, 7, 14, 30]`（第 1 次记住 +4 天，依次类推，第 5 次记住标记为「已掌握」）。

---

## 自定义内容

- **加文章**：学习页 →「＋ 添加我的英文文章」，粘贴英文，中文可留空（保存时会逐句补译），系统会自动切句、提取词块、出理解题和填空题。
- **改内置文章**：编辑 `app.js` 里的 `const LESSONS = [...]`（在文件开头附近；页面脚本 2024 年从 HTML 拆了出来），格式见文件内注释；`text` 与 `textZh` 按段落一一对应即可。
- **改复习间隔**：搜 `const INTERVALS`。
- **改内置词典**：搜 `const CHUNK_GLOSSARY`（用于自动填词块中文意思）；紧跟着的 `const CHUNK_META` 给内置词块补词性、另一个常见意思和助记。

---

## 已知限制

- **数据只在本机**：网页版在浏览器里，换设备 / 清缓存会丢；桌面版在程序目录 `data` 里，删掉文件夹就没了。可以用「导出备份」或配置上文的可选云同步。
- **自动翻译依赖免费公共接口**（Google `translate_a/single`、MyMemory），可能被限流或需要能访问外网；失败时可手动填写意思。翻译结果有内存缓存，同一句不会重复请求。
- **桌面版没有代码签名**，首次运行会有 SmartScreen 提示。
- **桌面版要求程序目录可写**（笔记存在那里），所以不能装进 Program Files；装到只读目录会提示并退出。
- **PWA 图标是 SVG**：Android/桌面 Chrome 正常，iOS 会退化为主屏截图。
- **移动端选中**：已针对触摸屏调过（pointerup + 60ms 延迟 + 可视区定位），但 iOS 的原生长按菜单仍可能挡住弹层，可选「取消后重试」。
- 单文件意味着**所有内置文章都在 HTML 里**，仓库体积会随文章数增长（目前约 190 KB，即 194,167 字节）。

---

## Roadmap

- [x] 云同步（Supabase，本地缓存 + 自动上传 + 拉取时询问）
- [x] Windows 桌面版与安装包（Electron + Inno Setup）
- [ ] 自建后端 / 其他 BaaS 适配（目前只实现了 Supabase REST）
- [ ] 真·AI 生成文章（填 API Key，按等级与进度写原创短文）
- [ ] 听写模式（听音写词块，判分）
- [ ] 词块标签（口语 / 写作 / 学术）与按标签筛选
- [ ] 每周复盘页（完成率、最久未复习 Top 10）
- [ ] 自动更新（现在升级需手动重新下载安装包）

---

## 贡献

欢迎 Issue / PR。改之前请记住两条约定：

1. **保持网页部分单文件、零构建**：`ec-chunks-fixed.html` 双击必须能跑，不要给它引入 npm 依赖；
2. **所有插入 innerHTML 的内容都要过 `esc()`**：本项目通过 `esc()` 做转义防 XSS，新增模板字符串时请沿用。

---

## License

[MIT](./LICENSE) © 2026 语境词块本 contributors

> 内置 6 篇英文文章为原创学习材料，随项目一同以 MIT 授权；若你要放入第三方文章，请自行确认版权并在文中标注来源。
