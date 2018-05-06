<template>
  <div class="tabbar-wrapper">
    <tabbar>
      <tabbar-item @click.native="changeIndex(0)">
        <img slot="icon" src="../../assets/img/home/wechat.png">
        <span slot="label">日常工作</span>
      </tabbar-item>
      <tabbar-item show-dot @click.native="changeIndex(1)">
        <img slot="icon" src="../../assets/img/home/message.png">
        <span slot="label">通讯录</span>
      </tabbar-item>
      <tabbar-item selected link="/component/demo" @click.native="changeIndex(2)">
        <img slot="icon" src="../../assets/img/home/explore.png">
        <span slot="label">资讯圈</span>
      </tabbar-item>
      <tabbar-item badge="2" @click.native="changeIndex(3)">
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
    },
    data () {
      return {
        currentIndex: 0
      }
    },
    methods: {
      changeIndex (index) {
        this.currentIndex = index
        switch (this.currentIndex) {
          case 0:
            this.$router.replace({path: '/home/0/work'})
            break
          case 1:
            this.$router.replace({path: '/home/0/phonebook'})
            break
          case 2:
            this.$router.replace({path: '/home/0/information'})
            break
          case 3:
            this.$router.replace({path: '/home/0/personal'})
            break
          default:
            this.$router.replace({path: '/home/0/work'})
            break
        }
      }
    }
  }
</script>
<style scoped>
  .tabbar-wrapper{
  }
</style>
