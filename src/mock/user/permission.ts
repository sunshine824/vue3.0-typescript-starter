import Mock from 'mockjs'
import { Result } from '../result'

const BaseUrl = import.meta.env.VITE_API_BASE_URL as string

const Roles = [
  {
    url: 'database',
    name: '数据库配置',
    icon: 'icon-zichan',
  },
  {
    url: 'eoms',
    name: '运维配置',
    icon: 'icon-yunwei1',
    list: [
      {
        name: '故障处理方案',
        url: 'eoms/fault',
        icon: '',
      },
      {
        name: '告警模板管理',
        url: 'eoms/alarm',
        icon: '',
      },
    ],
  },
  { name: '物联管理', url: 'smart', icon: 'icon-wulianwang' },
]

Mock.mock(`${BaseUrl}/navPerson`, 'get', () => {
  const result = new Result()
  const menuList: StoreState.Role[] = Roles
  result.data = {
    menuList,
    permissions: [],
  }
  return result
})
