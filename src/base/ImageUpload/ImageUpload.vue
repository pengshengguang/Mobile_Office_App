<template>
  <div class="avatar-wrapper">
    <x-header class="whiteBgHeader" v-if="showTitle===true" :left-options="{backText:'', preventGoBack: true}" @on-click-back="closeAvatar">选择头像</x-header>
    <blur :blur-amount=40 :url="url" class="container">
      <p class="center"><img :src="url"></p>
    </blur>
    <flexbox :gutter="0" v-if="showFlexbox===true">
      <flexbox-item v-for="(img, index) in images" :key="index"><img :src="img" style="width:100%" @click="url = img"/></flexbox-item>
    </flexbox>
    <div class="button-box" v-if="showButton===true">
      <button @click="comfirm">确定</button>
    </div>
  </div>
</template>

<script>
  import { Flexbox, FlexboxItem, Blur, XHeader } from 'vux'

  export default {
    components: {
      Blur,
      Flexbox,
      FlexboxItem,
      XHeader
    },
    props: {
      showTitle: {
        type: Boolean,
        default: true
      },
      showFlexbox: {
        type: Boolean,
        default: true
      },
      showButton: {
        type: Boolean,
        default: true
      }
    },
    watch: {
      url (currentUrl) {
        this.currentUrl = currentUrl
      }
    },
    data () {
      return {
        images: [
          'https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg',
          'https://o3e85j0cv.qnssl.com/waterway-107810__340.jpg',
          'https://o3e85j0cv.qnssl.com/hot-chocolate-1068703__340.jpg'
        ],
        url: 'https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg',
        currentUrl: ''
      }
    },
    methods: {
      goBack () {
        this.$router.back()
      },
      closeAvatar () {
        // this.$emit('setNewAvatar', this.currentUrl)
        this.$emit('closeAvatar')
      },
      comfirm () {
        this.$emit('setNewAvatar', this.currentUrl)
        this.$emit('closeAvatar')
      }
    }
  }
</script>

<style scoped lang="scss">
  .center {
    text-align: center;
    padding-top: 20px;
    color: #fff;
    font-size: 18px;
  }
  .center img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 4px solid #ececec;
  }
  .avatar-wrapper{
    .container{
      display: flex;
      justify-content: center;
      align-items: center;
      .center{
        padding-top: 0px;
        img{
          height: 120px;
          width: 120px;
        }
      }
    }
    .button-box{
      width: 100%;
      position: fixed;
      bottom: 0;
      button {
        background-color: #60bc5e;
        border: none;
        height: 38px;
        width: 100%;
        color: #fff;
        font-size: 16px;
      }
    }
  }
</style>
