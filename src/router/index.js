import Vue from 'vue'
import Router from 'vue-router'

// import GoodsList from '@/components/app/shopping/GoodsList'
import Cart from '@/components/app/shopping/Cart'
import Address from '@/components/app/shopping/Address'
import OrderConfirm from '@/components/app/shopping/OrderConfirm'
import OrderSuccess from '@/components/app/shopping/OrderSuccess'
import ScrollTab from '@/components/app/scrollTab/scrollTab'

import Questionnaire from '@/components/app/questionnaire/Questionnaire'
import QuestionnaireDetails from '@/components/app/questionnaire/QuestionnaireDetails'
import QuestionnaireResult from '@/components/app/questionnaire/QuestionnaireResult'

import Home from '@/components/home/Home'
import Work from '@/components/work/Work'
import Phonebook from '@/components/phonebook/Phonebook'

Vue.use(Router)

// 主页
const homeRoute = { path: '/home', component: Home, name: 'Home', children: [] }

// 商品页
// const goodsRoute = { path: '/', component: GoodsList, name: 'GoodsList' }
const goodsRoute = { path: '/', redirect: 'home/work' }

// 购物车也
const cartRoute = { path: '/cart', component: Cart, name: 'Cart' }

// 地址页
const addressRoute = { path: '/address', component: Address, name: 'Address' }

// 订单确认页
const orderRoute = { path: '/orderConfirm', component: OrderConfirm, name: 'OrderConfirm' }

// 订单成功页
const orderSuccessRoute = { path: '/orderSuccess', component: OrderSuccess, name: 'OrderSuccess' }

// 问卷调查
const questionnaireRoute = {
  path: 'questionnaire',
  component: Questionnaire,
  name: 'questionnaire',
  children: [
    { path: 'questionnaireDetails', name: 'questionnaireDetails', component: QuestionnaireDetails },
    { path: 'questionnaireResult', name: 'questionnaireResult', component: QuestionnaireResult }
  ]
}

// 日常工作
const workRoute = { path: 'work', name: 'work', component: Work, children: [] }
workRoute.children = [].concat(questionnaireRoute)

// 通讯录
const phonebookRoute = { path: 'phonebook', name: 'phonebook', component: Phonebook }

// 可滑动的头
const scrollTabRoute = { path: '/scrollTab', name: 'ScrollTab', component: ScrollTab }

// 组装移动办公APP路由
homeRoute.children = [].concat(workRoute, phonebookRoute)

const routes = [].concat(goodsRoute, cartRoute, homeRoute, addressRoute, orderRoute, orderSuccessRoute, scrollTabRoute)

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
