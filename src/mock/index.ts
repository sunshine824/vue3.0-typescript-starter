import Mock from 'mockjs'
import '@/mock/user/login'
import '@/mock/user/permission'
import '@/mock/user/logout'

// 设置全局延时
Mock.setup({
	timeout: '100'
})
