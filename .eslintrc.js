module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  extends: ['plugin:vue/vue3-recommended', 'prettier'],
  plugins: [],
  // add your custom rules here
  rules: {}
}
