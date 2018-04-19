<template>
  <div>
    <nav-header></nav-header>
    <nav-bread></nav-bread>
    <div class="container">
      <div class="page-title-normal">
        <h2 class="page-title-h2"><span>check out</span></h2>
      </div>
      <!-- 进度条 -->
      <div class="check-step">
        <ul>
          <li class="cur"><span>Confirm</span> address</li>
          <li class="cur"><span>View your</span> order</li>
          <li class="cur"><span>Make</span> payment</li>
          <li class="cur"><span>Order</span> confirmation</li>
        </ul>
      </div>

      <div class="order-create">
        <div class="order-create-pic">
          <img src="/static/ok-2.png" alt="">
        </div>
        <div class="order-create-main">
          <h3>Congratulations! <br>Your order is under processing!</h3>
          <p>
            <span>Order ID：{{orderId}}</span>
            <span>Order total：{{orderTotal | currency('$')}}</span>
          </p>
          <div class="order-create-btn-wrap">
            <div class="btn-l-wrap">
              <!--<a href="javascript:;" class="btn btn&#45;&#45;m">Cart List</a>-->
              <router-link class="btn btn--m" to="/cart">Cart List</router-link>
            </div>
            <div class="btn-r-wrap">
              <!--<a href="javascript:;" class="btn btn&#45;&#45;m">Goods List</a>-->
              <router-link class="btn btn--m" to="/">Goods List</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>
<script>
  import NavHeader from '@/components/app/shopping/assembly/NavHeader'
  import NavFooter from '@/components/app/shopping/assembly/NavFooter'
  import NavBread from '@/components/app/shopping/assembly/NavBread'
  import Modal from './assembly/Modal'
  import Httpservice from '@/services/HttpService'
  import {currency} from '@/services/currency'

  export default {
    data () {
      return {
        http: Httpservice.getAxios,
        orderId: '', // 订单ID
        orderTotal: 0 // 订单总金额
      }
    },
    components: {
      NavHeader,
      NavFooter,
      NavBread,
      Modal
    },
    filters: {
      currency: currency
    },
    mounted () {
      this.getOrderDetail()
    },
    methods: {
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
<style>

</style>
