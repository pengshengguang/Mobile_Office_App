<template>
  <div>
    <div class="supplies-classify-wrapper cover">
      <x-header class="whiteBgHeader" :left-options="{backText:'', preventGoBack: true}" @on-click-back="goBack">办公用品目录</x-header>
      <div class="content-box">
        <div class="left-box">
          <div class="className" :class="{active: index === largeClassIndex}" v-for="(item, index) in largeClassList" :key="index" @click="getSmallClass(item.largeClassCode, index)">{{item.largeClass}}</div>
        </div>
        <div class="right-box">
          <div class="class-box">
            <div class="class-name">办公文具</div>
            <div class="class-details">
              <div class="item-outer" v-for="(item,index) in smallClassList" @click="toSuppliesDetailListView(index)">
                <div class="class-item" @click="">{{item.smallClass}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="cart-icon" :style="backgroundSelected" @click="toSuppliesConfirmView"></div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import { XHeader } from 'vux'
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
        },
        // 一级目录
        largeClassList: [],
        // 二级目录
        smallClassList: [],
        // 一级目录选择标识
        largeClassIndex: '0',
        suppliesStore: {}
      }
    },
    components: {
      XHeader
    },
    mounted () {
      this.init()
    },
    methods: {
      goBack () {
        this.$router.back(-1)
        this.$store.commit('setSupplies', [])
        this.$store.commit('setIsGetSuppliesCart', 0)
      },
      toSuppliesConfirmView () {
        this.$router.push({
          name: 'SuppliesConfirm'
        })
      },
      toSuppliesDetailListView (index) {
        // 把二级目录列表与点击的index加入到store里面
        let suppliesNewStore = {
          largeClassIndex: this.largeClassIndex, //  当前点击的一级类别index
          smallClassList: this.smallClassList, // 二级目录列表
          smallClassIndex: index, // 当前点击的二级类别index
          suppliesCart: this.$store.state.supplies.suppliesCart
        }
        this.$store.commit('setSupplies', suppliesNewStore)
        this.$router.push({
          name: 'SuppliesDetailList'
        })
      },
      init () {
        this.getInitStore()
        this.getLargeClass()
      },
      // 获取一级目录
      getLargeClass () {
        this.http.get('/supplies/getLargeClass').then((response) => {
          if (response.status === 200) {
            let res = response.data
            if (res.status === '0') {
              this.largeClassList = res.result
              // 先从store里面读取
              if (this.suppliesStore.largeClassIndex) {
                this.largeClassIndex = this.$store.suppliesStore.largeClassIndex
                this.getSmallClass(this.largeClassList[this.largeClassIndex].largeClassCode, this.largeClassIndex)
              } else {
                // 默认进入一级目录第一个
                this.getSmallClass(this.largeClassList[0].largeClassCode, 0)
              }
            } else {
              this.$vux.toast.show({ text: '请求失败', type: 'text' })
            }
          } else {
            this.$vux.toast.show({ text: '接口异常', type: 'text' })
          }
        })
      },
      // 获取二级目录
      getSmallClass (largeClassCode, index) {
        this.largeClassIndex = index
        this.$store.commit('setLargeClassIndex', index)
        let param = {
          largeClassCode: largeClassCode
        }
        this.http.get('/supplies/getSmallClass', {params: param}).then((response) => {
          if (response.status === 200) {
            let res = response.data
            if (res.status === '0') {
              this.smallClassList = res.result
            } else {
              this.$vux.toast.show({ text: '请求失败', type: 'text' })
            }
          } else {
            this.$vux.toast.show({ text: '接口异常', type: 'text' })
          }
        })
      },
      // 读取状态
      getInitStore () {
        this.suppliesStore = this.$store.state.supplies
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
