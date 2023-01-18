import { defineComponent, ref, provide } from 'vue'
import { RouterView } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ConfigProvider } from 'ant-design-vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import enUS from 'ant-design-vue/es/locale/en_US'

import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

export default defineComponent({
  name: 'App',
  components: { RouterView },
  setup() {
    dayjs.locale('en');
    const { locale } = useI18n()
    // 语言包映射关系
    const langMap: { [key: string]: any } = { 'zh-cn': zhCN, 'en': enUS }
    // 本地缓存语言
    const localLang = localStorage.getItem('localLang') || 'zh-cn'
    // 当前使用语言包
    const currentLang = ref(langMap[localLang])

    // 切换语言
    const changeLang = (lang: string) => {
      dayjs.locale(lang)
      locale['value'] = lang
      currentLang['value'] = langMap[lang]
      localStorage.setItem('localLang', lang)
    }
    // 提供切换语言方法
    provide('changeLang', changeLang)

    return () => (
      <ConfigProvider locale={currentLang['value']}>
        <RouterView></RouterView>
      </ConfigProvider>
    )
  },
})
