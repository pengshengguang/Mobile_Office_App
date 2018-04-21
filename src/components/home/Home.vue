<template>
  <div class="home-wrapper cover">
    <transition name="fade" >
      <router-view></router-view>
    </transition>
    <div class="tabbar-box">
      <Tabbar></Tabbar>
    </div>
  </div>
</template>

<script>
  import Swiper from '@/base/swiper/Swiper'
  import Tabbar from '@/base/tabbar/Tabbar'

  export default {
    components: {
      Swiper,
      Tabbar
    }
  }
</script >

<style lang="scss">
  .home-wrapper{
    height: 100%;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .3s
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }
</style>
