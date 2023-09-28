import request from './axios'
// 头部数据请求方法
export const getHeaderData = () => { return request.get('/ip?key=b09713a50a3392c63319fa6e69740ad5') }
// 获取城市的adcode值
export const getCityCode = (city) => { return request.get(`/geocode/geo?address=${city}&key=b09713a50a3392c63319fa6e69740ad5`) }
// 获取实时数据
export const getHeaderDataWeather = (adcode) => { return request.get(`/weather/weatherInfo?city=${adcode}&key=b09713a50a3392c63319fa6e69740ad5&extensions=base`) }
// 获取预测数据
export const preWeatherData = (adcode) => { return request.get(`/weather/weatherInfo?city=${adcode}&key=b09713a50a3392c63319fa6e69740ad5&extensions=all`) }
