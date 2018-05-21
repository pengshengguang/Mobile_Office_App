<template>
  <div class="personal-item-wrapper">
    <div class="item-box">
      <div class="flag-box" v-if="tabnum === 0">
        <div class="flag-text">结束</div>
      </div>
      <div class="left-box">
        <div class="center-box">
          <span class="text">已参与人</span>
          <span class="number">1</span>
        </div>
      </div>
      <div class="right-box">
        <div class="title">{{questionnaire.questionnaireTitle}}</div>
        <div class="content-box">
          <div class="time-line">{{formatTime(questionnaire.timeStart)}} 至 {{formatTime(questionnaire.timeEnd)}}</div>
          <div class="publisher">{{questionnaire.publisher}}</div>
        </div>
      </div>
      <div class="icon-box" v-if="tabnum === 1">
        <i></i>
      </div>
    </div>
    <div class="btn-box" v-if="tabnum === 0">马上参与</div>
  </div>
</template>

<script>
  export default {
    props: ['tabnum', 'questionnaire'],
    data () {
      return {
      }
    },
    methods: {
      // 日期转换
      formatTime (data) {
        let past = new Date(data)
        let now = new Date()
        let year = past.getFullYear()
        let month = past.getMonth() + 1
        let day = past.getDate()
        if (month > 0 && month < 10) {
          month = '0' + month
        }
        // 如果是当前年份，不显示年份
        if (past.getFullYear() === now.getFullYear()) {
          return month + '-' + day
        }
        return year + '-' + month + '-' + day
      }
    }
  }
</script>
<style scoped lang="scss">
  .personal-item-wrapper{
    border-bottom: 10px solid #f4f4f3;
    .item-box{
      position: relative;
      display: flex;
      padding: 10px;
      .flag-box{
        position: absolute;
        top: 0;
        left: 0;
        width: 0px;
        height: 0px;
        border-color: transparent #dfb01c;
        border-width: 0 0 44px 44px;
        border-style: solid;
        .flag-text{
          position: absolute;
          left: -44px;
          top: 6px;
          width: 30px;
          -webkit-transform: rotate(-36deg);
          transform: rotate(-45deg);
          color: #fff;
          font-size: 14px;
        }
      }
      .left-box{
        flex: 1 1 24%;
        display: flex;
        justify-content: center;
        align-items: center;
        .center-box{
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .text{
            font-size: 14px;
            color: #959595;
          }
          .number{
            font-size: 20px;
            color: #008e6f;
            padding-top: 6px;
          }
        }
      }
      .right-box{
        flex: 1 1 66%;
        padding-left: 10px;
        .title{
          font-size: 16px;
          /*font-weight: bold;*/
          /*padding-bottom: 12px;*/
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .content-box{
          padding-top: 6px;
          color: #5f5f5f;
          .time-line{
            padding-bottom: 4px;
          }
          .publisher{
            padding-bottom: 6px;
          }
        }
      }
      .icon-box{
        flex: 1 1 10%;
        display: flex;
        justify-content: center;
        align-items: center;
        i{
          width: 22px;
          height: 22px;
          background: url("./../../../../assets/img/questionnaire/icon_arrow_right.png") no-repeat;
          background-size: 100% 100%;
        }
      }
    }
    .btn-box{
      display: flex;
      justify-content: center;
      align-items: center;
      border-top: 1px solid #dddddd;
      padding: 12px 0;
      font-size: 16px;
      color: #008e6f;
    }
  }
</style>
