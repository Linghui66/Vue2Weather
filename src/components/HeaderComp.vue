<template>
  <!-- 头部 -->
    <div class="weather">
      <div class="nav">
      <a href="#"><p>新中地天气</p></a>
      <div class="header_item">
        <h4>黄冈市</h4>
        <span>实时天气</span>
        <span>东北风</span>
      </div>
      <div class="header_fac">
        <span>i1</span>
        <span>i2</span>
        </div>
    </div>
    </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.weather{
  box-shadow: 3px 1px 15px #222 ;
  .nav{
  display: flex;
  justify-content: space-between;
  margin-inline: 42px;
  padding: 24px 160px;
  gap: 1rem;
  a{
    p{
      font: 100 1.5rem '黑体';
      // font-size: 1.5rem;
      line-height: 2rem;
    }
  }
  .header_item{
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    h4{
      font-size: 1.125rem;
      line-height: 1.75rem;
    }
    span{
      font-size: .875rem;
      line-height: 1.25rem;
    }
  }
  .header_fac{
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  }
}
</style>
