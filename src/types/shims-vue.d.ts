declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@*'
declare module '@/utils/*'
declare module 'crypto-js'
declare module 'spark-md5'
declare module 'qs'
declare module 'mockjs'
