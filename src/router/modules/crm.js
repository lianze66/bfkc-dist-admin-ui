import Layout from '@/layout'

const crm = {
  path: '/crm',
  component: Layout,
  redirect: '/crm/index',
  name: 'crm',
  meta: {
    title: '邀请管理',
    icon: 'clipboard'
  },
  children: [
    {
      path: 'inviter',
      name: 'inviter',
      component: () => import('@/views/crm/inviter/index'),
      meta: {
        title: '邀请记录',
        icon: 'clipboard'
      }
    },
    {
      path: 'inviteUser',
      name: 'inviteUser',
      component: () => import('@/views/crm/inviteUser/index'),
      meta: {
        title: '邀请用户',
        icon: 'clipboard'
      }
    },
  ]
}

export default crm
