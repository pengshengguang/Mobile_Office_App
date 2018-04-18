/**
 * Create by pengshengguang on 2018/04/18
 */
// 配置日常工作中的路由信息（注：除了组件名首字母大写，其他都是按驼峰命名）

import Hah from '@/components/app/supplise/haha'

const appRouters = [
  // 办公用品
  {
    path: '/hah',
    component: Hah
  }
]

export default {
  appRouters: appRouters
}
