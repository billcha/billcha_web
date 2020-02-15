<template>
<div>
  <sweet-modal
  class="modal-cancel-billboard"
  ref="modalCancelBillboard"
  :enable-mobile-fullscreen="true"
  :hide-close-button="false"
  :title="modalData.headerTitle"
  :blocking="true"
  >
    <div slot="loading" v-common-loading-panel="modal.loading.cancelLoadingShow"></div>
    <div class="footer-btn-box" slot="button">
      <div class="cols">
        <div class="col-6 info-set-button button light" @click="close">취소</div>
        <div :disabled="!checkValidator" class="col-6 info-set-button button primary" @click="requestCancelBillboard">{{ modalData.btn }}</div>
      </div>
    </div>
    <div class="cancel-billboard-container margin-center" v-if="data.paymentMethod !== 'vbank' || (this.data.status !== 'paid' && this.data.status !== 'advertising')">
      <div class="cancel-billboard-title">{{ modalData.title }}</div>
      <div class="cancel-billboard-select-box">
        <common-select :value="cancel.select.value" :options="cancel.select.options" :placeholder="cancel.select.placeholder" @onSelected="onSelected"></common-select>
      </div>
      <div class="textarea-box">
        <textarea class="textarea has-fixed-size" placeholder="다른 사유가 있다면 입력해주세요" v-model="cancel.textarea.value"></textarea>
      </div>
    </div>
    <div class="cancel-billboard-container vbank margin-center" v-else>
      <div class="form cols">
        <div class="bank-select-box input-box id col-12">
          <span class="sub-title">은행선택</span>
          <div class="sub-value">
            <common-select :value="vbank.refundBank" :options="vbank.select.options" :placeholder="vbank.select.placeholder" @onSelected="onVbankSelected"></common-select>
          </div>
        </div>
        <div class="refund-account input-box id col-12">
          <span class="sub-title">환불 계좌</span>
          <div class="sub-value">
            <input class="input" v-model="vbank.refundAccount" placeholder="환불계좌 입력">
            <div class="is-danger">환불요청 후 환불 계좌 변경은 불가능 합니다.</div>
          </div>
        </div>
        <div class="account-holder input-box id col-12">
          <span class="sub-title">예금주</span>
          <div class="sub-value">
            <input class="input" v-model="vbank.refundHolder" placeholder="예금주 입력">
          </div>
        </div>
      </div>
      <div class="refund-amount">
        <div class="text">총 환불 금액</div>
        <div class="total-payment">{{ data.totalPayment | numberComma }}</div>
      </div>
    </div>
  </sweet-modal>
</div>
</template>

<script>
import { SweetModal } from 'sweet-modal-vue'
import CommonSelect from 'components/common/common-select'
// import CommonCheckbox from 'components/common/common-checkbox'
export default {
  name: 'modal-cancel-billboard',
  components: {
    SweetModal,
    CommonSelect
    // CommonCheckbox
  },
  props: {
    data: {
      type: Object
    }
  },
  computed: {
    getIsMobile () {
      return this.$store.getters.getIsMobile
    },
    checkValidator () {
      if (this.data.paymentMethod !== 'vbank' || (this.data.status !== 'paid' && this.data.status !== 'advertising')) {
        return this.cancel.select.value
      }
      return this.vbank.refundBank && this.vbank.refundAccount && this.vbank.refundHolder
    },
    modalData () {
      var result
      if (this.data.status === 'paid' || this.data.status === 'advertising') {
        result = {
          headerTitle: '환불하기',
          title: '빌차 서비스 이용약관 동의 (필수)',
          btn: '환불하기'
        }
      } else {
        result = {
          headerTitle: '예약 취소하기',
          title: '빌차 서비스 이용약관 동의 (필수)',
          btn: '결제취소하기'
        }
      }
      return result
    }
  },
  data () {
    return {
      modal: {
        loading: {
          cancelLoadingShow: false
        }
      },
      nextStep: false,
      vbank: {
        refundBank: void 0,
        refundAccount: void 0,
        refundHolder: void 0,
        select: {
          options: [
            { label: '우리은행', value: '우리은행' },
            { label: '국민은행', value: '국민은행' },
            { label: '신한은행', value: '신한은행' },
            { label: '토마토은행', value: '토마토은행' }
          ],
          placeholder: '은행선택',
          value: ''
        }
      },
      cancel: {
        select: {
          options: [
            { label: '너무 부담스러운 수수료 가격', value: '너무 부담스러운 수수료 가격' },
            { label: '타 사이트 이용을 위해서', value: '타 사이트 이용을 위해서' },
            { label: '불편해서', value: '불편해서' },
            { label: '기타', value: '기타' }
          ],
          placeholder: '예약 취소 사유를 선택해주세요',
          value: ''
        },
        textarea: {
          value: ''
        },
        // checkbox: false,
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
      this.cancel.select.value = null
      this.cancel.textarea.value = ''
      this.requestImpBankCode()
      // this.cancel.checkbox = false
    },
    open () {
      this.init()
      this.$refs.modalCancelBillboard.open()
    },
    close () {
      this.$refs.modalCancelBillboard.close()
    },
    requestImpBankCode () {
      let self = this
      this.$axios.get('/api/v1/auth/imp_bank_code').then((resp) => {
        self.parserImpBankCode(resp.data)
      }).catch(() => {
      })
    },
    parserImpBankCode (data) {
      let result = []
      for (let i = 0; i < data.length; i++) {
        let item = data[i]
        result.push({
          label: item.name,
          value: item.code
        })
      }
      this.vbank.select.options = result
    },
    requestCancelBillboard () {
      let self = this
      let cacncelReason = this.cancel.textarea.value || this.cancel.select.value
      let params = {
        order_id: this.data.id,
        cancel_reason: cacncelReason,
        refund_holder: '-',
        refund_bank: '-',
        refund_account: '-'
      }
      if (this.data.paymentMethod === 'vbank' & (this.data.status === 'paid' || this.data.status === 'advertising')) {
        params.refund_holder = this.vbank.refundHolder
        params.refund_bank = this.vbank.refundBank.value
        params.refund_account = this.vbank.refundAccount
      }
      this.modal.loading.cancelLoadingShow = true
      this.$axios.post('/api/v1/orders/cancel', params).then((resp) => {
        self.$emit('refreshHistoryData')
      }).catch(() => {
      }).then(() => {
        self.modal.loading.cancelLoadingShow = false
        self.close()
      })
    },
    onSelected (value) {
      this.cancel.select.value = value
    },
    onVbankSelected (value) {
      this.vbank.refundBank = value
    }
    // onCheckCancel (value) {
    //   this.cancel.checkbox = value.check
    // }
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
  }
}
</script>

<style lang="stylus">
.mobile
  .modal-cancel-billboard
    .cancel-billboard-container.vbank
      margin-top 30px
      margin-bottom 30px
.modal-cancel-billboard
  .cancel-billboard-container.vbank
    margin-top 91px
    margin-bottom 145px
    height auto
    display flex
    flex-direction column
    // select 예외처리
    .multiselect {
      height: 50px;
    }
    .multiselect__single {
      line-height: 50px;
      height: 48px;
    }
    .multiselect__tags {
      height: 50px;
      border: solid 1px rgba(22, 27, 72, 0.2);
    }
    .multiselect__select {
      height: 50px;
    }
    .multiselect__option {
      min-height: 3rem;
      padding: 1rem;
    }
    .multiselect__placeholder {
      opacity: 0.4;
      line-height: 50px;
    }
    // form
    .form.cols
      height auto
    .refund-account
      .is-danger
        font-size 14px
        font-weight normal
    .refund-amount
      font-size 16px
      font-weight normal
      line-height 73px
      padding 0px 32px 0px 16px
      display flex
      height: 73px
      border: solid 1px #dedee0
      justify-content space-between
  .cancel-billboard-container
    padding-top 27px
    .cancel-billboard-title,
    .cancel-billboard-sub-title
      color: #354052
      font-size: 16px
    .cancel-billboard-title
      font-weight: 300
      height 50px
      line-height 50px
    .cancel-billboard-sub-title-box
      font-size 16px
      font-weight 300
      padding-left 20px
      margin-bottom 42px
    .cancel-billboard-sub-title
      font-weight: 300
      height: 28px
      line-height: 28px
    .cancel-billboard-select-box
      // width 100%
      height 50px
      margin-bottom 28px
    .textarea-box
      height 329px
      margin-bottom 126px
      > textarea
        height 100%
    // .checkbox-inner
    //   height 40px
    //   margin-bottom 27px
    //   color: #080f31
    //   font-size: 14px
    .input-box.password
      margin-top 26px
      margin-bottom 95px
.sweet-buttons
  .info-set-button
    height 100%

</style>
