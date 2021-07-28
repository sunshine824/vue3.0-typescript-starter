import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
import common from './modules/common'

export interface State {}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  modules: { common },
})
