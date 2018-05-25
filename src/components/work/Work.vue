<template>
  <div class="work-wrapper">
    <!--轮播组件-->
    <div class="swiper-box" ref="swiper">
      <Swiper></Swiper>
    </div>
    <!--功能区域-->
    <scroll ref="scroll" class="function-box" :data="funcList" style="bottom: 52px;width: 100%">
      <div>
        <grid :cols="4" :show-lr-borders="false">
          <grid-item v-for="(func, index) in funcList" :key="index" :link="func.link" :label="func.funcName">
            <img slot="icon" :src="func.icon">
          </grid-item>
        </grid>
      </div>
    </scroll>
    <router-view class="cover"></router-view>
  </div>
</template>

<script>
  import Swiper from '@/base/swiper/Swiper'
  import Tabbar from '@/base/tabbar/Tabbar'
  import Scroll from '@/base/scroll/Scroll'
  import { Grid, GridItem } from 'vux'

  const tmpConfig = [
    { funcName: '办公用品', link: '/home/0/work/suppliesHome/suppliesClassify', icon: require('./../../assets/img/work/supliesLogo.png') },
    { funcName: '问卷调查', link: '/home/0/work/questionnaire/questionnairePerson', icon: require('./../../assets/img/work/questionnaireIcon.png') },
    { funcName: '通讯录', link: '/home/0/phonebook/', icon: require('./../../assets/img/work/phoneLogo.png') },
    { funcName: '优惠商店', link: '/home/0/work/shopping/goodsList', icon: require('./../../assets/img/work/storeLogo.png') },
    { funcName: '资讯', link: '/home/0/information', icon: require('./../../assets/img/work/newLogo.png') },
    { funcName: '更多', icon: require('./../../assets/img/work/more.png') }
  ]

  export default {
    components: {
      Swiper,
      Tabbar,
      Scroll,
      Grid,
      GridItem
    },
    data () {
      return {
        funcList: tmpConfig
      }
    },
    mounted () {
      setTimeout(() => {
        this.imageHeight = this.$refs.swiper.clientHeight
        this.$refs.scroll.$el.style.top = `${this.imageHeight}px`
      })
    },
    methods: {
    }
  }
</script >

<style lang="scss" scoped>
  .work-wrapper{
    height: 100%;
    .swiper-box{
      position: relative;
    }
    .function-box{
      font-family: kuzhanziti;
      position: fixed;
      /*top: 0px;*/
      overflow: auto;
      padding-bottom: 53px;
      .weui-grid:before{
        border: 1px solid #D9D9D9!important;
      }
      .weui-grid:after{
        border: 1px solid #D9D9D9!important;
      }
    }
  }
</style>
