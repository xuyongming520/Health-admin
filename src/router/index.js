import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   name: 'Dashboard',
  //   hidden: true,
  //   children: [{
  //     path: 'dashboard',
  //     component: () => import('@/views/dashboard/index')
  //   }]
  // },
  {
    path: '/userManage',
    component: Layout,
    redirect: '/userManage/index',
    meta: { title: '用户管理', icon: 'user' },
    children: [
      {
        path: 'index',
        name: 'Users',
        component: () => import('@/views/userManage/index'),
        meta: { title: '用户管理', icon: 'user' }
      },
      // {
      //   path: 'create',
      //   name: 'CreateUser',
      //   component: () => import('@/views/userManage/create'),
      //   meta: { title: '添加用户', icon: 'edit' }
      // },
      {
        path: 'update/:id',
        name: 'UpdateUser',
        hidden: true,
        component: () => import('@/views/userManage/update'),
        meta: { title: '修改用户信息' }
      }
    ]
  },
  // {
  //   path: '/userClassManage',
  //   component: Layout,
  //   redirect: '/userClassManage/index',
  //   meta: { title: '用户权限管理', icon: 'user' },
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'UserClasses',
  //       component: () => import('@/views/userClassManage/index'),
  //       meta: { title: '用户分类', icon: 'user' }
  //     },
  //     {
  //       path: 'create',
  //       name: 'CreateUserClass',
  //       component: () => import('@/views/userClassManage/create'),
  //       meta: { title: '添加用户分类', icon: 'edit' }
  //     },
  //     {
  //       path: 'update/:id',
  //       name: 'UpdateUserClass',
  //       hidden: true,
  //       component: () => import('@/views/userClassManage/update'),
  //       meta: { title: '修改用户分类' }
  //     }
  //   ]
  // },
  {
    path: '/productClassManage',
    component: Layout,
    redirect: '/productClassManage/index',
    meta: { title: '商品类别管理', icon: 'case' },
    children: [
      {
        path: 'index',
        name: 'ProductClasses',
        component: () => import('@/views/productClassManage/index'),
        meta: { title: '商品类别', icon: 'case' }
      },
      {
        path: 'create',
        name: 'CreateProductClass',
        component: () => import('@/views/productClassManage/create'),
        meta: { title: '添加商品类别', icon: 'edit' }
      },
      {
        path: 'update/:id',
        name: 'UpdateProductClass',
        hidden: true,
        component: () => import('@/views/productClassManage/update'),
        meta: { title: '修改商品类别' }
      }
    ]
  },
  {
    path: '/productManage',
    component: Layout,
    redirect: '/productManage/index',
    meta: { title: '商品管理', icon: 'case' },
    children: [
      {
        path: 'index',
        name: 'Products',
        component: () => import('@/views/productManage/index'),
        meta: { title: '全部商品', icon: 'case' }
      },
      {
        path: 'create',
        name: 'CreateProduct',
        component: () => import('@/views/productManage/create'),
        meta: { title: '添加商品', icon: 'edit' }
      },
      {
        path: 'update/:id',
        name: 'UpdateProduct',
        hidden: true,
        component: () => import('@/views/productManage/update'),
        meta: { title: '修改商品信息' }
      }
    ]
  },
  // {
  //   path: '/bookInfoManage',
  //   component: Layout,
  //   redirect: '/bookInfoManage/index',
  //   meta: { title: '图书信息管理', icon: 'case' },
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'BookInfos',
  //       component: () => import('@/views/bookInfoManage/index'),
  //       meta: { title: '图书信息', icon: 'case' }
  //     },
  //     {
  //       path: 'create',
  //       name: 'CreateBookInfo',
  //       component: () => import('@/views/bookInfoManage/create'),
  //       meta: { title: '添加图书信息', icon: 'edit' }
  //     },
  //     {
  //       path: 'update/:id',
  //       name: 'UpdateBookInfo',
  //       hidden: true,
  //       component: () => import('@/views/bookInfoManage/update'),
  //       meta: { title: '修改图书详情' }
  //     }
  //   ]
  // },

  {
    path: '/orderManage',
    component: Layout,
    redirect: '/orderManage/index',
    meta: { title: '订单管理', icon: 'products' },
    children: [
      {
        path: 'index',
        name: 'Orders',
        component: () => import('@/views/orderManage/index'),
        meta: { title: '订单管理', icon: 'products' }
      },
      {
        path: 'detail/:id',
        name: 'OrdersDetail',
        hidden: true,
        component: () => import('@/views/orderManage/detail'),
        meta: { title: '订单详情' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

