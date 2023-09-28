<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <HeaderComp>
      <template v-slot:add>
          <span @click="storage" v-show="display"><i class="fa-solid fa-plus"></i></span>
      </template>
    </HeaderComp>

    <div class="main_content">
      <div class="content_title">你正在预览{{city}}的天气信息<span v-show="display">，可以通过右上角的"+"号按钮保存起来</span></div>
    </div>

    <div class="content_inf container">
      <div class="item">
        <h1>当日气温是：{{todaydata.daytemp}}摄氏度</h1>
        <h1>当日天气是：{{todaydata.dayweather}}</h1>
        <h1>当日风向是：{{todaydata.daywind}}风</h1>
        <h1>当日风力是：{{todaydata.daypower}}级</h1>
      </div>
    </div>

    <hr />

    <div class="echart container">
      <MainWeatherComp :rtdata="city"></MainWeatherComp>
    </div>

  </div>
</template>

<script>
import HeaderComp from './HeaderComp/HeaderComp.vue'
import MainWeatherComp from './MainWeatherComp/MainWeatherComp.vue'
import { preWeatherData } from '../api/index.js'

export default {
  data () {
    return {
      adcode: '',
      city: '',
      todaydata: [],
      // 字体图像和部分文字隐藏
      display: true
    }
  },

  methods: {
    // 本地存储数据
    storage () {
      localStorage.setItem(this.city, [this.adcode, this.city, this.todaydata.daytemp])
      this.display = false
    }
  },

  async mounted () {
    const reseve = this.$route.query
    this.adcode = reseve.adcode
    this.city = reseve.search
    // 实现取消显示+和span的内容
    for (let i = 0; i < localStorage.length; i++) {
      if (this.city === localStorage.key(i)) {
        this.display = false
        // 这里的return会影响后面 是退出之整个进程
        // return
      }
    }
    const data = await preWeatherData(this.adcode)
    this.todaydata = data.forecasts[0].casts[0]
  },

  components: {
    HeaderComp,
    MainWeatherComp
  }
}
</script>

<style lang="scss" scoped>
i{
  font-size: 20px;
}
.main_content{
  height: 40px;
  padding: 8px;
  background-color: #004e70;
  .content_title{
    color: white;
    text-align: center;
    line-height: 24px;
    background-color: #004e70;
    span{
      background-color: #004e70;
    }
  }
}
.content_inf{
  width: 1536px;
  margin: 0 auto;
  margin-top: 24px;
  padding: 0 160px;
  .item{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;
    h1{
      display: inline-block;
      width: 100%;
      height: 24px;
      font: 400 1.1rem '黑体';
      text-align: center;
      color: white;
      line-height: 24px;
    }
  }
}
.echart{
  width: 1536px;
  padding-inline: 160px;
  margin: 3px auto;
}
hr{
  margin-top: 24px;
  border-bottom: 1px solid #1a7696;
}
</style>
