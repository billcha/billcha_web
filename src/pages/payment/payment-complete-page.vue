
<template>
  <div class="payment-complete wrapper">
    <div class="payment complete">
      <div class="info-header-title">예약완료</div>
      <div class="product-info-container">
        <div class="header-title">
          상품 정보
        </div>
        <div class="img image-box"  v-bind:style="{ 'background-image': 'url(' + infoData.representativeImgPath + ')' }"></div>
        <div class="detail-product-info-box">
          <div class="title">{{ infoData.title }}</div>
          <div class="desc" :class="{ 'detail' : descDetailShow }" v-html="infoData.desc"></div>
          <div class="detail-view-btn" v-if="infoData.desc.length >= 273" @click="descDetailShow = !descDetailShow">자세히보기</div>
        </div>
      </div>
      <div class="booker-info-container cols">
        <div class="header-title">
          예약자 정보
        </div>
        <div class="booker-info-inner cols">
          <div class="col-4 info-box">
            <span class="info-title">{{ '집행 시작일' |  centerDot }}</span>
            <span class="info-value">{{ $moment(infoData.calendar.startDate).format('YYYY.MM.DD ddd') }}</span>
          </div>
          <div class="col-4 info-box">
            <span class="info-title">{{ '집행 종료일' | centerDot }}</span>
            <span class="info-value">{{ $moment(infoData.calendar.endDate).format('YYYY.MM.DD ddd') }}</span>
          </div>
          <div class="col-4 info-box">
            <span class="info-title">{{ '예약 번호' | centerDot }}</span>
            <span class="info-value">{{ infoData.ordersId }}</span>
          </div>
        </div>
      </div>

      <div class="payment-info-box">
        <div class="header-title">결제 정보</div>
        <div class="payment-info-inner cols" v-if="infoData.methodOfPayment.value === 'vbank'">
          <div class="col-4 info-box">
            <span class="info-title">{{ '결제 수단' | centerDot}} </span>
            <span class="info-value">{{ infoData.methodOfPayment.title }}</span>
          </div>
          <div class="col-4 info-box">
            <span class="info-title">{{ '입금 은행' | centerDot}}</span>
            <span class="info-value">{{ infoData.payment.vbank.name }}</span>
          </div>
          <div class="col-4 info-box">
            <span class="info-title">{{ '입금 금액' | centerDot}}</span>
            <span class="info-value">{{ totalCost | numberComma}}</span>
          </div>
        </div>
        <div class="payment-info-inner cols" v-if="infoData.methodOfPayment.value === 'vbank'">
          <div class="col-4 info-box">
            <span class="info-title">{{ '입금 기한' | centerDot}}</span>
            <span class="info-value">{{ infoData.payment.vbank.date }}</span>
          </div>
          <div class="col-4 info-box">
            <span class="info-title">{{ '계좌 번호' | centerDot}}</span>
            <span class="info-value">{{ infoData.payment.vbank.num }}</span>
          </div>
        </div>
        <div class="payment-info-inner cols" v-else>
          <div class="col-4 info-box">
            <span class="info-title">{{ '결제 수단' | centerDot}}</span>
            <span class="info-value">{{ infoData.methodOfPayment.title }}</span>
          </div>
          <div class="col-4 info-box">
            <span class="info-title">{{ '결제 금액' | centerDot}}</span>
            <span class="info-value">{{ totalCost | numberComma}}</span>
          </div>
        </div>
      </div>
      <div class="payment-desc-box">
        <div class="ic icon-complete margin-center"></div>
        <div class="desc-box" v-html="paymentCompleteDesc"></div>
        <div class="complete-btn-box cols">
          <button class="button light init-page col-6" @click="moveHome">처음화면</button>
          <button class="button primary col-6" @click="moveHistory">예약 내역</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'payment-complete-page',
  components: {
  },
  data () {
    return {
      getQuery: null,
      currentId: null,
      totalCost: null,
      descDetailShow: false,
      test: '',
      infoData: {
        title: '',
        desc: '',
        representativeImgPath: '',
        calendar: { startDate: null, endDate: null },
        ordersId: '',
        methodOfPayment: { value: null },
        payment: {
          vbank: {
            date: null,
            num: null,
            name: null
          }
        }
      }
    }
  },
  computed: {
    getIsMobile () {
      return this.$store.getters.getIsMobile
    },
    // 유저정보
    getUserInfo () {
      return this.$store.getters.getUserInfo
    },
    paymentCompleteDesc () {
      return this.infoData.methodOfPayment.value === 'vbank' ? '무통장 입금이 완료되어야 예약 접수가 완료됩니다.<br>입금 기한 내 입금이 확인되지 않으면 예약이 취소 될 수 있습니다.' : '결제가 완료되었습니다.'
    }
  },
  beforeMount () {
    this.$store.commit('setRootLoading', true)
  },
  mounted () {
    // if (!this.currentId) this.moveHome()
    this.getQuery = this.getJsonFromUrl()
    if (!this.getQuery.id) {
      // this.moveHome()
    } else if (this.getQuery.imp_success === 'true') {
      this.requestBillboardAPI()
      this.requestOrderAPI()
    } else {
      this.deleteOrderAPI()
    }
  },
  methods: {
    requestBillboardAPI () {
      var self = this
      this.$nextTick(function () {
        self.$axios.get('/api/v1/billboards/' + this.getQuery.id).then((respBillboardData) => {
          let respData = respBillboardData.data
          self.infoData.representativeImgPath = '/static/' + respData.representative_img_path
          self.infoData.title = respData.title
          self.infoData.desc = respData.desc
        }).catch(function (error) {
          if (error) {
          }
        }).then(() => {
          self.$store.commit('setRootLoading', false)
        })
      })
    },
    requestOrderAPI () {
      let self = this
      this.$axios.get('/api/v1/orders/' + self.getQuery.orderId).then((repsOrder) => {
        let billings = repsOrder.data.billings[0]
        self.infoData.calendar = {
          startDate: repsOrder.data.ad_start_date,
          endDate: repsOrder.data.ad_end_date
        }
        self.infoData.ordersId = repsOrder.data.id
        self.methodOfPaymentParser(billings)
        self.totalCost = repsOrder.data.total_payment_amount
        if (billings.payment_method === 'vbank') self.vbankParser(billings)
      }).catch(function () {
      }).then(() => {
        self.$store.commit('setRootLoading', false)
      })
    },
    deleteOrderAPI () {
      let self = this
      this.$axios.delete('/api/v1/orders/' + self.getQuery.orderId).then((repsOrder) => {
      }).catch(function () {
      }).then(() => {
        this.moveHome()
        self.$store.commit('setRootLoading', false)
      })
    },
    getJsonFromUrl (url) {
      if (!url) url = location.search
      var query = url.substr(1)
      var result = {}
      query.split('&').forEach(function (part) {
        var item = part.split('=')
        result[item[0]] = decodeURIComponent(item[1])
      })
      return result
    },
    methodOfPaymentParser (data) {
      let methodOfPaymentTitleList = {
        card: '신용카드',
        vbank: '무통장 입금(가상 계좌)',
        regular_payment_card: '정기결제',
        trans: '실시간 계좌이체'
      }
      this.infoData.methodOfPayment = {
        value: data.payment_method,
        title: methodOfPaymentTitleList[data.payment_method]
      }
    },
    vbankParser (data) {
      this.infoData.payment = {
        vbank: {
          date: data.vbank_date,
          num: data.vbank_num,
          name: data.vbank_name
        }
      }
    },
    moveHome () {
      this.$router.push('/')
    },
    moveHistory () {
      this.$router.push('/history')
    }
  },
  filters: {
  }
}
</script>
<style lang="stylus">
defineGrid = 0 1 2 3 4 5 6 7 8 9 10 11 12
.mobile
  .payment-complete.wrapper
    .cols
      for num in defineGrid
        .col-{num}
          width 100%
.payment-complete.wrapper
  width 100%
  height 100%
  display flex
  flex-direction column
  .info-header-title
    padding-left 15px
    padding-top 12px
    height 64px
    line-height 48px
    font-size 16px
    font-weight 500
    color #162348
    border-top solid 4px #080f31
    margin-bottom 58px
  .payment.complete
    display flex
    flex-direction column
    .header-title
      text-align center
      font-size 18px
      font-weight 500
      margin-bottom 15px
    // 상품정보
    .product-info-container
      padding-bottom 37px
      border-bottom solid 17px #f8f8fb
      .image-box
        background-size cover
        width 100%
        height 177px
    .detail-product-info-box
      // height: 100%
      flex: auto
      display: flex
      flex-direction: column
      height: auto
      padding-left 12px
      padding-right 12px
      .title
        height 27px
        line-height 27px
        font-size 18px
        font-weight 500
        padding-top 24px
        padding-bottom 12px
        margin-bottom 0px
        box-sizing content-box
      .desc
        font-size: 16px
        font-weight: 300
        margin-bottom 3px
        overflow: hidden
        transition all 1s ease-in-out
        max-height 48px
        flex auto
        &.detail
          max-height 5000px
      .detail-view-btn
        height 32px
        font-size 16px
        font-weight 300
        text-decoration underline
        cursor pointer
    // 예약자 정보
    .booker-info-container
      height auto
      box-sizing border-box
      padding-bottom 73px
      padding-top 32px
      border-bottom solid 17px #f8f8fb
      display flex
      flex-direction column
      padding-left 12px
      padding-right 18px
      .booker-info-inner
        display flex
        flex-direction column
    .info-box
      display flex
      line-height 40px
    .info-title
      flex 1
      color rgba(8, 15, 49, 0.3)
      font-size 14px
      font-weight normal
    .info-value
      flex 1
      text-align right
      color #080f31
      font-size: 14px
      font-weight: normal
    .payment-info-box
      border none
      border-bottom solid 17px #f8f8fb
      padding 32px 14px 37px 16px
    .payment-info-inner
      min-height 50px
    .payment-desc-box
      padding-top 61px
      padding-bottom 44px
      .icon-complete
        width: 38px
        height: 38px
        background-image url('~assets/images/ic/ic_send_email_complete.png')
      .desc-box
        margin-top 49px
        margin-bottom 78px
        text-align center
      .complete-btn-box
        height 60px
        margin 0 auto
        .button
          width 50%
          height 100%
</style>
