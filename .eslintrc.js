/*
 * @Author: chenxin
 * @Date: 2023-06-16 18:21:07
 * @Description: 请填写简介
 */
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  parser: 'vue-eslint-parser',
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'plugin:@typescript-eslint/recommended'],
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  // eslint-plugin-vue @typescript-eslint/eslint-plugin eslint-plugin-prettier的缩写
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-extra-semi': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'vue/multi-word-component-names': [
      'error',
      {
        ignores: ['index', 'home', 'Menus', 'login', 'register', 'unzip']
      }
    ],
    'vue/html-closing-bracket-newline': 'off',
    'vue/v-on-event-hyphenation': 'off',
    'vue/html-self-closing': 'off',
    'vue/first-attribute-linebreak': 'off',
    'vue/no-setup-props-destructure': ['off'],
    'vue/no-v-html': 'off',
    'no-async-promise-executor': 'off',
    '@typescript-eslint/no-this-alias': ['off'],
    'vue/no-lone-template': 'off',
    'no-dupe-keys': 'off',
    'no-useless-escape': 'off'
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly',
    WxLogin: true
  }
}
