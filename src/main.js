import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll' // 无限滚动插件，用来加载更多功能
import Vuex from 'vuex'
import store from './store'

import VueCordova from 'vue-cordova'

import './assets/css/base.css'
import './assets/css/checkout.css'
import './assets/css/login.css'
import './assets/css/product.css'

import { AlertPlugin, ToastPlugin, ConfirmPlugin, LoadingPlugin } from 'vux'

fastclick.attach(document.body) // 取消300ms的点击延迟

Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
Vue.use(infiniteScroll)
Vue.use(Vuex)
Vue.use(VueCordova)

Vue.config.productionTip = false

Vue.use(VueLazyLoad, {
  // loading: '/static/loading-svg/loading-bars.svg'
  loading: require('./assets/img/loading-svg/loading-bars.svg')
})

// const store = new Vuex.Store({
//   state: {
//     nickName: '',
//     cartCount: 0
//   },
//   mutations: {
//     updateUserInfo (state, nickName) {
//       state.nickName = nickName
//     },
//     updateCartCount (state, cartCount) {
//       state.cartCount += cartCount
//     },
//     initCartCount (state, cartCount) {
//       state.cartCount = cartCount
//     }
//   }
// })
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
