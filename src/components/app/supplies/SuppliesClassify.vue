<template>
  <transition name="fade">
    <div class="supplies-classify-wrapper cover">
      <x-header class="whiteBgHeader" :left-options="{backText:'', preventGoBack: true}" @on-click-back="goBack">办公用品目录</x-header>
      <div class="content-box">
        <div class="left-box">
          <div class="className active">办公文具/文具/用品/办公</div>
        </div>
        <div class="right-box">
          <div class="class-box">
            <div class="class-name">办公文具</div>
            <div class="class-details">
              <div class="item-outer">
                <div class="class-item" @click="toSuppliesDetailListView">财务档案用品</div>
              </div>
              <div class="item-outer">
                <div class="class-item">抽杆夹</div>
              </div>
              <div class="item-outer">
                <div class="class-item">白板</div>
              </div>
              <div class="item-outer">
                <div class="class-item">白板附件</div>
              </div>
              <div class="item-outer">
                <div class="class-item">白板附件</div>
              </div>
              <div class="item-outer">
                <div class="class-item">白板</div>
              </div>
            </div>
          </div>
        </div>
        <div class="cart-icon" :style="backgroundSelected" @click="toSuppliesCartView"></div>
      </div>
      <router-view></router-view>
    </div>
  </transition>
</template>

<script>
  import { XHeader } from 'vux'

  export default {
    data () {
      return {
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
    methods: {
      goBack () {
        this.$router.back(-1)
      },
      toSuppliesCartView () {
        this.$router.push({
          name: 'SuppliesCart'
        })
      },
      toSuppliesDetailListView () {
        console.log('去办公用品列表详情页')
        this.$router.push({
          name: 'SuppliesDetailList'
        })
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
              .class-item{
                border: 1px solid #b5bbc1;
                border-radius: 10px;
                padding: 4px 6px;
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
      }
    }
  }
</style>
