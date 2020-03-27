import axios from 'axios'

const instance = axios.create({
  timeout: 10000
})
// post请求头设置
instance.defaults.headers.post['Content-Type'] = 'multipart/form-data'
export default instance
