<template>
  <transition name="slide">
    <div class="registered-warpper cover">
      <x-header class="whiteBgHeader" :left-options="{backText:'', preventGoBack: true}" @on-click-back="goBack">新增地址</x-header>
      <scroll class="container">
        <div class="registered-box">
          <!--<div class="imgage-box">-->
            <!--<avatar :currentUrl="addressIcon"></avatar>-->
          <!--</div>-->
          <div class="Info-box">
            <div class="username-box" :class="{showPass: userPass}">
              <input name="username" type="text" placeholder="收货人" class="username-input" v-model.trim="userConfig.userName" @blur="blurCheck(0)" onkeyup="this.value=this.value.replace(/\s/g,'')">
            </div>
            <div class="phone-box" :class="{showPass: phonePass}">
              <input name="phone" type="text" maxlength="11" onkeyup="this.value=this.value.replace(/\D/g,'')" placeholder="手机号" class="password-input" v-model.trim="userConfig.phone" @blur="blurCheck(3)">
            </div>
            <div class="post-code-box" :class="{showPass: postPass}">
              <input name="phone" type="text" maxlength="6" onkeyup="this.value=this.value.replace(/\D/g,'')" placeholder="邮政编码" class="password-input" v-model.trim="userConfig.postCode" @blur="blurCheck(4)">
            </div>
            <div class="address-box">
              <group>
                <x-address title="收货地址" v-model.trim="value" :list="addressData" @on-shadow-change="onShadowChange" placeholder="请选择" inline-desc="省市区" :show.sync="showAddress"></x-address>
                <!--<cell title="收货地址" :value="value"></cell>-->
              </group>
            </div>
            <div class="textarea-box">
              <group style="width: 100%;margin-top: 20px">
                <x-textarea class="require-item-x-input" placeholder="请输入详细收货地址"
                            :rows="2"
                            :show-counter="true" :max="100" :autosize='true'
                            v-model.trim="userConfig.details">
                </x-textarea>
              </group>
            </div>
            <button name="login" @click="addNewAddress">确定</button>
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
    </div>

  </transition >
</template>

<script>
  import Httpservice from '@/services/HttpService'
  import { TransferDom, XHeader, Popup, XSwitch, Group, Cell, XButton, PopupRadio, XTextarea, XAddress, ChinaAddressV4Data, Value2nameFilter as value2name } from 'vux'
//  import Avatar from '@/base/ImageUpload/Avatar'
  import Scroll from '@/base/scroll/Scroll'

  export default {
    directives: {
      TransferDom
    },
    components: {
      XHeader,
//      Avatar,
      Popup,
      XSwitch,
      Group,
      Cell,
      XButton,
      PopupRadio,
      XTextarea,
      Scroll,
      XAddress
    },
    data () {
      return {
        http: Httpservice.getAxios,
        userConfig: { // 用户注册信息
          userName: '', // 收货人
          phone: '', // 联系方式
          postCode: '', // 邮政编码
          address: '', // 省市区
          details: '' // 详细地址
        },
        addressIcon: require('./../../../assets/img/shopping/addressIcon.png'),
        userPwd2: '',
        showPop: false,
        userPass: false,
        phonePass: false,
        postPass: false,
        allPass: false,
        /* ----------------- */
        value: [],
        addressData: ChinaAddressV4Data, // 地址组件省市区数据大全
        showAddress: false
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
      // 表单大检查
      checkInputEvent () {
        if (!this.userConfig.phone) {
          this.$vux.alert.show({
            title: '提示',
            content: '请输入手机号码',
            buttonText: '确定'
          })
        } else if (!this.userConfig.postCode) {
          this.$vux.alert.show({
            title: '提示',
            content: '请输入邮政编码',
            buttonText: '确定'
          })
        } else if (!this.userConfig.address) {
          this.$vux.alert.show({
            title: '提示',
            content: '请选择省市区',
            buttonText: '确定'
          })
        } else if (!this.userConfig.details) {
          this.$vux.alert.show({
            title: '提示',
            content: '输入详细地址信息',
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
              this.userPass = true
            } else {
              this.userPass = false
            }
            break
          case 3:
            if (this.userConfig.phone) {
              this.phonePass = true
            } else {
              this.phonePass = false
            }
            break
          case 4:
            if (this.userConfig.postCode) {
              this.postPass = true
            } else {
              this.postPass = false
            }
            break
        }
      },
      // 添加新地址事件
      addNewAddress () {
        let that = this
        let userConfig = {
          addressObj: this.userConfig
        }
        this.checkInputEvent()
        if (this.allPass) {
          this.loading(true)
          this.http.post('/users/addNewAddress', userConfig).then(response => {
            this.loading(false)
            if (response.status === 200) {
              let res = response.data
              if (res.status === '0') {
                this.$vux.alert.show({
                  title: '提示',
                  content: '添加地址成功！',
                  buttonText: '确定',
                  onHide () {
                    that.$router.push({
                      name: 'Address'
                    })
                  }
                })
              } else {
                this.$vux.alert.show({
                  title: '提示',
                  content: '添加地址失败，请重新提交信息',
                  buttonText: '确定'
                })
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
      /* ------------------------------------------ */
      doShowAddress () {
        this.showAddress = true
        setTimeout(() => {
          this.showAddress = false
        }, 2000)
      },
      onShadowChange (ids, names) { // 获取地址组件数据
//        console.log(ids, names)
        this.userConfig.address = names.join('')
      },
      getName (value) {
        return value2name(value, ChinaAddressV4Data)
      }
//      logHide (str) {
//        console.log('on-hide', str)
//      },
//      logShow (str) {
//        console.log('on-show')
//      }
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
              background: url("./../../../assets/img/login/usernameIcon.png") no-repeat;
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
              background: url("./../../../assets/img/login/correctIcon.png") no-repeat;
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
              background: url("./../../../assets/img/login/passwordIcon.png") no-repeat;
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
              background: url("./../../../assets/img/login/correctIcon.png") no-repeat;
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
              background: url("./../../../assets/img/login/pwdConfirmIcon.png") no-repeat;
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
              background: url("./../../../assets/img/login/correctIcon.png") no-repeat;
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
              background: url("./../../../assets/img/login/phoneIcon.png") no-repeat;
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
              background: url("./../../../assets/img/login/correctIcon.png") no-repeat;
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
              background: url("./../../../assets/img/shopping/postcodeIcon.png") no-repeat;
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
              background: url("./../../../assets/img/login/correctIcon.png") no-repeat;
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
