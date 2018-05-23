<template>
  <div class="questionnaire-details-wrapper">
    <!-- 顶部标题 -->
    <x-header class="whiteBgHeader" :left-options="{backText:'', preventGoBack: true}" @on-click-back="goBack">调查问卷</x-header>
    <!--问卷主体内容-->
    <div class="questionnaire-list-wrapper" ref="aaa">
      <!--问卷描述-->
      <div class="questionnaire-header">
        <div class="questionnaire-title">{{questions.questionnaireTitle}}</div>
        <span class="questionnnaire-describe">{{questions.questionnaireDescribe}}</span>
      </div>
      <!--问卷题组件 接收 item（单条题目总信息）  index（当前题目索引）  questionsNum（问卷总题数）-->
      <div class="questionnaire-list-box" ref="questionnaireListBox">
        <QuestionnaireItem ref="questionnaireItem" v-for="(item,index) in questions.list" :item="item" :questionsNum="questions.list.length" :key="index" :index="index+1" @setEachAnswer="updateAnswer" :isSumbit="isSumbit"></QuestionnaireItem>
      </div>
      <!--底部提交按钮-->
      <div class="btn-box">
        <div class="submit" @click="checkQuestionnaire()">提交</div>
      </div>
    </div>
  </div>
</template>
<script>
  import { XHeader, Confirm } from 'vux'
  import HttpService from '@/services/HttpService'
  import QuestionnaireItem from '@/components/app/questionnaire/assembly/QuestionnaireItem'
//  import axios from 'axios'

  export default {
    components: {
      XHeader,
      Confirm,
      QuestionnaireItem
    },
    data () {
      return {
        http: HttpService.getAxios,
        questions: {},
        isSumbit: false  // 提交过的标志，只要提交过一次，就转为true
      }
    },
    mounted () {
      this.getQuestionsData()
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
        let self = this
        this.$vux.confirm.show({
          content: `离开将不再保存已完成的题目，是否继续填写`,
          confirmText: '继续填写',
          cancelText: '挥泪离开',
          onShow () {
            console.log('plugin show')
          },
          onHide () {
            console.log('plugin hide')
          },
          onCancel () {
            self.$router.back()
          },
          onConfirm () {
            console.log('plugin confirm')
          }
        })
      },
      // 获取问卷数据
      getQuestionsData () {
        this.questions = this.$route.params.questionnaire
//        axios.get('/api/questions').then(res => {
//          if (res.status === 200) {
//            this.questions = res.data.data
//            console.log('获取问卷题目数据成功了！')
//            console.log(this.questions)
//            console.log('-------------------------')
//          }
//        })
      },
      // 获取每一个问题的答案
      updateAnswer (questionId, optionId) {
        // 遍历题目数组，为点击选项添加 isSelected = true 字段
        this.questions.list.forEach((item) => {
          if (item.questionId === questionId) {
            // 单选题
            if (item.type === '1') {
              item.options.forEach((option) => {
                option.isSelected = false
                if (option.optionId === optionId) {
                  option.isSelected = true
                }
              })
              // 多选题
            } else if (item.type === '2') {
              item.options.forEach((option) => {
                if (option.isSelected === undefined) {
                  option.isSelected = false
                }
                if (option.optionId === optionId) {
                  option.isSelected = !option.isSelected
                }
              })
            }
          }
        })
        console.log('更新之后的问卷详情：')
        console.log(this.questions)
        console.log('-------------------')
      },
      // 检查问卷是否填写合法
      checkQuestionnaire () {
        this.isSumbit = true
        let notDidNum = 0 // 尚未完成题目计数器
        let requiredNotDidNum = 0 // 尚未完成的必做题计数器
        let currentRequireIndex  // 获取每一个尚未完成的必做题的index
        let firstRequireItemIndex  // 记录尚未完成的必做题的第一题index
        this.questions.list.forEach((item, index) => {
          if (!item.isDid) {
            ++notDidNum
            if (item.required) {
              currentRequireIndex = index
              ++requiredNotDidNum
            }
          }
          if (requiredNotDidNum === 1) {
            firstRequireItemIndex = currentRequireIndex
          }
        })
        // 如果必做题没做，就定位到未做必做题的第一题的位置
        if (firstRequireItemIndex !== undefined) {
          this.$refs.questionnaireItem[firstRequireItemIndex].$el.scrollIntoView()
          return
        }
        // 如果有题没有选择，提示
        if (notDidNum > 0) {
          this.$vux.confirm.show({
            content: `您还有${notDidNum}题未填，确定提交吗？`,
            confirmText: '马上提交',
            cancelText: '让我想想',
            onShow () {
              console.log('plugin show')
            },
            onHide () {
              console.log('plugin hide')
            },
            onCancel () {
              console.log('plugin cancel')
            },
            onConfirm () {
              console.log('plugin confirm')
            }
          })
        } else {
          let config = {
            questionnaire: this.questions
          }
          this.loading(true)
          this.http.post('/questionnaires/commitQuestionnaire', config).then(response => {
            this.loading(false)
            if (response.status === 200) {
              let res = response.data
              if (res.status === '0') {
                this.$vux.toast.show({
                  type: 'text',
                  text: '提交成功，感谢参与',
                  width: '11em'
                })
              } else {
                this.$vux.toast.show({ text: '请求失败', type: 'text' })
              }
            } else {
              this.$vux.toast.show({ text: '接口异常', type: 'text' })
            }
          })
        }
        console.log(`notDidNum:${notDidNum}`)
        console.log(`requiredNotDidNum:${requiredNotDidNum}`)
      }
    }
  }
</script>
<!--头部样式-->
<style lang="scss">  /*不需要加scoped，加了scoped之后，无法修改头部*/
  .questionnaire-details-wrapper{
    .whiteBgHeader{
      .vux-header-title{
        /*margin: 0 60px !important;*/
      }
    }
  }
</style>
<style scoped lang="scss">
  .questionnaire-details-wrapper{
    display: flex;
    flex-direction: column;
    background-color: #fff;
    .questionnaire-list-wrapper{
      overflow: auto;
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
    .btn-box{
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 16px 0;
      margin-top:-5px;
      background-color: #fff;
      .submit{
        width: 90%;
        height: 40px;
        border-radius: 4px;
        background-color: #149c81;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-size: 16px;
        &:active{
          background-color: rgba(20, 156, 129, 0.8);
        }
      }
    }
  }
</style>
