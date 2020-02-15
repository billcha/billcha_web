<template>
<div>
  <sweet-modal
  class="modal-auth-email"
  ref="modalAuthEmail"
  :enable-mobile-fullscreen="false"
  :hide-close-button="false"
  :title="'인증메일 발송 완료'"
  :blocking="true"
  :width="moblieModalWidth"
  >
    <div slot="loading" v-common-loading-panel="modal.loading.authEmailLoadingShow"></div>
    <div class="footer-btn-box" slot="button">
      <div class="cols">
        <div class="col-12 join-button primary button" @click="close">확인</div>
      </div>
    </div>
    <div class="confirmation-email-container margin-center">
      <div class="ic icon-box margin-center"></div>
      <div class="desc-box">
        입력하신 메일로 인증 메일이 발송되었습니다.<br>
        메일을 통해 회원가입을 완료해주세요.
      </div>
      <div class="re-email-box margin-center">
        <span class="re-email-desc">이메일이 도착하지 않았습니다.</span><br v-if="getIsMobile">
        <span class="re-email-send underline-label" @click="reConfirmationEmail">이메일 재발송 하기</span>
      </div>
    </div>
  </sweet-modal>
</div>
</template>

<script>
import { SweetModal } from 'sweet-modal-vue'
export default {
  name: 'auth-mail-modal',
  components: {
    SweetModal
  },
  props: {
    data: {
      type: Object,
      default () {
        return {
        }
      }
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    getIsMobile () {
      return this.$store.getters.getIsMobile
    },
    checkValidate () {
      return this.agreement.termsOfService && this.agreement.privacy
    },
    footerBtnText () {
      return this.nextStep ? '가입하기' : '다음'
    },
    allAgreement () {
      return this.agreement.termsOfService && this.agreement.privacy && this.agreement.acceptMarketingInfo
    },
    moblieModalWidth () {
      return this.getIsMobile ? 345 : void 0
    }
  },
  data () {
    return {
      nextStep: false,
      modal: {
        loading: {
          authEmailLoadingShow: this.loading
        }
      }
    }
  },
  beforeMount () {
  },
  created () {
  },
  mounted () {
  },
  methods: {
    open () {
      this.$refs.modalAuthEmail.open()
    },
    close () {
      this.$refs.modalAuthEmail.close()
    },
    reConfirmationEmail () {
      this.modal.loading.authEmailLoadingShow = true
      this.$emit('reConfirmationEmail')
    }
  },
  watch: {
    loading (newVal) {
      this.modal.loading.authEmailLoadingShow = newVal
    }
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
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원'
    }
  }
}
</script>

<style lang="stylus">
.root-layout-wrapper.mobile
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
