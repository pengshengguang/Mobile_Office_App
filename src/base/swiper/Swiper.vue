<template>
  <div class="swiper">
    <swiper loop auto :list="demo06_list" :index="img_index" @on-index-change="onIndexChange" dots-position="center" :aspect-ratio="400/800"></swiper>
    <!--<p>current index: {{img_index}}</p>-->
    <div class="home-box">
      <!--<Home></Home>-->
    </div>
  </div>
</template>

<script>
  import { Swiper, SwiperItem } from 'vux'
  import Home from '@/base/tabbar/Tabbar'

  const baseList = [{
    url: 'javascript:',
    img: require('./../../assets/img/swiper/multilayeredeye.png')
//    title: '送你一朵fua'
  }, {
    url: 'javascript:',
    img: require('./../../assets/img/swiper/Untitled-.png')
//    title: '送你一辆车'
  }, {
    url: 'javascript:',
    img: require('./../../assets/img/swiper/bond.png')
//    title: '送你一辆车'
  }, {
    url: 'javascript:',
    img: require('./../../assets/img/swiper/Take_OFF.png')
//    title: '送你一辆车'
  }, {
    url: 'javascript:',
//    img: 'https://static.vux.li/demo/5.jpg', // 404
    img: require('./../../assets/img/swiper/soaring.png')
//    title: '送你一次旅行',
//    fallbackImg: 'http://y.gtimg.cn/music/photo_new/T003R720x288M000001lkds22tdk0N.jpg'
  }]

  const urlList = baseList.map((item, index) => ({
    url: 'http://m.baidu.com',
    img: item.img,
    fallbackImg: item.fallbackImg
//    title: `(可点击)${item.title}`
  }))

  export default {
    components: {
      Swiper,
      SwiperItem,
      Home
    },
    methods: {
      onIndexChange (index) {
        this.img_index = index
      }
    },
    data () {
      return {
        demo06_list: urlList,
        img_index: 0,
        swiperItemIndex: 1
      }
    }
  }
</script>

<style lang="scss">
  .text-scroll p{
    font-size: 12px;
    text-align: center;
    line-height: 30px;
  }
  .swiper-demo-img img {
    width: 100%;
  }
  /*自定义dot的样式*/
  .swiper{
    .vux-slider{
      .vux-indicator{
        a{
          margin-left: 0px;
          .vux-icon-dot{
            width: 8px!important;
            height: 8px!important;
            margin-left: 0;
            margin: 0 4px;
            &.active{
              width: 20px!important;
              border-radius: 5px;
            }
          }
        }
      }
    }
  }

</style>
