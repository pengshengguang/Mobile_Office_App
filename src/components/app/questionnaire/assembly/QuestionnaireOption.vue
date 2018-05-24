<template>
  <div class="questionnaire-option-wrapper" >
    <!--单项选择-->
    <div v-if="item.type === '1'" class="single-radio-box">
      <div class="popupRadio-wrapper">
        <group>
          <popup-radio :options="options2" v-model="radioSelect" placeholder="请选择一个选项"  @on-change="selectedEvent" :readonly="singleOptionOnlyRead"></popup-radio>
        </group>
      </div>
      <!--<div class="single-choice" @click="selectedEvent(option.optionId)" v-for="option in item.options">-->
      <!--<div class="single-symbol" :class="{'selected': option.isSelected}"></div>-->
      <!--<div class="single-text">{{option.name}}</div>-->
      <!--</div>-->
    </div>
    <!--多项选择-->
    <div v-else-if="item.type === '2'">
      <div class="multiterm-choice" @click="selectedEvent(option.optionId)" v-for="option in item.options">
        <div class="multiterm-symbol" :class="{'selected': option.isSelected}"></div>
        <div class="multiterm-text">{{option.name}}</div>
      </div>
    </div>
    <!--问答题-->
    <div class="question" v-else-if="item.type === '3'">
      <!--文本框是否可编辑根据 item.questionId 来判断，这是因为统计结果中没有questionId字段，而调查问卷详情中，有questionId字段。-->
      <x-textarea placeholder="请输入您的宝贵意见" v-model="item.answer" :max="200" @input="fillAnswerEvent(item.answer)" :readonly="textareaOnlyRead"></x-textarea>
    </div>
    <!--统计答案-->
    <div class="result" v-else-if="item.type === '4'" v-for="option in item.options">
      <div class="result-choice" v-if="option.isSelected">
        <!--<div class="bg-box" :style="{width: percent + '%'}"></div>-->
        <div class="bg-box" :style="{width: getPercent(option.selectedNum) + '%'}"></div>
        <div class="text-box">
          <div class="title">{{option.name}}</div>
          <div class="num">{{option.selectedNum}}票</div>
          <div class="percent">{{getPercent(option.selectedNum)}}%</div>
        </div>
      </div>
      <div class="result-choice other-choice" v-else>
        <!--<div class="bg-box" :style="{width: percent + '%'}"></div>-->
        <div class="bg-box" :style="{width: getPercent(option.selectedNum) + '%'}"></div>
        <div class="text-box">
          <div class="title">{{option.name}}</div>
          <div class="num">{{option.selectedNum}}票</div>
          <div class="percent">{{getPercent(option.selectedNum)}}%</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { XTextarea, Group, PopupRadio } from 'vux'

  export default {
    props: ['item', 'totalSelectedNum'],
    components: {
      XTextarea,
      Group,
      PopupRadio
    },
    data () {
      return {
        percent: 20,
        radioSelect: '',
        options2: [],
        singleOptionOnlyRead: false,
        textareaOnlyRead: false
      }
    },
    mounted () {
      // 因为单选题是以下拉框的形式展示，而调用vux组件的popupPicker,传的数组对象中，对象一定要以键（key）值（value）对的方式存数据
      // 所以一定要对原始数据进行处理，再提交给组件PopupRadio
      // 加载页面的时候，因为用watch监测不到父组件传过来的值，所以要在mounted这里拿到父组件传过来的值，然后对数据进行处理
      if (this.item.type === '1') {
        this.assemblyOptions()
        this.getSelectSingle() // 这个函数是为了在个人已参与界面，单选题如果有做的话，就会把选项选中
      }
      if (this.item.type === '3' && this.item.answer) {
        this.textareaOnlyRead = true
      }
    },
    methods: {
      // 单选、多选点击事件
      selectedEvent (optionId) {
        this.$emit('setAnswer', optionId)
        this.$forceUpdate()
      },
      // 简答题填写答案事件
      fillAnswerEvent (text) {
        this.$emit('setAnswer', null, text)
        this.$forceUpdate()
      },
      // 组装数据，把原始数据的optionId、name分别改名字变为key、value
      assemblyOptions () {
        let array = []
        this.item.options.forEach((option) => {
          let optionObj = {
            key: null,
            value: null
          }
          optionObj.key = option.optionId
          optionObj.value = option.name
          array.push(optionObj)
        })
        this.options2 = array
      },
      hahaha () {
        console.log('hahahahah')
      },
      // 获取用户选择的单选选项
      getSelectSingle () {
        this.item.options.forEach(option => {
          if (option.isSelected) {
            this.radioSelect = option.optionId
            this.singleOptionOnlyRead = true // singleOptionOnlyRead，true，代表这道题已经做了，这就意味当前用户已经参与过这道题了，所有这个属性结合readonly，就能使点选题不能选择
          }
        })
      },
      // 获取当前题目的所有选项的选中数量，统计当前选项占比
      getPercent (currentselectedNum) {
        if (currentselectedNum === 0) {
          return 0
        } else {
          return currentselectedNum / this.totalSelectedNum * 100
        }
      }
    }
  }
</script>

<!--vux组件样式覆盖-->
<style lang="scss">
  .questionnaire-option-wrapper{
    .single-radio-box{
      .popupRadio-wrapper{
        position: relative;
        &:before{
          position: absolute;
          content: '';
          z-index:10;
          top:50%;
          right: 12px;
          margin-top: -4px;
          /*自定义三角形*/
          width: 0;
          height: 0;
          border-top: 8px solid #b6b6b7;
          border-right: 6px solid transparent;
          border-left: 6px solid transparent;
        }
        .weui-cell{
          padding: 5px 15px;
        }
      }
    }
    .vux-x-textarea{
      border: 1px solid #c9caca;
      margin-top: -14px;
      padding-bottom: 10px;
      font-size: 16px;
      .weui-textarea{
        padding: 10px
      }
    }
    .weui-cell{
      justify-content: flex-start;
      border: 1px solid #d0d1d1;
      padding: 5px 5px;
      min-height: 40px;
    }
    .vux-cell-primary {
      flex: none;
    }
    .weui-cell__ft{
      text-align: left;
      &:after{
        content: none!important;
      }
      .vux-cell-placeholder {
        color: #8c9194;
        font-size: 16px;
      }
    }
  }
  .vux-popup-dialog{
    max-height: 70%!important;
  }
  .single-radio-box{
    margin-top: -20px;
    padding-bottom: 20px;
    .vux-cell-placeholder{
      color: #605F5F!important;
    }
  }
</style>

<!--本组件样式定义-->
<style scoped lang="scss">
  .questionnaire-option-wrapper{
    display: flex;
    flex-direction: column;
    padding-top: 16px;
    .single-choice{
      display: flex;
      padding-bottom: 20px;
      .single-symbol{
        width: 20px;
        height: 20px;
        border-radius: 50%;
        flex: none;
        margin-right: 10px;
        position: relative;
        border: 1px solid rgb(192, 192, 192);
        &:after{
          content: '';
          display: block;
          position: absolute;
          border-radius: 50%;
          top: 5px;
          left: 5px;
          width: 8px;
          height: 8px;
          background-color: #fff;
          transition: .2s ease;
        }
      }
      .selected{
        border: 1px solid #0cd4ac;
        &:after{
          top:1px;
          left: 1px;
          width: 16px;
          height: 16px;
          background-color: #0cd4ac;
        }
      }
      .single-text{
      }
    }
    .multiterm-choice{
      padding-bottom: 20px;
      display: flex;
      .multiterm-symbol{
        width: 18px;
        height: 18px;
        flex: none;
        margin-left: 1px;
        margin-right: 10px;
        position: relative;
        border: 1px solid silver;
        transition: .2s ease;
        /*&:after{*/
          /*content: '';*/
          /*display: block;*/
          /*position: absolute;*/
          /*top: 10px;*/
          /*left: 10px;*/
          /*width: 0px;*/
          /*height: 0px;*/
          /*background-color: #fff;*/
          /*transform:rotate(45deg);*/
          /*transition: .1s ease;*/
          /*border-radius: 50%;*/
        /*}*/
      }
      .selected{
        border: 1px solid #0cd4ac;
        background-color: #0cd4ac;
        /*&:after{*/
          /*content: '';*/
          /*top:2px;*/
          /*left: 5px;*/
          /*width: 5px;*/
          /*height: 10px;*/
          /*border-bottom: 2px solid #fff;*/
          /*border-right: 2px solid #fff;*/
          /*border-top: none;*/
          /*border-left: none;*/
          /*transform:rotate(45deg);*/
          /*background-color: #0cd4ac;*/
          /*border-radius: 0%;*/
        /*}*/
      }
      .multiterm-text{
        font-size: 16px;
        color: #020f17;
        margin-top: -2px;
      }
    }
    .question{
      display: flex;
      flex-direction: column;
      padding: 10px 0;
    }
    .result-choice{
      flex: none;
      display: flex;
      min-height: 34px;
      border: 1px solid #2da68e;
      position: relative;
      padding: 10px 10px;
      margin-bottom: 10px;
      align-items: center;
      .bg-box{
        background-color: #dafaf4;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        position: absolute;
      }
      .text-box{
        display: flex;
        align-items: center;
        width: 100%;
        z-index: 1;
        justify-content: space-between;
        .title{
          width: 70%;
        }
        .num{
          /*align-self: flex-start;*/
        }
        .percent{
          /*align-self: flex-end;*/
        }
      }
      .choice-text{
        display: inline-block;
        width: 30%;
        z-index: 1;
      }
      .people-num{
        z-index: 1;
      }
      .percent-num{
        z-index: 1;
      }
    }
    .other-choice{
      border: 1px solid #dcdddd;
      .bg-box{
        background-color: #f5f6f6;
      }
    }
  }
</style>
