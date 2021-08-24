import Mock from 'mockjs'
import { Result } from '../result';

const BaseUrl = import.meta.env.VITE_API_BASE_URL as string

Mock.mock(`${BaseUrl}/logout`, 'get', () => {
  const result = new Result();
  result.msg = '退出成功！';
  return result;
});
