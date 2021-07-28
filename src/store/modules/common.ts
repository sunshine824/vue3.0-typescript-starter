interface State {
  count: number
}

const initPageState = () => {
  return {
    count: 1,
  }
}

const common = {
  state: initPageState(),
  getters: {
    getCount: (state: State) => state.count,
  },
  mutations: {
    setCountNum(state: State) {
      state.count++
    },
  },
}

export default common
