<template>
  <transition name="slide">
    <div class="supplies-wrapper cover">
      <x-header class="whiteBgHeader" :left-options="{backText:'', preventGoBack: true}" @on-click-back="goBack">办公用品<div class="add" slot="right" @click="toClassifyView"></div></x-header>
      <div class="tab-box">
        <div class="feedback-tab" @click="tab_click(0);" :class="{'active':tabnum === 0}">已反馈（10）</div>
        <div class="empty"></div>
        <div class="no-feedback-tab" @click="tab_click(1);" :class="{'active':tabnum === 1}">待审批（20）</div>
        <div class="approvaling-tab" @click="tab_click(2);" :class="{'active':tabnum === 2}" style="display: none">审批中（20）</div>
      </div>
      <div class="main-box">
        <div class="approval-apply-list">
          <supplies-apply-item></supplies-apply-item>
          <supplies-apply-item></supplies-apply-item>
          <supplies-apply-item></supplies-apply-item>
          <supplies-apply-item></supplies-apply-item>
          <supplies-apply-item></supplies-apply-item>
          <supplies-apply-item></supplies-apply-item>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </transition>
</template>

<script>
  import { XHeader } from 'vux'
  import SuppliesApplyItem from './assembly/SuppliesApplyItem.vue'

  export default {
    data () {
      return {
        // tab页签
        tabnum: 0
      }
    },
    components: {
      XHeader,
      SuppliesApplyItem
    },
    methods: {
      goBack () {
        this.$router.push({
          name: 'work'
        })
      },
      tab_click (num) {
        this.tabnum = num
      },
      toClassifyView () {
        this.$router.push({
          name: 'SuppliesClassify'
        })
      }
    }
  }
</script>

<style lang="scss">
  .slide-enter-active,.slide-leave-active{
    transition: all 0.8s;// 关于vue自带的动画效果，可看官网
  }
  .slide-enter, .slide-leave-to{
    transform: translate3d(100%, 0, 0)
  }
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
      }
      .approvaling-tab{
        flex: auto;
        display: flex;
        justify-content: center;
        align-items: center;
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
