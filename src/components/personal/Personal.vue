<template>
  <div class="personal-wrapper">
    <div class="avatar-box" :style="{background: backgroundImage}">
      <div class="mask"></div>
      <div class="myInfo">
        <div class="avatar">
          <img src="./../../assets/img/avatar/men1.png" alt="">
        </div>
        <div class="name">Lighter_Studio</div>
        <div class="position">职位：人工智能工程师</div>
        <div class="label-box">
          <span class="label">90后</span>
          <span class="label">珠海市</span>
          <span class="label">魔蝎座</span>
        </div>
      </div>
      <div class="edit">
        <img src="./../../assets/img/personal/editIcon.png" alt="">
        <span>编辑</span>
      </div>
    </div>
    <Scroll class="container-wrapper">
      <div class="main">
        <tab-switch></tab-switch>
        <!--<div class="area-box">-->
          <!--<div class="head-box">个人设置</div>-->
          <!--<div class="function-box">-->
            <!--<div class="function">修改头像</div>-->
            <!--<div class="function">修改头像</div>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="area-box">-->
        <!--<div class="head-box">个人设置</div>-->
        <!--<div class="function-box">-->
          <!--<div class="function">修改头像</div>-->
          <!--<div class="function">修改头像</div>-->
        <!--</div>-->
      <!--</div>-->
        <!--<div class="area-box">-->
          <!--<div class="head-box">个人设置</div>-->
          <!--<div class="function-box">-->
            <!--<div class="function">修改头像</div>-->
            <!--<div class="function">修改头像</div>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="area-box">-->
          <!--<div class="head-box">个人设置</div>-->
          <!--<div class="function-box">-->
            <!--<div class="function">修改头像</div>-->
            <!--<div class="function">修改头像</div>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="area-box">-->
          <!--<div class="head-box">个人设置</div>-->
          <!--<div class="function-box">-->
            <!--<div class="function">修改头像</div>-->
            <!--<div class="function">修改头像</div>-->
          <!--</div>-->
        <!--</div>-->
      </div>
    </Scroll>
  </div>
</template>

<script>
  import Avatar from '@/base/ImageUpload/Avatar'
  import Scroll from '@/base/scroll/Scroll'
  import TabSwitch from './PersonalMain.vue'

  export default {
    components: {
      Avatar,
      Scroll,
      TabSwitch
    },
    data () {
      return {
        backgroundImage: 'url(' + require('@/assets/img/swiper/Bubbly.png') + ')'
      }
    }
  }
</script>

<style lang="scss">
  .personal-wrapper{
    .avatar-box{
    }
    .container-wrapper{}
  }

</style>
<style lang="scss" scoped>
  .personal-wrapper{
    height: 100%;
    display: flex;
    flex-direction: column;
    .avatar-box{
      height: 210px;
      width: 100%;
      position: relative;
      background-size: 100% 100%!important;
      .mask{
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.4);
      }
      .myInfo{
        position: absolute;
        bottom: 22px;
        left: 34px;
        z-index: 201;
        color: #fff!important;
        .avatar{
          padding-bottom: 4px;
          img{
            background-size: 100% 100%;
            width: 80px;
            height: 80px;
            border-radius: 50%;
          }
        }
        .name{
          font-size: 20px;
          color: #fff;
          font-weight: bold;
        }
        .position{
          padding: 8px 0px;
        }
        .label-box{
          .label{
            font-size: 14px;
            background-color: rgba(152, 158, 165, 0.6);
            border-radius: 30px;
            padding: 2px 8px;
          }
        }
      }
      .edit{
        position: absolute;
        top: 50%;
        right: 30px;
        background-color: rgba(152, 158, 165, 0.61);
        display: flex;
        padding: 4px 8px;
        border-radius: 6px;
        img{
          width: 20px;
          height: 20px;
        }
        span{
          color: #fff;
          padding-left: 6px;
        }
      }

    }
    .container-wrapper{
      position: fixed;
      top: 200px;
      bottom: 52px;
      overflow: auto;
      display: flex;
      flex-direction: column;
      width: 100%;
      border-radius: 14px;
      .main{
        height: 100%; /*这里限制了scroll不能滑动*/
        .area-box{
          .head-box{
            background-color: #f0f4f7;
            padding: 6px;
          }
          .function-box{
            .function{
              font-size: 20px;
              padding: 10px 0 10px 6px;
              border-bottom: 1px solid #605F5F;
            }
          }
        }
      }
    }
  }
</style>
