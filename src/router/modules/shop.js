import Layout from '@/layout'

const shop = {
  path: '/shop',
  component: Layout,
  redirect: '/shop/index',
  name: 'shop',
  meta: {
    title: '店铺管理',
    icon: 'clipboard'
  },
  children: [
    {
      path: 'openStore',
      name: 'openStore',
      component: () => import('@/views/shop/openStore'),
      meta: {
        title: '店铺信息',
        icon: 'clipboard'
      }
    },
    {
      path: 'store',
      name: 'store',
      component: () => import('@/views/shop/index'),
      meta: {
        title: '店铺管理',
        icon: 'clipboard'
      }
    },
  ]
}

export default shop
