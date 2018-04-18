import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '@/views/GoodsList'
import Cart from '@/views/Cart'
import ScrollTab from '@/components/scrollTab'
import questionnaire from '@/components/questionnaire/Questionnaire'
import questionnaireDetails from '@/components/questionnaire/QuestionnaireDetails'
import questionnaireResult from '@/components/questionnaire/QuestionnaireResult'
import Address from '@/views/Address'
import OrderConfirm from '@/views/OrderConfirm'
import OrderSuccess from '@/views/OrderSuccess'

import appRouters from './appRouters'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'GoodsList',
      component: GoodsList
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/address',
      name: 'Address',
      component: Address
    },
    {
      path: '/orderConfirm',
      name: 'OrderConfirm',
      component: OrderConfirm
    },
    {
      path: '/orderSuccess',
      name: 'OrderSuccess',
      component: OrderSuccess
    },
    {
      path: '/scrollTab',
      name: 'ScrollTab',
      component: ScrollTab
    },
    {
      path: '/questionnaire',
      name: 'questionnaire',
      component: questionnaire,
      children: [
        {
          path: 'questionnaireDetails',
          name: 'questionnaireDetails',
          component: questionnaireDetails
        },
        {
          path: 'questionnaireResult',
          name: 'questionnaireResult',
          component: questionnaireResult
        }
      ]
    },
    // 主页功能路由入口
    appRouters.appRouters
  ]
})
