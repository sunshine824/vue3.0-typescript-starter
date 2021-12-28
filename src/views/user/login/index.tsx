import { defineComponent, reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Form, Input, Button, Row, Col, message } from 'ant-design-vue'
import { uuid } from '@/utils/util'
import GlobalBg from '@/components/GlobalBg'
import { login } from '@/api/user.ts'

import styles from './index.module.less'

const Login = defineComponent({
  name: 'Login',
  setup(props) {
    const router = useRouter()
    const labelCol = { span: 4 }
    const wrapperCol = { span: 18, offset: 3 }
    const formRef = ref()

    let captchaPath = ref('') // 图片验证码地址

    let loading = ref(false) // 提交状态

    const formData = reactive({
      username: '', // 用户名
      password: '', // 密码
      captcha: '', // 验证码
      uuid: '', // 验证码uuid
    }) // form表单数据

    const rules = {
      username: [
        { required: true, message: '用户名不能为空', trigger: 'blur' },
      ],
      password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
      captcha: [{ required: true, message: '验证码不能为空', trigger: 'blur' }],
    } // form表单验证规则

    // 随机验证码
    const getCaptcha = () => {
      formData.uuid = uuid()
      captchaPath.value = `/dbd-authority/captcha.jpg?uuid=${formData.uuid}`
    }

    // form表单提交
    const handleFormSubmit = async () => {
      try {
        await formRef.value.validate()
        loading.value = true
        try {
          const { data } = await login(formData)
          sessionStorage.setItem('token', data.token)
          sessionStorage.setItem('userInfo', JSON.stringify(data.userInfo))
          router.push('/dataProtal')
          loading.value = false
        } catch (error) {
          loading.value = false
          getCaptcha()
        }
      } catch (error) {
        message.warning('账号:admin  密码:666666')
        console.log(error)
      }
    }

    onMounted(() => {
      getCaptcha()
    })

    const slots = {
      content: () => (
        <div class={styles['site-content__wrapper']}>
          <div class={styles['site-content']}>
            <div class={styles['login-main']}>
              <img class={styles['img']} />
              <Form
                ref={formRef}
                rules={rules}
                model={formData}
                label-col={labelCol}
                wrapper-col={wrapperCol}
              >
                <Form.Item name="username">
                  <Input
                    size="large"
                    v-model={[formData.username, 'value']}
                    placeholder="请输入用户名"
                  ></Input>
                </Form.Item>
                <Form.Item name="password">
                  <Input
                    size="large"
                    type="password"
                    v-model={[formData.password, 'value']}
                    placeholder="请输入密码"
                  ></Input>
                </Form.Item>
                {/* <Form.Item name="captcha">
                  <Row gutter={20} class={styles['captcha-row']}>
                    <Col span={16}>
                      <Input
                        size="large"
                        v-model={[formData.captcha, 'value']}
                        placeholder="请输入验证码"
                      ></Input>
                    </Col>
                    <Col span={8} class={styles['login-captcha']}>
                      <img
                        onClick={getCaptcha}
                        src={captchaPath.value}
                        style="height: 38px;"
                      />
                    </Col>
                  </Row>
                </Form.Item> */}
                <Form.Item wrapperCol={{ span: 18, offset: 3 }}>
                  <Button
                    size="large"
                    loading={loading.value}
                    onClick={handleFormSubmit}
                    class={styles['login-btn-submit']}
                    type="primary"
                  >
                    登录
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      ),
      footer: () => (
        <p class={styles['notice']}>
          建议使用Chrome浏览器（版本：
          <span style="color:#1890ff">84.0.4147.89</span>
          及以上）在分辨率为
          <span style="color:#1890ff">1920x1080</span>
          下访问本平台
        </p>
      ),
    }
    return () => (
      <GlobalBg class={styles['site-wrapper-login']} v-slots={slots}></GlobalBg>
    )
  },
})

export default Login
