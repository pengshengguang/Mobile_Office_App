<template>
  <div class="test">
    <x-address @on-hide="logHide" @on-show="logShow" :title="title" v-model="value" :list="addressData" @on-shadow-change="onShadowChange" placeholder="请选择地址" inline-desc="可以设置placeholder" :show.sync="showAddress"></x-address>
      <cell title="上面value值" :value="value"></cell>
  </div>
</template>

<script>
  import { XAddress, ChinaAddressV4Data, Value2nameFilter as value2name } from 'vux'

  export default {
    components: {
      XAddress
    },
    data () {
      return {
        title: '默认为空',
        value_0_1: [],
        value: [],
        addressData: ChinaAddressV4Data,
        showAddress: false
      }
    },
    methods: {
      doShowAddress () {
        this.showAddress = true
        setTimeout(() => {
          this.showAddress = false
        }, 2000)
      },
      onShadowChange (ids, names) {
        console.log(ids, names)
      },
      getName (value) {
        return value2name(value, ChinaAddressV4Data)
      },
      logHide (str) {
        console.log('on-hide', str)
      },
      logShow (str) {
        console.log('on-show')
      }
    }
  }
</script>
<style lang="scss">
  .test{
    .vux-cell-box{

    }
  }
</style>
