<template>
<div class="common-input-file-wrapper">
  <div class="file-input-box">
    <label :for="getGuid">{{ text }}</label>
    <input class="input input-detail-address" :id="getGuid" :multiple="multiple"
      name="CopyCompanyRegistrationNumber" type="file" @change="previewFiles"  ref="fileInput"/>
    <div class="file-name-box" v-if="getIsMobile && checkFile">
      <div class="file-name-item fl" v-for="(item, index) in file" :key="item.id"><span class="validator-file-name">{{ item.name }}</span><span class="ic validator-file-close" @click="deleteFile(index)"></span></div>
    </div>
    <div v-show="changeFlag && !checkFile" class="help is-danger">{{ errorMessage }}</div>
    <div v-show="!changeFlag || checkFile" class="sub-desc" v-html="subDesc"></div>
  </div>
  <div class="file-name-box" v-if="!getIsMobile && checkFile">
    <div class="file-name-item fl" v-for="(item, index) in file" :key="item.id"><span class="validator-file-name">{{ item.name }}</span><span class="ic validator-file-close" @click="deleteFile(index)"></span></div>
  </div>
</div>
</template>

<script>
export default {
  name: 'common-input-file',
  components: {
  },
  props: {
    text: {
      type: String,
      default: '업로드'
    },
    errorMessage: {
      type: String,
      default: '업로드가 되지않았습니다'
    },
    subDesc: {
      type: String
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    getIsMobile () {
      return this.$store.getters.getIsMobile
    },
    checkFile () {
      return this.file.length > 0
    }
  },
  data () {
    return {
      changeFlag: false,
      file: [],
      getGuid: 'file' + this.guid(),
      filename: []
    }
  },
  beforeMount () {
  },
  created () {
  },
  mounted () {
  },
  methods: {
    previewFiles (event) {
      // if (window.FileReader) { // modern browser
      //   this.filename = window.$(this)[0].files[0].name
      // } else { // old IE
      //   this.filename = window.$(this).val().split('/').pop().split('\\').pop() // 파일명만 추출
      // }
      this.changeFlag = true
      if (this.multiple) {
        for (var i = 0; i < event.target.files.length; i++) {
          this.file.push(event.target.files[i])
        }
      } else {
        this.file.splice(0, 1, event.target.files[0])
      }
      // this.filename = event.target.files[0].name
      this.$emit('onChange', this.file)
      this.$refs.fileInput.type = 'text'
      this.$refs.fileInput.type = 'file'
    },
    deleteFile (index) {
      this.file.splice(index, 1)
      this.$emit('onChange', this.file)
    },
    onInput (value) {
      this.$emit('onSelected', value)
    },
    validatorAll () {
      this.changeFlag = true
      return this.file.length > 0
    },
    guid () {
      function s4 () {
        return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1)
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
    }
  },
  watch: {
    value (newValue) {
      this.selected = newValue
    }
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
  .common-input-file-wrapper
    .file-input-box
      flex-direction column
      label
        order 0
        flex 0 0 50px
        max-width 125px
      .sub-desc
        order 2
        text-align left
        justify-content left
        align-items start
    .validator-file-name
      max-width calc(100% - 30px)
      white-space nowrap
    .file-name-box
      order 1
      width calc(100% - 30px)
.common-input-file-wrapper
  .file-input-box
    display flex
    label
      display inline-block
      height 100%
      font-size 16px
      font-weight 300
      text-align center
      color rgba(22, 35, 72, 0.4)
      border-radius 2px
      box-shadow 0 2px 6px 2px rgba(22, 27, 72, 0.03)
      border solid 1px rgba(22, 27, 72, 0.2)
      background-color #ffffff
      padding 0px 20px
      height 50px
      flex 0 0 117px
      cursor pointer
    .help.is-danger, .sub-desc
      display flex
      flex-direction column
      justify-content center
      align-items center
  .validator-file-name
    display: inline-block
    height: 28px
    border-radius: 2px
    background-color: #f8f8fb
    line-height: 22px
    padding: 3px 5px
    font-size: 13px
    font-weight: normal
  .validator-file-close
    display inline-block
    width 28px
    height 28px
    background-color #f8f8fb
    margin-right 17px
    background-image url('~assets/images/ic/ic_btn_file_close.png')
    cursor pointer
  .file-name-box
    margin-top 7.5px
    width 580px
    word-break break-all
  .file-name-item
    display flex
    flex 1 1 auto
.common-input-file-wrapper input[type="file"]
  /* 파일 필드 숨기기 */
  position: absolute
  width: 1px
  height: 1px
  padding: 0
  margin: -1px
  overflow: hidden
  clip:rect(0,0,0,0)
  border: 0
</style>
