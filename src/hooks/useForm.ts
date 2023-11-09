import { ref } from 'vue'
import type { FConfig } from '@/components/Form/form'
import { cloneDeep } from 'lodash'

type SelectOption = {
  value?: string | number | boolean | object
  label?: string | number
  disabled?: ((data: { [key: string]: any }) => boolean) | boolean
  [key: string]: unknown
}[]

type TreeItem = {
  value: string
  label: string
  children?: TreeItem[]
}

export const useForm = (formConfig: FConfig) => {
  const model = ref<{ [key: string]: any }>({})
  const config = ref<FConfig>(formConfig)

  const getFormItem = (key: string) => {
    return config['value']?.configs.find((item) => item.formItem.prop == key)
  }
  /**
   * 修改select组件options
   * @param key 对应formItem prop
   * @param options 下拉选项
   */
  const changeSelectOptions = (key: string, options: SelectOption) => {
    const formItem = getFormItem(key)
    if (formItem) {
      formItem.options = options
    }
  }

  /**
   * 修改tree-select组件treeData
   * @param key 对应formItem prop
   * @param options 下拉选项
   */
  const changeTreeSelectOptions = (key: string, options: TreeItem[]) => {
    const formItem = getFormItem(key)
    if (formItem) {
      formItem.treeData = options
    }
  }

  // 构建model绑定数据
  const initModel = () => {
    const configs = config['value']?.configs
    if (configs.length) {
      const m: { [key: string]: any } = {}
      configs.map((item) => {
        if (!item.children?.length) {
          m[item.formItem.prop as string] = item.props?.defaultValue
        } else {
          item.children.map((child) => {
            m[child.formItem.prop as string] = child.props?.defaultValue
          })
        }
      })
      model.value = cloneDeep(m)
    }
  }

  initModel()

  return { config, model, changeSelectOptions, changeTreeSelectOptions }
}
