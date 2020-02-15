<template>
  <div class="billboard-list layout-wrapper"  :class="{ 'mobile' : getIsMobile }">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'billboard-list-layout',
  components: {
  },
  data () {
    return {}
  },
  computed: {
    getIsMobile () {
      return this.$store.getters.getIsMobile
    }
  },
  beforeMount () {
  },
  mounted () {
  },
  methods: {
  }
}
</script>
<style lang="scss">
// .root-layout-wrapper.mobile > .billboard-list.layout-wrapper {
//   height: auto;
// }
.root-layout-wrapper > .billboard-list.layout-wrapper {
  width: 100%;
  max-width: 100%;
  position: absolute;
  top: 0px;
  margin-top: 70px;
  height: calc(100% - 70px);
}
</style>
