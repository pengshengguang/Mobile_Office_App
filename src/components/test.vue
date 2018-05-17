<template>
  <div class="questionnaire_list" ref="scrollbox" @scroll='scrollready($event)'>
    <div class="in_approval auditor">
      <ul>
        <li class="message">
          <div class="left_boxt">
            <div class="fontStyle">
              <p class="topFont">已参与人</p>
              <p class="bottomFont">200</p>
            </div>
          </div>
          <div class="right_boxt">
            <div>
              <p class="boxTitle " >2017年上半年行政服务满意度调查表<span class="topicCount">(共20题)</span></p>
            </div>
            <div class="questionnaire_time">
              <div class="questionnaire_time_right">欧阳光光<span class="span_title">发布</span></div>
              <div class="questionnaire_time_left">2017年12月21日 19:30:00<span class="span_title">至</span>2017年12月21日 19:30:00</div>
            </div>
          </div>
          <div class="rightArrow_boxt"><i class="arrow_icon" :style='backgroundRightArrow'></i></div>
          <!--待审批-->
          <div class="approval_buttom" :class="{'canClick': noClick === true }">
            <div class="bottomBtn">马上参与</div>
          </div>
          <div class="approval_buttom" :class="{'canClick': noClick === true }">
            <div class="bottomBtn">统计结果</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'questionnaireList',
    props: ['CarList', 'tabnum', 'isClick', 'isAuditor', 'feedIssort'],
    data () {
      return {
        simpleObj: {
          msgi: ''
        },
        // 右箭头图标
        backgroundRightArrow: {
          backgroundImage: 'url(' + require('@/assets/img/questionnaire/icon_arrow_right.png') + ')'
        },
        // scroll
        lengthThreshold: 50,
        timeThreshold: 300,
        promise: null,
        // 记录上一次滑动的高度
        oldScrollTop: 0,
        // 按钮是否变灰，false为灰色不能点击，ture为绿色可以点击
        noClick: false
      }
    },
    // 引用组件
    components: {},
    // 页面渲染之前
    created () {
    },
    // 页面渲染之后
    mounted () {},
    methods: {}
  }
</script>

<style scoped lang="scss">
  .questionnaire_list{
    height: 100%;
    overflow-y: auto;
  }
  .questionnaire_list ul{
    list-style-type: none;
  }
  .already_shared li{
    width: 100%;
    height: auto;
    border-bottom: 1px solid #e7e8ea;
    position: relative;
    display: inline-block;
    padding-bottom: 7px;
    font-family: "微软雅黑","Microsoft Yahei","Helvetica Neue";
    font-size: 16px;
  }
  .questionnaire_list .right_icon{
    width: 20px;
    height: 20px;
    background-size: 100%;
    position: absolute;
    right: 10px;
    top: 50%;
    margin-top: -10px;
  }
  .questionnaire_time{
    height: auto;
  }
  .time_icon{
    background-size: 100%;
    width: 12px;
    height: 12px;
    display: block;
    float: left;
    margin-top: 8px;
    margin-right: 7px;
  }
  .span_title,
  .feedback_message span.span_title,
  .approval_message span.span_title{
    line-height: 2;
    font-size: 14px;
    display: inline;
    width: auto;
  }
  .span_title{
    color: #999999;
    font-size: 16px;
    line-height: 2;
    margin: 0px 5px;
  }
  .user_icon{
    background-size: 100%;
    width: 12px;
    height: 12px;
    display: block;
    float: left;
    margin-top: 8px;
    margin-right: 7px;
  }
  .questionnaire_time_right span{
  }
  .questionnaire_time_right span.span_title{
    padding-left: 0;
  }
  .feedback li{
    width: 100%;
    position: relative;
    display: inline-block;
    margin-bottom: 5px;
    background: white;
    font-family: "微软雅黑","Microsoft Yahei","Helvetica Neue";
    font-size: 16px;
  }
  .feedback .time_icon{
    margin-top: 8px;
    margin-right: 7px;
  }
  .feedback .user_icon{
    margin-left: 13px;
  }
  .feedback_message span,
  .approval_message span{
    display: block;
    width: 68%;
    height: 22px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    float: left;
  }
  .in_approval.auditor{
    background: #f2f4f5;
  }
  .in_approval li.message{
    width: 100%;
  }
  .in_approval.auditor li{
    border-bottom: none;
    margin-bottom: 5px;
    font-family: "微软雅黑","Microsoft Yahei","Helvetica Neue";
    font-size: 16px;
  }
  .in_approval li{
    width: 100%;
    height: 100%;
    min-height: 75px;
    line-height: normal;
    border-bottom: 1px solid #e7e8ea;
    display: inline-block;
    background: white;
    position: relative;
  }
  .in_approval li .left_boxt{
    text-align: center;
    float: left;
    width: 30%;
    font-size: 16px;
  }
  .left_boxt .fontStyle .topFont{
    color: #999999;
    font-size: 14px;
  }
  .left_boxt .fontStyle .bottomFont{
    color: #149c81;
    font-size: 22px;
    word-break: break-all;
  }
  .in_approval li .right_boxt{
    position: relative;
    display: inline-block;
    width: 60%;
    font-size: 16px;
    text-align: justify;
  }
  .in_approval li .rightArrow_boxt{
    background-size: 100%;
    text-align: center;
    position: absolute;
    top: 34%;
    right: 10px;
    width: 10%;
  }
  .in_approval .time_icon{
    margin-top: 8px;
    margin-right: 7px;
  }
  .in_approval .cancel_box{
    font-size: 12px;
    color: #3271C2;
    border: 1px solid #3271C2;
    width: 42px;
    height: 17px;
    border-radius: 3px;
    line-height: 1.4;
    text-align: center;
    position: absolute;
    top: 50%;
    right: 13px;
    margin-top: -10px;
  }
  .in_approval.auditor .cancel_box{
    font-size: 0;
    border: none;
    width: 20px;
    height: 20px;
    background-size: 100%;
    text-align: center;
    position: absolute;
    top: 50%;
    right: 13px;
    margin-top: -10px;
  }
  .approval_buttom{
    width: 100%;
    border-top: 1px solid #dfe1e3;
    color: #149c81;
  }
  .canClick{
    color: #dfe1e3;
  }
  .approval_buttom .bottomBtn{
    float: left;
    width: 100%;
    height: 38px;
    min-height: 38px;
    text-align: center;
    line-height: 38px;
    font-size: 16px;
  }
  .message_icon{
    background-size: 100%;
    width: 12px;
    height: 12px;
    display: block;
    float: left;
    margin-top: 8px;
    margin-left: 18px;
    margin-right: 11px;
  }
  .approval_message .message_icon{
    margin-left: 13px;
    margin-right: 6px;
    background-size: 100%;
  }
  .approval_message span{
    color: #149c81;
  }
  .already_shared,
  .feedback,
  .in_approval{
    margin-top: 0;
  }
  .already_shared .no_data,
  .feedback .no_data{
    font-size: 16px;
    color: #020f17;
    text-align: center;
    padding-top: 106px;
    width: 100%;
    background: #ffffff;
  }
  .in_approval .no_data{
    text-align: center;
    width: 100%;
    background: #ffffff;
    line-height: 1.5;
    font-size: 16px;
  }
  .in_approval .no_data .add_icon{
    background-size: 100%;
    width: 51px;
    height: 51px;
    margin: 88px auto 6px;
    position: relative;
    top: 0;
    right: 0;
  }
  .in_approval .boxTitle{
    margin:  0px;
    margin-top: 7px;
    width: 94%;
  }
  .in_approval .boxTitleColor{
    color: #149c81;
  }
  .in_approval .right_boxt .topicCount{
    font-size: 14px;
    color: #999999;
  }
  .in_approval .arrow_icon{
    background-size: 100%;
    width: 24px;
    float: right;
    height: 24px;
    margin: 5px;
    text-align: center;
    vertical-align: middle;
  }
</style>
