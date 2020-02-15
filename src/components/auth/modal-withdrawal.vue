<template>
<div>
  <sweet-modal
  class="modal-withdrawal"
  ref="modalWithdrawal"
  :enable-mobile-fullscreen="true"
  :hide-close-button="false"
  :title="'회원 탈퇴하기'"
  :blocking="true"
  >
    <div slot="loading" v-common-loading-panel="modal.loading.withdrawalLoadingShow"></div>
    <div class="footer-btn-box" slot="button">
      <div class="cols">
        <div class="col-6 info-set-button button light" @click="close">취소</div>
        <div :disabled="!checkValidator" class="col-6 info-set-button button primary" @click="requestWithdrawal">{{ modalData.btn }}</div>
      </div>
    </div>
    <div class="withdrawal-container margin-center">
      <div class="withdrawal-title">{{ modalData.title }}</div>
      <div v-if="!nextStep">
        <ul class="withdrawal-sub-title-box">
          <li class="withdrawal-sub-title">∙ 회원 탈퇴 시, 현재 로그인 된 아이디는 즉시 탈퇴됩니다.</li>
          <li class="withdrawal-sub-title">∙ 회원 탈퇴 시, 모든 서비스 이용 기록은 삭제됩니다.</li>
          <li class="withdrawal-sub-title">∙ 삭제된 데이터는 복구되지 않습니다.</li>
        </ul>
        <div class="withdrawal-select-box">
          <common-select :value="withdrawal.select.value" :options="withdrawal.select.options" :placeholder="withdrawal.select.placeholder" @onSelected="onSelected"></common-select>
        </div>
        <div class="textarea-box">
          <textarea class="textarea has-fixed-size" placeholder="다른 사유가 있다면 입력해주세요" v-model="withdrawal.textarea.value"></textarea>
        </div>
        <div class="checkbox-inner" :class="{ 'fr' : !getIsMobile }">
          <common-checkbox class="fr" :index="0" :text="'탈퇴 안내 사항을 읽었으며, 내용에 동의합니다.'" :check="withdrawal.checkbox" @onChange="onCheckWithdrawal"></common-checkbox>
        </div>
      </div>
      <div v-else>
        <div class="form">
          <div class="input-box password">
            <div class="sub-title">비밀번호</div>
            <div class="sub-value">
              <input v-validate="'required|password'" :class="{'input': true, 'is-danger': errors.has('password') }"
              v-model="withdrawal.password" name="password" type="password" placeholder="비밀번호 입력" ref="password">
              <div v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </sweet-modal>
</div>
</template>

<script>
import { SweetModal } from 'sweet-modal-vue'
import CommonSelect from 'components/common/common-select'
import CommonCheckbox from 'components/common/common-checkbox'
export default {
  name: 'join-modal',
  components: {
    SweetModal,
    CommonSelect,
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
    checkValidator () {
      return this.withdrawal.select.value && this.withdrawal.checkbox
    },
    modalData () {
      var result
      if (!this.nextStep) {
        result = {
          title: '회원 탈퇴를 신청하시기 전에 아래 안내 사항을 확인해주세요.',
          btn: '탈퇴하기'
        }
      } else {
        result = {
          title: '회원 탈퇴를 위해 비밀번호를 다시 한번 입력해주세요.',
          btn: '탈퇴완료'
        }
      }
      return result
    }
  },
  data () {
    return {
      modal: {
        loading: {
          withdrawalLoadingShow: false
        }
      },
      nextStep: false,
      withdrawal: {
        select: {
          options: [
            { label: '너무 부담스러운 수수료 가격', value: '너무 부담스러운 수수료 가격' },
            { label: '타 사이트 이용을 위해서', value: '타 사이트 이용을 위해서' },
            { label: '불편해서', value: '불편해서' },
            { label: '기타', value: '기타' }
          ],
          placeholder: '탈퇴 사유를 선택해주세요',
          value: ''
        },
        textarea: {
          value: ''
        },
        checkbox: false,
        password: ''
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
      this.withdrawal.select.value = null
      this.withdrawal.textarea.value = ''
      this.withdrawal.checkbox = false
    },
    open () {
      this.init()
      this.$refs.modalWithdrawal.open()
    },
    close () {
      this.$refs.modalWithdrawal.close()
    },
    requestWithdrawal () {
      let self = this
      if (this.nextStep) {
        this.modal.loading.withdrawalLoadingShow = true
        this.$axios.post('/api/v1/auth/leave', { password: this.withdrawal.password, withdrawal_reason: this.withdrawal.select.value.value }).then(() => {
          self.close()
          self.$store.commit('logout')
        }).catch(() => {
        }).then(() => {
          self.modal.loading.withdrawalLoadingShow = false
        })
      } else if (this.checkValidator) {
        this.nextStep = true
      }
    },
    onSelected (value) {
      this.withdrawal.select.value = value
    },
    onCheckWithdrawal (value) {
      this.withdrawal.checkbox = value.check
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
  .modal-withdrawal
    .withdrawal-container
      padding 0px
      .withdrawal-title
        margin-top 51px
        font-size 14px
        font-weight 500
        color #354052
        margin-bottom 0px
      .withdrawal-sub-title-box
        padding 0px
        font-size 14px
        font-weight 300
        margin-bottom 20px
        .withdrawal-sub-title
          font-size 14px
          font-weight 300
      .textarea-box
        height 130px
.modal-withdrawal
  .withdrawal-container
    padding-top 59px
    .withdrawal-title,
    .withdrawal-sub-title
      color: #354052
      font-size: 16px
    .withdrawal-title
      font-weight: 500
      height 40px
      margin-bottom 20px
    .withdrawal-sub-title-box
      font-size 16px
      font-weight 300
      padding-left 20px
      margin-bottom 42px
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
    .input-box.password
      margin-top 26px
      margin-bottom 95px
.sweet-buttons
  .info-set-button
    height 100%

</style>
