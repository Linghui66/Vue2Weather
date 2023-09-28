<template>
  <div>
    <div class="main_weather container">
      <!-- 默认插槽 -->
      <slot></slot>
      <div class="table container">

        <!-- 文字部分 -->
        <div class="words container">
          <div class="day">
            <span>今天</span><span>{{data[0].date.slice(5)}}</span><span>{{data[0].dayweather}}</span><span>风力{{data[0].daypower}}级</span>
          </div>
          <div class="day">
            <span>明天</span><span>{{data[1].date.slice(5)}}</span><span>{{data[1].dayweather}}</span><span>风力{{data[1].daypower}}级</span>
          </div>
          <div class="day">
            <span>周{{data[2].week}}</span><span>{{data[2].date.slice(5)}}</span><span>{{data[2].dayweather}}</span><span>风力{{data[2].daypower}}级</span>
          </div>
          <div class="day">
            <span>周{{data[3].week}}</span><span>{{data[3].date.slice(5)}}</span><span>{{data[3].dayweather}}</span><span>风力{{data[3].daypower}}级</span>
          </div>
        </div>

        <!-- echarts图 -->
        <div class="draw container">
          <v-chart :option='option'></v-chart>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { getCityCode, preWeatherData } from '../../api/index.js'

export default {
  props: ['rtdata'],

  data () {
    return {
      option: null,
      data: [],
      wtdata: [],
      // 早上和晚上分别的温度
      morntemp: [],
      nigtemp: []
    }
  },

  methods: {
    init () {
      this.option = {
        backgroundColor: '#004e71',
        grid: {
          width: 870,
          height: 120,
          top: 20,
          right: 130,
          left: 130
        },
        legend: {},
        xAxis: {
          show: false,
          type: 'category',
          boundaryGap: false
        },
        yAxis: {
          show: false,
          type: 'value'
        },
        series: [
          {
            type: 'line',
            data: this.morntemp,
            label: {
              show: true,
              fontSize: 12,
              // fontWeight: 'bold',
              position: 'top',
              color: 'white',
              formatter: '白{c}℃'
            }
          },
          {
            type: 'line',
            data: this.nigtemp,
            label: {
              show: true,
              fontSize: 12,
              // fontWeight: 'bold',
              position: 'bottom',
              color: 'white',
              formatter: '晚{c}℃'
            }
          }
        ]
      }
    }
  },

  async mounted () {
    const city = this.rtdata
    const code = await getCityCode(city)
    // 拿到天气数据
    const weather = await preWeatherData(code.geocodes[0].adcode)
    // 预测数据
    this.data = weather.forecasts[0].casts
    // 调整第一行星期几的数字 加上调整 早上和晚上的温度数据
    this.data.forEach((item) => {
      if (item.week === '1') { item.week = '一' }
      if (item.week === '2') { item.week = '二' }
      if (item.week === '3') { item.week = '三' }
      if (item.week === '4') { item.week = '四' }
      if (item.week === '5') { item.week = '五' }
      if (item.week === '6') { item.week = '六' }
      if (item.week === '7') { item.week = '日' }
      this.morntemp.push(item.daytemp)
      this.nigtemp.push(item.nighttemp)
    })
    this.init()
    /* console.log(this.morntemp)
    console.log(this.nigtemp)
    console.log(this.data) */
  },
  watch: {
    async rtdata (newvalue) {
      const city = newvalue
      const code = await getCityCode(city)
      // 拿到天气数据
      const weather = await preWeatherData(code.geocodes[0].adcode)
      // 预测数据
      this.data = weather.forecasts[0].casts
      // 调整第一行星期几的数字 加上调整 早上和晚上的温度数据
      this.data.forEach((item) => {
        if (item.week === '1') { item.week = '一' }
        if (item.week === '2') { item.week = '二' }
        if (item.week === '3') { item.week = '三' }
        if (item.week === '4') { item.week = '四' }
        if (item.week === '5') { item.week = '五' }
        if (item.week === '6') { item.week = '六' }
        if (item.week === '7') { item.week = '日' }
        this.morntemp.push(item.daytemp)
        this.nigtemp.push(item.nighttemp)
      })
      this.init()
    }
  }
}
</script>

<style lang="scss" scoped>
.main_weather{
    .title{
      margin-top: 24px;
    }
    .table{
      display: grid;
      margin-top: 8px;
      padding-top: 40px;
      padding-inline: 48px;
      background-color: #004e71;
      .words{
        display: flex;
        justify-content: space-between;
        background-color: #004e71;
        gap: 1.5rem;
        .day{
            flex: 1;
            display: flex;
            flex-direction: column;
            background-color: #004e71;
            // width: 400 1.1rem '黑体';
            text-align: center;
            line-height: 24px;
            gap: 1rem;
            span{
              flex: 1;
              background-color: #004e71;
            }
        }
      }
      .draw{
        width: 100%;
        height: 160px;
        margin-top: 40px;
      }
    }
  }
</style>
