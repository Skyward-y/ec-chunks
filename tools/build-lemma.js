#!/usr/bin/env node
/* 从 ECDICT 的 lemma.en.txt 生成词形还原表 data/lemma.json。
 *
 *  数据来源：https://github.com/skywind3000/ECDICT （MIT 许可，lemma.en.txt）
 *  用法：把 lemma.en.txt 放到 data/ 下，然后
 *        node tools/build-lemma.js
 *
 *  只保留「规则推不出来」的变形（went → go、children → child、better → good），
 *  -ed / -ing / -s 这类有规则的丢掉，表就小得多。
 */
'use strict';
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
function arg(name, def) {
  const i = args.indexOf('--' + name);
  return i >= 0 && args[i + 1] ? args[i + 1] : def;
}
const SRC = path.resolve(arg('src', path.join(__dirname, '..', 'data', 'lemma.en.txt')));
const OUT = path.resolve(arg('out', path.join(__dirname, '..', 'data', 'lemma.json')));

/* 这些变形按规则就能还原，不必进表 */
function derivable(form, lemma) {
  if (form === lemma) return true;
  if (!form.startsWith(lemma)) {
    /* y → ies / ied：carry → carries */
    if (lemma.endsWith('y') && (form === lemma.slice(0, -1) + 'ies' || form === lemma.slice(0, -1) + 'ied'))
      return true;
    /* e 结尾：make → making / made?? 只认 making、makes */
    if (lemma.endsWith('e') && (form === lemma.slice(0, -1) + 'ing' || form === lemma.slice(0, -1) + 'ed')) return true;
    /* 双写：stop → stopped */
    if (
      /[^aeiou]$/.test(lemma) &&
      (form === lemma + lemma.slice(-1) + 'ed' || form === lemma + lemma.slice(-1) + 'ing')
    )
      return true;
    return false;
  }
  const tail = form.slice(lemma.length);
  return /^(s|es|ed|d|ing|er|est|ly|ies|ied|ier|iest|ying|ness|ment)$/.test(tail);
}

function main() {
  if (!fs.existsSync(SRC)) {
    console.log('没有找到 ' + path.relative(process.cwd(), SRC));
    console.log('从 https://github.com/skywind3000/ECDICT 拿 lemma.en.txt 放进 data/ 再跑一次。');
    return;
  }
  const lines = fs.readFileSync(SRC, 'utf8').split(/\r?\n/);
  const best = new Map(); // form -> { lemma, count }
  for (const line of lines) {
    if (!line || line[0] === ';') continue;
    const m = line.match(/^([a-z][a-z'-]*)\/(\d+)\s*->\s*(.+)$/);
    if (!m) continue;
    const lemma = m[1];
    const count = parseInt(m[2], 10) || 0;
    for (const raw of m[3].split(',')) {
      const form = raw.trim().toLowerCase();
      if (!/^[a-z][a-z'-]{1,24}$/.test(form)) continue;
      if (form === lemma) continue;
      if (derivable(form, lemma)) continue;
      const old = best.get(form);
      if (!old || count > old.count) best.set(form, { lemma, count });
    }
  }
  const words = {};
  for (const [form, v] of best) words[form] = v.lemma;
  const out = { v: 1, note: 'ECDICT lemma 精简表（MIT）：不规则词形 → 原形', words };
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(out));
  const kb = Math.round(fs.statSync(OUT).size / 1024);
  console.log(
    '保留 ' + Object.keys(words).length + ' 条不规则变形；' + path.relative(process.cwd(), OUT) + ' ' + kb + 'KB'
  );
  console.log(
    '抽样：went=' + words.went + ' children=' + words.children + ' better=' + words.better + ' mice=' + words.mice
  );
}

main();
