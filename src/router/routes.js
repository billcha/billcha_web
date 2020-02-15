const routes = [
  {
    path: '/',
    component: () => import('@/layouts/root-layout.vue'),
    children: [
      {
        path: '',
        component: () => import('@/layouts/home/home-layout.vue'),
        children: [
          {
            path: '/',
            component: () => import('@/pages/home/home-page.vue'),
            name: 'home',
            alias: 'home'
          }
        ]
      },
      {
        path: 'billboardList',
        component: () => import('@/layouts/billboard-list/billboard-list-layout.vue'),
        children: [
          {
            path: '/',
            component: () => import('@/pages/billboard-list/billboard-list-page.vue'),
            name: 'billboardList',
            alias: 'billboardList'
          }
        ]
      },
      {
        path: 'billboard',
        component: () => import('@/layouts/billboard-detail/billboard-detail-layout.vue'),
        children: [
          {
            path: '/detail',
            component: () => import('@/pages/billboard-detail/billboard-detail-page.vue'),
            name: 'detail',
            alias: 'detail'
          },
          {
            path: '/payments',
            component: () => import('@/pages/billboard-detail/billboard-detail-payment.vue'),
            name: 'payments',
            alias: 'payments'
          }
        ]
      },
      {
        path: 'payment',
        component: () => import('@/layouts/payment/payment-layout.vue'),
        children: [
          {
            path: 'complete',
            component: () => import('@/pages/payment/payment-complete-page.vue'),
            name: 'paymentComplete',
            alias: 'paymentComplete'
          }
        ]
      },
      {
        path: 'reset/:token',
        component: () => import('@/layouts/reset/reset-layout.vue'),
        children: [
          {
            path: '/',
            component: () => import('@/pages/reset/reset-password-page.vue'),
            name: 'reset',
            alias: 'reset'
          }
        ]
      },
      {
        path: 'history',
        component: () => import('@/layouts/history/history-layout.vue'),
        children: [
          {
            path: '/',
            component: () => import('@/pages/history/history-page.vue'),
            name: 'history',
            alias: 'history'
          }
        ]
      },
      {
        path: 'favoriteBillboards',
        component: () => import('@/layouts/favorite-billboards/favorite-billboards-layout.vue'),
        children: [
          {
            path: '/',
            component: () => import('@/pages/favorite-billboards/favorite-billboards-page.vue'),
            name: 'favoriteBillboards',
            alias: 'favoriteBillboards'
          }
        ]
      },
      {
        path: 'billboardRegister',
        component: () => import('@/layouts/billboard-register/billboard-register-layout.vue'),
        children: [
          {
            path: '/',
            component: () => import('@/pages/billboard-register/billboard-register-page.vue'),
            name: 'billboardRegister',
            alias: 'billboardRegister'
          }
        ]
      },
      {
        path: 'confirm_email',
        component: () => import('@/layouts/confirm-email/confirm-email-layout.vue'),
        children: [
          {
            path: '/',
            component: () => import('@/pages/confirm-email/confirm-email-page.vue'),
            name: 'confirm_email',
            alias: 'confirm_email'
          }
        ]
      },
      {
        path: '/404',
        component: () => import('@/layouts/error/error-layout.vue'),
        children: [
          {
            path: '/',
            component: () => import('@/pages/error/error-page.vue'),
            name: '404',
            alias: '404'
          }
        ]
      }
    ]
  },
  { path: '*', redirect: '/404' }
]

// // Always leave this as last one
// if (process.env.MODE !== 'ssr') {
//   routes.push({
//     path: '*',
//     component: () => import('pages/Error404.vue')
//   })
// }
export default routes
