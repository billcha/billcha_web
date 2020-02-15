import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router)

var router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  mode: 'history',
  routes: routes
})

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0)
  router.app.$options.store().commit('setRootLoading', true)
  router.app.$options.store().commit('setMenuActive', to.name)
  next()
})

router.beforeResolve((to, from, next) => {
  next()
})

router.afterEach((to, from) => {
  if (from.name === 'billboardList' || from.name === 'billboardRegister' || from.name === 'confirm_email' || from.name === '404' || from.name === 'reset') router.app.$options.store().commit('setFooterShow', true)
  // router.app.$options.store().commit('setMenuActive', to.name)
  router.app.$options.store().commit('setRootLoading', false)
  // console.log('to', to)
  // console.log('from', from)
})

export default router
