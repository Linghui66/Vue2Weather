import Vue from 'vue'
import App from './App.vue'

// 引入router
import router from './router/index.js'
// 引入elements组件与echarts
import './plugin/vue-echarts.js'
// import './plugin/elementui.js'
// 引入字体图标
import './assets/font-awesome.css'
// 引入tailwindcss
import './assets/tailwindcss.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
