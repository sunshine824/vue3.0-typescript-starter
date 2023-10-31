interface PersistStrategy {
  key?: string
  storage?: Storage
  paths?: string[]
}
interface PersistOptions {
  enabled: true
  strategies?: PersistStrategy[]
}
declare module 'pinia' {
  interface DefineStoreOptionsBase<S, Store> {
    persist?: PersistOptions
  }
}

export { PersistOptions, PersistStrategy }
