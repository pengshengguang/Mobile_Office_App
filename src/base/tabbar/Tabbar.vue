<template>
  <div class="home-wrapper">
    <tabbar>
      <tabbar-item>
        <img slot="icon" src="../../assets/img/home/wechat.png">
        <span slot="label">日常工作</span>
      </tabbar-item>
      <tabbar-item show-dot>
        <img slot="icon" src="../../assets/img/home/message.png">
        <span slot="label">通讯录</span>
      </tabbar-item>
      <tabbar-item selected link="/component/demo">
        <img slot="icon" src="../../assets/img/home/explore.png">
        <span slot="label">同事圈</span>
      </tabbar-item>
      <tabbar-item badge="2">
        <img slot="icon" src="../../assets/img/home/news.png">
        <span slot="label">个人信息</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
  import { Tabbar, TabbarItem } from 'vux'

  export default {
    components: {
      Tabbar,
      TabbarItem
    }
  }
</script>
<style scoped>
  .home-wrapper{
  }
</style>
