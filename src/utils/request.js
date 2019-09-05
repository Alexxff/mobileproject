import axios from 'axios'
import JSONbig from 'json-bigint'
import store from '@/store'
// 创建一个axios的实例,设置不同的baseURL
const instance = axios.create({
  timeout: 5000,
  baseURL: ' http://ttapi.research.itcast.cn'
})
// 获取服务器返回的数据,并且是在处理数据之前使用
// transformResponse 是在响应拦截器之前执行
instance.defaults.transformResponse = [function (data) {
  try {
    return JSONbig.parse(data)
  } catch (err) {
  // 无法转换的数据直接原样返回
    return data
  }
}
]
// Add a request interceptor
instance.interceptors.request.use(function (config) {
  // config.headers
  // console.login(config)
// Do something before request is sent
// 判断是否有登录状态
// 注意,此处死一个普通的Js模块,不是组件,要导入store
  if (store.state.user) {
  // 如果登录状态请求的时候,自动携带token'
    config.headers.Authorization = `Bearer ${store.state.user.token}`
  }
  return config
}, function (error) {
// Do something with request error
  return Promise.reject(error)
})

// Add a response with interceptor
instance.interceptors.response.use(function (response) {
  // console.log(response)
  // Do someting with resonse data
// 接口返回的数据中都有data,在此处统一返回接口返回的data
// 如果接口返回的数据中没有data,此时返回axios响应对象的data属性
  return response.data.data || response.data
}, function (error) {
  // Do something with response error
  return Promise.reect(error)
})
export default instance
