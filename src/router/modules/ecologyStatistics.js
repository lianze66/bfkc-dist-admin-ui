import Layout from '@/layout'

const distributionRouter = {
  path: '/ecologyStatistics',
  component: Layout,
  redirect: '/ecologyStatistics/index',
  name: 'EcologyStatistics',
  meta: {
    title: '生态圈统计',
    icon: 'clipboard'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/ecologyStatistics/index'),
      name: 'ecologyStatisticsIndex',
      meta: { title: '生态圈统计', icon: '' }
    },
  ]
}

export default distributionRouter
