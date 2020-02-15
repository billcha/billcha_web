<template>
  <div class="root-layout-wrapper" :class="{ 'mobile' : getIsMobile, 'scroll-hide' : getRootScrollHide, 'ie' : msieversion() !== false }" v-common-loading-panel="getRootLoading">
    <header class="header" :class="{ 'popup-show' : popupShow }">
      <div class="header-box">
        <div class="slide-dim" v-if="getIsMobile" v-show="getShowSlideDim" @click="setHideSlideDim"></div>
        <div class="img logo" :class="[getIsMobile ? 'margin-center' : 'fl']" @click="moveHome"></div>
        <div class="fr menu" v-if="!getIsMobile">
          <a class="fl find-billboard" :class="[ menuActive === 'billboardList' ? 'active' : '']" @click="findBillboard">{{ $i18n.t('header.menu.billboard_find') }}</a>
          <a class="fl add-billboard" :class="[ menuActive === 'billboardRegister' ? 'active' : '']" @click="registerBillboard">{{ $i18n.t('header.menu.billboard_register') }}</a>
          <div class="fl" :class="[ menuActive === 'myInfo' ? 'active' : '']" v-if="getAccessToken">
            <common-context class="fl my-info" mode="noneModal" ref="myInfo" @openPopup="openMyInfoPopup" @closedPopup="closedMyInfoPopup"
              :position="'right'" :top="70" :width="160" :height="168">
              <a>{{ $i18n.t('header.menu.my_info') }}</a>
              <div slot="contents">
                <ul class="user-menu">
                  <li><a class="edit-info" @click="editInfo">{{ $i18n.t('header.menu.set_info') }}</a></li>
                  <li><a class="reservation-history" :class="[ menuActive === 'history' ? 'active' : '']" @click="reservationHistory">{{ $i18n.t('header.menu.reservation_history') }}</a></li>
                  <li><a class="favorite-list" :class="[ menuActive === 'favoriteBillboards' ? 'active' : '']" @click="favoriteList">{{ $i18n.t('header.menu.favorite_list') }}</a></li>
                  <li><a class="logout" @click="logout">{{ $i18n.t('header.menu.logout') }}</a></li>
                </ul>
              </div>
            </common-context>
          </div>
          <div class="fl" v-else>
            <a class="fl login" @click="showLoginModal">{{ $i18n.t('header.menu.login') }}</a>
            <a class="fl join" @click="showJoinModal">{{ $i18n.t('header.menu.join') }}</a>
          </div>
        </div>
        <Slide
          class="slide"
          :width="getSildeWidth"
          right
          :noOverlay="true"
          :disableOutsideClick="true"
          :isOpen="silde.open"
          :crossIcon="false"
          @openMenu="handleOpenSlideMenu"
          @closeMenu="silde.open = false;"
          v-else>
          <div class="" v-if="getAccessToken">
            <div class="user-info-box">
              <div class="greetings">{{ $i18n.t('header.menu.greetings') }}</div>
              <div class="user-name">{{ getUserInfo.name }}</div>
              <div class="user-email">{{ getUserInfo.email }}</div>
            </div>
            <div class="contents">
              <ul class="user-menu">
                <li><a class="find-billboard" :class="[ menuActive === 'billboardList' ? 'active' : '']" @click="findBillboard">{{ $i18n.t('header.menu.billboard_find') }}</a></li>
                <li><a class="" :class="[ menuActive === 'billboardRegister' ? 'active' : '']" @click="registerBillboard">{{ $i18n.t('header.menu.billboard_register') }}</a></li>
                <li @click="showHideMyInfo"><a :class="[ menuActive === 'myInfo' ? 'active' : '']" class="my-info">{{ $i18n.t('header.menu.my_info') }}</a></li>
                <li class=" user-info"><a class="edit-info" @click="editInfo" v-show="showMyInfo">{{ $i18n.t('header.menu.set_info') }}</a></li>
                <li class=" user-info"><a class="reservation-history" :class="[ menuActive === 'history' ? 'active' : '']" @click="reservationHistory" v-show="showMyInfo">{{ $i18n.t('header.menu.reservation_history') }}</a></li>
                <li class=" user-info"><a class="favorite-list" :class="[ menuActive === 'favoriteBillboards' ? 'active' : '']" @click="favoriteList" v-show="showMyInfo">{{ $i18n.t('header.menu.favorite_list') }}</a></li>
              </ul>
            </div>
            <div class="logout-box">
              <a class="logout" @click="logout">{{ $i18n.t('header.menu.logout') }}</a>
            </div>
          </div>
          <div class="not-connected" v-else>
            <div class="img logo"></div>
            <ul class="user-menu">
              <li><a class="find-billboard" :class="[ menuActive === 'billboardList' ? 'active' : '']" @click="findBillboard">{{ $i18n.t('header.menu.billboard_find') }}</a></li>
              <li><a class="" :class="[ menuActive === 'billboardRegister' ? 'active' : '']" @click="registerBillboard">{{ $i18n.t('header.menu.billboard_register') }}</a></li>
            </ul>
            <div class="slide-btn-box">
              <button class="button login" @click="showLoginModal">{{ $i18n.t('header.menu.login') }}</button>
            </div>
            <div class="slide-btn-box">
              <button class="button join" @click="showJoinModal">{{ $i18n.t('header.menu.join') }}</button>
            </div>
          </div>
        </Slide>
      </div>
    </header>
    <router-view/>
    <common-footer v-if="getFooterShow"></common-footer>
    <common-global-popup></common-global-popup>
    <modal-join ref="modalJoin"></modal-join>
    <modal-login ref="modalLogin" @showJoinModal="showJoinModal"></modal-login>
    <modal-info-set ref="modalInfoSet"></modal-info-set>
  </div>
</template>

<script>
import ModalJoin from 'components/auth/modal-join'
import modalLogin from 'components/auth/modal-login'
import modalInfoSet from 'components/auth/modal-info-set'
import CommonContext from 'components/common/common-context'
import CommonFooter from 'components/common/common-footer'
import CommonGlobalPopup from 'components/common/common-global-popup'
import MobileDetect from 'mobile-detect'
import { Slide } from 'vue-burger-menu'

export default {
  name: 'root-layout',
  components: {
    ModalJoin,
    modalLogin,
    modalInfoSet,
    CommonContext,
    CommonFooter,
    CommonGlobalPopup,
    Slide
  },
  data () {
    return {
      md: new MobileDetect(window.navigator.userAgent),
      windowWidth: document.documentElement.clientWidth,
      popupShow: false,
      context: {
        position: 'right',
        top: 70,
        width: 150,
        height: 155,
        mode: 'outSide'
      },
      showMyInfo: false,
      silde: {
        open: false
      }
    }
  },
  computed: {
    getIsMobile () {
      return this.$store.getters.getIsMobile
    },
    getRootLoading () {
      return this.$store.getters.getRootLoading
    },
    getAccessToken () {
      return this.$store.getters.getAccessToken
    },
    getFooterShow () {
      return this.$store.getters.getFooterShow
    },
    getRootScrollHide () {
      return this.$store.getters.getRootScrollHide
    },
    getSildeWidth () {
      // return String(this.windowWidth - 87)
      return '288'
    },
    // 유저정보
    getUserInfo () {
      return this.$store.getters.getUserInfo
    },
    getShowSlideDim () {
      return this.$store.getters.getShowSlideDim
    },
    menuActive () {
      return this.$store.getters.getMenuActive
    }
  },
  created () {
    this.checkAccessToken()
    this.$store.commit('setIsMobile', !!this.md.mobile())
  },
  beforeMount () {
    this.setI18n()
  },
  mounted () {
    this.getWindowWidthCheckMobile()
    this.$root.$on('loginPopup', this.showLoginPopup)
    this.$root.$on('modalPopupShow', this.setHeaderShow)
    this.$nextTick(() => {
      window.addEventListener('resize', this.getWindowWidthCheckMobile)
    })
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.getWindowWidthCheckMobile)
  },
  methods: {
    setI18n () {
      let language = navigator.language.slice(0, 2)
      this.$root.$i18n.locale = language
    },
    openMyInfoPopup () {
      this.$store.commit('setMenuActive', 'myInfo')
    },
    closedMyInfoPopup () {
      this.$store.commit('setMenuActive', '')
    },
    setHeaderShow (status) {
      this.popupShow = status
    },
    showHideMyInfo () {
      this.showMyInfo = !this.showMyInfo
    },
    msieversion () {
      var ua = window.navigator.userAgent
      var msie = ua.indexOf('MSIE ')
      // eslint-disable-next-line no-useless-escape
      if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)))
      }
      return false
    },
    checkAccessToken () {
      let accessToken = this.$cookies.get('accessToken')
      if (accessToken) {
        this.$store.commit('setAccessToken', accessToken)
        this.$store.dispatch('validityCheckToken')
      }
    },
    showJoinModal () {
      this.mobileHideSlide()
      this.$refs.modalJoin.open()
    },
    showLoginPopup (show) {
      if (show) this.showLoginModal()
      else this.$refs.modalLogin.close()
    },
    showLoginModal () {
      this.mobileHideSlide()
      this.$refs.modalLogin.open()
    },
    showModalInfoSet () {
      this.$refs.modalInfoSet.open()
    },
    moveHome () {
      this.$router.push('/')
    },
    isMobile () {
      if (window.matchMedia('(min-width: 400px)').matches) {
        /* 뷰포트 너비가 400 픽셀 이상 */
        this.$store.commit('setIsMobile', false)
      } else {
        /* 뷰포트 너비가 400 픽셀 미만 */
        this.$store.commit('setIsMobile', true)
      }
    },
    getWindowWidthCheckMobile (event) {
      this.windowWidth = window.innerWidth
      // if (this.windowWidth > 768) this.$store.commit('setIsMobile', false)
      // else this.$store.commit('setIsMobile', true)
    },
    mobileHideSlide () {
      if (this.getIsMobile) this.setHideSlideDim()
      else if (this.$refs.myInfo) this.$refs.myInfo.hideContextPopup()
    },
    findBillboard () {
      this.mobileHideSlide()
      this.$router.push({ path: '/billboardList' })
    },
    registerBillboard () {
      this.mobileHideSlide()
      this.$router.push({ path: '/billboardRegister' })
    },
    logout () {
      this.mobileHideSlide()
      this.$store.commit('logout')
    },
    editInfo () {
      this.mobileHideSlide()
      this.showModalInfoSet()
    },
    reservationHistory () {
      this.mobileHideSlide()
      this.$router.push('/history')
    },
    favoriteList () {
      this.mobileHideSlide()
      this.$router.push({ path: '/favoriteBillboards' })
    },
    setShowSlideDim () {
      this.$store.commit('setShowSlideDim', true)
    },
    setHideSlideDim () {
      this.silde.open = false
      this.$store.commit('setShowSlideDim', false)
    },
    handleOpenSlideMenu () {
      this.silde.open = true
      this.setShowSlideDim()
    }
  }
}
</script>
<style lang="stylus">
.root-layout-wrapper
  width 100%
  min-width 1440px
  height 100vh
  min-height 100vh
  display flex
  flex-direction column
  position relative
  flex 1 1 0%
  > .common-loading-panel
    height 100vh
    min-height 1080px
  &.ie
    .header
      .header-box
        padding 0px 77px 0px 58px
        margin-right 17px
        width calc(100% - 17px)
  > div.velmld-overlay
    z-index 9999
  > .header
    flex 0 0 70px
    min-width 1440px
    width 100%
    height 70px
    position relative
    z-index 3
    > .header-box
      width 100%
      min-width 1440px
      height 70px
      padding 0px 94px 0px 58px
      line-height 70px
      font-size 16px
      font-weight: normal
      color #080f31
      box-sizing border-box
      background-color #ffffff
      position fixed
      top 0
      left 0
      z-index 0
      .active
        font-weight 500
        text-decoration underline
        .common-context-btn
          a
            font-weight 500
            text-decoration underline
      .logo
        cursor pointer
        width 108px
        height 100%
        background-image url('~assets/images/header_logo.png')
      .menu
        .find-billboard
        .add-billboard
          margin-left 54px
        .login
          margin-left 54px
        .join
          width 68px
          border-radius 2px
          background-color #ececf4
          margin 15px 0px 15px 54px
          text-align center
          height 40px
          line-height 40px
          font-size 12px
          &:hover
            background-color #f8f8fb
        .my-info
          margin-left 76px
          height 42px
          .user-menu
            color black
            li
              text-align left
              line-height 42px
              color #162348
              font-size 14px
              font-weight 300
              opacity 0.9
              cursor pointer
              &:hover
                opacity 1
                background-color #f8f8fb
              a
                padding-left 15px
                display inline-block
                width 100%
                height 100%
        .logout
          margin-left 0px
    &.popup-show
      z-index 2
  // > .footer
  //   width 100%
  //   min-width 1440px
  //   height 80px
  //   padding 0px 30px
  //   box-sizing border-box
  > .layout-wrapper
    // width 1180px
    // height: auto
    // min-height calc(100% - 70px)
    // padding-bottom 315px
    // max-width 1180px
    flex: 1 0 auto
    position: relative
    // height: 100%
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    align-content: center
  &.scroll-hide
    overflow-y hidden

  // 모바일
  &.mobile
    min-width 320px
    height 100%
    > .common-loading-panel
      min-height 640px
    .slide-dim
      background-color rgba(0, 0, 0, 0.6)
      width 100vw
      height 100vh
      z-index 3
      position fixed
    > .header
      min-width 320px
      flex 0 0 60px
      height 60px
      z-index 3
      > .header-box
        min-width 320px
        padding 0
        height 60px
        line-height 60px
        > .logo
          width 70px
      &.popup-show
        z-index 1
    > .footer
      .container
        min-width: 320px
    .slide
      // position absolute
      // top 0
      // right 0
      .not-connected
        .logo
          height 18px
          width 100%
          flex 0 0 18px
          margin-bottom 120px
        .slide-btn-box
          width calc(100% - 30px)
          height 40px
          line-height 40px
          margin-bottom 19px
          margin 0px 15px 19px 15px
          flex 0 0 40px
          > .button
            height 100%
            width 100%
            color #080f31
            font-size 15px
            font-weight 500
        .add-billboard
          margin-top 23px
          font-size: 12px
          font-weight: normal
          text-align center
          flex 0 0 18px
          height 18px
          line-height 18px
          > a
            text-decoration underline
            cursor pointer
        .user-menu
          font-size 15px
          font-weight 500
          line-height 50px
          margin-bottom 171px
          > li
            margin-left 42px
      .user-info-box
        padding 0 1em
        flex 0 0 84px
        display flex
        flex-direction column
        margin-bottom 55px
        .greetings
          line-height 18px
          flex 0 0 18px
          font-size 12px
          font-weight normal
          margin-bottom 20px
        .user-name
          line-height 27px
          flex 0 0 27px
          font-size 18px
          font-weight 500
          margin-bottom 1px
        .user-email
          line-height 18px
          flex 0 0 18px
          font-size 12px
          font-weight normal
      .contents
        .user-menu
          font-size 15px
          font-weight 500
          line-height 50px
          > li:not(.user-info)
            margin-left 42px
          .user-info
            background-color #f8f8fb
            padding-left 42px
      .logout-box
        position absolute
        bottom 0px
        width calc(100% - 28px)
        min-width 230px
        height 40px
        line-height 40px
        text-align center
        border-radius 3px
        border solid 1px #080f31
        margin-bottom 54px
        margin-left 16px
        // margin-right auto
        // .logout
    // menu
    .bm-burger-button
      position fixed
      width 18px
      height 16px
      right 15px !important
      top 22px
      cursor pointer
    .bm-burger-bars
      background-color #373a47
    .line-style
      position absolute
      height 20%
      left 0
      right 0
    .cross-style
      position absolute
      top 12px
      right 2px
      cursor pointer
    .bm-cross
      background #bdc3c7
    .bm-cross-button
      height 24px
      width 24px
    .bm-menu
      height 100%
      width 0
      position fixed
      z-index 1000
      top 0
      left 0
      background-color #ffffff
      box-shadow: -4px 2px 4px 0 rgba(8, 15, 49, 0.07)
      overflow-x hidden
      padding-top 60px
      transition 0.5s
      display flex
      flex 0 0 288px
    .bm-overlay
      background rgba(0, 0, 0, 0.3)
    .bm-item-list
      color #080f31
      margin-left 0
      font-size 15px
      display flex
      flex 1 0 288px
      & > div
        display flex
        flex-direction column
        text-decoration none
        padding 0
        width 100%
        & > span
          margin-left 10px
          font-weight 700
          color white

</style>
