import { Ref, ref } from 'vue'
import { ElIcon, ElButton } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import type { FConfig } from '@/components/Form/form'

export const useForm = (model: Ref<{ [key: string]: any }> = ref({}), events?: any) => {
  const config = ref<FConfig>({
    form: {
      labelWidth: '140px'
    },
    configs: [
      // 输入框
      {
        colSpan: 12,
        typeName: 'input',
        placeholder: 'Please enter content',
        props: {
          defaultValue: '',
          clearable: true
        },
        slots: [
          {
            name: 'suffix',
            content: () => (
              <ElIcon class="el-input__icon">
                <Search />
              </ElIcon>
            )
          }
        ],
        formItem: {
          prop: 'name',
          label: 'Activity name',
          rules: [
            {
              required: true,
              message: 'Please enter content',
              trigger: 'blur'
            }
          ]
        }
      },
      // 选择器
      {
        colSpan: 12,
        typeName: 'select',
        placeholder: 'Please select content',
        props: {
          defaultValue: undefined,
          group: {
            clearable: true,
            onChange: events.changeSelect
          },
          child: {}
        },
        replaceField: { value: 'key', label: 'title' },
        options: [
          { key: 'shanghai', title: 'Zone one' },
          { key: 'beijing', title: 'Zone two' }
        ],
        styles: {
          width: '100%'
        },
        formItem: {
          prop: 'region',
          label: 'Activity zone',
          rules: [
            {
              required: true,
              message: 'Please select Activity zone',
              trigger: 'change'
            }
          ]
        }
      },
      {
        colSpan: 24,
        formItem: {
          required: true,
          label: 'Activity time'
        },
        children: [
          // 日期选择器
          {
            colSpan: 12,
            typeName: 'date-picker',
            placeholder: 'Pick a day',
            props: {
              type: 'datetime',
              clearable: true,
              valueFormat: 'YYYY-MM-DD HH:mm:ss'
            },
            styles: { width: '100%' },
            formItem: {
              prop: 'date1',
              rules: [
                {
                  type: 'date',
                  required: true,
                  message: 'Please pick a date',
                  trigger: 'change'
                }
              ]
            }
          },
          // 时间选择器
          {
            colSpan: 12,
            typeName: 'time-picker',
            placeholder: 'Pick a time',
            props: {
              disabled: (data = {}) => {
                return !model.value.date1
              },
              clearable: true
            },
            styles: { width: '100%' },
            formItem: {
              prop: 'date2',
              rules: [
                {
                  type: 'date',
                  required: true,
                  message: 'Please pick a time',
                  trigger: 'change'
                }
              ]
            }
          }
        ]
      },
      // 开关
      {
        colSpan: 24,
        typeName: 'switch',
        props: {
          defaultValue: false
        },
        formItem: {
          prop: 'delivery',
          label: 'Instant delivery'
        }
      },
      // 多选框
      {
        colSpan: 12,
        typeName: 'checkbox-group',
        props: {
          group: {},
          child: {}
        },
        formItem: {
          prop: 'type',
          label: 'Activity type',
          rules: [
            {
              type: 'array',
              required: true,
              message: 'Please select at least one activity type',
              trigger: 'change'
            }
          ]
        },
        // replaceField: { value: 'value', label: 'label' },
        options: [
          { value: 'shanghai', label: 'Zone one' },
          { value: 'beijing', label: 'Zone two' }
        ]
      },
      // 多选按钮框
      {
        colSpan: 12,
        typeName: 'checkbox-button',
        props: {
          group: {},
          child: {}
        },
        formItem: {
          prop: 'button',
          label: 'Activity button',
          rules: [
            {
              type: 'array',
              required: true,
              message: 'Please select at least one activity type',
              trigger: 'change'
            }
          ]
        },
        // replaceField: { value: 'value', label: 'label' },
        options: [
          { value: 'shanghai', label: 'Zone one' },
          { value: 'beijing', label: 'Zone two' }
        ]
      },
      // 单选框
      {
        colSpan: 12,
        typeName: 'radio-group',
        props: {},
        formItem: {
          prop: 'resource',
          label: 'Resources',
          rules: [
            {
              required: true,
              message: 'Please select activity resource',
              trigger: 'change'
            }
          ]
        },
        options: [
          { value: 'shanghai', label: 'Sponsorship' },
          { value: 'beijing', label: 'Venue' }
        ]
      },
      // 单选按钮框
      {
        colSpan: 12,
        typeName: 'radio-button',
        props: {},
        formItem: {
          prop: 'resourceButton',
          label: 'Resources button',
          rules: [
            {
              required: true,
              message: 'Please select activity resource',
              trigger: 'change'
            }
          ]
        },
        options: [
          { value: 'shanghai', label: 'Sponsorship' },
          { value: 'beijing', label: 'Venue' }
        ]
      },
      // 文本域
      {
        colSpan: 24,
        typeName: 'input',
        placeholder: 'Please enter content',
        formItem: {
          prop: 'desc',
          label: 'Activity form'
        },
        props: {
          rows: 5,
          type: 'textarea',
          clearable: true
        },
        isShow: (data = {}) => {
          return model.value.region == 'shanghai'
        }
      },
      // 文件上传
      {
        colSpan: 24,
        typeName: 'upload',
        formItem: {
          prop: 'fileName',
          label: 'Upload File',
          rules: [
            {
              required: true,
              message: 'Please select at least one activity type',
              trigger: 'change'
            }
          ]
        },
        props: {
          httpRequest: events.httpRequest
        },
        slots: [
          {
            name: 'default',
            content: () => <ElButton type="primary">上传</ElButton>
          },
          {
            name: 'tip',
            content: () => <span style="margin-left:10px">jpg/png files with a size less than 500KB</span>
          }
        ]
      },
      // 滑块
      {
        colSpan: 16,
        typeName: 'slider',
        props: {
          onChange: (val: number) => {
            model.value.number = val
          }
        },
        formItem: {
          label: 'Activity slider',
          prop: 'slider',
          rules: [
            {
              required: true,
              message: 'Please enter content',
              trigger: 'change'
            }
          ]
        }
      },
      // 数字输入框
      {
        colSpan: 8,
        typeName: 'input-number',
        formItem: {
          prop: 'number',
          label: 'Activity number'
        },
        props: {
          min: 1,
          max: 100,
          onChange: (val: number) => {
            model.value.slider = val
          }
        }
      },
      // 树形选择器
      {
        colSpan: 24,
        typeName: 'tree-select',
        placeholder: 'Please select content',
        formItem: {
          prop: 'tree',
          label: 'Activity tree'
        },
        styles: { width: '100%' },
        props: {
          multiple: true,
          showCheckbox: true
        },
        treeData: [
          {
            value: '1',
            label: 'Level one 1',
            children: [
              {
                value: '1-1',
                label: 'Level two 1-1',
                children: [
                  {
                    value: '1-1-1',
                    label: 'Level three 1-1-1'
                  }
                ]
              }
            ]
          },
          {
            value: '2',
            label: 'Level one 2',
            children: [
              {
                value: '2-1',
                label: 'Level two 2-1',
                children: [
                  {
                    value: '2-1-1',
                    label: 'Level three 2-1-1'
                  }
                ]
              },
              {
                value: '2-2',
                label: 'Level two 2-2',
                children: [
                  {
                    value: '2-2-1',
                    label: 'Level three 2-2-1'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  })
  return { config, model }
}
