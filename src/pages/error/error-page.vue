<template>
  <div class="error-page-wrapper display-flex flex-column">
    <div class="img error-image"></div>
    <div class="title">죄송합니다.</div>
    <div class="sub-title">원하시는 페이지를 찾을 수 없습니다.</div>
    <div class="btn-box cols">
      <button class="button light col-6" @click="movePrevPage">이전 페이지</button>
      <button class="button primary col-6" @click="moveMainPage">메인 페이지</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'error-page',
  components: {
  },
  data () {
    return {
    }
  },
  computed: {
  },
  beforeMount () {
    this.$store.commit('setFooterShow', false)
  },
  mounted () {
  },
  methods: {
    movePrevPage () {
      this.$router.back()
    },
    moveMainPage () {
      this.$router.push('/')
    }
  },
  beforeRouteLeave (to, from, next) {
    next()
  }
}
</script>
<style lang="stylus">
.error-page-wrapper
  width 420px
  .error-image
    width 100%
    height 95px
    background-image url('~assets/images/error.png')
    margin-bottom 30px
    flex 0 0 95px
  .title
    flex 0 0 41px
    height: 41px
    font-size: 28px
    line-height 41px
    font-weight: normal
    margin-bottom 3px
    text-align center
  .sub-title
    flex 0 0 27px
    height: 27px
    line-height 27px
    font-size: 18px
    font-weight: normal
    text-align center
    margin-bottom 75px
  .btn-box
    flex 0 0 70px
    margin 0
    .button
      height 70px
      width calc(50% - 10px)
      &.primary
        margin-left 10px
      &.light
        margin-right 10px
</style>
