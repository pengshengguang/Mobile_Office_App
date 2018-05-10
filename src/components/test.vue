<template>
  <div>
    <swipeout class="vux-1px-tb itemBox" :threshold=".2">
      <swipeout-item transition-mode="reveal">
        <div slot="right-menu">
          <swipeout-button type="warn">删除</swipeout-button>
        </div>
        <div slot="content"  style="padding:10px;">

        </div>
      </swipeout-item>
    </swipeout>
  </div>
</template>

<script>
  import { Group, GroupTitle, Swipeout, SwipeoutItem, SwipeoutButton, XButton, XHeader, Datetime, XTextarea } from 'vux'

  export default {
    components: {
      Group,
      GroupTitle,
      Swipeout,
      SwipeoutItem,
      SwipeoutButton,
      XButton,
      XHeader,
      Datetime,
      XTextarea
    },
    data () {
      return {
        list: [{
          title: '洗颜新潮流！人气洁面皂排行榜',
          img: 'https://cdn.xiaotaojiang.com/uploads/82/1572ec37969ee263735262dc017975/_.jpg'
        }, {
          title: '美容用品 & 日用品（上）',
          img: 'https://cdn.xiaotaojiang.com/uploads/59/b22e0e62363a4a652f28630b3233b9/_.jpg'
        }, {
          title: '远离车内毒气，日本车载空气净化器精选',
          img: 'https://cdn.xiaotaojiang.com/uploads/56/4b3601364b86fdfd234ef11d8712ad/_.jpg'
        }]
      }
    }
  }
</script>

<style lang="less">
  .item_details{
    position: relative;
  }
  .item_details .name{
    font-size: 16px;
    line-height: 1.3;
  }
  .item_details .code{
    font-size: 14px;
    color: #8c9194;
    margin-top: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .item_details .exist{
    color: red;
    font-size: 14px;
  }
</style>
