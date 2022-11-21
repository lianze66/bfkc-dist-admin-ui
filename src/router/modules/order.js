

import Layout from '@/layout'

const orderRouter = {
  path: '/order',
  component: Layout,
  redirect: '/order/index',
  name: 'Order',
  alwaysShow: true,
  meta: {
    title: '订单',
    icon: 'clipboard'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/order/index'),
      name: 'OrderIndex',
      meta: { title: '订单' }
    },
    {
      path: 'paying',
      component: () => import('@/views/order/paying/index'),
      name: 'paying',
      meta: { title: '一件代发' }
    },
    {
      path: 'myOrder',
      component: () => import('@/views/order/myOrder/index'),
      name: 'myOrder',
      meta: { title: '我的订单' }
    }
  ]
}

export default orderRouter
