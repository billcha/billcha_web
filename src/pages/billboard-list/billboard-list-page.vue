
<template>
  <div class="billboard-list-page wrapper" :class="{ 'map-hide' : !mapShow, 'login' : getUserInfo }">
    <div class="filter-container margin-center">
      <div class="filter-flex-box margin-center">
        <div class="fl filter-box">
        <div class="fl filter-item address">
          <common-billboard-search :height="getIsMobile ? 50 : 42 " :value="currentAddress" @onChangeSearchValue="onChangeSearchValue"></common-billboard-search>
        </div>
        <div class="fl">
          <common-calendar-inline :mobileCheck="getIsMobile" :startDate="calendar.startDate" :endDate="calendar.endDate" @setFilterDate="setFilterDate" ref="commonCalendarInline"></common-calendar-inline>
        </div>
        <div class="fl filter-item category">
          <common-context class="filter-input" :mode="'outside'" :position="'right'" :top="42" :width="420" :height="383" :mobileHeight="320" :mobileMaxHeight="347" ref="categoryContextPopup">
            <button class="button filter-button" :class="{'is-active' : category.apply}">{{ getIsMobile ? '매체 종류' : '매체'}}</button>
            <div class="filter-category-popup" slot="contents">
              <div class="filter-header-inner">
                <div class="header-title">광고판 매체 종류</div>
                <div class="sub-title-box cols">
                  <span class="col-12 header-sub-title">매체 종류 설정이 가능합니다.</span>
                </div>
              </div>
              <div class="context-inner">
                <common-checkbox v-for="(item, index) in category.data" :key="item.id" :index="index" :text="item.name" :check="item.check" @onChange="onCategoryFilterChange"></common-checkbox>
              </div>
              <apply-clear-button @clear="_clearCategory" @apply="_applyCategory" :bottom="320"></apply-clear-button>
            </div>
          </common-context>
        </div>
        <div class="fl filter-item price">
          <common-context  class="filter-input" :mode="'outside'" :position="'left'" :top="42" :width="420" :height="380" :mobileHeight="320" :mobileMaxHeight="347" ref="priceContextPopup">
            <button class="button filter-button" :class="{'is-active' : filter.price.apply}">가격</button>
            <div class="filter-price-popup" slot="contents">
              <div class="filter-header-inner">
                <div class="header-title">광고판 가격</div>
                <div class="sub-title-box cols">
                  <span class="col-12 header-sub-title">가격 설정이 가능합니다.</span>
                </div>
              </div>
              <div class="context-inner">
                <common-slider :value="slider.value" :data="slider.data" :average="slider.average" :min="slider.min" :max="slider.max" @onChangeValue="changeFilterPrice" ></common-slider>
              </div>
              <apply-clear-button @clear="_clearPrice" @apply="_applyPrice" :bottom="320"></apply-clear-button>
            </div>
          </common-context>
        </div>
        <div class="fl filter-item add">
          <common-context class="filter-input" :mode="'outside'" :position="'right'" :top="42" :width="420" :height="460" :mobileHeight="457" :mobileMaxHeight="457" ref="addFilterContextPopup">
            <button class="button filter-button add" :class="{'is-active' : filter.add.apply}" >추가 필터</button>
            <div class="filter-other-popup" slot="contents">
              <div class="filter-header-inner">
                <div class="header-title">추가 필터 및 정렬</div>
                <div class="sub-title-box cols">
                  <span class="col-12 header-sub-title">상세한 기간 설정이 가능합니다.</span>
                </div>
              </div>
              <div class="context-inner">
                <div class="sort-filter-box">
                  <div class="sub-title">정렬</div>
                  <div class="cols">
                    <div class="col-6" v-for="(item, index) in addFilter.data" :key="item.id">
                      <common-checkbox class="" :index="index" :text="item.name" :check="item.check" @onChange="onAddFilterChange"></common-checkbox>
                    </div>
                  </div>
                </div>
                <div class="add-filter-box">
                  <div class="sub-title">추가 필터</div>
                  <div class="cols">
                    <div class="col-6" v-for="(item, index) in addFilter.dataAdd" :key="item.id">
                      <common-checkbox class="" :index="index" :text="item.name" :check="item.check" @onChange="onAddPlusFilterChange"></common-checkbox>
                    </div>
                  </div>
                </div>
              </div>
              <apply-clear-button @clear="_clearOther" @apply="_applyOther" :bottom="210"></apply-clear-button>
            </div>
          </common-context>
        </div>
        <div class="fr mobile-map-show-btn" :class="{'maphide' : !mapShow}" @click="showHideMap" v-if="getIsMobile">
          <div class="ic icon-map margin-center"></div>
        </div>
      </div>
      <div class="fl filter-item search-btn relative" v-if="!getIsMobile">
        <button class="button" @click="searchClick">검색</button>
        <div class="filter-reset-box" @click="resetFilter">
          <span class="ic reset-icon"></span><span class="reset-text">초기화</span>
        </div>
      </div>
      </div>
    </div>
    <div class="contents-container">
      <div class="map-show-btn" :class="{'maphide' : !mapShow}" @click="showHideMap"  v-if="!getIsMobile">{{mapShow ? '지도닫기' : '지도열기'}}</div>
      <div class="list-cotainer" :class="{ 'map-hide' : !mapShow }" v-common-loading-panel="loadingContents">
        <div class="list-title" v-if="this.list.total > 0">조건에 맞는 빌보드 <br v-if="getIsMobile"><span class="count">{{ getDataLength }}</span>가 검색되었습니다.</div>
        <div class="contents-list-wrapper cols" v-if="this.list.total > 0">
          <common-card class="list-box" :class="_setCollistCard()" @cardMouseOver="cardMouseOver" @cardMouseLeave="cardMouseLeave"
            :data="listItem" v-for="listItem in list.data" :key="listItem.id" :context="context" :mode="setCardMode"
            @onClickCard="onClickCard" @onClickSave="onClickSave" @onClickShare="onClickShare" @closedPopup="closedPopup">
            </common-card>
          <div class="pagination-box margin-center"><common-pagination :forcePage="list.page" :pageCount="list.pageCount" @clickCallback="clickPaginationCallback" ref="commonPagination"></common-pagination></div>
        </div>
        <common-no-data :mode="'billboard-list'" v-else>
        </common-no-data>
      </div>
      <!-- <div class="map-show-btn" :class="{'maphide' : !mapShow}" @click="showHideMap" v-if="!getIsMobile">{{mapShow ? '지도닫기' : '지도열기'}}</div> -->
      <div class="map-container" v-show="mapShow">
        <div id="map" style="width:100%;height:100%;"></div>
        <div class="swiper-box" v-if="getIsMobile && mapShow">
          <div class="swiper">
            <common-swiper :mode="map.carousel.mode" :paginationFactor="map.carousel.paginationFactor" :itemCount="map.carousel.itemCount"  :data="map.carousel.data"
            @onClickCard="onClickCard" ref="commonSwiper"></common-swiper>
          </div>
        </div>
      </div>
    </div>
    <sweet-modal
      class="modal-context is-hidden-tablet"
      ref="modalContext"
      :enable-mobile-fullscreen="true"
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
// import CommonCalendar from 'components/common/common-calendar'
import CommonSlider from 'components/common/common-slider'
import CommonCard from 'components/common/common-card'
import CommonContext from 'components/common/common-context'
import CommonPagination from 'components/common/common-pagination'
import applyClearButton from 'components/common/common-apply-clear-button'
import { SweetModal } from 'sweet-modal-vue'
import ShareContents from 'components/common/common-share-contents'
import CommonCalendarInline from 'components/common/common-calendar-inline'
import CommonCheckbox from 'components/common/common-checkbox'
import CommonBillboardSearch from 'components/common/common-billboard-search'
import CommonSwiper from 'components/common/common-swiper'
import CommonNoData from 'components/common/common-no-data'
import util from 'components/util/util.js'
export default {
  metaInfo () {
    if (this.favoriteMode) return
    return {
      title: this.metaInfoData.title,
      htmlAttrs: {
        lang: 'ko-KR',
        dir: 'ltr'
      },
      meta: [
        { charset: 'utf-8' },
        {
          property: 'og:description',
          content: this.metaInfoData.description,
          vmid: 'og:description'
        },
        {
          property: 'og:image ',
          content: this.metaInfoData.image,
          vmid: 'og:image'
        },
        {
          property: 'og:image ',
          content: this.metaInfoData.image,
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
          content: this.metaInfoData.tag,
          vmid: 'og:tag'
        },
        {
          property: 'og:cannonical',
          content: this.metaInfoData.cannonical,
          vmid: 'og:cannonical'
        },
        {
          property: 'og:url',
          content: this.metaInfoData.url,
          vmid: 'og:url'
        },
        {
          property: 'og:twitter:card',
          content: 'summary_large_image',
          vmid: 'og:twitter:card'
        },
        {
          property: 'og:twitter:description',
          content: this.metaInfoData.description,
          vmid: 'og:twitter:description'
        },
        {
          property: 'og:twitter:image',
          content: this.metaInfoData.image,
          vmid: 'og:twitter:image'
        },
        {
          property: 'og:facebook:description',
          content: this.metaInfoData.description,
          vmid: 'og:facebook:description'
        },
        {
          property: 'og:facebook:image',
          content: this.metaInfoData.image,
          vmid: 'og:facebook:image'
        }
      ],
      script: [{
        vmid: 'ldjson-schema',
        innerHTML: `{
          "@context": "https://schema.org/",
          "@type": "Product",
          "name" : "빌차",
          "image": ` + this.metaInfoData.representativeImg + `,
          "brand": {
            "@type": "Thing",
            "name": "빌차"
          },
          "offers": {
            "@type": "AggregateOffer",
            "lowPrice": "` + this.slider.min + `",
            "highPrice": "` + this.slider.max + `",
            "priceCurrency": "KRD"
          }
        }`,
        type: 'application/ld+json'
      }],
      __dangerouslyDisableSanitizersByTagID: {
        'ldjson-schema': ['innerHTML']
      }
    }
  },
  name: 'billboard-list-page',
  components: {
    CommonCard,
    CommonContext,
    CommonPagination,
    CommonSlider,
    applyClearButton,
    SweetModal,
    ShareContents,
    CommonCalendarInline,
    CommonCheckbox,
    CommonBillboardSearch,
    CommonSwiper,
    CommonNoData
  },
  props: {
    favoriteMode: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      loadingContents: false,
      serachFlag: false,
      resizeFlag: false,
      prevUserEvent: 'list',
      prevBound: null,
      requestApiUrl: this.favoriteMode ? '/api/v1/favorite_billboards' : '/api/v1/billboards',
      currentAddress: void 0,
      currentAddressValue: void 0,
      currentAddressName: '',
      currentId: void 0,
      location: {
        lat: 0,
        lng: 0
      },
      map: {
        sdk: null,
        markers: [],
        customOverlay: [],
        hoverOverlay: null,
        summaryRegionCategoriesData: null,
        respData: [],
        selectedMarkerData: null,
        mouseoverMarker: null,
        carousel: {
          paginationFactor: 345,
          itemCount: 1,
          mode: 'mobileList',
          data: void 0
        }
      },
      mapShow: true,
      mapShowFlag: false,
      filter: {
        price: {
          min: 0,
          max: null,
          apply: false
        },
        add: {
          distance: false,
          apply: false
        }
      },
      data: {
        link: ''
      },
      list: {
        data: void 0,
        page: 1,
        size: 10,
        pageCount: 0,
        total: 0
      },
      select: {
        options: [{label: '1개월', value: 1}, {label: '2개월', value: 2}, {label: '3개월', value: 3}],
        placeholder: '월 단위 선택'
      },
      calendar: {
        startDate: void 0,
        endDate: void 0,
        minNights: 5,
        maxNights: 0
      },
      category: {
        data: [],
        apply: false
      },
      slider: {
        value: [0, 900000],
        data: [],
        min: 0,
        max: 1000000,
        average: 0
      },
      addFilter: {
        data: [
          {
            id: 0,
            value: '+distance',
            name: '가까운 순',
            check: false
          },
          {
            id: 1,
            value: '-price',
            name: '높은가격순',
            check: false
          },
          {
            id: 2,
            value: '-views',
            name: '조회순',
            check: false
          },
          {
            id: 3,
            value: '+price',
            name: '낮은가격순',
            check: false
          },
          {
            id: 4,
            value: '+created_date',
            name: '최신순',
            check: false
          }
        ],
        dataAdd: [
          {
            id: 5,
            value: 'has_lowest_price_verification',
            name: '최저가 인증',
            check: false
          }
        ],
        apply: false
      },
      context: {
        position: 'right',
        top: 28,
        width: 155,
        height: 200,
        mode: 'outSide'
      },
      favorite: {
        Data: [],
        list: []
      }
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
    },
    // 데스크탑 모바일 분기
    setCardMode () {
      return this.getIsMobile ? 'mobileList' : 'carousel'
    },
    getDataLength () {
      if (this.list.total) {
        return this.list.total + '개'
      } else {
        return '0개'
      }
    },
    // 맵뷰 리스트뷰에 따라 목록 사이즈 분기
    setListSize () {
      return this.mapShow ? 6 : 10
    },
    metaInfoData () {
      var representativeImg = []
      if (this.list.data) {
        for (let i = 0, max = this.list.data.length; i < max; i++) {
          representativeImg.push(window.location.origin + '/static/' + this.list.data[i].image)
        }
      }
      representativeImg = JSON.stringify(representativeImg)
      var result = {
        title: '광고판 찾기 | 빌차 | BILLCHA',
        description: '조건에 맞는 빌보드 ' + this.getDataLength + '가 검색되었습니다',
        image: window.location.origin + '/static/upload/images/email/header_logo.png',
        representativeImg: representativeImg,
        tag: '광고판, 매체, 인쇄물(종이 및 현수막), LED전광판',
        cannonical: window.location.href,
        url: window.location.href
      }

      return result
    }
  },
  beforeMount () {
    let self = this
    // 맵 이벤트 종료직전에 이벤트 콜백을 받아 처리하는데
    // 현재 맵뷰 넓이높이가 동적으로 되어있어 브라우저 크기를 줄이거나
    // 모바일에서 키보드가 올라갈경우 넓이높이가 변화되면서 의도치않은
    // 데이터갱신이 이루어지는걸 막기위해 리사이징 이벤트가 발생할떄 플래그를
    // 설정하여 오동작을 방지한다
    window.onresize = function (event) {
      self.resizeFlag = true
    }
  },
  mounted () {
    this.mapInit()
    this.init()
    document.addEventListener('click', this.documentClick, {
      capture: true // default 값은 false입니다.
    })
  },
  methods: {
    // 최초 진입시 초기셋팅을 진행합니다
    init () {
      // 사용자 위치 설정
      this.getGPSLocation()
      // 매체종류 필터 API호출및 셋팅
      this.requestFilterCategoriesData()
      // 가격 필터 API 호출 및 셋팅
      this.requestFilterPriceData()
      this.$store.commit('setFooterShow', false)
      // 홈화면에서 지역 검색으로 진입한 경우 위치 파싱하여 맵 이동
      this.currentId = this.$route.query.id
      this.currentAddressValue = this.$route.query.id
      this.currentAddress = this.$route.query.address
      this.$nextTick(() => {
        if (this.$route.query.lat && this.$route.query.lng) {
          this.panTo(this.$route.query.lat, this.$route.query.lng)
        } else {
          this.mapTilesloaded()
        }
      })
    },
    // 사용자의 현재 위치를 가져옵니다.
    getGPSLocation () {
      var self = this
      this.$getLocation()
        .then(coordinates => {
          self.location.lat = coordinates.lat
          self.location.lng = coordinates.lng
        })
    },
    getSearchFilterParams () {
      var result
      result = this.getFilterParams()
      return result
    },
    getMarkerClickFilterParams () {
      var result
      result = this.getFilterParams()
      return result
    },
    getIdleClickFilterParams () {
      var result
      result = this.getFilterParams()
      return result
    },
    // 설정된 필터와 맵뷰 혹은 리스트뷰에 따라 API 쿼리스트링을 설정
    getFilterParams (bounds) {
      var params = {}
      if (this.prevUserEvent === 'map') {
        params = {}
        if (bounds) {
          params = { south_west_lat: bounds.la, south_west_lng: bounds.ea, north_east_lat: bounds.ka, north_east_lng: bounds.ja }
        }
      } else {
        params = { region_category_ids: this.currentAddressValue }
      }
      var categoryFilter = []
      if (this.category.apply) {
        this.category.data.forEach(item => {
          if (item.check) categoryFilter.push(item.id)
        })
        params.category_ids = categoryFilter.join()
      }
      if (this.filter.price.apply) {
        params.min_price = this.filter.price.min
        params.max_price = this.filter.price.max
      }
      if (this.calendar.startDate && this.calendar.endDate) {
        params.ad_start_date = this.calendar.startDate
        params.ad_end_date = this.calendar.endDate
      }
      var addFilter = []
      if (this.addFilter.data) {
        this.addFilter.data.forEach(item => {
          if (item.check) addFilter.push(item.value)
        })
        params.sort = addFilter.join()
        params.user_lat = this.location.lat
        params.user_lng = this.location.lng
      }
      if (this.addFilter.dataAdd) {
        this.addFilter.dataAdd.forEach(item => {
          if (item.check) params[item.value] = true
        })
      }
      return params
    },
    requestFilterPriceData (bounds) {
      var self = this
      var params = this.getFilterParams(bounds)
      params.status = 'open'
      this.$axios.get('/api/v1/billboard_price_statistics', params).then((respPriceData) => {
        self.setFilterPriceData(respPriceData.data)
      }).catch(function (error) {
        if (error) {
        }
      }).then(() => {
      })
    },
    setFilterPriceData (data, mapDragend) {
      this.parsingFilterPriceData(data)
    },
    parsingFilterPriceData (requestData) {
      var result = []
      this.slider.value = [requestData.min, requestData.max]
      this.slider.min = Number(requestData.min.toFixed(0))
      this.slider.max = Number(requestData.max.toFixed(0))
      this.slider.average = Number(requestData.avg.toFixed(0))
      for (let index = 0, max = requestData.distribution.length; index < max; index++) {
        var item = requestData.distribution[index]
        var height = ((requestData.total_count / 100) * item.count) * 50
        result.push({
          height: height,
          price: Number(item.lt.toFixed(0))
        })
      }
      this.slider.data = result
    },
    // 가격필터 컴포넌트 변경시 콜백 함수
    changeFilterPrice (value) {
      this.filter.price.min = value[0]
      this.filter.price.max = value[1]
      this.slider.value = value
    },
    // 컨텐츠 로딩 켜짐
    onLoading () {
      this.$store.commit('lockBody')
      this.loadingContents = true
    },
    // 컨텐츠 로딩 꺼짐
    offLoading () {
      this.$store.commit('unlockBody')
      this.loadingContents = false
    },
    // 광고판 API 호출
    requestBillboardData (bounds, type) {
      var self = this
      var filter
      this.onLoading()
      if (bounds) {
        if ((bounds.ea === bounds.ja && bounds.la === bounds.ka) && this.prevUserEvent === 'map') bounds = this.prevBound
        else this.prevBound = bounds
      }
      filter = this.getFilterParams(bounds)
      // self.$store.commit('setRootLoading', true)
      this.$nextTick(function () {
        self.$axios.get(self.requestApiUrl, { params: filter }).then((respBillboardData) => {
          let respData = respBillboardData.data
          self.setBillboardData(respData, !!bounds, self.selectedMarkerData)
        }).catch(function (error) {
          if (error) {
          }
        }).then(() => {
          self.offLoading()
          // self.$store.commit('setRootLoading', false)
        })
      })
    },
    // 광고판 데이터 셋업
    setBillboardData (data, mapDragend, selectedMarkerData) {
      if (!this.mapShow) this.serachFlag = true
      this.map.respData = data
      this.parsingBillboardData(data, mapDragend)
      this.parsingSummaryRegionCategoriesData(data)
      this.settingMap(data, mapDragend, selectedMarkerData)
    },
    // 맵레벨에 따른 시군구 읍면동 필터
    parsingSummaryRegionCategoriesData (data) {
      if (data.summary_region_categories) {
        var regionData = data.summary_region_categories
        var level = this.map.sdk.getLevel()
        this.map.summaryRegionCategoriesData = regionData.filter((item) => {
          if ((level >= 5 && level <= 7) && item.depth === 3) return item
          else if ((level >= 8 && level <= 9) && item.depth === 2) return item
          else if (level >= 10 && item.depth === 1) return item
        })
      }
    },
    // 컴포넌트에 알맞게 사용할수있도록 API 데이터 파싱
    parsingBillboardData (requestData, mapDragend) {
      var result = []
      for (let index = 0, max = requestData.items.length; index < max; index++) {
        var item = requestData.items[index]
        result.push({
          id: item.id,
          title: item.title,
          image: item.representative_img_path,
          category: item.categories[0].name,
          price: item.price,
          date: '일',
          lat: item.lat,
          lng: item.lng,
          location: item.address,
          desc: item.desc,
          shortDesc: item.short_desc,
          discountPercentage: item.discount_percentage || 0,
          area: item.ad_area_width + 'x' + item.ad_area_height,
          favorite: false,
          status: item.status,
          link: 'testLink1',
          facebook: 'facebook',
          twitter: 'twitter',
          email: 'email',
          views: item.views,
          buildingTargetFloor: item.building_target_floor,
          expectedOpeningDate: item.expected_opening_date,
          lowestPriceVerification: !!item.lowest_price_verification_file_path
        })
      }
      this.list.data = result
      if (requestData.total) {
        this.list.total = requestData.total
        this.list.pageCount = requestData.total ? Math.ceil(requestData.total / this.setListSize) : Math.ceil(requestData.data.length / this.setListSize)
      } else if (requestData.items.length > 0) {
        this.list.total = requestData.items.length
        this.list.pageCount = Math.ceil(requestData.items.length / this.setListSize)
        this.list.data = this.list.data.slice(((this.list.page - 1) * this.setListSize), (this.list.page * this.setListSize))
      } else {
        this.list.total = 0
      }
      // 페이지네이션 오동작을 방어하기 위한 코드
      if (this.list.total !== 0 && ((this.list.data.length > this.setListSize) ||
        (this.list.total >= this.setListSize && this.list.data.length !== this.setListSize && this.list.page < this.list.pageCount))) this.list.data = this.list.data.slice(((this.list.page - 1) * this.setListSize), (this.list.page * this.setListSize))
      // 모바일 맵뷰 하단 카우셀 초기화
      this.map.carousel.data = void 0
      this.$nextTick(() => {
        this.map.carousel.data = result
      })
    },

    // 맵
    resetOverlay () {
      for (var i = 0; i < this.map.customOverlay.length; i++) {
        this.map.customOverlay[i].setMap(null)
      }
    },
    resetMarkers () {
      for (var i = 0, max = this.map.markers.length; i < max; i++) {
        this.map.markers[i].setMap(null)
      }
    },
    settingMap (data, mapDragend, selectedMarkerData) {
      this.$nextTick(function () {
        if (this.map.customOverlay) {
          this.resetOverlay()
        }
        if (this.map.markers) {
          if (this.map.markers.length > 0) {
            this.resetMarkers()
            // this.map.markers = null
          }
        }
        if (data) {
          console.log(data)
          if (data.items.length > 0 && this.mapShow) {
            // if (!mapDragend) {
            //   var fristItem = data.items[0]
            //   this.panTo(fristItem.lat, fristItem.lng)
            // }
            if (this.prevUserEvent === 'list') this.setCenterBounds(data.items)
            this.setMarkers(data.items)
            this.setMapCustomOverlay(this.map.summaryRegionCategoriesData)
          }
          this.selectedMarkerData = null
          this.currentId = void 0
        }
      })
    },
    panTo (lat, lng) {
      var kakao = window.kakao
      // 이동할 위도 경도 위치를 생성합니다
      var moveLatLon = new kakao.maps.LatLng(lat, lng)
      // 지도 중심을 부드럽게 이동시킵니다
      // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
      this.map.sdk.panTo(moveLatLon)
    },
    // 맵 이벤트 종료후 데이터 갱신
    mapTilesloaded () {
      if (this.mapShowFlag) {
        this.mapShowFlag = false
        return
      }
      if (this.hoverOverlay) {
        this.hoverOverlay.setVisible(false)
        this.hoverOverlay.setMap(null)
      }
      var bounds = this.map.sdk.getBounds()
      this.changePrevUserEvent('map')
      this.resetPagination()
      this.requestBillboardData(bounds)
    },
    // 맵 초기화
    mapInit () {
      var self = this
      var kakao = window.kakao
      var $ = window.$
      var container = document.getElementById('map') // 지도를 담을 영역의 DOM 레퍼런스
      var options = { // 지도를 생성할 때 필요한 기본 옵션
        center: new kakao.maps.LatLng(37.51432257233593, 127.06283102249931), // 지도의 중심좌표.
        level: 9 // 지도의 레벨(확대, 축소 정도)
      }

      this.map.sdk = new kakao.maps.Map(container, options) // 지도 생성 및 객체 리턴
      this.map.sdk.setMaxLevel(10) // 지도 최대 레벨 설정

      // 마우스 오버시 강조 표시될 마커 생성
      self.map.mouseoverMarker = new kakao.maps.Marker({
        map: self.map.sdk,
        position: new kakao.maps.LatLng(0, 0),
        title: '',
        clickable: false,
        zIndex: 2,
        image: self.setMarkerImage(true) // 마커이미지 설정
      })
      self.map.mouseoverMarker.setVisible(false)
      kakao.maps.event.addListener(self.map.sdk, 'idle', function () {
        if (self.resizeFlag) self.resizeFlag = false
        else self.mapTilesloaded()
      })

      // 레벨별 지역정보 클릭시 확대 및 리스트 갱신 이벤트
      $(this.$el).on('click', '.map-overlay', function (e) {
        self.selectedMarkerData = $(this).data()
        self.panTo(self.selectedMarkerData.lat, self.selectedMarkerData.lng)
      })
    },
    // 지역별 커스텀 오버레이 생성
    setMapCustomOverlay (data) {
      var kakao = window.kakao
      var self = this
      for (let i = 0, max = data.length; i < max; i++) {
        var item = data[i]
        // 커스텀 오버레이에 표시할 내용입니다
        // HTML 문자열 또는 Dom Element 입니다
        var content = `
              <div class="map-overlay" data-id="` + item.id + `" data-lat="` + item.lat + `" data-lng="` + item.lng + `">
                <div class="count">` + item.count + `</div>
                <div class="title">` + item.name + `</div>
              </div>
            `
        // 커스텀 오버레이가 표시될 위치입니다
        var position = new kakao.maps.LatLng(item.lat, item.lng)
        var overlay = new kakao.maps.CustomOverlay({
          map: self.map.sdk,
          position: position,
          content: content,
          xAnchor: 0.3,
          yAnchor: 0.91
        })
        // 커스텀 오버레이를 생성합니다
        this.map.customOverlay.push(overlay)
        overlay.setMap(this.map.sdk)
      }
    },
    // 활성 비활성 마커 이미지 생성
    setMarkerImage (active) {
      var kakao = window.kakao
      var normalImageSrc = require('../../assets/images/ic/ic_marker.png') // 마커이미지의 주소입니다
      var activeImageSrc = require('../../assets/images/ic/ic_marker_active.png') // 활성 마커이미지 주소입니다
      var imageSrc
      imageSrc = active ? activeImageSrc : normalImageSrc
      var imageSize = new kakao.maps.Size(40, 53) // 마커이미지의 크기입니다
      var imageOption = {offset: new kakao.maps.Point(27, 69)} // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
      // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)
      return markerImage
    },
    // 마커의 좌표를 병합하여 중심좌표를 생성
    setCenterBounds (data) {
      var kakao = window.kakao
      var self = this
      var bounds = new kakao.maps.LatLngBounds()
      for (var i = 0, max = data.length; i < max; i++) {
        var item = data[i]
        // 지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체를 생성합니다
        var points = new kakao.maps.LatLng(item.lat, item.lng)
        // LatLngBounds 객체에 좌표를 추가합니다
        bounds.extend(points)
      }
      this.$nextTick(() => {
        self.map.sdk.setBounds(bounds)
      })
    },
    // 마커 생성 및 초기화
    setMarkers (data) {
      var kakao = window.kakao
      var self = this
      for (var i = 0, max = data.length; i < max; i++) {
        var item = data[i]
        var points = new kakao.maps.LatLng(item.lat, item.lng)
        var marker = new kakao.maps.Marker({
          map: self.map.sdk,
          position: points,
          clickable: true,
          image: self.setMarkerImage() // 마커이미지 설정
        })
        self.map.markers.push(marker)
        marker.setMap(self.map.sdk)

        // 마커에 커서가 오버됐을 떄 마커 위에 표시할 오버레이를 생성합니다.
        self.hoverOverlay = this.makeHoverOverlay(item)
        self.hoverOverlay.setVisible(false)
        // 모바일 데스크탑에 따라 이벤트등록 분기
        if (this.getIsMobile) {
          // 마커에 마우스오버 이벤트를 등록합니다
          kakao.maps.event.addListener(marker, 'click', this.cardTouchEnd(item, i))
        } else {
          // 마커에 마우스오버 이벤트를 등록합니다
          kakao.maps.event.addListener(marker, 'mouseover', this.makeOverListener(self.map.sdk, marker, self.hoverOverlay))
          // 마커에 마우스아웃 이벤트를 등록합니다.
          kakao.maps.event.addListener(marker, 'mouseout', this.makeOutListener(self.hoverOverlay, marker))
        }
      }
      var level = this.map.sdk.getLevel()
      if (level > 4) {
        for (var j = 0; j < this.map.markers.length; j++) {
          this.map.markers[j].setMap(null)
        }
      }
    },
    // 호버시 표시할 오버레이를 생성하는 함수
    makeHoverOverlay (item) {
      var kakao = window.kakao
      var self = this
      let priceUnit = this.$i18n.t('common.price_unit')
      var content = `<div class="map-tooltip-overlay style="padding:5px;">
        <div>
          <span class="tooltip-overlay-price">` + util.numberComma(item.price, priceUnit) + `</span>
          <span class="tooltip-overlay-category">` + item.categories[0].name + `</span>
        </div>
        <div class="tooltip-overlay-title">
          ` + item.title + `
        </div>
      </div>`
      var position = new kakao.maps.LatLng(item.lat, item.lng)
      var overlay = new kakao.maps.CustomOverlay({
        map: self.map.sdk,
        position: position,
        content: content,
        xAnchor: 0.54,
        yAnchor: 2.4
      })
      return overlay
    },
    // 오버레이를 표시하는 클로저를 만드는 함수입니다
    makeOverListener (map, marker, overlay) {
      let self = this
      return function () {
        marker.setImage(self.setMarkerImage(true))
        if (overlay.qa()) overlay.setVisible(true)
      }
    },
    // 오버레이를 닫는 클로저를 만드는 함수입니다
    makeOutListener (overlay, marker) {
      let self = this
      return function () {
        marker.setImage(self.setMarkerImage(false))
        if (overlay.qa()) overlay.setVisible(false)
      }
    },
    // 터치시시 마커강조
    cardTouchEnd (data, index) {
      let self = this
      return function () {
        var kakao = window.kakao
        self.map.mouseoverMarker.setVisible(true)
        self.map.mouseoverMarker.setPosition(new kakao.maps.LatLng(data.lat, data.lng))

        self.$refs.commonSwiper.slideTo(index)
      }
    },
    // 마우스오버시 마커강조
    cardMouseOver (data) {
      var kakao = window.kakao
      this.map.mouseoverMarker.setVisible(true)
      this.map.mouseoverMarker.setPosition(new kakao.maps.LatLng(data.lat, data.lng))
    },
    // 마우스아웃시 마커강조숨김
    cardMouseLeave () {
      this.map.mouseoverMarker.setVisible(false)
    },
    changePrevUserEvent (event) {
      this.prevUserEvent = event
    },
    requestFilterCategoriesData () {
      var self = this
      this.$axios.get('/api/v1/billboard_categories').then((respCategory) => {
        self.parsingCategoryData(respCategory.data)
      }).catch(function (error) {
        if (error) {
        }
      }).then(() => {
      })
    },
    parsingCategoryData (requestData) {
      var result = []
      for (let index = 0, max = requestData.length; index < max; index++) {
        var item = requestData[index]
        result.push({
          id: item.id,
          name: item.name,
          desc: item.desc,
          check: false
        })
      }
      this.category.data = result
    },
    routerMove () {
      this.$router.push('/')
    },
    searchClick () {
      this.changePrevUserEvent('list')
      this.resetPagination()
      this.requestBillboardData()
    },
    resetPagination () {
      this.list.page = 1
      if (this.$refs.commonPagination) {
        this.$nextTick(() => {
          this.$refs.commonPagination.$refs.paginate.selectFirstPage()
        })
        this.reSortData()
        // if (this.list.page <= 1) this.reSortData()
      }
    },
    resetFilter () {
      this.calendar.startDate = void 0
      this.calendar.endDate = void 0
      this.$refs.commonCalendarInline._clearDate()
      this._clearCategory()
      this._clearPrice()
      this._clearOther()
    },
    showHideMap () {
      this.mapShow = !this.mapShow
      this.$nextTick(function () {
        this.map.sdk.relayout()
      })
    },
    onClickCard (id) {
      var query = { id: id }
      if (this.calendar.startDate && this.calendar.endDate) {
        query.startDate = this.calendar.startDate
        query.endDate = this.calendar.endDate
      }
      this.$router.push({ path: '/billboard/detail', query: query })
    },
    onClickSave (id) {
      // alert('carousel dibs click id:' + id)
    },
    onClickShare (id) {
      console.log('onClickShare' + id)
      let result = this.list.data.filter(item => item.id === id)
      this.link = result.link
      this.$refs.modalContext.open()
    },
    _onChangeValue (selected) {
      this._setCalendar(this.calendar.startDate, this.$moment(this.calendar.startDate).add(selected.value, 'months').format('YYYY-MM-DD'))
    },
    dateOneSelected (value) {
      this.calendar.startDate = value
    },
    dateTwoSelected (value) {
      this.calendar.endDate = value
      // this.$refs.filterCalendar.$refs.calendar.showDatepicker()
    },
    setFilterDate (date) {
      this.calendar.startDate = date.start
      this.calendar.endDate = date.end
      this.filterSettingRefreshData()
    },
    _clearCategory () {
      this.category.data.forEach(item => {
        item.check = false
      })
      this.category.apply = false
      this.filterSettingRefreshData()
    },
    _applyCategory () {
      let checkStatus = false
      this.category.data.forEach(item => {
        if (item.check) checkStatus = true
      })
      this.category.apply = checkStatus
      this.$refs.categoryContextPopup.showHideContextPopup()
      this.filterSettingRefreshData()
    },
    _clearPrice () {
      this.filter.price.min = this.slider.min
      this.filter.price.max = this.slider.max
      this.filter.price.apply = false
      this.filterSettingRefreshData()
    },
    _applyPrice () {
      this.filter.price.apply = true
      this.$refs.priceContextPopup.showHideContextPopup()
      this.filterSettingRefreshData()
    },
    _clearOther () {
      this.addFilter.data.forEach(item => {
        item.check = false
      })
      this.addFilter.dataAdd.forEach(item => {
        item.check = false
      })
      this.filter.add.apply = false
      this.filterSettingRefreshData()
    },
    _applyOther () {
      let checkStatus = false
      this.addFilter.data.forEach(item => {
        if (item.check) checkStatus = true
      })
      this.addFilter.dataAdd.forEach(item => {
        if (item.check) checkStatus = true
      })
      this.filter.add.apply = checkStatus
      this.$refs.addFilterContextPopup.showHideContextPopup()
      this.filterSettingRefreshData()
    },
    filterSettingRefreshData () {
      this.resetPagination()
      this.changePrevUserEvent('list')
      this.requestBillboardData()
    },
    documentClick (e) {
      if (!this.selectedElem) return
      var el = this.selectedElem
      var target = e.target
      if ((el !== target) && !el.context.contains(target)) {
        el.hide()
      }
    },
    closedPopup (id) {
      this.$refs.modalContext.close()
    },
    _setCollistCard () {
      if (this.getIsMobile) {
        return 'col-12'
      } else {
        return this.mapShow ? 'col-4' : 'col-3'
      }
    },
    onCategoryFilterChange (item) {
      this.category.data[item.index].check = item.check
    },
    onAddFilterChange (item) {
      if (item.index === 1) this.addFilter.data[3].check = false
      if (item.index === 3) this.addFilter.data[1].check = false
      this.addFilter.data[item.index].check = item.check
    },
    onAddPlusFilterChange (item) {
      this.addFilter.dataAdd[item.index].check = item.check
    },
    // 검색창
    onChangeSearchValue (queryString) {
      // 검색시 페이지네이션 초기화
      this.resetPagination()
      this.currentAddressValue = queryString.id
      this.currentAddressName = queryString.full_name
      this.changePrevUserEvent('list')
      // if (!this.mapShow) {
      //   this.requestBillboardData()
      // } else {
      //   this.panTo(queryString.lat, queryString.lng)
      // }
      // this.currentId = queryString.id
      this.requestBillboardData()
    },
    clickPaginationCallback (pageNum) {
      var bounds = void 0
      if (this.prevUserEvent === 'map') bounds = this.map.sdk.getBounds()
      this.list.page = pageNum
      this.requestBillboardData(bounds)
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
      this.checkFavoriteBillboard(this.list.data)
    },
    checkFavoriteBillboard (data) {
      for (var index = 0, favoriteMax = this.favorite.data.length; index < favoriteMax; index++) {
        var favoriteItem = this.favorite.data[index]
        for (var i = 0, max = data.length; i < max; i++) {
          var item = data[i]
          if (favoriteItem.id === item.id) {
            item.favorite = true
          }
        }
      }
    },
    reSortData () {
      this.parsingBillboardData(this.map.respData)
    },
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
  watch: {
    mapShow (newVal) {
      this.resetPagination()
      // this.reSortData()
      // this.changePrevUserEvent('list')
      this.mapShowFlag = newVal
      if (newVal) {
        this.settingMap(this.map.respData, true)
        if (!this.serachFlag) this.setCenterBounds(this.map.respData.items)
      }
      // this.requestBillboardData()
    }
  },
  destroyed () {
    document.removeEventListener('click', this.documentClick)
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      // `vm`을 통한 컴포넌트 인스턴스 접근
      if (vm.msieversion()) document.body.style.overflowY = 'scroll'
    })
  },
  beforeRouteLeave (to, from, next) {
    document.body.style.overflowY = ''
    next()
  }
}
</script>
<style scoped lang="scss">
body{
  overflow-y: scroll;
}
.ie .billboard-list-page.wrapper {
  .filter-container {
    margin-right: 17px;
    width: calc(100% - 17px);
  }
  .map-container {
    width: calc(100% - 817px);
    margin-right: 17px;
  }
}
// 레이아웃에서 설정시 적용되지않는 이슈로 인해 페이지에 적용
.mobile .billboard-list.layout-wrapper {
  min-width: 320px;
  width: 100%;
  margin-top: 60px;
  height: calc(100% - 60px);
}

.mobile .billboard-list-page.wrapper {
  height: calc(100% - 60px);
  // 헤더 필터
  .filter-container {
    width: 100%;
    min-width: 100%;
    padding-top: 0px;
    flex: 0 0 100px;
    height: 100px;
    top: 60px;
    .filter-flex-box {
      width: 100%;
    }
    .filter-box {
      width: 100%;
      height: 100px;
      box-shadow: 0 2px 4px 0 rgba(8, 15, 49, 0.1);
      background-color: #f8f8fb;
      .filter-input {
        height: 32px;
      }
      .filter-button {
        position: relative;
        padding: 0 11px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        border-radius: 2px;
        font-size: 14px;
        font-weight: 300;
        color: rgba(8, 15, 49, 0.3);
        border: solid 1px rgba(110, 110, 120, 0.5);
        background-color: rgba(255, 255, 255, 0.2);
        &.is-active {
          border: solid 1px #080f31;
          background-color: #fff;
          color: #080f31 !important;
          &::after {
            top: 4px;
            right: 4px;
            position: absolute;
            content: '';
            display: block;
            width: 3px;
            height: 3px;
            background-color: #080f31;
          }
        }
      }
    }
    .filter-item {
      position: relative;
      margin-right: 8px;
      height: 50px;
      // 중앙정렬
      top: 9px;
      &.address {
        // 중앙정렬 하지않기에 0값
        top: 0px;
        // 필터 가려짐 현상
        z-index: 1;
        width: 100%;
      }
      &.date {
        width: 50px;
        margin-left: 15px;
      }
      &.category {
        width: 75px
      }
      &.price {
        width: 50px;
      }
      &.add {
        width: 75px;
      }
    }
    // 모바일용 맵버튼
    .mobile-map-show-btn {
      width: 50px;
      height: 50px;
      background-color: #ececf4;
      .ic.icon-map {
        width: 18px;
        height: 100%;
        background-image: url("~assets/images/ic/ic_marker.png");
      }
    }
  }
  // 필터 모바일 팝업
  // 매체종류
  .filter-category-popup {
    height: 100%;
    .context-inner {
      width: 100%;
      padding-left: 29px;
      min-height: calc(100% - 145px);
      height: auto;
      overflow: auto;
      padding-top: 33px;
      padding-bottom: 60px;
      .checkbox {
        text-align: left;
      }
    }
  }
  // 가격
  .filter-item.price {
    .filter-price-popup {
      height: 100%;
      .context-inner {
        padding-left: 25px;
        padding-right: 9px;
        min-height: calc(100% - 145px);
        height: auto;
        overflow: auto;
        padding-bottom: 60px;
      }
    }
  }

  // 추가필터
  .filter-item.add {
    .filter-other-popup {
      height: 100%;
      .context-inner {
        text-align: left;
        padding-left: 15px;
        min-height: calc(100% - 145px);
        height: auto;
        overflow: auto;
        padding-bottom: 60px;
      }
    }
  }

  // 리스트
  .list-cotainer {
    .list-title {
      margin: 39px 0px 12px 5px;
      font-size: 18px;
      height: 54px;
      line-height: normal;
    }
  }
  // 맵
  .map-container {
    width: 100%;
    height: calc(100% - 160px);
    min-height: 408px;
    position: fixed;
    top: 160px;
    right: 0;
    z-index: 1;
    .swiper-box {
      position: absolute;
      width: 100%;
      left: 0;
      bottom: 0px;
      height: 131px;
      z-index: 1;
      margin-bottom: 17px;
      .swiper {
        position: relative;
        width: 345px;
        height: 100%;
        margin: 0 auto;
      }
    }
  }
  // 리스트
  .contents-list-wrapper {
    .list-box {
      min-height: 164px;
      margin-bottom: 0px;
      border-bottom: 1px solid #ececf4;
    }
    .pagination-box {
      padding-top: 15px;
    }
  }
  .contents-container {
    width: 100%;
    margin-top: 90px;
    height: 100%;
  }
  // // 모바일 필터 버튼 중앙정렬
  // .common-context-popup-wrapper {
  //   margin: 0;
  //   position: absolute;
  //   left: 0%;
  //   top: 50%;
  //   -webkit-transform: translate(0%, -50%);
  //   transform: translate(0%, -50%);
  // }
}

.billboard-list-page.wrapper {
  width: 100%;
  height: 100%;
  max-height: 100%;
  position: relative;
  display: flex;
  flex: 1 0 0%;
  flex-direction: column;
  .filter-container {
    width: 100%;
    display: flex;
    flex: 0 0 100px;
    position: fixed;
    min-width: 1440px;
    height: 100px;
    padding-top: 10px;
    z-index: 2;
    box-shadow: 0 7px 18px -8px rgba(8, 15, 49, 0.1);
    background-color: #fff;
    .filter-flex-box {
      position: relative;
      width: 1200px;
      height: 100px;
      box-sizing: border-box;
    }
    .filter-box {
      position: relative;
    }
    .filter-item {
      margin-right: 20px;
      height: 100%;
      &.address {
        min-width: 360px;
      }
      &.date {
        width: 280px;
      }
      &.category {
        width: 80px;
      }
      &.price {
        width: 80px;
      }
      &.add {
        width: 180px;
      }
      &.search {
        width: 80px;
      }
    }
  }
  .filter-item {
    &.price .context-inner {
      padding-right: 25px;
    }
    &.add .context-inner {
      padding-top: 0px;
      .sub-title {
        font-size: 16px;
        font-weight: normal;
        color: #080f31;
      }
      .sort-filter-box {
        height: 144px;
      }
      .add-filter-box {
        margin-top: 43px;
        height: 64px;
        clear: both;
        margin-bottom: 33px;
      }
    }
    &.search-btn .button {
      width: 80px;
      box-sizing: border-box;
      height: 42px;
      border-radius: 2px;
      background-color: #ececf4;
      color: #080f31;
      font-size: 14px;
      font-weight: normal;
    }
  }
  .filter-reset-box {
    position: absolute;
    padding-left: 22px;
    top: 42px;
    left: 0;
    height: 48px;
    line-height: 48px;
    cursor: pointer;
    .reset-icon {
      display: inline-block;
      width: 10px;
      height: 10px;
      background-image: url("~assets/images/ic/ic_reset.png");
    }
    .reset-text {
      font-size: 12px;
      font-weight: normal;
      color: #080f31;
      padding-left: 4px;
    }
  }
  .contents-container {
    flex: 1 1 auto;
    display: flex;
    position: relative;
    margin-top: 100px;
    height: calc(100% - 100px);
  }
  .list-cotainer {
    width: 800px;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    &.map-hide {
      width: 100%;
    }
  }
  .contents-list-wrapper {
    flex: 1;
    overflow: none;
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: 23px;
    .list-box {
      height: auto;
      min-height: 391px;
      padding: 0px 10px;
      margin-bottom: 90px;
    }
  }
  .list-title {
    height: 36px;
    line-height: 36px;
    color: #080f31;
    font-size: 24px;
    font-weight: 300;
    margin: 45px 0px;
    padding-left: 10px;
    flex: 0 0 36px;
    .count {
      font-weight: 500;
    }
  }
  .pagination-box {
    width: 100%;
    clear: both;
    flex: 0 0 35px;
    height: 35px;
    max-width: 380px;
  }
  .filter-box {
    height: 42px;
    .filter-input {
      height: 42px;
    }
    .filter-button {
      font-size: 16px;
      height: 42px;
      padding: 0px 25px;
      &.add {
        padding: 0px 60px;
      }
    }
  }
  .filter-header {
    height: 65px;
    .title {
      height: 29px;
      line-height: 29px;
      font-size: 20px;
      color: #080f31;
      margin-bottom: 8px;
    }
    .sub-title-box {
      .sub-title {
        height: 20px;
        line-height: 20px;
        font-size: 14px;
        color: #6e6e78;
        text-align: left;
      }
      .count {
        font-size: 16px;
        color: #080f31;
        height: 24px;
        line-height: 24px;
        text-align: right;
        padding-right: 32px;
        box-sizing: border-box;
      }
    }
  }
  .map-container {
    width: calc(100% - 800px);
    height: calc(100% - 170px);
    position: fixed;
    top: 170px;
    right: 0;
  }
  .map-show-btn {
    position: fixed;
    top: 195px;
    right: 25px;
    z-index: 1;
    cursor: pointer;
    width: 81px;
    font-size: 14px;
    font-weight: normal;
    color: #6e6e78;
    text-align: center;
    height: 36px;
    line-height: 36px;
    border-radius: 2px;
    box-shadow: 2px 1px 6px 0 #dedee0;
    background-color: #fff;
    &.maphide {
      top: 25px;
      position: absolute;
    }
  }
  .common-card-wrapper > .normal.carousel .status-box {
    width: calc(100% - 20px);
    left: 10px;
  }
}

@media screen and (min-width: 1480px), print {
  .billboard-list-page.wrapper.map-hide .cols .col-3 {
    width: 20%;
  }
}
@media screen and (max-width: 1100px), print {
  .billboard-list-page.wrapper.map-hide .cols .col-3 {
    width: 33.3%;
  }
}
</style>
