<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
  /*初始化，使得整个页面铺面整个页面*/
  html,
  body{
    height: 100%;
    width: 100%;
  }
  #app{
    height: 100%;
  }
  /*end*/
  .cover {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 201; // 不能大于501，影响actionSheet的显示
    background-color: #fff;
  }
  .weui-tabbar {
    z-index: 200 !important;
  }
  /*通用标题栏*/
   .vux-header{
     z-index: 201;
   }
   .vux-header .vux-header-left .left-arrow {
     width: 40px !important;
     height: 40px !important;
     top: -10px !important;
     left: -18px !important;
   }

  .vux-header .vux-header-left .left-arrow:before {
    border-color: #8C9194 !important;
    border-top-left-radius: 2.8px !important;
    top: 11px !important;
    left: 16px !important;
  }

  .vux-header .vux-header-title {
    color: #020F17 !important;
    width: 100%!important;
    margin: 0 auto!important;
  }

  .ios-padding-top .vux-header {
    padding-top: 20px !important;
  }

  .ios-padding-top .vux-header .vux-header-left,
  .ios-padding-top .vux-header .vux-header-right {
    top: 34px !important;
  }



  .ios-padding-top .vux-header .vux-header-left .left-arrow:before {
    top: 9px !important;
  }

  /*白色背景样式名whiteBgHeader*/
   .whiteBgHeader {
     padding: 2px 0 !important;
     background-color: #FFF !important;
     border-bottom: 1px solid #DFE1E3 !important;
   }

  .whiteBgHeader .vux-header-title {
    /*margin: 0 40px !important;*/
  }

  /*透明背景样式名noBgHeader*/
   .noBgHeader {
     background-color: transparent !important;
   }

  /*白色箭头样式名whiteArrowHeader*/
   .whiteArrowHeader .vux-header-left .left-arrow:before {
     border-color: #FFF !important;
   }

  .whiteArrowHeader .vux-header-title {
    color: #FFF !important;
  }
</style>
