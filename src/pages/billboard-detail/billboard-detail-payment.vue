<template>
  <div class="billboard-detail-payment wrapper">
    <div v-if="getIsMobile" class="mobile-header-title common-inner-padding" >
      예약하기
    </div>
    <div class="product-info-container cols">
      <div class="info-header-title">상품 정보</div>
      <div class="detail-product-inner">
        <div class="col-3 detail-product-image-box">
          <div class="img preview-image-box" v-bind:style="{ 'background-image': 'url(' + infoData.representativeImgPath + ')' }"></div>
        </div>
        <div class="col-9 detail-product-info-box">
          <div class="title">{{ infoData.title }}</div>
          <div class="desc" :class="{ 'detail' : descDetailShow }" v-html="infoData.desc"></div>
          <div class="detail-view-btn" v-if="infoData.desc.length >= 273" @click="descDetailShow = !descDetailShow">자세히보기</div>
        </div>
      </div>
    </div>
    <div class="payment ready" v-if="paymentStatus === 'ready'">
      <div class="booker-info-container cols">
        <div class="info-header-title">예약자 정보</div>
          <div class="booker-info-inner">
            <div class="booker-detail-info-box col-7 cols">
            <div class="col-5 info-box">
              <span class="info-title">{{mobileCenterDot('이름')}}</span>
              <span class="info-value">{{ getUserInfo.name }}</span>
            </div>
            <div class="col-7 info-box">
              <span class="info-title">{{mobileCenterDot('연락처')}}</span>
              <span class="info-value">{{ getUserInfo.phoneNumber }}</span>
            </div>
            <div class="col-12 info-box">
              <span class="info-title">{{mobileCenterDot('이메일')}}</span>
              <span class="info-value">{{ getUserInfo.email }}</span>
            </div>
          </div>
          <div class="col-5 full-height">
            <textarea class="textarea requests-box has-fixed-size" placeholder="요청사항을 입력 해 주세요." v-model="inputData.requestText"></textarea>
          </div>
        </div>
      </div>
      <div class="payment-info-container cols">
        <div class="info-header-title">결제화면</div>
        <div class="col-6 payment-info-inner">
          <div class="info-box">
            <span class="info-title">{{ '집행 시작일' | centerDot }}</span>
            <span class="info-value">{{ $moment(infoData.calendar.startDate).format('YYYY.MM.DD ddd') }}</span>
          </div>
          <div class="info-box">
            <span class="info-title">{{ '집행 종료일' | centerDot }}</span>
            <span class="info-value">{{ $moment(infoData.calendar.endDate).format('YYYY.MM.DD ddd') }}</span>
          </div>
          <div class="info-box">
            <span class="info-title">{{ '총 집행일 수' | centerDot }}</span>
            <span class="info-value">{{ infoData.calendar.count }}일</span>
          </div>
          <div class="info-box payment-method">
            <div class="info-title payment-form-title fl">{{ '결제 수단' | centerDot }}</div>
            <div class="info-value payment-form-box fl">
              <div class="form-box">
                <div class="col-6">
                  <label class="radio-container">
                    {{ inputData.payment.form[0].title }}
                    <input type="radio" v-model="inputData.payment.seletedValue" :value="inputData.payment.form[0].value">
                    <span class="checkmark"></span>
                  </label>
                </div>
                <div class="col-6">
                  <label class="radio-container">
                    {{ inputData.payment.form[1].title }}
                    <input type="radio" v-model="inputData.payment.seletedValue" :value="inputData.payment.form[1].value">
                    <span class="checkmark"></span>
                  </label>
                </div>
              </div>
              <div class="regular-payment-box cols" v-show="inputData.payment.seletedValue === 'regular_payment_card'">
                <div class="regular-payment-item col-12">
                  <span class="text fl">{{'결제일' | centerDot }}</span>
                  <common-select class="fl select-box card date" :options="inputData.payment.select.date.options" :placeholder="inputData.payment.select.date.placeholder" @onSelected="_onChangeSelectDateValue"></common-select>
                </div>
                <div class="regular-payment-item col-12">
                  <span class="text fl">{{'신용카드' | centerDot }}</span>
                  <common-select class="fl select-box card credit-card" :options="inputData.payment.select.card.options" :placeholder="inputData.payment.select.card.placeholder" @onSelected="_onChangeSelectCardValue"></common-select>
                </div>
              </div>
              <div class="form-box">
                <div class="col-6">
                  <label class="radio-container">
                    {{ inputData.payment.form[2].title }}
                    <input type="radio" v-model="inputData.payment.seletedValue" :value="inputData.payment.form[2].value">
                    <span class="checkmark"></span>
                  </label>
                </div>
                <div class="col-6">
                  <label class="radio-container">
                    {{ inputData.payment.form[3].title }}
                    <input type="radio" v-model="inputData.payment.seletedValue" :value="inputData.payment.form[3].value">
                    <span class="checkmark"></span>
                  </label>
                </div>
              </div>
              <!-- <div class="col-6" v-for="item in inputData.payment.form" :key="item.id">
                <label class="radio-container">
                  {{ item.title }}
                  <input type="radio" v-model="inputData.payment.seletedValue" :value="item.value">
                  <span class="checkmark"></span>
                </label>
              </div> -->
            </div>
          </div>
        </div>
        <div class="col-6 payment-info-inner">
          <div class="payment-info-box">
            <div class="inner-box">
              <div class="info-box" v-if="!getIsMobile"><span class="info-title">결제 정보</span></div>
              <div class="info-box product">
                <span class="info-title" v-if="!getIsMobile">{{ mobileCenterDot('상품')}}</span>
                <span class="info-sub-title" v-if="getIsMobile">{{  infoData.price | numberComma | centerDot }} {{ ' x ' + infoData.calendar.count + '일' }}</span>
                <span class="info-sub-title" v-if="!getIsMobile">{{ infoData.price | numberComma }} {{ ' x ' + infoData.calendar.count + '일' }}</span>
                <span class="info-value fr">{{ enforcementCost | numberComma }}</span>
              </div>
              <div class="info-box discount" v-if="infoData.discountPercentage && infoData.discountPercentage > 0">
                <span class="info-title">{{mobileCenterDot('할인')}}</span>
                <span class="info-sub-title">-{{ infoData.discountPercentage }}%</span>
                <span class="info-value fr">{{ enforcementCost * (infoData.discountPercentage / 100) | numberComma }}</span>
              </div>
              <div class="info-box">
                <span class="info-title">{{mobileCenterDot('제작비')}}</span>
                <span class="info-value fr">{{ infoData.adProductionCost | numberComma }}</span>
              </div>
              <div class="info-box">
                <span class="info-title">{{mobileCenterDot('수수료')}}</span>
                <span class="info-value fr">{{ infoData.serviceFees | numberComma }}</span>
              </div>
              <div class="info-box">
                <span class="info-title">{{mobileCenterDot('부가세')}}</span>
                <span class="info-value fr">{{ vatIncludedCost * 0.1 | numberComma }}</span>
              </div>
            </div>
            <div class="payment-price-box">
              <span class="info-title">{{mobileCenterDot('결제금액')}}</span>
              <span class="info-value fr">{{ totalCost | numberComma }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="terms-info-container">
        <div class="info-header-title">약관</div>
        <div class="header-sub-desc" >구매조건 확인 및 결재대행 서비스 약관 (필수) </div>
        <div class="terms-desc-box">
          <strong>[개인정보 수집 및 이용 동의]</strong><br>
          이 약관은 우주비행사가 운영하는 인터넷 서비스를 이용함에 있어
          우주비행사가 운영하는 인터넷 서비스를 이용함에 있어 우주비행사가 운영하는 인터넷 서비스를 이용함에 있어 우주비행사가 운영하는 인터넷 서비스를 이용함에 있어  비행사가 운영하는 인터넷 서비스를 이용함에 있어.
          비행사가 운영하는 인터넷 서비스를 이용함에 있어
          비행사가 운영하는 인터넷 서비스를 이용함에 있어
        </div>
        <div class="accept-terms-box">
          <common-checkbox class="" :index="0" :text="inputData.terms.checkbox.text" :check="inputData.terms.checkbox.check" @onChange="onAddFilterChange"></common-checkbox>
        </div>
      </div>
      <div class="payment-btn-box cols">
        <div class="col-2" style="height: 1px"></div>
        <button class="col-4 button light" @click="cancelPayment">취소</button>
        <button class="col-4 button primary" :disabled="paymentVaildator" @click="requestBillingProgress">결제하기</button>
      </div>
    </div>
    <div class="payment complete" v-else>
      <div class="booker-info-container cols">
        <div class="info-header-title">예약 정보</div>
        <div class="booker-info-inner cols">
          <div class="col-4 info-box">
            <span class="info-title">집행 시작일</span>
            <span class="info-value">{{ $moment(infoData.calendar.startDate).format('YYYY.MM.DD ddd') }}</span>
          </div>
          <div class="col-4 info-box">
            <span class="info-title">집행 종료일</span>
            <span class="info-value">{{ $moment(infoData.calendar.endDate).format('YYYY.MM.DD ddd') }}</span>
          </div>
          <div class="col-4 info-box">
            <span class="info-title">예약 번호</span>
            <span class="info-value">{{ infoData.merchantUid }}</span>
          </div>
        </div>
      </div>

      <div class="payment-info-box">
        <div class="info-header-title">결제 정보</div>
        <div class="payment-info-inner cols" v-if="methodOfPayment.value === 'vbank'">
          <div class="col-4 info-box">
            <span class="info-title">결제 수단</span>
            <span class="info-value">{{ methodOfPayment.title }}</span>
          </div>
          <div class="col-4 info-box">
            <span class="info-title">입금 은행</span>
            <span class="info-value">{{ infoData.payment.vbank.name }}</span>
          </div>
          <div class="col-4 info-box">
            <span class="info-title">입금 금액</span>
            <span class="info-value">{{ totalCost | numberComma}}</span>
          </div>
        </div>
        <div class="payment-info-inner cols" v-if="methodOfPayment.value === 'vbank'">
          <div class="col-4 info-box">
            <span class="info-title">입금 기한</span>
            <span class="info-value">{{ infoData.payment.vbank.date }}</span>
          </div>
          <div class="col-4 info-box">
            <span class="info-title">계좌 번호</span>
            <span class="info-value">{{ infoData.payment.vbank.num }}</span>
          </div>
        </div>
        <div class="payment-info-inner cols" v-else>
          <div class="col-4 info-box">
            <span class="info-title">결제 수단</span>
            <span class="info-value">{{ methodOfPayment.title }}</span>
          </div>
          <div class="col-4 info-box">
            <span class="info-title">결제 금액</span>
            <span class="info-value">{{ totalCost | numberComma}}</span>
          </div>
        </div>
      </div>
      <div class="payment-desc-box">
        <div class="ic icon-complete margin-center"></div>
        <div class="desc-box" v-html="paymentCompleteDesc()"></div>
        <div class="complete-btn-box cols">
          <button class="button light init-page col-6" @click="moveHome">처음화면</button>
          <button class="button primary col-6" @click="moveHistory">예약 내역</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommonCheckbox from 'components/common/common-checkbox'
import CommonSelect from 'components/common/common-select'
const dateList = []
for (let index = 1; index <= 28; index++) {
  dateList.push({ label: index, value: index })
}
export default {
  name: 'billboard-detail-payment-page',
  components: {
    CommonCheckbox,
    CommonSelect
  },
  data () {
    return {
      currentId: null,
      importShopId: null,
      descDetailShow: false,
      paymentStatus: 'ready',
      infoData: {
        title: '',
        status: '',
        categoriesName: '',
        adArea: {
          width: 0,
          height: 0
        },
        adResolution: {
          width: 0,
          height: 0
        },
        address: '',
        originRoadName: '',
        directionRoadName: '',
        managementEndDate: 0,
        minAdScheduleDays: 0,
        shortDesc: '',
        desc: '',
        representativeImgPath: '',
        representativeImg360Path: '',
        calendar: null,
        adProductionCost: null,
        serviceFees: null,
        discountPercentage: null,
        checkDatepickerInputStep: true,
        payment: {
          form: null,
          vbank: {
            name: '',
            num: '',
            date: '',
            holder: ''
          }
        },
        merchantUid: null
      },
      inputData: {
        requestText: '',
        payment: {
          form: [
            {
              title: '정기결제',
              value: 'regular_payment_card'
            },
            {
              title: '실시간 계좌이체',
              value: 'trans'
            },
            {
              title: '신용카드',
              value: 'card'
            },
            {
              title: '무통장입금 (가상계좌)',
              value: 'vbank'
            }
          ],
          select: {
            date: {
              options: dateList,
              placeholder: '일 선택',
              disabled: false
            },
            card: {
              options: [{ label: '새로 발급하기', value: 'newCard' }],
              placeholder: '카드를 선택하세요',
              disabled: false,
              selectedPeriod: null,
              seletedCustomerUid: null
            }
          },
          seletedValue: ''
        },
        terms: {
          checkbox: {
            text: '약관을 읽었으며, 내용에 동의합니다.',
            check: false
          }
        }
      },
      sucessData: {
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
    // 광고판 총기간 금액
    enforcementCost () {
      return this.infoData.price * this.infoData.calendar.count
    },
    // 부가세
    vatIncludedCost () {
      return (this.enforcementCost + this.infoData.adProductionCost + this.infoData.serviceFees) - (this.enforcementCost * (this.infoData.discountPercentage / 100))
    },
    // 총금액
    totalCost () {
      return (this.vatIncludedCost * 0.1) + this.vatIncludedCost
    },
    // 정기결제 혹은 정기결제외 (신용카드, 무통장, 계좌이체) 플래그값
    billingType () {
      return this.inputData.payment.seletedValue !== 'regular_payment_card' ? 'instant' : 'regular'
    },
    // 결제 종류 선택된 값 이름,값
    methodOfPayment () {
      var result = ''
      var self = this
      this.inputData.payment.form.forEach((item) => {
        if (item.value === self.inputData.payment.seletedValue) result = item
      })
      return result
    },
    paymentVaildator () {
      if (this.currentId &&
      this.billingType &&
      this.infoData.calendar.startDate &&
      this.infoData.calendar.endDate &&
      this.inputData.payment.seletedValue &&
      this.inputData.terms.checkbox.check) return false
      else return true
    }
  },
  created () {
    if (typeof this.$route.query.calendar !== 'object') {
      this.$router.push({ path: '/billboard/detail', query: { id: this.$route.query.id } })
    }
  },
  beforeMount () {
    this.init()
  },
  mounted () {
  },
  methods: {
    init () {
      this.currentId = this.$route.query.id
      this.requestText = ''
      this.infoData = {
        title: '',
        status: '',
        categoriesName: '',
        adArea: {
          width: 0,
          height: 0
        },
        adResolution: {
          width: 0,
          height: 0
        },
        address: '',
        originRoadName: '',
        directionRoadName: '',
        managementEndDate: 0,
        minAdScheduleDays: 0,
        shortDesc: '',
        desc: '',
        representativeImgPath: '',
        representativeImg360Path: '',
        calendar: this.$route.query.calendar,
        price: 0,
        adProductionCost: 0,
        serviceFees: 0,
        favoritesCount: 0,
        discountPercentage: 0,
        checkDatepickerInputStep: true,
        payment: {
          form: null,
          vbank: {
            name: '',
            num: '',
            date: '',
            holder: ''
          }
        },
        merchantUid: null
      }
      this.parsingIssuedBillingKeyCards()
      this.requestBillboardDetailData()
      this.requestImportId()
    },
    // 정기결제용 발급카드 파싱
    parsingIssuedBillingKeyCards () {
      var keyCards = this.getUserInfo.issuedBillingKeyCards
      if (!keyCards) return
      var max = this.getUserInfo.issuedBillingKeyCards.length
      for (var i = 0; i < max; i++) {
        var item = keyCards[i]
        this.inputData.payment.select.card.options.push({
          label: item.card_name, value: item.customer_uid
        })
      }
    },
    // 정기결제 새로운 카드 발급시 정기결제 카드리스트 갱신을 위한 API 호출
    requestApiUserInfo () {
      var self = this
      this.$axios.get('/api/v1/auth').then((respUserInfo) => {
        self.$store.commit('setUserInfo', respUserInfo.data)
        self.parsingIssuedBillingKeyCards()
        self.$store.commit('setRootLoading', false)
      }).catch(function (error) {
        // 이유를 알수없는 에러로 GET요청시 상태값이 200이지만 CATCH문으로 콜백이 호출되는
        // 로직을 방어하기 위한 코드
        self.$store.commit('setRootLoading', false)
        if (!error.response) {
          // network error
          alert('유저정보 갱신 실패')
        } else {
          // http status code
          const code = String(error.response.status)
          if (code[0] === 2) {
            self.parsingIssuedBillingKeyCards()
          } else {
            alert('유저정보 갱신 실패')
          }
        }
      })
    },
    // PG사에서 등록 성공후 빌차서버에 정기결제 카드 등록 API
    requestApiRegularCardAdd (customerUid) {
      var self = this
      this.$axios.post('/api/v1/auth/imp_billing_key', { customer_uid: customerUid }).then((repsImpbillingKey) => {
        self.requestApiUserInfo()
      }).catch(function () {
        self.$store.commit('setRootLoading', false)
      })
    },
    // 아임포트를 이용하여 정기결제 카드 등록 API
    requestRegularCardAdd () {
      this.$store.commit('setRootLoading', true)
      var imp = window.IMP
      var self = this
      var merchantUid = 'merchant_uid' + this.$moment().format('YYYYMMDDhhmmss') + this.getUserInfo.id
      var customerUid = 'customer_uid' + this.$moment().format('YYYYMMDDhhmmss') + this.getUserInfo.id
      imp.init(this.importShopId)
      imp.request_pay({ // param
        pg: 'inicis',
        pay_method: 'card', // "card"만 지원됩니다
        merchant_uid: merchantUid, // 빌링키 발급용 주문번호
        customer_uid: customerUid, // 카드(빌링키)와 1:1로 대응하는 값
        name: '최초인증결제',
        amount: 0, // 0 으로 설정하여 빌링키 발급만 진행합니다.
        buyer_email: this.getUserInfo.email,
        buyer_name: this.getUserInfo.name,
        buyer_tel: this.getUserInfo.phoneNumber,
        buyer_addr: '',
        buyer_postcode: ''
      }, function (rsp) { // callback
        if (rsp.success) {
          self.requestApiRegularCardAdd(customerUid)
        } else {
          alert('빌링키 발급 실패')
          self.$store.commit('setRootLoading', false)
        }
      })
    },
    // 빌차서버에 결제 요청 orders 생성
    requestBillingProgress () {
      this._readyBackBillboard()
      this.$store.commit('setRootLoading', true)
      var self = this
      var params = {
        billboard_id: this.currentId,
        billing_type: this.billingType,
        ad_start_date: this.infoData.calendar.startDate,
        ad_end_date: this.infoData.calendar.endDate,
        payment_method: this.inputData.payment.seletedValue,
        consumer_requests: this.inputData.requestText,
        imp_customer_uid: '-', // requried
        payment_schedule_day: 0 // requried
      }
      // 정기 결제시 결제일, 카드정보 입력 및 불필요한 키값 제거
      if (this.billingType === 'regular') {
        params.payment_schedule_day = this.inputData.payment.select.card.selectedPeriod
        params.imp_customer_uid = this.inputData.payment.select.card.seletedCustomerUid
        delete params.billing_type
      }
      this.$axios.post('/api/v1/orders', params).then((repsOrdersId) => {
        self.$axios.get('/api/v1/orders/' + repsOrdersId.data.id).then((repsOrder) => {
          if (self.billingType === 'regular') {
            // 정기결제시 pg 화면으로 이동하지않고 바로 예약완료 페이지로 이동합니다
            self.paymentStatus = 'finsh'
            self.$store.commit('setRootLoading', false)
          } else {
            // 정기결제외에 pg 화면으로 이동
            self.requestPayment(repsOrder.data)
          }
        }).catch(function () {
          self.$store.commit('setRootLoading', false)
        }).then(() => {
        })
      }).catch(function () {
        self.$store.commit('setRootLoading', false)
      }).then(() => {
      })
    },
    requestPayment (orderData) {
      var self = this
      var imp = window.IMP
      var billing = orderData.billings[0]
      var billingId = billing.id
      this.infoData.merchantUid = billingId
      var payInfo = {
        pg: 'html5_inicis.INIBillTst',
        pay_method: billing.payment_method,
        merchant_uid: billingId,
        name: orderData.title,
        amount: billing.payment_amount,
        buyer_email: this.getUserInfo.email,
        buyer_name: this.getUserInfo.name,
        buyer_tel: this.getUserInfo.phoneNumber,
        buyer_addr: '',
        buyer_postcode: ''
      }
      if (this.getIsMobile) payInfo.m_redirect_url = window.location.origin + '/payment/complete?id=' + this.currentId + '&orderId=' + orderData.id
      // 결제종류가 가상계좌시 서버로 부터 발급받은 입금기한 설정
      if (billing.payment_method === 'vbank') payInfo.vbank_due = billing.schedule_at

      imp.init(this.importShopId)
      imp.request_pay(payInfo, function (rsp) {
        self.$store.commit('setRootLoading', false)
        if (rsp.success) {
          // PG 결제 성공
          self.parsingIamportData(rsp)
          self.paymentStatus = 'finsh'
        } else {
          let error = { error: self.$i18n.t('common.imp_request_fail') }
          self.$store.commit('openGlobalAlert', { open: true, error: error })
          self.requestDeleteData(orderData)
          // PG 결제 실패시
        }
      })
    },
    requestDeleteData (orderData) {
      var self = this
      self.$store.commit('setRootLoading', true)
      this.$axios.delete('/api/v1/orders/' + orderData.id).then((resp) => {
        console.log('삭제성공')
      }).catch(function () {
      }).then(() => {
        self.$store.commit('setRootLoading', false)
      })
    },
    parsingIamportData (data) {
      if (data.pay_method === 'vbank') {
        this.infoData.payment.vbank.name = data.vbank_name
        this.infoData.payment.vbank.num = data.vbank_num
        this.infoData.payment.vbank.date = data.vbank_date
        this.infoData.payment.vbank.holder = data.vbank_holder
      }
    },
    requestImportId () {
      var self = this
      this.$axios.get('/api/v1/auth/imp_shop_id').then((respImportShopId) => {
        self.importShopId = respImportShopId.data.id
      }).catch(function () {
      }).then(() => {
      })
    },
    requestBillboardDetailData () {
      var self = this
      self.$store.commit('setRootLoading', true)
      this.$axios.get('/api/v1/billboards/' + this.currentId).then((respBillboardDetailData) => {
        self.setBillboardDetailData(respBillboardDetailData.data)
      }).catch(function (error) {
        if (error) {
        }
      }).then(() => {
        self.$store.commit('setRootLoading', false)
      })
    },
    setBillboardDetailData (data) {
      this.parsingBillboardDetailData(data)
    },
    parsingBillboardDetailData (data) {
      var infoData = this.infoData
      infoData.title = data.title
      infoData.status = data.status
      infoData.price = data.price
      infoData.categoriesName = data.categories[0].name
      infoData.adArea.width = data.ad_area_width
      infoData.adArea.height = data.ad_area_height
      infoData.address = data.address
      infoData.originRoadName = data.origin_road_name
      infoData.adResolution.width = data.ad_resolution_width
      infoData.adResolution.height = data.ad_resolution_height
      infoData.directionRoadName = data.direction_road_name
      infoData.managementEndDate = data.management_end_date
      infoData.minAdScheduleDays = data.min_ad_schedule_days
      infoData.favoritesCount = data.favorites_count
      infoData.shortDesc = data.short_desc
      infoData.desc = data.desc
      infoData.representativeImgPath = '/static/' + data.representative_img_path
      infoData.representativeImg360Path = data.representative_img_360_path
      infoData.adProductionCost = data.ad_production_cost
      infoData.serviceFees = data.service_fees
      infoData.discountPercentage = data.discount_percentage

      // ready closed 상태 광고판 예외처리
      this._readyBackBillboard()

      this.set360Viewer()
      this.mapInit()
    },
    // 광고판 상태값이 준비 닫힌 상태일떄 유효하지않은 접근으로 홈가기
    _readyBackBillboard () {
      if (this.infoData.status === 'ready' || this.infoData.status === 'closed') {
        alert('유효하지 않은 접근입니다.')
        this.moveHome()
      }
    },
    onAddFilterChange (item) {
      this.inputData.terms.checkbox.check = item.check
    },
    // 정기 결제일 선택시 값저장
    _onChangeSelectDateValue (value) {
      this.inputData.payment.select.card.selectedPeriod = value
    },
    _onChangeSelectCardValue (selected) {
      if (selected.value === 'newCard') {
        // 새로운 카드발급시
        this.requestRegularCardAdd()
      } else {
        // 기존 카드
        this.inputData.payment.select.card.seletedCustomerUid = selected.value
      }
    },
    _paserBillingKeyCards (data) {
      var result = []
      if (!data) return result
      for (let index = 0; index < data.length; index++) {
        const item = data[index]
        result.push({ label: item.card_name + ' ' + item.card_number, value: item.customer_uid })
      }
      return result
    },
    cancelPayment () {
      this.$router.push({ path: '/billboard/detail', query: { id: this.$route.query.id } })
    },
    paymentCompleteDesc () {
      return this.methodOfPayment.value === 'vbank' ? '무통장 입금이 완료되어야 예약 접수가 완료됩니다.<br>입금 기한 내 입금이 확인되지 않으면 예약이 취소 될 수 있습니다.' : '결제가 완료되었습니다.'
    },
    moveHome () {
      this.$router.push('/')
    },
    moveHistory () {
      this.$router.push('/history')
    },
    mobileCenterDot (value) {
      if (!value) return ''
      if (!this.getIsMobile) return value
      var str = String(value)
      return '· ' + str
    }
  },
  filters: {
  }
}
</script>
<style lang="stylus">
defineGrid = 0 1 2 3 4 5 6 7 8 9 10 11 12
.mobile
  .billboard-detail-payment.wrapper
    .cols
      for num in defineGrid
        .col-{num}
          width 100%
    > .mobile-header-title
      height 64px
      line-height 48px
      border-top 4px solid #080f31
      color #162348
      opacity 0.9
    // 상품정보
    .product-info-container
      padding 59px 0px 0px 0px
      border-bottom solid 17px #f8f8fb
      box-sizing border-box
    .payment-info-inner
      height auto
      min-height auto
      // 상품가격정보
      .payment-info-box
        .inner-box
          padding 0 15px
          .info-box
            height 50px
            line-height 50px
            &.product, &.discount
              .info-title
                flex 0 0 40px
            &.product
              .info-sub-title
                color rgba(8, 15, 49, 0.3)
                font-size 14px
                font-weight normal
            .info-sub-title
              font-size 12px
              font-weight 300
      //결제금액
      .payment-price-box
        padding 0px 9px 0px 14px
        margin 8px 15px 12px 15px
        border none
        background-color #f8f8f8
        line-height 50px
        height 50px
        .info-title
          color #080f31
    .info-header-title
      font-size 18px
      text-align center
      margin-bottom 15px
    .detail-product-inner
      flex-direction column
      display flex
    .detail-product-image-box
      .preview-image-box
        width 100%
    .detail-product-info-box
      padding 0px 15px
      width calc(100% - 30px)
      box-sizing border-box
      .title
        margin 24px 0px 8px 0px
        padding 0
        font-weight 500
      .desc
        font-size 14px
        margin-bottom 3px
        max-height 43px
      .detail-view-btn
        margin-bottom 37px
        font-size 14px
    // info
    .info-box
      display flex
      height 40px
      line-height 40px
      padding 0px 10px
    .info-value
      text-align right
      flex 1
      font-size 14px
    .info-title
      text-align left
      flex 0 0 92px
      font-size 14px
      margin-right 12px
    // 예약자 정보
    .booker-info-container
      padding 47px 15px 81px 15px
      display flex
      flex-direction column
      height auto
      border-bottom solid 17px #f8f8fb
      box-sizing border-box
      .info-header-title
        height 27px
        line-height 27px
        margin-bottom 35px
        margin-bottom 35px
    .booker-info-inner
      display flex
      flex-direction column
      height auto
      .textarea
        height 162px
    .booker-detail-info-box
      display flex
      flex-direction column
      margin-bottom 15px
    // 결제정보
    .payment-info-container
      padding 48px 15px 55px 15px
      height auto
      display flex
      flex-direction column
      border-bottom solid 17px #f8f8fb
      .info-header-title
        margin-bottom 35px
      .payment-method
        display flex
        flex-direction column
        height auto
        margin-bottom 35px
        .payment-form-title
          flex 0 0 40px
        .info-value.payment-form-box
          display flex
          width 100%
          flex-direction column
          .form-box
            display flex
            width 100%
            > .col-6
              width 50%
          .radio-container
            text-align left
            font-size 14px
    .payment-btn-box.cols
      height 50px
      .button
        width 50%
        height 50px
        margin 0
        font-size 16px
        font-weight normal
    // 약관
    .terms-info-container
      padding-top 48px
      .info-header-title
        padding 0px 15px
      .header-sub-desc
        font-size 14px
        font-weight 300
        color #161b48
        opacity 0.9
        line-height 24px
        padding 0px 15px
        margin-bottom 8px
      .terms-desc-box
        margin 0px 15px
        padding 15px 13px
        overflow-y auto
        height 120px
        font-size 12px
      .accept-terms-box
        .checkbox
          > label
            font-size 14px
            opacity 0.9
            font-weight normal

.billboard-detail-payment.wrapper
  max-width 1180px
  width 100%
  // 공용 레이아웃
  .info-header-title
    font-size: 20px
    font-weight: 500
    margin-bottom 35px
    flex 0 0 30px
  .info-box
    height 50px
    line-height 50px
  .info-title
    font-family: NotoSansCJKkr
    font-size: 16px
    color: rgba(8, 15, 49, 0.3)
    width: 94px
    height: 100%
    margin-right 16px
  .info-value
    color: #080f31
    font-size: 16px
  // 상품정보
  .product-info-container
    height: 236px
    box-sizing content-box
    padding 107px 0px 75px 0px
    border-bottom solid 1px #dedee0
    display: flex
    flex-direction: column
    height: auto
    flex: auto
    > .title
      margin-bottom 35px
      height 29px
      font-size 20px
      font-weight 500
  .detail-product-inner
    // height 171px
    display: flex
    flex: auto
    height: auto
  .detail-product-image-box
    // height: 100%
    flex: auto
    height: 171px
    display: flex
    .preview-image-box
      width: 279px
      height: 100%
      background-size cover
  .detail-product-info-box
    // height: 100%
    flex: auto
    display: flex
    flex-direction: column
    height: auto
    padding-left: 20px
    .title
      height 27px
      line-height 27px
      font-size 18px
      font-weight normal
      padding-top 21px
      padding-bottom 12px
      margin-bottom 0px
    .desc
      font-size: 16px
      font-weight: 300
      margin-bottom 20px
      overflow: hidden
      transition all 1s ease-in-out
      max-height 48px
      flex auto
      &.detail
        max-height 5000px
    .detail-view-btn
      font-size 16px
      font-weight 300
      text-decoration underline
      cursor pointer
  // 예약자 정보
  .booker-info-container
    height 329px
    box-sizing border-box
    padding 52px 0px 65px 0px
    border-bottom solid 1px #dedee0
  .booker-info-inner
    height 148px
  .requests-box
    width 100%
    height 100%
  // 결제화면
  .payment-info-container
    padding 76px 0px 129px 0px
    height 626px
  .payment-form-title
    width 93px
    margin-right 16px
  .payment-form-box
    width calc(100% - 109px)
    .form-box
      height 40px
    // 정기결제 dropdownlist box
    .regular-payment-box
      padding 0px 10px 0px 8px
      width: 100%
      height: 130px
      line-height: 50px
      border-radius: 2px
      background-color: #fff
      border solid 1px #dedee0
      .regular-payment-item
        margin-top 10px
        display flex
        flex-direction row
      .text
        display inline-block
        width 72px
        font-size 16px
        flex 0 0 72px
        text-align left
      .select-box
        margin-left 10px
        flex 0 1 280px
        height 50px
        box-shadow none
        // select박스 디자인가이드 보정
        .multiselect__select
          height 50px
        .multiselect__tags
          height 50px
          border solid 1px #dedee0
        .multiselect__option
          min-height 3.125rem
          line-height 2.125rem
        .multiselect__placeholder
          color rgba(8, 15, 49, 0.3)
        // &.date
        //   width 139px
        // &.credit-card
        //   width 245px
  .payment-info-inner
    min-height 324px
  // 결제정보
  .payment-info-box
    width 100%
    height 100%
    border solid 1px #dedee0
    background-color #ffffff
    .inner-box
      width 100%
      height calc(100% - 71px)
      padding 14px 32px 0px 32px
  .payment-price-box
    padding 0px 32px 0px 32px
    line-height 71px
    height 71px
    border-top solid 1px #dedee0
  //약관내용
  .terms-info-container
    height auto
    margin-bottom 77px
    .info-header-title
      margin-bottom 16px
    .header-sub-desc
      font-size 14px
      font-weight 300
      color #161b48
      opacity 0.9
      line-height 24px
      margin-bottom 8px
    .terms-desc-box
      height: 263px
      border: solid 1px #dedee0
      background-color: #ffffff
      padding 41px 32px 0px 54px
      font-size 16px
      font-weight 300
    .accept-terms-box
      height 40px
      padding-left 20px
      padding-top 6px
  .payment-btn-box
    height 330px
    > .button
      height 70px
      &.light
        margin-right 21px
  .payment.complete
    .booker-info-container
      height 123px
      box-sizing content-box
    .payment-info-box
      border none
      border-bottom solid 1px #dedee0
      margin-bottom 92px
      padding 76px 0px
    .payment-info-inner
      min-height 50px
    .payment-desc-box
      .icon-complete
        width: 38px
        height: 38px
        background-image url('~assets/images/ic/ic_send_email_complete.png')
      .desc-box
        margin-top 49px
        margin-bottom 78px
        text-align center
      .complete-btn-box
        width 66.6%
        height 70px
        margin 0 auto
        margin-bottom 88px
        .button
          height 100%
          border-radius: 4px
          width calc(50% - 10px)
          &.init-page
            margin-right 20px
</style>
