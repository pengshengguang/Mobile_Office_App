import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '@/components/app/shopping/GoodsList'
import Cart from '@/components/app/shopping/Cart'
import Address from '@/components/app/shopping/Address'
import OrderConfirm from '@/components/app/shopping/OrderConfirm'
import OrderSuccess from '@/components/app/shopping/OrderSuccess'
import ScrollTab from '@/components/app/scrollTab/scrollTab'

import questionnaire from '@/components/app/questionnaire/Questionnaire'
import questionnaireDetails from '@/components/app/questionnaire/QuestionnaireDetails'
import questionnaireResult from '@/components/app/questionnaire/QuestionnaireResult'

import Home from '@/components/home/Home'

Vue.use(Router)

// 主页
const homeRoute = { path: '/home', component: Home }

// 商品页
const goodsRoute = { path: '/', component: GoodsList, name: 'GoodsList' }

// 购物车也
const cartRoute = { path: '/cart', component: Cart, name: 'Cart' }

// 地址页
const addressRoute = { path: '/address', component: Address, name: 'Address' }

// 订单确认页
const orderRoute = { path: '/orderConfirm', component: OrderConfirm, name: 'OrderConfirm' }

// 订单成功页
const orderSuccessRoute = { path: '/orderSuccess', component: OrderSuccess, name: 'OrderConfirm' }

// 问卷调查
const questionnaireRoute = {
  path: '/questionnaire',
  component: questionnaire,
  name: 'questionnaire',
  children: [
    { path: 'questionnaireDetails', name: 'questionnaireDetails', component: questionnaireDetails },
    { path: 'questionnaireResult', name: 'questionnaireResult', component: questionnaireResult }
  ]
}

// 可滑动的头
const scrollTabRoute = { path: '/scrollTab', name: 'ScrollTab', component: ScrollTab }

// 组装移动办公APP路由
const routes = [].concat(goodsRoute, cartRoute, homeRoute, addressRoute, orderRoute, orderSuccessRoute, questionnaireRoute, scrollTabRoute)

let router = new Router({
  routes: routes
})

export default router

// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'GoodsList',
//       component: GoodsList
//     },
//     {
//       path: '/cart',
//       name: 'Cart',
//       component: Cart
//     },
//     {
//       path: '/address',
//       name: 'Address',
//       component: Address
//     },
//     {
//       path: '/orderConfirm',
//       name: 'OrderConfirm',
//       component: OrderConfirm
//     },
//     {
//       path: '/orderSuccess',
//       name: 'OrderSuccess',
//       component: OrderSuccess
//     },
//     {
//       path: '/scrollTab',
//       name: 'ScrollTab',
//       component: ScrollTab
//     },
//     {
//       path: '/questionnaire',
//       name: 'questionnaire',
//       component: questionnaire,
//       children: [
//         {
//           path: 'questionnaireDetails',
//           name: 'questionnaireDetails',
//           component: questionnaireDetails
//         },
//         {
//           path: 'questionnaireResult',
//           name: 'questionnaireResult',
//           component: questionnaireResult
//         }
//       ]
//     },
//     // 测试Home
//     {
//       path: '/home',
//       component: Home
//     }
//   ]
// })
