import Mock from 'mockjs'
import { uuid } from '@/utils/util'
import { Result } from '../result';

const BaseUrl = import.meta.env.VITE_API_BASE_URL as string

const user = Mock.mock({
  username: 'admin',
  address: '成都市高新区天府四街'
});

Mock.mock(`${BaseUrl}/login`, 'post', ({ body }: { body: string }) => {
  const result = new Result();
  const { username, password } = JSON.parse(body);

  if (username !== 'admin' || password !== '666666') {
    result.status = false;
    result.msg = '账户名或密码错误（admin/666666）';
  } else {
    result.data = {
      userInfo: user,
      token: uuid()
    };
  }
  return result;
});
