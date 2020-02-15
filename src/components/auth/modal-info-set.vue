<template>
<div>
  <sweet-modal
  class="modal-info-set"
  ref="modalInfoSet"
  :enable-mobile-fullscreen="true"
  :hide-close-button="false"
  :title="'정보수정'"
  :blocking="true"
  >
    <!-- <div slot="box-action"><div>test header</div></div> -->
    <div slot="loading" v-common-loading-panel="modal.loading.infoSetLoadingShow"></div>
    <div class="footer-btn-box" slot="button">
      <div class="cols">
        <div class="col-6 info-set-button button light" @click="clickCloseBtn">취소</div>
        <div class="col-6 info-set-button button primary" @click="clickInfoSetBtn">확인</div>
        <!-- <button class="join-button col-12 button primary" :disabled="$validator.errors.any()" @click="clickJoinBtn">수정하기</button> -->
      </div>
    </div>
    <div class="modal-info-set-wrapper">
      <div class="contents-container cols">
        <div class="form col-12 margin-center">
          <div class="input-box">
            <span class="sub-title is-5">이름</span>
            <div class="sub-value">
              <input v-validate="'required|name'" :class="{'input': true, 'is-danger': errors.has('name') }"
              v-model.trim="user.name" name="name" type="text" placeholder="이름 입력">
              <div v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</div>
            </div>
          </div>
          <div class="input-box">
            <span class="sub-title is-5">이메일</span>
            <div class="sub-value">
              <input v-validate="'required|email'" :class="{'input': true, 'is-danger': errors.has('email') }"
                v-model.trim="user.email" name="email" type="text" placeholder="이메일 입력">
              <div v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</div>
            </div>
          </div>
          <div class="input-box">
            <span class="sub-title is-5">전화번호</span>
            <div class="sub-value">
              <input v-validate="'required|phoneNumber'" :class="{'input': true, 'is-danger': errors.has('phoneNumber') }"
                v-model.trim="user.phoneNumber" name="phoneNumber" type="tel" placeholder="전화번호 입력">
              <div v-show="errors.has('phoneNumber')" class="help is-danger">{{ errors.first('phoneNumber') }}</div>
            </div>
          </div>
          <div class="input-box">
            <span class="sub-title is-5">비밀번호</span>
            <div class="sub-value">
              <input v-validate="'required|currentPassword'" :class="{'input': true, 'is-danger': errors.has('currentPassword') }"
                v-model="user.currentPassword" name="currentPassword" type="password" placeholder="현재 비밀번호를 입력" ref="currentPassword">
              <div v-show="errors.has('currentPassword')" class="help is-danger">{{ errors.first('currentPassword') }}</div>
            </div>
          </div>
          <div class="input-box">
            <span class="sub-title is-5">변경될 비밀번호</span>
            <div class="sub-value">
              <input v-validate="'required|password'" :class="{'input': true, 'is-danger': errors.has('password') }"
                v-model="user.password" name="password" type="password" placeholder="변경될 비밀번호 입력" ref="password">
              <div v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</div>
            </div>
          </div>
          <div class="input-box">
            <span class="sub-title is-5">비밀번호확인</span>
            <div class="sub-value">
              <input v-validate="'required|confirmed:password'" name="password_confirmation" type="password"
                v-model="user.rePassword" class="input" :class="{'is-danger': errors.has('password_confirmation')}" placeholder="변경될 비밀번호 확인" data-vv-as="password">
              <div v-show="errors.has('password_confirmation')" class="help is-danger">{{ errors.first('password_confirmation') }}</div>
            </div>
          </div>
          <div class="input-box">
            <span class="sub-title is-5">소속/직책</span>
            <div class="sub-value">
              <input type="text" class="input" v-model.trim="user.affiliationAndPosition" placeholder="소속/ 직책 입력" />
            </div>
          </div>
          <div class="withdrawal underline-label" @click="openWithdrawalModal">회원탈퇴</div>
        </div>
      </div>
    </div>
  </sweet-modal>
  <modal-withdrawal
    ref="authModalWithdrawal"
  >
  </modal-withdrawal>
</div>
</template>

<script>
import { SweetModal } from 'sweet-modal-vue'
import CommonVaildator from 'components/common/common-vaildator'
import CommonSelect from 'components/common/common-select'
import ModalWithdrawal from './modal-withdrawal'
export default {
  name: 'join-modal',
  components: {
    SweetModal,
    CommonVaildator,
    CommonSelect,
    ModalWithdrawal
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
    }
  },
  data () {
    return {
      modal: {
        loading: {
          infoSetLoadingShow: false
        }
      },
      user: {
        name: '',
        email: '',
        phoneNumber: '',
        currentPassword: '',
        password: '',
        rePassword: '',
        affiliationAndPosition: ''
      },
      withdrawal: {
        select: {
          options: [
            '너무 부담스러운 수수료 가격',
            '타 사이트 이용을 위해서',
            '불편해서',
            '기타'
          ],
          placeholder: '탈퇴 사유를 선택해주세요',
          value: ''
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
    init () {
      this.$validator.reset()
      this.modal = {
        loading: {
          authEmailLoadingShow: false,
          infoSetLoadingShow: false
        }
      }
      this.user = {
        name: '',
        email: '',
        phoneNumber: '',
        password: '',
        currentPassword: '',
        rePassword: '',
        affiliationAndPosition: ''
      }
      this.withdrawal.value = null
      this.getUserInfo()
    },
    open () {
      this.init()
      this.$refs.modalInfoSet.open()
    },
    clickCloseBtn () {
      this.$refs.modalInfoSet.close()
    },
    closeWithdrawalModal () {
      this.$refs.modalWithdrawal.close()
    },
    getUserInfo () {
      let self = this
      this.modal.loading.infoSetLoadingShow = true
      this.$axios.get('/api/v1/auth').then(function (respToken) {
        self.user.email = respToken.data.email
        self.user.name = respToken.data.name
        self.user.phoneNumber = respToken.data.phone_number
        self.user.affiliationAndPosition = respToken.data.affiliation_and_position
        self.user.isAcceptMarketingEmail = !!respToken.is_accept_marketing_email
      }).catch(() => {
      }).then(() => {
        self.modal.loading.infoSetLoadingShow = false
      })
    },
    clickInfoSetBtn () {
      this.$validator.validateAll()
      // if (!this.$validator.errors.any() && this.checkValidate) {
      //   this.modal.loading.infoSetLoadingShow = true
      //   this.patchSetUserJoin()
      // }
      this.patchSetUserJoin()
    },
    patchSetUserJoin () {
      let self = this
      this.modal.loading.infoSetLoadingShow = true
      this.$axios.get('/api/v1/auth/register').then((respCsrfToken) => {
        let authPasswordChangeData = {
          password: self.user.currentPassword,
          new_password: self.user.password,
          csrf_token: respCsrfToken.data.csrf_token
        }
        self.$axios.post('/api/v1/auth/reset_password_by_jwt', authPasswordChangeData).then(function (respPass) {
          self.$axios.get('/api/v1/auth/register').then((respCsrfToken) => {
            let authPutData = {
              'email': self.user.email,
              'password': self.user.password,
              'name': self.user.name,
              'phone_number': self.user.phoneNumber,
              'affiliation_and_position': self.user.affiliationAndPosition,
              'is_accept_marketing_email': self.user.isAcceptMarketingEmail,
              'csrf_token': respCsrfToken.data.csrf_token
            }
            self.$axios.put('/api/v1/auth/register', authPutData).then(function (respToken) {
            }).catch(() => {
            }).then(() => {
              self.modal.loading.infoSetLoadingShow = false
              self.clickCloseBtn()
            })
          })
        }).catch(() => {
          self.modal.loading.infoSetLoadingShow = false
          self.clickCloseBtn()
        })
      }).catch(() => {
        self.modal.loading.infoSetLoadingShow = false
      })
    },
    openWithdrawalModal () {
      this.clickCloseBtn()
      this.$refs.authModalWithdrawal.open()
    },
    requestWithdrawal () {
      console.log('회원탈퇴요청')
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
  .withdrawal
    line-height 50px
    margin 49px 0px
.sweet-modal-overlay
  .sweet-modal
    .sweet-buttons
      .join-button
        height 100%
.modal-info-set-wrapper
  height 641px
  padding-top 40px
  padding-bottom 105px
  box-sizing border-box
  .withdrawal
    text-align center

.modal-withdrawal
  .withdrawal-container
    padding-top 59px
    .withdrawal-title,
    .withdrawal-sub-title
      color: #354052
      font-size: 16px
    .withdrawal-title
      font-weight: 500
    .withdrawal-sub-title-box
      margin-bottom 27px
    .withdrawal-sub-title
      font-weight: 300
      height: 28px
      line-height: 28px
    .withdrawal-select-box
      // width 100%
      height 50px
      margin-bottom 28px
    .textarea-box
      height 190px
      margin-bottom 27px
      > textarea
        height 100%
    .checkbox-inner
      height 40px
      margin-bottom 27px
      color: #080f31
      font-size: 14px
.sweet-buttons
  .info-set-button
    height 100%

</style>
