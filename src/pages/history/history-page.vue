<template>
  <div class="history-page wrapper">
    <div v-if="filterData.length > 0">
      <history-card v-for="item in filterData" :data="item" :key="item.id"
      @onPaymentCancel="onPaymentCancel"></history-card>
    </div>
    <div class="full-height" v-else>
      <common-no-data :mode="'history' + currentRouter.id">
      </common-no-data>
    </div>
     <modal-cancel-billboard :data="cancelData" ref="modalCancelBillboard" @refreshHistoryData="refreshHistoryData"></modal-cancel-billboard>
  </div>
</template>

<script>
import HistoryCard from 'components/history/history-card'
import ModalCancelBillboard from 'components/history/modal-cancel-billboard'
import CommonNoData from 'components/common/common-no-data'
// 예약된 : 결제대기, 결제완료, 결제 실패 , 집행중, 환불 처리중
// 지난: 집행완료
// 취소: 결제 취소, 환불 완료
var orderBillingStatusTypes = [
  ['ready', 'paid', 'failed', 'advertising', 'refund_in_progress'],
  ['completed'],
  ['cancelled', 'refund_completed']
]

export default {
  metaInfo () {
    return {
      title: '예약 내역 | 빌차 | BILLCHA',
      htmlAttrs: {
        lang: 'ko-KR',
        dir: 'ltr'
      },
      meta: [
        { charset: 'utf-8' },
        {
          property: 'og:description',
          content: '원하시는 위치의 최적의 광고판을 찾아드립니다.',
          vmid: 'og:description'
        },
        {
          property: 'og:image ',
          content: window.location.origin + '/static/upload/images/email/header_logo.png',
          vmid: 'og:image'
        },
        {
          property: 'og:type',
          content: 'Website',
          vmid: 'og:type'
        },
        {
          property: 'og:sitename',
          content: '빌차 | BILLCHA',
          vmid: 'og:sitename'
        },
        {
          property: 'og:tag',
          content: '광고판, 매체, 인쇄물(종이 및 현수막), LED전광판',
          vmid: 'og:tag'
        },
        {
          property: 'og:cannonical',
          content: window.location.href,
          vmid: 'og:cannonical'
        },
        {
          property: 'og:url',
          content: window.location.href,
          vmid: 'og:url'
        },
        {
          property: 'og:twitter:card',
          content: 'summary_large_image',
          vmid: 'og:twitter:card'
        },
        {
          property: 'og:twitter:description',
          content: '원하시는 위치의 최적의 광고판을 찾아드립니다.',
          vmid: 'og:twitter:description'
        },
        {
          property: 'og:twitter:image',
          content: window.location.origin + '/static/upload/images/email/header_logo.png',
          vmid: 'og:twitter:image'
        },
        {
          property: 'og:facebook:description',
          content: '원하시는 위치의 최적의 광고판을 찾아드립니다.',
          vmid: 'og:facebook:description'
        },
        {
          property: 'og:facebook:image',
          content: window.location.origin + '/static/upload/images/email/header_logo.png',
          vmid: 'og:facebook:image'
        }
      ],
      script: [{
        vmid: 'ldjson-schema',
        innerHTML: `{
          "@context": "http://schema.org",
          "@type" : "WebSite",
          "name" : "빌차",
          "alternateName": "(주)빌차",
          "url": "` + window.location.origin + `"
          "description": "원하시는 위치의 최적의 광고판을 찾아드립니다."
        }`,
        type: 'application/ld+json'
      }],
      __dangerouslyDisableSanitizersByTagID: {
        'ldjson-schema': ['innerHTML']
      }
    }
  },
  name: 'history-page',
  components: {
    HistoryCard,
    ModalCancelBillboard,
    CommonNoData
  },
  props: {
    currentRouter: {
      type: Object
    }
  },
  data () {
    return {
      card: {
        data: []
      },
      cancelData: {}
    }
  },
  computed: {
    filterData () {
      let result = []
      if (this.currentRouter) {
        let self = this
        result = self.card.data.filter((item) => {
          let status = orderBillingStatusTypes[self.currentRouter.id - 1]
          for (let i = 0, max = status.length; i < max; i++) {
            if (item.status === status[i]) return item
          }
        })
      }
      return result
    }
  },
  created () {
    this.requestOrders()
  },
  beforeMount () {
  },
  mounted () {
    console.log(this.filterData)
  },
  methods: {
    routerMove (path) {
      this.$router.push(path)
    },
    refreshHistoryData () {
      this.requestOrders()
    },
    requestOrders () {
      var self = this
      this.$store.commit('setRootLoading', true)
      this.$axios.get('/api/v1/orders').then((respOrders) => {
        self.parserOrdersData(respOrders.data)
      }).catch((error) => {
        if (error) {}
      }).then(() => {
        self.$store.commit('setRootLoading', false)
      })
    },
    parserOrdersData (data) {
      let result = []
      for (let index = 0; index < data.length; index++) {
        const item = data[index]
        result.push({
          image: item.representative_img_path,
          id: item.id,
          title: item.title,
          billingType: item.billing_type,
          startDate: item.ad_start_date,
          endDate: item.ad_end_date,
          address: item.address,
          status: item.status,
          count: this.$moment(item.ad_end_date).diff(this.$moment(item.ad_start_date), 'days'),
          totalPayment: item.total_payment_amount
        })
      }
      this.card.data = result
    },
    onPaymentCancel (data, paymentMethod) {
      this.cancelData = data
      this.cancelData.paymentMethod = paymentMethod
      this.modalCancelBillboardOpen()
    },
    modalCancelBillboardOpen () {
      this.$refs.modalCancelBillboard.open()
    },
    modalCancelBillboardClose () {
      this.$refs.modalCancelBillboard.close()
    }
  },
  beforeRouteLeave (to, from, next) {
    next()
  }
}
</script>
<style lang="stylus">
.history-page.wrapper
  height 100%
  max-width 1180px
  box-sizing content-box
  display flex
  flex 1 0 0%
  flex-direction column
  // .inner
</style>
