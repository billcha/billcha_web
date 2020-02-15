<template>
<div class="common-calendar-inline-wrapper filter-item date">
  <!-- <common-context :mode="'fullModal'" :position="'left'" :top="42" :width="660" :height="585" :modalWidth="'80%'" :text="'날짜'" ref="dateContextPopup"> -->
  <common-context :mode="'outside'" :position="position" :top="42" :width="660" :height="624" :mobileHeight="571" :mobileMaxHeight="630"
    ref="dateContextPopup" @openPopup="_openPopup" @closePopup="_closePopup" :className="'calendar-modal'" :disabled="disabled">
    <div class="filter-input" v-if="!getIsMobile || detailMode">
      <div class="input input-date" :class="{'is-active' : applyInputDate}" :disabled="disabled">{{ inputDateLabel }}</div>
      <span class="ic icon-date" :class="{'is-active' : applyInputDate}"></span>
    </div>
    <div class="filter-input" v-else>
      <div class="calendar-filter-button" :class="{'is-active' : applyInputDate}">날짜</div>
    </div>
    <div class="filter-date-popup" slot="contents">
      <div class="filter-header-inner">
        <div class="header-title">광고기간</div>
        <div class="sub-title-box cols" v-if="!getIsMobile">
          <span class="col-6 header-sub-title">{{ periodLabel() }}</span>
          <span class="col-6 count">{{ countLabel }}</span>
        </div>
        <div class="sub-title-box" v-else>
          <span class="header-sub-title">{{ periodLabel() }}</span>
          <span class="count">{{ countLabel }}</span>
        </div>
      </div>
      <common-calendar ref="filterCalendar" :minAdScheduleDays="minAdScheduleDays" :startDate="calendarStartDate" :endDate="calendarEndDate" @dateOneSelected="dateOneSelected" @dateTwoSelected="dateTwoSelected"
        :trigger="trigger"/>
      <div class="select-date-box">
        <span class="title fl" v-if="getIsMobile" v-show="calendarStartDate" @click="selectPeriod">광고 기간 선택</span>
        <div class="select-box fl" v-else>
          <common-select class="select-box" :value="selectedValue" :options="select.options" :placeholder="select.placeholder" :disabled="checkStartDate" @onSelected="_onChangeValue"></common-select>
        </div>
      </div>
      <apply-clear-button :clearText="modalInfo.clearText" :applyText="modalInfo.applyText" @clear="_clearDate" @apply="_applyDate" ></apply-clear-button>
      <sweet-modal
        class="modal-select"
        ref="modalSelect"
        :enable-mobile-fullscreen="true"
        :hide-close-button="false"
        :blocking="true"
        :width="'100%'"
        :mobileHeight="571"
        :mobileMaxHeight="630"
        @close="hideSelectPopup"
        v-if="getIsMobile"
        >
          <div slot="loading" v-common-loading-panel="modal.loading.selectLoadingShow"></div>
          <div class="footer-btn-box" slot="button">
            <div class="cols">
              <button class="select-button col-6 button light" @click="closeSelectMode" >돌아가기</button>
              <button class="select-button col-6 button primary" @click="applySelectPeriod">적용</button>
            </div>
          </div>
          <div class="select-wrapper form cols">
            <div class="filter-header-inner">
              <div class="header-title">광고기간</div>
              <div class="sub-title-box cols" v-if="!getIsMobile">
                <span class="col-6 header-sub-title">{{ periodLabel() }}</span>
                <span class="col-6 count">{{ countLabel }}</span>
              </div>
              <div class="sub-title-box" v-else>
                <span class="header-sub-title">{{ periodLabel() }}</span>
                <span class="count">{{ countLabel }}</span>
              </div>
            </div>
            <div class="select-date-wrpper">
              <ul>
                <li class="select-period-list" :class="{ 'active' : item.active}" @click="activeSelectList(index)" v-for="(item, index) in selectList" :key="item.id">{{ item.label }}</li>
              </ul>
            </div>
          </div>
        </sweet-modal>
    </div>
  </common-context>
</div>
</template>

<script>
import CommonCalendar from 'components/common/common-calendar'
import CommonContext from 'components/common/common-context'
import CommonSelect from 'components/common/common-select'
import applyClearButton from 'components/common/common-apply-clear-button'
import { SweetModal } from 'sweet-modal-vue'
export default {
  name: 'common-calendar-inline',
  components: {
    CommonCalendar,
    CommonContext,
    CommonSelect,
    applyClearButton,
    SweetModal
  },
  props: {
    startDate: {
      default: void 0
    },
    endDate: {
      default: void 0
    },
    minAdScheduleDays: {
      type: Number | String
    },
    position: {
      type: String,
      default: 'left'
    },
    detailMode: {
      type: Boolean,
      default: false
    },
    setNotIfRender: {
      type: Boolean,
      default: false
    },
    trigger: {
      type: Boolean,
      default: false
    },
    isApplyInputDate: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    getIsMobile () {
      return this.$store.getters.getIsMobile
    },
    checkStartDate () {
      return !this.calendarStartDate
    },
    countLabel () {
      if (this.calendarStartDate && this.calendarEndDate) {
        return this.$moment(this.calendarEndDate).diff(this.$moment(this.calendarStartDate), 'days') + '일'
      }
    },
    inputDateLabel () {
      if (this.applyInputDate && this.calendarStartDate && this.calendarEndDate) {
        return this.periodLabel('input')
      } else {
        return '광고 시작일 - 광고 종료일'
      }
    },
    modalInfo () {
      return { clearText: '해제', applyText: '적용' }
    }
  },
  data () {
    return {
      modal: {
        loading: {
          selectLoadingShow: false
        }
      },
      selectMode: false,
      selectList: [],
      selectedFlag: false,
      selectedDate: null,
      select: {
        options: [{label: '1개월', value: 1}, {label: '2개월', value: 2}, {label: '3개월', value: 3}],
        placeholder: '월 단위 선택'
      },
      checkIsMobile: this.getIsMobile,
      calendarStartDate: this.startDate,
      calendarEndDate: this.endDate,
      applyInputDate: this.isApplyInputDate,
      selectedValue: '',
      flagSelected: false
    }
  },
  created () {
  },
  beforeMount () {
    this.resetSelectList()
  },
  mounted () {
  },
  methods: {
    setApply () {
      this.applyInputDate = true
    },
    resetSelectList () {
      this.selectedDate = null
      for (let i = 1; i <= 12; i++) {
        this.selectList.push({ label: i + '개월', value: i, active: false })
      }
      this.select.options = this.selectList
    },
    resetActiveSelectList () {
      for (let i = 0; i < this.selectList.length; i++) {
        this.selectList[i].active = false
      }
    },
    dateOneSelected (value) {
      this.selectedValue = ''
      this.calendarStartDate = value
      this.$emit('dateOneSelected', value)
    },
    dateTwoSelected (value) {
      if (!this.flagSelected) {
        this.selectedValue = ''
      }
      this.flagSelected = false

      this.calendarEndDate = value
      this.$emit('dateTwoSelected', value)
      // this.$refs.filterCalendar.$refs.calendar.showDatepicker()
    },
    _openPopup () {
      this.$emit('openPopup')
    },
    _closePopup () {
      if (this.calendarStartDate && !this.calendarEndDate) {
        this._clearDate()
      }
    },
    hideSelectPopup () {
      if (!this.selectedFlag) this.resetActiveSelectList()
    },
    _setCalendar (start, end) {
      if (!start) start = new Date()
      if (!end) end = new Date()
      this.calendarStartDate = start
      this.calendarEndDate = end
      this.$refs.filterCalendar.setEndDate(end)
      // this.$refs.filterCalendar.$refs.calendar.setCheckIn(start)
      // this.$refs.filterCalendar.$refs.calendar.setCheckOut(end)
    },
    _onChangeValue (selected) {
      this.flagSelected = true
      this.selectedValue = selected
      if (this.calendarStartDate) {
        this._setCalendar(this.calendarStartDate, this.$moment(this.calendarStartDate).add(selected.value, 'months').format('YYYY-MM-DD'))
      }
    },
    _clearDate () {
      this.$emit('setFilterDate', {
        start: void 0,
        end: void 0,
        count: 0
      })
      // 모바일 기간선택 예외처리
      this.selectedFlag = false
      this.resetActiveSelectList()
      this.applyInputDate = false
      this.$refs.filterCalendar.reset()
    },
    _applyDate () {
      this.$emit('setFilterDate', {
        start: this.calendarStartDate,
        end: this.calendarEndDate,
        count: this.$moment(this.calendarEndDate).diff(this.$moment(this.calendarStartDate), 'days')
      })
      this.applyInputDate = true
      this.$refs.dateContextPopup.showHideContextPopup()
    },
    periodLabel (type) {
      var resultStartDate, resultEndDate, momentFormat
      momentFormat = type === 'input' ? 'YYYY.MM.DD' : 'YYYY.MM.DD ddd'
      if (this.calendarStartDate) {
        resultStartDate = this.$moment(this.calendarStartDate).format(momentFormat)
      } else {
        resultStartDate = '광고 시작일'
      }
      if (this.calendarEndDate) {
        resultEndDate = this.$moment(this.calendarEndDate).format(momentFormat)
      } else {
        resultEndDate = '광고 종료일'
      }
      return resultStartDate + ' - ' + resultEndDate
    },
    selectPeriod () {
      this.$refs.modalSelect.open()
    },
    closeSelectMode () {
      this.$refs.modalSelect.close()
    },
    applySelectPeriod () {
      this._onChangeValue(this.selectedDate)
      this.closeSelectMode()
    },
    activeSelectList (index) {
      this.resetActiveSelectList()
      this.selectedFlag = true
      this.$nextTick(function () {
        this.selectList[index].active = true
        this.selectedDate = this.selectList[index]
      })
    }
  },
  watch: {
    startDate (newValue) {
      this.calendarStartDate = newValue
    },
    endDate (newValue) {
      this.calendarEndDate = newValue
    },
    isApplyInputDate (newValue) {
      this.applyInputDate = newValue
    }
    // trigger (newValue) {
    //   this.$refs.filterCalendar.$refs.calendar.showDatepicker()
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
.root-layout-wrapper.mobile .modal-date-calculation .calendar-modal .sweet-modal.theme-light .sweet-content
  height 100%
  padding 0px
.mobile
  .calendar-modal
  .common-calendar-inline-wrapper
    .common-context-btn
      .filter-input
        height 32px
    .footer-btn-box
      .button
        height 100%
    .calendar-filter-button
      width 50px
      height 32px
      line-height 32px
      text-align center
      border-radius 2px
      font-size 14px
      font-weight 300
      color rgba(8, 15, 49, 0.3)
      border solid 1px rgba(110, 110, 120, 0.5)
      background-color rgba(255, 255, 255, 0.2)
      &.is-active
        border solid 1px #080f31
        background-color #ffffff
        color #080f31 !important
        &::after
          top: 4px
          right: 4px
          position: absolute
          content: ''
          display: block
          width: 3px
          height: 3px
          background-color: #080f31
    .filter-date-popup
      height 100%
      overflow-y auto
      .select-date-box
        height 42px
        padding 0px 15px
        .title
          height 42px
          line-height 42px
          font-size 14px
          font-weight normal
          text-decoration underline
      .select-date-wrpper
        height calc(100% - 85px)
        overflow-y auto
        .select-period-list
          line-height 50px
          width 100%
          text-align left
          padding-left 42px
          &.active
            background-color #f8f8fb

.common-calendar-inline-wrapper
  margin-right 20px
  width 100%
  height 100%
  .filter-input
    height 42px
  .input-date
    padding-left 70px
    height 100%
    color rgba(8, 15, 49, 0.3)
    font-size 16px
    font-weight 300
    cursor pointer
    &.input[disabled]
      cursor not-allowed
  .icon-date
    top 0px
    position absolute
    left 15px
    width 20px
    margin 3px 0px
    height calc(100% - 6px)
    background-image url('~assets/images/ic/ic_datepicker.png')
    cursor pointer
    &.is-active
      background-image url('~assets/images/ic/ic_datepicker_active.png')
  // filter date
  .filter-date-popup
    position relative
    width 100%
    height 100%
    .count
      text-align right
      font-size 16px
      color #080f31
    .select-date-box
      // height 118px
      // padding 35px 0px 33px 67px
      height 84px
      padding 17px 0px 17px 67px
      .title
        padding-right 19px
        height: 50px
        font-size: 14px
        color: #080f31
        line-height 50px
      .select-box
        width 380px
        height 48px
        position relative
    // .button
    //   height 40px
    //   position relative
    //   &.apply
    //     // right 0px
    //   &.clear
    //     // right 60px
</style>
