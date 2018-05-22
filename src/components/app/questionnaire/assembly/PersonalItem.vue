<template>
  <div class="personal-item-wrapper">
    <div class="item-box">
      <div class="ing-flag-box" v-if="state === 0">
        <div class="flag-text">进行中</div>
      </div>
      <div class="flag-box" v-if="state === -1">
        <div class="flag-text">已结束</div>
      </div>
      <div class="left-box">
        <div class="center-box">
          <span class="text">已参与人</span>
          <span class="number">{{questionnaire.attendNum}}</span>
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
    <div class="btn-box" v-if="tabnum === 0" :class="{'btn-box-dis': state === -1}" @click="takePartIn(questionnaire)">马上参与</div>
    <div class="btn-box" v-if="tabnum === 2">统计结果</div>
  </div>
</template>

<script>
  export default {
    props: ['tabnum', 'questionnaire'],
    data () {
      return {
        state: 0 // 问卷状态 0：有效期内；-1：过期结束
      }
    },
    mounted () {
      this.checkValidityPeriod()
      console.log('传进来的questionnaire为：')
      console.log(this.questionnaire)
    },
    methods: {
      // 日期转换
      formatTime (data) {
        let past = new Date(data) // 问卷结束时间
        let now = new Date() // 当前系统时间
        // 格式化问卷结束时间
        let year = past.getFullYear()
        let month = this.fillZero(past.getMonth() + 1, 2) // 月份补0
        let day = this.fillZero(past.getDate(), 2) // 天补0
        // 格式化当前时间YYYY-MMM-DD
        this.currentTime = now.getFullYear() + '-' + this.fillZero(now.getMonth() + 1, 2) + '-' + this.fillZero(now.getDate(), 2)
        // 格式化问卷结束时间
        // 如果是当前年份，不显示年份
        if (past.getFullYear() === now.getFullYear()) {
          return month + '-' + day
        }
        return year + '-' + month + '-' + day
      },
      // 补0
      fillZero (number, digits) {
        number = String(number)
        let length = number.length
        if (length < digits) {
          for (let i = 0; i < digits - length; i++) {
            number = '0' + number
          }
        }
        return number
      },
      // 判断问卷状态
      checkValidityPeriod () {
        let time = this.questionnaire.timeEnd // 问卷结束时间
        let timeEnd = new Date(time)
        let year = timeEnd.getFullYear()
        let month = this.fillZero(timeEnd.getMonth() + 1, 2)
        let day = this.fillZero(timeEnd.getDate(), 2)
        timeEnd = year + '-' + month + '-' + day
        console.log('--------------------')
        console.log(this.currentTime)
        console.log(timeEnd)
        console.log(this.currentTime > timeEnd)
        console.log('--------------------')
        if (this.currentTime > timeEnd) {
          this.state = -1 // 已结束
        } else {
          this.state = 0 // 进行中
        }
      },
      // 马上参与
      takePartIn (questionnaire) {
        if (this.state === -1) {
          this.$vux.alert.show({
            title: '提示',
            content: '该问卷已过有效期，无法参与作答'
          })
          return
        }
        let param = {
          questionnaire: questionnaire
        }
        this.$router.push({name: 'questionnaireDetails', params: param})
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
      .ing-flag-box{
        position: absolute;
        top: 0;
        left: 0;
        width: 0px;
        height: 0px;
        border-color: transparent #149c81;
        border-width: 0 0 52px 52px;
        border-style: solid;
        .flag-text{
          position: absolute;
          left: -56px;
          top: 9px;
          width: 43px;
          -webkit-transform: rotate(-36deg);
          transform: rotate(-45deg);
          color: #fff;
          font-size: 14px;
        }
      }
      .flag-box{
        position: absolute;
        top: 0;
        left: 0;
        width: 0px;
        height: 0px;
        border-color: transparent #dfb01c;
        border-width: 0 0 52px 52px;
        border-style: solid;
        .flag-text{
          position: absolute;
          left: -56px;
          top: 9px;
          width: 43px;
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
    .btn-box-dis{
      color: #a0a0a0!important;
      cursor: default;
    }
  }
</style>
