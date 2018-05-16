<template>
  <div>
    <group>
      <x-switch :title="('Set default input value')" v-model="show5"></x-switch>
    </group>
    <div v-transfer-dom>
      <confirm v-model="show5"
               show-input
               ref="confirm5"
               :title="('Confirm deleting the item')"
               @on-cancel="onCancel"
               @on-confirm="onConfirm5"
               @on-show="onShow5"
               @on-hide="onHide">
      </confirm>
    </div>
    <br>
    <br>
    <div style="padding:15px;">
      <x-button @click.native="showPlugin" type="primary">{{ ('Show') }}</x-button>
    </div>
    <div style="padding:15px;">
      <x-button @click.native="showPlugin2" type="primary">{{ ('Plugin usage') }}</x-button>
    </div>
    <div style="padding:15px;">
      <x-button @click.native="showPlugin3" type="primary"> {{ ('Call prompt by using plugin') }} </x-button>
    </div>
  </div>
</template>

<script>
  import { Confirm, Group, XSwitch, XButton, TransferDomDirective as TransferDom } from 'vux'
  export default {
    directives: {
      TransferDom
    },
    components: {
      Confirm,
      Group,
      XSwitch,
      XButton
    },
    data () {
      return {
        show: false,
        show2: false,
        show3: false,
        show4: false,
        show5: false
      }
    },
    methods: {
      onCancel () {
        console.log('on cancel')
      },
      onConfirm (msg) {
        console.log('on confirm')
        if (msg) {
          alert(msg)
        }
      },
      onConfirm4 () {
        console.log('on confirm')
        this.$vux.loading.show({
          transition: '',
          text: 'processing'
        })
        setTimeout(() => {
          this.$vux.loading.hide()
          this.show4 = false
        }, 1000)
      },
      onHide () {
        console.log('on hide')
      },
      onShow () {
        console.log('on show')
      },
      onShow5 () {
        this.$refs.confirm5.setInputValue('default')
      },
      onConfirm5 (value) {
        this.$refs.confirm5.setInputValue('')
        this.$vux.toast.text('input value: ' + value)
      },
      showPlugin () {
        this.$vux.confirm.show({
          title: 'Title',
          content: 'Content',
          onShow () {
            console.log('plugin show')
          },
          onHide () {
            console.log('plugin hide')
          },
          onCancel () {
            console.log('plugin cancel')
          },
          onConfirm () {
            console.log('plugin confirm')
          }
        })
      },
      showPlugin2 () {
        this.showPlugin()
      },
      showPlugin3 () {
        const _this = this
        this.$vux.confirm.prompt('123', {
          title: 'Title',
          onShow () {
            console.log('promt show')
            _this.$vux.confirm.setInputValue('set input value')
          },
          onHide () {
            console.log('prompt hide')
          },
          onCancel () {
            console.log('prompt cancel')
          },
          onConfirm (msg) {
            alert(msg)
          }
        })
      }
    },
    mounted () {
      this.timer = setInterval(() => {
        console.log(this.$vux.confirm.isVisible())
      }, 1000)
    },
    beforeDestroy () {
      clearInterval(this.timer)
    }
  }
</script>
