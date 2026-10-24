# 上手手册（一步步照做）

这份文件只讲**你要动手的部分**，分两段：

- **第一段（上一步）**：把项目发布到 GitHub Pages，并在手机/电脑上装成 App → 得到一个 `https://` 地址
- **第二段（这一步）**：接上 Supabase 云同步 → 换设备/清缓存也不丢数据

> 顺序不能反过来：云同步需要一个 `https://` 的地址才稳（本地 `file://` 打开时浏览器会限制跨域请求）。

---

# 第 0 步：确认文件

打开这个文件夹：

```
D:\Users\18359\Documents\deepseek-harness\default-workspace
```

**要上传的只有这 8 个文件**：

| 文件 | 是什么 |
| --- | --- |
| `index.html` | 入口页（自动跳到应用） |
| `ec-chunks-fixed.html` | **应用本体**，最重要，别改坏 |
| `manifest.webmanifest` | App 清单（名称/图标/独立窗口） |
| `sw.js` | 离线缓存 |
| `icon.svg` | 图标 |
| `README.md` | 项目说明 |
| `CHANGELOG.md` | 更新日志 |
| `LICENSE` | MIT 许可证 |

外加一个隐藏文件 `.gitignore`（可选，作用是别把调试垃圾和个人备份传上去）。

**这个文件夹里还有一堆别的文件**（`_*.js`、`*.bat`、`pasted-screenshot.jpg`、`cat_doodle.py` 等），那些是之前调试留下的，**不要上传**。下面的操作如果用 `git` 命令行，`.gitignore` 会自动排除它们；如果手动拖拽上传，就只拖上面 8 个。

---

# 第一段：发布到 GitHub Pages

三种方式**任选一种**，推荐 A（最不容易出错）。

## 方式 A：GitHub Desktop 图形界面（推荐，不用命令行）

1. 打开 https://desktop.github.com/ 下载安装 **GitHub Desktop**，装好后用 GitHub 账号登录（没有账号先注册，免费）。
2. 菜单 `File → Add local repository…`。
3. 选择文件夹：`D:\Users\18359\Documents\deepseek-harness\default-workspace`，点 `Add repository`。
4. 如果弹出「这不是一个 Git 仓库，要不要创建？」提示，点 **`create a repository`**：Name 填 `ec-chunks`，Description 随意，**不要勾** `Initialize with README`，点 `Create repository`。
5. 左侧会列出 `Changes`，确认里面**只有那 8 个文件**（如果出现 `_b1.md`、`*.bat` 之类，说明 `.gitignore` 没生效，可以在文件上右键 `Ignore file`）。
6. 左下角 `Summary` 填一句话，例如 `init: 语境词块本`，点 `Commit to main`。
7. 右上点 **`Publish repository`**：
   - Name 保持 `ec-chunks`
   - **把 `Keep this code private` 取消勾选**（免费账号的私有仓库不能用 Pages）
   - 点 `Publish repository`
8. 浏览器打开 `https://github.com/你的用户名/ec-chunks`，确认能看见文件。
9. 点仓库顶部 **`Settings`** → 左侧 **`Pages`**：
   - `Source` 选 **`Deploy from a branch`**
   - `Branch` 选 **`main`**，右边文件夹选 **`/ (root)`**
   - 点 **`Save`**
10. 等 1–2 分钟，回到 `Pages` 页面顶部会出现绿色提示，地址是：

```
https://你的用户名.github.io/ec-chunks/
```

11. 打开这个地址，应该自动跳到「语境词块本」。**这就是你的 App 网址，记下来。**

## 方式 B：命令行 Git

前提：已安装 Git（https://git-scm.com/download/win，一路下一步即可）。

在资源管理器里进入那个文件夹，地址栏输入 `cmd` 回车，然后逐行执行：

```bat
git init
git add .
git commit -m "init: 语境词块本"
git branch -M main
git remote add origin https://github.com/你的用户名/ec-chunks.git
git push -u origin main
```

> `git push` 会弹出 GitHub 登录框，用浏览器授权即可。
> 仓库要先在 GitHub 网页上 `New repository` 建好（**不要**勾 README/gitignore/LICENSE，名字 `ec-chunks`，Public）。
> `git add .` 之后建议先跑一次 `git status`，确认没有 `_b1.md`、`*.bat` 之类混进来。

之后 Pages 的设置和第 10 步一样。

## 方式 C：网页拖拽上传（最笨但能用，不需要装任何东西）

1. GitHub 右上 `+` → `New repository`，名字 `ec-chunks`，选 **Public**，不勾任何初始化选项，点 `Create repository`。
2. 新仓库页面点 **`uploading an existing file`**。
3. 回到资源管理器，**按住 Ctrl 只选中那 8 个文件**，拖进浏览器窗口。
4. 下方 `Commit changes` 填说明，点提交。
5. 后面同样去 `Settings → Pages` 配置。

> 注意：`.gitignore` 是隐藏文件，拖拽时容易漏掉，漏了也没关系（只是不会有自动排除功能）。

## 发布后自检

- 打开 `https://你的用户名.github.io/ec-chunks/` → 应自动跳到应用，页面正常显示「语境词块本」。
- 打开 `https://你的用户名.github.io/ec-chunks/manifest.webmanifest` → 应该看到一段 JSON（不是 404）。
- 打开 `https://你的用户名.github.io/ec-chunks/sw.js` → 应该看到 JS 代码。

如果首页 404：检查 `index.html` 是否在**仓库根目录**（不是子文件夹），以及 Pages 的 Branch/目录设置。
如果首页能开但样式乱：等 2 分钟，Pages 首次部署需要时间。

---

# 第二段前半：装成 App（PWA）

前提：已经能用 `https://` 打开上面的网址。

| 设备 | 操作 |
| --- | --- |
| **Chrome / Edge（电脑）** | 打开网址 → 地址栏右侧出现「安装」图标（显示器+箭头），点它 → 安装。或在右上 `⋮` → `应用` → `安装此站点` |
| **Android Chrome** | 打开网址 → 右上 `⋮` → `添加到主屏幕` / `安装应用` |
| **iOS Safari** | 打开网址 → 底部 `分享` → `添加到主屏幕` |

装完之后从桌面/开始菜单点图标打开，就是全屏独立窗口，像个真正的 App。

**验证离线可用**：

1. 用装好的 App 打开一次（让缓存建立）；
2. 断网；
3. 重新打开 App → 页面照常显示，词块/复习/统计都能用（只有「自动翻译」会失败，这是正常的）。

**如果 DevTools 检查**（电脑上按 F12）：
- `Application → Manifest`：能看到名称和图标，没有红色错误；
- `Application → Service Workers`：状态应该是 `activated and running`。

> 图标说明：目前只有 `icon.svg`，Android 和桌面 Chrome 正常；iOS 的主屏图标可能显示成网页截图，功能不受影响。

---

# 第二段：接上云同步（Supabase）

目标：登录后数据自动存一份到云端，换设备/清缓存不丢。

## 1. 建 Supabase 项目

1. 打开 https://supabase.com → 用 GitHub 账号或邮箱注册 → 登录。
2. 点 **`New project`**：
   - `Name`：`ec-chunks`
   - `Database Password`：随便设一个强密码，**记下来**（应用本身用不到它，但以后进数据库要用）
   - `Region`：选 **`Southeast Asia (Singapore)`**（国内访问相对快）
   - 点 `Create new project`，等 1–2 分钟初始化完成。

## 2. 建表（复制粘贴即可）

1. 左侧栏点 **`SQL Editor`** → `New query`。
2. 把下面整段粘进去，点右下 **`Run`**（或 Ctrl+Enter）：

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

3. 看到 **`Success. No rows returned`** 就成功了。

> 这段 SQL 的作用：建一张「一人一行」的表，并开启行级权限（RLS），保证**只有你本人**能读写自己那一行。第 2 条 `alter table ... enable row level security` 和三条 `create policy` 不能省。

## 3. 复制两个值

左侧 **`Project Settings`**（齿轮图标）→ **`API`** → 记下：

- **`Project URL`**，形如 `https://abcdefghijk.supabase.co`
- **`anon` / `public` key**，一长串 `eyJhbGciOi...`

> 只用 `anon public` 这个。**绝对不要**把 `service_role` key 填进网页——那个是管理员钥匙，泄露等于数据库全开。

## 4. 决定要不要邮箱验证

Supabase 默认要求「注册后去邮箱点确认链接」。两种选择：

- **保持默认**：注册后去邮箱（含垃圾箱）点确认链接，再回应用点「登录」。国内邮箱偶尔收不到，可以换 Gmail/Outlook。
- **关掉验证（更省事）**：`Authentication` → `Providers` → `Email` → 关闭 **`Confirm email`** → `Save`。之后注册即可直接登录。

## 5. 在应用里配置

1. 打开你的 App（`https://你的用户名.github.io/ec-chunks/`）。
2. 进入 **「统计」** 页 → 找到 **「云同步（可选）」** 卡片。
3. `Supabase 项目地址` 填 Project URL，`anon public key` 填那一长串 key → 点 **`保存配置`**。
4. 卡片变成登录界面：填邮箱、密码（≥6 位），点 **`注册`**（第一次）或 **`登录`**。
5. 成功后卡片顶部状态变成绿色：**`已登录 xxx@xx.com · 上次同步 2026-10-24 23:30:00`**，并且会立刻把当前数据上传一次。

## 6. 验证真的同步了

在 Supabase 里：左侧 **`Table Editor`** → `public` → `states` 表 → 应该有一行，`data` 里能看到你的 `chunks`。

或者 SQL Editor 跑：

```sql
select user_id, updated_at, jsonb_array_length(data->'chunks') as 词块数 from public.states;
```

## 7. 换设备怎么用（重点）

新电脑/新手机上：

1. 打开同一个 `https://` 地址；
2. 进 **统计 → 云同步**，填**同样的** Project URL 和 anon key → 保存配置；
3. 用**同一个邮箱密码**登录；
4. 登录后会自动拉云端。如果本地已有旧数据，会弹窗问你：
   - 点 **确定** = 用云端覆盖本地（**新设备选这个**）
   - 点 取消 = 保留本地并上传覆盖云端

之后两边就会各自自动同步了（改动后 3 秒内上传，打开页面时先拉一次）。

## 8. 日常同步行为

- 本地仍是主存储，**断网也能用**，联网后自动补传；
- 每次改动（收录词块、复习、编辑文章、删除…）3 秒内自动上传；
- 打开页面时先拉云端，比本地新就弹窗询问；
- 想手动控制：卡片里的 `立即上传` / `从云端恢复` / 取消勾选 `自动同步`；
- 公共电脑用完点 **`退出登录`**（token 会清掉，数据仍在本地）。

---

# 常见问题排查

| 现象 | 原因 / 处理 |
| --- | --- |
| 首页 404 | `index.html` 不在仓库根目录，或 Pages 的 Branch/目录没选 `main` + `/ (root)` |
| 页面能开但样式乱、像没加载完 | Pages 首次部署还在传播，等 2 分钟 + 硬刷新（Ctrl+F5） |
| 装不了 App（没有安装图标） | 必须 `https://`；必须能读到 `manifest.webmanifest`（直接在浏览器打开这个地址确认不是 404） |
| 断网后打不开 | 第一次打开时没联网（没建立缓存），或清过站点数据，联网打开一次即可 |
| 云同步「保存配置」没反应 | URL 必须以 `https://` 开头；key 要粘完整 |
| 上传失败：`relation "public.states" does not exist` | 第 2 步的 SQL 没执行成功，回 SQL Editor 重跑 |
| 上传失败：`new row violates row-level security policy` | 三条 `create policy` 没建，或 Policy 里写错了；回到第 2 步重跑整段 SQL |
| 上传/读取失败：`401` / `JWT expired` | token 过期，点「退出登录」再「登录」；或检查是否用了旧的 key |
| 登录报 `Email not confirmed` | 去邮箱点确认链接；或在 Supabase 关掉 `Confirm email`（第 4 步） |
| 注册报「注册成功，但需要在邮箱里点确认链接后才能登录」 | 这是正常提示，去邮箱确认后回来点「登录」 |
| 登录报 `Invalid login credentials` | 密码错，或账号还没注册（先点「注册」） |
| 国内访问 Supabase 很慢/超时 | 换区域项目、挂代理，或改用自建后端（Roadmap 里那条） |
| 本地 `file://` 双击打开时云同步失败 | 浏览器限制本地文件的跨域请求，用 `https://`（Pages）或 `http://localhost` 打开 |
| 两台设备都改了，丢了一边的改动 | 冲突策略是「最后写入者覆盖」，个人交替使用够用；重要改动前先手动「立即上传」再换设备 |

---

# 一页速查

```
发布：GitHub Desktop → Add local repo → Create → Commit → Publish(Public) → Settings/Pages → main + /(root)
地址：https://<用户名>.github.io/ec-chunks/
装 App：Chrome 地址栏安装图标 / Android 添加到主屏幕 / iOS 分享>添加到主屏幕
云同步：supabase.com → New project(Singapore) → SQL Editor 跑建表 SQL → Settings/API 复制 URL+anon key
       → 应用「统计 → 云同步」填 URL+key → 保存 → 邮箱密码注册/登录
换设备：同一网址 → 填同样 URL+key → 同账号登录 → 弹窗选「确定」用云端覆盖
```
