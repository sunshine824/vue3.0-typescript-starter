import { ref } from 'vue'

export const useCountDown = (seconds: number, endFn: any) => {
  let timer = -1
  const second = ref(seconds || 0)

  const start = () => {
    timer = setInterval(() => {
      if (second['value'] == 0) {
        clearInterval(timer)
        timer = -1
        endFn()
      } else {
        second['value']--
      }
    }, 1000)
  }

  const clear = () => {
    clearInterval(timer)
  }
  return { start, clear, second }
}
