import Layout from '@/layout'

const distributionRouter = {
  path: '/commodityStatistics',
  component: Layout,
  redirect: '/commodityStatistics/index',
  name: 'commodityStatistics',
  meta: {
    title: '商品数据统计',
    icon: 'clipboard'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/commodityStatistics/index'),
      name: 'commodityStatisticsIndex',
      meta: { title: '商品数据统计', icon: '' }
    },
  ]
}

export default distributionRouter
