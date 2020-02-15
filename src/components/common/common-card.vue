<template>
<div class="common-card-wrapper" v-bind:style="{ 'width': width + 'px' }" @click="clickCard" @mouseover="cardMouseOver" @mouseleave="cardMouseLeave">
  <div class="normal" :class="mode" v-if="mode === 'carousel'">
    <div class="status-box">
      <div class="ready full-size" v-if="data.status === 'ready'">
        <div class="title">비공개</div>
        <div class="desc"><span class="date">{{ setExpectedOpen() }}</span> 오픈합니다!</div>
      </div>
      <div class="close full-size" v-else-if="data.status === 'closed'">
        <div class="title">비공개</div>
        <div class="desc">아쉽게도 판매가<br>완료된 상품입니다</div>
      </div>
      <div class="lowest-price-verification" v-if="data.lowestPriceVerification">
        최저가 인증
      </div>
    </div>
    <div class="icon-save" v-on:click.stop.prevent="clickSave" v-if="!getIsMobile">
      <span class="ic save" :class="{ 'active' : favorite }"></span>
      <span class="save-text">저장</span>
    </div>
    <div class="icon-share" v-on:click.stop.prevent="clickShare" v-if="!getIsMobile">
      <div class="fl">
        <common-context :position="context.position" :top="context.top" :width="context.width" :height="context.height"
          :mode="context.mode" ref="dateContextPopup" @closedPopup="closedPopup">
          <!-- <slot name="contents" slot="contents"></slot> -->
          <div class="">
            <span class="ic share"></span>
            <span class="share-text">공유</span>
          </div>
          <common-share-contents :id="data.id" slot="contents"></common-share-contents>
        </common-context
      ></div>
    </div>
    <div class="image-box" v-bind:style="{ 'width': width + 'px' }">
      <div class="image img" v-bind:style="{ 'background-image': 'url(/static/' + data.image + ')' }"></div>
      <!-- <img class="image img" :src="'/static/' + data.image"> -->
      <!-- <div class="image img owl-lazy" :data-src="'/static/' + data.image"></div> -->
    </div>
    <div class="contents">
      <div class="category-view-box">
        <div class="fl category sub-color" v-if="!getIsMobile">{{ data.category }}</div>
        <div class="fl date sub-color" v-if="getIsMobile" >{{ data.date }}/</div>
        <div class="full-height fr"><span class="ic ic-views"></span><span class="views sub-color">{{ data.views }}</span></div>
      </div>
      <!-- 데스크탑 -->
      <div class="price-date-box" v-if="!getIsMobile">
        <span class="price">{{ setPriceData() | numberComma }}</span>
        <span class="discount" v-if="data.discountPercentage > 0 && data.status === 'open'">{{ data.price | numberComma }}</span>
        <span class="date sub-color" >/ {{ data.date }}</span>
      </div>
      <!-- 모바일 -->
      <div class="price-date-box" v-else>
        <div class="price">
          <span class="">{{ setPriceData() | numberComma }}</span>
          <span class="discount-percentage" v-if="data.discountPercentage > 0 && data.status === 'open'">{{ data.discountPercentage + '%' }}</span>
        </div>
        <div class="discount" v-if="data.discountPercentage > 0 && data.status === 'open'">{{ data.price | numberComma }}</div>
      </div>
      <div class="location">{{ data.location }}</div>
      <!-- 데스크탑 -->
      <div class="floor-area-box" v-if="!getIsMobile">
        <span class="floor light-color">{{ data.buildingTargetFloor + '층' }}</span>
        <span class="square">∙</span>
        <span class="area-size light-color">{{ data.area }} (m)</span>
      </div>
      <!-- 모바일 -->
      <div class="floor-area-box" v-else>
        <span class="fl category light-color">{{ data.category | addLineString }}</span>
        <span class="floor light-color">{{ data.buildingTargetFloor + '층' | addLineString}}</span>
        <span class="area-size light-color">{{ data.area }} (m)</span>
      </div>
      <div class="desc" v-if="!getIsMobile">{{ data.title }}</div>
    </div>
  </div>
  <div class="mobile-list" v-else-if="mode === 'mobileList'" @click="clickCard">
    <div class="contents fl">
      <div class="status-box">
        <span class="date sub-color">{{ data.date }}/</span>
        <div class="full-height fr">
          <span class="ic ic-views"></span><span class="views sub-color">{{ data.views }}</span>
        </div>
      </div>
      <div class="price-date-box">
        <span class="price">{{ setPriceData() | numberComma }}</span>
        <span class="discount-percentage fr" v-if="data.discountPercentage > 0 && data.status === 'open'">{{ data.discountPercentage + '%' }}</span>
        <div class="discount" v-if="data.discountPercentage > 0 && data.status === 'open'">{{ data.price | numberComma }}</div>
      </div>
      <div class="location">{{ data.location }}</div>
      <div class="info-box">
        <span class="info-item category">{{ data.category + ' |'}}</span>
        <span class="info-item light-color">{{ data.buildingTargetFloor + '층' }} |</span>
        <span class="info-item light-color">{{ data.area }} (m)</span>
      </div>
      <div class="short-desc" >{{ data.title }}</div>
    </div>
    <div class="image-box">
      <div class="status-box">
        <span class="lowest-price-verification" v-if="data.lowestPriceVerification">최저가 인증</span>
        <div class="ready full-size" v-if="data.status === 'ready'">
          <div class="title">비공개</div>
          <div class="desc"><span class="date">{{ setExpectedOpen() }}</span> 오픈</div>
        </div>
        <div class="close full-size" v-else-if="data.status === 'closed'">
          <div class="title">비공개</div>
          <div class="desc">판매완료</div>
        </div>
      </div>
      <div class="image img fr" v-bind:style="{ 'background-image': 'url(/static/' + data.image + ')' }"></div>
    </div>
  </div>
  <div class="billboard-story" @click="moveLinkBillboardStory" v-else>
    <div class="image-box">
      <div class="image img" v-bind:style="{ 'background-image': 'url(/static/' + data.image + ')' }"></div>
      <div class="contents">
        <div class="category">{{ data.category }}</div>
        <div class="title">{{ data.title }}</div>
        <div class="date">{{ data.date }}</div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import CommonContext from 'components/common/common-context'
import CommonShareContents from 'components/common/common-share-contents'
export default {
  name: 'common-card',
  components: {
    CommonContext,
    CommonShareContents
  },
  props: {
    // psv: undefined,
    mode: {
      type: String,
      default: 'carousel'
    },
    data: {
      type: Object,
      default () {
        return {
        }
      }
    },
    width: {
      type: Number
    },
    context: {
      type: Object,
      default () {
        return {
          position: 'right',
          top: 30,
          width: 155,
          height: 200,
          mode: 'blur'
        }
      }
    }
  },
  computed: {
    getIsMobile () {
      return this.$store.getters.getIsMobile
    }
  },
  data () {
    return {
      vrView: '',
      onMouseOver: false,
      favorite: this.data.favorite
    }
  },
  beforeMount () {
  },
  created () {
  },
  mounted () {
  },
  methods: {
    cardMouseLeave () {
      this.$emit('cardMouseLeave', this.data)
    },
    cardMouseOver () {
      this.$emit('cardMouseOver', this.data)
    },
    clickSave () {
      this.requsetFavoriteBillboard()
    },
    requsetFavoriteBillboard () {
      var self = this
      if (!this.favorite) {
        this.$axios.post('/api/v1/favorite_billboards', { billboard_id: this.data.id }).then(() => {
          self.$emit('onClickSave', this.data)
        }).catch(function () {
        }).then(() => {
        })
      } else {
        this.$axios.delete('/api/v1/favorite_billboards', { data: { billboard_id: this.data.id } }).then(() => {
          self.$emit('onClickSave', this.data)
        }).catch(function () {
        }).then(() => {
        })
      }
      this.favorite = !this.favorite
    },
    clickShare () {
      this.$emit('onClickShare', this.data.id)
    },
    clickCard () {
      this.$emit('onClickCard', this.data.id)
    },
    closedPopup () {
      this.$emit('closedPopup', this.data.id)
    },
    moveLinkBillboardStory () {
      window.open(this.data.linkedUrl, '_blank')
    },
    setExpectedOpen () {
      return this.$moment(this.data.expectedOpeningDate).format('MM월 DD일')
    },
    setPriceData () {
      let result = this.data.price
      if (this.data.discountPercentage > 0) {
        result = Math.floor((this.data.price - (this.data.price / this.data.discountPercentage)))
      }
      if (this.data.status === 'ready') {
        result = this.setExpectedOpen() + 'OPEN'
      } else if (this.data.status === 'closed') {
        result = '예약 마감'
      }
      return result
    }
  },
  watch: {
    data: {
      handler (newValue) {
        if (newValue.favorite) this.favorite = newValue.favorite
      },
      deep: true
    }
  },
  filters: {
    addLineString: function (value) {
      if (typeof value !== 'string') {
        return value
      }
      return value + '  |  '
    }
  }
}
</script>

<style lang="stylus">
// 모바일 맵 카드스와이프 css 대응
.mobile .billboard-list-page.wrapper:not(.map-hide) .common-card-wrapper > .mobile-list {
  height: 131px;
  > .contents {
    padding: 0 11px 0 15px;
    .short-desc {
      display: none;
    }
  }
}
.mobile
  .common-card-wrapper
    > .normal
      min-height 200px
      .status-box
        height 107px
        display flex
        > .full-size
          padding 0
          display flex
          flex-direction column
          justify-content center
          .title
            font-size 13px
            line-height 19px
            height 19px
            margin 0
          .desc
            font-size 11px
            font-weight 300
            line-height 17px
        .lowest-price-verification
          top initial
          left initial
          z-index -1
      // 이미지
      .image-box
        border-radius 4px
        height 107px
      > .contents
        // 조회수
        .category-view-box
          height 15px
          line-height 15px
          margin-top 7px
          margin-bottom 5px
          .ic-views
            width 11px
            margin-right 1px
          .views
            line-height 15px
            font-size 10px
        // 가격정보
        .price-date-box
          line-height 24px
          height auto
          display flex
          flex-direction column
          flex 0 0 39px
          .price
            display flex
            justify-content space-between
            font-size 16px
          .date
            font-size 14px
          .discount-percentage
            color #fa6400
            font-size 13px
            font-weight 500
            text-align right
          .discount
            line-height 15px
        // 주소
        .location
          font-size 11px
          height 17px
          line-height 17px
          margin-top 6px
        //층정보
        .floor-area-box
          > span
            margin-right 3px
          .category, .floor, .area-size
            font-size 10px
            font-weight 500
            color #6e6e78
            vertical-align top
    > .billboard-story
      min-height 207px
      > .image-box
        height 207px
        border-radius 2px
        > .contents
          padding 34px 20px 0px 15px
          .title
            font-size 16px
            height 24px
            margin-bottom 89px
          .date
            font-size 12px
            height 18px
      .contents
        padding 34px 20px 0px 15px
    > .mobile-list
      height 164px
      background-color #fff
      display flex
      > .contents
        width calc(100% - 145px)
        box-sizing border-box
        display flex
        flex-direction column
        justify-content center
        padding 0 0 0 15px
        .status-box
          height 17px
        // 조회수
        .views
          font-size: 11px
          font-weight: 500
          line-height normal
          height 100%
          display inline-block
          vertical-align top
        .ic-views
          vertical-align super
          margin-right 3px
          width 16px
          height 7px
          display inline-block
          background-image url('~assets/images/ic/ic_views.png')
        // 가격
        .price-date-box
          height auto
          line-height normal
          margin-bottom 5px
        .price
          font-size: 18px
          font-weight: 500
        .date
          font-size: 10px
          font-weight: normal
          vertical-align: top
        .discount-percentage
          font-size: 13px
          font-weight: 500
          color: #fa6400
          text-align right
        .discount
          font-size 13px
          font-weight normal
          color #5a5a5d
          line-height 19px
          text-decoration line-through
        // 위치
        .location
          height 17px
          line-height 17px
          font-size: 11px
          font-weight: normal
        .info-box
          line-height 15px
        // 종류 | 층정보 | 해상도
        .info-item
          color #6e6e78
          font-size 10px
          font-weight 500
        // 설명
        .short-desc
          margin-top 7px
          line-height 15px
          font-size 10px
          font-weight 300
          color #6e6e78
      > .image-box
        height 100px
        width 100%
        margin: 0
        position: absolute
        right 15px
        top: 50%
        -webkit-transform: translate(0%, -50%)
        transform: translate(0%, -50%)
        > .image
          width 130px
          height 100%
          background-size cover
        .status-box
          position absolute
          width 130px
          height 100%
          top 0
          right 0
          z-index 1
          padding 0px
          display flex
          // 최저가인증마크
          .lowest-price-verification
            position absolute
            top 0px
            left 0px
            height: 17px
            border-radius: 2px
            background-color #e10b4d
            border: solid 1px #e10b4d
            text-align: center
            color #fff
            font-size: 10px
            font-weight: 500
            padding 0px 8px
            vertical-align top
            z-index -1
          > .full-size
            padding 0
            color #ffffff
            display flex
            flex-direction column
            justify-content center
            > .title
              color #ffffff
              font-size 13px
              font-weight 500
              margin-bottom 1px
              height 19px
              line-height 19px
              text-align center
            > .desc
              font-size 11px
              font-weight 300
              text-align center
              > .date
                color #fa6400
          .ready
            background-color: rgba(0, 0, 0, 0.6)
          .close
            background-color: rgba(0, 0, 0, 0.6)
.common-card-wrapper
  height 100%
  text-align left
  position relative
  cursor pointer
  > .normal
    position relative
    min-height 250px
    &.carousel
      .status-box
        padding 0px
    .status-box
      position absolute
      width 100%
      height 250px
      top 0
      left 0
      z-index 1
      padding 0px 10px
      > .full-size
        padding 92px 0px 78px 0px
        color #ffffff
        > .title
          color #ffffff
          font-size 18px
          font-weight 500
          margin-bottom 5px
          height 27px
          line-height 27px
          text-align center
        > .desc
          font-size 16px
          font-weight 300
          text-align center
          > .date
            color #fa6400
      .ready
        background-color: rgba(0, 0, 0, 0.6)
      .close
        background-color: rgba(0, 0, 0, 0.6)
      .lowest-price-verification
        position absolute
        top 15px
        left 14px
        width 80px
        height 20px
        border-radius 4px
        background-color #e10b4d
        text-align center
        color #ffffff
        font-size:12px
        font-weight 500
    .icon-save
      position absolute
      top 12px
      right 12px
      width 56px
      height 26px
      z-index 1
      .save
        display: inline-block
        width 14px
        height 18px
        background-image url('~assets/images/ic/dibs.png')
        background-position-x left
        &.active
          background-image url('~assets/images/ic/ic_active_save.png')
      .save-text
        font-size: 12px
        color #ffffff
        vertical-align top
    .icon-share
      position absolute
      top 12px
      right 68px
      width 56px
      height 26px
      z-index 1
      .share
        display: inline-block
        width 14px
        height 18px
        background-image url('~assets/images/ic/share.png')
        background-position-x left
      .share-text
        font-size: 12px
        color #ffffff
        vertical-align top
    > .image-box
      position relative
      width 100%
      height 250px
      overflow: hidden
      .image
        width 100%
        height 100%
        // background-size: 100% auto
        background-size cover
        &:hover
          // background-size: 100% auto
          background-size cover
          position absolute
          left 0
          top 0
          background-repeat no-repeat
          transform: scale( 1.2, 1.0 )
          animation: slide 4s linear infinite
    > .contents
      .category-view-box
        height 31px
        line-height 31px
      .category
        font-size: 13px
        font-weight: 500
      .views
        font-size: 11px
        font-weight: 500
        line-height 31px
        height 100%
        display inline-block
        vertical-align top
      .ic-views
        margin-right 7px
        width 16px
        height 100%
        display inline-block
        background-image url('~assets/images/ic/ic_views.png')
      .price-date-box
        height 27px
        line-height 27px
      .price
        font-size: 18px
        font-weight: 500
      // 할인율
      .discount
        font-size 13px
        font-weight normal
        color #5a5a5d
        text-decoration line-through
        margin-left 2px
      .date
        font-size: 14px
        font-weight: 300
      .location
        height 24px
        line-height 24px
        font-size 16px
        font-weight normal
        white-space nowrap
        text-overflow ellipsis
        overflow hidden
      .floor-area-box
        margin-top 4px
        height 19px
        line-height 19px
      .floor
        display inline-block
        font-size: 13px
        font-weight: 500
      .area-size
        display inline-block
        font-size: 13px
        font-weight: 500
      .square
        width 9px
        height 16px
        color: #bababd
        margin 0px 7px 0px 7px
      .desc
        font-size: 14px
        font-weight: 300
        margin-top 16px

  > .billboard-story
    min-height 414px
    > .image-box
      position relative
      width 100%
      height 414px
      overflow: hidden
      .image
        width 100%
        height 100%
        // background-size: 100% auto
        background-size cover
      > .contents
        position absolute
        top: 0
        box-sizing border-box
        padding 160px 0px 54px 40px
        width: 100%
        height: 100%
        color: #ffffff
        background-color rgba(0, 0, 0, 0.3)
        .category
          font-size: 14px
          font-weight: 500
          margin-bottom 17px
        .title
          color: #ffffff
          font-size: 24px
          font-weight: 500
          margin-bottom 107px
        .date
          font-size: 14px
          font-weight: 500

  @keyframes slide
    0%
      background-position: 0px 0px
    50%
      background-position: -25px 0px
    100%
      background-position: 0px 0px
</style>
