<template>
  <div class="phonebook-wrapper">
    <x-header class="whiteBgHeader" :left-options="{showBack: false}"><div class="del" slot="left"></div>通讯录</x-header>
    <div class="search-box">
      <search></search>
    </div>
    <div class="main-box">
      <div class="list-box">
        <div class="group-title">A</div>
        <div class="item-box">
          <phonebook-item :avatar="images[0]"></phonebook-item>
          <phonebook-item :avatar="images[1]"></phonebook-item>
          <phonebook-item :avatar="images[2]"></phonebook-item>
          <phonebook-item :avatar="images[3]"></phonebook-item>
        </div>
      </div>
      <div class="list-box">
        <div class="group-title">B</div>
        <div class="item-box">
          <phonebook-item :avatar="images[4]"></phonebook-item>
          <phonebook-item :avatar="images[5]"></phonebook-item>
          <phonebook-item :avatar="images[6]"></phonebook-item>
          <phonebook-item :avatar="images[7]"></phonebook-item>
        </div>
      </div>
      <div class="list-box">
        <div class="group-title">C</div>
        <div class="item-box">
          <phonebook-item :avatar="images[8]"></phonebook-item>
          <phonebook-item :avatar="images[9]"></phonebook-item>
          <phonebook-item :avatar="images[10]"></phonebook-item>
          <phonebook-item :avatar="images[11]"></phonebook-item>
        </div>
      </div>
      <div class="list-box">
        <div class="group-title">D</div>
        <div class="item-box">
          <phonebook-item :avatar="images[8]"></phonebook-item>
          <phonebook-item :avatar="images[9]"></phonebook-item>
          <phonebook-item :avatar="images[10]"></phonebook-item>
          <phonebook-item :avatar="images[11]"></phonebook-item>
        </div>
      </div>

    </div>
    <div class="key-box">
      <div class="key-item">A</div>
      <div class="key-item">B</div>
      <div class="key-item">C</div>
      <div class="key-item">D</div>
      <div class="key-item">E</div>
      <div class="key-item">F</div>
      <div class="key-item">G</div>
      <div class="key-item">H</div>
      <div class="key-item">I</div>
      <div class="key-item">J</div>
      <div class="key-item">R</div>
      <div class="key-item">S</div>
      <div class="key-item">T</div>
      <div class="key-item">U</div>
      <div class="key-item">V</div>
      <div class="key-item">W</div>
      <div class="key-item">S</div>
      <div class="key-item">Y</div>
      <div class="key-item">Z</div>
    </div>
  </div>
</template>

<script>
  import Httpservice from '@/services/HttpService'
  import Search from '@/base/search/Search'
  import PhonebookItem from './assembly/PhonebookItem.vue'
  import { XHeader } from 'vux'
  export default {
    components: {
      XHeader,
      Search,
      PhonebookItem
    },
    data () {
      return {
        http: Httpservice.getAxios,
        images: [
          require('./../../assets/img/avatar/men1.png'),
          require('./../../assets/img/avatar/men2.png'),
          require('./../../assets/img/avatar/men3.png'),
          require('./../../assets/img/avatar/women1.png'),
          require('./../../assets/img/avatar/women2.png'),
          require('./../../assets/img/avatar/women3.png'),
          require('./../../assets/img/avatar/women4.png'),
          require('./../../assets/img/avatar/men1.png'),
          require('./../../assets/img/avatar/men2.png'),
          require('./../../assets/img/avatar/men3.png'),
          require('./../../assets/img/avatar/women1.png'),
          require('./../../assets/img/avatar/women2.png'),
          require('./../../assets/img/avatar/women3.png'),
          require('./../../assets/img/avatar/women4.png')
        ]
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
  .phonebook-wrapper{
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    width: 100%;
    bottom: 53px;
    .whiteBgHeader{
      flex: 0 0 44px;
    }
    .search-box{
      flex: 0 0 44px;
      position: relative;
    }
    .main-box{
      overflow: auto;
      flex: auto;
      .list-box{
        display: flex;
        flex-direction: column;
        .group-title{
          flex: 0 0 30px;
          display: flex;
          background: #f7f7f7;
          align-items: center;
          padding-left: 12px;
        }
        .item-box{
        }
      }
    }
    .key-box{
      position: fixed;
      top: 19%;
      right: 3px;
      display: flex;
      flex-direction: column;
      width: 20px;
      padding: 20px 0;
      border-radius: 10px;
      background: rgba(0,0,0,0.1);
      .key-item{
        flex: auto;
        font-size: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

</style>
