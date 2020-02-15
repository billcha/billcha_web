<template>
  <div class="history layout-wrapper">
    <div class="history-header" v-if="getIsMobile"> 예약 내역 </div>
    <div class="container columns is-variable">
      <nav class="nav column is-3" v-if="!getIsMobile">
        <div class="menu" :class="{ 'active' : item.id === selectMenu.id }" v-for="item in nav.menus" :key="item.id"
          @click="_changeHistoryMenu(item)"
        >{{ item.title }}</div>
      </nav>
      <div v-else>
        <common-select class="fl select-box card date" :options="select.options" :placeholder="select.placeholder" @onSelected="_onChangeSelectDateValue"></common-select>
      </div>
      <router-view class="inner column" :class="[ getIsMobile ? 'is-12' : 'is-9' ]" :currentRouter="selectMenu"/>
    </div>
  </div>
</template>

<script>
import CommonSelect from 'components/common/common-select'
export default {
  name: 'history-layout',
  components: {
    CommonSelect
  },
  data () {
    return {
      nav: {
        menus: [
          { id: 1, title: '예약된 광고판', active: false, router: '/history' },
          { id: 2, title: '지난 광고판', active: false, router: '/history/previous' },
          { id: 3, title: '취소된 광고판', active: false, router: '/history/cancel' }
        ]
      },
      selectMenu: {
        id: 1
      },
      select: {
        options: [
          { label: '예약된 광고판', value: 1 },
          { label: '지난 광고판', value: 2 },
          { label: '취소된 광고판', value: 3 }
        ],
        placeholder: '예약된 광고판',
        disabled: false
      }
    }
  },
  computed: {
    getIsMobile () {
      return this.$store.getters.getIsMobile
    },
    getUserInfo () {
      return this.$store.getters.getUserInfo
    }
  },
  beforeMount () {
  },
  mounted () {
  },
  methods: {
    _changeHistoryMenu (item) {
      this.selectMenu.id = item.id
      // this.$router.push(item.router)
    },
    _onChangeSelectDateValue (item) {
      this.selectMenu.id = item.value
    }
  }
}
</script>
<style lang="stylus">
.mobile
  .history.layout-wrapper
    border-top solid 4px #080f31
    > .history-header
      margin-top 12px
      line-height 48px
      text-align left
      flex 1
      width 100%
      padding 0 15px
      font-size 16px
      font-weight 500
      color #162348
    > .container
      margin-top 19px
      margin-bottom 119px
      display flex
      flex-direction column
      .select-box
        width calc(100% - 30px)
        margin 0 auto
        clear both
        float none
        margin-bottom 38px
.history.layout-wrapper
  > .wrapper
    max-width 1180px
    width: 100%
    height: 100%
    position: relative
    display: flex
    flex: 1 0 0%
    flex-direction: column
  > .container
    width 100%
    max-width 1180px
    box-sizing border-box
    margin-top 96px
    margin-bottom 136px
  .nav
    .menu
      cursor pointer
      height 50px
      font-size 18px
      font-weight 500
      color rgba(8, 15, 49, 0.3)
      &.active
        color #080f31
</style>
