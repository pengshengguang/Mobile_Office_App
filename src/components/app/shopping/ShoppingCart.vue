<template>
  <div>
    <div class="shopping-cart-wrapper cover">
      <x-header class="whiteBgHeader" :left-options="{backText:'', preventGoBack: true}" @on-click-back="goBack">办公用品目录<div class="add" slot="right" @click="goToCart" v-if="cartCount > 0"><i>{{cartCount}}</i></div></x-header>
      <div class="content-box">
      </div>
    </div>
  </div>
</template>

<script>
  import { XHeader } from 'vux'
  import { mapState } from 'vuex'
  import Httpservice from '@/services/HttpService'

  export default {
    data () {
      return {
        http: Httpservice.getAxios,
        backgroundSelected: {
          backgroundImage: 'url(' + require('@/assets/img/supplies/icon-selected.png') + ')'
        },
        // selected-lucency
        backgroundSelectedLucency: {
          backgroundImage: 'url(' + require('@/assets/img/supplies/icon-selected-lucency.png') + ')'
        }
      }
    },
    components: {
      XHeader
    },
    mounted () {
    },
    computed: {
      // 方式1
      // nickName () {
      //   return this.$store.state.nickName
      // },
      // cartCount () {
      //   return this.$store.state.cartCount
      // }
      // 方式二
      ...mapState(['nickName', 'cartCount']) // mapState是vue中的一个函数封装，作用与上面的两个函数一样，返回一个对象，这个对象有两个值，然后通过ES6的扩展运算符进行解构输出
    },
    methods: {
      goBack () {
        this.$router.back()
      }
    }
  }
</script>

<style lang="scss">
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .supplies-classify-wrapper{
    .whiteBgHeader{
      .add{
        width: 22px;
        height: 22px;
        display: inline-block;
        background: url("./../../../assets/img/supplies/icon-application.png") no-repeat;
        background-size: 100% 100%;
      }
    }
  }
</style>

<style lang="scss" scoped>
  .supplies-classify-wrapper{
    display: flex;
    flex-direction: column;
    .content-box{
      flex: auto;
      display: flex;
      position: relative;
      .left-box{
        overflow: auto;
        flex: 1 1 30%;
        border-right: 1px solid #e4e4e4;
        .className{
          padding-left: 10px;
          padding-right: 10px;
          padding-top: 18px;
          display: flex; /*为了使绿条居中*/
          justify-content: center;
          align-items: center;
          font-size: 16px;
        }
        .active{
          position: relative;
          color: #149c81;
          &:before{
            position: absolute;
            left: 0;
            content: '';
            height: 26px;
            width: 6px;
            background-color: #149c81;
          }
        }
      }
      .right-box{
        overflow: auto;
        flex: 1 1 70%;
        .class-box{
          .class-name{
            padding-top: 20px;
            padding-left: 11px;
            font-size: 16px;
            font-weight: bold;
          }
          .class-details{
            display: flex;
            flex-wrap: wrap;
            .item-outer{
              padding: 10px 6px 0 5px;
              position: relative;
              .class-item{
                border: 1px solid #b5bbc1;
                border-radius: 10px;
                padding: 4px 6px;
                position: relative;
                i{
                  position: absolute;
                  width: 19px;
                  height: 19px;
                  background: red;
                  top: -9px;
                  right: -9px;
                  content: '1';
                  border-radius: 100%;
                  color: #fff;
                  line-height: 18px;
                  text-align: center;
                  font-style: normal;
                  font-size: 12px;
                }
              }
            }
          }
        }
      }
      .cart-icon{
        position: absolute;
        bottom: 60px;
        right: 20px;
        height: 50px;
        width: 50px;
        border-radius: 50%;
        border: 1px solid #d7d7d7;
        background-size: 100% 100%;
        i{
          position: absolute;
          width: 19px;
          height: 19px;
          background: red;
          top: -6px;
          right: -4px;
          content: '1';
          border-radius: 100%;
          color: #fff;
          line-height: 18px;
          text-align: center;
          font-style: normal;
          font-size: 12px;
        }
      }
    }
  }
</style>
