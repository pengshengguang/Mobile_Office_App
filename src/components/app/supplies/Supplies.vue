<template>
  <div>
    <div class="supplies-wrapper cover">
      <x-header class="whiteBgHeader" :left-options="{backText:'', preventGoBack: true}" @on-click-back="goBack">办公用品</x-header>
      <div class="tab-box">
        <div class="feedback-tab" @click="tab_click(1);" :class="{'active':tabnum === 1}">已反馈（{{tabState.checkedCount}}）<i :style="{top: tabnum === 1 ? 12 + 'px' : 0}" v-if="tabState.checkedNoRead"></i></div>
        <div class="empty"></div>
        <div class="no-feedback-tab" ref="inApprovalDiv" @click="tab_click(0);" :class="{'active':tabnum === 0}" v-if="isApproval">待审批（{{tabState.inApprovalCount}})<i :style="{top: tabnum === 0 ? 12 + 'px' : 0}" v-if="tabState.inApprovalNoRead"></i></div>
        <div class="approvaling-tab" ref="inApprovalDiv" @click="tab_click(0);" :class="{'active':tabnum === 0}" v-else>审批中（{{tabState.inApprovalCount}}）<i :style="{top: tabnum === 0 ? 12 + 'px' : 0}" v-if="tabState.inApprovalNoRead"></i></div>
      </div>
      <div class="main-box">
        <div class="approval-apply-list">
          <supplies-apply-item  v-for="(applyItem, index) in applyList" :key="index" :applyItem="applyItem" :tabnum="tabnum" :isApproval="isApproval" :initialize="initialize"></supplies-apply-item>
          <div class="loading-icon" style="text-align: center" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
            <!--<img src="@/assets/loading-spinning-bubbles.svg" v-show="isLoading" width="50px">-->
            <spinner type='lines' v-show="isLoading"></spinner>
          </div>
        </div>
        <div class="empty-tips-wrapper" v-if="applyList.length === 0">
          <div class="empty-tips-box" v-if="tabnum === 0">
            <i class="add-approval-icon" :style="backgroundNoDate" @click="toClassifyView"></i>
            <div class="line-1">你好，暂无审批内容</div>
            <div class="line-2">快来新建一个吧</div>
            <i class="spring-arrow-icon" :style="backgroundArrow"></i>
          </div>
          <div class="empty-tips-box" v-if="tabnum === 1">
            <div class="line-1">你好，暂无已审批内容</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { XHeader, Spinner } from 'vux'
  import SuppliesApplyItem from './assembly/SuppliesApplyItem.vue'
  import HttpService from '@/services/HttpService'

  export default {
    data () {
      return {
        // 图片引用-新增图标
        backgroundNoDate: {
          backgroundImage: 'url(' + require('@/assets/img/noData/icon_null_new.png') + ')'
        },
        // 图片引用-弹簧箭头图标
        backgroundArrow: {
          backgroundImage: 'url(' + require('@/assets/img/noData/null_arrow.jpg') + ')'
        },
        http: HttpService.getAxios,
        tabnum: 0, // tab页签
        applyList: [], // 申请列表
        userName: '',
        isApproval: false,
        tabState: {}, // tab标签页数据
        // 分页查询参数
        page: 1,
        pageSize: 8,
        busy: true,
        isLoading: false
      }
    },
    components: {
      XHeader,
      Spinner,
      SuppliesApplyItem
    },
    mounted () {
      this.initialize()
    },
    methods: {
      initialize () {
        this.page = 1
        this.checkIdentity()
        this.tab_click(0)
      },
      loading (isShow) {
        if (isShow) {
          this.$vux.loading.show({ text: '加载中' })
        } else {
          this.$vux.loading.hide()
        }
      },
      goBack () {
        this.$router.push({
          name: 'SuppliesClassify'
        })
      },
      // 检查当前用户是否审批人
      checkIdentity () {
        this.userName = this.$store.state.nickName
        if (this.userName === 'admin') {
          this.isApproval = true
        } else {
          this.isApproval = false
        }
      },
      tab_click (num) {
        this.page = 1
        this.applyList = []
        this.tabnum = num
        this.getApplyByTabnum() // 无参数 代表第一次加载数据
        this.getTabState()// 刷新tab状态值
      },
      toClassifyView () {
        this.$router.push({
          name: 'SuppliesClassify'
        })
      },
      // 根据tabnum获取申请信息
      getApplyByTabnum (flag) {
        let that = this
        this.loading(true)
        let param = {
          state: this.tabnum,
          page: this.page,
          pageSize: this.pageSize
        }
        this.http.get('/supplies/getOrderByState', {
          params: param
        }).then(response => {
          this.loading(false)
          if (response.status === 200) {
            let res = response.data
            if (res.status === '0') {
              if (flag) { // flag === true，证明是第二次或第二次以上加载数据了
                this.applyList = this.applyList.concat(res.result.list) // 数据追加
                this.busy = false // 无限滚动禁止 取消，意思就是开启无限滚动监听
                if (res.result.count === 0) {
                  this.busy = true // 无限滚动禁止 启动
                  this.$vux.toast.show({
                    text: '没有更多',
                    type: 'text'
                  })
                } else {
                  this.busy = false // 无限滚动禁止 取消
                }
              } else { // 第一次加载数据
                this.page = 1
                this.applyList = res.result.list
                this.busy = false // 无限滚动禁止 取消
                if (res.result.count === 0) {
                  this.$vux.toast.show({
                    text: '无数据',
                    type: 'text'
                  })
                  this.busy = true
                }
              }
            } else {
              that.$vux.toast.show({ text: '请求失败', type: 'text' })
            }
          } else {
            that.$vux.toast.show({ text: '接口异常', type: 'text' })
          }
        })
      },
      // 加载更多
      loadMore () {
        this.busy = true
        setTimeout(() => {
          this.page++
          this.getApplyByTabnum(true)
        }, 500)
      },
      // 获取tab头部状态值，已读未读，总条数等信息
      getTabState () {
        this.loading(true)
        this.http.get('/supplies/getTabState').then((response) => {
          this.loading(false)
          if (response.status === 200) {
            let res = response.data
            if (res.status === '0') {
              this.tabState = res.result
              console.log(this.tabState)
            } else {
              this.$vux.toast.show({ text: '接口异常,Tab状态值获取失败1', type: 'text' })
            }
          } else {
            this.$vux.toast.show({ text: '接口异常,Tab状态值获取失败2', type: 'text' })
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  .supplies-wrapper{
    .main-box{
      .approval-apply-list{
        .loading-icon{
          .vux-spinner{
            stroke: #149c81;
            height: 50px;
            width: 50px;
            svg{
              height: 50px;
              width: 50px;
            }
          }
        }
      }
    }
  }
</style>

<style lang="scss" scoped>
  .supplies-wrapper{
    color: #020F17 !important;
    display: flex;
    flex-direction: column;
    .tab-box{
      flex: 0 0 40px;
      display: flex;
      border-bottom: 1px solid #DFE1E3;
      background: #f0f4f7;
      align-items: center;/*让中间的分割线剧中*/
      /*background-color: #009de6;*/
      .feedback-tab{
        flex: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        i{
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: red;
          top: 0px;
          right: 45px;
        }
      }
      .empty{
        flex: 0 0 1px;
        background-color: #DFE1E3;
        height: 30px;
      }
      .no-feedback-tab{
        flex: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        i{
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: red;
          top: 0px;
          right: 45px;
        }
      }
      .approvaling-tab{
        flex: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        i{
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: red;
          top: 0px;
          right: 45px;
        }
      }

      .active{
        position: relative;
        color: #149c81;
        font-size: 16px;
        line-height: 2.75;
        &:before{
          content: "";
          background: #149c81;
          position: absolute;
          bottom: 2px;
          left: 50%;
          width: 45px;
          height: 2px;
          margin-left: -23px;
        }
      }
    }
    .main-box{
      flex: auto;
      display: flex;
      flex-direction: column;
      overflow: auto;
      .approval-apply-list{}
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
    }
  }
</style>
