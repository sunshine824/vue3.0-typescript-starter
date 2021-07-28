import service from '@/utils/fetch';
import qs from 'qs'

// 用户登录
export const login = (params: any): any => service({
  method: 'post',
  url: '/sys/login',
  data: params,
});