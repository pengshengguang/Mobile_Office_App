<template>
  <div>
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
    img: 'http://y.gtimg.cn/music/photo_new/T003R720x288M000002wMSq707he6D.jpg'
//    title: '送你一朵fua'
  }, {
    url: 'javascript:',
    img: 'http://y.gtimg.cn/music/photo_new/T003R720x288M000001x15B624p7m2.jpg'
//    title: '送你一辆车'
  }, {
    url: 'javascript:',
//    img: 'https://static.vux.li/demo/5.jpg', // 404
    img: 'http://y.gtimg.cn/music/photo_new/T003R720x288M000001lkds22tdk0N.jpg'
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

<style scoped>
  .text-scroll p{
    font-size: 12px;
    text-align: center;
    line-height: 30px;
  }
  .swiper-demo-img img {
    width: 100%;
  }
</style>
