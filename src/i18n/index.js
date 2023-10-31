import { createI18n } from 'vue-i18n'
import messages from './lang'

const localLang = localStorage.getItem('languageKey') || 'zh-cn'

const i18n = createI18n({
  messages,
  legacy: false,
  globalInjection: true, // 全局模式，可以直接使用 $t
  locale: localLang
})

export default i18n
