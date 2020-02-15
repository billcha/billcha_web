<template>
<div class="common-carousel" v-if="data">
  <div class="owl-carousel-btn-box" v-if="!isMobile">
    <span class="prev" @click="_clickOwlPrevBtn"></span>
    <span class="next" @click="_clickOwlNextBtn"></span>
  </div>
  <owl-carousel class="owl-carousel-container position-relative" :autoplay="owlCarousel.autoplay" :autoplayHoverPause="owlCarousel.autoplayHoverPause"
      :dots="owlCarousel.dots" :lazyLoad="owlCarousel.lazyLoad" :pullDrag="owlCarousel.pullDrag" :navText="owlCarousel.navText"
      :autoWidth="owlCarousel.autoWidth" :autoHeight="owlCarousel.autoHeight" :responsive="owlCarousel.responsive" :checkVisible="owlCarousel.checkVisible"
      @changed="onChanged" ref="carousel">
    <!-- <template slot="prev"><span class="prev" ref="owlPrevBtn"></span></template>
    <template slot="next"><span class="next" ref="owlNextBtn"></span></template> -->
    <common-card class="common-carousel-card" :data="item" :width="paginationFactor" :context="context" v-for="(item, index) in data" :key="item.id" :id="item.id" :index="index"
      @onClickSave="onClickSave" @onClickShare="onClickShare" @onClickCard="onClickCard" ref="card" :data-source="item.link" :mode="mode"
      :data-facebook="item.facebook" :data-twitter="item.twitter" :data-email="item.email" @closedPopup="closedPopup">
      <slot name="contents" slot="contents">
      </slot>
    </common-card>
  </owl-carousel>
</div>
</template>

<script>
import OwlCarousel from 'vue-owl-carousel'
import CommonCard from 'components/common/common-card'

export default {
  name: 'common-carousel',
  components: {
    CommonCard,
    OwlCarousel
  },
  props: {
    data: {
      type: Array
    },
    paginationFactor: {
      type: Number,
      defaul: 380
    },
    itemCount: {
      type: Number,
      defaul: 2
    },
    mode: {
      type: String,
      default: 'normal'
    }
  },
  computed: {
    isMobile () {
      return this.$store.getters.getIsMobile
    }
  },
  data () {
    return {
      owlCarousel: {
        loop: false,
        rewind: true,
        autoplay: false,
        dots: false,
        nav: true,
        autoWidth: true,
        autoHeight: true,
        lazyLoad: true,
        checkVisible: true,
        autoplayHoverPause: false,
        // navContainer: '.owl-carousel-btn-box',
        navText: ['<div class="nav-btn prev-slide"></div>', '<div class="nav-btn next-slide"></div>'],
        // navElement: '<div class="custom-btn"></div>',
        pullDrag: false,
        responsive: {
          0: {
            items: 3, nav: false, rewind: false, rewindNav: false, mouseDrag: true, touchDrag: true, loop: false, autoWidth: true, margin: 8, center: true, slideBy: 1
          },
          767: {
            items: 3, nav: true, rewind: true, rewindNav: true, loop: false, margin: 20, center: false
          }
        }
      },
      context: {
        position: 'right',
        top: 15,
        width: 159,
        height: 168,
        mode: 'outSide'
      },
      selectedElem: null
    }
  },
  beforeMount () {
  },
  created () {
  },
  mounted () {
    this.$nextTick(function () {
      if (this.$refs.carousel) {
        // this.$refs.carousel.showPrev = !this.isMobile
        // this.$refs.carousel.showNext = !this.isMobile

        let self = this
        let $ = window.$
        // let blurHide = function () {
        //   $(this).hide()
        // }
        $('.common-carousel .owl-carousel-container').on('click', '.owl-item', function (event) {

        })
        $('.common-carousel .owl-carousel-container').off()
        $('.common-carousel .owl-carousel-container').on('click', '.common-carousel-card', function (event) {
          let id = Number($(this).attr('id'))
          if ($(event.target).hasClass('common-context-btn')) {
            self.onClickShare(id)
            // self.$refs.card[id].$refs.context._showHideContext()
            // let card = $('.common-carousel .owl-carousel-container .common-carousel-card .share .common-context-btn')
            // for (let i = 0, max = card.length; i < max; i++) {
            //   $(card[i]).hide()
            // }
            // let elem = $(event.target.parentElement.lastElementChild)
            // elem.off('blur')
            // if ($(elem).css('display') === 'none') {
            //   elem.show()
            //   elem.focus()
            //   elem.on('blur', blurHide)
            // } else {
            //   elem.hide()
            // }
            let elem = $(event.target.parentElement.children[1])
            elem.off('blur')
            if ($(elem).css('display') === 'none') {
              elem.show()
              self.selectedElem = elem
              // elem.focus()
              // elem.on('blur', blurHide)
            } else {
              elem.hide()
            }
          } else if ($(event.target).hasClass('save')) {
            self.onClickSave(Number($(this).attr('id')))
          } else if ($(event.target).hasClass('facebook')) {
            self._copyToClipboard($(this).data('facebook'))
          } else if ($(event.target).hasClass('twitter')) {
            self._copyToClipboard($(this).data('twitter'))
          } else if ($(event.target).hasClass('email')) {
            self._copyToClipboard($(this).data('email'))
          } else if ($(event.target).hasClass('link-copy')) {
            self._copyToClipboard($(this).data('source'))
          } else {
            self.onClickCard(id)
          }
          event.stopImmediatePropagation()
        })

        document.addEventListener('click', self.documentClick, {
          capture: true // default 값은 false입니다.
        })
      }
    })
  },
  methods: {
    exceptionData (data) {
      return data || ''
    },
    onChanged (event) {
    },
    onClickSave (id) {
      this.$emit('onClickSave', id)
    },
    onClickShare (id) {
      this.$emit('onClickShare', id)
    },
    onClickCard (id) {
      this.$emit('onClickCard', id)
    },
    _clickOwlPrevBtn () {
      this.$refs.carousel.$slots.prev[0].elm.click()
    },
    _clickOwlNextBtn () {
      this.$refs.carousel.$slots.next[0].elm.click()
    },
    _copyToClipboard (val) {
      var t = document.createElement('textarea')
      document.body.appendChild(t)
      t.value = val
      t.select()
      document.execCommand('copy')
      document.body.removeChild(t)
    },
    documentClick (e) {
      if (!this.selectedElem) return
      let el = this.selectedElem
      let target = e.target
      if ((el !== target) && !el.context.contains(target)) {
        el.hide()
        this.closedPopup()
      }
    },
    closedPopup (id) {
      this.$emit('closedPopup', this.data.id)
    }
  },
  destroyed () {
    document.removeEventListener('click', this.documentClick)
  },
  watch: {
    data: {
      handler (newValue) {
        this.data = newValue
      },
      deep: true
    },
    isMobile () {

    }
  }
}
</script>

<style lang="stylus">
.mobile
  .common-carousel
    // width 100%
    .owl-carousel
      .prev-slide,
      .next-slide
        display none
.common-carousel
  display flex
  justify-content center
  // width 1200px
  position relative
  .common-carousel-container
    overflow hidden
  .common-carousel-cards
    // display flex
    // transition transform 150ms ease-out
    // transform translatex(0px)
  // .common-carousel-card
  //   // width 200px
  // .card-carousel-nav
  //   width 30px
  //   height 30px
  //   background-color: black
  //   position: absolute
  //   z-index 1
  //   &.left
  //     left: 0
  //     top: 104px
  //     transform: rotate(-135deg)
  //   &.right
  //     transform: rotate(45deg)
  //     right: 0
  //     top: 104px
  .owl-carousel-container
    width 100%
    .prev,
    .next
      background-size: contain
      background-repeat: no-repeat
      width: 40px
      height: 59px
      top 95px
      position absolute
      cursor pointer
      z-index 2
    .prev
      left 0
      background-image url('~assets/images/ic/ic_carousel-left-btn.png')
    .next
      right 0px
      background-image url('~assets/images/ic/ic_carousel-right-btn.png')
  .owl-nav
    [class*='owl-']
      background: none !important
    .owl-prev
      &:hover
        background: none
    .owl-next
      &:hover
        background: none
.billboard-story
  .owl-carousel .nav-btn
    top: 170px !important;
.owl-carousel .nav-btn{
  position: absolute;
  background-size: contain;
  background-repeat: no-repeat;
  width: 40px;
  height: 59px;
  cursor: pointer;
  top: 100px !important;
}

.owl-carousel .owl-prev.disabled,
.owl-carousel .owl-next.disabled{
pointer-events: none;
opacity: 0.2;
}

.owl-carousel .prev-slide{
  background-image: url('~assets/images/ic/ic_carousel-left-btn.png');
  left: 0px;
}
.owl-carousel .next-slide{
  background-image: url('~assets/images/ic/ic_carousel-right-btn.png');
  right: 0px;
}
.owl-carousel .prev-slide:hover{
}
.owl-carousel .next-slide:hover{
}
</style>
