import Vue from 'vue'
import Vuex from 'vuex'

import rootConfig from './root'
// import sign from './sign'

Vue.use(Vuex)

const Store = new Vuex.Store({
  ...rootConfig,
  modules: {
    // sign
  }
})
/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  return Store
}
