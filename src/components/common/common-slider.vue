<template>
  <div class="common-slider-wrapper">
    <div class="slider-container">
      <div class="stack-bar-box">
        <div v-for="item in barData" :key="item.id" :class="onActivate(item.price)" v-bind:style="{ height: item.height + 'px' }"></div>
      </div>
      <vue-slider
      v-model="modelValue"
      :min="min"
      :max="max"
      :interval="interval"
      :tooltip-formatter="formatter2"
      @change="onChangeValue">
        <!-- <template v-slot:label="{ label, active }">
          <div :class="['vue-slider-mark-label', 'custom-label', { active }]"></div>
        </template> -->
      </vue-slider>
    </div>
    <div class="slider-label-box">
      <div class="line-box">
        <div class="left"><span class="line"></span></div>
        <div class="center"><span class="line"></span></div>
        <div class="right"><span class="line"></span></div>
      </div>
      <div class="text-box">
        <div class="left min">{{  filterNumber(min) }}</div>
        <div class="center averager">{{ filterNumber(average) }}</div>
        <div class="right max">{{ filterNumber(max) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'
export default {
  name: 'common-select',
  components: {
    VueSlider
  },
  props: {
    value: {
      type: Array,
      default () {
        return [0, 100]
      }
    },
    data: {
      type: Array
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 900000
    },
    average: {
      type: Number,
      default: 0
    },
    interval: {
      type: Number,
      default: 1
    }
  },
  computed: {
  },
  data () {
    return {
      modelValue: this.value,
      barData: this.data,
      formatter2: v => `${('' + v).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + this.$i18n.t('common.price_unit')}`
    }
  },
  beforeMount () {
  },
  created () {
  },
  mounted () {
  },
  methods: {
    // mockData () {
    //   let result = []
    //   for (let i = 0; i < 30; i++) {
    //     result.push({
    //       height: Math.floor(Math.random() * 20),
    //       price: i * 30000
    //     })
    //   }
    //   return result
    // },
    onActivate (value) {
      return (value >= this.modelValue[0]) && (value <= this.modelValue[1]) ? 'bar' : 'deactive-bar'
    },
    onChangeValue (value) {
      this.$emit('onChangeValue', value)
    },
    filterNumber (v) {
      var str = '0'
      if (!v) return str
      // if (v >= 10000) str = Math.round(v / 10000) + '만 원'
      // else str = v + '원'
      str = `${('' + v).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + this.$i18n.t('common.price_unit')}`
      return str
    }
  },
  watch: {
    value (newValue) {
      this.modelValue = newValue
    },
    data (newValue) {
      this.barData = newValue
    }
    // data: {
    //   handler (newValue) {
    //     this.listData = newValue
    //   },
    //   deep: true
    // }
  }
}
</script>

<style lang="stylus">
.common-slider-wrapper
  .slider-container
    width calc(100% - 18px)
    margin 0 auto
    // width 100%
    padding-right 16px
  .custom-label
    &.active
      color: #3498db
  .vue-slider-process
    background-color #080f31
  .stack-bar-box
    -webkit-box-align: end !important
    -webkit-box-pack: justify !important
    position: relative !important
    top: 6px !important
    display: flex !important
    justify-content: space-between !important
    align-items: flex-end !important
    height 77px
    margin 0px 2px 0px !important
    .bar,
    .deactive-bar
      display: inline-block !important
      border-top-left-radius: 3px !important
      border-top-right-radius: 3px !important
      margin-right: 1px !important
      flex: 1 1 0% !important
      // background: linear-gradient(rgba(0, 132, 137, 0.35) 0%, rgba(0, 132, 137, 0.46) 100%) !important
      background: #ececf4
      width: 3px
    .deactive-bar
      height: 0px !important
  .slider-label-box
    font-size: 12px
    font-weight: normal
    color: rgba(8, 15, 49, 0.3)
    display flex
    flex-direction column
    > .line-box
      padding-right 15px
      padding-left 1px
      display flex
      flex 1 1 18px
      width calc(100% - 18px)
      margin 0 auto
      .line
        display inline-block
        width: 1px
        height: 9px
        background-color: #dedee0
      .left
        flex 1
      .center
        flex 1
        text-align center
      .right
        flex 1
        text-align right
    > .text-box
      display flex
      flex 1 1 16px
      .left
        flex 1
      .center
        flex 1
        text-align center
      .right
        flex 1
        text-align right
        padding-right 15px
    // .line
    //   display inline-block
    //   width: 1px
    //   height: 9px
    //   background-color: #dedee0
    // .left
    //   text-align left
    //   &.min
    //     position absolute
    //     top 18px
    //     left -25px
    //     // float none
    //     // clear both
    //     // width 16%
    //     text-align center
    // .right
    //   text-align right
    //   &.max
    //     position absolute
    //     top 18px
    //     right -16px
    //     // float none
    //     // clear both
    //     // width 16%
    //     text-align center
    // .center
    //   text-align center
</style>
