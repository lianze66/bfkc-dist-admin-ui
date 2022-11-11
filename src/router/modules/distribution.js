

import Layout from '@/layout'

const distributionRouter = {
  path: '/distribution',
  component: Layout,
  redirect: '/distribution/index',
  name: 'Distribution',
  meta: {
    title: '分销',
    icon: 'clipboard'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/distribution/index'),
      name: 'distributionIndex',
      meta: { title: '分销员管理', icon: '' }
    },
    {
      path: 'distributionconfig',
      component: () => import('@/views/distribution/config/index'),
      name: 'distributionConfig',
      meta: { title: '分销配置', icon: '' }
    },
    {
      path: 'disGrade',
      component: () => import('@/views/distribution/disGrade/index'),
      name: 'disGrade',
      meta: { title: '分销商级别', icon: '' }
    },
    {
      path: 'newDisSetting',
      component: () => import('@/views/distribution/newDisSetting/index'),
      name: 'newDisSetting',
      meta: { title: '分销配置', icon: '' }
    },
    {
      path: 'agentGrade',
      component: () => import('@/views/distribution/agentGrade/index'),
      name: 'agentGrade',
      meta: { title: '代理商级别', icon: '' }
    },
  ]
}

export default distributionRouter
