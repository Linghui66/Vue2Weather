import axios from 'axios' /* 引入axios */
// 创建一个实例
const request = axios.create({
  baseURL: 'https://restapi.amap.com/v3/',
  timeout: 5000
})
// 利用拦截器 （响应） 处理返回的数据
request.interceptors.response.use((res) => {
  if (res.status === 200) {
    return res.data
  }
  throw new Error('数据请求失败')
}, (err) => {
  return Promise.reject(err)
})
export default request
