<template>
  <transition name="fade">
    <div class="supplies-wrapper cover">
      <x-header class="whiteBgHeader" :left-options="{backText:'', preventGoBack: true}" @on-click-back="goBack">提交</x-header>
      <div class="content-box">
        <div class="category-box">
          <div class="category-name">白板附件<span>2个品类/共2件</span></div> <!--大类-->
          <div class="category-content"> <!--大类下的小类商品列表-->
            <swipeout class="vux-1px-tb itemBox" :threshold=".2">
              <swipeout-item transition-mode="reveal">
                <div slot="right-menu">
                  <swipeout-button type="warn">删除</swipeout-button>
                </div>
                <div slot="content">
                  <div class="proName-line">
                    <div class="proName">史泰博 白板纸张 56*90cm，80G 白色（卷）</div>
                    <div class="proNum">x1</div>
                  </div>
                  <div class="proCode-line">1100013846EA</div>
                </div>
              </swipeout-item>
            </swipeout>
            <swipeout class="vux-1px-tb itemBox" :threshold=".2">
              <swipeout-item transition-mode="reveal">
                <div slot="right-menu">
                  <swipeout-button type="warn">删除</swipeout-button>
                </div>
                <div slot="content">
                  <div class="proName-line">
                    <div class="proName">史泰博 白板纸张 56*90cm，80G 白色（卷）</div>
                    <div class="proNum">x1</div>
                  </div>
                  <div class="proCode-line">1100013846EA</div>
                </div>
              </swipeout-item>
            </swipeout>
            <swipeout class="vux-1px-tb itemBox" :threshold=".2">
              <swipeout-item transition-mode="reveal">
                <div slot="right-menu">
                  <swipeout-button type="warn">删除</swipeout-button>
                </div>
                <div slot="content">
                  <div class="proName-line">
                    <div class="proName">史泰博 白板纸张 56*90cm，80G 白色（卷）</div>
                    <div class="proNum">x1</div>
                  </div>
                  <div class="proCode-line">1100013846EA</div>
                </div>
              </swipeout-item>
            </swipeout>
          </div>
        </div>
        <div class="category-box">
          <div class="category-name">白板附件<span>2个品类/共2件</span></div> <!--大类-->
          <div class="category-content"> <!--大类下的小类商品列表-->
            <swipeout class="vux-1px-tb itemBox" :threshold=".2">
              <swipeout-item transition-mode="reveal">
                <div slot="right-menu">
                  <swipeout-button type="warn">删除</swipeout-button>
                </div>
                <div slot="content">
                  <div class="proName-line">
                    <div class="proName">史泰博 白板纸张 56*90cm，80G 白色（卷）</div>
                    <div class="proNum">x1</div>
                  </div>
                  <div class="proCode-line">1100013846EA</div>
                </div>
              </swipeout-item>
            </swipeout>
            <swipeout class="vux-1px-tb itemBox" :threshold=".2">
              <swipeout-item transition-mode="reveal">
                <div slot="right-menu">
                  <swipeout-button type="warn">删除</swipeout-button>
                </div>
                <div slot="content">
                  <div class="proName-line">
                    <div class="proName">史泰博 白板纸张 56*90cm，80G 白色（卷）</div>
                    <div class="proNum">x1</div>
                  </div>
                  <div class="proCode-line">1100013846EA</div>
                </div>
              </swipeout-item>
            </swipeout>
            <swipeout class="vux-1px-tb itemBox" :threshold=".2">
              <swipeout-item transition-mode="reveal">
                <div slot="right-menu">
                  <swipeout-button type="warn">删除</swipeout-button>
                </div>
                <div slot="content">
                  <div class="proName-line">
                    <div class="proName">史泰博 白板纸张 56*90cm，80G 白色（卷）</div>
                    <div class="proNum">x1</div>
                  </div>
                  <div class="proCode-line">1100013846EA</div>
                </div>
              </swipeout-item>
            </swipeout>
          </div>
        </div>
        <div class="category-box">
          <div class="category-name">白板附件<span>2个品类/共2件</span></div> <!--大类-->
          <div class="category-content"> <!--大类下的小类商品列表-->
            <swipeout class="vux-1px-tb itemBox" :threshold=".2">
              <swipeout-item transition-mode="reveal">
                <div slot="right-menu">
                  <swipeout-button type="warn">删除</swipeout-button>
                </div>
                <div slot="content">
                  <div class="proName-line">
                    <div class="proName">史泰博 白板纸张 56*90cm，80G 白色（卷）</div>
                    <div class="proNum">x1</div>
                  </div>
                  <div class="proCode-line">1100013846EA</div>
                </div>
              </swipeout-item>
            </swipeout>
            <swipeout class="vux-1px-tb itemBox" :threshold=".2">
              <swipeout-item transition-mode="reveal">
                <div slot="right-menu">
                  <swipeout-button type="warn">删除</swipeout-button>
                </div>
                <div slot="content">
                  <div class="proName-line">
                    <div class="proName">史泰博 白板纸张 56*90cm，80G 白色（卷）</div>
                    <div class="proNum">x1</div>
                  </div>
                  <div class="proCode-line">1100013846EA</div>
                </div>
              </swipeout-item>
            </swipeout>
            <swipeout class="vux-1px-tb itemBox" :threshold=".2">
              <swipeout-item transition-mode="reveal">
                <div slot="right-menu">
                  <swipeout-button type="warn">删除</swipeout-button>
                </div>
                <div slot="content">
                  <div class="proName-line">
                    <div class="proName">史泰博 白板纸张 56*90cm，80G 白色（卷）</div>
                    <div class="proNum">x1</div>
                  </div>
                  <div class="proCode-line">1100013846EA</div>
                </div>
              </swipeout-item>
            </swipeout>
          </div>
        </div>
        <div class="category-box">
          <div class="category-name">白板附件<span>2个品类/共2件</span></div> <!--大类-->
          <div class="category-content"> <!--大类下的小类商品列表-->
            <swipeout class="vux-1px-tb itemBox" :threshold=".2">
              <swipeout-item transition-mode="reveal">
                <div slot="right-menu">
                  <swipeout-button type="warn">删除</swipeout-button>
                </div>
                <div slot="content">
                  <div class="proName-line">
                    <div class="proName">史泰博 白板纸张 56*90cm，80G 白色（卷）</div>
                    <div class="proNum">x1</div>
                  </div>
                  <div class="proCode-line">1100013846EA</div>
                </div>
              </swipeout-item>
            </swipeout>
            <swipeout class="vux-1px-tb itemBox" :threshold=".2">
              <swipeout-item transition-mode="reveal">
                <div slot="right-menu">
                  <swipeout-button type="warn">删除</swipeout-button>
                </div>
                <div slot="content">
                  <div class="proName-line">
                    <div class="proName">史泰博 白板纸张 56*90cm，80G 白色（卷）</div>
                    <div class="proNum">x1</div>
                  </div>
                  <div class="proCode-line">1100013846EA</div>
                </div>
              </swipeout-item>
            </swipeout>
            <swipeout class="vux-1px-tb itemBox" :threshold=".2">
              <swipeout-item transition-mode="reveal">
                <div slot="right-menu">
                  <swipeout-button type="warn">删除</swipeout-button>
                </div>
                <div slot="content">
                  <div class="proName-line">
                    <div class="proName">史泰博 白板纸张 56*90cm，80G 白色（卷）</div>
                    <div class="proNum">x1</div>
                  </div>
                  <div class="proCode-line">1100013846EA</div>
                </div>
              </swipeout-item>
            </swipeout>
          </div>
        </div>
        <div class="category-box">
          <div class="category-name">白板附件<span>2个品类/共2件</span></div> <!--大类-->
          <div class="category-content"> <!--大类下的小类商品列表-->
            <swipeout class="vux-1px-tb itemBox" :threshold=".2">
              <swipeout-item transition-mode="reveal">
                <div slot="right-menu">
                  <swipeout-button type="warn">删除</swipeout-button>
                </div>
                <div slot="content">
                  <div class="proName-line">
                    <div class="proName">史泰博 白板纸张 56*90cm，80G 白色（卷）</div>
                    <div class="proNum">x1</div>
                  </div>
                  <div class="proCode-line">1100013846EA</div>
                </div>
              </swipeout-item>
            </swipeout>
            <swipeout class="vux-1px-tb itemBox" :threshold=".2">
              <swipeout-item transition-mode="reveal">
                <div slot="right-menu">
                  <swipeout-button type="warn">删除</swipeout-button>
                </div>
                <div slot="content">
                  <div class="proName-line">
                    <div class="proName">史泰博 白板纸张 56*90cm，80G 白色（卷）</div>
                    <div class="proNum">x1</div>
                  </div>
                  <div class="proCode-line">1100013846EA</div>
                </div>
              </swipeout-item>
            </swipeout>
            <swipeout class="vux-1px-tb itemBox" :threshold=".2">
              <swipeout-item transition-mode="reveal">
                <div slot="right-menu">
                  <swipeout-button type="warn">删除</swipeout-button>
                </div>
                <div slot="content">
                  <div class="proName-line">
                    <div class="proName">史泰博 白板纸张 56*90cm，80G 白色（卷）</div>
                    <div class="proNum">x1</div>
                  </div>
                  <div class="proCode-line">1100013846EA</div>
                </div>
              </swipeout-item>
            </swipeout>
          </div>
        </div>
        <div class="category-box">
          <div class="category-name">白板附件<span>2个品类/共2件</span></div> <!--大类-->
          <div class="category-content"> <!--大类下的小类商品列表-->
            <swipeout class="vux-1px-tb itemBox" :threshold=".2">
              <swipeout-item transition-mode="reveal">
                <div slot="right-menu">
                  <swipeout-button type="warn">删除</swipeout-button>
                </div>
                <div slot="content">
                  <div class="proName-line">
                    <div class="proName">史泰博 白板纸张 56*90cm，80G 白色（卷）</div>
                    <div class="proNum">x1</div>
                  </div>
                  <div class="proCode-line">1100013846EA</div>
                </div>
              </swipeout-item>
            </swipeout>
            <swipeout class="vux-1px-tb itemBox" :threshold=".2">
              <swipeout-item transition-mode="reveal">
                <div slot="right-menu">
                  <swipeout-button type="warn">删除</swipeout-button>
                </div>
                <div slot="content">
                  <div class="proName-line">
                    <div class="proName">史泰博 白板纸张 56*90cm，80G 白色（卷）</div>
                    <div class="proNum">x1</div>
                  </div>
                  <div class="proCode-line">1100013846EA</div>
                </div>
              </swipeout-item>
            </swipeout>
            <swipeout class="vux-1px-tb itemBox" :threshold=".2">
              <swipeout-item transition-mode="reveal">
                <div slot="right-menu">
                  <swipeout-button type="warn">删除</swipeout-button>
                </div>
                <div slot="content">
                  <div class="proName-line">
                    <div class="proName">史泰博 白板纸张 56*90cm，80G 白色（卷）</div>
                    <div class="proNum">x1</div>
                  </div>
                  <div class="proCode-line">1100013846EA</div>
                </div>
              </swipeout-item>
            </swipeout>
          </div>
        </div>
        <div class="textarea-box">
          <group style="width: 100%">
            <x-textarea :rows="2" placeholder="可输入列表中没有的办公用品"
                        class="require-item-x-input"
                        :show-counter="true" :max="100" :autosize='true'>
            </x-textarea>
          </group>
        </div>
        <div style="height: 83px;flex: none;"></div>
      </div>
      <div class="btn-box">
        <div class="text">提交</div>
      </div>
    </div>
  </transition>
</template>

<script>
  import { XHeader, Group, XTextarea, Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'

  export default {
    data () {
      return {
        backgroundSelected: {
          backgroundImage: 'url(' + require('@/assets/img/supplies/icon-selected.png') + ')'
        },
        // selected-lucency
        backgroundSelectedLucency: {
          backgroundImage: 'url(' + require('@/assets/img/supplies/icon-selected-lucency.png') + ')'
        }
      }
    },
    components: {
      XHeader,
      Group,
      XTextarea,
      Swipeout,
      SwipeoutItem,
      SwipeoutButton
    },
    methods: {
      goBack () {
        this.$router.back(-1)
      }
    }
  }
</script>

<style lang="scss">
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .supplies-wrapper{
    .textarea-box{
      .weui-textarea-counter{
        font-size: 14px;
      }
      .weui-cells{
        margin-top: 0;
        width: 90%;
        margin: 0 auto;
        border: 1px solid #D9D9D9;
        &:before{
          display: none;
        }
        &:after{
          display: none;
        }
        textarea{
          padding: 0;
        }
      }
    }
  }
</style>

<style lang="scss" scoped>
  .supplies-wrapper{
    display: flex;
    flex-direction: column;
    .content-box{
      flex: auto;
      display: flex;
      flex-direction: column;
      overflow: auto;
      .category-box{
        border-bottom: 10px solid #ededed;
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
              padding-left: 60px;
              font-weight: bold;
              font-size: 16px;
            }
          }
          .proCode-line{
            padding: 0 0 8px 0;
          }
        }
      }
      .textarea-box{
        padding-top: 16px;
      }
    }
    .btn-box{
      position: fixed;
      bottom: 0;
      height: 53px;
      width: 100%;
      display: flex;
      justify-content: flex-end;
      background-color: #ededed;
      .text{
        font-size: 18px;
        color: #ffffff;
        flex: 0 0 140px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #149c81;
      }
    }
  }
</style>
