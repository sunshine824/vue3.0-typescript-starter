import { PiniaPluginContext } from 'pinia'
import { PersistStrategy } from '../pinia-persist'

type Store = PiniaPluginContext['store']
type PartialState = Partial<Store['$state']>

// 更新本地缓存
export const updateStorage = (strategy: PersistStrategy, store: Store) => {
  const storage = strategy?.storage || sessionStorage
  const paths = strategy?.paths || []
  if (strategy.key) {
    // 判断是否按照模块缓存
    const state = paths.reduce((obj, key) => {
      obj[key] = store.$state[key]
      return obj
    }, {} as PartialState)
    storage.setItem(strategy.key, JSON.stringify(state))
  } else {
    // 单个缓存
    paths.forEach((key) => {
      const state = store.$state[key]
      storage.setItem(key, JSON.stringify(state))
    })
  }
}

export default ({ options, store }: PiniaPluginContext): void => {
  // 判断插件功能是否开启
  if (options.persist?.enabled) {
    // 默认策略实例
    const defaultStrategy = [
      {
        key: store.$id,
        storage: sessionStorage,
        paths: []
      }
    ]

    const strategies = options.persist?.strategies?.length ? options.persist?.strategies : defaultStrategy

    strategies.forEach((strategy) => {
      const storage = strategy?.storage || sessionStorage
      const paths = strategy?.paths || []
      if (strategy.key) {
        const result = storage.getItem(strategy.key)
        result && store.$patch(JSON.parse(result))
      } else {
        paths.forEach((key) => {
          const result = storage.getItem(key)
          if (result) {
            const obj: { [key: string]: any } = {}
            obj[key] = JSON.parse(result)
            // 同步更新store数据
            store.$patch(obj)
          }
        })
      }
    })

    // 监听state变化，同步更新storage
    store.$subscribe(() => {
      strategies.forEach((strategy) => {
        updateStorage(strategy, store)
      })
    })
  }
}
