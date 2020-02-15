<template>
<div class="common-billboard-search-wrapper">
  <div class="fl billboard-search-container"
    v-shortkey="{enter: ['enter']}" @shortkey="theAction" ref="inputSearch">
    <input type="text" style="display:none" aria-hidden="true">
    <input class="input input-search"
      @input="onInput"
      placeholder="모든 지역"
      v-model="query"
      v-bind:style="{ 'height' : height + 'px' }"
      type="text"
      autocomplete="off"
      >
    <span class="ic icon-search"></span>
  </div>
  <div class="suggest" v-if="show">
    <ul>
      <li class="autocomplete" v-for="(item, index) in data" :key="item.id" :index="index" :class="{'isActive' : currentIndex === index}"
        @mouseover="mouseOver(index)" @click="onListClick"
      >{{ item.full_name }}</li>
    </ul>
  </div>
</div>
</template>

<script>
// import util from 'components/util/util'
export default {
  name: 'common-billboard-search',
  components: {
  },
  props: {
    height: {
      type: Number,
      default: 42
    },
    value: {
      type: String,
      default: null
    }
  },
  computed: {
    currentData () {
      if (this.data) {
        return this.data[this.currentIndex]
      }
    }
  },
  data () {
    return {
      query: this.value,
      currentIndex: 0,
      data: [],
      show: false,
      ieGraudFlag: true,
      callbackFunc: this.documentClick
    }
  },
  beforeMount () {
    this.requestRegionCategories()
  },
  created () {
  },
  mounted () {
    document.addEventListener('click', this.callbackFunc, {
      capture: true // default 값은 false입니다.
    })
    document.addEventListener('keydown', this.checkKey)
    let self = this
    // ie11에서 자동으로 포커스가 맞춰주면서 oninput 이벤트가 발생을 막기위한 코드
    setTimeout(() => {
      self.ieGraudFlag = false
    }, 1000)
  },
  methods: {
    checkKey (e) {
      if (!this.show) return
      e = e || window.event
      if (e.keyCode === 38) {
        // up arrow
        this.theAction({srcKey: 'up'})
      } else if (e.keyCode === 40) {
        // down arrow
        this.theAction({srcKey: 'down'})
      }
    },
    documentClick (e) {
      if (!this.$refs.inputSearch) return
      let el = this.$refs.inputSearch
      let target = e.target
      if ((el !== target) && !el.contains(target)) this.show = false
      else this.show = true
    },
    theAction (event) {
      console.log(event.srcKey)
      switch (event.srcKey) {
        case 'up':
          if (this.currentIndex > 0) {
            this.currentIndex--
          }
          break
        case 'down':
          if (this.currentIndex < this.data.length - 1) {
            this.currentIndex++
          }
          break
        case 'enter':
          if (this.show) this.onChangeSearchValue(this.currentData)
          break
      }
    },
    mouseOver (index) {
      this.currentIndex = index
    },
    onListClick () {
      this.onChangeSearchValue(this.currentData)
    },
    onInput (e) {
      if (this.ieGraudFlag) return
      this.show = true
      if (e.currentTarget.value) this.requestRegionCategories(e.currentTarget.value)
    },
    requestRegionCategories (queryString) {
      var self = this
      this.$axios.get('/api/v1/billboard_region_categories/search', {
        params: {
          keyword: queryString
        }
      }).then((respRegion) => {
        self.data = respRegion.data
        // self.parsingBillboardData(respToken.data)
      }).catch(function (error) {
        if (error) {
        }
      }).then(() => {
      })
    },
    onChangeSearchValue (queryString) {
      var self = this
      this.show = false
      this.query = queryString.name
      self.$emit('onChangeSearchValue', queryString)
    }
  },
  watch: {
    value (newVal) {
      this.query = newVal
    },
    show (newVal) {
      this.$emit('onShow', newVal)
    }
    // data: {
    //   handler (newValue) {
    //     this.listData = newValue
    //   },
    //   deep: true
    // }
  },
  filters: {
  },
  destroyed () {
    document.removeEventListener('keydown', this.checkKey)
  }
}
</script>

<style lang="stylus">
.mobile
  .common-billboard-search-wrapper
    .billboard-search-container
      .ic.icon-search
        left initial
        top 0px
        right 14px
        width 24px
        height 100%
      .input.input-search
        padding-left 10px
.common-billboard-search-wrapper
  width 100%
  height 100%
  position relative
  .billboard-search-container
    width 100%
    height: 100%
    min-width: 360px
    position relative
    .ic.icon-search
      top 11px
      position absolute
      left 15px
      width 20px
      height 20px
      background-image url("~assets/images/ic/btn_search.png")
    .input.input-search
      height 42px
      padding-left 55px
  .suggest
    position absolute
    width 100%
    height auto
    max-height 420px
    background-color #ffffff
    top 52px
    left 0px
    border-radius 2px
    border solid 1px rgba(22, 27, 72, 0.4)
    background-color #ffffff
    .autocomplete
      padding-left 20px
      height 50px
      color #162348
      font-size 16px
      font-weight 300
      opacity 0.9
      line-height 50px
    .isActive
      background-color #f8f8fb
</style>
