<template>
  <div class="confirm-email-page-wrapper" v-common-loading-panel="loading">
  </div>
</template>

<script>

export default {
  name: 'confirm-email-page',
  components: {
  },
  data () {
    return {
      loading: true,
      confirmationToken: null
    }
  },
  computed: {
  },
  beforeMount () {
    this.$store.commit('setFooterShow', false)
  },
  mounted () {
    this.confirmationToken = this.$route.query.confirmation_token
    if (this.confirmationToken) {
      this.requestLogin()
    }
  },
  methods: {
    routerMove (path) {
      this.$router.push(path)
    },
    requestLogin () {
      let self = this
      this.$store.commit('setRootLoading', true)
      this.$axios.post('/api/v1/auth/confirm_email', {
        'confirmation_token': self.confirmationToken
      }).then(function (respToken) {
        console.log(respToken)
        if (respToken.data.status_code === 400) {
          alert('이미 가입된 회원입니다.')
        } else {
          self.$store.commit('setAccessToken', respToken.data.access_token)
          self.$store.dispatch('validityCheckToken')
        }
      }).catch(function () {
      }).then(() => {
        self.$router.push('/')
        self.$store.commit('setRootLoading', false)
      })
    }
  },
  beforeRouteLeave (to, from, next) {
    next()
  }
}
</script>
<style lang="stylus">
</style>
