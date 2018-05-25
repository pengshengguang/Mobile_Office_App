<template>
  <div class="personal-main-wrapper">
    <tab :line-width=2 active-color='#d33a31' v-model="index">
      <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2" @click="demo2 = item" :key="index">{{item}}</tab-item>
    </tab>
    <swiper v-model="index" :show-dots="false">
      <swiper-item>
        <div class="tab-swiper vux-center tab1">
          <!--<div class="funcBox">-->
            <!--<img src="./../../assets/img/personal/loginOutIcon.png" alt="">-->
            <!--<span>登出系统</span>-->
          <!--</div>-->
          <!--<div class="funcBox">-->
            <!--<img src="./../../assets/img/personal/myInfoIcon.png" alt="">-->
            <!--<span>修改密码</span>-->
          <!--</div>-->
          <!--<div class="funcBox">-->
            <!--<img src="./../../assets/img/personal/modifyPasswordIcon.png" alt="">-->
            <!--<span>修改信息</span>-->
          <!--</div>-->
          <div>
            <grid :cols="4" :show-lr-borders="false">
              <grid-item v-for="(func, index) in funcList" :key="index":label="func.funcName">
                <img slot="icon" :src="func.icon" @click="goToFunc(index)">
              </grid-item>
            </grid>
          </div>
        </div>
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
  import HttpService from '@/services/HttpService'
  import { Tab, TabItem, Swiper, SwiperItem, Grid, GridItem } from 'vux'
  const list = () => ['设置', '动态', '关于我']

  const tmpConfig = [
    { funcName: '开发者', link: '/home/0/work/suppliesHome/suppliesClassify', icon: require('./../../assets/img/personal/goodPeopleIcon.png') },
    { funcName: '关于软件', link: '/home/0/work/questionnaire/questionnairePerson', icon: require('./../../assets/img/personal/aboutIcon.png') },
    { funcName: '个人信息', link: '/home/work/questionnaire', icon: require('./../../assets/img/personal/myInfoIcon.png') },
    { funcName: '修改头像', link: '/home/0/work/shopping/goodsList', icon: require('./../../assets/img/personal/avata.png') },
    { funcName: '修改密码', link: '/home/work/questionnaire', icon: require('./../../assets/img/personal/modifyPasswordIcon.png') },
    { funcName: '登出', link: '/home/work/questionnaire', icon: require('./../../assets/img/personal/loginOutIcon.png') }
  ]

  export default {
    components: {
      Tab,
      TabItem,
      Swiper,
      SwiperItem,
      Grid,
      GridItem
    },
    data () {
      return {
        http: HttpService.getAxios,
        list2: list(),
        demo2: '美食',
        index: 0,
        funcList: tmpConfig
      }
    },
    methods: {
      loading (isShow) {
        if (isShow) {
          this.$vux.loading.show({ text: '加载中' })
        } else {
          this.$vux.loading.hide()
        }
      },
      onItemClick (index) {
        console.log('on item click:', index)
      },
      goToFunc (index) {
        let that = this
        if (index === 4) {
          this.$router.push({
            name: 'Forget',
            params: {
              hah: 1
            }
          })
        } else if (index === 5) {
          this.$vux.confirm.show({
            title: '提示',
            content: '是否想要退出该系统？',
            onConfirm () {
              that.loginOut()
            }
          })
        } else {
          this.$vux.alert.show({
            title: '提示',
            content: '该功能尚未开放，尽情期待！',
            buttonText: '确定'
          })
        }
      },
      // 登出
      loginOut () {
        this.loading(true)
        this.http.post('/users/logout').then(response => {
          this.loading(false)
          if (response.status === 200) {
            let res = response.data
            if (res.status === '0') {
              this.$router.push({
                name: 'Login'
              })
            } else {
              this.$vux.toast.show({ text: '请求失败', type: 'text' })
            }
          } else {
            this.$vux.toast.show({ text: '接口异常', type: 'text' })
          }
        })
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
          .tab1{
            display: flex;
            .funcBox{
              flex: auto;
              width: 50px;
              height: 100px;
              display: flex;
              flex-direction: column;
              img{
                width: 100%;
              }
            }
          }
        }
      }
    }
  }
</style>
