<template>
  <div class="goodsList-wrapper">
    <nav-header @isLogin="isLogin"></nav-header>
    <nav-bread>
      <span slot="two">goods</span>
    </nav-bread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby"> Sort by:</span>
          <a href="javascript:void(0)" class="default cur">Default</a>
          <a href="javascript:void(0)" class="price" v-bind:class="{'sort-up':sortFlag}" @click="sortGoods">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
          <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter" :class="{'filterby-show': filterBy}">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd><a href="javascript:void(0)" :class="{'cur': priceLevel === 'all'}" @click="setPriceFilter('all')">All</a></dd>
              <dd v-for="(price,index) in priceFiter" @click="setPriceFilter(index)">
                <a href="javascript:void(0)" :class="{'cur': priceLevel === index}">{{price.startPrice}} - {{price.endPrice}}</a>
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="item in goodsList">
                  <div class="pic">
                    <a href="#"><img v-lazy="'static/' + item.productImage" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">{{item.salePrice}}</div>
                    <div class="btn-area" @click="addCart(item.productId)">
                      <a href="javascript:;" class="btn btn--m">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
              <!--加载更多插件-->
              <div class="load-more" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
                <img src="./../assets/loading-spinning-bubbles.svg" v-show="loading">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal v-bind:mdShow="mdShow" v-on:close="closeModal">
      <p slot="message">
        请先登录,否则无法加入到购物车中!
      </p>
      <div slot="btnGroup">
        <a class="btn btn--m" href="javascript:;" @click="mdShow = false">关闭</a>
      </div>
    </modal>
    <modal :mdShow="mdShowCart" @close="closeModal">
      <p slot="message">
        <svg class="icon-status-ok">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
        </svg>
        <span>加入购物车成功!</span>
      </p>
      <div slot="btnGroup">
        <a class="btn btn--m" href="javascript:;" @click="mdShowCart = false">继续购物</a>
        <router-link class="btn btn--m btn--red" href="javascript:;" to="/cart">查看购物车</router-link>
      </div>
    </modal>
    <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
    <nav-footer></nav-footer>
  </div>
</template>
<script>
  import NavHeader from '@/components/NavHeader'
  import NavFooter from '@/components/NavFooter'
  import NavBread from '@/components/NavBread'
  import Modal from './../components/Modal'
//  import axios from 'axios'
  import Httpservice from '@/services/HttpService'

  export default {
    components: {
      NavHeader,
      NavFooter,
      NavBread,
      Modal
    },
    data () {
      return {
        userName: '',
        http: Httpservice.getAxios,
        goodsList: [],
        priceFiter: [
          {
            startPrice: '0.00',
            endPrice: '500.00'
          },
          {
            startPrice: '500.00',
            endPrice: '1000.00'
          },
          {
            startPrice: '1000.00',
            endPrice: '2000.00'
          }
        ],
        priceLevel: 'all', // 商品价格区间标识
        filterBy: false,
        overLayFlag: false,
        sortFlag: true, // 排序标志，默认升序
        page: 1,
        pageSize: 8,
        // 加载更多属性
        busy: true, // 无线滚动禁用
        loading: true,
        // 购物车弹出窗口
        mdShow: false,
        mdShowCart: false
      }
    },
    mounted () {
//      axios.get('/api/goods').then(res => {
//        console.log('axios异步请求成功了！')
//        console.log(res.data)
//        this.goodsList = res.data.data
//        console.log(this.goodsList)
//      })
      this.getGoodsList()
    },
    methods: {
      isLogin (flag) {
        this.userName = flag
      },
      showFilterPop () {
        this.filterBy = true
        this.overLayFlag = true
      },
      setPriceFilter (index) {
        this.priceLevel = index
        this.closePop()
        this.page = 1
        this.getGoodsList()
      },
      closePop () {
        this.filterBy = false
        this.overLayFlag = false
      },
      // 获取商品列表
      getGoodsList (flag) {
        let param = {
          page: this.page,
          pageSize: this.pageSize,
          sort: this.sortFlag ? 1 : -1,
          priceLevel: this.priceLevel
        }
        this.loading = true
        this.http.get('/goods/list', {params: param}).then((response) => {
          this.loading = false
          let res = response.data
          if (res.status === '0') {
            // flag === true，证明是第二次或第二次以上加载数据了
            if (flag) {
              this.goodsList = this.goodsList.concat(res.result.list) // 数据追加
              this.busy = false // 无线滚动禁止 取消，意思就是开启无限滚动监听
              if (res.result.list.length === 0) {
                this.busy = true // 无线滚动禁止 启动
              } else {
                this.busy = false // 无线滚动禁止 取消
              }
            } else { // 第一次加载数据
              this.page = 1
              this.goodsList = res.result.list
              this.busy = false // 无线滚动禁止 取消
            }
          } else { // 接口调用异常
            this.goodsList = []
          }
        })
      },
      // 商品排序
      sortGoods () {
        this.page = 1
        this.sortFlag = !this.sortFlag
        this.getGoodsList()
      },
      // 加载更多
      loadMore () {
        this.busy = true // 无线滚动禁止
        setTimeout(() => {
          this.page++
          this.getGoodsList(true) // 调用获取商品的接口
        }, 10)
      },
      // 加入购物车
      addCart (proId) {
        if (!this.userName) {
          this.mdShow = true
          return
        }
        this.http.post('/goods/addCart', {productId: proId}).then((res) => {
          if (res.status === 0 || res.status === 200) {
            this.mdShowCart = true
            console.log('加入购物车成功！')
          } else {
            this.mdShow = true
            console.log('接口调取失败！')
          }
        })
      },
      closeModal () {
        this.mdShow = false
        this.mdShowCart = false
      }
    }
  }
</script>
<style lang="scss">
  .dd{
    border: 1px solid #f16f75;
    .ddd{
      font-size: 50px;
    }
  }
  .goodsList-wrapper{
    .load-more{
      text-align: center;
    }
  }
</style>
