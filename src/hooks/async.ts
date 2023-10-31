import { Ref, ref } from 'vue'
import { GeneralFunction } from '@/types/base'

interface AsyncLoadingResponse {
  trigger: GeneralFunction
  loading: Ref<boolean>
  isError: Ref<boolean>
  error: Ref<unknown>
}

export const useAsyncLoading = (fn: GeneralFunction<Promise<unknown>>): AsyncLoadingResponse => {
  const loading = ref(true)
  const isError = ref(false)
  const error = ref()
  const trigger = async (...args: any[]) => {
    try {
      loading.value = true
      await fn(...args)
    } catch (err) {
      isError.value = true
      error.value = err
    } finally {
      loading.value = false
    }
  }
  return { trigger, loading, isError, error }
}
