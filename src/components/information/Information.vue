<template>
  <div class="information-wrapper">
    <div class="title" height="100px" width="100%">
      <x-header class="whiteBgHeader" :left-options="{backText:'', preventGoBack: false}"><div class="del" slot="left" @click="toggleDel" v-if="isApproval"></div>资讯圈<div class="add" slot="right" @click="add" v-if="isApproval"></div></x-header>
    </div>
    <div class="container">
      <div style="margin: 10px;overflow: hidden;" v-for="(item, index) in informationList" :class="{'info-box': isDel}" @click="clickEvent(item)">
        <masker style="border-radius: 2px;">
          <div class="m-img" :style="{backgroundImage: 'url(' + list[index].img + ')'}"></div>
          <div slot="content" class="m-title">
            {{item.title}}
            <br/>
            <span class="m-time">{{item.publishTime}}</span>
          </div>
        </masker>
      </div>
      <!--<div style="margin: 10px;overflow: hidden;"  :class="{'info-box': isDel}">-->
        <!--<masker style="border-radius: 2px;" color="F9C90C" :opacity="0.8">-->
          <!--<div class="m-img" style="background-image:url(https://o3e85j0cv.qnssl.com/hot-chocolate-1068703__340.jpg)"></div>-->
          <!--<div slot="content" class="m-title">-->
            <!--VUX-->
            <!--<br/>-->
            <!--<span class="m-time">2016-03-18</span>-->
          <!--</div>-->
        <!--</masker>-->
      <!--</div>-->
    </div>
    <transition name="slide">
      <router-view class="cover" :getInformations="getInformations"></router-view>
    </transition>
  </div>
</template>

<script>
  import { Masker, XHeader } from 'vux'
  import Httpservice from '@/services/HttpService'

  export default{
    components: {
      Masker,
      XHeader
    },
    data () {
      return {
        http: Httpservice.getAxios,
        msg: '同事圈',
        isDel: false,
        list: [{
          title: '洗颜新潮流！人气洁面皂排行榜',
          img: 'https://o3e85j0cv.qnssl.com/hot-chocolate-1068703__340.jpg'
        }, {
          title: '美容用品 & 日用品（上）',
          img: 'https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg'
        }, {
          title: '远离车内毒气，日本车载空气净化器精选',
          img: 'https://o3e85j0cv.qnssl.com/waterway-107810__340.jpg'
        }, {
          title: '美容用品 & 日用品（上）',
          img: 'https://o3e85j0cv.qnssl.com/hot-chocolate-1068703__340.jpg'
        }, {
          title: '远离车内毒气，日本车载空气净化器精选',
          img: 'https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg'
        }, {
          title: '美容用品 & 日用品（上）',
          img: 'https://o3e85j0cv.qnssl.com/waterway-107810__340.jpg'
        }, {
          title: '远离车内毒气，日本车载空气净化器精选',
          img: 'https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg'
        }],
        informationList: [], // 问卷列表
        userName: '',
        isApproval: false
      }
    },
    mounted () {
      this.checkIdentity()
      this.getInformations()
    },
    methods: {
      toggleDel () {
        this.isDel = !this.isDel
      },
      loading (isShow) {
        if (isShow) {
          this.$vux.loading.show({ text: '加载中' })
        } else {
          this.$vux.loading.hide()
        }
      },
      // 检查当前用户是否审批人
      checkIdentity () {
        this.userName = this.$store.state.nickName
        if (this.userName === 'admin') {
          this.isApproval = true
        } else {
          this.isApproval = false
        }
      },
      // 获取资讯列表
      getInformations () {
        this.loading(true)
        this.http.get('/informations/getInformations').then((response) => {
          this.loading(false)
          if (response.status === 200) {
            let res = response.data
            if (res.status === '0') {
              let newList = res.result || []
              this.informationList = newList
              console.log(this.informationList)
            } else {
              this.$vux.toast.show({ text: '请求失败', type: 'text' })
            }
          } else {
            this.$vux.toast.show({ text: '接口异常', type: 'text' })
          }
        })
      },
      // 资讯box点击事件
      clickEvent (information) {
        if (this.isDel) {
          this.deleteInfo(information.informationId)
        } else {
          this.viewInfo(information)
        }
      },
      // 删除资讯
      deleteInfo (informationId) {
        let that = this
        this.$vux.confirm.show({
          content: `该资讯将删除下架，是否删除？`,
          confirmText: '删除',
          cancelText: '取消',
          onShow () {
            console.log('plugin show')
          },
          onHide () {
            console.log('plugin hide')
          },
          onCancel () {
            console.log('plugin cancel')
          },
          onConfirm () {
            that.deleteEvent(informationId)
          }
        })
      },
      // 删除资讯
      deleteEvent (informationId) {
        let config = {
          informationId: informationId
        }
        this.http.post('/informations/deleteInformations', config).then((response) => {
          if (response.status === 200) {
            let res = response.data
            if (res.status === '0') {
              this.$vux.toast.show({ text: '资讯下架成功', time: 800 })
              this.getInformations()
            } else {
              this.$vux.toast.show({ text: '资讯下架失败', type: 'error', time: 800 })
            }
          } else {
            this.$vux.toast.show({ text: '接口异常', type: 'text', time: 800 })
          }
        })
      },
      // 进入资讯详情
      viewInfo (information) {
        this.$router.push({
          path: '/home/1/information/informationDetails',
          params: {
            information: information
          }
        })
      },
      // 新建资讯
      add () {
        this.$router.push({
          path: '/home/1/information/addInformation'
        })
      }

    }
  }
</script>

<style lang="scss">
  .tabbar-box{
    /*display: none;*/
  }
  .information-wrapper{
    .title{
      .vux-header{
        .vux-header-left{
          .left-arrow{
            display: none;
          }
        }
      }
    }
    .container{
      .info-box{
        position: relative;
        &:before{
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          opacity: 0.6;
          background-color: #000;
          z-index: 201;
        }
        &:after{
          content: '';
          color: white;
          position: absolute;
          width: 30px;
          height: 30px;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          margin: auto;
          background: url("./../../assets/img/information/del.png") no-repeat;
          background-size: 100% 100%;
          z-index: 202;
        }
      }
    }
    .m-img {
      padding-bottom: 33%;
      display: block;
      position: relative;
      max-width: 100%;
      background-size: cover;
      background-position: center center;
      cursor: pointer;
      border-radius: 2px;
    }

    .m-title {
      color: #fff;
      text-align: center;
      text-shadow: 0 0 2px rgba(0, 0, 0, .5);
      font-weight: 500;
      font-size: 16px;
      position: absolute;
      left: 0;
      right: 0;
      width: 100%;
      text-align: center;
      top: 50%;
      transform: translateY(-50%);
    }

    .m-time {
      font-size: 12px;
      padding-top: 4px;
      border-top: 1px solid #f0f0f0;
      display: inline-block;
      margin-top: 5px;
    }
  }
  .slide-enter-active,.slide-leave-active{
    transition: all 0.8s;// 关于vue自带的动画效果，可看官网
  }
  .slide-enter, .slide-leave-to{
    transform: translate3d(100%, 0, 0)
  }
</style>
<style lang="scss" scoped>
  .information-wrapper{
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    width: 100%;
    bottom: 53px;
    .title{
      flex: none;
      height: 40px;
      width: 100%;
      background-color: #fff;
      border-bottom: 1px solid #DFE1E3;
      .add{
        width: 22px;
        height: 22px;
        display: inline-block;
        background: url("./../../assets/img/information/addIcon.png") no-repeat;
        background-size: 100% 100%;
      }
      .del{
        width: 22px;
        height: 22px;
        display: inline-block;
        background: url("./../../assets/img/information/delIcon.png") no-repeat;
        background-size: 100% 100%;
      }
    }
    .container{
      flex: auto;
      overflow: auto;
      .info-box{
      }
    }
  }
</style>
