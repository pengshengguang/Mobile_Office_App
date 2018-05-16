<template>
  <transition name="slide">
    <div class="forget-warpper-warpper cover">
      <x-header class="whiteBgHeader" :left-options="{backText:'', preventGoBack: true}" @on-click-back="goBack">密码找回</x-header>
      <scroll class="container">
        <div class="forget-warpper-box">
          <transition name="fade">
            <div class="imgage-box" v-if="userExist">
              <avatar :currentUrl="userConfig.avatar"></avatar>
            </div>
          </transition>
          <div class="Info-box">
            <transition name="fade">
              <div class="username-box" v-if="!userExist">
                <input name="username" type="text" placeholder="请输入用户名" @keyup.enter="findUser" class="username-input" v-model.trim="userConfig.userName">
              </div>
            </transition>
            <transition name="fade">
              <div class="password-box" v-if="answerPass">
                <input name="password" type="password" placeholder="密码" class="password-input" v-model.trim="newPwd" onkeyup="this.value=this.value.replace(/\D/g,'')">
              </div>
            </transition>
            <transition name="fade">
              <div class="password-box" v-if="answerPass">
                <input name="password" type="password" placeholder="密码确认" class="password-input" v-model.trim="newPwd2" onkeyup="this.value=this.value.replace(/\D/g,'')">
              </div>
            </transition>
            <transition name="fade">
              <div class="question-box" v-if="userExist&&!answerPass">
                <group class="popupRadio-wrapper">
                  <popup-radio title="密保问题" :options="options2" v-model="option2" placeholder="" readonly ></popup-radio>
                </group>
                <div class="question" v-if="option2&&!answerPass">
                  <!--文本框是否可编辑根据 item.questionId 来判断，这是因为统计结果中没有questionId字段，而调查问卷详情中，有questionId字段。-->
                  <x-textarea placeholder="请输入密保答案" :max="100" v-model.trim="currectAnswer"></x-textarea>
                </div>
              </div>
            </transition>
            <button name="login" @click="nextEvent">确认</button>
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
          question: '',
          answer: '',
          avatar: '',
          phone: ''
        },
        currectAnswer: '', // 用户此时输入的密保答案
        newPwd: '', // 用户此时输入的新密码
        newPwd2: '', // 用户此时输入的新确认密码
        option2: '',
        options2: [{
          key: 'A',
          value: '你的小学老师叫什么？'
        }, {
          key: 'B',
          value: '你小时候最喜欢的动漫是什么？'
        }],
        funcList: tmpConfig,
        userExist: false,
        answerPass: false,
        pwdPass: false,
        question: {
          title: '',
          answer: ''
        }
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
      // 组装密保信息
      assemblyOptions (obj) {
        let array = []
        let optionObj = {
          key: obj.question,
          value: obj.question
        }
        array.push(optionObj)
        this.options2 = array
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
              this.getQuestionByUserName()
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
              buttonText: '确定'
            })
          }
        })
      },
      // 根据用户名称获取密保信息
      getQuestionByUserName () {
        if (!this.userConfig.userName) {
          console.log('该用户不存在，无法获取密保信息。')
          return
        }
        this.loading(true)
        this.http.get('/users/getQuestionByUserName', {
          params: {
            userName: this.userConfig.userName
          }
        }).then((response) => {
          this.loading(false)
          if (response.status === 200) {
            let res = response.data
            if (res.status === '0') {
              this.userConfig = res.result
              this.option2 = this.userConfig.question
              // 组装密保信息成键值对
              this.assemblyOptions(this.userConfig)
            } else {
              this.$vux.alert.show({
                title: '提示',
                content: '查询数据异常',
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
      },
      // 判断密保是否正确
      checkAnswer () {
        if (this.currectAnswer) {
          if (this.currectAnswer === this.userConfig.answer) {
            this.answerPass = true
            this.$vux.toast.show({
              text: '验证成功，请输入新密码。',
              time: 2000
            })
          } else {
            this.$vux.alert.show({
              title: '提示',
              content: '验证不通过，请重新输入',
              bottonText: '确定'
            })
          }
        } else {
          this.$vux.alert.show({
            title: '提示',
            content: '请输入密保答案',
            bottonText: '确定'
          })
        }
      },
      // 新密码输入验证
      checkNewPwd () {
        let pwdPass = false
        if (this.newPwd && this.newPwd2) {
          if (this.newPwd2 !== this.newPwd) {
            this.$vux.alert.show({
              title: '提示',
              content: '两次密码输入不一致，请重新输入',
              buttonText: '确定'
            })
          } else {
            pwdPass = true
          }
        } else {
          this.$vux.alert.show({
            title: '提示',
            content: '请输入密码/确认密码',
            buttonText: '确定'
          })
        }
        return pwdPass
      },
      // 验证与修改密码
      modifyPwd () {
        let that = this
        if (this.checkNewPwd()) {
          this.http.post('/users/modifyPwd', {
            userPwd: this.newPwd,
            userName: this.userConfig.userName
          }).then((response) => {
            if (response.status === 200) {
              let res = response.data
              if (res.status === '1') { // 修改密码成功
                console.log(res.result)
                console.log('修改密码成功')
                this.$vux.alert.show({
                  title: '提示',
                  content: '修改密码成功',
                  buttonText: '去登陆',
                  onHide () {
                    that.$router.push({
                      name: 'Login'
                    })
                  }
                })
              } else {
                this.$vux.alert.show({
                  title: '提示',
                  content: '查询数据异常',
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
      },
      // 确定按钮
      nextEvent () {
        if (this.userExist) { // 验证身份
          if (this.answerPass) { // 验证答案
            if (this.pwdPass) { // 验证修改密码
              console.log('修改密码成功')
            } else {
              this.modifyPwd()
            }
          } else {
            this.checkAnswer()
          }
        } else {
          this.findUser()
        }
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
    .showPass{
      &:after{
        display: inline-block!important;
      }
    }
  }

</style>
