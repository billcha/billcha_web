<template>
  <div class="favorite-billboards-page wrapper">
    <billboard-list-page :favoriteMode="true"></billboard-list-page>
  </div>
</template>

<script>
import billboardListPage from '../billboard-list/billboard-list-page'
export default {
  metaInfo () {
    return {
      title: '저장 목록 | 빌차 | BILLCHA',
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
  name: 'favorite-billboards-page',
  components: {
    billboardListPage
  },
  data () {
    return {
    }
  },
  computed: {
  },
  beforeMount () {
  },
  mounted () {
  },
  methods: {
    // ie 확인
    msieversion () {
      var ua = window.navigator.userAgent
      var msie = ua.indexOf('MSIE ')
      // eslint-disable-next-line no-useless-escape
      if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)))
      }
      return false
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      // `vm`을 통한 컴포넌트 인스턴스 접근
      if (vm.msieversion()) document.body.style.overflowY = 'scroll'
    })
  },
  beforeRouteLeave (to, from, next) {
    next()
  }
}
</script>
<style lang="stylus">
.favorite-billboards-page.wrapper
  width: 100%
  height 100%
  position relative
  display flex
  flex 1 0 0%
  flex-direction column
</style>
