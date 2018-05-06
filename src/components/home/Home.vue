<template>
  <div class="home-wrapper cover">
    <transition name="fade" >
      <router-view></router-view>
    </transition>
    <div class="tabbar-box" v-if="tabbarShow">
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
    },
    data () {
      return {
        tabbarShow: true
      }
    },
    updated () {
      if (this.$route.params.tabbar === '0') {
        this.tabbarShow = true
      } else {
        this.tabbarShow = false
      }
    }
  }
</script >

<style lang="scss">
  .home-wrapper{
    height: 100%;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .1s
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }
</style>
