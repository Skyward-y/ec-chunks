/**
 * ESLint 扁平配置（eslint 9）。
 *
 * 只管「会出 bug 的规则」，线条全交给 prettier —— 这样存量代码不用大改也能跑起来，
 * 新加的代码至少不会把 undefined 变量、重复 key、写错分支这类问题带进来。
 *
 * 为什么单独有「页面脚本」一段：app.js / pwa.js / redirect.js 跑在页面里，没有 require /
 * module（sourceType: script），并且要用 window / document 这类浏览器全局。它们原先是
 * ec-chunks-fixed.html 里的内联脚本、由 tools/lint-html.js 抽出来检查；拆成独立文件后直接
 * 由 npm run lint 检查，lint:html 只负责守住「不许再写回内联」这条线。
 */
const globals = require('globals');

const correctness = {
  'no-undef': 'error',
  'no-redeclare': 'error',
  'no-dupe-keys': 'error',
  'no-dupe-args': 'error',
  'no-dupe-class-members': 'error',
  'no-duplicate-case': 'error',
  'no-unreachable': 'error',
  'no-const-assign': 'error',
  'no-func-assign': 'error',
  'no-self-assign': 'warn',
  'no-unsafe-negation': 'error',
  'no-unsafe-finally': 'error',
  'use-isnan': 'error',
  'valid-typeof': 'error',
  'no-cond-assign': 'error',
  'no-constant-condition': ['warn', { checkLoops: false }],
  'no-fallthrough': 'warn',
  'no-empty': ['warn', { allowEmptyCatch: true }],
  'no-unused-vars': ['warn', { args: 'none', varsIgnorePattern: '^_', caughtErrors: 'none' }],
  'no-async-promise-executor': 'error'
};

module.exports = [
  {
    ignores: ['node_modules/**', 'dist/**', '.npm-cache/**', '.tmp/**', '_*.js']
  },
  {
    files: ['**/*.js', '**/*.cjs'],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'commonjs',
      globals: Object.assign({}, globals.node, globals.browser)
    },
    rules: correctness
  },
  {
    /* 页面脚本：浏览器环境，没有 require / module */
    files: ['app.js', 'pwa.js', 'redirect.js', '**/*.inline.js'],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'script',
      globals: Object.assign({}, globals.browser, {
        speechSynthesis: 'readonly',
        SpeechSynthesisUtterance: 'readonly'
      })
    },
    rules: Object.assign({}, correctness, {
      'no-unused-vars': ['warn', { args: 'none', varsIgnorePattern: '^_', caughtErrors: 'none' }]
    })
  },
  {
    /* sw.js 跑在 Service Worker 全局环境里 */
    files: ['sw.js'],
    languageOptions: { globals: Object.assign({}, globals.serviceworker, globals.browser) }
  }
];
