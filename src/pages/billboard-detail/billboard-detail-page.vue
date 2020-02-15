/* eslint-disable quotes */

<template>
  <div class="billboard-detail-page wrapper margin-center" :class="{ 'login' : getUserInfo }">
    <div class="cols" v-if="!getIsMobile">
      <div class="detail-main-container col-8">
        <div class="detail-header-cotainer relative">
          <div class="title-box relative">
            <span class="title relative">
              {{ infoData.title }}
              <span class="lowprice-certification-mark vertical-center" v-if="infoData.lowestPriceVerificationFilePath">최저가 인증</span>
            </span>
          </div>
          <div class="info-box cols">
            <div class="col-6">
              <div class="item relative">
                <span class="info-title relative">{{ '가격' | centerDot }}</span><span class="info-value">{{ headerPriceUnit.price | numberComma }}</span>
                <span class="info-value relative" v-if="headerPriceUnit.label">/ {{ headerPriceUnit.label }}</span>
                <div class="unit-btn-inner relative"  @click="changePriceUnitType('header')">
                  <div class="unit-btn-box vertical-center" v-if="headerPriceUnit.btnLabel">
                    <span class="ic unit-icon"></span>
                    <span class="text">{{ headerPriceUnit.btnLabel }}</span>
                  </div>
                </div>
                <!-- <span class="price-unit">월</span> -->
              </div>
              <div class="item">
                <span class="info-title">{{ '면적' | centerDot }}</span><span class="info-value">{{ infoData.adArea.width }}m x {{ infoData.adArea.height }}m</span>
              </div>
              <div class="item">
                <span class="info-title">{{ '해상도' | centerDot }}</span><span class="info-value">{{ infoData.adResolution.width }} x {{ infoData.adResolution.height }}</span>
              </div>
            </div>
            <div class="col-6">
              <div class="item">
                <span class="info-title">{{ '매체' | centerDot }}</span><span class="info-value">{{ infoData.categoriesName }}</span>
              </div>
              <div class="item">
                <span class="info-title">{{ '도로명' | centerDot }}</span><span class="info-value">{{ infoData.originRoadName }}</span>
              </div>
              <div class="item">
                <span class="info-title">{{ '도로방향' | centerDot }}</span><span class="info-value">{{ infoData.directionRoadName }}</span>
              </div>
            </div>
          </div>
          <div class="management-period">관리기한 {{ $moment(infoData.managementEndDate).format('YYYY년 MM월 DD일') }}</div>
        </div>
        <div class="preview-image-box">
          <div id="panorama" :class="{ 'show-360-image' : !currentActiveIsNoramlImage }"></div>
          <div class="photo-preview-box" :class="{ 'show-normal-image' : currentActiveIsNoramlImage }">
            <img class="photo-preview img" :src="imageViewerPath"/>
          </div>
        </div>
        <div class="thumbnail-image-box cols">
          <div class="img fl" v-for="item in thumbnailImageFilter" :key="item.id" v-bind:style="{ 'background-image': 'url(' + item.image + ')' }" @click="clickThumbnailImage(item)"></div>
          <div class="allview fl" @click="billboardImageAllviewerShow" v-if="infoData.ad360Images.length >= 3">
            <div class="img allview-image-cover"></div>
            <div class="img allview-image" v-bind:style="{ 'background-image': 'url(' + infoData.ad360Images[2].image + ')' }"></div>
            <span class="vertical-center allview-text">{{ infoData.ad360Images.length }}개 전체보기</span>
          </div>
        </div>
        <div class="lowprice-certification-desc" v-if="infoData.lowestPriceVerificationFilePath">
          <div class="desc">{{ '본 상품은 최저가로 인증된 상품입니다.' | centerDot }}</div>
          <div >
            <a class="confirm" @click="downloadLowestPriceVerificationFile">인증서 확인하기</a>
          </div>
        </div>
        <div class="desc-inner">
          <div class="short-desc" v-html="infoData.shortDesc"></div>
          <div class="desc" :class="{ 'detail' : descDetailShow }" v-html="infoData.desc"></div>
          <div class="detail-view" v-if="infoData.desc.length >= 273" @click="descDetailShow = !descDetailShow">자세히 보기</div>
        </div>
        <div class="video-360-inner">
          <div class="title">360 영상</div>
          <div class="video-360-box">
            <common-tab :data="tabs.data" :currentTab="tabs.selectedTab" @onSelectedTab="onSelectedTab">
            </common-tab>
            <div class="selected-video" v-if="currentTab.car" v-html="currentTab.car.url">
            </div>
            <div class="selected-video"  v-if="currentTab.sidewalk" v-html="currentTab.sidewalk.url">
            </div>
          </div>
        </div>
        <div class="location-box">
          <div class="title">위치</div>
          <div class="address">{{ infoData.address }}</div>
          <div id="detail-map">지도</div>
        </div>
        <div class="last-history-box">
          <div class="title">지난 이력</div>
          <common-cardbox :data="historyData" v-for="historyData in infoData.usageHistory" :key="historyData.id"></common-cardbox>
        </div>
      </div>
      <detail-date-calculation :isInfoData="infoData" :currentId="currentId" :isApplyInputDate="isApplyInputDate" ref="detailDateCalculation"></detail-date-calculation>
    </div>
    <div class="detail-main-container" v-else-if="getIsMobile">
      <!-- 이미지 뷰어 -->
      <div class="preview-image-box">
        <div id="panorama" :class="{ 'show-360-image' : !currentActiveIsNoramlImage }"></div>
        <div class="photo-preview-box" :class="{ 'show-normal-image' : currentActiveIsNoramlImage }">
          <img class="photo-preview img" :src="imageViewerPath"/>
        </div>
      </div>
      <div class="thumbnail-image-box cols">
        <div class="img fl" v-for="item in thumbnailImageFilter" :key="item.id" v-bind:style="{ 'background-image': 'url(' + item.image + ')' }" @click="clickThumbnailImage(item)"></div>
        <div class="allview fl" @click="billboardImageAllviewerShow" v-if="infoData.ad360Images.length >= 3">
          <div class="img allview-image-cover"></div>
          <div class="img allview-image" v-bind:style="{ 'background-image': 'url(' + infoData.ad360Images[2].image + ')' }"></div>
          <span class="vertical-center allview-text">{{ infoData.ad360Images.length }}개 전체보기</span>
        </div>
      </div>
      <!-- 광고판 정보 -->
      <div class="detail-header-cotainer relative">
        <div class="view-box inner-padding">
          <div class="full-height"><span class="ic ic-views"></span><span class="views sub-color">{{ infoData.views }}</span></div>
        </div>
        <div class="price-calc-container inner-padding">
          <div class="datepicker-input-box">
            <div class="contents">
              <div class="step-2">
                <div class="price-title-box relative">
                  <span class="price relative" :class="[navPriceUnit.label ? '' : 'price-disabled']">{{ navPriceUnit.price | numberComma }}</span>
                  <span class="unit relative" v-if="navPriceUnit.label">/ {{ navPriceUnit.label }}</span>
                  <div class="unit-btn-inner relative" @click="changePriceUnitType('nav')">
                    <div class="unit-btn-box vertical-center" v-if="navPriceUnit.btnLabel">
                      <span class="ic unit-icon"></span>
                      <span class="text">{{ navPriceUnit.btnLabel }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 제목 || 최저가인증 -->
        <div class="title-box relative">
          <span class="title relative">
            {{ infoData.title }}
          </span>
        </div>
        <div class="certification-box">
          <span class="lowprice-certification-mark" v-if="infoData.lowestPriceVerificationFilePath">최저가 인증</span>
        </div>
        <div class="lowprice-certification-desc" v-if="infoData.lowestPriceVerificationFilePath">
          <div class="desc">{{ '본 상품은 최저가로 인증된 상품입니다.' | centerDot }} <a class="confirm" @click="downloadLowestPriceVerificationFile">인증서 확인하기</a></div>
        </div>
        <!-- 광고판 정보 -->
        <div class="info-box cols">
          <div class="col-6">
            <div class="item">
              <div class="info-title">{{ '매체' | centerDot }}</div><div class="info-value">{{ infoData.categoriesName }}</div>
            </div>
            <div class="item">
              <div class="info-title">{{ '도로명' | centerDot }}</div><div class="info-value">{{ infoData.originRoadName }}</div>
            </div>
            <div class="item">
              <div class="info-title">{{ '도로방향' | centerDot }}</div><div class="info-value">{{ infoData.directionRoadName }}</div>
            </div>
          </div>
          <div class="col-6">
            <div class="item">
              <div class="info-title">{{ '면적' | centerDot }}</div><div class="info-value">{{ infoData.adArea.width }}m x {{ infoData.adArea.height }}m</div>
            </div>
            <div class="item">
              <div class="info-title">{{ '해상도' | centerDot }}</div><div class="info-value">{{ infoData.adResolution.width }} x {{ infoData.adResolution.height }}</div>
            </div>
            <div class="item">
              <div class="info-title">{{ '관리기한' | centerDot }}</div><div class="info-value">{{ infoData.managementEndDate }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 설명 -->
      <div class="desc-inner inner-padding">
        <div class="short-desc" v-html="infoData.shortDesc"></div>
        <div class="desc" :class="{ 'detail' : descDetailShow }" v-html="infoData.desc"></div>
        <div class="detail-view" v-if="infoData.desc.length >= 273" @click="descDetailShow = !descDetailShow">자세히 보기</div>
      </div>
      <!-- 360영상 -->
      <div class="video-360-inner">
        <div class="title">360 영상</div>
        <div class="video-360-box">
          <div class="inner-padding dropdown-list-box">
            <common-select class="fl select-box view" :options="video.select.view.options" :placeholder="video.select.view.placeholder" @onSelected="_onChangeSelectViewValue"></common-select>
            <common-select class="fl select-box day" :options="video.select.day.options" :placeholder="video.select.day.placeholder" @onSelected="_onChangeSelectDayValue"></common-select>
          </div>
          <div class="selected-video" v-if="currentVideoSelect.car && video.select.view.seletedValue === 'car'" v-html="currentVideoSelect.car.url">
          </div>
          <div class="selected-video" v-if="currentVideoSelect.sidewalk && video.select.view.seletedValue === 'sidewalk'" v-html="currentVideoSelect.sidewalk.url">
          </div>
        </div>
      </div>
      <!-- 위치 -->
      <div class="location-box">
        <div class="title">위치</div>
        <div class="address">{{ infoData.address }}</div>
        <div id="detail-map">지도</div>
      </div>
      <!-- 지난이력 -->
      <div class="last-history-box">
        <div class="title">지난 이력</div>
        <common-cardbox :data="historyData" v-for="historyData in infoData.usageHistory" :key="historyData.id"></common-cardbox>
      </div>
      <!-- 날짜 입력 -->
      <button class="button primary date-calculation" :disabled="infoData.status !== 'open'" @click="openModalDateCalculation">
        {{ mobileDateCalculationText }}
      </button>
    </div>
    <sweet-modal
    class="modal-date-calculation"
    ref="modalDateCalculation"
    :enable-mobile-fullscreen="true"
    :hide-close-button="false"
    :title="'예약하기'"
    :blocking="true"
    >
      <div slot="loading" v-common-loading-panel="modal.loading.modalDateCalculation"></div>
      <!-- <div class="footer-btn-box" slot="button">
        <div class="cols">
          <div class="col-12 join-button primary button" @click="close">확인</div>
        </div>
      </div> -->
      <div class="date-calculation-container margin-center">
        <detail-date-calculation :isInfoData="infoData" :currentId="currentId" @onChangeCalendar="onChangeCalendar" :isApplyInputDate="isApplyInputDate" ref="detailDateCalculation"></detail-date-calculation>
      </div>
    </sweet-modal>
    <common-photo-viewer class="detail-photo-viewer" :data="infoData.ad360Images" :show="detail.showPhotoViewer" @onHide="onHidePhotoViewer"></common-photo-viewer>
  </div>
</template>

<script>
import CommonPhotoViewer from 'components/common/common-photo-viewer'
import CommonTab from 'components/common/common-tab'
import CommonCardbox from 'components/common/common-cardbox'
import CommonSelect from 'components/common/common-select'
import { SweetModal } from 'sweet-modal-vue'
import DetailDateCalculation from 'components/detail/detail-date-calculation'

const ad360VideoTimeType = ['weekend_day_time', 'weekend_night_time', 'weekday_day_time', 'weekday_night_time']
const ad360VideoViewType = ['car', 'sidewalk']
const monthDays = 31

export default {
  metaInfo () {
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
          "@context": "http://schema.org",
          "@type" : "Product",
          "name" : "빌차",
          "alternateName": "(주)빌차",
          "description": "해당 광고판을 ` + this.infoData.favoritesCount + `명 좋아헤요",
          "offers" : {
            "@type": "Offer",
            "price": "` + this.infoData.price + `"
            "priceCurrency": "KRD",
            "itemCondition": "https://schema.org/UsedCondition",
            "availability": "https://schema.org/InStock",
          }
        }`,
        type: 'application/ld+json'
      }],
      __dangerouslyDisableSanitizersByTagID: {
        'ldjson-schema': ['innerHTML']
      }
    }
  },
  name: 'billboard-detail-page',
  components: {
    CommonPhotoViewer,
    CommonTab,
    // Tabs,
    // TabPane,
    CommonCardbox,
    CommonSelect,
    DetailDateCalculation,
    SweetModal
  },
  data () {
    return {
      currentId: null,
      nextStep: false,
      pannellumSDK: null,
      imageViewerPath: null,
      isApplyInputDate: false,
      currentActiveIsNoramlImage: false,
      infoData: {
        views: 0,
        status: '',
        title: '',
        categoriesName: '',
        adArea: {
          width: 0,
          height: 0
        },
        adResolution: {
          width: 0,
          height: 0
        },
        address: '',
        originRoadName: '',
        directionRoadName: '',
        lowestPriceVerificationFilePath: null,
        expectedOpeningDate: 0,
        managementEndDate: 0,
        minAdScheduleDays: 0,
        shortDesc: '',
        desc: '',
        representativeImg360Path: null,
        ad360Images: [],
        ad360Videos: [],
        calendar: {
          startDate: void 0,
          endDate: void 0,
          count: 0
        },
        adProductionCost: null,
        serviceFees: null,
        discountPercentage: null,
        checkDatepickerInputStep: true,
        usageHistory: []
      },
      descDetailShow: false,
      previewImage: require('../../assets/images/360viewer-sample.jpg'),
      video: {
        select: {
          view: {
            options: [{ label: '차랑 View', value: 'car' }, { label: '도보 View', value: 'sidewalk' }],
            placeholder: '차랑 View',
            disabled: false,
            seletedValue: 'car'
          },
          day: {
            options: [ { label: '주말 주간', value: 'weekendDaytime' }, { label: '주말 야간', value: 'weekendNighttime' }, { label: '평일 주간', value: 'weekdayDaytime' }, { label: '평일 야간', value: 'weekdayNighttime' } ],
            placeholder: '평일 주간',
            disabled: false,
            seletedValue: { value: 'weekendDaytime' }
          },
          typeSeletedValue: null
        }
      },
      tabs: {
        data: [
          { title: '주말 주간', value: 'weekendDaytime', src: { car: '', sidewalk: '' } },
          { title: '주말 야간', value: 'weekendNighttime', src: { car: '', sidewalk: '' } },
          { title: '평일 주간', value: 'weekdayDaytime', src: { car: '', sidewalk: '' } },
          { title: '평일 야간', value: 'weekdayNighttime', src: { car: '', sidewalk: '' } }
        ],
        selectedTab: 'weekendDaytime'
      },
      map: {
        sdk: null
      },
      detail: {
        showPhotoViewer: true
      },
      requestApiData: [],
      priceUnit: {
        header: 'month',
        nav: 'month'
      },
      modal: {
        loading: {
          modalDateCalculation: false
        }
      }
    }
  },
  computed: {
    getIsMobile () {
      return this.$store.getters.getIsMobile
    },
    getUserInfo () {
      this.$nextTick(() => {
        if (this.$store.getters.getUserInfo.name) this.requestFavoriteBliiboardData()
      })
      return this.$store.getters.getUserInfo
    },
    metaInfoData () {
      var result = {
        title: this.infoData.title + ' | ' + this.infoData.originRoadName + ' | ' + this.infoData.categoriesName + ' | 빌차',
        description: this.infoData.shortDesc + ' | 가격 : ' + this.infoData.price + ' | 매체: ' + this.infoData.categoriesName + ' | 면적: ' + this.infoData.adArea.width + 'x' + this.infoData.adArea.height,
        image: this.infoData.representativeImgPath,
        tag: this.infoData.categoriesName + '/' + this.infoData.originRoadName + '/' + this.infoData.directionRoadName,
        cannonical: window.location.href,
        url: window.location.href,
        jsonld: {
          'offers': {
            'priceCurrency': 'KRD',
            'price': this.infoData.price
          }
        }
      }
      // result.jsonld = JSON.stringify(result.jsonld, null, 2)

      return result
    },
    thumbnailImageFilter () {
      return this.infoData.ad360Images.slice(0, 2)
    },
    currentTab () {
      let self = this
      return this.tabs.data.filter((tab) => {
        return tab.value === self.tabs.selectedTab
      })[0]
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
    headerPriceUnit () {
      return this.changePriceUnitObject(this.priceUnit.header)
    },
    navPriceUnit () {
      return this.changePriceUnitObject(this.priceUnit.nav)
    },
    mobileDateCalculationText () {
      return (this.infoData.calendar.startDate && this.infoData.calendar.endDate) ? '예약하기' : '날짜 입력'
    }
  },
  beforeMount () {
  },
  mounted () {
    this.init()
    this.detail.showPhotoViewer = false
  },
  methods: {
    init () {
      this.currentId = this.$route.query.id
      this.pannellumSDK = null
      this.infoData = {
        views: 0,
        status: '',
        title: '',
        categoriesName: '',
        adArea: {
          width: 0,
          height: 0
        },
        adResolution: {
          width: 0,
          height: 0
        },
        address: '',
        originRoadName: '',
        directionRoadName: '',
        expectedOpeningDate: 0,
        managementEndDate: 0,
        minAdScheduleDays: 0,
        lowestPriceVerificationFilePath: null,
        shortDesc: '',
        desc: '',
        representativeImgPath: '',
        representativeImg360Path: null,
        ad360Images: [],
        ad360Videos: [],
        lat: 0,
        lng: 0,
        calendar: {
          startDate: void 0,
          endDate: void 0,
          count: 0,
          select: {
            options: [{label: '1개월', value: 1}, {label: '2개월', value: 2}, {label: '3개월', value: 3}],
            placeholder: '월 단위 선택'
          }
        },
        price: 0,
        adProductionCost: 0,
        serviceFees: 0,
        favoriteCheck: false,
        favoritesCount: 0,
        discountPercentage: 0,
        checkDatepickerInputStep: true,
        usageHistory: []
      }
      if (this.$route.query.startDate && this.$route.query.endDate) {
        this.infoData.calendar.startDate = this.$route.query.startDate
        this.infoData.calendar.endDate = this.$route.query.endDate
        this.isApplyInputDate = true
        this.$nextTick(() => {
          this.$refs.detailDateCalculation.applyDate()
        })
      } else {
        this.isApplyInputDate = false
      }
      this.requestBillboardDetailData()
    },
    _unlockBody () {
      this.$nextTick(() => {
        document.body.style.height = '100%'
        document.body.style.overflow = ''
      })
    },
    _openPopup () {
      this._unlockBody()
    },
    set360Viewer (getImage) {
      var self = this
      var initImage = { image: '' }
      initImage.image = this.infoData.isRepresentativeImg360AnormalImage ? window.location.origin + self.infoData.representativeImgPath : window.location.origin + self.infoData.representativeImg360Path
      var image = getImage || initImage
      var isNormalImage = false
      // var image = self.infoData.representativeImg360Path
      if (this.pannellumSDK) this.pannellumSDK.destroy()
      if (getImage) {
        isNormalImage = getImage.isNormalImage
      } else {
        isNormalImage = this.infoData.isRepresentativeImg360AnormalImage
      }
      this.currentActiveIsNoramlImage = isNormalImage
      if (isNormalImage) {
        this.imageViewerPath = image.image
      } else {
        this.pannellumSDK = window.pannellum.viewer('panorama', {
          'type': 'equirectangular',
          'panorama': image.image,
          // 'dynamic': true,
          'preview': self.previewImage,
          'autoLoad': true
        })
      }
    },
    requestFavoriteBliiboardData () {
      var self = this
      if (!this.getUserInfo.name) return
      this.$axios.get('/api/v1/favorite_billboards').then((respFavoriteBliiboardData) => {
        var data = respFavoriteBliiboardData.data.items
        for (var i = 0, max = data.length; i < max; i++) {
          if (data[i].id === Number(self.currentId)) {
            self.infoData.favoriteCheck = true
            break
          }
        }
      }).catch(function (error) {
        if (error) {
        }
      }).then(() => {
      })
    },
    requestBillboardDetailData () {
      var self = this
      this.$store.commit('setRootLoading', true)
      this.$axios.get('/api/v1/billboards/' + this.currentId).then((respBillboardDetailData) => {
        self.setBillboardDetailData(respBillboardDetailData.data)
      }).catch(function (error) {
        if (error) {
        }
      }).then(() => {
        self.$store.commit('setRootLoading', false)
      })
    },
    setBillboardDetailData (data) {
      this.parsingBillboardDetailData(data)
    },
    changePriceUnitObject (type) {
      var result
      if (this.infoData.status === 'ready') {
        result = {
          price: '비공개 (' + this.$moment(this.infoData.expectedOpeningDate).format('MM월 DD일') + ' 오픈)',
          label: '',
          btnLabel: ''
        }
        return result
      }
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
    parsingBillboardDetailData (data) {
      var self = this
      var infoData = this.infoData
      infoData.views = data.views
      infoData.status = data.status
      infoData.title = data.title
      infoData.price = data.price
      infoData.categoriesName = data.categories[0].name
      infoData.adArea.width = data.ad_area_width
      infoData.adArea.height = data.ad_area_height
      infoData.address = data.address
      infoData.originRoadName = data.origin_road_name
      infoData.adResolution.width = data.ad_resolution_width
      infoData.adResolution.height = data.ad_resolution_height
      infoData.directionRoadName = data.direction_road_name
      infoData.lowestPriceVerificationFilePath = data.lowest_price_verification_file_path
      infoData.expectedOpeningDate = data.expected_opening_date
      infoData.managementEndDate = data.management_end_date
      infoData.minAdScheduleDays = data.min_ad_schedule_days
      infoData.favoritesCount = data.favorites_count
      infoData.shortDesc = data.short_desc
      infoData.desc = data.desc
      infoData.isRepresentativeImg360AnormalImage = data.is_representative_img_360_a_normal_image
      infoData.representativeImgPath = '/static/' + data.representative_img_path
      infoData.representativeImg360Path = '/static/' + data.representative_img_360_path
      infoData.ad360Images = []
      var ad360Result = []
      for (let index = 0; index < data.ad_360_images.length; index++) {
        const item = data.ad_360_images[index]
        ad360Result.push({
          id: item.id,
          desc: item.desc,
          isNormalImage: item.is_normal_image,
          image: '/static/' + item.img_path
        })
      }
      infoData.ad360Images = ad360Result
      for (var i = 0; i < ad360VideoTimeType.length; i++) {
        var timeType = ad360VideoTimeType[i]
        infoData.ad360Videos[i] = {}
        for (var j = 0; j < ad360VideoViewType.length; j++) {
          var viewType = ad360VideoViewType[j]
          data.ad_360_videos.forEach((item, index) => {
            if (item.time_type === timeType && item.view_type === viewType) {
              // infoData.ad360Videos[i][viewType] = {
              self.tabs.data[i][viewType] = {
                id: item.id,
                desc: item.desc,
                url: item.linked_url
              }
            }
          })
        }
      }
      infoData.lat = data.lat
      infoData.lng = data.lng
      infoData.adProductionCost = data.ad_production_cost
      infoData.serviceFees = data.service_fees
      infoData.discountPercentage = data.discount_percentage
      this.setHistory(data.usage_history)
      this.set360Viewer()
      this.mapInit()
    },
    setHistory (data) {
      this.infoData.usageHistory = []
      for (var i = 0; i < data.length; i++) {
        var item = data[i]
        var startData = this.$moment(item.ad_start_date).format('YYYY.MM.DD')
        var endData = this.$moment(item.ad_end_date).format('YYYY.MM.DD')
        var count = this.$moment(endData).diff(this.$moment(startData), 'days')
        this.infoData.usageHistory.push({
          image: '/static/' + item.img_path,
          title: item.ad_product_name,
          subTitle: item.advertiser_name,
          date: startData + ' - ' + endData,
          dateCount: count + '일'
        })
      }
    },
    onHidePhotoViewer () {
      this.detail.showPhotoViewer = false
    },
    clickThumbnailImage (item) {
      this.set360Viewer(item)
    },
    mapInit () {
      var self = this
      var kakao = window.kakao
      var container = document.getElementById('detail-map') // 지도를 담을 영역의 DOM 레퍼런스
      var options = { // 지도를 생성할 때 필요한 기본 옵션
        center: new kakao.maps.LatLng(this.infoData.lat, this.infoData.lng), // 지도의 중심좌표.
        level: 3 // 지도의 레벨(확대, 축소 정도)
      }
      this.map.sdk = new kakao.maps.Map(container, options) // 지도 생성 및 객체 리턴

      // 마커가 표시될 위치입니다
      var markerPosition = new kakao.maps.LatLng(this.infoData.lat, this.infoData.lng)

      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        position: markerPosition,
        clickable: false,
        image: self.setMarkerImage()
      })

      // 마커가 지도 위에 표시되도록 설정합니다
      marker.setMap(this.map.sdk)
    },
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
    changePage (idx) {
      console.log(idx)
    },
    billboardImageAllviewerShow () {
      this.detail.showPhotoViewer = true
    },
    onSelectedTab (selectedTab) {
      this.tabs.selectedTab = selectedTab
    },
    changePriceUnitType (type) {
      this.priceUnit[type] = this.priceUnit[type] === 'month' ? 'day' : 'month'
    },
    downloadLowestPriceVerificationFile () {
      var url = window.location.origin + '/static/' + this.infoData.lowestPriceVerificationFilePath
      if (window.navigator && window.navigator.msSaveOrOpenBlob) { // for IE
        this.$store.commit('setRootLoading', true)
        var pdfData
        var fileName = url.split('/').pop()
        this.$axios.get(url, {responseType: 'arraybuffer'})
          .then((response) => {
            pdfData = new Blob([response.data], { type: 'application/pdf' })
            window.navigator.msSaveOrOpenBlob(pdfData, fileName)
          }).catch(() => {
          }).then(() => {
            self.$store.commit('setRootLoading', false)
          })
      } else {
        var link = document.createElement('a')
        link.href = url
        link.download = 'lowestPriceVerification.pdf'
        link.dispatchEvent(new MouseEvent('click'))
        window.URL.revokeObjectURL(url)
        link.remove()
      }
    },
    // 모바일 306영상 드롭다운리스트
    _onChangeSelectViewValue (value) {
      this.video.select.view.seletedValue = value.value
    },
    _onChangeSelectDayValue (value) {
      this.video.select.day.seletedValue = value
    },
    openModalDateCalculation () {
      this.$refs.modalDateCalculation.open()
    },
    onChangeCalendar (date) {
      this.infoData.calendar.startDate = date.startDate
      this.infoData.calendar.endDate = date.endDate
      this.infoData.calendar.count = date.count
    }
  },
  watch: {
  },
  filters: {
  },
  destroyed () {
    document.removeEventListener('click', this.documentClick)
  },
  beforeRouteLeave (to, from, next) {
    next()
    // 이 컴포넌트를 렌더링하는 라우트가 이전으로 네비게이션 될 때 호출됩니다.
    // `this` 컴포넌트 인스턴스에 접근 할 수 있습니다.
  }
}
</script>
<style lang="stylus">
.mobile
  .inner-padding
    padding 0 15px
  .billboard-detail-page.wrapper
    min-width 360px
    margin 0px
    // 미리보기 이미지 || 360 뷰어
    .preview-image-box
      height 177px
      margin 0
    .thumbnail-image-box
      height 71px
      .img
        height 71px
        margin 0px
      .allview
        width 27%
        height 71px
        .allview-text
         font-size 10px
    // 조회수
    .view-box
      height 34px
      .views
        font-size 10px
        font-weight: 500
        line-height normal
        height 100%
        display inline-block
        vertical-align top
        line-height 34px
      .ic-views
        vertical-align top
        margin-right 3px
        width 16px
        height 100%
        display inline-block
        background-image url('~assets/images/ic/ic_views.png')
    // 가격정보
    .price-calc-container
      width 100%
      .datepicker-input-box
        border none
        > .contents .step-2
          padding 0px
          .price-title-box
            text-align center
            height 29px
            line-height 29px
            padding-bottom 9px
            .price-disabled
              display inline-block
              width 100%
    .detail-header-cotainer
      .title-box
        height 19px
        margin-bottom 28px
      .title
        max-width: 100%
        font-size: 13px
        font-weight: 300
        text-align: center
        width: 100%
        line-height 19px
        vertical-align top
      // 최저가 인증 마크
      .certification-box
        width: 68px
        height: 19px
        margin: 0 auto
        position: relative
      .lowprice-certification-mark
        top initial
        right initial
        left inherit
        background-color #fff
        border solid 1px #e10b4d
        color #e10b4d
        font-size 10px
        font-weight 500
        padding 0px 8px
        vertical-align top
      // 최저가 문구
      .lowprice-certification-desc
        text-align center
        margin-bottom 30px
        .desc, .confirm
          height 32px
          line-height 32px
          font-size 10px
          font-weight 300
        .confirm
          padding-left 4px
      // 광고판 정보
      .info-box
        padding 16px 16px 0px 16px
        border: 0
        height: 177px
        border-radius: 2px
        background-color: #f8f8fb
        margin-bottom 45px
        .item
          height 54px
          line-height normal
          margin 0
          .info-title
            display block
            font-size 10px
            font-weight normal
          .info-value
            font-size 14px
            font-weight normal
            display block
    .detail-main-container
      margin 0
      // 설명
      > .desc-inner
        margin-top 45px
        margin-bottom 74px
        .short-desc
          font-size 18px
          font-weight 500
          margin-bottom 18px
        > .desc
          font-size 14px
          font-weight 300
          margin-bottom 17px
        .detail-view
          font-size 14px
          font-weight 300
      .video-360-box
        margin-top 20px
        .dropdown-list-box
          height 43px
        .select-box
          width calc(50% - 7px)
          &.view
            margin-right 11px
        .selected-video
          margin-top 18px
          height 230px
      .location-box
        margin-top 67px
        margin-bottom 89px
        .title
          margin-bottom 3px
        .address
          margin-bottom 19px
          padding 0
        #detail-map
          height 203px
    .button.date-calculation
      position fixed
      bottom 0px
      width 100%
      height 60px
      font-size 16px
      font-weight normal
      z-index 2
.root-layout-wrapper.mobile
  .modal-date-calculation
    > .sweet-modal.theme-light
      > .sweet-content
        height calc(100% - 60px)
.billboard-detail-page.wrapper
  margin-top 190px
  min-width 1200px
  height 100%
  margin-bottom 0px
  position relative
  .show-360-image
    z-index 2
  .photo-preview-box
    width 100%
    height 100%
    position absolute
    top 0
    left 0
    display none
    &.show-normal-image
      z-index 2
      display block
    .photo-preview
      width 100%
      height 100%
  .detail-main-container
    // width 66.6%
    margin-right 20px
    margin-top 15px
    max-width 800px
  .detail-header-cotainer
    height auto
    .title
      display inline-block
      max-width calc(100% - 104px)
      font-size 32px
      font-weight 500
      color #080f31
      margin-bottom 48px
    .lowprice-certification-mark
      display inline-block
      height 20px
      border-radius 4px
      background-color #e10b4d
      font-size 12px
      font-weight 500
      color #ffffff
      padding 0px 11px
      line-height 20px
      left inherit
      right -104px
    .info-box
      height 198px
      border-radius 2px
      border solid 1px #080f31
      border-top solid 4px #080f31
      background-color #ffffff
      padding 20px 55px
      .item
        height 50px
        line-height 50px
        margin-right 20px
        font-size 16px
        font-weight normal
        .info-title
          display inline-block
          min-width 80px
          color #dedee0
          vertical-align top
        .info-value
          display inline-block
          color #080f31
          vertical-align top
    .management-period
      text-align right
      color #080f31
      font-size 14px
      font-weight 300
      padding 5px 0px 75px 13px
  .preview-image-box
    height 393px
    width 100%
    margin-bottom 29px
    position relative
  .thumbnail-image-box
    height 170px
    .img
      width 36.5%
      height 170px
      margin-right 20px
      background-size cover
      cursor pointer
    .allview
      width calc(27% - 40px)
      height 170px
      position relative
      cursor pointer
      .allview-image-cover
        position absolute
        top 0
        left 0
        background-color rgba(0, 0, 0, 0.4)
        width 100%
        height 100%
      .allview-image
        width 100%
        height 100%
      .allview-text
        font-size: 18px
        width 100%
        font-weight: 300
        text-align: center
        color: rgba(255, 255, 255, 0.64)
  // 인증서 설명
  .lowprice-certification-desc
    text-align right
    .desc, .confirm
      height 32px
      font-size 16px
      font-weight 300
      line-height 32px
    .confirm
      text-decoration underline
  // 광고판 설명
  .detail-main-container
    > .desc-inner
      margin-top 117px
      margin-bottom 193px
      .short-desc
        font-size 24px
        font-weight 500
        margin-bottom 33px
      > .desc
        max-height 128px
        line-height 2
        font-size: 16px
        font-weight: 300
        margin-bottom 23px
        overflow hidden
        transition all 1s ease-in-out
        &.detail
          max-height 5000px
      .detail-view
        font-size: 16px
        font-weight: 300
        text-decoration underline
        cursor pointer
  // 360 영상
  .video-360-inner
    height auto
    .title
      font-size 32px
      font-weight 500
      text-align center
    .video-360-box
      margin-top 65px
      height auto
    .selected-video
      margin-top 50px
      width 100%
      height 400px
      > iframe
        width 100%
        height 100%
  // 위치
  .location-box
    margin-top 130px
    margin-bottom 187px
    .title
      font-size 32px
      font-weight 500
      text-align center
    .address
      text-align center
      padding-top 14px
      padding-bottom 39px
      font-size 18px
      font-weight 300
    #detail-map
      width 100%
      height 340px
  // 지난 이력
  .last-history-box
    > .title
      font-size 32px
      font-weight 500
      text-align center
      margin-bottom 79px
  // 월 단위 버튼
  .unit-btn-inner
    display inline-block
    width 40px
    height 100%
    margin-left 14px
    cursor pointer
    .unit-icon
      margin-left 4px
      font-size: 14px
      font-weight: 500
      vertical-align top
    .unit-btn-box
      width 100%
      height 24px
      border-radius: 2px
      border: solid 1px #eeeeee
      background-color: #ffffff
    .ic.unit-icon
      position absolute
      top 0
      left 0px
      width: 14px
      height: 100%
      background-image url('~assets/images/ic/ic_reset.png')
      vertical-align text-top
    .text
      vertical-align top
      padding-left 21px
      font-size 12px
      line-height: 23px
      display: inline-block
      font-weight normal

</style>
