<template>
<div class="common-paginate-wrapper">
  <paginate
    :page-count="pageCount"
    :page-range="3"
    :margin-pages="2"
    :click-handler="clickCallback"
    :prev-text="''"
    :next-text="''"
    :prev-class="'prev btn ic'"
    :next-class="'next btn ic'"
    :container-class="'pagination'"
    :page-class="'page-item'"
    ref="paginate">
  </paginate>
</div>
</template>

<script>
import Paginate from 'vuejs-paginate'
export default {
  name: 'CommonPagination',
  components: {
    Paginate
  },
  props: {
    pageCount: {
      type: Number,
      default: 1
    }
  },
  computed: {
  },
  data () {
    return {
    }
  },
  beforeMount () {
  },
  created () {
  },
  mounted () {
  },
  methods: {
    clickCallback (pageNum) {
      console.log(pageNum)
      this.$emit('clickCallback', pageNum)
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
.common-paginate-wrapper
  height 100%
  display: flex
  justify-content: center
  .pagination
    .btn
      width 24px
      height 24px
      cursor pointer
      &.prev
        background-image url('~assets/images/ic/ic_pagination_prev_btn.png')
        margin-right 20px
      &.next
        background-image url('~assets/images/ic/ic_pagination_next_btn.png')
        margin-left 20px
      & > a
        color: transparent
        width: 24px
        height: 24px
        display: inline-block
  .page-item
    height: 35px
    line-height 35px
    font-size: 16px
    font-weight: 300
    margin: 0px 20px
    > a
      color: #6e6e78
    &.active
      width: 35px
      height: 35px
      line-height 35px
      border-radius: 2px
      background-color: #f8f8fb
      & a
        color #080f31
        font-weight 500
</style>
