import Vue from 'vue'
// import VueMoment from 'vue-moment'
// import moment from 'moment'
// import 'moment/locale/ko'

// Vue.use(VueMoment)
var moment = window.moment
Vue.use(require('vue-moment'), {
  moment
})

export default {}
