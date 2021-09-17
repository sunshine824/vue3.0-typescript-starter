import Mock from 'mockjs'
import { Result } from '../result'

const BaseUrl = import.meta.env.VITE_API_BASE_URL as string

const Roles = [
  {
    moduleUrl: '/database', // 模块地址
    url: '/database', // 路由地址
    name: '数据库配置',
    icon: 'icon-zichan',
  },
  {
    moduleUrl: '/eoms',
    url: '/eoms',
    name: '运维配置',
    icon: 'icon-yunwei1',
    list: [
      {
        name: '故障处理方案',
        moduleUrl: '/eoms/fault',
        url: 'fault',
        icon: '',
      },
      {
        moduleUrl: '/eoms/alarm',
        url: 'alarm',
        name: '告警模板管理',
        icon: '',
      },
    ],
  },
  {
    moduleUrl: '/smart',
    url: '/smart',
    name: '物联管理',
    icon: 'icon-wulianwang',
  },
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
