
<template>
  <div class="share-contents-wrapper">
    <div class="item facebook" @click="shareFacebookLink">페이스북</div>
    <div class="item twitter" @click="shareTwitterLink">트위터</div>
    <div class="item email" @click="shareEmailLink">
      이메일
      <!-- <a :href="`mailto:user@billcha.com?subject=billcha&body=${link}`">이메일</a> -->
      <!-- <a :href="'mailto:user@billcha.com'">이메일</a> -->
    </div>
    <div type="button"
      class="item link-copy"
      v-clipboard:copy="link"
      v-clipboard:success="onCopy"
      v-clipboard:error="onError">링크복사</div>
  </div>
</template>

<script>
export default {
  name: 'share-contents',
  components: {
  },
  props: {
    id: {
      default: ''
    }
  },
  data () {
    return {
    }
  },
  computed: {
    link () {
      return window.location.origin + '/detail?id=' + this.id
    }
  },
  beforeMount () {
  },
  mounted () {
  },
  methods: {
    shareTwitterLink () {
      var text, detailLink
      text = ''
      detailLink = this.link
      window.open('http://twitter.com/intent/tweet?text=' + text + '&url=' + detailLink, '')
    },
    shareFacebookLink () {
      var detailLink = this.link
      window.open('https://www.facebook.com/sharer/sharer.php?u=' + detailLink, '_blank')
    },
    shareEmailLink () {
      let emailTo = 'user@billcha.com'
      let emailCC = ''
      let emailSub = '빌차제목'
      let emailBody = this.link
      window.open('mailto:' + emailTo + '?cc=' + emailCC + '&subject=' + emailSub + '&body=' + emailBody)
    },
    onCopy: function (e) {
      alert('링크가 복사되었습니다')
    },
    onError: function (e) {
      alert('Failed to copy texts')
    }
  }
}
</script>
<style lang="stylus">
.share-contents-wrapper
  width 100%
  height 100%
  > .item
    width 100%
    height 42px
    line-height 42px
    font-size: 16px
    font-weight: 300
    text-align: center
    opacity: 0.9
    color: #162348

</style>
