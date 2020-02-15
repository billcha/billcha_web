<template>
<!-- <div class="apply-clear-button-container" v-bind:style="[ getIsMobile ? { 'top' : 'calc(100vh - ' + getTop  + 'px)' } : {} ]"> -->
<div class="apply-clear-button-container">
  <div class="cols clear">
    <div class="col-6 clear" :class="{ 'button light' : getIsMobile }" @click="_clear">{{ clearText }}</div>
    <div class="col-6 apply" :class="{ 'button primary' : getIsMobile }" @click="_apply">{{ applyText }}</div>
  </div>
</div>
</template>

<script>
export default {
  name: 'common-select',
  components: {
  },
  props: {
    bottom: {
      type: Number,
      default: 0
    },
    clearText: {
      type: String,
      default: '해제'
    },
    applyText: {
      type: String,
      default: '적용'
    }
  },
  computed: {
    getIsMobile () {
      return this.$store.getters.getIsMobile
    }
    // getTop () {
    //   var result = this.bottom + 60
    //   if (window.innerHeight > 667) result = (window.innerHeight - 667) + this.bottom + 60
    //   return result
    // }
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
    _clear () {
      this.$emit('clear')
    },
    _apply () {
      this.$emit('apply')
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
  }
}
</script>

<style lang="stylus">
.mobile
  .apply-clear-button-container
    position absolute
    width 100%
    bottom 0px
.apply-clear-button-container
  .clear,
  .apply
    // color: #080f31
    font-size: 16px
    height 60px
    line-height 60px
    text-align center
    font-weight normal
    border none
    cursor pointer
</style>
