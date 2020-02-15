<template>
<div class="checkbox custom">
  <input :id="uuid" class="css-checkbox" type="checkbox" v-model="isActive" @change="onChangeCheck($event)"/>
  <label :for="uuid" class="css-label">{{ text }}</label>
</div>
</template>

<script>
export default {
  name: 'common-checkbox',
  components: {
  },
  props: {
    check: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: ''
    },
    index: {
      type: Number,
      default: 0
    }
  },
  computed: {
  },
  data () {
    return {
      isActive: this.check,
      uuid: this.guid()
    }
  },
  beforeMount () {
  },
  created () {
  },
  mounted () {
  },
  methods: {
    guid () {
      function s4 () {
        return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1)
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
    },
    onChangeCheck (e) {
      this.$emit('onChange', { check: this.isActive, index: this.index })
    }
  },
  watch: {
    check (newVal) {
      this.isActive = newVal
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
.checkbox.custom {
  float: left;
  margin: 0;
  padding: 0;
  display: block;
  width: 100%;
  height 40px
}

input[type="checkbox"].custom {
  margin-left: 0;
  padding: 0;
}

input[type=checkbox].css-checkbox {
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0px;
  border: 0;
}

input[type=checkbox].css-checkbox+label.css-label {
  padding-left: 32px;
  height: 40px;
  display: inline-block;
  line-height: 40px;
  background-repeat: no-repeat;
  background-position: 0 center;
  font-size: 15px;
  vertical-align: middle;
  cursor: pointer;
  opacity: 1;
}

input[type=checkbox].css-checkbox+label.css-label:hover {
/*   opacity: 0.5; */ /* 선택적 사용 */
}

input[type=checkbox].css-checkbox:checked+label.css-label {
  background-image: url('~assets/images/ic/ic_checkbox_selected.png')
}

.css-label {
  background-image: url('~assets/images/ic/ic_checkbox_unselected.png')
}

</style>
