<template>
  <div class="home-wrapper">
    <!--轮播组件-->
    <div class="swiper-box">
      <Swiper></Swiper>
    </div>
    <!--功能区域-->
    <div class="function-box">
      <div>
        <grid :cols="4" show-lr-borders="true" show-vertical-dividers="true">
          <grid-item v-for="i in 30" :key="i" label="小程序">
            <img slot="icon" src="@/assets/img/work/funcIcon.png">
          </grid-item>
        </grid>
      </div>
    </div>
    <!--底部标签页-->
    <div class="tabbar-box">
      <Tabbar></Tabbar>
    </div>
  </div>
</template>

<script>
  import Swiper from '@/base/swiper/Swiper'
  import Tabbar from '@/base/tabbar/Tabbar'
  import { Grid, GridItem } from 'vux'

  export default {
    components: {
      Swiper,
      Tabbar,
      Grid,
      GridItem
    }
  }
</script >

<style lang="scss" scoped>
  .home-wrapper{
    display: flex;
    flex-direction: column;
    height: 100%;
    .swiper-box{
      flex: 0 1 auto;
    }
    .function-box{
      flex: 1 0 300px;
      overflow: auto;
      padding-bottom: 53px;
    }
    .tabbar-box{
      flex: none;
    }
  }
</style>
