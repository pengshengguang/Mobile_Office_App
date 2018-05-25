<template>
  <div class="order-success-wrapper cover">
    <!--<nav-header></nav-header>-->
    <!--<nav-bread></nav-bread>-->
    <x-header class="whiteBgHeader" :left-options="{backText:'', preventGoBack: true}" @on-click-back="goBack">地址选择<div class="add" slot="right" v-if="cartCount > 0"  @click="goToCart"><i>{{cartCount}}</i></div></x-header>
    <div class="container">
      <div class="page-title-normal">
        <!--<h2 class="page-title-h2"><span>check out</span></h2>-->
      </div>
      <!-- 进度条 -->
      <div class="check-step">
        <ul>
          <!--<li class="cur"><span>Confirm</span> address</li>-->
          <!--<li class="cur"><span>View your</span> order</li>-->
          <!--<li class="cur"><span>Make</span> payment</li>-->
          <!--<li class="cur"><span>Order</span> confirmation</li>-->
          <li class="cur"><span>确认</span>地址</li>
          <li class="cur"><span>查看</span>订单</li>
          <li class="cur"><span>付款</span> </li>
          <li class="cur"><span>订单</span>确认</li>
        </ul>
      </div>

      <div class="order-create">
        <div class="order-create-pic">
          <img src="./../../../assets/img/shopping/ok-2.png" alt="">
        </div>
        <div class="order-create-main">
          <!--<h3>Congratulations! <br>Your order is under processing!</h3>-->
          <h3>购物成功! <br>您的订单正在处理中!</h3>
          <p>
            <span>订单编号：{{orderId}}</span>
            <span>商品总额：{{orderTotal | currency('￥')}}</span>
          </p>
          <div class="order-create-btn-wrap">
            <div class="btn-l-wrap">
              <router-link class="btn btn--m" to="cart">购物车</router-link>
            </div>
            <div class="btn-r-wrap">
              <router-link class="btn btn--m" to="goodsList">继续购物</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--<nav-footer></nav-footer>-->
  </div>
</template>
<script>
//  import NavHeader from '@/components/app/shopping/assembly/NavHeader'
//  import NavFooter from '@/components/app/shopping/assembly/NavFooter'
//  import NavBread from '@/components/app/shopping/assembly/NavBread'
  import Modal from './assembly/Modal'
  import Httpservice from '@/services/HttpService'
  import {currency} from '@/services/currency'
  import { XHeader } from 'vux'
  import { mapState } from 'vuex'

  export default {
    data () {
      return {
        http: Httpservice.getAxios,
        orderId: '', // 订单ID
        orderTotal: 0 // 订单总金额
      }
    },
    components: {
//      NavHeader,
//      NavFooter,
//      NavBread,
      Modal,
      XHeader
    },
    filters: {
      currency: currency
    },
    mounted () {
      this.getOrderDetail()
    },
    computed: {
      // 获取购物车数量
      ...mapState(['nickName', 'cartCount'])
    },
    methods: {
      goBack () {
        this.$router.back()
      },
      // 去往购物车页面
      goToCart () {
        this.$router.push({
          name: 'Cart'
        })
      },
      // 获取订单详情
      getOrderDetail () {
        // 查询上一级路由传过来的orderId
        let orderId = this.$route.query.orderId
        if (!orderId) {
          return
          // 或者是提示框
        }
        this.http.get('/users/orderDetail', {
          params: {
            orderId: orderId
          }
        }).then((response) => {
          let res = response.data
          if (res.status === '0') {
            this.orderId = orderId
            this.orderTotal = res.result.orderTotal
          } else {
            console.log('订单查询失败，不存在此订单！')
          }
        })
      }
    }
  }
</script>
<style lang="scss">
  .order-success-wrapper{
    display: flex;
    flex-direction: column;
    .whiteBgHeader{
      flex: 0 0 44px;
      .add{
        width: 22px;
        height: 22px;
        display: inline-block;
        background: url("./../../../assets/img/shopping/cartIcon.png") no-repeat;
        background-size: 100% 100%;
        position: relative;
        i{
          position: absolute;
          top: -10px;
          right: -11px;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #f7524f;
          color: #fff;
          font-size: 13px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
    .container{
      flex: auto;
      overflow: auto;
      padding-bottom: 70px;
    }
  }
</style>
