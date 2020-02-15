<template id="field-input">
  <div class="common-vaildator-wrapper" :class="isClass">
    <input v-validate="rules" class="validate-input" :data-vv-as="vvName" v-on:input="onChangeIsOnlyNumberUpdateValue" @keyup.native="numberKeyPress"
    v-model="isModel" :name="name" :type="type" :placeholder="placeholder" @input="updateValue" style="ime-mode:disabled" v-if="rules === 'required|onlyNumber'"/>
    <input v-validate="rules" class="validate-input" :data-vv-as="vvName" @change="onChangeValue"
    v-model="isModel" :name="name" :type="type" :placeholder="placeholder" @input="updateValue" v-else/>

    <div v-if="rules === 'required'" v-show="errors.has(name)" class="help is-danger">{{ errorMessage }}</div>
    <div v-else-if="rules === 'required|onlyNumber'" v-show="errors.has(name)" class="help is-danger">{{ errorMessage }}</div>
    <div v-else v-show="errors.has(name)" class="help is-danger">{{ errors.first(name) }}</div>

    <div v-if="subDesc" v-show="!errors.has(name)" class="sub-desc">{{ subDesc }}</div>
  </div>
</template>

<script>
export default {
  name: 'CommonVaildator',
  components: {
  },
  props: {
    model: {
      required: true
    },
    isClass: {
      type: String,
      default: 'value'
    },
    rules: [String, Object],
    vvName: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: 'name'
    },
    errorMessage: {
      type: String,
      default: '입력해주세요'
    },
    placeholder: {
      type: String,
      default: '입력해주세요'
    },
    subDesc: {
      type: String
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  data () {
    return {
      isModel: this.model
    }
  },
  computed: {
  },
  beforeCreate () {
  },
  created () {
  },
  beforeMount () {
  },
  mounted () {
  },
  destroyed () {
  },
  methods: {
    numberKeyPress (e) {
      var key
      if (window.event) {
        key = window.event.keyCode // IE
      } else { key = e.which } // firefox
      // backspace or delete or tab
      var event
      if (key === 0 || key === 8 || key === 46 || key === 9) {
        event = e || window.event
        if (typeof event.stopPropagation !== 'undefined') {
          event.stopPropagation()
        } else {
          event.cancelBubble = true
        }
        return
      }
      if (key < 48 || (key > 57 && key < 96) || key > 105 || e.shiftKey) {
        e.preventDefault ? e.preventDefault() : e.returnValue = false
      }
    },
    onChangeValue (val) {
      this.$emit('onChange', this.isModel)
    },
    validatorAll () {
      this.$validator.validateAll()
    },
    onChangeIsOnlyNumberUpdateValue (val) {
      this.isModel = String(val.target.value).replace(/[^0-9]/gi, '')
      this.$emit('onChange', this.isModel)
    },
    updateValue (val) {
      // this.rules && this.$validator.validate(this.fieldName, val, this.scope)
      // this.$emit('input', val.data)
    }
  },
  watch: {
    model (newVal) {
      this.isModel = newVal
    }
    // data: {
    //   handler (newValue) {
    //     this.listData = newValue
    //   },
    //   deep: true
    // }
  },
  filters: {
    formatNumber: function (value) {
      if (typeof value !== 'number') {
        return value
      }
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원'
    }
  }
}
</script>

<style lang="stylus">
.common-vaildator-wrapper
  input
    width 100%
  input::placeholder
    color #162348
    opacity 0.4
    font-size 16px
    font-weight 300
    line-height 50px
  .validate-input
    height 50px
    line-height 50px
</style>
