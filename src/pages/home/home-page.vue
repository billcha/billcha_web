
<template>
  <div class="wrapper home" :class="{'login' : !!getUserInfo}">
    <div class="header">
      <div class="img logo margin-center"></div>
      <div class="desc margin-center main-color" v-html="$i18n.t('home.header_desc')"></div>
    </div>
    <div class="recommend card-list-box recommend">
      <div class="title main-color">{{ $i18n.t('home.recommend') }}</div>
      <common-carousel  v-if="!getIsMobile" :mode="carousel.recommend.mode" :paginationFactor="setPaginationFactor('recommend')" :itemCount="carousel.recommend.itemCount"  :data="carousel.recommend.data" @onClickShare="onClickShare" @onClickCard="onClickCard" @onClickSave="onClickSave" @closedPopup="closedPopup"></common-carousel>
      <common-swiper v-else :mode="carousel.recommend.mode" :paginationFactor="setPaginationFactor()" :swiperOption="carousel.recommend.swiperOption"  :data="carousel.recommend.data"
         @onClickShare="onClickShare" @onClickCard="onClickCard" @onClickSave="onClickSave" @closedPopup="closedPopup"></common-swiper>
      <div class="border-line"></div>
    </div>
    <div class="search-container">
      <div class="title"><h1>어느 위치에 광고 하시겠어요?</h1></div>
      <div class="search-box relative margin-center">
        <common-billboard-search class="text-input sub-color relative" placeholder="원하는 위치를 검색해보세요!"
          :height="58"
          @onChangeSearchValue="onChangeSearchValue"></common-billboard-search>
        <!-- <input v-model="searchValue" class="text-input sub-color relative"  @keyup.enter="clickSearchBtn"/> -->
        <span @click="clickSearchBtn" class="search-btn img absolute"></span>
      </div>
    </div>
    <div class="card-list-box favorite">
      <div class="title">인기 광고판</div>
      <common-carousel v-if="!getIsMobile" :mode="carousel.popularity.mode" :paginationFactor="setPaginationFactor()" :itemCount="carousel.popularity.itemCount" :data="carousel.popularity.data" @onClickShare="onClickShare" @onClickCard="onClickCard" @onClickSave="onClickSave" @closedPopup="closedPopup"></common-carousel>
      <common-swiper v-else :mode="carousel.popularity.mode" :paginationFactor="setPaginationFactor()" :swiperOption="carousel.popularity.swiperOption"  :data="carousel.popularity.data"
         @onClickShare="onClickShare" @onClickCard="onClickCard" @onClickSave="onClickSave" @closedPopup="closedPopup"></common-swiper>
    </div>
    <div class="card-list-box new">
      <div class="title">신규 광고판</div>
      <common-carousel v-if="!getIsMobile" :mode="carousel.new.mode" :paginationFactor="setPaginationFactor()" :itemCount="carousel.new.itemCount" :data="carousel.new.data" @onClickShare="onClickShare" @onClickCard="onClickCard" @onClickSave="onClickSave" @closedPopup="closedPopup"></common-carousel>
      <common-swiper v-else :mode="carousel.new.mode" :paginationFactor="setPaginationFactor()" :swiperOption="carousel.new.swiperOption"  :data="carousel.new.data"
         @onClickShare="onClickShare" @onClickCard="onClickCard" @onClickSave="onClickSave" @closedPopup="closedPopup"></common-swiper>
    </div>
    <div class="card-list-box billboard-story">
      <div class="title">광고판 이야기</div>
      <common-carousel v-if="!getIsMobile" :mode="carousel.billboardStroy.mode" :paginationFactor="setPaginationFactor()" :itemCount="carousel.billboardStroy.itemCount" :data="requestApiBillboardStoryData"></common-carousel>
      <common-swiper v-else :mode="carousel.billboardStroy.mode" :paginationFactor="setPaginationFactor()" :swiperOption="carousel.billboardStroy.swiperOption"  :data="requestApiBillboardStoryData"
         @onClickShare="onClickShare" @onClickSave="onClickSave" @closedPopup="closedPopup"></common-swiper>
    </div>
    <sweet-modal
      class="modal-context is-hidden-tablet"
      ref="modalContext"
      :enable-mobile-fullscreen="false"
      :hide-close-button="false"
      :blocking="true"
    >
      <div class="wrapper">
        <ShareContents></ShareContents>
      </div>
    </sweet-modal>
  </div>
</template>

<script>
import { SweetModal } from 'sweet-modal-vue'
import CommonCarousel from 'components/common/common-carousel'
import ShareContents from 'components/common/common-share-contents'
import CommonBillboardSearch from 'components/common/common-billboard-search'
import CommonSwiper from 'components/common/common-swiper'

export default {
  metaInfo () {
    return {
      title: '빌차 | BILLCHA',
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
  name: 'home-page',
  components: {
    CommonCarousel,
    ShareContents,
    SweetModal,
    CommonBillboardSearch,
    CommonSwiper
  },
  data () {
    return {
      carousel: {
        recommend: {
          paginationFactor: this.getIsMobile ? 160 : 580,
          itemCount: 2,
          mode: 'carousel',
          data: void 0,
          swiperOption: {
            slidesPerView: 'auto',
            spaceBetween: 8
          }
        },
        popularity: {
          paginationFactor: this.getIsMobile ? 160 : 380,
          itemCount: 3,
          mode: 'carousel',
          data: void 0,
          swiperOption: {
            slidesPerView: 'auto',
            spaceBetween: 8
          }
        },
        new: {
          paginationFactor: this.getIsMobile ? 160 : 380,
          itemCount: 3,
          mode: 'carousel',
          data: void 0,
          swiperOption: {
            slidesPerView: 'auto',
            spaceBetween: 8
          }
        },
        billboardStroy: {
          paginationFactor: this.getIsMobile ? 160 : 380,
          itemCount: 3,
          mode: 'billboard-story',
          data: void 0,
          swiperOption: {
            slidesPerView: 'auto',
            spaceBetween: 8
          }
        }
      },
      data: {
        link: ''
      },
      favorite: {
        Data: [],
        list: []
      },
      searchValue: '',
      requestApiData: void 0,
      requestApiBillboardStoryData: void 0
    }
  },
  computed: {
    getIsMobile () {
      return this.$store.getters.getIsMobile
    },
    // 유저정보
    getUserInfo () {
      this.$nextTick(() => {
        if (this.$store.getters.getUserInfo.name) this.requestFavoriteBliiboardData()
      })
      return this.$store.getters.getUserInfo
    }
  },
  created () {
    this.init()
  },
  beforeMount () {
  },
  mounted () {
  },
  methods: {
    init () {
      let self = this
      self.$store.commit('setRootLoading', true)
      // multiple requests 보내기
      self.$axios.all([this.requestRecommendedApi(), this.requestBillboardsApiData(), this.requestNewBillboardApiData(), this.requestArticlesApiData()]) // axios.all로 여러 개의 request를 보내고
        .then(self.$axios.spread(function (recommendResp, billboardResp, newResp, articlesResp) { // response를 spread로 받는다
          if (recommendResp) {
            self.parsingBillboardData(recommendResp.data, 'recommended')
          }
          if (billboardResp) {
            self.parsingBillboardData(billboardResp.data)
          }
          if (newResp) {
            self.parsingBillboardData(newResp.data, 'new')
          }
          if (articlesResp) {
            self.parsingArticleData(articlesResp.data.items)
          }
        })).catch((error) => {
          console.log(error)
        }).then(() => {
          self.$store.commit('setRootLoading', false)
        })
    },
    requestRecommendedApi () {
      return this.$axios.get('/api/v1/billboards', {
        params: {
          is_recommended: true
        }
      })
    },
    requestBillboardsApiData () {
      return this.$axios.get('/api/v1/billboards')
    },
    requestNewBillboardApiData () {
      return this.$axios.get('/api/v1/billboards?sort=-created_date')
    },
    requestArticlesApiData () {
      return this.$axios.get('/api/v1/articles?page=1&size=5')
    },
    requestFavoriteBliiboardData () {
      var self = this
      if (!this.getUserInfo.name) return
      this.$axios.get('/api/v1/favorite_billboards').then((respFavoriteBliiboardData) => {
        self.favorite.data = respFavoriteBliiboardData.data.items
        self.setFavoriteBillboard()
      }).catch(function () {
      }).then(() => {
      })
    },
    setFavoriteBillboard () {
      this.favorite.list = []
      this.checkFavoriteBillboard(this.carousel.recommend.data)
      this.checkFavoriteBillboard(this.carousel.new.data)
      this.checkFavoriteBillboard(this.carousel.popularity.data)
    },
    setItemCount (type) {
      if (type === 'recommend') {
        return this.getIsMobile ? 1 : 2
      } else {
        return this.getIsMobile ? 1 : 3
      }
    },
    onChangeSearchValue (queryString) {
      this.clickSearchBtn(queryString)
    },
    checkFavoriteBillboard (data) {
      for (var index = 0, favoriteMax = this.favorite.data.length; index < favoriteMax; index++) {
        var favoriteItem = this.favorite.data[index]
        for (var i = 0, max = data.length; i < max; i++) {
          var item = data[i]
          if (favoriteItem.id === item.id) {
            item.favorite = true
            // this.favorite.list.push(item.id)
          }
        }
      }
    },
    parsingBillboardData (requestData, type) {
      var result = []
      for (let index = 0, max = requestData.items.length; index < max; index++) {
        const item = requestData.items[index]
        result.push({
          id: item.id,
          title: item.title,
          image: item.representative_img_path,
          category: item.categories[0].name,
          views: item.views,
          price: item.price,
          date: '일',
          location: item.address,
          desc: item.desc,
          shortDesc: item.short_desc,
          area: item.ad_area_width + 'x' + item.ad_area_height,
          status: item.status,
          favorite: false,
          link: 'testLink1',
          facebook: 'facebook',
          twitter: 'twitter',
          email: 'email',
          discountPercentage: item.discount_percentage,
          buildingTargetFloor: item.building_target_floor,
          expectedOpeningDate: item.expected_opening_date,
          lowestPriceVerification: !!item.lowest_price_verification_file_path
        })
      }
      if (type === 'recommended') this.carousel.recommend.data = result
      else if (type === 'new') this.carousel.new.data = result
      else this.carousel.popularity.data = result
    },
    parsingArticleData (requestData) {
      var result = []
      for (let index = 0, max = requestData.length; index < max; index++) {
        const item = requestData[index]
        result.push({
          id: item.id,
          image: item.img_path,
          linkedUrl: item.linked_url,
          // category: item.categories[0].name,
          date: this.$moment(item.created_date).format('YYYY-MM-DD'),
          title: item.title
        })
      }
      this.requestApiBillboardStoryData = result
    },
    moveHome () {
      this.$router.push('/')
    },
    clickSearchBtn (queryString) {
      this.$router.push({ path: '/billboardList', query: { id: queryString.id, address: queryString.name, lat: queryString.lat, lng: queryString.lng } })
    },
    onClickSave () {
      this.requestFavoriteBliiboardData()
    },
    onClickShare (id) {
      console.log('onClickShare' + id)
      // let result = this.requestApiData.filter(item => item.id === id)
      // this.link = result.link
      this.$refs.modalContext.open()
    },
    onClickCard (id) {
      this.$router.push({ path: '/billboard/detail', query: { id: id } })
    },
    closedPopup (id) {
      this.$refs.modalContext.close()
    },
    setPaginationFactor (type) {
      if (type === 'recommend') return this.getIsMobile ? 160 : 580
      return this.getIsMobile ? 160 : 380
    }
  },
  watch: {
  }
}
</script>
<style lang="stylus">
.wrapper.home
  width 100%
  height 100%
  max-width 1180px
  > .header
    box-sizing border-box
    padding 207px 0px 0px 0px
    height 530px
    > .logo
      width 140px
      height 31px
      background-image url('~assets/images/home_logo.png')
      margin-bottom 27px
    > .desc
      // width 453px
      width 335px
      height 49px
  .card-list-box
    margin-top 20px
    .title
      margin-bottom 20px
      text-align left
      height: 35px
      font-size: 30px
      font-weight: 500
  > .recommend
      .title
        margin-bottom 45px
      .border-line
        width 100%
        height 120px
        border-bottom solid 1px #dedee0
  > .search-container
      margin-top 160px
      margin-bottom 160px
      .title
        height 59px
        font-size 40px
        font-weight normal
        text-align: center
        color: #080f31
      .search-box
        margin-top 50px
        width 580px
        height 60px
        z-index 2
        .text-input
          width 100%
          height 100%
          border-radius: 2px
          box-shadow: 0 2px 6px 2px rgba(8, 15, 49, 0.03)
          border: solid 1px #dedee0
          background-color: rgba(255, 255, 255, 0.1)
          text-align center
        .search-btn
          top 0
          left 30px
          width 30px
          height 100%
          background-image url('~assets/images/ic/btn_search.png')
      .ic.icon-search
        display none
    > .billboard-story
      margin-top 230px
      margin-bottom 160px
  // 공용 서치 width가 목록과 다르게 넓어져서 padding 조정
  .common-billboard-search-wrapper .billboard-search-container .input.input-search
    padding-left 80px
.mobile
  .wrapper.home
    flex 1
    display flex
    flex-direction column
    > .header
      order 0
      box-sizing border-box
      padding 79px 0px 0px 0px
      height 419px
      border-radius 2px
      background-color #f8f8fb
    .card-list-box
      margin-top: 33px
      padding-bottom: 33px
      border-bottom: solid 1px #dedee0
      &.recommend
        order 2
        padding-left 15px
      &.favorite
        order 3
        padding-left 15px
      &.new
        order 4
        padding-left 15px
      &.billboard-story
        order 5
        margin-top 56px
        margin-bottom 81px
        padding-left 15px
      > .title
        font-size 18px
        height 27px
        line-height 27px
        margin-bottom 20px
    > .search-container
      order 1
      margin-top 68px
      margin-bottom 49px
      > .title
        font-size 16px
        font-weight normal
        height 24px
        line-height 24px
      > .search-box
        margin-top 33px
        width 100%
        padding 0 27px
        .billboard-search-container
          min-width 100%
          .input.input-search
            padding-left 55px
        .search-btn
          left 47px
    // 모바일 추천광고판 라인 예외처리
    .recommend
      .border-line
        display none
    // 광고판 이야기는 라인 예외처리
    .card-list-box.billboard-story
      margin-top 56px
      border none
      padding 0 0 0 15px
    // 검색 아이콘 중복방지
    .common-billboard-search-wrapper .billboard-search-container .ic.icon-search
      display none
</style>
