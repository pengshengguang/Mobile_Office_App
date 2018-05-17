<template>
  <div class="supplies-pro-item-wrapper" style="padding-left: 14px">
    <div class="content-box">
      <div class="left-box" @click='pickChange()' v-if="!bottomCart">
        <div class="item-pick" :class="item.isSelected? 'y_pick':''"></div>
      </div>
      <div class="right-box">
        <div class="describe-line" ref="describe" :class="{'titleLong': !showMore}">{{item.describe}}</div>
        <div class="code">{{item.code}}
          <span v-if="!bottomCart&&textOver&&!showMore" @click="more">展开<i class="triangle-down"></i></span>
          <span v-if="!bottomCart&&textOver&&showMore" @click="more">收起<i class="triangle-up"></i></span>
        </div>
        <div>
          <i class="add" :style="backgroundAdd" @click="addItem"></i>
          <input ref="input" class="number-input" v-model="item.quantity"
                 @focus="checkByfocus(item)"
                 @blur="checkByBlur(item)"
                 onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')};this.value=this.value.replace(/\D/g,'');"
                 onafterpaste="this.value=this.value.replace(/\D/g,'')"
                 maxlength="3">
          <i class="reduce" :style="backgroundReduce" @click="reduce" v-if="!(bottomCart===undefined&&item.quantity===1)"></i>
        </div>
        <!-- 此div用作增大展开/收起的触碰面积 -->
        <div v-if="!bottomCart&&textOver" style="position: absolute;left: 0;top: 0;width: 60%;height: 96%" @click="more"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['item', 'isShopping', 'bottomCart'],
    components: {
    },
    data () {
      return {
        backgroundSelected: {
          backgroundImage: 'url(' + require('@/assets/img/supplies/icon-selected.png') + ')'
        },
        // selected-lucency
        backgroundSelectedLucency: {
          backgroundImage: 'url(' + require('@/assets/img/supplies/icon-selected-lucency.png') + ')'
        },
        // 增加
        backgroundAdd: {
          backgroundImage: 'url(' + require('@/assets/img/supplies/icon-add.png') + ')'
        },
        // 减少
        backgroundReduce: {
          backgroundImage: 'url(' + require('@/assets/img/supplies/icon-reduce.png') + ')'
        },
        textOver: false, // 该用品描述文字是出现溢出
        showMore: true // 控制文字是否显示全。（PS：为什么默认为true？因为开始加载时，还没判断文字高度，需要把文字全部显示出来，才能判断是否有溢出）
      }
    },
    mounted () {
      // 初始化
      this.init()
    },
    methods: {
      init () {
        if (this.item.quantity === undefined) {
          this.item.quantity = 1
        }
        if (this.item.isSelected === undefined) {
          this.item.isSelected = false
        }
        this.isOverflow()
      },
      pickChange () {
        this.item.isSelected = !this.item.isSelected
        this.isShopping(this.item, this.item.isSelected ? 'add' : 'remove')
        this.$forceUpdate()
      },
      // 增加操作
      addItem () {
        // 当前项目数据增加
        this.item.quantity = parseInt(this.item.quantity, 10) + 1
        // 购物车联动
        this.isShopping(this.item, this.item.isSelected ? 'add' : 'remove')
        // 刷新页面数据
        this.$forceUpdate()
      },
      // 减少操作
      reduce () {
        // 当前项目数据减少
        this.item.quantity = parseInt(this.item.quantity, 10) - 1
        // 当前项目数据少于1即不被选中
        this.item.isSelected = !(this.item.quantity < 1)
        // 当前项目数据少于1即归位为1
        if (this.item.quantity < 1) {
          this.item.quantity = 1
        }
        // 购物车联动
        this.isShopping(this.item, this.item.isSelected ? 'add' : 'remove')
        // 刷新页面数据
        this.$forceUpdate()
      },
      // 聚焦
      checkByfocus (item) {
        console.log(item)
      },
      // 失焦
      checkByBlur () {
        if (!this.item.quantity || this.item.quantity === '') {
          this.item.quantity = 1
        }
        // 当用户使用拼音输入法输入字母成功时
        if (isNaN(this.item.quantity)) {
          this.item.quantity = 1
        }
        // 当用户输入数字开头为0时
        if (this.item.quantity.length > 0 && this.item.quantity.substring(0, 1) === '0') {
          this.item.quantity = 1
        }
        // 购物车联动
        this.isShopping(this.item, this.item.isSelected ? 'add' : 'remove')
        // 刷新页面数据
        this.$forceUpdate()
      },
      // 判断公共用品描述div内的文字是否超过比例
      isOverflow () {
        if (this.$refs.describe.clientHeight > 40) {
          this.textOver = true
          this.showMore = false
        }
      },
      // 收起、展开切换
      more () {
        this.showMore = !this.showMore
      }
    }
  }
</script>

<style lang="scss">
  .supplies-pro-item-wrapper{
    .content-box{}
  }
</style>
<style lang="scss" scoped>
  .supplies-pro-item-wrapper{
    .content-box{
      padding: 10px 12px 10px 0;
      display: flex;
      border-bottom: 1px solid #edeeef;
      .left-box{
        flex: 1 1 12%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .item-pick{
          border: 1px solid #dfe1e3;
          border-radius: 100%;
          width: 20px;
          height: 20px;
        }
        .y_pick{
          border-color: #0CD4AC;
          background-color: #0CD4AC;
          &:after{
            content:'/';
            display: block;
            width:10px;
            height:5px;
            transform: rotate(-50deg);
            border: 2px solid white;
            border-top: 0;
            border-right: 0;
            margin-top: 5px;
            margin-left: 4px;
            font-size:0;
          }
        }
      }
      .right-box{
        flex: 1 1 88%;
        position: relative;
        .describe-line{
          font-size: 16px;
          word-break: break-all;
          line-height: 1.3;
        }
        .titleLong{
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .code{
          position: relative;
          font-size: 14px;
          color: #989c9f;
          padding-top: 10px;
          span{
            position: absolute;
            top: 8px;
            right: 116px;
            margin-left: 20px;
            font-size: 15px;
            .triangle-up{
              width: 0;
              height: 0;
              border-left: 6px solid transparent;
              border-right: 6px solid transparent;
              border-bottom: 8px solid #c5c5c5;
              position: absolute;
              top: 7px;
              right: -14px;
            }
            .triangle-down{
              width: 0;
              height: 0;
              border-left: 6px solid transparent;
              border-right: 6px solid transparent;
              border-top: 8px solid #c5c5c5;
              position: absolute;
              top: 7px;
              right: -14px;
            }
          }
        }
        .add{
          display: block;
          width: 20px;
          height: 20px;
          bottom: 0px;
          right: 6px;
          position: absolute;
          background-size: 100%;
        }
        .reduce{
          display: block;
          width: 20px;
          height: 20px;
          bottom: 0px;
          right: 66px;
          position: absolute;
          background-size: 100%;
        }
        .number-input{
          bottom: 0px;
          right: 26px;
          width: 40px;
          position: absolute;
          height: 20px;
          font-size: 18px;
          color: #666;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          border: 1px solid #fff;
          padding: 3px 0;
          text-align: center;
          border-radius: 1px;
        }

      }
    }
  }
</style>
