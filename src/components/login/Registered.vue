<template>
  <transition name="slide">
    <div class="registered-warpper cover">
      <x-header class="whiteBgHeader" :left-options="{backText:'', preventGoBack: true}" @on-click-back="goBack">用户注册</x-header>
      <scroll class="container">
        <div class="registered-box">
          <div class="imgage-box" @click="tAvatarView">
            <avatar :currentUrl="userConfig.avatar"></avatar>
          </div>
          <div class="Info-box">
            <div class="username-box" :class="{showPass: userPass}">
              <input name="username" type="text" placeholder="用户名" class="username-input" v-model="userConfig.userName" @blur="blurCheck(0)" >
            </div>
            <div class="password-box" :class="{showPass: pwdPass}">
              <input name="password" type="password" placeholder="密码" class="password-input" v-model="userConfig.userPwd" @blur="blurCheck(1)">
            </div>
            <div class="passwordConfirm-box" :class="{showPass: pwd2Pass}">
              <input name="passwordConfirm" type="password" placeholder="密码确认" class="password-input" v-model="userPwd2" @blur="blurCheck(2)">
            </div>
            <div class="phone-box" :class="{showPass: phonePass}">
              <input name="phone" type="text" maxlength="11" onkeyup="this.value=this.value.replace(/\D/g,'')" placeholder="手机号" class="password-input" v-model="userConfig.phone" @blur="blurCheck(3)">
            </div>
            <div class="question-box">
              <group class="popupRadio-wrapper">
                <popup-radio title="请选择密保问题" :options="options2" v-model="option2" placeholder="请选择"  @on-change="selectedEvent"></popup-radio>
              </group>
              <div class="question" v-if="option2">
                <!--文本框是否可编辑根据 item.questionId 来判断，这是因为统计结果中没有questionId字段，而调查问卷详情中，有questionId字段。-->
                <x-textarea placeholder="请输入密保答案" :max="100" v-model="userConfig.answer"></x-textarea>
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
  import Httpservice from '@/services/HttpService'
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
        http: Httpservice.getAxios,
        userConfig: { // 用户注册信息
          userName: '',
          userPwd: '',
          phone: '',
          question: '',
          answer: '',
          avatar: 'https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg'
        },
        userPwd2: '',
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
        showSelectAvatar: false,
        userExist: false, // 用户是否存在
        userPass: false,
        pwdPass: false,
        pwd2Pass: false,
        phonePass: false,
        allPass: false
      }
    },
    created () {
      this.securityLoad()
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
      registered () {
        let that = this
        this.checkInputEvent()
        if (this.allPass) {
          this.loading(true)
          this.http.post('/users/register', {userConfig: this.userConfig}).then((response) => {
            this.loading(false)
            if (response.status === 200) {
              let res = response.data
              if (res.status === '0') {
                this.$vux.alert.show({
                  title: '提示',
                  content: '注册成功啦，赶快登陆吧！',
                  buttonText: '确定',
                  onHide () {
                    that.$router.push({
                      name: 'Login'
                    })
                  }
                })
                console.log(res.result)
                console.log('成功，把数据存到store中去呗')
              } else {
                console.log('hhh')
              }
            } else {
              this.$vux.alert.show({
                title: '提示',
                content: '接口请求异常',
                buttonText: '确定'
              })
            }
          })
        }
      },
      // 头像选择页
      tAvatarView () {
        this.showSelectAvatar = !this.showSelectAvatar
        console.log('切换到头像选择页')
      },
      // 切换头像选择界面
      closeAvatar () {
        this.showSelectAvatar = !this.showSelectAvatar
      },
      // 子组件-头像选择界面组件触发事件
      setNewAvatar (currentUrl) {
        this.userConfig.avatar = currentUrl
        console.log(currentUrl)
      },
      // 加载密保问题
      securityLoad () {
        this.http.get('/securitys/getSecurity').then((response) => {
          let res = response.data
          if (res.status === '0') {
            let securityList = res.result
            if (!securityList) {
              this.$vux.toast.show({
                text: '密保题库为空，请联系管理员',
                type: 'warn',
                time: 1500
              })
            } else {
              this.assemblyOptions(securityList)
            }
          } else {
            this.$vux.toast.show({
              text: '接口请求异常',
              type: 'warn',
              time: 1500
            })
          }
        })
      },
      // 组装数据，把原始数据的设置为键值的形式
      assemblyOptions (oldArray) {
        let array = []
        oldArray.forEach(item => {
          let optionObj = {
            key: null,
            value: null
          }
          optionObj.key = item.title
          optionObj.value = item.title
          array.push(optionObj)
        })
        this.options2 = array
      },
      // 密保选择
      selectedEvent (key) {
        this.userConfig.question = key
      },
      // 表单大检查
      checkInputEvent () {
        if (!this.userConfig.userName) {
          this.userPass = false
          this.$vux.alert.show({
            title: '提示',
            content: '请输入用户名',
            buttonText: '确定'
          })
        } else if (!this.userConfig.userPwd) {
          this.$vux.alert.show({
            title: '提示',
            content: '请输入密码',
            buttonText: '确定'
          })
        } else if (!this.userPwd2) {
          this.$vux.alert.show({
            title: '提示',
            content: '请输入确认密码',
            buttonText: '确定'
          })
        } else if (!this.userConfig.phone) {
          this.$vux.alert.show({
            title: '提示',
            content: '请输入手机号码',
            buttonText: '确定'
          })
        } else if (this.userConfig.userPwd !== this.userPwd2) {
          this.$vux.alert.show({
            title: '提示',
            content: '两次密码输入不一致，请重新输入',
            buttonText: '确定'
          })
          this.pwd2Pass = false
        } else if (!this.userConfig.question) {
          this.$vux.alert.show({
            title: '提示',
            content: '请选择密保问题',
            buttonText: '确定'
          })
        } else if (!this.userConfig.answer) {
          this.$vux.alert.show({
            title: '提示',
            content: '请输入密保答案',
            buttonText: '确定'
          })
        } else {
          this.allPass = true
        }
      },
      // onblur事件，表单逐一检查（用户名/密码/确认密码/手机号码）
      blurCheck (num) {
        switch (num) {
          case 0:
            if (this.userConfig.userName) {
              this.checkUserExist(1) // 参数为1代表异步时不用弹出load组件
            } else {
              this.userPass = false
            }
            break
          case 1:
            if (this.userConfig.userPwd) {
              this.pwdPass = true
            } else {
              this.pwdPass = false
            }
            break
          case 2:
            if (this.userPwd2) {
              if (this.userConfig.userPwd !== this.userPwd2) {
                this.pwd2Pass = false
              } else {
                this.pwd2Pass = true
              }
            } else {
              this.pwd2Pass = false
            }
            break
          case 3:
            if (this.userConfig.phone) {
              this.phonePass = true
            } else {
              this.phonePass = false
            }
            break
        }
      },
      // 检查用户是否存在
      checkUserExist (removeLoad) {
        if (!removeLoad) { // 参数为1代表异步时不用弹出load组件，默认弹出
          this.loading(true)
        }
        this.http.get('/users/findUserByName', {
          params: {
            userName: this.userConfig.userName
          }
        }).then((response) => {
          if (!removeLoad) {
            this.loading(true)
          }
          let res = response.data
          if (res.status === '0') {
            this.userExist = res.result
            if (this.userExist) {
              this.$vux.alert.show({
                title: '提示',
                content: '该用户名已注册，请重新输入用户名',
                buttonText: '确定'
              })
              this.userPass = false
              this.userConfig.userName = ''
            } else {
              this.userPass = true // 激活showPass样式，显示通过小图标
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
              background: url("./../../assets/img/login/usernameIcon.png") no-repeat;
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
  }

</style>
