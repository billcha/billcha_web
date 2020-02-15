<template>
<div id="datepicker">
  <AirbnbStyleDatepicker
    ref="calendar"
    :trigger-element-id="'datepicker'"
    :mode="'range'"
    :date-one="dateOne"
    :date-two="dateTwo"
    :min-date="minDate"
    :end-date="'2099-12-01'"
    :offset-x="10"
    :offset-y="30"
    :months-to-show="2"
    :start-open="true"
    :fullscreen-mobile="getIsMobile"
    :mobile-header="'Mobile header text'"
    :inline="true"
    :show-action-buttons="true"
    :trigger="isTrigger"
    :close-after-select="true"
    :disabled-dates="disabledDates"
    :customized-dates="customizedDates"
    :showShortcutsMenuTrigger="false"
    :showActionButtons="false"
    @date-one-selected="dateOneSelected"
    @date-two-selected="dateTwoSelected"
    @opened="onOpenedMethod"
    @closed="onClosedMethod"
    @apply="onApplyMethod"
    @previous-month="onChangeMonthMethod"
    @next-month="onChangeMonthMethod"
  />
</div>
</template>

<script>
export default {
  name: 'common-calendar',
  components: {
    // HotelDatePicker
  },
  props: {
    // format: {
    //   type: String,
    //   default () {
    //     return 'YYYY-MM-DD'
    //   }
    // },
    // startDate: [Date, String],
    // endDate: [Date, String],
    // minNights: Number,
    // maxNights: Number
    // disabledDates: Array
    trigger: {
      type: Boolean,
      default: false
    },
    startDate: String,
    endDate: String,
    minAdScheduleDays: {
      type: Number | String,
      default: 0
    }
  },
  computed: {
    getIsMobile () {
      return this.$store.getters.getIsMobile
    },
    diffDays () {
      return this.$moment(this.dateTwo).diff(this.$moment(this.dateOne), 'days')
    }
  },
  data () {
    return {
      isTrigger: this.trigger,
      dateOne: this.startDate,
      dateTwo: this.endDate,
      minDate: this.$moment().add(1, 'week').format('YYYY-MM-DD'),
      i18n: {
        night: '일',
        nights: '일',
        'day-names': ['일', '월', '화', '수', '목', '금', '토'],
        'check-in': '체크인',
        'check-out': '체크아웃',
        'month-names': ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
      },
      disabledDates: [],
      customizedDates: []
    }
  },
  beforeMount () {
  },
  created () {
  },
  mounted () {
    this.$nextTick(function () {
      if (this.$parent.$el.className.indexOf('sweet-modal') === -1) this.$refs.calendar.width = 330
      this.$refs.calendar.width = 330
      this.changeDateFormat()
    })
    // this.$refs.calendar.hideDatepicker()
    // this.$refs.calendar.showDatepicker()
  },
  methods: {
    changeDateFormat () {
      var $ = window.$
      var monthName = $('.asd__month-name')
      for (var i = 0, max = monthName.length; i < max; i++) {
        var spanArr = $(monthName[i]).find('span')
        if (spanArr[0].textContent.length !== 5) {
          var month = spanArr[0].textContent + ''
          var year = spanArr[1].textContent + ''
          spanArr[0].textContent = year + '.'
          spanArr[1].textContent = month.replace('월', '')
        }
      }
    },
    // checkInChanged (value) {
    //   this.$emit('checkInChanged', value)
    // },
    // checkOutChanged (value) {
    //   this.$emit('checkOutChanged', value)
    // }
    // 시작 종료날짜 초기화 및 비활성화 커스텀 클래스 배열도 초기화
    reset () {
      this.$emit('dateOneSelected', void 0)
      this.$emit('dateTwoSelected', void 0)
      this.$refs.calendar.closeDatepickerCancel()
      this.disabledDates = []
      this.customizedDates = []
      // this.$refs.calendar.$el.querySelectorAll('.asd__action-buttons button')[0].click()
      // this.dateOne = void 0
      // this.dateTwo = void 0
    },
    setEndDate (date) {
      this.$refs.calendar.selectedDate2 = date
    },
    // 시작 날짜선택
    dateOneSelected (val) {
      // 빈값예외처리
      if (val === '' || this.dateOne === val) return
      // 커스텀클래스 초기화
      this.customizedDates = []
      // 최소집행날짜가 존재한다면 현재 선택된 시작날짜보다 시작날짜가 이전인지 확인
      // 이전인 경우에는 라이브러리에서 시작,종료날짜를 props 외 셋업하는 메소드가 없기에 종료날짜 prop를 바꿔도
      // 클래스가 변화가 없기에 이를 예외처리 하여 종료날짜와 활성화 된 영역을 초기화 및 다시 셋팅해주는 로직
      if (this.minAdScheduleDays !== 0) {
        if (this.$moment(val).isBefore(this.dateOne)) {
          this.activateDate()
          this.resetActivate()
        }
      }
      this.dateOne = val
      // 종료날짜는 초기화 한다 초기화 하지않으면 activateDate메소드를 호출하여 활성화 css 클래스를 삽입할떄 오작동발생
      this.dateTwo = void 0
      this.$emit('dateTwoSelected', this.dateTwo)
      this.$emit('dateOneSelected', val)

      // 최소집행날짜 기간만큼 예외일을 추가한다
      var result = []
      for (var i = 0; i < this.minAdScheduleDays; i++) {
        result.push(this.$moment(val).add(i + 1, 'days').format('YYYY-MM-DD'))
      }
      this.disabledDates = result
      // if (this.$moment(this.dateOne).isBefore(val)) {
      //   this.activateDate()
      // }
      // 종료날짜가 존재하고 시작날짜가 종료날짜이전일 경우 activateDate 호출 종료날짜가 없는경우는
      // 시작과 종료날짜에 간격을 알수없어 활성화 로직을 실행시킬수없기 떄문 그리고 종료날짜가 없는 경우
      // 종료날짜 el을 찾아 초기화해주는 메소드 실행
      if (this.dateTwo && (this.$moment(this.dateOne).isBefore(this.dateTwo))) {
        if (this.minAdScheduleDays !== 0) {
          this.selectedDateTwoElReset()
          this.resetActivate()
          // if (this.$moment(this.dateOne).isBefore(val)) {
          //   this.resetActivate()
          // }
        }

        this.activateDate()
      } else {
        this.selectedDateTwoElReset()
      }
    },
    dateTwoSelected (val) {
      if (val === '') return
      // 라이브러리에서 시작날짜와 종료날짜에 선택된 후 다시 선택시 중간에서 시작, 종료날짜에 가까운 값을 비교하여
      // 시작,종료 둘중에 하나의 콜백을 실행시키는데 시작날짜없이 종료날짜만 콜백되는 경우를 방어하기위한 로직
      if ((!this.dateOne && val) || this.$moment(val).isBefore(this.$moment(this.dateOne).add(this.minAdScheduleDays, 'days'))) {
        this.dateOneSelected(val)
        return
      }
      // if (this.$moment(val).isBefore(this.dateOne)) {
      //   this.dateOne = val
      // }
      this.disabledDates = []
      this.dateTwo = val
      this.activateDate()
      this.$emit('dateTwoSelected', val)
    },
    // 현재 라이브러이에서 라이브러리에서 시작,종료날짜를 props 외 셋업하는 메소드가 없기에 종료날짜 prop를 바꿔도
    // 클래스가 변화가 없기에 이전 종료날짜를 el를 찾아서 클래스 제거및 css변경하는 메소드
    selectedDateTwoElReset () {
      this.$nextTick(() => {
        let selectedDateTwoEl = window.$(this.$refs.calendar.$el.getElementsByClassName('asd__inner-wrapper')).find('.asd__month .asd__day--selected.asd__selected-date-two')
        selectedDateTwoEl.removeClass('asd__day--selected').removeClass('asd__selected-date-two').addClass('asd__day--in-range')
        selectedDateTwoEl.css('background', '#fff')
        selectedDateTwoEl.css('color', '#4f546c')
      })
    },
    // 현재 라이브러이에서 라이브러리에서 시작,종료날짜를 props 외 셋업하는 메소드가 없기에 종료날짜 prop를 바꿔도
    // 클래스가 변화가 없기에 비활성화 활성화된 el을 찾아 클래스를 수동으로 제거하고 css를 수정하는 메소드
    resetActivate () {
      let $ = window.$
      this.$nextTick(() => {
        let dateNextEl
        let disabledDateElList = $(this.$refs.calendar.$el.getElementsByClassName('asd__inner-wrapper')).find('.asd__day--disabled, .asd__day--date-activate')
        for (let i = 0, max = disabledDateElList.length; i < max; i++) {
          dateNextEl = $(disabledDateElList[i])
          dateNextEl.removeClass('asd__day--date-activate')
          dateNextEl.removeClass('asd__day--in-range')
          dateNextEl.css('background', '#fff')
          dateNextEl.css('color', '#4f546c')
        }
      })
    },
    // 현재 라이브러이에서 라이브러리에서 시작,종료날짜를 props 외 셋업하는 메소드가 없기에 종료날짜 prop를 바꿔도
    // 클래스가 변화가 없기에 이를 시작날짜와 종료날짜 사이의 날짜개수를 확인하고 개수만큼 수동으로 클래스와 css를 삽입하는 메소드
    activateDate () {
      let result = []
      if (!this.diffDays) return
      for (var i = 0; i < this.diffDays - 1; i++) {
        result.push({
          cssClass: 'date-activate',
          dates: this.$moment(this.dateOne).add(i + 1, 'days').format('YYYY-MM-DD')
        })
      }
      this.customizedDates = result
      this.$nextTick(() => {
        let dateNextEl
        let $ = window.$
        for (var i = 1; i < this.diffDays - 1; i++) {
          dateNextEl = $(this.$refs.calendar.$el.getElementsByClassName('asd__inner-wrapper')).find('[data-date=' + this.$moment(this.dateOne).add(i, 'days').format('YYYY-MM-DD') + ']')
          dateNextEl.css('background', '#ccd1e7')
          dateNextEl.css('color', '#4f546c')
          dateNextEl.css('opacity', '1')
        }
      })
    },
    someBooleanDataProp () {
    },
    onOpenedMethod () {
      console.log('open')
    },
    onClosedMethod () {
    },
    onCancelMethod () {
    },
    onApplyMethod () {
    },
    onChangeMonthMethod () {
      this.changeDateFormat()
    }
  },
  watch: {
    startDate (newValue) {
      this.dateOne = newValue
    },
    endDate (newValue) {
      this.dateTwo = newValue
      this.setEndDate(newValue)
    },
    trigger (newValue) {
      this.isTrigger = newValue
    }
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
// 익스플로러 대응
.root-layout-wrapper
  &.ie
    #datepicker
      .asd__day-button
        line-height 24px
      .asd__selected-date-one,
      .asd__selected-date-two
        button
          position relative
          &:after
            position relative
            line-height 5px
            height 8px
            text-align center
            width 100%
            display block
            font-size 8px
// 모바일
.mobile
  #datepicker
    height 350px
    .asd__wrapper--full-screen
      top 85px
      height 350px
      position absolute
      border none
// 데스크탑 공용
#datepicker
  height 368px
  // 버튼 위치 보정
  .asd__change-month-button>button
    padding 6px 8px 2px 8px
  .asd__wrapper
    border: solid 1px #e8e8e8
  .asd__mobile-only
    display none
  .asd__month-name
    color: #4f546c
    font-size: 18px
    font-weight normal
    margin-bottom 84px
  .asd__wrapper--full-screen
    max-height calc(100vh - 150px)
    height 330px
    top 174px
  .asd__month--hidden
    // height 500px
  .asd__day--disabled
    &.asd__day--selected
      color rgb(86, 90, 92) !important
      opacity 1
    &.asd__day--in-range
      color #565a5c !important
      background #ffffff !important
      opacity 0.5
    &.asd__day--hovered
      background rgb(204, 209, 231) !important
      color rgb(86, 90, 92) !important
      opacity 1
  .asd__selected-date-one,
  .asd__selected-date-two
    button
      position relative
      &:after
        position relative
        line-height 1px
        text-align center
        width 100%
        display block
        font-size 6px

  .asd__selected-date-one
    border-radius: 25% 0% 0% 25%
    button
      &:after
        content '시작일'
  .asd__selected-date-two
    border-radius: 0% 25% 25% 0%
    button
      &:after
        content '종료일'
  .asd__day
    border none !important
    color #4f546c !important
    &.asd__day--disabled
      background #fff !important
      opacity 0.5 !important
    &.asd__day--hovered
      background rgb(204, 209, 231) !important
      color rgb(86, 90, 92) !important
      opacity 1
      &.asd__day--disabled
        opacity 1 !important
    &.asd__day--selected
      color #ffffff !important
      opacity 1
  .asd__list-complete-enter-to
    border 0px
    border-right solid 1px #e8e8e8
    padding 12px
  .asd__days-legend
    top: 91px
  .asd__day--date-activate
    width 42.8571px !important
    color rgb(86, 90, 92) !important
    background rgb(204, 209, 231) !important
    opacity: 1
    &.asd__day--in-range
      // color rgb(255, 255, 255) !important
      &.asd__day--disabled
        // color rgb(86, 90, 92) !important
        background #ccd1e7 !important
        // opacity 0.5
.datepicker__wrapper
  .datepicker
    top 0px
    max-height calc(100vh - 150px)
    // &.datepicker--closed
    //   -webkit-box-shadow: none
    //   box-shadow: none
    //   height: 100%
    //   left: 0
    //   right: 0
    //   bottom: 0
    //   -webkit-overflow-scrolling: touch!important
    //   position: fixed
    //   top: 0
    //   width: 100%

</style>
