import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '@/views/GoodsList'
import Cart from '@/views/Cart'
import ScrollTab from '@/components/scrollTab'
import questionnaire from '@/components/questionnaire/Questionnaire'
import questionnaireDetails from '@/components/questionnaire/QuestionnaireDetails'
import questionnaireResult from '@/components/questionnaire/QuestionnaireResult'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'GoodsList',
      component: GoodsList
    },
    {
      path: '/Cart',
      name: 'Cart',
      component: Cart
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
    }
  ]
})
