<template>
<div class="history-card-wrapper flex-column">
  <div class="container columns is-variable" @click="clickCard">
    <div class="img image-box column is-2" v-bind:style="{ 'background-image': 'url(/static/' + data.image + ')' }">
    </div>
    <div class="card-box column is-10 is-gapless columns flex-column">
      <div class="column billboard-info-box is-12">
        <div class="reservation-number">{{ data.id }}</div>
        <div class="status">{{ statusText }}</div>
      </div>
      <div class="count-price-box column is-7" v-if="getIsMobile">
        <span class="price">{{ data.totalPayment | numberComma }}</span>
        <span class="day-count">{{ data.count + '일' }}</span>
      </div>
      <div class="column title is-12" v-if="!getIsMobile">{{ data.title }}</div>
      <div class="column date is-12">{{ $moment(data.startDate).format('YYYY.MM.DD') + '~' + $moment(data.endDate).format('YYYY.MM.DD') }}</div>
      <div class="column is-gapless address-price-box is-12 columns">
        <div class="column address is-5">
          {{ data.address }}
        </div>
        <div class="count-price-box column is-7" v-if="!getIsMobile">
          <span class="day-count">{{ data.count + '일' }}</span>
          <span class="price">{{ data.totalPayment | numberComma }}</span>
        </div>
      </div>
      <div class="detail-btn" v-if="getIsMobile">자세히 보기</div>
    </div>
  </div>
  <div class="reservation-info-container flex-column" v-if="getIsMobile" v-show="showHide">
    <div class="header">
      <div class="title">예약 정보</div>
    </div>
    <div class="content">
      <div class="reservation-box">
        <div class="item-box">
          <div class="item-title">{{ '예약 일자' | centerDot }}</div>
          <div class="item-value">{{ $moment(listData.scheduleAt).format('YYYY-MM-DD HH:MM') }}</div>
        </div>
        <div class="item-box">
          <div class="item-title">{{ '예약 번호' | centerDot }}</div>
          <div class="item-value">{{ listData.orderId }}</div>
        </div>
        <div class="item-box execution-period">
          <div class="item-title">{{ '집행 기간' | centerDot }}</div>
          <div class="item-value">
            <div>
              <span>{{ $moment(listData.startDate).format('YYYY-MM-DD ddd') }}</span>
              <span class="">{{'-'}}</span>
              <span>{{ $moment(listData.endDate).format('YYYY-MM-DD ddd') }}</span>
            </div>
            <div>
              {{ listData.count + '일' }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="payment-info-container flex-column" v-show="showHide">
    <div class="header">
      <div class="title">결제정보</div>
      <div class="ic icon-close"  v-if="!getIsMobile" @click="clickCard"></div>
    </div>
    <div class="contents">
      <div class="payment-box">
        <div class="item-box">
          <div class="item-title">{{ '결제 수단' | centerDot }}</div>
          <div class="item-value">{{ paymentMethodText }}</div>
        </div>
        <div class="item-box">
          <div class="item-title">{{ '입금 금액' | centerDot }}</div>
          <div class="item-value">{{ listData.totalPayment | numberComma }}</div>
        </div>
        <div class="item-box" v-if="data.billingType === 'regular'">
          <div class="item-title">{{ '결제일' | centerDot }}</div>
          <div class="item-value">{{ 10 + '일' }}</div>
        </div>
        <div class="payment-at" v-if="data.billingType === 'regular'">
          <ul>
            <li v-for="item in billingsData" :key="item.id" class="item-box cols">
              <div class="col-6 date">{{ $moment(item.scheduleAt).format('YYYY.MM.DD') }}</div>
              <div class="col-6 price">{{ item.paymentAmount | numberComma }}</div>
            </li>
          </ul>
        </div>
        <div class="item-box" v-if="data.billingType === 'regular'">
          <div class="item-title">{{ '카드 정보' | centerDot }}</div>
          <div class="item-value">
            {{ listData.totalPayment | numberComma }}
          </div>
        </div>
        <div class="item-box" v-if="listData.paymentMethod === 'vbank'">
          <div class="item-title">{{ '입금 기한' | centerDot }}</div>
          <div class="item-value">{{ $moment(listData.scheduleAt).format('YYYY.MM.DD ddd') }}</div>
        </div>
        <div class="item-box" v-if="listData.vbankName">
          <div class="item-title">{{ '입금 은행' | centerDot }}</div>
          <div class="item-value">{{ listData.vbankName }}</div>
        </div>
        <div class="item-box" v-if="listData.vbankNum">
          <div class="item-title">{{ '계좌 번호' | centerDot }}</div>
          <div class="item-value">{{ listData.vbankNum }}</div>
        </div>
      </div>
      <div class="payment-info-box">
        <div class="payment-box">
          <div class="item-box" v-if="!getIsMobile"><span class="item-title">{{ mobileCenterDot('결제 정보') }}</span><span class="item-value"></span></div>
          <div class="item-box product">
            <span class="item-title" v-if="!getIsMobile">{{ mobileCenterDot('상품')}}</span>
            <span class="item-sub" v-if="getIsMobile">{{  listData.price | numberComma | centerDot }} {{ ' x ' + listData.count + '일' }}</span>
            <span class="item-sub" v-if="!getIsMobile">{{ listData.price | numberComma }} {{ ' x ' + listData.count + '일' }}</span>
            <span class="item-value fr">{{ enforcementCost | numberComma }}</span>
          </div>
          <div class="item-box" v-if="listData.discountPercentage && listData.discountPercentage > 0">
            <span class="item-title">{{ mobileCenterDot('할인') }} </span>
            <span class="item-sub">-{{ listData.discountPercentage }}%</span>
            <span class="item-value">{{ listData.discountPrice | numberComma }}</span>
          </div>
          <div class="item-box">
            <span class="item-title">{{ mobileCenterDot('제작비') }}</span>
            <span class="item-value">{{ listData.adProductionCost | numberComma }}</span>
          </div>
          <div class="item-box">
            <span class="item-title">{{ mobileCenterDot('수수료') }}</span>
            <span class="item-value">{{ listData.serviceFees | numberComma }}</span>
          </div>
          <div class="item-box">
            <span class="item-title">{{ mobileCenterDot('부가세') }}</span>
            <span class="item-value">{{ listData.superTax | numberComma }}</span>
          </div>
        </div>
        <div class="payment-price-box">
          <span class="item-title">결제금액</span>
          <span class="item-value">{{ listData.totalPayment | numberComma }}</span>
        </div>
      </div>
      <div class="payment-cancel-box" v-if="cancelButtonShow">
        <div class="cancel" @click="_onPaymentCancel">{{ cancelText }}</div>
        <div class="hide" v-if="getIsMobile" @click="clickCard">접어서 보기</div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'common-card',
  components: {
  },
  props: {
    data: {
      type: Object,
      default () {
        return {
        }
      }
    },
    show: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number
    }
  },
  computed: {
    getIsMobile () {
      return this.$store.getters.getIsMobile
    },
    statusText () {
      var result = {
        ready: '결제대기',
        paid: '결제완료',
        failed: '결제 실패',
        advertising: '집행중',
        refund_in_progress: '환불 처리중',
        completed: '집행완료',
        cancelled: '결제 취소',
        refund_completed: '환불 완료'
      }
      return result[this.data.status]
    },
    cancelText () {
      var text = '예약 취소'
      if (this.data.status === 'paid' || this.data.status === 'advertising') {
        text = '환불하기'
      }
      return text
    },
    cancelButtonShow () {
      if (this.data.status === 'ready' || this.data.status === 'paid' || this.data.status === 'failed' || this.data.status === 'advertising') return true
      return false
    },
    enforcementCost () {
      return this.listData.price * this.listData.count
    },
    paymentMethodText () {
      var result = {
        card: '신용카드',
        trans: '실시간 계좌이체',
        regular_payment_card: '정기결제',
        vbank: '무통장입금 (가상계좌)'
      }
      return result[this.listData.paymentMethod]
    }
  },
  data () {
    return {
      showHide: this.show,
      listData: this.data,
      billingsData: []
    }
  },
  created () {
    this.requestOrderDetailData()
  },
  beforeMount () {
  },
  mounted () {
  },
  methods: {
    clickCard () {
      this.showHide = !this.showHide
    },
    requestOrderDetailData () {
      var self = this
      this.$store.commit('setRootLoading', true)
      this.$axios.get('/api/v1/orders/' + this.data.id).then((resp) => {
        self.parserOrdersData(resp.data)
        self.$store.commit('setRootLoading', false)
      })
    },
    parserOrdersData (data) {
      let result = []
      let billingsData = []
      for (let index = 0; index < data.billings.length; index++) {
        const item = data.billings[index]
        result = {
          image: null,
          orderId: data.id,
          id: item.id,
          title: item.title,
          startDate: data.ad_start_date,
          endDate: data.ad_end_date,
          address: item.address,
          status: item.status,
          count: this.$moment(data.ad_end_date).diff(this.$moment(data.ad_start_date), 'days'),
          totalPayment: data.total_payment_amount,
          price: item.price,
          adProductionCost: item.ad_production_cost,
          serviceFees: item.service_fees,
          superTax: item.super_tax,
          paymentMethod: item.payment_method,
          paymentAmount: item.payment_amount,
          discountPercentage: item.discount_percentage,
          discountPrice: item.discount_price,
          vbankAccount: item.vbank_account,
          scheduleAt: item.schedule_at,
          vbankCode: item.vbank_code,
          vbankName: item.vbank_name,
          vbankNum: item.vbank_num
        }
        billingsData.push(result)
      }
      this.billingsData = billingsData
      this.listData = result
    },
    _onPaymentCancel () {
      this.$emit('onPaymentCancel', this.data, this.listData.paymentMethod)
    },
    mobileCenterDot (value) {
      if (!value) return ''
      if (this.getIsMobile === false) return value
      var str = String(value)
      return '· ' + str
    }
  },
  watch: {
    data: {
      handler (newValue) {
      },
      deep: true
    }
  },
  filters: {
  }
}
</script>

<style lang="stylus">
.mobile
  .history-card-wrapper
    .container
      flex: 1 0 164px
      border none
      border-bottom solid 1px #ececf4
      justify-content center
      align-items center
      padding 0 15px
      margin-bottom 0px
      box-shadow none
      .card-box
        order 0
        padding 0px
      .image-box
        order 1
        height 100px
        flex 0 0 130px
        border-radius 4px
      .billboard-info-box
        justify-content flex-start
        order 0
        > .reservation-number
          order 1
          font-size 10px
          font-weight 300
          color #6e6e78
        > .status
          order 0
          width 66px
          height 17px
          border-radius 2px
          border solid 1px #080f31
          font-size 10px
          font-weight 500
          color #080f31
          line-height 15px
          margin-right 9px
      .count-price-box
        text-align left
        margin-bottom 13px
        margin-top 2px
        .price
          font-size 18px
          margin-right 9.5px
        .day-count
          font-size 14px
          font-weight 300
          color #6e6e78
      .date
        font-size 11px
        font-weight normal
        flex 0 0 17px
        line-height 17px
      .address-price-box
        margin-bottom 10px
        .address
          font-size 10px
          font-weight 300
          color #6e6e78
          flex 0 0 15px
          line-height 15px
      .detail-btn
        text-decoration underline
        font-size 11px
        font-weight normal
    // 상세정보 공용
    .item-box
      display flex
      flex 0 0 40px
      line-height 40px
      align-items center
      justify-content center
      margin-left 24px
      margin-right 25px
    .item-title
      flex 1 0 60px
      color: rgba(8, 15, 49, 0.3)
      font-weight: normal
      font-size 14px
    .item-value
      flex 1 0 200px
      font-size: 14px
      text-align right
    .item-sub
      flex 1 0 63px
      font-size 14px
    // 예약정보 집행기간
    .execution-period
      &.item-box
        flex 0 0 40px
        align-items flex-start
        line-height normal
        margin-top 10px
    // 모바일 전용 예약 정보
    .reservation-info-container
      margin-top 24px
      border-bottom solid 1px #dedee0
      padding-bottom 24px
      .header
        height 19px
        line-height 19px
        margin-bottom 6px
        margin-left 24px
        .title
          font-size 13px
          font-weight 500
    .payment-info-container
      border none
      flex 1 1 auto
      > .header
        flex 0 0 37px
        line-height 37px
        .title
          line-height 37px
          font-size 13px
          font-weight 500
          margin 0
          padding-left 24px
      > .contents
        .item-box
          display flex
          align-items center
          justify-content center
          margin-left 24px
          margin-right 25px
          flex 50px
          line-height 50px
          &.product
            .item-sub
              color: rgba(8, 15, 49, 0.3)
        .item-title
          flex 1 0 0
          color: rgba(8, 15, 49, 0.3)
          font-weight: normal
          font-size 14px
        .item-value
          flex 1 1 79px
          font-size: 14px
          text-align right
        .payment-box
          padding 0px
        > .payment-info-box
          flex 1 0 316px
          .payment-box
            padding 0px
          .payment-price-box
            border none
            padding 0px 10px 0px 14px
            margin 0px 13px 12px 16px
            flex 0 0 50px
            line-height 50px
            border-radius 2px
            background-color #f8f8fb
            > .item-title
              color #080f31
        .payment-cancel-box
          .cancel
            margin-top 12px
            font-size 14px
          .hide
            margin-top 43px
            text-decoration underline
            font-size 11px
            font-weight normal
.history-card-wrapper
  // width 100%
  // flex: 1
  flex 0 1 auto
  text-align left
  position relative
  display flex
  margin-bottom 23px
  .container
    cursor pointer
    display flex
    // width 100%
    flex: 1 0 200px
    border-radius: 2px
    box-shadow: 1px 2px 4px 0 rgba(236, 234, 243, 0.5)
    border: solid 1px #ececf4
    background-color: #ffffff
    box-sizing border-box
    .image-box
      height 200px
      background-size cover
      background-color gray
    .card-box
      padding 24px 31px 0px 22px
    .billboard-info-box
      flex 0 0 21px
      display flex
      justify-content space-between
      > .reservation-number
        font-size 13px
        color #6e6e78
      > .status
        text-align right
        width: 78px
        height: 24px
        text-align center
        line-height 22px
        border-radius: 2px
        border: solid 1px #ececf4
        color: rgba(8, 15, 49, 0.3)
        font-size: 12px
        font-weight: normal
    .title
      font-size 18px
      font-weight normal
      flex 0 0 27px
      line-height 27px
      margin-bottom 37px
    .date, .address-price-box
      font-size 16px
      font-weight 300
      flex 0 0 24px
      line-height 24px
    .date
      margin-bottom 2px
    .count-price-box
      text-align right
    .day-count
      font-size: 24px
      font-weight: 300
    .price
      font-size: 24px
      font-weight: normal

  .payment-info-container
    display flex
    width 100%
    flex: 1 0 522px
    border-radius: 2px
    border: solid 1px #e3e3e7
    border-top solid 4px #545151
    > .header
      flex 0 0 60px
      display flex
      justify-content space-between
      .title
        flex: 0 0 280px
        margin: 0
        margin-top: 12px
        padding-left: 32px
        line-height 48px
      .icon-close
        background-image url('~assets/images/ic/ic_close.png')
        flex: 0 0 24px
        height: 60px
        background-position: right
        background-size: 24px auto
        margin-right 23px
        cursor pointer
    > .contents
      flex 1 0 auto
      flex-wrap wrap
      display flex
      .payment-box
        flex 1
        padding-left 35px
        display flex
        flex-direction column
        .item-box
          display flex
          flex 0 0 50px
          align-items center
          justify-content center
          .item-title
            flex 1 1 70px
            margin-right 0px
          .item-value
            flex 1 1 217px
            font-size: 16px
      .item-box
        display flex
        flex 0 0 50px
        align-items center
        justify-content center
      .item-title
        flex 0 1 auto
        margin-right 9px
        color: rgba(8, 15, 49, 0.3)
        font-size: 16px
        font-weight: normal
      .item-value
        flex 1
        font-size: 16px
      .payment-info-box
        flex 0 0 480px
        border: solid 1px #dedee0
        background-color: #ffffff
        >.payment-box
          padding 14px 32px 0px 32px
          > .item-box
            display flex
            flex 0 0 50px
            align-items center
            justify-content center
            > .item-title
              flex 0 1 auto
              margin-right 9px
              color: rgba(8, 15, 49, 0.3)
              font-size: 16px
              font-weight: normal
            > .item-value
              flex 1
              font-size: 16px
        .item-box
          justify-content: space-between
        .item-value
          text-align right
        .payment-price-box
          display flex
          justify-content space-between
          border-top solid 1px #dedee0
          padding 14px 32px 14px 32px
      .payment-at
        border solid 1px #dedee0
        background-color #ffffff
        margin-right 16px
        padding 10px
        .item-box
          height 32px
          line-height 32px
        .date
          font-size 14px
          font-weight normal
          color rgba(8, 15, 49, 0.3)
        .price
          font-size 14px
          font-weight normal
          text-align right
      .payment-cancel-box
        display flex
        flex 0 0 100%
        text-align center
        justify-content center
        height 92px
        align-items center
        flex-direction column
        .cancel
          font-size: 16px
          font-weight: 500
          text-align: center
          text-decoration underline
          cursor pointer
</style>
