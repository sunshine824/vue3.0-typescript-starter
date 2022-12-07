import Mock from 'mockjs'
import { Result } from '../result'

const BaseUrl = import.meta.env.VITE_API_BASE_URL as string

const Roles = [
  {
    url: '/userManage',
    name: '/userManage',
    title: '用户管理',
    icon: 'icon-yonghuguanli',
  },
  {
    url: '/authManage',
    name: '/authManage',
    title: '权限管理',
    icon: 'icon-yonghuguanli',
    list: [
      {
        url: '/authManage/menu',
        name: 'authManage/menu',
        title: '菜单管理',
        icon: 'icon-shituzhushitu',
      },
      {
        url: '/authManage/role',
        name: 'authManage/role',
        title: '角色管理',
        icon: 'icon-shituzhushitu',
      },
    ]
  },
  {
    url: '/dataProtal', // 模块路径&访问路由
    name: '/dataProtal',
    title: '数据门户',
    icon: 'icon-index-copy',
  },
  {
    url: '/dataManage',
    name: '/dataManage',
    title: '数据管理',
    icon: 'icon-shuju',
  },
  {
    url: '/designCenter',
    name: '/designCenter',
    title: '设计中心',
    icon: 'icon-shejishi2',
    list: [
      {
        url: '/designCenter/screenManage',
        name: 'screenManage',
        title: '画面管理',
        icon: 'icon-shituzhushitu',
      },
      {
        url: '/designCenter/materialMange',
        name: 'materialMange',
        title: '素材中心',
        icon: 'icon-sucai',
        list: [
          {
            url: '/designCenter/materialMange/customControl',
            name: 'customControl',
            title: '自定义控件',
            icon: 'icon-zidingyi',
          },
          {
            url: '/designCenter/materialMange/customMaterial',
            name: 'customMaterial',
            title: '自定义素材',
            icon: 'icon-jichukongjiantubiao-gonggongxuanzekuang',
          },
        ],
      },
    ],
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
