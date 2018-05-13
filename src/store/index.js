import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    nickName: '',
    cartCount: 0,
    supplies: {}
  },
  mutations: {
    updateUserInfo (state, nickName) {
      state.nickName = nickName
    },
    updateCartCount (state, cartCount) {
      state.cartCount += cartCount
    },
    initCartCount (state, cartCount) {
      state.cartCount = cartCount
    },
    setSupplies (state, supplies) {
      state.supplies = supplies
    },
    setLargeClassIndex (state, largeClassIndex) {
      state.supplies.largeClassIndex = largeClassIndex
    }
  }
})

export default store
