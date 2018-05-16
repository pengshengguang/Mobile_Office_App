<template>
  <div>
    <div class="supplies-classify-wrapper cover">
      <x-header class="whiteBgHeader" :left-options="{backText:'', preventGoBack: true}" @on-click-back="goBack">办公用品目录<div class="add" slot="right" @click="toSuppliesView"></div></x-header>
      <div class="content-box">
        <div class="left-box">
          <div class="className" :class="{active: index === parseInt(suppliesStore.largeClassIndex, 10)}" v-for="(item, index) in largeClassList" :key="index" @click="getSmallClass(item.largeClassCode, index)">{{item.largeClass}}</div>
        </div>
        <div class="right-box">
          <div class="class-box">
            <div class="class-name">办公文具</div>
            <div class="class-details">
              <div class="item-outer" v-for="(item,index) in smallClassList" @click="toSuppliesDetailListView(index)">
                <div class="class-item" @click="">{{item.smallClass}}<i v-if="item.num!==0">{{item.num}}</i></div>
              </div>
            </div>
          </div>
        </div>
        <div class="cart-icon" :style="backgroundSelected" @click="confirm"><i v-if="sum!=0">{{sum}}</i></div>
      </div>
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
        suppliesStore: {},
        sum: 0// 购物车总数量
      }
    },
    components: {
      XHeader
    },
    mounted () {
      this.init()
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
        this.$store.commit('setSupplies', []) // 数据还原
        this.$store.commit('setIsGetSuppliesCart', 0) // 数据还原
        this.$router.push({
          name: 'work'
        })
      },
      toSuppliesDetailListView (index) {
        // 把二级目录列表与点击的index加入到store里面
        let suppliesNewStore = {
          largeClassIndex: this.largeClassIndex, //  当前点击的一级类别index
          smallClassList: this.smallClassList, // 二级目录列表
          smallClassIndex: index, // 当前点击的二级类别index
          suppliesCart: this.suppliesStore.suppliesCart
//          suppliesCart: this.$store.state.supplies.suppliesCart
        }
        this.$store.commit('setSupplies', suppliesNewStore)
        this.$router.push({
          name: 'SuppliesDetailList'
        })
      },
      toSuppliesView () {
        this.$router.push({
          name: 'Supplies'
        })
      },
      init () {
        this.getInitStore()
        this.getLargeClass()
        this.getCartNum()
      },
      // 读取状态
      getInitStore () {
        this.suppliesStore = this.$store.state.supplies
        if (this.$store.state.isGetSuppliesCart === 0) {
          this.getSuppliesCart()
        }
      },
      // 获取历史购物车列表
      getSuppliesCart () {
        let that = this
        that.$store.commit('setIsGetSuppliesCart', 1)
        this.loading(true)
        this.http.get('/supplies/getSuppliesCart').then((response) => {
          this.loading(false)
          if (response.status === 200) {
            let res = response.data
            if (res.status === '0') {
              let suppliesCart = res.result || []
              this.suppliesStore.suppliesCart = suppliesCart
              this.$store.commit('setSuppliesCart', that.suppliesStore.suppliesCart)
              this.getCartNum()
            } else {
              this.$vux.toast.show({ text: '请求失败', type: 'text' })
            }
          } else {
            this.$vux.toast.show({ text: '接口异常', type: 'text' })
          }
        })
      },
      // 获取一级目录
      getLargeClass () {
        let that = this
        this.loading(true)
        that.http.get('/supplies/getLargeClass').then((response) => {
          this.loading(false)
          if (response.status === 200) {
            let res = response.data
            if (res.status === '0') {
              that.largeClassList = res.result
              // 先从store里面读取
              if (that.suppliesStore.largeClassIndex !== undefined) {
                that.getSmallClass(that.largeClassList[that.suppliesStore.largeClassIndex].largeClassCode, that.suppliesStore.largeClassIndex)
              } else {
                // 默认进入一级目录第一个
                that.getSmallClass(that.largeClassList[0].largeClassCode, 0)
              }
            } else {
              that.$vux.toast.show({ text: '请求失败', type: 'text' })
            }
          } else {
            that.$vux.toast.show({ text: '接口异常', type: 'text' })
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
        this.loading(true)
        this.http.get('/supplies/getSmallClass', {params: param}).then((response) => {
          this.loading(false)
          if (response.status === 200) {
            let res = response.data
            if (res.status === '0') {
              this.smallClassList = res.result
              this.getItemNumber()
            } else {
              this.$vux.toast.show({ text: '请求失败', type: 'text' })
            }
          } else {
            this.$vux.toast.show({ text: '接口异常', type: 'text' })
          }
        })
      },
      // 给二级目录添加红点数量
      getItemNumber () {
        let num = 0
        for (let i = 0; this.smallClassList.length > i; i++) {
          for (let j = 0; this.suppliesStore.suppliesCart.length > j; j++) {
            if (this.smallClassList[i].smallClassCode === this.suppliesStore.suppliesCart[j].smallClassCode) {
              num += this.suppliesStore.suppliesCart[j].quantity
            }
          }
          this.smallClassList[i].num = num
          num = 0
        }
      },
      // 计算购物车总数量
      getCartNum () {
        if (this.suppliesStore.suppliesCart === undefined) {
          return
        }
        let sum = 0
        for (let i = 0; i < this.suppliesStore.suppliesCart.length; i++) {
          sum += this.suppliesStore.suppliesCart[i].quantity
        }
        this.sum = sum
      },
      // 确认事件
      confirm () {
        console.log(this.$store.state.supplies)
        // 把suppliesCart提交至数据库
        let userConfig = {
          suppliesCart: this.suppliesStore.suppliesCart
        }
        this.http.post('/supplies/saveSuppliesCart', userConfig).then((response) => {
          if (response.status === 200) {
            let res = response.data
            if (res.status === '0') {
              this.$router.push({
                name: 'SuppliesConfirm'
              })
            } else {
              this.$vux.toast.show({ text: '数据保存失败', type: 'text' })
            }
          } else {
            this.$vux.toast.show({ text: '接口异常', type: 'text' })
          }
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
