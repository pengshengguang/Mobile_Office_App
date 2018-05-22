<template>
  <div class="phonebook-item-wrapper">
    <div class="item-box">
      <div class="left-box">
        <img :src="avatar" alt="">
      </div>
      <div class="righte-box">
        <div class="name">开发工程师1</div>
        <div class="tel">13160675356</div>
      </div>
    </div>
  </div>
</template>

<script>
  import Httpservice from '@/services/HttpService'
  import Search from '@/base/search/Search'
  import { XHeader } from 'vux'
  export default {
    props: ['avatar'],
    components: {
      XHeader,
      Search
    },
    data () {
      return {
        http: Httpservice.getAxios
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {}
    }
  }
</script>

<style lang="scss">
  .phonebook-item-wrapper{
    .item-box{
      display: flex;
      height: 60px;
      border-bottom: 1px solid #f0f0f0;
      .left-box{
        flex: 1 1 20%;
        display: flex;
        align-items: center;
        padding-left: 10px;
        img{
          width: 46px;
          height: 46px;
        }
      }
      .righte-box{
        flex: 1 1 80%;
        padding-top: 6px;
        padding-left: 10px;
        .name{
          font-size: 16px;
        }
        .tel{
          padding-top: 6px;
          color: #9b9aa0;
        }
      }
    }
  }

</style>
