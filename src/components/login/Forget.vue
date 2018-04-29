<template>
  <transition name="slide">
      <div class="forget-warpper cover">
        <x-header class="whiteBgHeader" :left-options="{backText:'', preventGoBack: true}" @on-click-back="goBack">忘记密码</x-header>
      </div>
  </transition >
</template>

<script>
  import { XHeader } from 'vux'

  export default {
    components: {
      XHeader
    },
    data () {
      return {
      }
    },
    methods: {
      goBack () {
        this.$router.back()
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
</style>
<style lang="scss" scoped>
  .forget-warpper{
    height: 100%;
  }

</style>
