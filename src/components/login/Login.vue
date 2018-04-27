<template>
  <div class="login-wrapper">
    <img src="./../../assets/img/login/logo.png">
    <div class="login-name">光子工作室</div>
    <div class="login-box">
      <div class="username-box">
        <input name="username" type="text" v-model="userName" placeholder="用户名" class="username-input">
      </div>
      <div class="password-box">
        <input name="password" type="password" v-model="userPwd" placeholder="密码" class="password-input">
      </div>
      <a href="#">忘记密码</a>
      <button name="login" @click="login">登 陆</button>
    </div>
  </div>
</template>

<script>
  import Httpservice from '@/services/HttpService'
  import { mapState } from 'vuex'

  export default {
    data () {
      return {
        msg: '',
        http: Httpservice.getAxios,
        userName: '',
        userPwd: ''
      }
    },
    mounted () {
      this.checkLogin()
    },
    computed: {
      ...mapState(['nickName'])
    },
    methods: {
      loading (isShow) {
        if (isShow) {
          this.$vux.loading.show({ text: '加载中' })
        } else {
          this.$vux.loading.hide()
        }
      },
      // 检查是否登陆
      checkLogin () {
        this.http.get('/users/checkLogin').then((response) => {
          let res = response.data
          if (res.status === '0') {
            this.$store.commit('updateUserInfo', res.result)
            // 前往主页面
            this.$router.push({
              name: 'work'
            })
            this.$vux.toast.show({
              text: '欢迎回来',
              type: 'text',
              time: 1500,
              position: 'bottom'
            })
          } else {
            this.$vux.toast.show({
              text: '请登陆',
              type: 'text',
              time: 1500,
              position: 'bottom'
            })
          }
        })
      },
      // 登陆
      login () {
        if (!this.userName || !this.userPwd) {
          return
        }
        let userConfig = {
          userName: this.userName,
          userPwd: this.userPwd
        }
        this.loading(true)
        this.http.post('/users/login', userConfig).then((response) => {
          let res = response.data
          this.loading(false)
          if (res.status === '0') {
            this.$store.commit('updateUserInfo', res.result.userName)
            // 前往主页面
            this.$router.push({
              name: 'work'
            })
          } else {
            this.$vux.toast.show({
              text: '登陆失败',
              type: 'warn',
              time: 1500
            })
            console.log('登陆失败')
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .login-wrapper{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 60px;
    height: 100%;
    background-color: #fff;
    img{
      width: 83px;
      align-items: center;
    }
    .login-name{
      color: #5fb913;
      font-size: 20px;
      font-weight: bold;
    }
    .login-box{
      width: 100%;
      display: flex;
      flex-direction: column;
      padding-top: 10px;
      .userIcon{
        width: 26px;
      }
      input{
        height: 30px;
        border-left: none;
        border-right: none;
        border-top: none;
        margin: 20px 20px 0 20px;
        outline-style: none;
        font-size:14px;
        padding-left: 24px;
        width: 90%;
      }
      button {
        margin: 30px 20px 0 20px;
        background-color: #60bc5e;
        border-radius: 4px;
        border: none;
        height: 38px;
        color: #fff;
        font-size: 16px;
      }
      a {
        margin-left: 20px;
        margin-top: 16px;
        text-decoration: none;
        color: grey;
        font-size: 14px;
      }
      .username-box {
        position: relative;
        &:before{
          width: 20px;
          height: 20px;
          content: ' ';
          left: 20px;
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
          left: 20px;
          bottom: 6px;
          position: absolute;
          background: url("./../../assets/img/login/passwordIcon.png") no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  }
</style>
