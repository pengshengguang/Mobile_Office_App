<template>
  <transition name="slide">
    <div>
      <div class="cover">
      </div>
      <router-view></router-view>
    </div>
  </transition>
</template>

<script>
  export default {
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
