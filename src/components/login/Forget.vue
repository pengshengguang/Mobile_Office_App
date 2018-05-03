<template>
  <transition name="slide">
    <div class="forget-warpper-warpper cover">
      <x-header class="whiteBgHeader" :left-options="{backText:'', preventGoBack: true}" @on-click-back="goBack">密码找回</x-header>
      <scroll class="container">
        <div class="forget-warpper-box">
          <transition name="fade">
            <div class="imgage-box" v-if="userExist">
              <avatar :currentUrl="userConfig.url"></avatar>
            </div>
          </transition>
          <div class="Info-box">
            <transition name="fade">
              <div class="username-box" v-if="!userExist">
                <input name="username" type="text" placeholder="请输入用户名" @keyup.enter="findUser" class="username-input" v-model="userConfig.userName">
              </div>
            </transition>
            <div class="password-box" v-if="false">
              <input name="password" type="password" placeholder="密码" class="password-input" v-model="userConfig.userPwd">
            </div>
            <div class="password-box" v-if="false">
              <input name="password" type="password" placeholder="密码确认" class="password-input" v-model="userConfig.userPwd2">
            </div>
            <transition name="fade">
              <div class="question-box" v-if="userExist">
                <group class="popupRadio-wrapper">
                  <popup-radio title="请选择密保问题" :options="options2" v-model="option2" placeholder="请选择"></popup-radio>
                </group>
                <div class="question" v-if="option2">
                  <!--文本框是否可编辑根据 item.questionId 来判断，这是因为统计结果中没有questionId字段，而调查问卷详情中，有questionId字段。-->
                  <x-textarea placeholder="请输入密保答案" :max="100"></x-textarea>
                </div>
              </div>
            </transition>
            <button name="login" @click="findUser">确认</button>
          </div>
        </div>
      </scroll>
    </div>

  </transition >
</template>

<script>
  import Httpservice from '@/services/HttpService'
  import { XHeader, Popup, XSwitch, Group, Cell, XButton, PopupRadio, XTextarea } from 'vux'
  import Avatar from '@/base/ImageUpload/Avatar'
  import ImageUpload from '@/base/ImageUpload/ImageUpload'
  import Scroll from '@/base/scroll/Scroll'

  const tmpConfig = [
    { funcName: '调查问卷', link: '/home/work/questionnaire/questionnaireDetails', icon: require('./../../assets/img/work/funcIcon.png') },
    { funcName: '用车申请', link: '/home/work/questionnaire', icon: require('./../../assets/img/work/funcIcon.png') },
    { funcName: '用车申请', link: '/home/work/questionnaire', icon: require('./../../assets/img/work/funcIcon.png') },
    { funcName: '用车申请', link: '/home/work/questionnaire', icon: require('./../../assets/img/work/funcIcon.png') },
    { funcName: '用车申请', link: '/home/work/questionnaire', icon: require('./../../assets/img/work/funcIcon.png') },
    { funcName: '用车申请', link: '/home/work/questionnaire', icon: require('./../../assets/img/work/funcIcon.png') },
    { funcName: '用车申请', link: '/home/work/questionnaire', icon: require('./../../assets/img/work/funcIcon.png') },
    { funcName: '用车申请', link: '/home/work/questionnaire', icon: require('./../../assets/img/work/funcIcon.png') },
    { funcName: '用车申请', link: '/home/work/questionnaire', icon: require('./../../assets/img/work/funcIcon.png') },
    { funcName: '用车申请', link: '/home/work/questionnaire', icon: require('./../../assets/img/work/funcIcon.png') },
    { funcName: '用车申请', link: '/home/work/questionnaire', icon: require('./../../assets/img/work/funcIcon.png') },
    { funcName: '用车申请', link: '/home/work/questionnaire', icon: require('./../../assets/img/work/funcIcon.png') },
    { funcName: '用车申请', link: '/home/work/questionnaire', icon: require('./../../assets/img/work/funcIcon.png') },
    { funcName: '用车申请', link: '/home/work/questionnaire', icon: require('./../../assets/img/work/funcIcon.png') },
    { funcName: '用车申请', link: '/home/work/questionnaire', icon: require('./../../assets/img/work/funcIcon.png') },
    { funcName: '用车申请', link: '/home/work/questionnaire', icon: require('./../../assets/img/work/funcIcon.png') },
    { funcName: '用车申请', link: '/home/work/questionnaire', icon: require('./../../assets/img/work/funcIcon.png') },
    { funcName: '用车申请', link: '/home/work/questionnaire', icon: require('./../../assets/img/work/funcIcon.png') },
    { funcName: '用车申请', link: '/home/work/questionnaire', icon: require('./../../assets/img/work/funcIcon.png') },
    { funcName: '用车申请', link: '/home/work/questionnaire', icon: require('./../../assets/img/work/funcIcon.png') },
    { funcName: '用车申请', link: '/home/work/questionnaire', icon: require('./../../assets/img/work/funcIcon.png') },
    { funcName: '用车申请', link: '/home/work/questionnaire', icon: require('./../../assets/img/work/funcIcon.png') },
    { funcName: '用车申请', link: '/home/work/questionnaire', icon: require('./../../assets/img/work/funcIcon.png') },
    { funcName: '用车申请', link: '/home/work/questionnaire', icon: require('./../../assets/img/work/funcIcon.png') },
    { funcName: '用车申请', link: '/home/work/questionnaire', icon: require('./../../assets/img/work/funcIcon.png') },
    { funcName: '用车申请', link: '/home/work/questionnaire', icon: require('./../../assets/img/work/funcIcon.png') },
    { funcName: '用车申请', link: '/home/work/questionnaire', icon: require('./../../assets/img/work/funcIcon.png') },
    { funcName: '用车申请', link: '/home/work/questionnaire', icon: require('./../../assets/img/work/funcIcon.png') },
    { funcName: '用车申请', link: '/home/work/questionnaire', icon: require('./../../assets/img/work/funcIcon.png') },
    { funcName: '用车申请', link: '/home/work/questionnaire', icon: require('./../../assets/img/work/funcIcon.png') },
    { funcName: '用车申请', link: '/home/work/questionnaire', icon: require('./../../assets/img/work/funcIcon.png') },
    { funcName: '用车申请', link: '/home/work/questionnaire', icon: require('./../../assets/img/work/funcIcon.png') },
    { funcName: '用车申请', link: '/home/work/questionnaire', icon: require('./../../assets/img/work/funcIcon.png') },
    { funcName: '用车申请', link: '/home/work/questionnaire', icon: require('./../../assets/img/work/funcIcon.png') },
    { funcName: '用车申请', link: '/home/work/questionnaire', icon: require('./../../assets/img/work/funcIcon.png') },
    { funcName: '办公用品', link: '/home/work/questionnaire', icon: require('./../../assets/img/work/funcIcon.png') }
  ]

  export default {
    components: {
      XHeader,
      Avatar,
      ImageUpload,
      Popup,
      XSwitch,
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
        userConfig: { // 用户注册信息
          userName: '',
          userPwd: '',
          userPwd2: '',
          avatar: '',
          url: ''
        },
        option2: '',
        options2: [{
          key: 'A',
          value: '你的小学老师叫什么？'
        }, {
          key: 'B',
          value: '你小时候最喜欢的动漫是什么？'
        }],
        funcList: tmpConfig,
        userExist: false
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
      goBack () {
        this.$router.back(-1)
      },
      // 查找用户
      findUser () {
        if (!this.userConfig.userName) {
          this.$vux.alert.show({
            title: '提示',
            content: '请输入用户名',
            buttonText: '确定'
          })
          return
        }
        this.loading(true)
        this.http.get('/users/findUserByName', {
          params: {
            userName: this.userConfig.userName
          }
        }).then((response) => {
          this.loading(false)
          let res = response.data
          this.userExist = res.result
          if (res.status === '0') {
            if (this.userExist) {
              console.log('用户存在')
            } else {
              this.$vux.alert.show({
                title: '提示',
                content: '该用户不存在',
                buttonText: '确定'
              })
            }
          } else {
            this.$vux.alert.show({
              title: '提示',
              content: '网络异常，请重新提交',
              buttonText: 'hah'
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
  .fade-enter-active, .fade-leave-active {
    transition: opacity 1.5s;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0;
  }
  .demo3-slot {
    text-align: center;
    padding: 8px 0;
    color: #888;
  }
  .forget-warpper-warpper{
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
      .question{
        .vux-x-textarea{
          border: 1px solid #ccc;
          margin: 20px;
        }
      }
    }
  }
</style>

<style lang="scss" scoped>
  .forget-warpper-warpper{
    height: 100%;
    display: flex;
    flex-direction: column;
    .whiteBgHeader{
      flex: none;
    }
    .container{
      flex: auto;
      overflow: auto;
      .forget-warpper-box{
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
              background: url("./../../assets/img/login/usernameIcon.png") no-repeat;
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
          }
          .question-box{
            .question{
              margin-top: 20px;
              .vux-x-textarea{
                margin: 0;
                padding: 0!important;
              }
            }
          }
        }
      }
    }
    .hah{
      position: fixed;
      top: 35%;
    }
  }

</style>
