<template>
  <div class="apply-item-wrapper">
    <div class="apply-content-box">
      <div class="more">
        <div class="showArrow">
          <div class="right_icon" :style='upArrowRight'></div>
        </div>
        <div class="showArrow" style="display: none">
          <div class="right_icon" :style='downArrowRight'></div>
        </div>
      </div>
      <div class="cencel">撤回</div>
      <div class="applicants-line">开发工程师/彭胜光</div>
      <div class="type-time-line">2个品类/共2件   05-10</div>
      <div class="category-box">
        <div class="category-name">白板附件<span>2个品类/共2件</span></div> <!--大类-->
        <div class="category-content"> <!--大类下的小类商品列表-->
          <div class="proName-line">
            <div class="proName">史泰博 白板纸张 56*90cm，80G 白色（卷）</div>
            <div class="proNum">x1</div>
          </div>
          <div class="proName-line">
            <div class="proName">史泰博 白板纸张 56*90cm，80G 白色（卷）</div>
            <div class="proNum">x1</div>
          </div>
          <div class="proName-line">
            <div class="proName">史泰博 白板纸张 56*90cm，80G 白色（卷）</div>
            <div class="proNum">x1</div>
          </div>
          <div class="proName-line">
            <div class="proName">史泰博 白板纸张 56*90cm，80G 白色（卷）</div>
            <div class="proNum">x1</div>
          </div>
          <div class="proCode-line">1100013846EA</div>
        </div>
      </div>
    </div>
    <div class="msg-line">意见：我知道了，请带薪等候。</div>
    <div class="btn-box">我知道了</div>
    <div class="empty-box"></div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        // 收起展开Icon
        upArrowRight: {
          backgroundImage: 'url(' + require('@/assets/img/supplies/J82-icon-shrink.png') + ')'
        },
        downArrowRight: {
          backgroundImage: 'url(' + require('@/assets/img/supplies/J82-icon-unflod.png') + ')'
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .apply-item-wrapper{
    display: flex;
    flex-direction: column;
    .apply-content-box{
      font-family: "微软雅黑" !important;
      position: relative;
      .more{
        position: absolute;
        top: 10px;
        right: 22px;
        width: 26px;
        height: 26px;
        .showArrow{
          width: 100%;
          height: 100%;
          .right_icon{
            background-size: 100% 100%;
            width: 100%;
            height: 100%;
          }
        }
      }
      .cencel{
        position: absolute;
        font-size: 12px;
        color: #3271C2;
        border: 1px solid #3271C2;
        width: 42px;
        border-radius: 3px;
        right: 73px;
        top: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .applicants-line{
        padding-left: 18px;
        padding-top: 10px;
        padding-bottom: 4px;
        font-weight: bold;
        font-size: 16px;
      }
      .type-time-line{
        color: #999999;
        font-size: 14px;
        padding-left: 18px;
        padding-top: 8px;
        padding-bottom: 8px;
        border-bottom: 1px solid #eaeaea;
      }
      .category-box{
        .category-name{
          font-size: 16px;
          font-weight: bold;
          padding: 8px 0 8px 18px;
          border-bottom: 1px solid #eaeaea;
          span{
            font-weight: normal;
            font-size: 14px;
            color: #999999;
            padding-left: 30px;
          }
        }
        .category-content{
          padding-left: 18px;
          .proName-line{
            padding: 8px 0;
            display: flex;
            .proName{
              flex: 0 0 70%;
              font-size: 16px;
            }
            .proNum{
              flex: 0 0 30%;
              align-self: flex-start;
              padding-left: 30px;
              font-weight: bold;
            }
          }
          .proCode-line{
            padding: 0 0 8px 0;
          }
        }
      }
    }
    .msg-line{
      padding: 8px 0;
      border-top: 1px solid #eaeaea;
      margin-left: 18px;
    }
    .btn-box{
      flex: 0 0 44px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #149c81;
      font-size: 16px;
      background-color:#FFFFFF;
      width:100%;
      padding: 9px 0px;
      border:none;
      font-family: "微软雅黑" !important;
      border-top: 1px solid #eaeaea;
    }
    .empty-box{
      flex: 0 0 14px;
      background: #f0f4f7;
    }
  }
</style>
