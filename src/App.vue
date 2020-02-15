<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Vue from 'vue'
import util from './components/util/util.js'
// import { ValidationProvider, localize } from 'vee-validate'
// import ko from 'vee-validate/dist/locale/ko.js'
export default {
  name: 'App',
  created () {
    // this.$moment.locale('ko')
    // this.setV3Validator()
    this.setValidator()
    this.setAxios()
    this.setFilters()
    // this.setMobileHeight()
  },
  beforeMount () {
  },
  mounted () {
  },
  methods: {
    setFilters () {
      let priceUnit = this.$i18n.t('common.price_unit')
      Vue.filter('numberComma', function (value) {
        return util.numberComma(value, priceUnit)
      })
      Vue.filter('centerDot', function (value) {
        if (!value) return ''
        var str = String(value)
        return '· ' + str
      })
    },
    // setV3Validator () {
    //   Vue.component('ValidationProvider', ValidationProvider)
    //   // Install and Activate the Arabic locale.
    //   localize({
    //     ko
    //   })
    // },
    setValidator () {
      const name = {
        getMessage: field => `영문,한글을 30자 이내로 입력하세요`,
        validate: value => {
          return /^[가-힣a-zA-Z]{1,30}$/.test(value)
        }
      }
      this.$validator.extend('name', name)

      const onlyNumber = {
        getMessage: field => `숫자만 입력해주세요.`,
        validate: value => {
          return /^[0-9]+$/.test(value)
        }
      }
      this.$validator.extend('onlyNumber', onlyNumber)

      const phoneNumber = {
        getMessage: field => `올바르지 않은 전화번호입니다`,
        validate: value => {
          return /^\d{3}\d{3,4}\d{4}$/.test(value)
        }
      }
      this.$validator.extend('phoneNumber', phoneNumber)

      const password = {
        getMessage: field => `숫자,문자 포함 8~16자리 암호를 입력하세요`,
        validate: value => {
          return /^(?=(.*[a-zA-Z].*){1,})(?=(.*[0-9].*){1,}).*$/.test(value) && (value.length >= 8 && value.length <= 16)
        }
      }
      this.$validator.extend('password', password)

      const currentPassword = {
        getMessage: field => `숫자,문자 포함 8~16자리 암호를 입력하세요`,
        validate: value => {
          return /^(?=(.*[a-zA-Z].*){1,})(?=(.*[0-9].*){1,}).*$/.test(value) && (value.length >= 8 && value.length <= 16)
        }
      }
      this.$validator.extend('currentPassword', currentPassword)
    },
    // setMobileHeight () {
    //   // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    //   let vh = window.innerHeight * 0.01
    //   // Then we set the value in the --vh custom property to the root of the document
    //   document.documentElement.style.setProperty('--vh', `${vh}px`)
    // },
    setAxios () {
      const DEFAULT_ACCEPT_TYPE = 'application/json'
      let axios = window.axios
      let self = this
      let message = ''

      axios.defaults.headers.Accept = DEFAULT_ACCEPT_TYPE
      axios.defaults.headers['Content-Type'] = DEFAULT_ACCEPT_TYPE

      axios.interceptors.response.use(null, function (error) {
        if (String(error.response.status)[0] === '4' || String(error.response.data.status_code)[0] === '4') {
          if (error.response.data.status_code === 400) {
            message = self.$i18n.t('error.400')
          } else if (error.response.data.status_code === 401) {
            message = self.$i18n.t('error.401')
            self.$store.commit('resetUserinfo')
          } else if (error.response.data.status_code === 403) {
            message = self.$i18n.t('error.403')
          } else if (error.response.data.status_code === 404) {
            message = self.$i18n.t('error.404')
          } else {
            message = error
          }
          self.$store.commit('openGlobalAlert', { open: true, error: message })
        }
        return Promise.reject(error)
      })

      Vue.prototype.$axios = axios
    }
  }
}
</script>
<style lang="scss">
@import '~css/override.scss';

</style>
<style lang="stylus">
@import '~css/app.styl'
#app
  min-height 100%
  position relative
</style>
