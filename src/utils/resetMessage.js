import { message } from 'ant-design-vue'
import notification from 'ant-design-vue/es/notification'

const Message = (options) => {
  message.destroy()
  message[options.type](options)
}

const Notification = (options) => {
  notification.destroy()
  notification[options.type](options)
};

['success', 'info', 'warning', 'error', 'loading'].forEach((type) => {
  Message[type] = (options) => {
    if (typeof options === 'string') {
      options = {
        content: options,
      }
    }
    options.type = type
    return Message(options)
  }
});

['success', 'info', 'warning', 'error', 'loading', 'warn', 'open'].forEach(
  (type) => {
    Notification[type] = (options) => {
      if (typeof options === 'string') {
        options = {
          message: '温馨提示',
          description: options,
        }
      }
      options.type = type
      return Notification(options)
    }
  },
)

export { Message, Notification }
