<template>
<div class="common-no-data-wrapper" :class="mode">
  <div class="img image-box" v-bind:style="{ 'background-image': 'url(' + setData.imgPath + ')' }"></div>
  <div class="title">{{ setData.title }}</div>
  <div class="sub-title" v-if="setData.subTitle">{{ setData.subTitle }}</div>
</div>
</template>

<script>
export default {
  name: 'common-no-data',
  components: {
  },
  props: {
    mode: {
      type: String,
      default: 'billboard-list'
    }
  },
  computed: {
    getIsMobile () {
      return this.$store.getters.getIsMobile
    },
    setData () {
      let result = {
        imgPath: require('../../assets/images/nodata-list.png'),
        title: '검색된 광고판이 없습니다.',
        subTitle: '다른 조건으로 검색해보세요.'
      }
      if (this.mode === 'billboard-list') {
        result = {
          imgPath: require('../../assets/images/nodata-list.png'),
          title: '검색된 광고판이 없습니다.',
          subTitle: '다른 조건으로 검색해보세요.'
        }
      } else if (this.mode === 'history1') {
        result = {
          imgPath: require('../../assets/images/nodata-list.png'),
          title: '예약된 광고판이 없습니다.'
        }
      } else if (this.mode === 'history2') {
        result = {
          imgPath: require('../../assets/images/nodata-list.png'),
          title: '지난 광고판이 없습니다.'
        }
      } else if (this.mode === 'history3') {
        result = {
          imgPath: require('../../assets/images/nodata-list.png'),
          title: '취소된 광고판이 없습니다.'
        }
      }
      return result
    }
  },
  data () {
    return {
    }
  },
  beforeMount () {
  },
  created () {
  },
  mounted () {
  },
  methods: {
  },
  watch: {
    // data: {
    //   handler (newValue) {
    //     this.listData = newValue
    //   },
    //   deep: true
    // }
  },
  filters: {
  }
}
</script>

<style lang="stylus">
.mobile
  .common-no-data-wrapper
    // &.billboard-list
    .image-box
      width 100px
      height 67px
      margin-bottom 27px
    .title
      font-size 24px
      font-weight normal
      margin-bottom 5px
    .sub-title
      font-size 14px
      font-weight normal
.common-no-data-wrapper
  width 100%
  height 100%
  display flex
  flex 1
  flex-direction column
  justify-content center
  align-items center
  // &.billboard-list
  .image-box
    width 138px
    height 93px
    margin-bottom 26px
  .title
    font-size 28px
    font-weight normal
    margin-bottom 11px
  .sub-title
    font-size 16px
    font-weight normal
</style>
