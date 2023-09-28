<template>
  <div>
    <!-- 遮罩 -->
    <div :class="alert?'mask':'nmask'"></div>

    <!-- 弹框 -->
    <div class="tanchuang" :class="alert?'yalert':'nalert'">
      <h2>关于:</h2>
      <p>这个应用可以用来追踪你选择城市的当前天气</p>
      <h2>如何使用:</h2>
      <p>1.点击搜索框输入你希望追踪的城市<br>2.在搜索结果中选中一个城市，你将获取当地最新的天气<br>3.点击右侧的＋号可以将追踪城市的天气情况保存在首页</p>
      <h2>移除城市:</h2>
      <p>如果你不想在首页关注某个城市,可以通过底部的按钮删除它</p>
      <button @click="alert = false" class="btn">关闭</button>
    </div>

    <!-- 头部 -->
    <div class="fix">
      <div class="weather">
        <div class="nav container">

          <!-- 标志 -->
          <a href="#" @click="tohome"><i class="fa-solid fa-sun"></i><p>新中地天气</p></a>
          <div class="header_item">
            <h4>{{data.city}}</h4>
            <span>实时天气：{{wtdata.weather}}{{wtdata.temperature}} {{wtdata.daytemp}}℃</span>
            <span>{{wtdata.winddirection}}风{{wtdata.windpower}}级</span>
          </div>

          <!-- 字体图标 -->
          <div class="header_fac">
            <span @click="alert = true"><i class="fa-solid fa-circle-info"></i></span>
            <slot name="add"></slot>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHeaderData, getCityCode, getHeaderDataWeather } from '../../api/index.js'

export default {
  data () {
    return {
      alert: false,
      data: [],
      wtdata: []
    }
  },

  async mounted () {
    // 拿到header请求的数据
    this.data = await getHeaderData()
    // 拿到天气数据
    const code = await getCityCode(this.data.city)
    const weather = await getHeaderDataWeather(code.geocodes[0].adcode)
    // 实时数据
    this.wtdata = weather.lives[0]
    /* console.log(this.data)
    console.log(code)
    console.log(weather) */
  },

  methods: {
    // 太阳图标回到home页
    tohome () {
      this.$router.push('/weather')
    }
  }
}
</script>

<style lang="scss" scoped>
.tanchuang{
  position: absolute;
  width: 330px;
  height: 296px;
  margin-top: 128px;
  left: 40%;
  padding: 16px;
  background-color: #fff;
  transition: all 1s;
  z-index: 999;
  h2{
    height: 20px;
    background-color: #fff;
    color: black;
    font: 400 1rem '黑体';
  }
  p{
    margin-bottom: 16px;
    background-color: #fff;
    color: black;
    font: 100 2px '黑体';
  }
  .btn{
    width: 72px;
    height: 32px;
    margin-top: 10px;
    padding: 8px 24px;
    background-color: #00668a;
    color: white;
    font: 100 0.5rem '黑体';
    cursor: pointer;
  }
}
.yalert{
  opacity: 1;
}
.nalert{
  opacity: 0;
  z-index: -1;
}
.mask{
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgb(0 0 0 / 50%);
  z-index: 200;
  transition: all 1s;
}
.nmask{
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgb(0 0 0 / 0%);
  transition: all 1s;
  z-index: -1;
}
.fix{
  position: sticky;
  top: 0;
  z-index: 100;
}
.weather{
  box-shadow: 0px 1px 5px rgb(57, 55, 55);
  .nav{
    width: 1536px;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    padding: 24px 160px;
    gap: 1rem;
  a{
    display: flex;
    align-items:center;
    gap: 0.7rem;
    i{
      font-size: 24px;
    }
    p{
      font: 100 1.5rem '黑体';
      // font-size: 1.5rem;
      line-height: 2rem;
    }
  }
  .header_item{
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    h4{
      font: 100 1.125rem '黑体';
      line-height: 1.75rem;
    }
    span{
      font-size: 0.875rem;
      line-height: 1.25rem;
    }
  }
  .header_fac{
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 0.75rem;
    span{
      i{
        font-size: 20px;
        &:hover{
        color: #085976;
        transition: all 0.5s;
        }
      }
    }
  }
}
}
</style>
