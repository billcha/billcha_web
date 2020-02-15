<template>
<div>
  <sweet-modal
  class="modal-login"
  ref="modalLogin"
  :enable-mobile-fullscreen="true"
  :hide-close-button="false"
  :title="'로그인'"
  :blocking="true"
  @open="onOpenLoginModal"
  >
    <!-- <div slot="box-action"><div>test header</div></div> -->
    <div slot="loading" v-common-loading-panel="modal.loading.authLoginLoadingShow"></div>
    <div class="footer-btn-box" slot="button">
      <button class="login-btn button primary" v-shortkey="{enter: ['enter']}" @shortkey="theAction" @click="clickLoginBtn">로그인</button>
    </div>
    <div class="modal-login-wrapper">
      <div class="form cols">
        <div class="input-box id col-12">
          <!-- <input class="full-width" placeholder="아이디" v-model="user.id"/> -->
          <span class="sub-title">이메일</span>
          <div class="sub-value">
            <input v-validate="'required|email'" :class="{'input': true, 'is-danger': errors.has('email') }"
              :data-vv-as="'이메일'" v-model.trim="user.email" name="email" type="text" placeholder="이메일 입력" @input="onInput">
            <div v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</div>
          </div>
        </div>
        <div class="input-box password col-12">
          <span class="sub-title">비밀번호</span>
          <div class="sub-value">
            <input v-validate="'required|password'" :class="{'input': true, 'is-danger': errors.has('password') }" @keyup="checkCapsLock"
              :data-vv-as="'비밀번호'" v-model="user.password" name="password" type="password" placeholder="비밀번호 입력" ref="password" @input="onInput">
            <div v-show="errors.has('password') && !localError.apiError" class="help is-danger">{{ errors.first('password') }}</div>
            <div v-show="localError.apiError" class="help is-danger">{{ errorFilter() }}</div>
            <div v-show="localError.capslock" class="help is-danger">CapsLock 키가 눌려있습니다.</div>
          </div>
        </div>
        <div class="options-box col-7" v-if="!getIsMobile">
          <span class="desc-label"></span> <span class="underline-label" @click="showJoinModal">회원가입</span>
          <span class="password-forgot underline-label" @click="openModalFindPassword">비밀번호 찾기</span>
        </div>
        <div class="" :class="[getIsMobile ? 'col-12' : 'col-5']">
          <common-checkbox class="fr" :index="0" :text="'아이디 저장'" :check="saveIdCheckStatus" @onChange="saveIdCheck"></common-checkbox>
        </div>
        <div class="options-box col-12" v-if="getIsMobile">
          <span class="desc-label"></span> <span class="underline-label" @click="showJoinModal">회원가입</span>
          <span class="password-forgot underline-label" @click="openModalFindPassword">비밀번호 찾기</span>
        </div>
        <div class="col-12 add-billboard-box">
          <div class="add-billboard-inner">
            <span class="desc-label">매체사이신가요?</span> <a class="add-btn" @click="onClickAddBillboard">광고판 등록하기</a>
          </div>
        </div>
      </div>
    </div>
  </sweet-modal>

  <sweet-modal
  class="modal-auth-email"
  ref="modalAuthEmail"
  :enable-mobile-fullscreen="false"
  :hide-close-button="false"
  :title="modalInfo.title"
  :blocking="true"
  :width="moblieModalWidth"
  >
    <div slot="loading" v-common-loading-panel="modal.loading.authEmailLoadingShow">
    <!-- <div slot="loading">
      <common-loading :active="modal.loading.authEmailLoadingShow"></common-loading> -->
    </div>
    <div class="footer-btn-box" slot="button">
      <div class="cols">
        <div class="col-12 join-button button primary" :disabled="$validator.errors.any()" @click="clickFooterBtnEmailAuthModal">{{ modalInfo.btnText }}</div>
      </div>
    </div>

    <div class="password-find-wrapper form cols" v-if="stepPasswordFind">
      <div class="title col-12" v-html="modalInfo.content">
      </div>
      <div class="email-box input-box col-12">
        <span class="sub-title">이메일</span>
        <div class="sub-value">
          <input v-validate="'required|email'" :class="{'input': true, 'is-danger': errors.has('email') }"
            :data-vv-as="'이메일'" v-model.trim="findPassword.email" name="email" type="text" placeholder="이메일 주소" @input="onInput">
          <div v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</div>
        </div>
      </div>
    </div>
    <div class="confirmation-email-container margin-center" v-else>
      <div class="ic icon-box margin-center"></div>
      <div class="desc-box" v-html="modalInfo.content">
      </div>
      <div class="re-email-box margin-center">
        <span class="re-email-desc">이메일이 도착하지 않았습니다.</span><br v-if="getIsMobile">
        <span class="re-email-send underline-label" @click="confirmationEmail">이메일 재발송 하기</span>
      </div>
    </div>
  </sweet-modal>
</div>
</template>

<script>
import { SweetModal } from 'sweet-modal-vue'
import CommonCheckbox from 'components/common/common-checkbox'
export default {
  name: 'login-modal',
  components: {
    SweetModal,
    CommonCheckbox
  },
  props: {
    data: {
      type: Object,
      default () {
        return {
        }
      }
    }
  },
  computed: {
    getIsMobile () {
      return this.$store.getters.getIsMobile
    },
    modalInfo () {
      let result = {}
      if (this.stepPasswordFind) {
        result = {
          title: '비밀번호 찾기',
          content: '가입한 이메일 정보 입력 후 <br class="mobile line-break"> 발송하기 버튼을 클릭하세요.',
          btnText: '발송하기'
        }
      } else {
        result = {
          title: '인증메일 발송 완료',
          content: '입력하신 메일로 비밀번호 재설정 메일이 발송되었습니다.<br class="desktop line-break">메일을 통해 비밀번호 재설정을 완료해주세요.',
          btnText: '확인'
        }
      }
      return result
    },
    moblieModalWidth () {
      return this.getIsMobile ? 345 : void 0
    }
  },
  data () {
    return {
      stepPasswordFind: true,
      user: {
        email: '',
        password: ''
      },
      findPassword: {
        email: ''
      },
      modal: {
        loading: {
          authLoginLoadingShow: false,
          authEmailLoadingShow: false
        }
      },
      localError: {
        capslock: false,
        apiError: false
      },
      saveIdCheckStatus: !!this.$localStorage.get('saveId')
    }
  },
  beforeMount () {
  },
  created () {
  },
  mounted () {
  },
  methods: {
    init () {
      this.stepPasswordFind = true
      this.user = {
        email: '',
        password: ''
      }
      this.findPassword = {
        email: ''
      }
      this.modal = {
        loading: {
          authLoginLoadingShow: false,
          authEmailLoadingShow: false
        }
      }
      this.localError.apiError = false
      this.localError.capslock = false
      this.resetValidator()
    },
    checkCapsLock (e) {
      var capsLockOn = e.getModifierState('CapsLock')
      if (capsLockOn === true) this.keyUpCapslock(true)
      else this.keyUpCapslock(false)
    },
    open () {
      this.$refs.modalLogin.open()
      this.init()
    },
    resetValidator () {
      this.$validator.reset()
    },
    clickLoginBtn () {
      this.requestLogin()
    },
    onClickAddBillboard () {
      this.$refs.modalLogin.close()
      this.$router.push('/billboardRegister')
    },
    requestLogin () {
      let self = this
      self.modal.loading.authLoginLoadingShow = true
      this.$axios.post('/api/v1/auth', {
        'email': self.user.email,
        'password': self.user.password
      }).then(function (respToken) {
        if (respToken.data.status_code === 400) {
          console.log(respToken)
        } else {
          self.$store.commit('setAccessToken', respToken.data.access_token)
          self.$store.dispatch('validityCheckToken')
          self.$refs.modalLogin.close()
        }
        self.modal.loading.authLoginLoadingShow = false
      }).catch(function (error) {
        self.$store.commit('openGlobalAlert', { open: false, error: error })
        self.localError.apiError = error
        self.modal.loading.authLoginLoadingShow = false
        console.log(error)
      }).then(() => {
      })
    },
    confirmationEmail () {
      let self = this
      self.modal.loading.authEmailLoadingShow = true
      this.$axios.post('/api/v1/auth/reset_password_email', { 'email': self.findPassword.email }).then(function (respToken) {
      }).catch(function (error) {
        if (error) {
        }
      }).then(() => {
        // self.$refs.modalAuthEmail.close()
        self.modal.loading.authEmailLoadingShow = false
      })
    },
    closeEmailAuthModal () {
      this.$refs.modalAuthEmail.close()
    },
    clickFooterBtnEmailAuthModal () {
      if (this.stepPasswordFind) {
        this.stepPasswordFind = false
        this.confirmationEmail()
      } else {
        this.stepPasswordFind = true
        this.closeEmailAuthModal()
      }
    },
    openModalFindPassword () {
      this.$refs.modalLogin.close()
      this.$refs.modalAuthEmail.open()
    },
    keyUpCapslock (val) {
      this.localError.capslock = val
    },
    showJoinModal () {
      this.$refs.modalLogin.close()
      this.$emit('showJoinModal')
    },
    saveIdCheck (value) {
      this.saveIdCheckStatus = value.check
      if (this.saveIdCheckStatus) {
        this.$localStorage.set('saveId', this.user.email)
      } else {
        this.$localStorage.remove('saveId')
      }
    },
    onOpenLoginModal () {
      let saveId = this.$localStorage.get('saveId')
      if (saveId) {
        this.user.email = saveId
      }
    },
    errorFilter: function (value) {
      if (this.localError.apiError) {
        return this.localError.apiError.response.data.description
      }
    },
    onInput () {
      this.localError.apiError = false
    },
    theAction (event) {
      if (!this.$refs.modalLogin.is_open) return
      switch (event.srcKey) {
        case 'enter':
          this.clickLoginBtn()
          break
      }
    }
  },
  watch: {
    // data: {
    //   handler (newValue) {
    //     this.listData = newValue
    //   },
    //   deep: true
    // }
  },
  filters: {
    formatNumber: function (value) {
      if (typeof value !== 'number') {
        return value
      }
      // var formatter = new Intl.NumberFormat('en-US', {
      //   style: 'currency',
      //   currency: 'KRW',
      //   minimumFractionDigits: 0
      // })
      // return formatter.format(value)
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원'
    }
  }
}
</script>

<style lang="stylus">
.root-layout-wrapper.mobile
  .modal-login
    .sweet-modal.theme-light
      .sweet-content
        padding-top 57px
  .modal-login-wrapper
    .options-box
      text-align right
      margin-bottom 0px
    .add-billboard-box
      text-align center
      // position absolute
      // bottom 46px
      position relative
      bottom 0
      height calc(100% - 275px)
      min-height 190px
    .add-billboard-inner
      width 100%
      position absolute
      bottom 46px
      text-align center
  .modal-auth-email
    .password-find-wrapper.form
      .title
        text-align center
        font-size 14px
        line-height 2
        margin-top 30px
        margin-bottom 34px
        height 56px
  .confirmation-email-container
    padding-top 51px
    > .icon-box
      width 35px
      height 35px
    > .desc-box
      font-size 14px
      margin-top 17px
      margin-bottom 48px
    > .re-email-box
      text-align center
    .re-email-desc
      display inline-block
      margin-bottom 7px
// 데스크탑
.modal-login
  .sweet-content
    height 384px
    box-sizing border-box
    padding-top 65px
.modal-login-wrapper
  height 100%
  position relative
  .options-box
    height 30px
    margin-top 9px
    margin-bottom 31px
  .password-forgot
    margin-left 27px
  .checkbox.custom
    text-align: right
  .add-billboard-box
    text-align center
    .add-btn
      margin-left 12px
      width: 123px
      height: 35px
      border-radius: 17.5px
      background-color: #080f31
      text-align: center
      color: #ffffff
      font-size: 14px
      font-weight: normal
      opacity: 0.9
      display: inline-block
      line-height: 35px
.password-find-wrapper
  &.form
    .title
      font-size 16px
      font-weight 500
      height 40px
      margin-top 51px
      margin-bottom 27px
    .email-box.input-box
      margin-bottom 94px
.footer-btn-box
  .login-btn
    width 100%
    height 100%

.confirmation-email-container
  height 270px
  width 100%
  padding-top 33px
  > .icon-box
    width: 38px
    height: 38px
    background-image url('~assets/images/ic/ic_send_email_complete.png')
  > .re-email-box
    width 299px
  > .desc-box
    margin-top 41px
    margin-bottom 23px
    font-size: 16px
    font-weight: 300
    color: #080f31
    text-align: center
  .re-email-desc
    font-size: 14px
    font-weight: 300
    color: rgba(8, 15, 49, 0.6)

</style>
