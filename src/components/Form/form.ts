import { ElForm, FormItemProps, SelectOptionProxy } from 'element-plus'

type TreeItem = {
  value: string
  label: string
  children?: TreeItem[]
}

export type FormListItem = {
  colSpan?: number // 栅格占据的列数
  placeholder?: string
  props?: {
    className?: string
    defaultValue?: unknown // 绑定的默认值
    clearable?: boolean
    disabled?: boolean | ((data: { [key: string]: any }) => boolean)
    size?: 'large' | 'default' | 'small'
    group?: unknown // 父级特有属性，针对嵌套组件 Select、Checkbox、Radio
    child?: unknown // 子级特有属性，针对嵌套组件 Select、Checkbox、Radio
    [key: string]: unknown
  } // 表单元素特有的属性
  slots?: {
    name: string
    content: unknown
  }[] // 表单元素特有的插槽
  typeName?: 'input' | 'select' | 'date-picker' | 'time-picker' | 'switch' | 'checkbox' | 'checkbox-group' | 'checkbox-button' | 'radio-group' | 'radio-button' | 'input-number' | 'tree-select' | 'upload' | 'slider'
  styles?: {
    [key: string]: number | string
  } // 表单元素特有的样式
  replaceField?: { value: string; label: string } // select options 替换字段
  options?: {
    value?: string | number | boolean | object
    label?: string | number
    disabled?: ((data: { [key: string]: any }) => boolean) | boolean
    [key: string]: unknown
  }[]
  formItem: Partial<FormItemProps & { class: string }>
  children?: FormListItem[]
  treeData?: TreeItem[] // 只针对 'tree-select'组件
  isShow?: ((data: { [key: string]: any }) => boolean) | boolean
}

export type FConfig = {
  form: Partial<InstanceType<typeof ElForm>> // Form Attributes
  configs: FormListItem[]
}
