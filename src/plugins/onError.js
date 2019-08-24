import { message } from 'antd'

export default {
  onError(e) {
    e.preventDefault()
    console.log(e)
    if (e.success == false) {
      message.error(e.msg == undefined ? '出错了，请联系管理员' : e.msg)
    }
  },
}
