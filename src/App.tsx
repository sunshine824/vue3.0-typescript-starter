import { defineComponent, ref } from 'vue'
import { RouterView } from 'vue-router'
import { ConfigProvider } from 'ant-design-vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'

export default defineComponent({
  name: 'App',
  components: { RouterView },
  setup() {
    const locale = zhCN
    return () => (
      <ConfigProvider locale={locale}>
        <RouterView></RouterView>
      </ConfigProvider>
    )
  },
})
