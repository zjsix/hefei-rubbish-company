import axios from 'axios'
import {
  Message
} from 'element-ui'
import { showLoading, hideLoading } from '@/untils/loading';
const service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? "http://122.114.222.162/api" : '/api',
  timeout: 1000 * 10,
  withCredentials: true
})

service.interceptors.request.use(
  config => {
    showLoading()
    config.headers['Chrome'] = 'Chrome/94.0.4606.71'
    return config
  },
  error => {
    return Promise.reject(error)
  }
)


service.interceptors.response.use(
  response => {
    hideLoading()
    const res = response.data
    if (response.status !== 200) {
      Message.error('网络错误！')
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      if (res.errorCode == 0) {
        return Promise.resolve(handlePage(res))
      }
      Message.error(res.msg)
      return Promise.reject(res)
    }
  },
  error => {
    hideLoading()
    Message.error(error.msg || '网络错误！')
    return Promise.reject(error)
  }
)

function handlePage(res) {
  if (res.page && res.data.length) {
    res.data.forEach((i, index) => {
      i.xh = (res.page.pageNum - 1) * res.page.pageSize + index + 1
    })
  }
  return res
}

export default service