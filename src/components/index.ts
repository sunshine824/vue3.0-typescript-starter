import type { App } from 'vue'
import Footer from './Footer/index.vue'
import { GlobalHeader } from './GlobalHeader'
import UploadFile from './UploadFile/index.vue'
import MDialog from './MDialog/MDialog.vue'
import QrCode from './QrCode/QrCode.vue'
import LanguageSelect from './LanguageSelect/LanguagePopover.vue'
import SingleCutterText from './SingleCutterText/index.vue'
import CollapsePanel from './CollapsePanel/index.vue'
import CollapseItem from './CollapsePanel/CollapseItem.vue'

const components: { [key: string]: any } = {
  Footer,
  QrCode,
  MDialog,
  GlobalHeader,
  UploadFile,
  CollapseItem,
  CollapsePanel,
  LanguageSelect,
  SingleCutterText
}

export default {
  install: (app: App<Element>) => {
    Object.keys(components).forEach((key) => {
      // 在app上进行扩展，app提供 component directive 函数
      // 如果要挂载原型 app.config.globalProperties 方式
      app.component(key, components[key])
    })
  }
}
