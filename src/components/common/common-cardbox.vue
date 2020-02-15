<template>
  <div class="common-cardbox-wrapper relative">
    <div class="cardbox-detail-container cols relative" v-if="mode === 'detail'">
      <div class="col-3 cardbox-image-box relative">
        <div class="img" v-bind:style="{ 'background-image': 'url(' + data.image + ')' }"></div>
      </div>
      <div class="col-9 desc-inner relative">
        <div class="desc-box vertical-center">
          <div class="title-box">
            <span class="title">{{ data.title }}</span>
            <span class="sub-title">{{ data.subTitle }}</span>
          </div>
          <div class="date-box">
            <span class="date">{{ data.date }}</span><span class="date-count">{{ data.dateCount }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'common-cardbox',
  components: {
  },
  props: {
    mode: {
      type: String,
      default: 'detail'
    },
    data: {
      type: Object,
      default () {
      }
    }
  },
  computed: {
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
  .common-cardbox-wrapper
    .cardbox-image-box
      margin-left 15px
      margin-right 12px
      .img
        width 100%
        background-size cover
    .desc-inner
      width calc(75% - 27px)
    .title-box
      .title,
      .sub-title
        font-size 15px
      .title
        padding-right 8px
    .date-box
      .date,
      .date-count
        font-size 15px
      .date-count
        padding-left 10px
.common-cardbox-wrapper
  .cardbox-detail-container
    height 107px
    border-bottom solid 1px #ececf4
    margin-bottom 20px
    padding-bottom 20px
    box-sizing content-box
  .cardbox-image-box
    margin-right 98px
    .img
      width 182px
      height 107px
  .desc-inner
    width calc(75% - 98px)
    height 100%
    .desc-box
      min-height 55px
  .title-box
    .title,
    .sub-title
      font-size 16p
      font-weight normal
    .title
      padding-right 12px
    .sub-title
      color #858585
  .date-box
    .date
      font-size 16px
      font-weight normal
    .date-count
      padding-left 13px
      font-size 16px
      font-weight 500
</style>
