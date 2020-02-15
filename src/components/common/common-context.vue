<template>
<div class="common-context-popup-wrapper" ref="commonConTextPopup" :class="{ 'mobile' : getIsMobile }">
  <div class="common-context-btn" @click="showHideContextPopup">
    <slot class="">
      {{ text }}
    </slot>
  </div>
  <div class="common-context-wrapper" tabindex="-1" v-show="show" ref="contextWrapper" @blur="hideContextPopup" v-if="mode === 'blur' && !getIsMobile && !disabled"
      :class="[ position === 'right' ? 'right' : 'left' ]" v-bind:style="{ top: top + 'px' ,width: width + 'px', height: height + 'px' }"
  >
    <slot name="contents"></slot>
  </div>
  <div class="common-context-wrapper" v-show="show" ref="contextWrapper" v-else-if="!getIsMobile && !disabled"
      :class="[ position === 'right' ? 'right' : 'left' ]" v-bind:style="{ top: top + 'px' ,width: width + 'px', height: height + 'px' }"
  >
    <slot name="contents"></slot>
  </div>
  <sweet-modal
    class="modal-context is-hidden-tablet"
    :class="[ mode === 'fullModal' ? 'full-size' : '', className ]"
    ref="modalContext"
    :enable-mobile-fullscreen="true"
    :hide-close-button="false"
    :blocking="true"
    :mobileHeight="mobileHeight"
    :mobileMaxHeight="mobileMaxHeight"
    @close="hideContextPopup"
    v-if="mode !== 'noneModal' && show  && getIsMobile && !disabled"
  >
    <!-- <div slot="box-action"><div>test header</div></div> -->
    <!-- <div class="footer" slot="button"><div class="join-button">가입하기</div></div> -->
    <div class="wrapper">
      <slot name="contents"></slot>
    </div>
  </sweet-modal>
</div>
</template>

<script>
import { SweetModal } from 'sweet-modal-vue'
export default {
  name: 'CommonPagination',
  components: {
    SweetModal
  },
  props: {
    position: {
      type: String,
      default: 'left'
    },
    width: {
      type: Number,
      default: 500
    },
    height: {
      type: Number,
      default: 500
    },
    text: {
      type: String,
      default: 'button'
    },
    top: {
      type: Number,
      default: 0
    },
    mode: {
      type: String,
      default: 'blur'
    },
    className: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    },
    mobileHeight: [String, Number],
    mobileMaxHeight: [String, Number]
  },
  computed: {
    getIsMobile () {
      return this.$store.getters.getIsMobile
    }
  },
  data () {
    return {
      show: false,
      callbackFunc: this.documentClick
    }
  },
  beforeMount () {
  },
  created () {
    if (this.mode !== 'blur') {
      document.addEventListener('click', this.callbackFunc, {
        capture: true // default 값은 false입니다.
      })
    }
  },
  mounted () {
  },
  destroyed () {
    if (this.mode !== 'blur') document.removeEventListener('click', this.callbackFunc)
  },
  methods: {
    showHideContextPopup () {
      this.show = !this.show
      if (this.show) this.$emit('openPopup')
      this.$nextTick(function () {
        if (this.mode === 'blur') {
          this.$refs.contextWrapper.focus()
        }
      })
    },
    hideContextPopup () {
      this.$emit('closePopup')
      this.show = false
    },
    documentClick (e) {
      if (!this.$refs.commonConTextPopup) return
      let el = this.$refs.commonConTextPopup
      let target = e.target
      if ((el !== target) && !el.contains(target)) {
        this.show = false
        if (this.$refs.modalContext) this.$refs.modalContext.close()
      }
    },
    _hideDocumentClickContextPopup () {
      this.$refs.modalContext.close()
      this.$emit('closedPopup')
    }
  },
  watch: {
    show (status) {
      if (this.mode !== 'noneModal' && this.getIsMobile) {
        this.$root.$emit('modalPopupShow', status)
        this.$nextTick(() => {
          if (status && this.$refs.modalContext) {
            this.$refs.modalContext.open()
          }
        })
        if (!status && this.$refs.modalContext) this._hideDocumentClickContextPopup()
      }
      if (!status) {
        this.$emit('closedPopup')
      }
    }
    // data: {
    //   handler (newValue) {
    //     this.listData = newValue
    //   },
    //   deep: true
    // }
  },
  filters: {
    formatNumber: function (value) {
      if (typeof value !== 'number') {
        return value
      }
      // var formatter = new Intl.NumberFormat('en-US', {
      //   style: 'currency',
      //   currency: 'KRW',
      //   minimumFractionDigits: 0
      // })
      // return formatter.format(value)
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원'
    }
  },
  directives: {
  }
}
</script>

<style lang="stylus">
.root-layout-wrapper.mobile
  .modal-context
    .sweet-modal.theme-light
      .sweet-content
        padding 0px
        height 100%
//   .common-context-popup-wrapper.mobile

.common-context-popup-wrapper
  position relative
.common-context-btn
  min-height 30px
  height 100%
  position relative
.common-context-wrapper
  position absolute
  top 45px
  // left 0px
  background-color #ffffff
  border solid 1px #d4d4d4
  z-index 2
  &.right
    right 0px
  &.left
    left 0px
  .context-inner
    min-height: 213px
    padding-left: 32px
    padding-top: 33px
    box-sizing: border-box
.modal-context
  &.full-size
    .sweet-modal
      width 100%
      height 100vh
      max-width 769px
      max-height 540px
      .wrapper
        height 390px
</style>
