<template>
  <div class="common-tabs-wrapper">
    <tabs
      :tabs="data"
      :currentTab="currentTab"
      :wrapper-class="'default-tabs'"
      :tab-class="'default-tabs__item'"
      :tab-active-class="'default-tabs__item_active'"
      :line-class="'default-tabs__active-line'"
      @onClick="handleClick"
    />
    <div class="base-underline"></div>
  </div>
</template>

<script type="text/babel">
import Tabs from 'vue-tabs-with-active-line'
export default {
  name: 'common-tab',
  components: {
    Tabs
  },
  props: {
    data: {
      type: Array,
      default () {
        return [
        ]
      }
    },
    currentTab: {
      type: String
    }
  },
  watch: {
  },
  data () {
    return {
      tabs: [
        { title: 'Tab 1', value: 'tab1' },
        { title: 'Tab 2', value: 'tab2' },
        { title: 'Tab 3', value: 'tab3' }
      ],
      isCurrentTab: this.currentTab
    }
  },
  mounted () {
  },
  methods: {
    handleClick (newTab) {
      this.isCurrentTab = newTab
      this.$emit('onSelectedTab', newTab)
    }
  }
}
</script>

<style lang="stylus">
.common-tabs-wrapper
  position: relative
  font-size: 0
  .default-tabs
    position: relative
    margin: 0 auto
    &__item
      display: inline-block
      // margin: 0 5px
      padding: 10px
      padding-bottom: 8px
      font-size: 18px
      letter-spacing: 0.8px
      color: #080f31
      text-decoration: none
      border: none
      background-color: transparent
      border-bottom: 5px solid transparent
      cursor: pointer
      transition: all 0.25s
      flex: 1
      &_active
        color: black
      &:hover
        border-bottom: 5px solid gray
        color: black
      &:focus
        outline: none
        border-bottom: 5px solid gray
        color: black
      &:first-child
        margin-left: 0
      &:last-child
        margin-right: 0
    &__active-line
      position: absolute
      bottom: 0
      left: 0
      height: 5px
      background-color: #080f31
      transition: transform 0.4s ease, width 0.4s ease
    .content
      margin-top: 30px
      font-size: 20px
    &.tabs:not(:last-child)
      margin-bottom 0px
  .base-underline
    width 100%
    height: 2px
    background-color: #ececf4
    position: absolute
    top: 45px
    z-index: -1
</style>
