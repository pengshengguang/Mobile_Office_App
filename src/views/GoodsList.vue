<template>
  <div>
    <nav-header></nav-header>
    <nav-bread>
      <span slot="two">aaa</span>
    </nav-bread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default cur">Default</a>
          <a @click="sortGoods" href="javascript:void(0)" class="price">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
          <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter" :class="{'filterby-show': filterBy}">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd><a href="javascript:void(0)" :class="{'cur': priceChecked === 'all'}" @click="priceChecked = 'all'">All</a></dd>
              <dd v-for="(price,index) in priceFiter" @click="setPriceFilter(index)">
                <a href="javascript:void(0)" :class="{'cur': priceChecked === index}">{{price.startPrice}} - {{price.endPrice}}</a>
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
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
    <nav-footer></nav-footer>
    <!--加载更多插件-->
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10"></div>
  </div>
</template>
<script>
  import NavHeader from '@/components/NavHeader'
  import NavFooter from '@/components/NavFooter'
  import NavBread from '@/components/NavBread'
  import axios from 'axios'
  import Httpservice from '@/services/HttpService'

  export default {
    data () {
      return {
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
        priceChecked: 'all',
        filterBy: false,
        overLayFlag: false,
        sortFlag: true, // 排序标志，默认升序
        page: 1,
        pageSize: 8,
        // 加载更多属性
        busy: true// 无线滚动禁用
      }
    },
    components: {
      NavHeader,
      NavFooter,
      NavBread
    },
    mounted () {
      axios.get('/api/goods').then(res => {
        console.log('axios异步请求成功了！')
        console.log(res.data)
        this.goodsList = res.data.data
        console.log(this.goodsList)
      })
      this.getGoodsList()
    },
    methods: {
      showFilterPop () {
        this.filterBy = true
        this.overLayFlag = true
      },
      setPriceFilter (index) {
        this.priceChecked = index
        this.closePop()
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
          sort: this.sortFlag ? 1 : -1
        }
        this.http.get('/goods', {params: param}).then((response) => {
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
        this.sortFlag = !this.sortFlag
        this.getGoodsList()
      },
      // 加载更多
      loadMore () {
        this.busy = true // 无线滚动禁止
        setTimeout(() => {
          this.page++
          this.getGoodsList(true) // 调用获取商品的接口
        }, 1)
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
</style>
