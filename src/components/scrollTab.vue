<template>
  <div class="tab-component">
    <divider>tab组件</divider>
    <div ref="tabBoxOuter" style="width: 100%;overflow:scroll;-webkit-overflow-scrolling:touch;">
      <tab ref="tabBox" style="background-color: #f2f4f5;font-size: 14px" bar-active-color="#149c81" :line-width="4"
           :custom-bar-width="getBarWidth" :style="{width: tabWidth + 'px'}">
        <tab-item v-for="(item,index) in list" :key="index" @on-item-click="onItemClick(item, index)">{{item}}
        </tab-item>
      </tab>
    </div>
    <br/>
    <div class="box">
      <x-button @click.native="clickTabItemById(2)" type="primary">go to 2</x-button>
      <x-button @click.native="clickTabItemById(3)" type="primary">go to 3</x-button>
      <x-button @click.native="clickTabItemById(4)" type="primary">go to 4</x-button>
      <x-button @click.native="clickTabItemById(5)" type="primary">go to 5</x-button>
      <x-button @click.native="clickTabItemById(6)" type="primary">go to 6</x-button>
      <x-button @click.native="clickTabItemById(7)" type="primary">go to 7</x-button>
    </div>
  </div>
</template>

<script>
  import { Tab, TabItem, Divider, XButton } from 'vux'

  export default {
    components: {
      Tab,
      TabItem,
      Divider,
      XButton
    },
    data () {
      return {
        // tab标签div长度
        tabWidth: document.body.clientWidth,
        list: ['打印机', '复印机', '打印纸', '订书机11111111', '打印机2222222222222222', '复印机3333333333333', '打印纸444444444444', '订书机5']
      }
    },
    mounted () {
      this.setTabWidth()
      this.clickFirstItem()
    },
    methods: {
      onItemClick (keyword, index) {
        console.log('on item click:', index)
        let barLeft = 0
        document.getElementsByClassName('vux-tab-ink-bar')[0].style.right = '100%'
        for (let i = 0; i < this.list.length;) {
          if (document.getElementsByClassName('vux-tab-item')[i].innerText === keyword) {
            console.log('document.getElementsByClassName(\'vux-tab-item\')[' + index + '].offsetWidth = ' + document.getElementsByClassName('vux-tab-item')[i].offsetWidth)
            barLeft += document.getElementsByClassName('vux-tab-item')[i].offsetWidth / 2
            barLeft -= 22.5
            break
          }
          barLeft += document.getElementsByClassName('vux-tab-item')[i].offsetWidth
          i += 1
        }
        document.getElementsByClassName('vux-tab-ink-bar')[0].style.left = (barLeft + 'px')
      },
      // 函数控制tab-bar的宽度,如果tab标签页数量为1，则隐藏tab-bar
      getBarWidth () {
        if (this.list && this.list.length === 1) {
          return '0px'
        }
        return '45px'
      },
      setTabWidth () {
        // 页面完成刷新之后
        this.$nextTick(() => {
          let ofwidth = 0
          let efwidth = 0
          // efwidth为每一个tab-item的长度总和,因为tab-item的父级为flex布局,而tab-item的flex: none，所以初始化的时候，tab-item会根据自己的字体长度，自动扩张宽度。
          for (let i = 0; i < this.$refs.tabBox.$children.length;) {
            efwidth += this.$refs.tabBox.$children[i].$el.offsetWidth
            i += 1
          }
          // 同样是计算初始化的时候，每一个tab-item的总宽度，但当tab-item总长度大于tab的总长度时，立马退出程序
          for (let i = 0; i < this.$refs.tabBox.$children.length;) {
            ofwidth += this.$refs.tabBox.$children[i].$el.offsetWidth
            if (ofwidth > (document.body.clientWidth)) {
              break
            }
            i += 1
          }
          // 假如tab-item的总宽度小于显示tabwidth，则评分tab的剩余空间，加到每一个tab-item中
          if (ofwidth < (document.body.clientWidth)) {
            for (let i = 0; i < this.$refs.tabBox.$children.length;) {
              this.$refs.tabBox.$children[i].$el.style.width = (this.$refs.tabBox.$children[i].$el.clientWidth + (((document.body.clientWidth) - ofwidth) / this.$refs.tabBox.$children.length)) + 'px'
              console.log(((((document.body.clientWidth) - ofwidth) / this.$refs.tabBox.$children.length)) + 'px')
              i += 1
            }
            this.tabWidth = (document.body.clientWidth)
          } else {
            this.tabWidth = efwidth
          }
        }, 1000)
      },
      clickFirstItem () {
        setTimeout(() => {
          this.$refs.tabBox.$children[0].onItemClick()
        }, 200)
      },
      clickTabItemById (index) {
        // 模拟点击事件
        this.$refs.tabBox.$children[index].onItemClick()
        // 滑动到对应的点击标签页
        // 这里值得注意的是，为什么tabBoxOut的宽度明明只有屏幕的宽度，而里面的tabBox是超过屏幕的宽度的，所有才
        // 可以滑动，滑动的是tabBox这个div，而真正滑动的事件却是绑定在tabBoxOut这个div当中。所以，当你使用scrollLeft
        // 这个属性的时候，是要用在tabBoxOut这个div上，而不是在tabBox这个div上。
        // ----------------------------------------------------------------
        // 接下来可以运用offsetLeft计算tab-item在父div tabBox横轴偏移量、scrollLeft滑动到对应的tab-item，然后运用数学公式来把激活的tab-item滚动到tabBoxOuter这个div
        // 的中心
        let tabConter = (document.body.clientWidth - this.$refs.tabBox.$children[index].$el.offsetWidth) / 2
        this.$refs.tabBoxOuter.scrollLeft = this.$refs.tabBox.$children[index].$el.offsetLeft - tabConter
      }
    }
  }
</script>

<!--此style用来设置组件去除横向滚动条显示-->
<style scoped>
  /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸,在这里设置滚动条宽度为0px*/
  ::-webkit-scrollbar {
    width: 0px;
    display: none;
    background-color: #fff;
  }

  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #fff;
  }

  /*定义滑块 内阴影+圆角*/
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
    background-color: #fff;
  }
</style>
<!--此style用来设置vux组件的部分样式调整-->
<style>
  .tab-component .vux-tab-bar-inner {
    border-radius: 10px !important;
  }

  /*改变原来tabBox的flex布局*/
  .tab-component .vux-tab .vux-tab-item {
    display: inline-block;
    width: auto;
    height: 100%;
    padding: 0 10px;
    flex: none;
    background-color: #f2f4f5;
  }

  /*定义tab-item选中时的样式*/
  .tab-component .vux-tab .vux-tab-item.vux-tab-selected {
    font-size: 16px;
    color: #149c81;
    border-bottom: 3px solid #04BE02;
  }

  .box {
    padding: 15px;
  }
</style>
