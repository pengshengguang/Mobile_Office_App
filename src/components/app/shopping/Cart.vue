<template>
  <div class="cart-wrapper cover">
    <x-header class="whiteBgHeader" :left-options="{backText:'', preventGoBack: true}" @on-click-back="goBack">购物车<div class="add" slot="right" v-if="cartCount > 0"><i>{{cartCount}}</i></div></x-header>
    <div class="container" v-if="cartList.length !== 0">
      <!--<div>购物清单如下</div>-->
      <div class="cart">
        <div class="item-list-wrap">
          <div class="cart-item">
            <div class="cart-item-head">
              <ul>
                <li>Items</li>
                <li>Price</li>
                <li>Quantity</li>
                <li>Subtotal</li>
                <li>Edit</li>
              </ul>
            </div>
            <ul class="cart-item-list">
              <li v-for="item in cartList">
                <div class="cart-tab-1">
                  <div class="cart-item-check">
                    <a class="checkbox-btn item-check-btn" v-bind:class="{'check':item.checked=='1'}" @click="editCart('checked', item)">
                      <svg class="icon icon-ok">
                        <use xlink:href="#icon-ok"></use>
                      </svg>
                    </a>
                  </div>
                  <div class="cart-item-pic">
                    <img v-lazy="'/static/'+item.productImage" v-bind:alt="item.productName">
                  </div>
                  <div class="cart-item-title">
                    <div class="item-name">{{item.productName}}</div>
                  </div>
                </div>
                <div class="cart-tab-2">
                  <div class="item-price">{{item.salePrice}}</div>
                </div>
                <div class="cart-tab-3">
                  <div class="item-quantity">
                    <div class="select-self select-self-open">
                      <div class="select-self-area">
                        <a class="input-sub" @click="editCart('reduce', item)">-</a>
                        <span class="select-ipt">{{item.productNum}}</span>
                        <a class="input-add" @click="editCart('add', item)">+</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="cart-tab-4">
                  <div class="item-price-total">{{(item.productNum*item.salePrice)}}</div>
                </div>
                <div class="cart-tab-5">
                  <div class="cart-item-opration" @click="delCartConfirm(item)">
                    <a href="javascript:;" class="item-edit-btn">
                      <svg class="icon icon-del">
                        <use xlink:href="#icon-del"></use>
                      </svg>
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!--<div class="cart-foot-wrap">-->
          <!--<div class="cart-foot-inner">-->
            <!--<div class="cart-foot-l">-->
              <!--<div class="item-all-check">-->
                <!--<a @click="toggleCheckAll">-->
                  <!--<span class="checkbox-btn item-check-btn" v-bind:class="{'check':checkAllFlag}">-->
                      <!--<svg class="icon icon-ok"><use xlink:href="#icon-ok"/></svg>-->
                  <!--</span>-->
                  <!--<span>Select all</span>-->
                <!--</a>-->
              <!--</div>-->
            <!--</div>-->
            <!--<div class="cart-foot-r">-->
              <!--<div class="item-total">-->
                <!--Item total: <span class="total-price">{{totalPrice}}</span>-->
              <!--</div>-->
              <!--<div class="btn-wrap">-->
                <!--<a class="btn btn&#45;&#45;red" v-bind:class="{'btn&#45;&#45;dis': checkedCount === 0}" @click="checkOut">Checkout</a>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      </div>
    </div>
    <!--<div class="no-data" v-if="cartList.length === 0">-->
      <!--你好，您的购物车暂无商品-->
    <!--</div>-->
    <div class="empty-tips-wrapper" v-if="cartList.length === 0">
      <div class="empty-tips-box">
        <i class="add-approval-icon" :style="backgroundNoDate" @click="goGoodListView"></i>
        <div class="line-1">你好，购物车为空</div>
        <div class="line-2">快来把商品加入购物车吧</div>
        <i class="spring-arrow-icon" :style="backgroundArrow"></i>
      </div>
    </div>
    <div class="btn-box">
      <div class="selectAll" @click="toggleCheckAll">
        <a class="checkbox-btn item-check-btn" :class="{'check':checkAllFlag}">
          <svg class="icon icon-ok">
            <use xlink:href="#icon-ok"></use>
          </svg>
        </a>
        <p>全选</p>
      </div>
      <div class="text">合计: <span>￥{{totalPrice}}</span></div>
      <div class="confirm"  v-bind:class="{'btn-dis': checkedCount === 0}" @click="checkOut">结算</div>
    </div>
    <!--<modal :mdShow="modalConfirm" @close="closeModal">-->
      <!--<p slot="message">你确定要删除此条数据吗？</p>-->
      <!--<div slot="btnGroup">-->
        <!--<a class="btn btn&#45;&#45;m" href="javascript:;" @click="delCart">确认</a>-->
        <!--<a class="btn btn&#45;&#45;m" href="javascript:;" @click="modalConfirm = false">关闭</a>-->
      <!--</div>-->
    <!--</modal>-->
    <svg style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1"
         xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <symbol id="icon-add" viewBox="0 0 32 32">
          <title>add2</title>
          <path class="path1"
                d="M15 17h-13.664c-0.554 0-1.002-0.446-1.002-1 0-0.552 0.452-1 1.002-1h13.664v-13.664c0-0.554 0.446-1.002 1-1.002 0.552 0 1 0.452 1 1.002v13.664h13.664c0.554 0 1.002 0.446 1.002 1 0 0.552-0.452 1-1.002 1h-13.664v13.664c0 0.554-0.446 1.002-1 1.002-0.552 0-1-0.452-1-1.002v-13.664z"></path>
        </symbol>
        <symbol id="icon-ok" viewBox="0 0 32 32">
          <title>ok</title>
          <path class="path1"
                d="M31.020 0.438c-0.512-0.363-1.135-0.507-1.757-0.406s-1.166 0.435-1.529 0.937l-17.965 24.679-5.753-5.67c-0.445-0.438-1.035-0.679-1.664-0.679s-1.219 0.241-1.664 0.679c-0.917 0.904-0.917 2.375 0 3.279l7.712 7.6c0.438 0.432 1.045 0.681 1.665 0.681l0.195-0.008c0.688-0.057 1.314-0.406 1.717-0.959l19.582-26.9c0.754-1.038 0.512-2.488-0.538-3.233z"></path>
        </symbol>
        <symbol id="icon-edit" viewBox="0 0 32 32">
          <title>edit</title>
          <path class="path1"
                d="M28.287 8.51l-4.805-4.806 0.831-0.831c0.472-0.472 1.086-0.777 1.564-0.777 0.248 0 0.452 0.082 0.622 0.253l3.143 3.144c0.539 0.54 0.133 1.529-0.524 2.186l-0.831 0.831zM26.805 9.992l-1.138 1.138-4.805-4.806 1.138-1.138 4.805 4.806zM24.186 12.612l-14.758 14.762-4.805-4.806 14.758-14.762 4.805 4.806zM7.379 28.288l-4.892 1.224 1.223-4.894 3.669 3.67zM31.123 4.011l-3.143-3.144c-0.567-0.567-1.294-0.867-2.103-0.867-1.036 0-2.174 0.52-3.045 1.391l-20.429 20.436c-0.135 0.134-0.23 0.302-0.276 0.487l-2.095 8.385c-0.089 0.355 0.017 0.736 0.276 0.995 0.198 0.198 0.461 0.307 0.741 0.307 0.085 0 0.171-0.010 0.254-0.031l8.381-2.096c0.185-0.047 0.354-0.142 0.487-0.276l20.43-20.436c1.409-1.41 2.042-3.632 0.524-5.15v0z"></path>
        </symbol>
        <symbol id="icon-del" viewBox="0 0 32 32">
          <title>delete</title>
          <path class="path1"
                d="M11.355 4.129v-2.065h9.29v2.065h-9.29zM6.194 29.935v-23.742h19.613v23.742h-19.613zM30.968 4.129h-8.258v-3.097c0-0.569-0.463-1.032-1.032-1.032h-11.355c-0.569 0-1.032 0.463-1.032 1.032v3.097h-8.258c-0.569 0-1.032 0.463-1.032 1.032s0.463 1.032 1.032 1.032h3.097v24.774c0 0.569 0.463 1.032 1.032 1.032h21.677c0.569 0 1.032-0.463 1.032-1.032v-24.774h3.097c0.569 0 1.032-0.463 1.032-1.032s-0.463-1.032-1.032-1.032v0z"></path>
          <path class="path2"
                d="M10.323 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"></path>
          <path class="path3"
                d="M16 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"></path>
          <path class="path4"
                d="M21.677 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"></path>
        </symbol>
        <symbol id="icon-clock" viewBox="0 0 32 32">
          <title>clock</title>
          <path class="path1" fill="#605f5f"
                d="M16 29c-7.168 0-13-5.831-13-13s5.832-13 13-13c7.168 0 13 5.832 13 13s-5.832 13-13 13zM16 0c-8.822 0-16 7.178-16 16s7.178 16 16 16c8.822 0 16-7.178 16-16s-7.178-16-16-16z"></path>
          <path class="path2" fill="#605f5f"
                d="M23.958 21.837l-6.958-6.489v-6.282c0-0.827-0.673-1.5-1.5-1.5s-1.5 0.673-1.5 1.5v6.934c0 0.414 0.174 0.814 0.477 1.098l7.435 6.934c0.279 0.259 0.642 0.402 1.023 0.402 0.415 0 0.814-0.174 1.096-0.477 0.564-0.605 0.532-1.555-0.073-2.12z"></path>
        </symbol>
      </defs>
    </svg>
  </div>
</template>
<script>
  import '@/assets/css/checkout.css'
  import { XHeader } from 'vux'
  import NavBread from '@/components/app/shopping/assembly/NavBread'
  import Httpservice from '@/services/HttpService'
  import Modal from './assembly/Modal'
  import { mapState } from 'vuex'

  export default {
    components: {
      XHeader,
      NavBread,
      Modal
    },
    data () {
      return {
        msg: 'hello',
        http: Httpservice.getAxios,
        cartList: [],
        modalConfirm: false, // 删除的模态框
        // 图片引用-新增图标
        backgroundNoDate: {
          backgroundImage: 'url(' + require('@/assets/img/noData/icon_null_new.png') + ')'
        },
        // 图片引用-弹簧箭头图标
        backgroundArrow: {
          backgroundImage: 'url(' + require('@/assets/img/noData/null_arrow.jpg') + ')'
        }
      }
    },
    mounted () {
      this.init()
    },
    computed: {
      // 获取购物车数量
      ...mapState(['nickName', 'cartCount']),
      // 购物车商品勾选数量
      checkedCount () {
        let i = 0
        this.cartList.forEach((item) => {
          if (item.checked === '1') {
            i++
          }
        })
        return i
      },
      // 商品是否已经全选
      checkAllFlag () {
        return this.cartList.length === this.checkedCount && this.cartList.length !== 0
      },
      // 计算购物车选中商品总价格
      totalPrice () {
        let money = 0
        this.cartList.forEach((item) => {
          if (item.checked === '1') {
            money += parseFloat(item.salePrice) * parseInt(item.productNum)
          }
        })
        return money
      }
    },
    methods: {
      goBack () {
        this.$router.push({
          name: 'GoodsList'
        })
      },
      goGoodListView () {
        this.$router.push({
          name: 'GoodsList'
        })
      },
      // 获取当前用户购物车信息
      init () {
        this.http.get('/users/cartList').then((response) => {
          let res = response.data
          this.cartList = res.result
        })
      },
      // 是否删除当前商品
      delCartConfirm (delItem) {
//        this.modalConfirm = true
        this.delItem = delItem
        let that = this
        this.$vux.confirm.show({
          content: `你确定要删除此条数据吗？`,
          confirmText: '确认',
          cancelText: '关闭',
          onCancel () {
            console.log('plugin hide')
          },
          onConfirm () {
            that.delCart()
          }
        })
      },
      // 删除当前商品
      delCart () {
        this.http.post('/users/delCart', {productId: this.delItem.productId}).then((response) => {
          let res = response.data
          if (res.status === '0') {
//            this.modalConfirm = false
            this.init()
            // 当前删除商品的数量
            let delCount = parseInt(this.delItem.productNum)
            this.$store.commit('updateCartCount', -delCount)
            console.log('删除商品成功！')
          }
        })
      },
      // 商品数量编辑
      editCart (flag, item) {
        if (flag === 'add') {  // 数量增加操作
          item.productNum++
        } else if (flag === 'reduce') { // 数量减少操作
          if (item.productNum <= 1) {
            return
          } else {
            item.productNum--
          }
        } else { // 选中与否操作
          item.checked = item.checked === '1' ? '0' : '1'
        }
        this.http.post('/users/cartEdit', {
          productId: item.productId,
          productNum: item.productNum,
          checked: item.checked
        }).then((response) => {
          let res = response.data
          if (res.status === '0') {
            console.log('编辑购物车商品成功！')
            // 更新购物车数量
            let num = 0
            if (flag === 'add') {
              num = 1
            } else if (flag === 'reduce') {
              num = -1
            }
            this.$store.commit('updateCartCount', num)
          }
        })
      },
      // 全选操作
      toggleCheckAll () {
        let flag = !this.checkAllFlag
        this.cartList.forEach((item) => {
          item.checked = flag ? '1' : '0'
        })
        this.http.post('/users/editCheckAll', {checkAll: flag}).then((response) => {
          let res = response.data
          if (res.status === '0') {
            console.log(res.msg)
          } else {
            console.log(res.msg)
          }
        })
      },
      // 结算按钮功能
      checkOut () {
        if (this.checkedCount > 0) {
          this.$router.push({
            name: 'Address'
          })
        }
      }
      // 关闭模态框
//      closeModal () {
//        this.modalConfirm = false
//      }
    }
  }
</script>
<style>
  .input-sub,.input-add{
    min-width: 40px;
    height: 100%;
    border: 0;
    color: #605F5F;
    text-align: center;
    font-size: 16px;
    overflow: hidden;
    display: inline-block;
    background: #f0f0f0;
  }
  .item-quantity .select-self-area{
    background:none;
    border: 1px solid #f0f0f0;
  }
  .item-quantity .select-self-area .select-ipt{
    display: inline-block;
    padding:0 3px;
    width: 30px;
    min-width: 30px;
    text-align: center;
  }
</style>
<style lang="scss">
  .cart-wrapper{
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
    .no-data{
      flex: auto;
      display: flex;
      justify-content: center;
      padding-top: 100px;
    }
    .empty-tips-wrapper{
      flex: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 50px;
      .empty-tips-box{
        flex: none;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 200px;
        height: 200px;
        font-size: 16px;
        position: relative;
        .add-approval-icon{
          width: 50px;
          height: 50px;
          background-size: 100% 100%;
        }
        .line-1{
          padding-top: 10px;
        }
        .line-2{
        }
        .spring-arrow-icon{
          width: 100px;
          height: 100px;
          background-size: 100% 100%;
          position: absolute;
          z-index: -1;
          top: 44px;
          right: -25px;
        }
      }
    }
    .btn-box{
      border-top: 1px solid #ebebeb;
      position: fixed;
      z-index: 1001;
      bottom: 0;
      height: 44px;
      width: 100%;
      display: flex;
      justify-content: flex-end;
      background-color: #ffffff;
      .selectAll{
        flex: auto;
        display: flex;
        align-items: center;
        padding-left: 8px;
        p{
          padding-left: 10px;
          font-size: 16px;
          color: #7d7c7c;
        }
      }
      .text{
        flex: auto;
        display: flex;
        align-items: center;
        align-items: center;
        font-size: 16px;
        padding-left: 10px;
        font-weight: bold;
        justify-content: flex-end;
        padding-right: 10px;
        span{
          color: #d1434a;
        }
      }
      .confirm{
        font-size: 18px;
        color: #ffffff;
        flex: 0 0 95px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #d1434a;
      }
      .btn-dis{
        background-color: #cccccc;
        color: #fff;
        cursor: pointer
      }
    }
  }
</style>
