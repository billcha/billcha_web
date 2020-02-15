<template>
  <div class="reset-password-page-wrapper">
    <div class="header-box"></div>
    <div class="title">비밀번호 재설정</div>
    <div class="desc">새로운 비밀번호를 입력해주세요.</div>
    <div class="form">
      <div class="input-box">
        <span class="sub-title is-5">새 비밀번호</span>
        <div class="sub-value">
          <input v-validate="'required|password'" :class="{'input': true, 'is-danger': errors.has('password') }"
            v-model="newPassword" name="password" type="password" placeholder="비밀번호 입력" ref="password">
          <div v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</div>
        </div>
      </div>
      <div class="input-box">
        <span class="sub-title is-5">새 비밀번호 확인</span>
        <div class="sub-value">
          <input v-validate="'required|confirmed:password'" name="password_confirmation" type="password"
            v-model="reNewPassword" class="input" :class="{'is-danger': errors.has('password_confirmation')}" placeholder="비밀번호 확인" data-vv-as="password">
          <div v-show="errors.has('password_confirmation')" class="help is-danger">{{ errors.first('password_confirmation') }}</div>
        </div>
      </div>
    </div>
    <button class="btn-set-pasword" @click="requestChangeNewPassword">비밀번호 재설정</button>
  </div>
</template>

<script>

export default {
  name: 'reset-password-page',
  components: {
  },
  data () {
    return {
      newPassword: '',
      reNewPassword: '',
      csrfToken: '',
      token: ''
    }
  },
  computed: {
  },
  beforeMount () {
  },
  mounted () {
    this.$store.commit('setFooterShow', false)
  },
  methods: {
    routerMove (path) {
      this.$router.push(path)
    },
    requestChangeNewPassword () {
      let self = this
      self.$store.commit('setRootLoading', true)
      this.$axios.get('/api/v1/auth/register').then((respCsrfToken) => {
        self.$axios.post('/api/v1/auth/reset_password', {
          'new_password': this.newPassword,
          'csrf_token': respCsrfToken.data.csrf_token,
          'token': window.location.pathname.substring(7)
        }).then(function (respToken) {
          self.$router.push('/')
        }).catch(function (error) {
          console.log(error)
        }).then(() => {
          self.$store.commit('setRootLoading', false)
        })
      }).catch((error) => {
        if (error) {
          self.$store.commit('setRootLoading', false)
        }
      }).then(() => {
      })
    }
  },
  beforeRouteLeave (to, from, next) {
    next()
    // 이 컴포넌트를 렌더링하는 라우트가 이전으로 네비게이션 될 때 호출됩니다.
    // `this` 컴포넌트 인스턴스에 접근 할 수 있습니다.
  }
}
</script>
<style lang="stylus">
.reset-password-page-wrapper
  width 600px
  .title
    height 47px
    line-height 47px
    text-align center
    color #080f31
    font-size 32px
    font-weight 500
  .desc
    font-size 18px
    font-weight 300
    text-align center
    height 27px
    line-height 27px
    margin-bottom 97px
  .sub-title
    font-size: 16px
  .btn-set-pasword
    width 100%
    height: 70px
    border-radius: 4px
    background-color: #080f31
    font-size: 20px
    font-weight: 500
    color #ffffff
</style>
