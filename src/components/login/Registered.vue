<template>
  <transition name="slide">
    <div class="registered-warpper cover">
      <x-header class="whiteBgHeader" :left-options="{backText:'', preventGoBack: true}" @on-click-back="goBack">用户注册</x-header>
      <scroll class="container">
        <div class="registered-box">
          <div class="imgage-box" @click="tAvatarView">
            <avatar :currentUrl="userConfig.url"></avatar>
          </div>
          <div class="Info-box">
            <div class="username-box">
              <input name="username" type="text" placeholder="用户名" class="username-input">
            </div>
            <div class="password-box">
              <input name="password" type="password" placeholder="密码" class="password-input">
            </div>
            <div class="password-box">
              <input name="password" type="password" placeholder="密码确认" class="password-input">
            </div>
            <div class="question-box">
              <group class="popupRadio-wrapper">
                <popup-radio title="请选择密保问题" :options="options2" v-model="option2" placeholder="请选择"></popup-radio>
              </group>
              <div class="question" v-if="option2">
                <!--文本框是否可编辑根据 item.questionId 来判断，这是因为统计结果中没有questionId字段，而调查问卷详情中，有questionId字段。-->
                <x-textarea placeholder="请输入密保答案" :max="100"></x-textarea>
              </div>
            </div>
            <button name="login" @click="registered">注册</button>
            <div v-transfer-dom>
              <popup v-model="showPop" height="210px" is-transparent>
                <div style="width: 95%;background-color:#fff;height:200px;margin:0 auto;border-radius:5px;padding-top:10px;">
                  <group>
                    <cell title="开发者" value="彭胜光"></cell>
                    <cell title="技术支持" value="13160675356"></cell>
                  </group>
                  <div style="padding:20px 15px;">
                    <x-button type="primary" @click.native="showPop = false">确定</x-button>
                  </div>
                </div>
              </popup>
            </div>
          </div>
        </div>
      </scroll>
      <transition name="slide">
        <ImageUpload v-if="showSelectAvatar" class="cover" @closeAvatar="closeAvatar" @setNewAvatar="setNewAvatar"></ImageUpload>
      </transition>
    </div>

  </transition >
</template>

<script>
  import { TransferDom, XHeader, Popup, XSwitch, Group, Cell, XButton, PopupRadio, XTextarea } from 'vux'
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
    directives: {
      TransferDom
    },
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
        userConfig: { // 用户注册信息
          userName: '',
          userPwd: '',
          phone: '',
          avatar: '',
          url: ''
        },
        showPop: false,
        option2: '',
        options2: [{
          key: 'A',
          value: '你的小学老师叫什么？'
        }, {
          key: 'B',
          value: '你小时候最喜欢的动漫是什么？'
        }],
        funcList: tmpConfig,
        showSelectAvatar: false
      }
    },
    methods: {
      goBack () {
        this.$router.back(-1)
      },
      registered () {
        this.$vux.toast.show({
          text: '注册成功',
          type: '',
          width: '12em',
          time: 3500
        })
      },
      // 头像选择页
      tAvatarView () {
        this.showSelectAvatar = !this.showSelectAvatar
        console.log('切换到头像选择页')
      },
      closeAvatar () {
        this.showSelectAvatar = !this.showSelectAvatar
      },
      setNewAvatar (currentUrl) {
        this.userConfig.url = currentUrl
        console.log(currentUrl)
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
