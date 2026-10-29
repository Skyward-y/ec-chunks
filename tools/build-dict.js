#!/usr/bin/env node
/* 把 ECDICT 的词表压成应用能直接用的小词典（data/dict.json）。
 *
 *  数据来源：https://github.com/skywind3000/ECDICT （MIT 许可）
 *  用法：先从 ECDICT 仓库拿到 ecdict.csv（约 64MB），放到 data/ 下，然后
 *        node tools/build-dict.js                   # 默认读 data/ecdict.csv，写 data/dict.json
 *        node tools/build-dict.js --limit 30000     # 只要前 3 万个单词
 *        node tools/build-dict.js --phrases 0       # 不收短语，只留单词
 *        node tools/build-dict.js --phrases 60000   # 短语只收最常见的 6 万条
 *
 *  为什么顺手收一批短语：自动提取只产 2–3 词语块（app.js 的 extractChunks），
 *  而词典键是整串匹配，「我的文章」里 coffee shop / software engineer 这类搭配就一直空着中文。
 *  短语只收「每个词都在这份高频词表里」的条目：体积可控，剩下的也确实是常见搭配。
 *
 *  仓库里不收录 ecdict.csv（太大），只收录生成好的 data/dict.json。
 *  没有 csv 时脚本只打印怎么拿数据，不会让 npm run check 挂掉。
 */
'use strict';
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
function arg(name, def) {
  const i = args.indexOf('--' + name);
  return i >= 0 && args[i + 1] !== undefined ? args[i + 1] : def;
}
const SRC = path.resolve(arg('src', path.join(__dirname, '..', 'data', 'ecdict.csv')));
const OUT = path.resolve(arg('out', path.join(__dirname, '..', 'data', 'dict.json')));
const LIMIT = Math.max(1000, parseInt(arg('limit', '20000'), 10) || 20000);
/* 短语条数上限：all = 全收，0 = 不收，数字 = 只要前 N 条（按词频） */
const PHRASE_LIMIT = (function () {
  const v = String(arg('phrases', 'all'));
  if (v === '0') return 0;
  if (v === 'all') return Infinity;
  const n = parseInt(v, 10);
  return n > 0 ? n : Infinity;
})();

/* ECDICT 的 translation 里有带引号的换行，逐行读会把一条记录拆散，所以整体解析 */
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else quoted = false;
      } else field += ch;
      continue;
    }
    if (ch === '"') quoted = true;
    else if (ch === ',') {
      row.push(field);
      field = '';
    } else if (ch === '\n') {
      row.push(field);
      field = '';
      rows.push(row);
      row = [];
    } else if (ch === '\r') {
      /* 跳过 */
    } else field += ch;
  }
  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

/* 释义整理成「词性块」：换行分块，块内逗号分义项，块之间用 | 隔开。
   卡片只取第一块的第一项当作中文意思，后面几块进「其他义项」；
   同一块里的逗号项多半是同义词（早晨, 早上），不单独列出来免得看着像重复。 */
function fixPos(pos) {
  const p = String(pos || '')
    .toLowerCase()
    .replace(/\.$/, '');
  if (p === 'a' || p === 'adj') return 'adj.';
  if (p === 'vt' || p === 'vi') return 'v.';
  return p ? p + '.' : '';
}
function clean(zh) {
  if (!zh) return '';
  /* ECDICT 的 translation 里换行是字面写的反斜杠 n，不是真换行，先还原 */
  const text = String(zh).replace(/\\n/g, '\n');
  const blocks = [];
  const seen = new Set();
  for (const raw of text.split(/\n+/)) {
    const line = raw.trim();
    if (!line) continue;
    /* [计] 报警信号 这类领域标注对学英语没什么用，整行跳过 */
    if (/^\[[^\]]*\]/.test(line)) continue;
    const m = line.match(/^([A-Za-z]{1,4})\.\s*(.*)$/);
    const pos = m ? fixPos(m[1]) : '';
    const body = m ? m[2] : line;
    const items = body
      .split(/[；;，,、]/)
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 3);
    if (!items.length) continue;
    /* 同一词性只留第一块：wander 的 v. 游荡 / v. 在...漫游 意思几乎一样 */
    if (pos && seen.has(pos)) continue;
    if (pos) seen.add(pos);
    blocks.push((pos ? pos + ' ' : '') + items.join(', '));
    if (blocks.length >= 3) break;
  }
  return blocks.join(' | ').slice(0, 100);
}

const HAN_RE = /[\u4e00-\u9fa5]/;
const WORD_KEY_RE = /^[a-z][a-z'-]{1,24}$/;
/* 2–3 词短语：每一段都得像单词键，且整体只用单空格分隔 */
const PHRASE_KEY_RE = /^[a-z][a-z'-]*(?: [a-z][a-z'-]*){1,2}$/;
const HIGH = /\b(zk|gk|cet4|cet6|ky|toefl|ielts)\b/;

function rankOf(row, iBnc, iFrq) {
  const bnc = parseInt(row[iBnc] || '0', 10) || 999999;
  const frq = parseInt(row[iFrq] || '0', 10) || 999999;
  return Math.min(bnc, frq);
}
function order(a, b) {
  return b.high - a.high || a.rank - b.rank || (a.word < b.word ? -1 : 1);
}

/* 表头 → 列号，缺列就返回 -1（word / translation 是必需的） */
function columns(head) {
  const col = (name) => head.indexOf(name);
  return { word: col('word'), zh: col('translation'), tag: col('tag'), bnc: col('bnc'), frq: col('frq') };
}

function buildDict(rows, opts) {
  const limit = (opts && opts.limit) || LIMIT;
  const phraseLimit = opts && opts.phrases !== undefined ? opts.phrases : PHRASE_LIMIT;
  const head = rows[0] || [];
  const c = columns(head);
  if (c.word < 0 || c.zh < 0) {
    const err = new Error('ecdict.csv 的表头和预期不一样：' + head.join(','));
    err.code = 'BAD_HEAD';
    throw err;
  }
  const words = {};
  let candidates = 0;
  const picked = [];
  for (let i = 1; i < rows.length; i++) {
    const r = rows[i];
    const word = (r[c.word] || '').trim();
    if (!WORD_KEY_RE.test(word)) continue;
    const zh = clean(r[c.zh]);
    if (!zh) continue;
    candidates++;
    picked.push({ word, zh, high: HIGH.test(r[c.tag] || '') ? 1 : 0, rank: rankOf(r, c.bnc, c.frq) });
  }
  picked.sort(order);
  let n = 0;
  for (const p of picked) {
    if (n >= limit) break;
    if (Object.prototype.hasOwnProperty.call(words, p.word)) continue;
    words[p.word] = p.zh;
    n++;
  }
  /* 第二轮：短语。必须先有词表，才能判断「每个词都认得」 */
  let phrases = 0;
  if (phraseLimit > 0) {
    const ph = [];
    for (let i = 1; i < rows.length; i++) {
      const r = rows[i];
      const word = (r[c.word] || '').trim().toLowerCase();
      if (!PHRASE_KEY_RE.test(word)) continue;
      const parts = word.split(' ');
      let known = true;
      for (const p of parts) {
        if (!Object.prototype.hasOwnProperty.call(words, p)) {
          known = false;
          break;
        }
      }
      if (!known) continue;
      const zh = clean(r[c.zh]);
      /* 短语只收真有中文的：有些条目是英文解释或音标，收进来只是白占体积 */
      if (!zh || !HAN_RE.test(zh)) continue;
      ph.push({ word, zh, high: HIGH.test(r[c.tag] || '') ? 1 : 0, rank: rankOf(r, c.bnc, c.frq) });
    }
    ph.sort(order);
    for (const p of ph) {
      if (phrases >= phraseLimit) break;
      if (Object.prototype.hasOwnProperty.call(words, p.word)) continue;
      words[p.word] = p.zh;
      phrases++;
    }
    return { words, wordCount: n, phraseCount: phrases, candidates, phraseCandidates: ph.length };
  }
  return { words, wordCount: n, phraseCount: 0, candidates, phraseCandidates: 0 };
}

function main() {
  if (!fs.existsSync(SRC)) {
    console.log('没有找到 ' + path.relative(process.cwd(), SRC));
    console.log('从 https://github.com/skywind3000/ECDICT 拿 ecdict.csv 放进 data/ 再跑一次。');
    console.log('（应用不依赖这份词典：没有 data/dict.json 时词块只显示内置词表里的意思。）');
    return;
  }
  const t0 = Date.now();
  const rows = parseCsv(fs.readFileSync(SRC, 'utf8'));
  let built;
  try {
    built = buildDict(rows, {});
  } catch (e) {
    console.error(e.message);
    process.exitCode = 1;
    return;
  }
  const out = { v: 1, note: 'ECDICT 精简词表（MIT）：词 → 中文释义，含常见 2–3 词搭配', words: built.words };
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(out));
  const size = fs.statSync(OUT).size;
  const mb = (size / 1048576).toFixed(2);
  console.log(
    '读到 ' +
      built.candidates +
      ' 个单词候选，收进 ' +
      built.wordCount +
      ' 个词；' +
      '短语候选 ' +
      built.phraseCandidates +
      ' 条，收进 ' +
      built.phraseCount +
      ' 条；' +
      path.relative(process.cwd(), OUT) +
      ' ' +
      mb +
      'MB，用时 ' +
      (Date.now() - t0) +
      'ms'
  );
}

if (require.main === module) main();
module.exports = { parseCsv, clean, buildDict, columns, WORD_KEY_RE, PHRASE_KEY_RE };
