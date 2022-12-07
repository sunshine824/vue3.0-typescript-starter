import dayjs from 'dayjs'
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import { ConfigProvider } from 'ant-design-vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'

import 'dayjs/locale/zh-cn'

export default defineComponent({
  name: 'App',
  components: { RouterView },
  setup() {
    const locale = zhCN
    dayjs.locale('zh-cn');
    return () => (
      <ConfigProvider locale={locale}>
        <RouterView></RouterView>
      </ConfigProvider>
    )
  },
})
