import { createI18n } from 'vue-i18n'

import zh_CN from './lang/zh_CN'
import en from './lang/en_US'

const localLang = localStorage.getItem('localLang')

const i18n = createI18n({
	legacy: false,
	globalInjection: true, // 全局模式，可以直接使用 $t
	locale: localLang as string,
	messages: {
		'zh-cn': zh_CN, // 中文语言包
		en: en // 英文语言包
	}
})

export default i18n
