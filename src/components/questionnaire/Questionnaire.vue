<template>
  <div class="questionnaire-wrapper">
    <router-view class="cover"></router-view>
  </div>
</template>
<script>
  import QuestionnaireItem from '@/components/questionnaire/assembly/QuestionnaireItem'

  export default {
    components: {
      QuestionnaireItem
    },
    methods: {
      goBack () {
        this.$router.back()
      }
    }
  }
</script>
<!--此style用来设置组件去除横向滚动条显示-->
<style>
  /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸,在这里设置滚动条宽度为0px*/
  ::-webkit-scrollbar {
    width: 0px;
    display: none;
    background-color: #fff;
  }

  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #fff;
  }

  /*定义滑块 内阴影+圆角*/
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
    background-color: #fff;
  }
</style>
