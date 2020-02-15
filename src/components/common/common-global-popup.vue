<template>
<div>
  <sweet-modal
  class="common-global-popup"
  ref="commonGlobalPopup"
  :enable-mobile-fullscreen="false"
  :hide-close-button="false"
  :title="'메세지'"
  :blocking="true"
  :width="moblieModalWidth"
  >
    <!-- <div slot="loading" v-common-loading-panel="modal.loading.authEmailLoadingShow"></div> -->
    <div class="footer-btn-box" slot="button">
      <div class="cols">
        <div class="col-12 primary button full-height" @click="close">확인</div>
      </div>
    </div>
    <div class="common-global-popup-wrpper margin-center" :class="{'mobile' : getIsMobile}">
      <div>{{ error }}</div>
    </div>
  </sweet-modal>
</div>
</template>

<script>
import { SweetModal } from 'sweet-modal-vue'
export default {
  name: 'auth-mail-modal',
  components: {
    SweetModal
  },
  props: {
    data: {
      type: Object,
      default () {
        return {
        }
      }
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    getIsMobile () {
      return this.$store.getters.getIsMobile
    },
    moblieModalWidth () {
      return this.getIsMobile ? 345 : void 0
    },
    getGlobalAlertStatus () {
      return this.$store.getters.getOpenGlobalAlert
    }
  },
  data () {
    return {
      error: ''
    }
  },
  beforeMount () {
  },
  created () {
  },
  mounted () {
  },
  methods: {
    open () {
      this.$refs.commonGlobalPopup.open()
    },
    close () {
      this.$refs.commonGlobalPopup.close()
    }
  },
  watch: {
    getGlobalAlertStatus (newVal) {
      if (newVal.open) {
        if (newVal.error) {
          if (newVal.error.response) {
            this.error = newVal.error.response.data.description
          } else {
            this.error = newVal.error
          }
        }
        this.open()
      } else {
        this.close()
      }
    }
  },
  filters: {
  }
}
</script>

<style lang="stylus">
.common-global-popup-wrpper
  padding 150px 0
</style>
