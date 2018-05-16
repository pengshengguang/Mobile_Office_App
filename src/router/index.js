// 命名规则： 组件（name、component）统一用首字母大写，路径（path）统一用首字母小写
import Vue from 'vue'
import Router from 'vue-router'

import GoodsList from '@/components/app/shopping/GoodsList'
import Cart from '@/components/app/shopping/Cart'
import Address from '@/components/app/shopping/Address'
import OrderConfirm from '@/components/app/shopping/OrderConfirm'
import OrderSuccess from '@/components/app/shopping/OrderSuccess'
import ScrollTab from '@/components/app/scrollTab/scrollTab'

import SuppliesHome from '@/components/app/supplies/SuppliesHome'
import Supplies from '@/components/app/supplies/Supplies'
import SuppliesClassify from '@/components/app/supplies/SuppliesClassify'
import SuppliesConfirm from '@/components/app/supplies/SuppliesConfirm'
import SuppliesDetailList from '@/components/app/supplies/SuppliesDetailList'

import Questionnaire from '@/components/app/questionnaire/Questionnaire'
import QuestionnaireDetails from '@/components/app/questionnaire/QuestionnaireDetails'
import QuestionnaireResult from '@/components/app/questionnaire/QuestionnaireResult'

import Login from '@/components/login/Login'
import Registered from '@/components/login/Registered'
import Forget from '@/components/login/Forget'

import Home from '@/components/home/Home'
import Work from '@/components/work/Work'
import Phonebook from '@/components/phonebook/Phonebook'
import Information from '@/components/information/Information'
import InformationDetails from '@/components/information/InformationDetails'
import Personal from '@/components/personal/Personal'

import ImageUpload from '@/base/ImageUpload/ImageUpload'

import Test from '@/components/test'

Vue.use(Router)

// 测试
const test = { path: '/test', component: Test, name: 'Test' }

// 登陆
const loginRoute = {
  path: '/login',
  component: Login,
  name: 'Login',
  children: [
    { path: 'forget', name: 'Forget', component: Forget },
    { path: 'registered',
      name: 'Registered',
      component: Registered,
      children: [
        { path: 'imageUpload', name: 'ImageUpload', component: ImageUpload }
      ]
    }
  ]
}

// 主页
const homeRoute = { path: '/home/:tabbar', name: 'home', component: Home, children: [] }

// 商品页
const goodsRoute = { path: '/goodsList', component: GoodsList, name: 'GoodsList' }
const redirectRoute = { path: '/', redirect: 'home/0/work' }
// const redirectRoute = { path: '/', redirect: 'login' }

// 购物车也
const cartRoute = { path: '/cart', component: Cart, name: 'Cart' }

// 地址页
const addressRoute = { path: '/address', component: Address, name: 'Address' }

// 订单确认页
const orderRoute = { path: '/orderConfirm', component: OrderConfirm, name: 'OrderConfirm' }

// 订单成功页
const orderSuccessRoute = { path: '/orderSuccess', component: OrderSuccess, name: 'OrderSuccess' }

// 办公用品
// const suppliesRoute = {
//   path: 'supplies',
//   component: Supplies,
//   name: 'Supplies',
//   children: [
//     { path: 'suppliesClassify', name: 'SuppliesClassify', component: SuppliesClassify },
//     { path: 'suppliesConfirm', name: 'SuppliesConfirm', component: SuppliesConfirm },
//     { path: 'suppliesDetailList', name: 'SuppliesDetailList', component: SuppliesDetailList }
//   ]
// }
const suppliesRoute = {
  path: 'suppliesHome',
  component: SuppliesHome,
  name: 'SuppliesHome',
  children: [
    { path: 'supplies', name: 'Supplies', component: Supplies },
    { path: 'suppliesClassify', name: 'SuppliesClassify', component: SuppliesClassify },
    { path: 'suppliesDetailList', name: 'SuppliesDetailList', component: SuppliesDetailList },
    { path: 'suppliesConfirm', name: 'SuppliesConfirm', component: SuppliesConfirm }
  ]
}

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

workRoute.children = [].concat(questionnaireRoute, suppliesRoute)

// 通讯录
const phonebookRoute = { path: 'phonebook', name: 'Phonebook', component: Phonebook }

// 同事圈
const informaRoute = {
  path: 'information',
  name: 'Information',
  component: Information,
  children: [
    { path: 'informationDetails', name: 'InformationDetails', component: InformationDetails }
  ]
}

// 个人页
const personalRoute = { path: 'personal', name: 'Personal', component: Personal }

// 可滑动的头
const scrollTabRoute = { path: '/scrollTab', name: 'ScrollTab', component: ScrollTab }

// 组装移动办公APP路由
homeRoute.children = [].concat(workRoute, phonebookRoute, informaRoute, personalRoute)

const routes = [].concat(redirectRoute, loginRoute, goodsRoute, cartRoute, homeRoute, addressRoute, orderRoute, orderSuccessRoute, scrollTabRoute, test)

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
