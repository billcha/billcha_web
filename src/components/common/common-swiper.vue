<template>
<swiper class="common-swiper" ref="mySwiper" v-if="data" :options="swiperOption">
  <swiper-slide v-for="(item, index) in data" :key="item.id">
     <common-card class="common-carousel-card" :data="item" :width="paginationFactor" :context="context" :id="item.id" :index="index"
      @onClickSave="onClickSave" @onClickShare="onClickShare" @onClickCard="onClickCard" ref="card" :data-source="item.link" :mode="mode"
      :data-facebook="item.facebook" :data-twitter="item.twitter" :data-email="item.email" @closedPopup="closedPopup">
      <slot name="contents" slot="contents">
      </slot>
    </common-card>
  </swiper-slide>
</swiper>
</template>

<script>
import CommonCard from 'components/common/common-card'

export default {
  name: 'common-carousel',
  components: {
    CommonCard
  },
  props: {
    data: {
      type: Array
    },
    paginationFactor: {
      type: Number,
      defaul: 345
    },
    itemCount: {
      type: Number,
      defaul: 1
    },
    mode: {
      type: String,
      default: 'normal'
    },
    swiperOption: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    isMobile () {
      return this.$store.getters.getIsMobile
    },
    swiper () {
      return this.$refs.mySwiper.swiper
    }
  },
  data () {
    return {
      context: {
        position: 'right',
        top: 15,
        width: 159,
        height: 168,
        mode: 'outSide'
      }
    }
  },
  beforeMount () {
  },
  created () {
  },
  mounted () {
  },
  methods: {
    slideTo (index) {
      this.swiper.slideTo(index)
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
    closedPopup (id) {
      this.$emit('closedPopup', this.data.id)
    },
    cardMouseLeave () {
      this.$emit('cardMouseLeave', this.data)
    },
    cardMouseOver () {
      this.$emit('cardMouseOver', this.data)
    }
  },
  destroyed () {
  },
  watch: {
    data: {
      handler (newValue) {
        this.data = newValue
      },
      deep: true
    }
  }
}
</script>

<style lang="stylus">
.swiper-container.common-swiper
  .swiper-slide
    width 160px
</style>
