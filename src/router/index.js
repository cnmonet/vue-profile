import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden    : true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name    : 'router-name'             the name is used by <keep-alive> (must set!!!)
* meta    : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon : 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path     : '/',
    component: Layout,
    redirect : '/dashboard',
    name     : '账户主页',
    hidden   : true,
    children : [{
      path     : 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path     : '/member',
    component: Layout,
    redirect : '/member/refer',
    name     : '个人中心',
    meta     : { title: '个人中心', icon: 'icon-wode' },
    children : [
      {
        path     : 'refer',
        name     : '推荐成员',
        component: () => import('@/views/member/refer'),
        meta     : { title: '推荐成员', icon: 'icon-mine' }
      },
      {
        path     : 'profile',
        name     : '个人资料',
        component: () => import('@/views/member/profile'),
        meta     : { title: '个人资料', icon: 'icon-businesscard' }
      },
      {
        path     : 'tree',
        name     : '帐号关联',
        component: () => import('@/views/tree/index'),
        meta     : { title: '帐号关联', icon: 'icon-addressbook' }
      },
      {
        path     : 'message',
        name     : '我的消息',
        component: () => import('@/views/member/message'),
        meta     : { title: '我的消息', icon: 'icon-xiaoxizhongxin' }
      },
      {
        path     : 'friend',
        name     : '我的好友',
        component: () => import('@/views/member/friend'),
        meta     : { title: '我的好友', icon: 'icon-haoyou' }
      },
      {
        path     : 'money',
        name     : '资金管理',
        component: () => import('@/views/member/money'),
        meta     : { title: '资金管理', icon: 'icon-daifukuan' }
      },
      {
        path     : 'favorite',
        name     : '我的收藏',
        component: () => import('@/views/member/favorite'),
        meta     : { title: '我的收藏', icon: 'icon-accessory' }
      }
    ]
  },

  

  {
    path     : '/buyer',
    component: Layout,
    redirect : '/buyer/order',
    name     : '买家中心',
    meta     : {title: '买家中心',icon : 'icon-mairu'},
    children : [
      {
        path     : 'order',
        component: () => import('@/views/buyer/order'),         // Parent router-view
        name     : 'order',
        meta     : { title: '我的订单', icon: 'icon-wodedingdan' }
          
      },
      {
        path     : 'question',
        name     : 'question',
        component: () => import('@/views/buyer/question'),
        meta     : { title: '我的咨询', icon: 'icon-xiaoxizhongxin' }
      },
      {
        path     : 'address',
        name     : 'address',
        component: () => import('@/views/buyer/address'),
        meta     : { title: '我的地址', icon: 'icon-daishouhuo' }
      },
      {
        path     : 'coupon',
        name     : 'coupon',
        component: () => import('@/views/buyer/coupon'),
        meta     : { title: '优惠卷', icon: 'icon-wodeyouhuiquan' }
      },
      {
        path     : 'evaluation',
        name     : 'evaluation',
        component: () => import('@/views/buyer/evaluation'),
        meta     : { title: '评价管理', icon: 'icon-pingjia' }
      },
      {
        path     : 'refund',
        name     : 'refund',
        component: () => import('@/views/buyer/refund'),
        meta     : { title: '退款请求', icon: 'icon-icontkcg' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes        : constantRouterMap
})

