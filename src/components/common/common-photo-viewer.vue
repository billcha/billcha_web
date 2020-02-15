<template>
<div class="common-photo-viewer" v-show="show">
  <button class="viewer-close-btn" @click="hidePhotoViewer">X</button>
  <div class="photo-viewer-container">
    <div class="image-viewer-box margin-center">
      <div class="garllery-btn-box main" v-if="!isMobile">
        <span class="prev" @click="_clickOwlPrevBtn"></span>
        <span class="next" @click="_clickOwlNextBtn"></span>
      </div>
      <div id="photo-panorama" :class="{ 'show-360-image' : !currentActiveIsNoramlImage }"></div>
      <div class="photo-preview-box" :class="{ 'show-normal-image' : currentActiveIsNoramlImage }">
        <img class="photo-preview" :src="currentActiveImage"/>
      </div>
    </div>
    <div class="carousel-container">
      <div class="owl-carousel-btn-box" v-if="!isMobile">
        <span class="prev" @click="_clickOwlPrevBtn"></span>
        <span class="next" @click="_clickOwlNextBtn"></span>
      </div>
      <owl-carousel class="owl-carousel-container position-relative" :loop="owlCarousel.loop" :autoplay="owlCarousel.autoplay" :dots="owlCarousel.dots"
        :mouseDrag="isMobile" :touchDrag="isMobile" :responsive="owlCarousel.responsive" :margin="20" v-if="show"
        :item="owlCarousel.item" :nav="owlCarousel.nav" :autoWidth="owlCarousel.autoWidth" :autoHeight="owlCarousel.autoHeight" ref="carousel">
        <template slot="prev"><span class="prev" ref="owlPrevBtn"></span></template>
        <template slot="next"><span class="next" ref="owlNextBtn"></span></template>
        <div class="img-box" v-for="(item, index) in data" :key="item.id" :index="index">
          <!-- <div class="thumbnail-box" :class="{ 'active' : currentActiveList[index] }"> -->
          <div class="thumbnail-box">
            <div class="thumbnail img"  v-bind:style="{ 'background-image': 'url(' + item.image + ')' }"></div>
          </div>
        </div>
      </owl-carousel>
    </div>
  </div>
</div>
</template>

<script>
import owlCarousel from 'vue-owl-carousel'
export default {
  name: 'common-photo-viewer',
  components: {
    owlCarousel
  },
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isMobile () {
      return this.$store.getters.getIsMobile
    },
    currentActiveIsNoramlImage () {
      if (this.data.length <= 0) return false
      return this.data[this.currentActiveIndex].isNormalImage
    },
    currentActiveImage () {
      if (this.data.length <= 0) return false
      return this.data[this.currentActiveIndex].image
    }
  },
  data () {
    return {
      pannellumSDK: null,
      previewImage: require('../../assets/images/360viewer-sample.jpg'),
      currentOffset: 0,
      currentActiveList: [],
      currentActiveIndex: 0,
      currentBtnStatus: 'left',
      // windowSize: 3,
      paginationFactor: 300,
      currentBrowserWidth: window.innerWidth,
      selectedImage: void 0,
      owlCarousel: {
        loop: true,
        autoplay: false,
        dots: false,
        item: 4,
        nav: false,
        autoWidth: true,
        autoHeight: true,
        mouseDrag: this.isMobile,
        touchDrag: this.isMobile,
        responsive: {
          0: {
            items: 1, nav: false, rewind: false, rewindNav: false, mouseDrag: true, touchDrag: true, loop: true
          },
          767: {
            items: 4, nav: false, rewind: false, rewindNav: false, loop: true
          }
        }
      }
    }
  },
  beforeMount () {
  },
  created () {
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      let self = this
      this._onload()
      this.initActiveList(this.data)
      // this.$refs.carousel.showPrev = !this.isMobile
      // this.$refs.carousel.showNext = !this.isMobile
      window.$('.common-photo-viewer .owl-carousel-container').on('click', '.img-box', function (event) {
        if (self.currentActiveIndex === Number(window.$(event.currentTarget).attr('index'))) return
        self.currentActiveIndex = Number(window.$(event.currentTarget).attr('index'))
        self.resetActiveList()
        self.resetClonedActive()
        // let cloned = window.$('.common-photo-viewer .owl-carousel-container .owl-item.cloned .thumbnail-box')
        // for (let i = 0, max = cloned.length; i < max; i++) {
        //   window.$(cloned[i]).removeClass('active')
        // }
        // window.$(event.currentTarget.firstElementChild).addClass('active')
      })
    },
    _set360Viewer (getImage) {
      var image = getImage || window.location.origin + this.selectedImage
      let param = {
        'panorama': image,
        'preview': self.previewImage
      }
      if (!this.pannellumSDK) {
        this.pannellumSDK = window.pannellum.viewer('photo-panorama', {
          'type': 'equirectangular',
          'scenes': {},
          'autoLoad': false
        })
        // pitch, yaw, hfov
        this.pannellumSDK.addScene('scene', param)
        this.pannellumSDK.loadScene('scene', this.pannellumSDK.getPitch(), this.pannellumSDK.getYaw(), this.pannellumSDK.getHfov())
      } else {
        this.pannellumSDK.removeScene('scene')
        this.pannellumSDK.addScene('scene', param)
        this.pannellumSDK.loadScene('scene', this.pannellumSDK.getPitch(), this.pannellumSDK.getYaw(), this.pannellumSDK.getHfov())
      }
    },
    _clickOwlPrevBtn () {
      this.$refs.carousel.$slots.prev[0].elm.click()
      if (this.currentActiveIndex > 0) this.currentActiveIndex = this.currentActiveIndex - 1
      else this.currentActiveIndex = this.currentActiveList.length - 1
    },
    _clickOwlNextBtn () {
      this.$refs.carousel.$slots.next[0].elm.click()
      if (this.currentActiveList.length - 1 > this.currentActiveIndex) this.currentActiveIndex = this.currentActiveIndex + 1
      else this.currentActiveIndex = 0
    },
    _onload () {
      if (this.data.length <= 0) return
      this.currentActiveIndex = 0
      this.selectedImage = this.data[this.currentActiveIndex].image
    },
    _moveCarousel (direction) {
      this.currentActiveIndex = this.currentCenterIndex
      if (direction === 1 && !this.atEndOfList) {
        this.currentBtnStatus = 'right'
        this.currentActiveIndex = this.currentActiveIndex + 1
        this.resetActiveList()
        this.currentOffset -= this.paginationFactor
        this.currentActiveList.splice(this.currentActiveIndex, 1, true)
        if (this.currentBrowserWidth < 1180 && this.atEndOfList) this.currentOffset = (((this.data.length * this.paginationFactor) - this.currentBrowserWidth) * -1) + 20
      } else if (direction === -1 && !this.atHeadOfList) {
        this.currentBtnStatus = 'left'
        this.resetActiveList()
        this.currentActiveIndex = this.currentActiveIndex - 2 <= 0 ? 0 : this.currentActiveIndex - 2
        this.currentOffset -= (this.currentOffset % this.paginationFactor)
        this.currentOffset += this.paginationFactor
        this.currentActiveList.splice((this.currentActiveIndex), 1, true)
      }
    },
    _onClickDibs (id) {
      this.$emit('onClickDibs', id)
    },
    _onClickCard (id) {
      this.$emit('onClickCard', id)
    },
    _onResize (event) {
      this.currentBrowserWidth = event.target.innerWidth
    },
    _clickThumbnail (index) {
      // if (index + 1 > this.currentCenterIndex) this._moveCarousel(1)
      // else this._moveCarousel(-1)
      // this.resetActiveList()
      // this.currentActiveList.splice(index, 1, true)
      this.currentActiveIndex = index
    },
    resetActiveList () {
      for (let i = 0; i < this.currentActiveList.length; i++) {
        this.currentActiveList.splice(i, 1, false)
      }
    },
    resetClonedActive () {
      let cloned = window.$('.common-photo-viewer .owl-carousel-container .owl-item.cloned .thumbnail-box')
      for (let i = 0, max = cloned.length; i < max; i++) {
        window.$(cloned[i]).removeClass('active')
      }
    },
    initActiveList (newValue) {
      this.currentActiveList = []
      for (let i = 0; i < newValue.length; i++) {
        this.currentActiveList.splice(i, 1, false)
      }
      this.currentActiveList.splice(0, 1, true)
    },
    hidePhotoViewer () {
      this.$emit('onHide')
    }
  },
  watch: {
    show (newVal) {
      if (newVal && this.data.length > 0) {
        this.$nextTick(function () {
          this.selectedImage = this.data[0].image
          this.init()
          this._set360Viewer()
        })
      }
    },
    data: {
      handler (newValue) {
        this.initActiveList(newValue)
      },
      deep: true
    },
    currentActiveIndex (newIndex) {
      // this.resetActiveList()
      // this.resetClonedActive()
      // this.currentActiveList.splice(newIndex, 1, true)
      this.currentActiveIndex = newIndex
      this.selectedImage = this.data[this.currentActiveIndex].image
      this._set360Viewer()
    }
  }
}
</script>

<style lang="stylus">
//
.show-360-image
  z-index 10
.show-normal-image
  z-index 10
.mobile
  .common-photo-viewer
    .viewer-close-btn
      top 29px
      right 15px
    .photo-viewer-container
      max-width: 100%
      max-height: 100%
      top: 0
      left: 0
      transform: initial
    .image-viewer-box
      height calc(100% - 125px)
    .carousel-container
      height: 93px
      margin-top: 16px
      margin-bottom 16px
    .thumbnail-box
      width 143px
      height: 93px
    .thumbnail
      width 143px
      height: 93px
.common-photo-viewer
  // display flex
  // justify-content center
  background-color: rgba(0, 0, 0, 0.4)
  position: fixed
  top: 0px
  left: 0px
  bottom: 0px
  right: 0px
  z-index: 30
  #photo-panorama
    position absolute
    top 0
    left 0
    width 100%
    height 100%
  .photo-preview-box
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    .photo-preview
      width 100%
      height 100%
  .viewer-close-btn
    position absolute
    top 34px
    right 34px
    width 22px
    height 22px
    z-index 11
    cursor pointer
    background-image url('~assets/images/ic/ic_gallery_close.png')
    background-position center
    background-size contain
    color transparent
    background-color transparent
    border none
  .photo-viewer-container
    width: 100%
    height: 100%
    max-width: 1180px
    max-height: 854px
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
  .image-viewer-box
    position: relative
    max-width 980px
    width 100%
    height 600px
  .carousel-container
    width: 100%
    // width 1200px
    height: 186px
    margin-top 68px
    margin-bottom: 20px
    position: relative
    overflow: hidden
  .carousel
    display block
    width 1180px
    position relative
    margin-left auto
    margin-right auto
  .carousel-box
    overflow hidden
  .carousel-cards
    display flex
    transition transform 150ms ease-out
    transform translatex(0px)
  .thumbnail-box
    width 280px
    height 190px
    position relative
    &.active
      .thumbnail
        &:after
          display block
  .thumbnail
    width 280px
    height 186px
    background-size cover
    &:after
      display none
      content ''
      width 100%
      height 100%
      box-sizing border-box
      border-bottom: 4px solid rgb(0, 108, 255)
  .card-carousel-nav
    width 30px
    height 30px
    background-color: #ffffff
    position: absolute
    z-index 11
    &.left
      left: 0
      top: 53px
      transform: rotate(-135deg)
    &.right
      transform: rotate(45deg)
      right: 0
      top: 53px
  .owl-carousel-container
    .img-box
      float left
      cursor pointer
  .garllery-btn-box
    z-index 11
    &.main
      width: 100%
      height: 600px
      top: 0
      left: 0
      .prev,
      .next
        top 244.5px
    .prev,
    .next
      background-size: contain
      background-repeat: no-repeat
      width: 40px
      height: 59px
      top 59px
      position absolute
      cursor pointer
      z-index 11
    .prev
      left 0
      background-image url('~assets/images/ic/ic_carousel-left-btn.png')
    .next
      right 0px
      background-image url('~assets/images/ic/ic_carousel-right-btn.png')

  .owl-carousel-btn-box
    &.main
      width: 100%
      height: 600px
      top: 0
      left: 0
      .prev,
      .next
        top 244.5px
    .prev,
    .next
      background-size: contain
      background-repeat: no-repeat
      width 40px
      height 100%
      top 0px
      position absolute
      cursor pointer
      z-index 2
    .prev
      left 0
      background-image url('~assets/images/ic/ic_btn_arrow_gallery_left.png')
    .next
      right 0px
      background-image url('~assets/images/ic/ic_btn_arrow_gallery_right.png')

  .pnlm-container
    position absolute
    top 0
    left 0
</style>
