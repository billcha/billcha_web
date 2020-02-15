<template>
<div class="common-footer-wrapper">
  <footer class="footer display-flex relative">
    <div class="content container margin-center cols relative ">
      <div class="relative" :class="[getIsMobile ? 'col-12 half-height' : 'col-9 full-height']">
        <div :class="[getIsMobile ? 'vertical-center full-width' : 'vertical-center']">
          <div class="default-text light-color">
            <span class="text-margin">상호명: 우주비행사</span>
            <span class="text-margin">대표: 조경민</span>
            <div v-if="getIsMobile">
              <span>사업자 등록번호: 731-28-00850</span>
            </div>
            <span v-else>사업자 등록번호: 731-28-00850</span>
          </div>
          <div class="default-text light-color">
            <span>통신판매업 신고번호: 2019-서울송파-0000</span>
          </div>
          <div class="default-text light-color">
            <div v-if="getIsMobile">
              <div class="text-margin">TEL: 000-000-0000</div>
              <div>E-mail:billcha2019@gmail.com</div>
            </div>
            <div v-else>
              <span class="text-margin">TEL: 000-000-0000</span>
              <span>E-mail:billcha2019@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
      <div class="relative" :class="[getIsMobile ? 'col-12 half-height' : 'col-2 full-height']">
        <div :class="[getIsMobile ? 'horizon-vertical-center' : 'vertical-center']">
          <div class="sns-box">
            <span class="ic sns-icon fb"></span>
            <span class="text">페이스북</span>
          </div>
          <div class="sns-box">
            <span class="ic sns-icon naver"></span>
            <span class="text">네이버 블로그</span>
          </div>
          <div class="sns-box">
            <span class="ic sns-icon insta"></span>
            <span class="text">인스타그램</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</div>

</template>

<script>
export default {
  name: 'common-footer',
  components: {
  },
  props: {
  },
  computed: {
    getIsMobile () {
      return this.$store.getters.getIsMobile
    }
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
    onInput (value) {
      this.$emit('onSelected', value)
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
  .common-footer-wrapper
    display flex
    flex 0 0 315px
    > .footer
      width 100%
      height: 315px
      padding 0
      background-color: #f8f8fb
      .container
        width 1180px
        height 100%
        .default-text
          font-size: 16px
          margin-bottom 6px
        .text-margin
          margin-right 30px
        .sns-box
          width: 188px
          height: 40px
          line-height 40px
          border-radius: 4px
          border: solid 1px #dedee0
          margin-bottom 6px
          .sns-icon
            margin-left 20.2px
            width 20px
            height 100%
            display inline-block
            &.fb
              background-image url('~assets/images/ic/ic_footer_fb.png')
            &.naver
              background-image url('~assets/images/ic/ic_footer_naver.png')
            &.insta
              background-image url('~assets/images/ic/ic_footer_insta.png')
        .text
          font-size 14px
          font-weight normal
          color rgba(110, 110, 120, 0.7)
          vertical-align top
  .mobile
    .common-footer-wrapper
      flex 0 0 471px
      > .footer
        height 471px
        padding 0
        .container
          height 100%
          .default-text
            text-align center
            font-size 13px
            margin-bottom 7px
          .text-margin
            margin-right 14px
</style>
