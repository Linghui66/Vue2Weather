import Vue from 'vue'
import VueRouter from 'vue-router'
import Weather from '../views/Weather.vue'
import About from '../views/About.vue'
Vue.use(VueRouter)
const router = new VueRouter({
  model: history,
  routes: [{
    path: '/',
    name: 'home',
    component: Weather
  },
  {
    path: '/weather',
    name: 'weather',
    component: Weather
  },
  {
    path: '/about',
    name: 'about',
    component: About
  }
  ]
})
export default router
