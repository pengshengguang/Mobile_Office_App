<template>
  <transition name="slide">
    <div class="registered-warpper cover">
      <x-header class="whiteBgHeader" :left-options="{backText:'', preventGoBack: true}" @on-click-back="goBack">新增资讯</x-header>
      <scroll class="container">
        <div class="registered-box">
          <div class="Info-box">
            <div class="username-box">
              <input name="username" type="text" placeholder="请输入资讯标题" class="username-input" v-model.trim="userConfig.title">
            </div>
            <div class="textarea-box">
              <group style="width: 100%;margin-top: 20px">
                <x-textarea class="require-item-x-input" placeholder="输入资讯内容"
                            :rows="6"
                            :show-counter="true" :max="200" :autosize='true'
                            v-model.trim="userConfig.content">
                </x-textarea>
              </group>
            </div>
            <button name="login" @click="addNewInformation">确定</button>
          </div>
        </div>
      </scroll>
    </div>

  </transition >
</template>

<script>
  import Httpservice from '@/services/HttpService'
  import { TransferDom, XHeader, Group, Cell, XButton, PopupRadio, XTextarea } from 'vux'
  //  import Avatar from '@/base/ImageUpload/Avatar'
  import Scroll from '@/base/scroll/Scroll'

  export default {
    directives: {
      TransferDom
    },
    props: ['getInformations'],
    components: {
      XHeader,
      Group,
      Cell,
      XButton,
      PopupRadio,
      XTextarea,
      Scroll
    },
    data () {
      return {
        http: Httpservice.getAxios,
        userConfig: { // 资讯信息
          informationId: '', // 资讯Id
          title: '', // 资讯标题
          content: '', // 资讯内容
          publishTime: '', // 资讯发布时间
          commitList: [] // 评论列表
        }
      }
    },
    init () {
    },
    methods: {
      loading (isShow) {
        if (isShow) {
          this.$vux.loading.show({ text: '加载中' })
        } else {
          this.$vux.loading.hide()
        }
      },
      goBack () {
        this.$router.back(-1)
      },
      addNewInformation () {
        let config = {
          userConfig: this.userConfig
        }
        this.loading(true)
        this.http.post('/informations/publicInformation', config).then(response => {
          this.loading(false)
          if (response.status === 200) {
            let res = response.data
            if (res.status === '0') { // 修改密码成功
              let that = this
              this.$vux.alert.show({
                title: '提示',
                content: '添加资讯成功',
                onHide () {
                  that.$router.push({
                    path: '/home/0/information'
                  })
                  that.getInformations()
                }
              })
            } else {
              this.$vux.alert.show({
                title: '提示',
                content: '添加资讯失败',
                buttonText: '确定'
              })
            }
          } else {
            this.$vux.alert.show({
              title: '提示',
              content: '接口请求出错!',
              buttonText: '确定'
            })
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  .slide-enter-active,.slide-leave-active{
    transition: all 0.8s;// 关于vue自带的动画效果，可看官网
  }
  .slide-enter, .slide-leave-to{
    transform: translate3d(100%, 0, 0)
  }
  .demo3-slot {
    text-align: center;
    padding: 8px 0;
    color: #888;
  }
  .registered-warpper{
    border: 1px solid #ccc;
    .whiteBgHeader{
      display: flex;
      flex: none;
    }
    .Info-box{
      .popupRadio-wrapper{
        color: #757575;
        /*margin: 0 20px 0 20px;*/
        border-top: none;
        .weui-cells{
          border: 1px solid #ccc;
          .weui-cell{
            font-size: 15px;
          }
        }
      }
      .address-box{
        .weui-cells{
          border: 1px solid #ccc;
          font-size: 16px!important;
          .weui-cell{
            padding: 6px 15px;
          }
        }
      }
      .textarea-box{
        .weui-textarea-counter{
          font-size: 14px;
        }
        .weui-cells{
          /*margin-top: 30px;*/
          font-size: 16px;
          width: 100%;
          margin: 0 auto;
          border: 1px solid #D9D9D9;
          &:before{
            display: none;
          }
          &:after{
            display: none;
          }
          textarea{
            padding: 0;
          }
        }
      }
    }
  }
</style>

<style lang="scss" scoped>
  .registered-warpper{
    height: 100%;
    display: flex;
    flex-direction: column;
    .whiteBgHeader{
      flex: none;
    }
    .container{
      flex: auto;
      overflow: auto;
      .registered-box{
        .imgage-box{}
        .Info-box{
          width: 100%;
          display: flex;
          flex-direction: column;
          padding: 0 20px 0 20px;
          .userIcon{
            width: 26px;
          }
          input{
            height: 30px;
            border-left: none;
            border-right: none;
            border-top: none;
            /*margin: 20px 20px 0 20px;*/
            padding-top: 34px;
            padding-bottom: 14px;
            padding-right: 24px;
            outline-style: none;
            font-size:14px;
            padding-left: 28px;
            width: 100%;
          }
          button {
            margin-top: 30px;
            background-color: #60bc5e;
            border-radius: 4px;
            border: none;
            height: 38px;
            color: #fff;
            font-size: 16px;
            margin-bottom: 45px;
          }
          .username-box {
            position: relative;
            &:before{
              width: 20px;
              height: 20px;
              content: ' ';
              left: 3px;
              bottom: 6px;
              position: absolute;
              background: url("./../../assets/img/information/titleIcon.png") no-repeat;
              background-size: 100% 100%;
            }
            &:after{
              display: none;
              width: 20px;
              height: 20px;
              content: ' ';
              right: 3px;
              bottom: 6px;
              position: absolute;
              background: url("./../../assets/img/login/correctIcon.png") no-repeat;
              background-size: 100% 100%;
            }
          }
          .password-box {
            position: relative;
            &:before{
              width: 20px;
              height: 20px;
              content: ' ';
              left: 3px;
              bottom: 6px;
              position: absolute;
              background: url("./../../assets/img/login/passwordIcon.png") no-repeat;
              background-size: 100% 100%;
            }
            &:after{
              display: none;
              width: 20px;
              height: 20px;
              content: ' ';
              right: 3px;
              bottom: 6px;
              position: absolute;
              background: url("./../../assets/img/login/correctIcon.png") no-repeat;
              background-size: 100% 100%;
            }
          }
          .passwordConfirm-box {
            position: relative;
            &:before{
              width: 30px;
              height: 30px;
              content: ' ';
              left: -2px;
              bottom: 2px;
              position: absolute;
              background: url("./../../assets/img/login/pwdConfirmIcon.png") no-repeat;
              background-size: 100% 100%;
            }
            &:after{
              display: none;
              width: 20px;
              height: 20px;
              content: ' ';
              right: 3px;
              bottom: 6px;
              position: absolute;
              background: url("./../../assets/img/login/correctIcon.png") no-repeat;
              background-size: 100% 100%;
            }
          }
          .phone-box {
            position: relative;
            &:before{
              width: 20px;
              height: 20px;
              content: ' ';
              left: 3px;
              bottom: 6px;
              position: absolute;
              background: url("./../../assets/img/login/phoneIcon.png") no-repeat;
              background-size: 100% 100%;
            }
            &:after{
              display: none;
              width: 20px;
              height: 20px;
              content: ' ';
              right: 3px;
              bottom: 6px;
              position: absolute;
              background: url("./../../assets/img/login/correctIcon.png") no-repeat;
              background-size: 100% 100%;
            }
          }
          .post-code-box {
            position: relative;
            &:before{
              width: 26px;
              height: 26px;
              content: ' ';
              left: 1px;
              bottom: 2px;
              position: absolute;
              position: absolute;
              background: url("./../../assets/img/shopping/postcodeIcon.png") no-repeat;
              background-size: 100% 100%;
            }
            &:after{
              display: none;
              width: 20px;
              height: 20px;
              content: ' ';
              right: 3px;
              bottom: 6px;
              position: absolute;
              background: url("./../../assets/img/login/correctIcon.png") no-repeat;
              background-size: 100% 100%;
            }
          }
          .address-box{
            /*margin-top: 20px;*/
            .weui-cells{
              border: 1px solid #ccc;
            }
          }
        }
      }
    }
    .showPass{
      &:after{
        display: inline-block!important;
      }
    }
  }

</style>
