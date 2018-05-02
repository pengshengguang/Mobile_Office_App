<template>
  <div class="avatar-wrapper">
    <blur :blur-amount=40 :url="currentUrl?currentUrl:url" class="container">
      <p class="center"><img :src="currentUrl?currentUrl:url"></p>
    </blur>
  </div>
</template>

<script>
  import { Flexbox, Blur, XHeader } from 'vux'

  export default {
    components: {
      Blur,
      Flexbox,
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
      },
      currentUrl: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        images: [
          'https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg',
          'https://o3e85j0cv.qnssl.com/waterway-107810__340.jpg',
          'https://o3e85j0cv.qnssl.com/hot-chocolate-1068703__340.jpg'
        ],
        url: 'https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg'
      }
    },
    methods: {
      goBack () {
        this.$router.back()
      },
      closeAvatar () {
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
  }
</style>
