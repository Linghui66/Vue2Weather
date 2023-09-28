import Vue from 'vue'
import vcharts from 'vue-echarts'
import * as echarts from 'echarts'

Vue.prototype.$echarts = echarts

Vue.component('v-chart', vcharts)
