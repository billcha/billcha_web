// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '@babel/polyfill'
import 'es6-promise/auto'

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import plugin from './plugin'
import VueClipboard from 'vue-clipboard2'
import AirbnbStyleDatepicker from 'vue-airbnb-style-datepicker/dist/vue-airbnb-style-datepicker.min.js'
import 'vue-airbnb-style-datepicker/dist/vue-airbnb-style-datepicker.min.css'
import 'components/common/common-loading-panel.vue'
import vueShortkey from 'vue-shortkey'
import VueLocalStorage from 'vue-localstorage'
import VueGeolocation from 'vue-browser-geolocation'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueCookies from 'vue-cookies'
import Meta from 'vue-meta'
import 'swiper/dist/css/swiper.css'

// see docs for available options
const datepickerOptions = {
  dateLabelFormat: 'YYYY M, YYYY M, YYYY M',
  days: ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'],
  daysShort: ['월', '화', '수', '목', '금', '토', '일'],
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월'
  ],
  colors: {
    selected: '#060c2c',
    inRange: '#ccd1e7',
    selectedText: '#fff',
    text: '#4f546c',
    inRangeBorder: '#ccd1e7',
    disabled: '#fff',
    hoveredInRange: '#ccd1e7'
  }
}

Vue.config.productionTip = false
const i18n = plugin.i18n

window.axios = plugin.axios
// make sure we can use it in our components
Vue.use(AirbnbStyleDatepicker, datepickerOptions)
// Vue.use(LyTab)
Vue.use(VueClipboard)
// Tell Vue to use the plugin
Vue.use(vueShortkey)
Vue.use(VueLocalStorage)
Vue.use(VueGeolocation)
Vue.use(VueAwesomeSwiper /* { default global options } */)
Vue.use(VueCookies)
Vue.use(Meta)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  i18n,
  template: '<App/>'
})
