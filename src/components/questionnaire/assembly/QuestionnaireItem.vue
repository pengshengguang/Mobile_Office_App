<template>
  <div class="questionnaire-item-wrapper">
    <div class="main" :class="{'item-not-did': !item.isDid && isSumbit}">
        <div class="title-wrapper">
          <div class="number">{{index}}/{{questionsNum}}</div>
          <div class="required" v-if="item.required">*</div>
          <div class="title-text">{{item.title}}
            <span class="type" v-if="item.type === '1'">[单选]</span>
            <span class="type" v-else-if="item.type === '2'">[多选]</span>
          </div>
        </div>
      <div style="color: #e62129; padding-top: 4px; font-size: 14px">
        <span v-if="item.type == '3'&&item.required === true&&!item.isDid  && isSumbit">必答题请输入</span>
        <span v-else-if="item.type !== '4'&&item.required === true&&!item.isDid  && isSumbit">必答题请选择</span>
        <span>&nbsp;</span>
      </div>
        <div class="main-wrapper">
          <!--选项组组件  接收参数 item（单条题目总信息）-->
          <QuestionnaireOption :item="item" @setAnswer="setAnswer" ></QuestionnaireOption>
        </div>
      </div>
  </div>
</template>
<script>
  import QuestionnaireOption from '@/components/questionnaire/assembly/QuestionnaireOption'

  export default {
    props: ['item', 'questionsNum', 'index', 'isSumbit'],
    data () {
      return {
        answer: {} // 该题问题答案
      }
    },
    components: {
      QuestionnaireOption
    },
    methods: {
      // 传送当前题目答案给父组件
      setAnswer (optionId) {
        if (optionId) {
          this.$emit('setEachAnswer', this.item.questionId, optionId)
        }
        this.checkDidOrNot()
        this.$forceUpdate()
      },
      // 判断该题是否已做
      checkDidOrNot () {
        switch (this.item.type) {
          case '1':
            this.checkSingleChoice()
            break
          case '2':
            this.checkMultipleChoice()
            break
          case '3':
            this.checkBlankFill()
            break
          default:
            console.log('题目类型找不到，无法检查该题是否有做！')
        }
//        if (this.item.type === '1') {
//          for (let option of this.item.options) {
//            if (option.isSelected !== undefined) {
//              this.item.isDid = true
//              return false
//            }
//          }
//        } else if (this.item.type === '2') {
//          let length = 0
//          let options = this.item.options
//          for (let option of options) {
//            // 一个选项被选，该题已做
//            if (option.isSelected) {
//              this.item.isDid = true
//              break
//            } else {
//              ++length
//            }
//            // 没选数 = 选项数，则该题标记为未做
//            if (length === options.length) {
//              this.item.isDid = false
//            }
//          }
//        } else if (this.item.type === '3') {
//          if (text.length > 0) {
//            this.item.isDid = true
//            console.log('题目已做')
//          } else {
//            this.item.isDid = false
//            console.log('题目未做')
//          }
//        } else {
//          console.log('题目类型找不到')
//        }
      },
      // 检查单选题是否已做
      checkSingleChoice () {
        for (let option of this.item.options) {
          if (option.isSelected !== undefined) {
            this.item.isDid = true
            return false
          }
        }
      },
      // 检查多选题是否已做
      checkMultipleChoice () {
        let length = 0
        let options = this.item.options
        for (let option of options) {
          // 一个选项被选，该题已做
          if (option.isSelected) {
            this.item.isDid = true
            break
          } else {
            ++length
          }
          // 没选数 = 选项数，则该题标记为未做
          if (length === options.length) {
            this.item.isDid = false
          }
        }
      },
      // 检查简答题是否已做
      checkBlankFill () {
        if (this.item.answer.length > 0) {
          this.item.isDid = true
        } else {
          this.item.isDid = false
        }
      }
    }
  }
</script>
<style scoped lang="scss">
  .questionnaire-item-wrapper{
    font-size: 14px;
    /*border-bottom: 6px solid #eeeeef;*/
    padding: 5px 10px 5px 10px;
    .main{
      padding: 10px 10px 0 10px;
      border: 1px solid #fff;
      .title-wrapper{
        font-size: 16px;
        display: flex;
        .number{
          color: #a1a1a1;
          padding-right: 8px;
        }
        .required{
          color: #e62129;
        }
        .title-text{
          font-size: 18px;
          color: #020f17;
          /*font-weight: bold;*/
          .type{
            color: #28a48c;
          }
        }
      }
      .main-wrapper{
        margin-top: -10px;
      }
    }
    .item-not-did{
      border: 1px solid #e8333a;
    }
  }
</style>
