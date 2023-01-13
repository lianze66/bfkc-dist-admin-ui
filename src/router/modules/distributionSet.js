

import Layout from '@/layout'

const distributionRouter = {
  path: '/distributionSet',
  component: Layout,
  redirect: '/distributionSet/index',
  name: 'DistributionSet',
  meta: {
    title: '分销管理',
    icon: 'clipboard'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/distributionSet/index'),
      name: 'distributionSet',
      meta: { title: '分销配置', icon: '' }
    },
    {
      path: 'team',
      component: () => import('@/views/distributionSet/team'),
      name: 'team',
      meta: { title: '团队管理', icon: '' }
    },
    {
      path: 'withdrawCash',
      component: () => import('@/views/distributionSet/withdrawCash'),
      name: 'withdrawCash',
      meta: { title: '提现明细', icon: '' }
    },
    {
      path: 'commission',
      component: () => import('@/views/distributionSet/commission'),
      name: 'commission',
      meta: { title: '佣金明细', icon: '' }
    },
    {
      path: 'distributionRecord',
      component: () => import('@/views/distributionSet/distributionRecord'),
      name: 'distributionRecord',
      meta: { title: '分销记录', icon: '' }
    },
  ]
}

export default distributionRouter
