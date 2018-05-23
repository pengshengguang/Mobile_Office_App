<template>
  <div class="personal-main-wrapper">
    <tab :line-width=2 active-color='#d33a31' v-model="index">
      <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2" @click="demo2 = item" :key="index">{{item}}</tab-item>
    </tab>
    <swiper v-model="index" :show-dots="false">
      <swiper-item>
        <div class="tab-swiper vux-center">1 Container</div>
      </swiper-item>
      <swiper-item >
        <div class="tab-swiper vux-center">暂时还没有动态哦</div>
      </swiper-item>
      <swiper-item >
        <div class="tab-swiper">
          <div class="area-box">
          <div class="head-box">个人信息</div>
          <div class="function-box">
            <div class="function">职业：人工智能工程师</div>
            <div class="function">年龄：90后 魔蝎座</div>
            <div class="function">地区：广东省 珠海市</div>
          </div>
        </div>
        </div>
        <div class="tab-swiper">
          <div class="area-box">
            <div class="head-box">个人介绍</div>
            <div class="function-box">
              <div class="function">还没有填写个人介绍</div>
            </div>
          </div>
        </div>
      </swiper-item>
    </swiper>
  </div>
</template>
<script>
  import { Tab, TabItem, Swiper, SwiperItem } from 'vux'
  const list = () => ['设置', '动态', '关于我']

  export default {
    components: {
      Tab,
      TabItem,
      Swiper,
      SwiperItem
    },
    data () {
      return {
        list2: list(),
        demo2: '美食',
        index: 0
      }
    },
    methods: {
      onItemClick (index) {
        console.log('on item click:', index)
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '~vux/src/styles/1px.less';
  @import '~vux/src/styles/center.less';

  .box {
    padding: 15px;
  }
  .tab-swiper {
    padding-top: 10px;
  }
  .active-6-1 {
    color: rgb(252, 55, 140) !important;
    border-color: rgb(252, 55, 140) !important;
  }
  .active-6-2 {
    color: #04be02 !important;
    border-color: #04be02 !important;
  }
  .active-6-3 {
    color: rgb(55, 174, 252) !important;
    border-color: rgb(55, 174, 252) !important;
  }
</style>

<style lang="scss">
  .personal-main-wrapper{
    height: 100%;
    display: flex;
    flex-direction: column;
    .vux-tab{}
    .vux-slider{
      overflow: auto;
      flex: auto;
      display: flex;
      flex-direction: column;
      .vux-swiper{
        overflow: auto;
        flex: auto;
        .vux-swiper-item{
          background-color: #f9f9f9;
          .tab-swiper{
            .area-box{
              background-color: #f9f9f9;
              .head-box{
                font-size: 14px;
                border-left: 2px solid #d33a31;
                padding-left: 10px;
                font-weight: 600;
              }
              .function-box{
                /*border: 1px solid #009de6;*/
                padding-top: 10px;
                .function{
                  font-size: 14px;
                  padding: 1px 0 10px 12px;
                  /*border-bottom: 1px solid #605F5F;*/
                }
              }
            }
          }
        }
      }
    }
  }
</style>
