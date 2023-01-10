import Layout from '@/layout'

const customer = {
  path: '/customer',
  component: Layout,
  redirect: '/customer/index',
  name: 'customer',
  meta: {
    title: '客户管理',
    icon: 'clipboard'
  },
  children: [
    {
      path: 'supplier',
      name: 'supplier',
      component: () => import('@/views/customer/supplier/index'),
      meta: {
        title: '我的供应商',
        icon: 'clipboard'
      }
    },
    {
      path: 'myAgenter',
      name: 'myAgenter',
      component: () => import('@/views/customer/myAgenter/index'),
      meta: {
        title: '我的代理商',
        icon: 'clipboard'
      }
    },
    {
      path: 'myDistributioner',
      name: 'myDistributioner',
      component: () => import('@/views/customer/myDistributioner/index'),
      meta: {
        title: '我的经销商',
        icon: 'clipboard'
      }
    },
    {
      path: 'cooperativeShop',
      name: 'cooperativeShop',
      component: () => import('@/views/customer/cooperativeShop/index'),
      meta: {
        title: '我的合作店铺',
        icon: 'clipboard'
      }
    },
    {
      path: 'commodity/:tableId',
      name: 'commodity',
      component: () => import('@/views/customer/supplierCommodity/index'),
      meta: {
        title: '供应商商品',
        icon: 'clipboard'
      }
    },
    {
      path: 'shopAddFrom/:id',
      name: 'shopAddFrom',
      component: () => import('@/views/customer/supplierCommodity/shopAddFrom'),
      meta: {
        title: '编辑商品',
        icon: 'clipboard'
      }
    },
    {
      path: 'client',
      name: 'client',
      component: () => import('@/views/customer/client/index'),
      meta: {
        title: '我的客户',
        icon: 'clipboard'
      }
    },
  ]
}

export default customer
