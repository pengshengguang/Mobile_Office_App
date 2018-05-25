<template>
  <div class='information-details-wrapper'>
    <div class="title-box">
      <x-header class="whiteBgHeader" :left-options="{backText:'', preventGoBack: true}" @on-click-back="goBack">资讯详情</x-header>
    </div>
    <div class="container-box">
      <div class="head-box">
        干货 | 售电公司如何把握分布式发电市场化交易的机遇？
        <div class="time">2018-05-04<span class="author">欧阳光光</span></div>
      </div>
      <div class="content-box">
        最近，分布式发电市场化交易的政策密集下发，对于售电公司来说也是开辟新战场的好时机，本能源互联网为有意向参与分布式发电市场化交易的企业提供全面解决方案、试点申报资讯等服务。以下内容摘自能源互联网分布式发电市场交易研究报告，一起来探讨下~
      </div>
      <!--<div class="img-box">-->
        <!--<img src="./../../assets/img/information/dance.gif" alt="" width="100%" height="100%">-->
      <!--</div>-->
      <div class="comment-box">
        <div class="comment-head">精彩评论</div>
        <div class="comment-main">
          <div class="comment-detail-box">
            <div class="user-avatar">
              <img src="./../../assets/img/avatar/men1.png" alt="" width="100%" height="100%">
            </div>
            <div class="user-comment-box">
              <div class="user-name">欧阳光光</div>
              <div class="user-comment">我觉得超级厉害的我觉得超级厉害的我觉得超级厉害的我觉得超级厉害的我觉得超级厉害的</div>
              <div class="comment-time">04-30</div>
              <div class="divide"></div>
            </div>
          </div>
          <div class="comment-detail-box">
            <div class="user-avatar">
              <img src="./../../assets/img/avatar/men1.png" alt="" width="100%" height="100%">
            </div>
            <div class="user-comment-box">
              <div class="user-name">欧阳光光</div>
              <div class="user-comment">我觉得超级厉害的</div>
              <div class="comment-time">04-30</div>
              <div class="divide"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="botton-box">
      <div class="comment-btn">评论</div>
      <div class="empty-btn"></div>
      <div class="edit-btn" v-if="isApproval">编辑</div>
    </div>
  </div>
</template>

<script>
  import { XHeader } from 'vux'

  export default {
    components: {
      XHeader
    },
    data () {
      return {
        msg: '资讯详情',
        userName: '',
        isApproval: false
      }
    },
    mounted () {
      this.checkIdentity()
    },
    methods: {
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
      }
    }
  }
</script>

<style lang="scss">
  .information-details-wrapper{

  }
</style>
<style lang="scss" scoped>
  .information-details-wrapper{
    display: flex;
    flex-direction: column;
    height: 100%;
    .title-box{
      flex: none;
    }
    .container-box{
      overflow: auto;
      flex: auto;
      padding: 18px;
      .head-box{
        font-size: 20px;
        color: #000;
        .time{
          font-size: 15px;
          padding-top: 10px;
          color: #747474;
          .author{
            padding-left: 10px;
            color: #145980;
          }
        }
      }
      .content-box{
        position: relative;
        padding-top: 30px;
        padding-bottom: 24px;
        font-size: 16px;
        text-indent: 2em;
        &:before{
          position: absolute;
          content: '';
          left: 0;
          top: 10px;
          width: 60px;
          height: 20px;
          background: url("./../../assets/img/information/text-left-icon.png") no-repeat;
          background-size: 100% 100%;
        }
        &:after{
          position: absolute;
          content: '';
          right: 0;
          bottom: 0;
          width: 60px;
          height: 20px;
          background: url("./../../assets/img/information/text-right-icon.png") no-repeat;
          background-size: 100% 100%;
        }
      }
      .img-box{
        padding-top: 20px;
      }
      .comment-box{
        padding-top: 40px;
        height: 220px;
        background-color: #fff;
        .comment-head{
          box-shadow: 0px 0px 10px 5px #aaa;
          background-color: #f6f6f6;
          text-indent: 1em;
        }
        .comment-main{
          padding-top: 20px;
          .comment-detail-box{
            display: flex;
            padding-bottom: 20px;
            /*align-items: center;*/
            .user-avatar{
              width: 50px;
              height: 50px;
              flex: none;
              img{
                width: 100%;
                height: 100%;
                /*border-radius: 50%;*/
              }
            }
            .user-comment-box{
              flex: auto;
              display: flex;
              flex-direction: column;
              padding-left: 20px;
              .user-name{
                padding-bottom: 10px;
              }
              .user-comment{
                padding-bottom: 10px;
              }
              .comment-time{
                padding-bottom: 10px;
              }
              .divide{
                width: 100%;
                height: 1px;
                border-bottom: 1px solid #e9e9e9;
              }
            }
          }
        }
      }
    }
    .botton-box{
      flex: none;
      display: flex;
      /*justify-content: center;*/
      align-items: center;
      height: 42px;
      width: 100%;
      background-color: #149c81;
      font-size: 20px;
      color: #fff;
      .comment-btn{
        height: 100%;
        flex: auto;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .empty-btn{
        height: 100%;
        flex: 0 0 1px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #fff;
      }
      .edit-btn{
        height: 100%;
        flex: auto;
        display: flex;
        align-items: center;
        justify-content: center;
      }

    }

  }
</style>
