# 语境词块本 · 不背单词，在句子里记住它

一个**零依赖、可离线**的英语学习工具：从真实文章里收集「词块 ／ 句子」，按间隔重复复习，自带逐句对照、朗读、理解题、填空题，还能按你的等级和学习进度生成复习短文。

网页版是单个 HTML 文件，双击就能用；桌面版是 Windows 安装包，装完像普通软件一样打开。

---

## ⬇️ 下载 Windows 版

| 版本 | 文件 | 大小 | 怎么用 |
| :--: | --- | :--: | --- |
| **安装版**<br>（推荐） | [`EcChunks-0.5.0-setup.exe`](https://github.com/Skyward-y/ec-chunks/releases/download/v0.5.0/EcChunks-0.5.0-setup.exe) | 103 MB | 双击安装 → 桌面和开始菜单出现「语境词块本」 |
| **免安装版** | [`EcChunks-v0.5.0-win64.zip`](https://github.com/Skyward-y/ec-chunks/releases/download/v0.5.0/EcChunks-v0.5.0-win64.zip) | 126 MB | 解压 → 双击里面的 `EcChunks.exe` |

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
- 选中英文任意片段即可加进词块本（内置文章也支持）
- 一键逐句自动翻译（Google 免费接口，失败自动回退 MyMemory）
- 每段 / 每个词块 / 例句都能点 🔊 朗读（浏览器自带 TTS）
- 理解题（选择题）+ 填空练习，答完直接给正确答案与解析
- 文章底部「上一篇 / 下一篇」，列表显示每篇「已收 x / y 个词块」

**收藏与复习**
- 词块本：搜索、按待复习 / 已掌握筛选、按来源筛选、排序、批量删除
- 删除可撤销（右下角「撤销」+ 统计页「最近删除」回收站，最多 100 条）
- 复习：英→中 / 中→英 双向、键盘 1-2-3 快捷键、「只练这次没记住的」、结束后造句收尾（自动勾上今日「输出」）

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

> `file://` 下也能用全部功能，只有两件事受限：PWA 离线安装不可用；部分浏览器对本地文件的 `fetch` 有额外限制。

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
├── ec-chunks-fixed.html    # 应用本体：单文件（HTML + CSS + JS + 内置文章），桌面版也用它
├── index.html              # 网页版入口（自动跳转到应用本体，GitHub Pages 根路径需要）
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
│   └── inno-setup/         #   内置编译器（已带中文语言包，无需联网）
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

## 数据结构

存在 `localStorage['ecChunksApp_v3']`（桌面版即在 `data` 目录下的 Chromium 存储里），整体是一个 JSON：

```jsonc
{
  "version": 3,
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
  "customLessons": []    // 你自己加的文章 + 自动生成的复习短文（id 以 gen_ 开头）
}
```

复习间隔：`INTERVALS = [2, 4, 7, 14, 30]`（第 1 次记住 +4 天，依次类推，第 5 次记住标记为「已掌握」）。

---

## 自定义内容

- **加文章**：学习页 →「＋ 添加我的英文文章」，粘贴英文，中文可留空（保存时会逐句补译），系统会自动切句、提取词块、出理解题和填空题。
- **改内置文章**：编辑 `ec-chunks-fixed.html` 里的 `const LESSONS = [...]`（在 `<script>` 开头附近），格式见文件内注释；`text` 与 `textZh` 按段落一一对应即可。
- **改复习间隔**：搜 `const INTERVALS`。
- **改内置词典**：搜 `const CHUNK_GLOSSARY`（用于自动填词块中文意思）。

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
