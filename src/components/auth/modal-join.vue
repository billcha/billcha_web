<template>
<div>
  <sweet-modal
  class="modal-join"
  :class="{'agreement' : !nextStep}"
  ref="modalJoin"
  :enable-mobile-fullscreen="true"
  :hide-close-button="false"
  :title="'회원가입'"
  :blocking="true"
  >
    <!-- <div slot="box-action"><div>test header</div></div> -->
    <div slot="loading" v-common-loading-panel="modal.loading.joinLoadingShow"></div>
    <div class="footer-btn-box" slot="button">
      <div class="cols">
        <!-- <div :class="[getIsMobile ? 'col-12' : 'col-6' ]" class="join-button is-hidden-mobile" @click="clickCloseBtn">취소하기</div> -->
        <button class="join-button col-12 button primary" :disabled="!checkValidate" @click="clickJoinBtn" v-if="!nextStep">{{ footerBtnText }}</button>
        <button class="join-button col-12 button primary" :disabled="$validator.errors.any()" @click="clickJoinBtn" v-else>{{ footerBtnText }}</button>
      </div>
    </div>
    <div class="modal-join-wrapper">
      <div class="contents-container cols">
        <div class="col-12" v-if="!nextStep">
          <div class="sub-title fl">빌차 서비스 이용약관 동의(필수)</div>
          <div class="sub-check-box fr"><common-checkbox class="" :index="0" :text="''" :check="agreement.termsOfService" @onChange="onChangeTermsOfServiceCheckbox"></common-checkbox></div>
          <div>
            <div class="textarea has-fixed-size terms-box" readonly>
              제 1조 (약관의 목적)<br>
              이 약관은 우주비행사가 운영하는 인터넷 서비스를 이용함에 있어 우주비행사가 운영하는 인터넷 서비스를 이용함에 있어 우주비행사가 운영하는 인터넷 서비스를 이용함에 있어 우주비행사가 운영하는 인터넷 서비스를 이용함에 있어
            </div>
          </div>
          <div class="sub-title fl">개인정보 수집 및 이용에 대한 동의(필수)</div>
          <div class="sub-check-box fr"><common-checkbox class="" :index="0" :text="''" :check="agreement.privacy" @onChange="onChangePrivacyCheckbox"></common-checkbox></div>
          <div>
            <div class="textarea has-fixed-size terms-box" readonly>
              제 1조 (약관의 목적)<br>
              이 약관은 우주비행사가 운영하는 인터넷 서비스를 이용함에 있어 우주비행사가 운영하는 인터넷 서비스를 이용함에 있어 우주비행사가 운영하는 인터넷 서비스를 이용함에 있어 우주비행사가 운영하는 인터넷 서비스를 이용함에 있어
            </div>
          </div>
          <div class="sub-title fl">마케팅 정보 수신 동의 (선택) </div>
          <div class="sub-check-box fr"><common-checkbox class="" :index="0" :text="''" :check="agreement.acceptMarketingInfo" @onChange="onChangeAcceptMarketingInfoCheckbox" @onChangeCheck="onChangeAcceptMarketingInfoCheckbox"></common-checkbox></div>
          <div>
            <div class="textarea has-fixed-size terms-box" readonly>
              제 1조 (약관의 목적)<br>
              이 약관은 우주비행사가 운영하는 인터넷 서비스를 이용함에 있어 우주비행사가 운영하는 인터넷 서비스를 이용함에 있어 우주비행사가 운영하는 인터넷 서비스를 이용함에 있어 우주비행사가 운영하는 인터넷 서비스를 이용함에 있어
            </div>
          </div>
          <div class="fr">
            <div class="check-all-agreement fl">
              <div class="sub-check-box fr"><common-checkbox class="" :index="0" :text="''" :check="allAgreement" @onChange="onChangeAllCheckbox"></common-checkbox></div>
            </div>
            <div class="sub-title fl">약관 전체 동의하기</div>
          </div>
        </div>
        <div class="form col-12 margin-center" v-else>
          <div class="input-box">
            <span class="sub-title is-5">이름</span>
            <div class="sub-value">
              <input v-validate="'required|name'" :class="{'input': true, 'is-danger': errors.has('name') }"
              :data-vv-as="'이름'" v-model.trim="user.name" name="name" type="text" placeholder="이름 입력">
              <div v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</div>
            </div>
          </div>
          <div class="input-box">
            <span class="sub-title is-5">이메일</span>
            <div class="sub-value">
              <input v-validate="'required|email'" :class="{'input': true, 'is-danger': errors.has('email') }"
               :data-vv-as="'이메일'" v-model.trim="user.email" name="email" type="text" placeholder="이메일 입력">
              <div v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</div>
            </div>
          </div>
          <div class="input-box">
            <span class="sub-title is-5">전화번호</span>
            <div class="sub-value">
              <input v-validate="'required|phoneNumber'" :class="{'input': true, 'is-danger': errors.has('phoneNumber') }"
              :data-vv-as="'전화번호'"  v-model.trim="user.phoneNumber" name="phoneNumber" type="tel" placeholder="전화번호 입력">
              <div v-show="errors.has('phoneNumber')" class="help is-danger">{{ errors.first('phoneNumber') }}</div>
            </div>
          </div>
          <div class="input-box">
            <span class="sub-title is-5">비밀번호</span>
            <div class="sub-value">
              <input v-validate="'required|password'" :class="{'input': true, 'is-danger': errors.has('password') }"
              :data-vv-as="'비밀번호'"  v-model="user.password" name="password" type="password" placeholder="비밀번호 입력" ref="password">
              <div v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</div>
            </div>
          </div>
          <div class="input-box">
            <span class="sub-title is-5">비밀번호확인</span>
            <div class="sub-value">
              <input v-validate="'required|confirmed:password'" name="password_confirmation" type="password"
              data-vv-as="비밀번호확인" v-model="user.rePassword" class="input" :class="{'is-danger': errors.has('password_confirmation')}" placeholder="비밀번호 확인">
              <div v-show="errors.has('password_confirmation')" class="help is-danger">{{ errors.first('password_confirmation') }}</div>
            </div>
          </div>
          <div class="input-box">
            <span class="sub-title is-5">소속/직책</span>
            <div class="sub-value">
              <input type="text" class="input" v-model.trim="user.affiliationAndPosition" placeholder="소속/ 직책 입력" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </sweet-modal>
  <modal-auth-mail
    :loading="modal.loading.authEmailLoadingShow"
    @reConfirmationEmail="confirmationEmail"
    ref="modalAuthEmail"
  ></modal-auth-mail>
</div>
</template>

<script>
import { SweetModal } from 'sweet-modal-vue'
import CommonVaildator from 'components/common/common-vaildator'
import CommonCheckbox from 'components/common/common-checkbox'
import ModalAuthMail from './modal-auth-mail'
export default {
  name: 'join-modal',
  components: {
    SweetModal,
    CommonVaildator,
    CommonCheckbox,
    ModalAuthMail
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
    checkValidate () {
      return this.agreement.termsOfService && this.agreement.privacy
    },
    getIsMobile () {
      return this.$store.getters.getIsMobile
    },
    footerBtnText () {
      return this.nextStep ? '가입하기' : '다음'
    },
    allAgreement () {
      return this.agreement.termsOfService && this.agreement.privacy && this.agreement.acceptMarketingInfo
    }
  },
  data () {
    return {
      nextStep: false,
      modal: {
        loading: {
          authEmailLoadingShow: false,
          joinLoadingShow: false
        }
      },
      user: {
        name: '',
        email: '',
        phoneNumber: '',
        password: '',
        rePassword: '',
        affiliationAndPosition: ''
      },
      agreement: {
        termsOfService: false,
        privacy: false,
        acceptMarketingInfo: false
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
    init () {
      this.$validator.reset()
      this.nextStep = false
      this.modal = {
        loading: {
          authEmailLoadingShow: false,
          joinLoadingShow: false
        }
      }
      this.user = {
        name: '',
        email: '',
        phoneNumber: '',
        password: '',
        rePassword: '',
        affiliationAndPosition: ''
      }
      this.agreement = {
        termsOfService: false,
        privacy: false,
        acceptMarketingInfo: false,
        all: false
      }
      this.resetValidator()
    },
    open () {
      this.init()
      this.$refs.modalJoin.open()
    },
    clickCloseBtn () {
      this.$refs.modalJoin.close()
    },
    clickJoinBtn () {
      if (!this.nextStep) {
        this.nextStep = true
      } else {
        this.$validator.validateAll()
        if (!this.$validator.errors.any() && this.checkValidate) {
          this.modal.loading.joinLoadingShow = true
          this.postUserJoin()
        }
      }
    },
    resetValidator () {
      this.$validator.reset()
    },
    postUserJoin () {
      let self = this
      this.$axios.get('/api/v1/auth/register').then(function (respToken) {
        let authPostData = {
          'email': self.user.email,
          'password': self.user.password,
          'name': self.user.name,
          'phone_number': self.user.phoneNumber,
          'affiliation_and_position': self.user.affiliationAndPosition,
          'is_accept_marketing_email': self.agreement.acceptMarketingInfo,
          'csrf_token': respToken.data.csrf_token
        }
        self.$axios.post('/api/v1/auth/register', authPostData).then((respAuth) => {
          self.$refs.modalAuthEmail.open()
        }).catch(function (error) {
          console.log(error)
        }).then(() => {
          self.$refs.modalJoin.close()
          self.modal.loading.joinLoadingShow = false
        })
      }).catch(function (error) {
        console.log(error)
        self.$refs.modalJoin.close()
        self.modal.loading.joinLoadingShow = false
      })
    },
    closeEmailAuthModal () {
      this.$refs.modalAuthEmail.close()
    },
    confirmationEmail () {
      let self = this
      self.modal.loading.authEmailLoadingShow = true
      this.$axios.post('/api/v1/auth/confirmation_email', { 'email': self.user.email }).then(function (respToken) {
        self.modal.loading.authEmailLoadingShow = false
      }).catch(function () {
        self.modal.loading.authEmailLoadingShow = false
      }).then(() => {
        // self.$refs.modalAuthEmail.close()
      })
    },
    checkAllAgreement () {
      let check = this.agreement.all
      if (!check) {
        this.agreement = {
          termsOfService: false,
          privacy: false,
          acceptMarketingInfo: false,
          all: false
        }
      } else {
        this.agreement = {
          termsOfService: true,
          privacy: true,
          acceptMarketingInfo: true,
          all: true
        }
      }
    },
    onChangeTermsOfServiceCheckbox (value) {
      this.agreement.termsOfService = value.check
    },
    onChangePrivacyCheckbox (value) {
      this.agreement.privacy = value.check
    },
    onChangeAcceptMarketingInfoCheckbox (value) {
      this.agreement.acceptMarketingInfo = value.check
    },
    onChangeCheck (value) {
      console.log(value)
      this.agreement.all = value.check
    },
    onChangeAllCheckbox (value) {
      this.agreement.all = value.check
      this.checkAllAgreement()
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
.mobile
  .modal-join-wrapper
    height 100%
    padding 0px
.sweet-modal-overlay
  .sweet-modal
    .sweet-buttons
      .join-button
        height 100%
.modal-join-wrapper
  height 641px
  padding-top 90px
  padding-bottom 105px
  box-sizing border-box
  .terms-box
    position: relative
    overflow: auto
    height: 88px
    padding: 12px
    border: 1px solid #dadada
    background: #fff
    box-sizing: border-box

.agreement
  .modal-join-wrapper
    padding-top 27px
    padding-bottom 42px
  .check-all-agreement
    margin-right 12px

.confirmation-email-container
  height 270px
  width 299px
  padding-top 33px
  > .icon-box
    width: 38px
    height: 38px
    background-image url('~assets/images/ic/ic_send_email_complete.png')
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
