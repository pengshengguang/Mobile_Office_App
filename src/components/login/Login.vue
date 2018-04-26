<template>
  <div class="login-wrapper">
    <img src="./../../assets/img/login/logo.png">
    <div class="login-name">移动办公</div>
    <div class="login-box">
      <div class="username-box">
        <input name="username" type="text" placeholder="用户名" class="username-input">
      </div>
      <div class="password-box">
        <input name="password" type="password" placeholder="密码" class="password-input">
      </div>
      <a href="#">忘记密码</a>
      <button name="login">登 陆</button>
    </div>
  </div>
</template>

<script>
  export default {}
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
