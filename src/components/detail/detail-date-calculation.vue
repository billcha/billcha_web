<template>
  <div class="price-calc-container col-4">
    <div class="datepicker-input-box">
      <div class="header-title-box">
        <span class="title">광고비 계산기</span>
        <span class="ic money"></span>
      </div>
      <div class="contents">
        <div :class="[nextStep ? 'step-2' : 'step-1']">
          <div class="title" v-if="!nextStep">날짜를 입력하고 정확한 요금을 확인해보세요!</div>
          <div class="price-title-box relative" v-else>
            <span class="price relative">{{ navPriceUnit.price | numberComma }}</span>
            <span class="unit relative">/ {{ navPriceUnit.label }}</span>
            <div class="unit-btn-inner relative" @click="changePriceUnitType('nav')">
              <div class="unit-btn-box vertical-center">
                <span class="ic unit-icon"></span>
                <span class="text">{{ navPriceUnit.btnLabel }}</span>
              </div>
            </div>
          </div>
          <div class="desc" v-html="infoData.address"></div>
          <div class="datepicker" id="datepicker-button-trigger">
            <common-calendar-inline :startDate="infoData.calendar.startDate" :endDate="infoData.calendar.endDate" :position="'right'"
              :minAdScheduleDays="infoData.minAdScheduleDays" :detailMode="true" :trigger="trigger" :isApplyInputDate="isApplyInputDate"
              :disabled="infoData.status !=='open'"
               @setFilterDate="setFilterDate" @openPopup="_openPopup" ref="commonCalendarInline"></common-calendar-inline>
          </div>
          <div class="bill-inner" v-if="nextStep">
            <div class="bill-box cols">
              <div class="key col-6">{{ infoData.price | numberComma | centerDot }} {{ ' x ' + infoData.calendar.count + '일' }}</div>
              <div class="value col-6">{{ enforcementCost | numberComma }}</div>
            </div>

            <div class="bill-box cols discount" v-if="infoData.discountPercentage && infoData.discountPercentage > 0">
              <div class="key col-6">{{ '할인율(-' + infoData.discountPercentage + '%)' | centerDot}}</div>
              <div class="value col-6">{{ enforcementCost * (infoData.discountPercentage / 100) | numberComma }}</div>
            </div>
            <div class="bill-box cols">
              <div class="key col-6">{{ '제작비' | centerDot}}</div>
              <div class="value col-6">{{ infoData.adProductionCost | numberComma }}</div>
            </div>
            <div class="bill-box cols">
              <div class="key col-6">{{ '수수료' | centerDot }}</div>
              <div class="value col-6">{{ infoData.serviceFees | numberComma }}</div>
            </div>
            <div class="bill-box cols">
              <div class="key col-6">{{ '부가세' | centerDot}}</div>
              <div class="value col-6">{{ vatIncludedCost * 0.1 | numberComma }}</div>
            </div>
            <div class="bill-box cols total">
              <div class="key col-6">{{ '총 합계' | centerDot}}</div>
              <div class="value col-6">{{ totalCost | numberComma }}</div>
            </div>
          </div>
        </div>
      </div>
      <button class="button date-input-btn" :class="[ nextStep ? 'primary' : 'light' ]" @click="inputDatepicker" :disabled="(nextStep && (!infoData.calendar.startDate || !infoData.calendar.endDate)) || infoData.status !=='open'">
        {{ nextStep ? '예약하기' : '날짜입력' }}
      </button>
    </div>
    <div class="save-box" v-if="!getIsMobile">
      <span class="save-icon-box" @click="requsetFavoriteBillboard">
        <span class="ic save" :class="{ 'active' : infoData.favoriteCheck }"></span>
        <span class="text">저장</span>
      </span>
      <span class="text">현재 {{ infoData.favoritesCount }}명이 이 상품을 저장하였습니다</span>
    </div>
  </div>
</template>
<script>
import CommonCalendarInline from 'components/common/common-calendar-inline'
const monthDays = 31

export default {
  name: 'detail-date-calculation',
  components: {
    CommonCalendarInline
  },
  props: {
    isInfoData: {
      type: Object,
      default () {
        return {}
      }
    },
    currentId: {
      default: null
    },
    isApplyInputDate: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    getIsMobile () {
      return this.$store.getters.getIsMobile
    },
    getUserInfo () {
      return this.$store.getters.getUserInfo
    },
    nextStep () {
      return ((this.infoData.calendar.startDate && this.infoData.calendar.endDate)) || this.getIsMobile
    },
    currentVideoSelect () {
      let self = this
      let result = this.tabs.data.filter((tab) => {
        return tab.value === self.video.select.day.seletedValue.value
      })[0]
      console.log(result)
      return result
    },
    monthPrice () {
      return this.infoData.price * 31
    },
    enforcementCost () {
      return this.infoData.price * this.infoData.calendar.count
    },
    vatIncludedCost () {
      return (this.enforcementCost + this.infoData.adProductionCost + this.infoData.serviceFees) - (this.enforcementCost * (this.infoData.discountPercentage / 100))
    },
    totalCost () {
      return (this.vatIncludedCost * 0.1) + this.vatIncludedCost
    },
    headerPriceUnit () {
      return this.changePriceUnitObject(this.priceUnit.header)
    },
    navPriceUnit () {
      return this.changePriceUnitObject(this.priceUnit.nav)
    }
  },
  data () {
    return {
      infoData: this.isInfoData,
      trigger: false,
      priceUnit: {
        header: 'month',
        nav: 'month'
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
    applyDate () {
      let self = this
      self.$nextTick(() => {
        self.$refs.commonCalendarInline._applyDate()
      })
      // self.$nextTick(() => {
      //   self.$refs.commonCalendarInline.$refs.dateContextPopup.showHideContextPopup()
      //   self.$refs.commonCalendarInline._applyDate()
      // })
    },
    changePriceUnitType (type) {
      this.priceUnit[type] = this.priceUnit[type] === 'month' ? 'day' : 'month'
    },
    onInput (value) {
      this.$emit('onSelected', value)
    },
    changePriceUnitObject (type) {
      var result
      if (type === 'month') {
        result = {
          price: this.infoData.price * monthDays,
          label: '1개월',
          btnLabel: '월'
        }
      } else {
        result = {
          price: this.infoData.price,
          label: '1일',
          btnLabel: '일'
        }
      }
      return result
    },
    setFilterDate (date) {
      this.infoData.calendar.startDate = date.start
      this.infoData.calendar.endDate = date.end
      this.infoData.calendar.count = date.count
      this.$emit('onChangeCalendar', this.infoData.calendar)
    },
    inputDatepicker () {
      if (this.nextStep) {
        if (this.getUserInfo.name) this.$router.push({ path: '/billboard/payments', query: { id: this.currentId, calendar: this.infoData.calendar } })
        else this.$root.$emit('loginPopup', true)
      } else {
        // this.infoData.checkDatepickerInputStep = false
        this.trigger = true
        this.$nextTick(() => {
          this.$refs.commonCalendarInline.$refs.dateContextPopup.showHideContextPopup()
        })
      }
    },
    _unlockBody () {
      this.$nextTick(() => {
        document.body.style.height = ''
        document.body.style.overflow = ''
      })
    },
    _openPopup () {
      this._unlockBody()
    },
    requsetFavoriteBillboard () {
      if (!this.getUserInfo.name) {
        this.$root.$emit('loginPopup', true)
      } else {
        var self = this
        if (!this.infoData.favoriteCheck) {
          this.$axios.post('/api/v1/favorite_billboards', { billboard_id: this.currentId }).then((respFavoriteBillboardData) => {
            self.infoData.favoritesCount++
            self.infoData.favoriteCheck = true
          }).catch(function (error) {
            if (error) {
            }
          }).then(() => {
          })
        } else {
          this.$axios.delete('/api/v1/favorite_billboards', { data: { billboard_id: this.currentId } }).then((respFavoriteBillboardData) => {
            self.infoData.favoritesCount--
            self.infoData.favoriteCheck = false
          }).catch(function (error) {
            if (error) {
            }
          }).then(() => {
          })
        }
      }
    }
  },
  watch: {
    isInfoData (newVal) {
      this.infoData = newVal
    }
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
// 광고비 계산기
.root-layout-wrapper
  .price-calc-container
    width calc(33.3% - 20px)
    .datepicker-input-box
      border solid 1px #ececf4
      > .header-title-box
        border-bottom solid 1px #ececf4
        text-align center
        height 83px
        .title
          vertical-align top
          line-height 83px
          display inline-block
          height 100%
        .ic.money
          display inline-block
          margin-left 7px
          width 25px
          height 100%
          background-image url('~assets/images/ic/ic_money.png')
      > .contents
        .desc
          font-size 16px
          font-weight normal
          margin-bottom 45px
          text-align center
        .datepicker
          width 100%
          height 50px
          margin-bottom 45px
          .filter-input
            height 50px
        .sub-desc
          text-align center
          font-size 14px
          font-weight 300
          margin-bottom 26px
        .step-1
          padding 40px 32px 0px 32px
          .title
            font-size 16px
            margin-bottom 17px
        .step-2
          padding 22px 32px 0px 32px
          .datepicker
            width 100%
            height 50px
            margin-bottom 20px
          .sub-desc
            text-align center
            font-size 14px
            font-weight 300
            margin-bottom 9px
          .price-title-box
            height 36px
            line-height 36px
            text-align center
            padding-bottom 23px
            box-sizing content-box
            .price
              font-size: 24px
              font-weight: 500
              vertical-align top
            .unit
              margin-left 4px
              font-size: 14px
              font-weight: 500
              vertical-align top
            .text
              padding-left 14px
              line-height: 26px
          .bill-inner
            margin-bottom 30px
            .bill-box
              width 100%
              height 50px
              line-height 50px
              &.total
                border-radius 2px
                background-color #f8f8fb
                .key,
                .value
                  color #080f31
              &.discount
                .key
                  padding-left 10px
                .value
                  color #fa6400
              .key
                font-size 14px
                color: rgba(8, 15, 49, 0.3)
              .value
                text-align right
                font-size 14px
                font-weight normal

      .date-input-btn
        width 100%
        height 70px
        border-radius 4px
        font-size 20px
    > .save-box
      margin-top 17px
      .save-icon-box
        display inline-block
        width 56px
        height 26px
        padding 0px 7px
        border-radius 2px
        border solid 1px #eeeeee
        background-color #ffffff
        cursor pointer
        .ic.save
          display inline-block
          width: 14px
          height: 100%
          background-image url('~assets/images/ic/ic_save.png')
          &.active
            background-image url('~assets/images/ic/ic_active_save.png')
      .text
        display inline-block
        vertical-align top
        font-size 12px
        font-weight 300
        height 26px
        line-height 26px
</style>
