<template>
  <div class="apply-item-wrapper">
    <div class="apply-content-box">
      <div class="more">
        <div class="showArrow" v-if="isShowMore&&applyItem.supplies.length>0" @click="isMore">
          <div class="right_icon" :style='downArrowRight'></div>
        </div>
        <div class="showArrow" v-if="!isShowMore&&applyItem.supplies.length>0" @click="isMore">
          <div class="right_icon" :style='upArrowRight'></div>
        </div>
      </div>
      <div class="cencel" v-if="tabnum === 0">撤回</div>
      <div class="applicants-line"><span v-if="isApproval">管理员</span><span v-else>开发工程师</span>/{{applyItem.applicant}}</div>
      <div class="type-time-line">{{totalClass}}个品类/共{{totalCount}}件/   {{applyItem.startTime}}</div>
      <div class="category-box" v-if="isShowMore" v-for="suppliesClass in applyItem.supplies">
        <div class="category-name">{{suppliesClass.smallClass}}<span>{{suppliesClass.suppliesList.length}}个品类/共{{suppliesClass.count}}件</span></div> <!--大类-->
        <div class="category-content" v-for="item in suppliesClass.suppliesList"> <!--大类下的小类商品列表-->
          <div class="proName-line">
            <div class="proName">{{item.describe}}</div>
            <div class="proNum">x{{item.quantity}}</div>
          </div>
          <div class="proCode-line">{{item.code}}</div>
        </div>
      </div>
    </div>
    <div class="my-msg-line" v-if="applyItem.orderNeeds">备注：{{applyItem.orderNeeds}}</div>
    <div class="msg-line">意见：我知道了，请带薪等候。</div>
    <div class="btn-box" v-if="tabnum === 0&&isApproval">我知道了</div>
    <div class="empty-box"></div>
  </div>
</template>

<script>
  export default {
    props: {
      applyItem: {
        type: Object,
        default: []
      },
      tabnum: {
        type: Number,
        default: 0
      },
      isApproval: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        isShowMore: false, // 是否显示更多
        // 收起展开Icon
        upArrowRight: {
          backgroundImage: 'url(' + require('@/assets/img/supplies/J82-icon-shrink.png') + ')'
        },
        downArrowRight: {
          backgroundImage: 'url(' + require('@/assets/img/supplies/J82-icon-unflod.png') + ')'
        },
        totalClass: 0,
        totalCount: 0
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        this.getTotal()
      },
      isMore () {
        this.isShowMore = !this.isShowMore
      },
      getTotal () {
        let totalClass = 0
        let totalCount = 0
        this.applyItem.supplies.forEach(item => {
          totalClass += item.suppliesList.length
          totalCount += item.count
        })
        this.totalClass = totalClass
        this.totalCount = totalCount
      }
    }
  }
</script>
<style>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .1s
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }
</style>
<style lang="scss" scoped>
  .apply-item-wrapper{
    display: flex;
    flex-direction: column;
    .apply-content-box{
      font-family: "微软雅黑" !important;
      position: relative;
      .more{
        position: absolute;
        top: 10px;
        right: 22px;
        width: 26px;
        height: 26px;
        .showArrow{
          width: 100%;
          height: 100%;
          .right_icon{
            background-size: 100% 100%;
            width: 100%;
            height: 100%;
          }
        }
      }
      .cencel{
        position: absolute;
        font-size: 12px;
        color: #3271C2;
        border: 1px solid #3271C2;
        width: 42px;
        border-radius: 3px;
        right: 73px;
        top: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .applicants-line{
        padding-left: 18px;
        padding-top: 10px;
        padding-bottom: 4px;
        font-weight: bold;
        font-size: 16px;
      }
      .type-time-line{
        color: #999999;
        font-size: 14px;
        padding-left: 18px;
        padding-top: 8px;
        padding-bottom: 8px;
        border-bottom: 1px solid #eaeaea;
      }
      .category-box{
        border-top: 1px solid #eaeaea;
        .category-name{
          font-size: 16px;
          font-weight: bold;
          padding: 8px 0 8px 18px;
          border-bottom: 1px solid #eaeaea;
          span{
            font-weight: normal;
            font-size: 14px;
            color: #999999;
            padding-left: 30px;
          }
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
    }
    .msg-line{
      padding: 8px 0;
      border-top: 1px solid #eaeaea;
      margin-left: 18px;
      color: #149c81;
    }
    .my-msg-line{
      padding: 8px 0;
      border-top: 1px solid #eaeaea;
      margin-left: 18px;
      /*color: #149c81;*/
    }
    .btn-box{
      flex: 0 0 44px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #149c81;
      font-size: 16px;
      background-color:#FFFFFF;
      width:100%;
      padding: 9px 0px;
      border:none;
      font-family: "微软雅黑" !important;
      border-top: 1px solid #eaeaea;
    }
    .empty-box{
      flex: 0 0 14px;
      background: #f0f4f7;
    }
  }
</style>
