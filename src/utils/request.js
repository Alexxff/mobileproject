import axios from 'axios'
// 创建一个axios的实例,设置不同的baseURL
const instance = axios.create({
  timeout: 1000,
  baseURL: ' http://ttapi.research.itcast.cn'
})

// Add a request interceptor
instance.interceptors.request.use(function (config) {
// Do something before request is sent
  return config
}, function (error) {
// Do something with request error
  return Promise.reject(error)
})

// Add a response with interceptor
instance.interceptors.response.use(function (response) {
  // Do someting with resonse data
  return response
}, function (error) {
  // Do something with response error
  return Promise.reect(error)
})
export default instance
