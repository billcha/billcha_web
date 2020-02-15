<template>
<div class="common-input-zipcode-wrapper">
  <div class="key">{{ title }}</div>
  <div class="value zipcode-inner display-flex flex-column">
    <div class="zipcode-box">
      <input class="input" type="text" v-model="isPostcode" @change="onChange" placeholder="우편번호" readonly><button class="button" @click="openZipcodePopup">우편번호 찾기</button>
    </div>
    <input class="input input-address" type="text" v-model="isAddress"  @change="onChange" placeholder="기본 주소" readonly>
    <!-- <input class="input input-detail-address" type="text" v-model="isDetailAddress"  @change="onChange" placeholder="상세 주소" ref="inputDetailAddress"> -->

    <input v-validate="'required'" class="input input-detail-address" :class="{ 'is-danger': errors.has('required') }"
    v-model="isDetailAddress" name="detailAddress" type="text" placeholder="상세 주소"  @change="onChange"  ref="inputDetailAddress"/>
    <div v-show="errors.has('detailAddress')" class="help is-danger">상세주소를 입력해주세요</div>
    <div v-show="!errors.has('detailAddress')" class="sub-desc">{{ subDesc }}</div>
  </div>
</div>
</template>

<script>
export default {
  name: 'common-input-zipcode',
  components: {
  },
  props: {
    title: {
      type: String
    },
    postcode: {
      type: String
    },
    address: {
      type: String
    },
    detailAddress: {
      type: String
    },
    subDesc: {
      type: String
    }
  },
  computed: {
  },
  data () {
    return {
      isPostcode: this.postcode,
      isAddress: this.address,
      isDetailAddress: this.detailAddress
    }
  },
  beforeMount () {
  },
  created () {
  },
  mounted () {
    var daum = window.daum
    var self = this
    this.zipcodeSdk = new daum.Postcode({
      oncomplete: function (data) {
        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

        // 각 주소의 노출 규칙에 따라 주소를 조합한다.
        // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
        var addr = '' // 주소 변수

        // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
        if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
          addr = data.roadAddress
        } else { // 사용자가 지번 주소를 선택했을 경우(J)
          addr = data.jibunAddress
        }

        // 우편번호와 주소 정보를 해당 필드에 넣는다.
        self.isPostcode = data.zonecode
        self.isAddress = addr
        // 커서를 상세주소 필드로 이동한다.
        self.$refs.inputDetailAddress.focus()
        self.onChange()
      }
    })
  },
  methods: {
    openZipcodePopup () {
      this.zipcodeSdk.open()
    },
    onChange () {
      this.$emit('onChange', {
        postcode: this.isPostcode,
        address: this.isAddress,
        detailAddress: this.isDetailAddress
      })
    },
    validatorAll () {
      this.$validator.validateAll()
    }
  },
  watch: {
    postcode (newVal) {
      this.isPostcode = newVal
    },
    address (newVal) {
      this.isAddress = newVal
    },
    detailAddress (newVal) {
      this.isDetailAddress = newVal
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
  .common-input-zipcode-wrapper
    height auto
    flex-direction column
    .zipcode-inner
      margin-top 0px
  .billboard-register-page.wrapper .step-container .step-inner .input-box .common-input-zipcode-wrapper .value
    flex 1 0 190px
.common-input-zipcode-wrapper
  display flex
  width 100%
  min-height 50px
  height 178px
  line-height 50px
  .key
    flex 0 0 140px
  .value
    flex 1 0 140px
    height 100%
    .input
      height 100%
      min-height 50px
    .input-address
      margin-bottom 8px
    // .input-detail-address
  .button
    height 50px
    font-size 16px
    color rgba(22, 35, 72, 0.4)
    font-weight 300
    border-radius: 2px
    box-shadow: 0 2px 6px 2px rgba(22, 27, 72, 0.03)
    border: solid 1px rgba(22, 27, 72, 0.2)
    background-color: #ffffff
  .zipcode-box
    margin-bottom 8px
    display flex
    flex-direction row
    .input
      width 164px
      margin-right 12px
      height 50px
    .button
      width 117px
</style>
