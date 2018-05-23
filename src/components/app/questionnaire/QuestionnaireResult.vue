<template>
  <div class="questionnaire-result-wrapper">
    <!-- 顶部标题 -->
    <x-header class="whiteBgHeader" :left-options="{backText:'', preventGoBack: true}" @on-click-back="goBack">2017年度远光智慧商旅服务满意度调查</x-header>
    <!--问卷主体内容-->
    <div class="questionnaire-list-wrapper" ref="listBox">
      <!--问卷描述-->
      <div class="questionnaire-header">
        <div class="questionnaire-title">{{result.questionnaireTitle}}</div>
        <span class="questionnnaire-describe">{{result.questionnaireDescribe}}</span>
      </div>
      <div class="total-people">参与人数：{{result.attendNum}}人</div>
      <!--问卷题组件 接收 item（单条题目总信息）  index（当前题目索引）  questionsNum（问卷总题数）-->
      <QuestionnaireItem ref="item" v-for="(item, index) in result.list"  :key="index" :index="index+1" :questionsNum="result.list.length" :item="item"></QuestionnaireItem>
    </div>
  </div>
</template>
<script>
  import { XHeader } from 'vux'
  import QuestionnaireItem from '@/components/app/questionnaire/assembly/QuestionnaireItem'
//  import axios from 'axios'

  export default {
    components: {
      XHeader,
      QuestionnaireItem
    },
    data () {
      return {
        oldVal: 0,
        intervalId: null,
        targetTop: null,
        result: {}
      }
    },
    mounted () {
      this.getQuestionsResultData()
    },
    methods: {
      goBack () {
        this.$router.back()
      },
      // 根据ID获取问卷统计数据
      getQuestionsResultData () {
//        axios.get('/api/result').then(res => {
//          if (res.status === 200) {
//            this.result = res.data.data
//            console.log('调查问卷统计结果数据收到')
//            console.log(this.result)
//            console.log('----------------------')
//          }
//        })
        this.result = this.$route.params.result
      }
    }
  }
</script>
<!--头部样式-->
<style lang="scss">  /*不需要加scoped，加了scoped之后，无法修改头部*/
.questionnaire-result-wrapper{
  .whiteBgHeader{
    .vux-header-title{
      margin: 0 60px !important;
    }
  }
}
</style>
<style scoped lang="scss">
  .questionnaire-result-wrapper{
    display: flex;
    flex-direction: column;
    background-color: #fff;
    .total-people{
      flex: none;
      height: 40px;
      align-items: center;
      justify-content: center;
      display: flex;
      padding: 18px 0 15px 0;
      font-size: 16px;
      color: #999;
      justify-content: center;
    }
    .questionnaire-list-wrapper{
      position: relative;
      overflow: auto;
      transition-duration: 5s;
      -moz-transition-duration: 5s; /* Firefox 4 */
      -webkit-transition-duration: 5s; /* Safari 和 Chrome */
      -o-transition-duration: 5s; /* Opera */
      .questionnaire-header{
        background: url('../../../assets/img/questionnaire/questionBg.png');
        background-size: 100% 100%;
        background-color: #f2f4f5;
        display: flex;
        flex-direction: column;
        padding: 25px 22px 20px 22px;
        font-size: 14px;
        color: #4d4a49;
        .questionnaire-title{
          font-size: 18px;
          font-weight: bold;
          padding-bottom: 4px;
          color: #020f17;
        }
        .questionnnaire-describe{
          font-size: 14px;
        }
      }
    }
  }
</style>
