import Layout from '@/module-dashboard/pages/layout'
const _import = require('@/router/import_' + process.env.NODE_ENV)

export default [
  {
    root: true,
    path: '/departments',//父路径
    component: Layout,
    redirect: 'noredirect',
    name: 'departments',
    meta: {
      title: '组织架构管理',
      icon: 'architecture'
    },
    children: [
      {
        path: 'index',  //请求地址   -- /saas-cliens/index
        component: _import('departments/pages/index'), //跳转的vue视图
        name: 'organizations-index',
        meta: {title: '组织架构', icon: 'architecture', noCache: true}
      }
    ]
  }
]