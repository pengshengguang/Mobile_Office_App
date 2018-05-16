<template>
  <div>
    <div class="supplies-wrapper cover">
      <x-header class="whiteBgHeader" :left-options="{backText:'', preventGoBack: true}" @on-click-back="goBack">办公用品<div class="add" slot="right" @click="toClassifyView"></div></x-header>
      <div class="tab-box">
        <div class="feedback-tab" @click="tab_click(1);" :class="{'active':tabnum === 1}">已反馈（{{tabState.checkedCount}}）<i :style="{top: tabnum === 1 ? 12 + 'px' : 0}" v-if="tabState.checkedNoRead"></i></div>
        <div class="empty"></div>
        <div class="no-feedback-tab" ref="inApprovalDiv" @click="tab_click(0);" :class="{'active':tabnum === 0}" v-if="isApproval">待审批（{{tabState.inApprovalCount}})<i :style="{top: tabnum === 0 ? 12 + 'px' : 0}" v-if="tabState.inApprovalNoRead"></i></div>
        <div class="approvaling-tab" ref="inApprovalDiv" @click="tab_click(0);" :class="{'active':tabnum === 0}" v-else>审批中（{{tabState.inApprovalCount}}）<i :style="{top: tabnum === 0 ? 12 + 'px' : 0}" v-if="tabState.inApprovalNoRead"></i></div>
      </div>
      <div class="main-box">
        <div class="approval-apply-list">
          <supplies-apply-item  v-for="(applyItem, index) in applyList" :key="index" :applyItem="applyItem" :tabnum="tabnum" :isApproval="isApproval"></supplies-apply-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { XHeader } from 'vux'
  import SuppliesApplyItem from './assembly/SuppliesApplyItem.vue'
  import HttpService from '@/services/HttpService'

  export default {
    data () {
      return {
        http: HttpService.getAxios,
        tabnum: 0, // tab页签
        applyList: [], // 申请列表
        userName: '',
        isApproval: false,
        tabState: {} // tab标签页数据
      }
    },
    components: {
      XHeader,
      SuppliesApplyItem
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
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
        this.$router.back()
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
        this.applyList = []
        this.tabnum = num
        this.getApplyByTabnum()
        this.getTabState()// 刷新tab状态值
      },
      toClassifyView () {
        this.$router.push({
          name: 'SuppliesClassify'
        })
      },
      // 根据tabnum获取申请信息
      getApplyByTabnum () {
        let that = this
        this.loading(true)
        let param = {
          state: this.tabnum
        }
        this.http.get('/supplies/getOrderByState', {
          params: param
        }).then(response => {
          this.loading(false)
          if (response.status === 200) {
            let res = response.data
            if (res.status === '0') {
              console.log(res.result)
              this.applyList = res.result
            } else {
              that.$vux.toast.show({ text: '请求失败', type: 'text' })
            }
          } else {
            that.$vux.toast.show({ text: '接口异常', type: 'text' })
          }
        })
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
    .add{
      width: 22px;
      height: 22px;
      display: inline-block;
      background: url("./../../../assets/img/information/addIcon.png") no-repeat;
      background-size: 100% 100%;
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
      .approval-apply-list{
      }
    }
  }
</style>
