<template>
  <div class="home-wrapper">
    <div class="swiper-box">
      <Swiper></Swiper>
    </div>
    <div class="function-box">

    </div>
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

</style>
