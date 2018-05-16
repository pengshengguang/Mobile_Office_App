<template>
  <div>
    <div class="supplies-wrapper cover">
      <x-header class="whiteBgHeader" :left-options="{backText:'', preventGoBack: true}" @on-click-back="goBack">提交</x-header>
      <div class="content-box">
        <div class="category-box" v-for="item in mapSuppliesList">
          <div class="category-name">{{item.smallClass}}/{{item.suppliesList.length}}个品类/共{{item.count}}件</div> <!--大类-->
          <div class="category-content"> <!--大类下的小类商品列表-->
            <swipeout class="vux-1px-tb itemBox" :threshold=".2" v-for="(obj, index) in item.suppliesList" :key="index">
              <swipeout-item transition-mode="reveal">
                <div slot="right-menu">
                  <swipeout-button type="warn" @click.native="onButtonClick(obj)">删除</swipeout-button>
                </div>
                <div slot="content">
                  <div class="proName-line">
                    <div class="proName">{{obj.describe}}</div>
                    <div class="proNum">x{{obj.quantity}}</div>
                  </div>
                  <div class="proCode-line">{{obj.code}}</div>
                </div>
              </swipeout-item>
            </swipeout>
          </div>
        </div>
        <div class="textarea-box">
          <group style="width: 100%">
            <x-textarea class="require-item-x-input" placeholder="可输入列表中没有的办公用品"  v-model="orderNeeds"
                        :rows="2"
                        :show-counter="true" :max="100" :autosize='true'>
            </x-textarea>
          </group>
        </div>
        <div style="height: 83px;flex: none;"></div>
      </div>
      <div class="btn-box">
        <div class="text" @click="applyEvent">提交</div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import { XHeader, Group, XTextarea, Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'
  import HttpService from '@/services/HttpService'

  export default {
    data () {
      return {
        http: HttpService.getAxios,
        backgroundSelected: {
          backgroundImage: 'url(' + require('@/assets/img/supplies/icon-selected.png') + ')'
        },
        // selected-lucency
        backgroundSelectedLucency: {
          backgroundImage: 'url(' + require('@/assets/img/supplies/icon-selected-lucency.png') + ')'
        },
        // 历史购物车
        suppliesCart: [],
        // map化后的suppliesCart
        mapSuppliesList: [],
        // 类别
        classList: [],
        // 其他申请需求
        orderNeeds: ''
      }
    },
    components: {
      XHeader,
      Group,
      XTextarea,
      Swipeout,
      SwipeoutItem,
      SwipeoutButton
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
      },
      init () {
        this.getAllSmallClass()
      },
      // 获取所有二级类别
      getAllSmallClass () {
        let that = this
        this.loading(true)
        that.http.get('/supplies/getAllSmallClass').then((response) => {
          this.loading(false)
          if (response.status === 200) {
            let res = response.data
            if (res.status === '0') {
              that.classList = res.result
              this.getSuppliesCart() // 查询数据库历史购物车清单
            } else {
              that.$vux.toast.show({ text: '请求失败', type: 'text' })
            }
          } else {
            that.$vux.toast.show({ text: '接口异常', type: 'text' })
          }
        })
      },
      // 获取购物车清单
      getSuppliesCart () {
        this.loading(true)
        this.http.get('/supplies/getSuppliesCart').then((response) => {
          this.loading(false)
          if (response.status === 200) {
            let res = response.data
            if (res.status === '0') {
              this.suppliesCart = res.result
              this.normalizeSuppliesCartList(this.suppliesCart)
              console.log('获取购物车成功！')
            } else {
              this.$vux.toast.show({ text: '请求失败', type: 'text' })
            }
          } else {
            this.$vux.toast.show({ text: '接口异常', type: 'text' })
          }
        })
      },
      // 格式化购物车清单
      normalizeSuppliesCartList (list) {
        let that = this
        let map = {}
        list.forEach((item, index) => {
          // smallClassCode转化为smallClass
          let className = that.matchSmallClass(item.smallClassCode)
          const key = className
          if (!map[key]) {
            map[key] = {
              count: 0,
              suppliesList: []
            }
          }
          map[key].suppliesList.push(item)
          let count = map[key].count + item.quantity
          map[key].count = count
        })
        let newlist = []
        for (let key in map) {
          let val = {}
          val.smallClass = key
          val.count = map[key].count
          val.suppliesList = map[key].suppliesList
          newlist.push(val)
        }
        this.mapSuppliesList = newlist
      },
      // 匹配二级分类
      matchSmallClass (smallClassCode) {
        for (let i = 0; i < this.classList.length; i++) {
          if (this.classList[i].smallClassCode === smallClassCode) {
            return this.classList[i].smallClass
          }
        }
      },
      // 删除清单项
      onButtonClick (item) {
        // 删除数据库购物车项
        let congfig = {
          code: item.code
        }
        this.loading(true)
        this.http.post('/supplies/removeSupplies/', congfig).then((response) => {
          this.loading(false)
          if (response.status === 200) {
            let res = response.data
            if (res.status === '0') {
              console.log('删除数据库商品成功！')
              this.updateStore(item.code)
            } else {
              this.$vux.toast.show({ text: '删除失败', type: 'text' })
            }
          } else {
            this.$vux.toast.show({ text: '接口异常', type: 'text' })
          }
        })
      },
      // 更新数据
      updateStore (code) {
        // 更新store状态
        let suppliesStore = this.$store.state.supplies
        suppliesStore.suppliesCart.forEach((item, index) => {
          if (item.code === code) {
            suppliesStore.suppliesCart.splice(index, 1)
          }
        })
        this.$store.commit('setSupplies', suppliesStore)
        // 更新mapSuppliesList
        for (let i = 0; i < this.mapSuppliesList.length; i++) {
          for (let j = 0; j < this.mapSuppliesList[i].suppliesList.length; j++) {
            if (this.mapSuppliesList[i].suppliesList[j].code === code) { // 删除用品代码为code的用品
              this.mapSuppliesList[i].count -= this.mapSuppliesList[i].suppliesList[j].quantity // 该smallClass类的总用品数量更新
              this.mapSuppliesList[i].suppliesList.splice(j, 1) // 删除该用品
              if (this.mapSuppliesList[i].count === 0) { // 如果该smallClass类的总数量为0，则把该smallClass对象整个去除
                this.mapSuppliesList.splice(i, 1)
              }
              break
            }
          }
        }
      },
      // 提交按钮
      applyEvent () {
        let that = this
        this.$vux.confirm.show({
          content: `是否确认申请购物清单内的办公用品？`,
          confirmText: '确认申请',
          cancelText: '继续挑选',
          onShow () {
            console.log('plugin show')
          },
          onHide () {
            console.log('plugin hide')
          },
          onCancel () {
            console.log('plugin hide')
          },
          onConfirm () {
            that.onConfirm()
          }
        })
      },
      // 确认申请
      onConfirm () {
        let config = {
          orderNeeds: this.orderNeeds,
          supplies: this.mapSuppliesList
        }
        this.loading(true)
        this.http.post('/supplies/suppliesApply', config).then((response) => {
          this.loading(false)
          if (response.status === 200) {
            let res = response.data
            if (res.status === '0') {
              console.log('订单成功生成！')
              this.clearData()
            } else {
              this.$vux.toast.show({ text: '订单生成失败', type: 'text' })
            }
          } else {
            this.$vux.toast.show({ text: '接口异常', type: 'text' })
          }
        })
      },
      // 清空数据
      clearData () {
        this.mapSuppliesList = []
        this.orderNeeds = ''
        this.$store.commit('setSuppliesCart', [])
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
  .supplies-wrapper{
    .textarea-box{
      .weui-textarea-counter{
        font-size: 14px;
      }
      .weui-cells{
        margin-top: 0;
        width: 90%;
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
</style>

<style lang="scss" scoped>
  .supplies-wrapper{
    display: flex;
    flex-direction: column;
    .content-box{
      flex: auto;
      display: flex;
      flex-direction: column;
      overflow: auto;
      .category-box{
        border-bottom: 10px solid #ededed;
        .category-name{
          font-size: 16px;
          font-weight: bold;
          padding: 8px 0 8px 18px;
          border-bottom: 1px solid #eaeaea;
        }
        .category-content{
          padding-left: 18px;
          .proName-line{
            padding: 8px 0;
            display: flex;
            .proName{
              flex: 0 0 70%;
              font-size: 16px;
            }
            .proNum{
              flex: 0 0 30%;
              align-self: flex-start;
              padding-left: 60px;
              font-weight: bold;
              font-size: 16px;
            }
          }
          .proCode-line{
            padding: 0 0 8px 0;
          }
        }
      }
      .textarea-box{
        padding-top: 16px;
      }
    }
    .btn-box{
      position: fixed;
      bottom: 0;
      height: 44px;
      width: 100%;
      display: flex;
      justify-content: flex-end;
      background-color: #ededed;
      .text{
        font-size: 18px;
        color: #ffffff;
        flex: 0 0 140px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #149c81;
      }
    }
  }
</style>
