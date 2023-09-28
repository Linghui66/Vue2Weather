<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <!-- 头部 -->
    <HeaderComp/>

    <div class="main container">
      <div class="main_input container">

        <!-- input框 -->
        <input class="container" v-model="keyword" placeholder="请输入城市名称" :class="cssshow?'show1':'show2'" @click="cssshow = false" @blur="cssshow = true">

        <!-- 下面方框显示 -->
        <div class="search-content" v-show="appear">
            <ul>
                <li class="search-item pointer" v-if="show_li_one" @click="toabout()">{{listdata}}</li>
                <li class="search-item" v-else>似乎没有找到你查找的城市</li>
            </ul>
        </div>
      </div>

      <div class="main_words">
        <!-- 中间的文字 -->
        <h2 v-if="uexist">暂时没有保存过城市天气信息，请查询后点击右上角"+"号保存。</h2>

        <!-- 渲染缓存城市情况 -->
        <div class="addcity" v-else>
          <div>

            <!-- 列表循环 -->
            <div class="city_item" v-for="item in localdata" :key="item.id">
              <div class="city"><h3>{{item.city.cityname}}</h3><span>{{item.city.weather}}度</span></div>
              <div class="btn"><button @click="tolook($event)">查看</button><button @click="del($event)">删除</button></div>
            </div>

          </div>
        </div>

        <!-- 组件天气表格 -->
        <MainWeather :rtdata="whdata">
          <div class="title">近期天气</div>
        </MainWeather>

      </div>

    </div>
  </div>
</template>

<script>
// 引入获得api方法
import { getCityCode } from '../api/index'
// 头组件
import HeaderComp from './HeaderComp/HeaderComp.vue'
// 表格组件
import MainWeather from './MainWeatherComp/MainWeatherComp.vue'

export default {
  data () {
    return {
      whdata: '武汉市',
      keyword: '',
      // input框的样式显示
      cssshow: true,
      list: [],
      listdata: '',
      hasNoData: '',
      appear: false,
      show_li_one: '',
      localdata: [],

      uexist: true
    }
  },

  methods: {
    // 跳转路由
    toabout () {
      this.$router.push(`/about?adcode=${this.list.geocodes[0].adcode}&search=${this.listdata}`)
    },

    // 获取本地数据
    getlocaldata () {
      for (let i = 0; i < localStorage.length; i++) {
        const getkey = localStorage.key(i)
        const getvalue = localStorage.getItem(getkey).split(',')
        this.localdata.push({
          city: {
            id: i,
            code: getvalue[0],
            cityname: getvalue[1],
            weather: getvalue[2]
          }
        })
      }
    },

    // 查看跳转
    tolook (e) {
      const city = e.path[2].innerText.split('\n')[0]
      const data = this.localdata.find((item) => { return item.city.cityname === city })
      this.$router.push(`/about?adcode=${data.city.code}&search=${data.city.cityname}`)
    },

    // 删除
    del (e) {
      const city = e.path[2].innerText.split('\n')[0]
      this.localdata = this.localdata.filter((item) => { return item.city.cityname !== city })
      localStorage.removeItem(city)
    }
  },

  mounted () {
    this.getlocaldata()
    if (localStorage.length === 0) {
      this.uexist = true
    } else {
      this.uexist = false
    }
  },

  watch: {
    async keyword (newvalue) {
      this.list = await getCityCode(newvalue).then((res) => { return res })
      // 只有keyword改变 就显示下拉提示框
      this.appear = true
      // 如果请求成功就 显示第一条li 否则第二条 显示第二条的时候需要把原listdata清除一下
      if (this.list.status === '1') {
        this.show_li_one = true
        this.listdata = this.list.geocodes[0].city
      } else {
        this.show_li_one = false
        this.listdata = ''
      }
      // newvalue是''的时候隐藏下拉框
      if (newvalue === '') {
        this.appear = false
      }
    }
  },
  components: {
    HeaderComp,
    MainWeather
  }
}
</script>

<style lang="scss" scoped>
.main{
  width: 1536px;
  padding-inline: 160px;
  margin: 3px auto;
  .main_input{
    width: 100%;
    margin-bottom: 32px;
    padding-top: 16px;
    // 点击之后换样式
    input.show1{
      width: 100%;
      height: 40px;
      padding: 8px 4px;
      border-bottom: 1px solid white;
      color: white;
      font: 400 1.1rem '黑体';
      outline: none;
    }
    input.show2{
      width: 100%;
      height: 40px;
      padding: 8px 4px;
      border-bottom: 0px;
      box-shadow: 0px 1px 5px rgb(57, 55, 55);
      color: white;
      font: 400 1.1rem '黑体';
      outline: none;
    }
    // input框实现下拉
    .search-content{
      // 缺少过度效果
      ul{
        position: relative;
        height: 40px;
        padding: 8px 6px;
        top: 5px;
        background-color: #004e71;
        .search-item{
          // position: absolute;
          width: 100%;
          height: 24px;
          background-color: #004e71;
          line-height: 24px;
        }
        .pointer{
          cursor: pointer;
        }
      }
    }
  }
  .main_words{
    h2{
      width: 100%;
      height: 24px;
      font: 100 1.1rem '黑体';
      text-align: center;
    }
    .addcity{
      width: 100%;
      margin-top: 40px;
      .city_item{
        display: flex;
        justify-content: space-between;
        width: 100%;
        cursor: pointer;
        .city{
          display: flex;
          justify-content: space-between;
          width: 100%;
          height: 40px;
          margin-bottom: 16px;
          padding: 8px 16px;
          background-color: #004e71;
          transition: all 0.5s;
          h3,span{
            background-color: #004e71;
          }
        }
        &:hover .city{
          width: 80%;
        }
        &:hover .btn button{
          display: inline-block;
        }
        .btn{
          display: flex;
          height: 40px;
          gap: 8px;
          button{
            display: none;
            width: 80px;
            background-color: #eab308;
            color: white;
            font-size: 1.2rem;
            text-align: center;
          }
        }
      }
    }
  }
}
// 设置placehoudler 的颜色
::placeholder{
  color: #bbb;
}
</style>
