// 命名规则： 组件（name、component）统一用首字母大写，路径（path）统一用首字母小写
import Vue from 'vue'
import Router from 'vue-router'

import Shopping from '@/components/app/shopping/ShoppingHome'
import GoodsList from '@/components/app/shopping/GoodsList'
import Cart from '@/components/app/shopping/Cart'
import Address from '@/components/app/shopping/Address'
import NewAddress from '@/components/app/shopping/NewAddress'
import OrderConfirm from '@/components/app/shopping/OrderConfirm'
import OrderSuccess from '@/components/app/shopping/OrderSuccess'
import ScrollTab from '@/components/app/scrollTab/scrollTab'

import SuppliesHome from '@/components/app/supplies/SuppliesHome'
import Supplies from '@/components/app/supplies/Supplies'
import SuppliesClassify from '@/components/app/supplies/SuppliesClassify'
import SuppliesConfirm from '@/components/app/supplies/SuppliesConfirm'
import SuppliesDetailList from '@/components/app/supplies/SuppliesDetailList'

import Questionnaire from '@/components/app/questionnaire/Questionnaire'
import QuestionnairePerson from '@/components/app/questionnaire/QuestionnairePerson'
import QuestionnaireResultHome from '@/components/app/questionnaire/QuestionnaireResultHome'
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
import AddInformation from '@/components/information/AddInformation'

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
// const goodsRoute = { path: '/goodsList', component: GoodsList, name: 'GoodsList' }
// const redirectRoute = { path: '/', redirect: 'home/0/work' }
const redirectRoute = { path: '/', redirect: 'login' }

// 办公用品
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
    { path: 'questionnairePerson', name: 'questionnairePerson', component: QuestionnairePerson },
    { path: 'questionnaireResultHome', name: 'questionnaireResultHome', component: QuestionnaireResultHome },
    { path: 'questionnaireDetails', name: 'questionnaireDetails', component: QuestionnaireDetails },
    { path: 'questionnaireResult', name: 'questionnaireResult', component: QuestionnaireResult }
  ]
}

// 优惠商店
const shoppingRoute = {
  path: 'shopping',
  component: Shopping,
  name: 'Shopping',
  children: [
    { path: 'goodsList', name: 'GoodsList', component: GoodsList }, // 商品页
    { path: 'cart', name: 'Cart', component: Cart }, // 购物车页面
    { path: 'orderConfirm', name: 'OrderConfirm', component: OrderConfirm }, // 订单确认页
    { path: 'orderSuccess', name: 'OrderSuccess', component: OrderSuccess }, // 订单成功页
    {path: 'address', name: 'Address', component: Address}, // 地址页
    {path: 'newAddress', name: 'NewAddress', component: NewAddress} // 新增地址
  ]
}

// 日常工作
const workRoute = { path: 'work', name: 'work', component: Work, children: [] }

workRoute.children = [].concat(questionnaireRoute, suppliesRoute, shoppingRoute)

// 通讯录
const phonebookRoute = { path: 'phonebook', name: 'Phonebook', component: Phonebook }

// 同事圈
const informaRoute = {
  path: 'information',
  name: 'Information',
  component: Information,
  children: [
    { path: 'informationDetails', name: 'InformationDetails', component: InformationDetails },
    { path: 'addInformation', name: 'AddInformation', component: AddInformation }
  ]
}

// 个人页
const personalRoute = { path: 'personal', name: 'Personal', component: Personal }

// 可滑动的头
const scrollTabRoute = { path: '/scrollTab', name: 'ScrollTab', component: ScrollTab }

// 组装移动办公APP路由
homeRoute.children = [].concat(workRoute, phonebookRoute, informaRoute, personalRoute)

const routes = [].concat(redirectRoute, loginRoute, homeRoute, scrollTabRoute, test)

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
