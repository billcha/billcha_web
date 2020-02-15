<template>
<!-- <v-select :value="selected"
  :options="options"
  :searchable="false"
  :clearable="false"
  :closeOnSelect="true"
  :close-on-select="true"
  :placeholder="placeholder"
  :disabled="disabled"
  :components="{OpenIndicator}"
  @input="onInput">
   <template slot="option" slot-scope="option">
        <span class="ddl-class-item"></span>
        {{ option.label }}
    </template>
</v-select> -->

<multiselect
v-model="selected" track-by="label" label="label"
:options="options"
:searchable="false"
:close-on-select="true"
:show-labels="false"
:hideSelected="true"
:placeholder="placeholder"
:option-height="getIsMobile ? 42 : 50"
:maxHeight="200"
:disabled="disabled"
@input="onInput"></multiselect>
</template>

<script>
// import vSelect from 'vue-select'
import Multiselect from 'vue-multiselect'
export default {
  name: 'common-select',
  components: {
    // vSelect,
    Multiselect
  },
  props: {
    options: {
      type: Array,
      default () {
        return []
      }
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      default: null
    }
  },
  computed: {
    getIsMobile () {
      return this.$store.getters.getIsMobile
    }
  },
  data () {
    return {
      selected: this.value
      // OpenIndicator: {
      //   render: createElement => createElement('span', {class: {'ic toggle-arrow-btn': true}})
      // }
    }
  },
  beforeMount () {
  },
  created () {
  },
  mounted () {
  },
  methods: {
    onInput (value) {
      if (value) this.$emit('onSelected', value)
      else this.$emit('onSelected', this.value)
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

<style lang="scss">
// @import "vue-multiselect/dist/vue-multiselect.min.css"

$color1: #ffffff;
$color2: #f8f8fb; // 호버시
$color3: #35495E;
$color4: rgba(22, 27, 72, 0.4);
$color5: #999999;
$color6: #ADADAD;
$color7: #F3F3F3;
$color8: #f8f8fb; // 이미선택 강조
$color9: #162348;

$spinnerBg: $color1;
$spinnerBorderColor: $color2;
$multiselectColor: $color9;
$multiselectBg: $color1;
$multiselectBorderColorHover: darken($color4, 10%);
$multiselectBorderColorFocus: darken($color4, 25%);
$multiselectTagsBgColor: $color1;
$multiselectTagsBorder: 1px solid $color4;
$multiselectTagColor: $color1;
$multiselectTagBgColor: $color2;
$multiselectTagIconColor: darken($color2, 20%);
$multiselectTagIconColorHover: darken($color2, 8%);
$multiselectTagIconColorBgHover: $color1;
$multiselectCurrentBorderColor: $color4;
$multiselectBorderColor: $color5;
$multiselectPlaceholderColor: $color9;
$multiselectContentBgColor: $color1;
$multiselectContentBorderColor: $color4;
$multiselectOptionHighlightBgColor: $color2;
$multiselectOptionHighlightColor: $color9;
$multiselectOptionSelectedBgColor: $color8;
$multiselectOptionSelectedColor: $color9;
$multiselectOptionHighlightSelectedBgColor: $color8;
$multiselectOptionHighlightSelectedColor: $color9;
$multiselectDisabledBgColor: darken($color1, 7%);
$multiselectDisabledColor: darken($color1, 35%);
$multiselectDisabledOptionBgColor: darken($color2, 3%);

$multiselectTagIcon: "\00D7";
$multiselectTagsBorderRadius: 2px;

.multiselect__spinner {
  position: absolute;
  right: 1px;
  top: 1px;
  width: 3rem;
  height: 2.1875rem;
  background: $spinnerBg;
  display: block;

  &:before,
  &:after {
    position: absolute;
    content: '';
    top: 50%;
    left: 50%;
    margin: 0.875rem 0 0 0.875rem;
    width: 1rem;
    height: 1rem;
    border-radius: 100%;
    border-color: $spinnerBorderColor transparent transparent;
    border-style: solid;
    border-width: 2px;
    box-shadow: 0 0 0 1px transparent;
  }
  &:before {
    animation: spinning 2.4s cubic-bezier(0.41, 0.26, 0.2, 0.62);
    animation-iteration-count: infinite;
  }
  &:after {
    animation: spinning 2.4s cubic-bezier(0.51, 0.09, 0.21, 0.8);
    animation-iteration-count: infinite;
  }
}
.multiselect__loading-transition {
  transition: opacity 0.4s ease-in-out;
  opacity: 1;
}
.multiselect__loading-enter,
.multiselect__loading-leave {
  opacity: 0;
}
.multiselect,
.multiselect__input,
.multiselect__single {
  font-family: inherit;
  font-size: 0.875rem;
  font-weight: lighter;
}
.multiselect {
  box-sizing: content-box;

  * {
    box-sizing: border-box;
  }

  display: block;
  position: relative;
  width: 100%;
  height: 50px;
  text-align: left;
  color: $multiselectColor;

  &:focus {
    outline: none;
  }

  &--active {
    z-index: 50;

    .multiselect__current,
    .multiselect__input,
    .multiselect__tags {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
    .multiselect__select {
      transform: rotateZ(180deg);
    }
  }
}
.multiselect__input,
.multiselect__single {
  position: relative;
  display: inline-block;
  min-height: 1.25rem;
  line-height: 1.25rem;
  border: none;
  border-radius: $multiselectTagsBorderRadius;
  background: $multiselectBg;
  padding: 1px 0 0 0.3125rem;
  width: auto;
  transition: border .1s ease;
  box-sizing: border-box;
  margin-bottom: 0.5rem;
  font-size: 16px;

  &:hover {
    border-color: $multiselectBorderColorHover;
  }

  &:focus {
    border-color: $multiselectBorderColorFocus;
    outline: none;
  }
}
.multiselect__single {
  padding-left: 0;
  margin-bottom: 0;
  line-height: 48px;
  height: 46px;
}
.multiselect__tags {
  // min-height: 50px;
  height: 50px;
  display: block;
  // padding: 0.75rem 3rem 0 0.75rem;
  padding: 0px 0px 0px 20px;
  box-sizing: border-box;
  border-radius: $multiselectTagsBorderRadius;
  border: $multiselectTagsBorder;
  background: $multiselectTagsBgColor;
}
.multiselect__tag {
  position: relative;
  display: inline-block;
  padding: 0.25rem 1.625rem 0.25rem 0.625rem;
  border-radius: $multiselectTagsBorderRadius;
  margin-right: 0.625rem;
  color: $multiselectTagColor;
  line-height: 1;
  background: $multiselectTagBgColor;
  margin-bottom: 0.5rem;
}
.multiselect__tag-icon {
  cursor: pointer;
  margin-left: 7px;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  font-weight: 700;
  font-style: initial;
  width: 1.375rem;
  text-align: center;
  line-height: 1.375rem;
  transition: all 0.2s ease;
  border-radius: $multiselectTagsBorderRadius;

  &:after {
    content: $multiselectTagIcon;
    color: $multiselectTagIconColor;
    font-size: 0.875rem;
  }
  &:focus, &:hover {
    background: $multiselectTagIconColorHover;

    &:after {
      color: $multiselectTagIconColorBgHover;
    }
  }
}
.multiselect__current {
  line-height: 1rem;
  min-height: 3rem;
  box-sizing: border-box;
  display: block;
  overflow: hidden;
  padding: 0.5rem 0.75rem 0;
  padding-right: 1.875rem;
  white-space: nowrap;
  margin: 0;
  text-decoration: none;
  border-radius: $multiselectTagsBorderRadius;
  border: 1px solid $multiselectCurrentBorderColor;
  cursor: pointer;
}
.multiselect__select {
  line-height: 1rem;
  display: block;
  position: absolute;
  box-sizing: border-box;
  width: 3rem;
  height: 50px;
  right: 1px;
  top: 1px;
  padding: 0.25rem 0.5rem;
  margin: 0;
  text-decoration: none;
  text-align: center;
  box-sizing: border-box;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:before {
    position: relative;
    width: 20px;
    height: 20px;
    right: 0;
    top: 26%;
    // margin-top: 0.55rem;
    display: inline-block;
    background-image: url('~assets/images/ic/ic_select_down_btn.png');
    background-position: center;
    background-size: contain;
    content: "";
  }
}
.multiselect__placeholder {
  color: $multiselectPlaceholderColor;
  display: inline-block;
  // margin-bottom: 0.625rem;
  // padding-top: 0.125rem;
  line-height: 50px;

  .multiselect--active & {
    display: none;
  }
}
.multiselect__content {
  position: absolute;
  list-style: none;
  display: block;
  background: $multiselectContentBgColor;
  width: 100%;
  max-height: 15rem;
  overflow: auto;
  padding: 0;
  margin: 0;
  border: 1px solid $multiselectContentBorderColor;
  border-top: none;
  border-bottom-left-radius: $multiselectTagsBorderRadius;
  border-bottom-right-radius: $multiselectTagsBorderRadius;
  z-index: 50;

  &::webkit-scrollbar {
    display: none;
  }
}
.multiselect__option {
  display: block;
  padding: 1rem;
  min-height: 3rem;
  line-height: 1rem;
  font-size: 16px;
  font-weight: 300;
  text-decoration: none;
  text-transform: none;
  // vertical-align: middle;
  position: relative;
  cursor: pointer;

  &:after {
    top: 0;
    right: 0;
    position: absolute;
    line-height: 3rem;
    padding-right: 0.75rem;
    padding-left: 1.25rem;
  }
  &--highlight {
    background: $multiselectOptionHighlightBgColor;
    outline: none;
    color: $multiselectOptionHighlightColor;

    &:after {
      content: attr(data-select);
      color: $multiselectOptionHighlightColor;
    }
  }
  &--selected {
    background: $multiselectOptionSelectedBgColor;
    color: $multiselectOptionSelectedColor;
    font-weight: lighter;

    &:after {
      content: attr(data-selected);
      font-weight: 300;
      color: darken($multiselectOptionSelectedBgColor, 20%);
    }
  }
}
.multiselect__option--selected.multiselect__option--highlight {
  background: $multiselectOptionHighlightSelectedBgColor;
  color: $multiselectOptionHighlightSelectedColor;
  font-weight: lighter;

  &:after {
    content: attr(data-deselect);
    color: $multiselectOptionHighlightSelectedColor;
  }
}
.multiselect--disabled {
  background: $multiselectDisabledBgColor;
  border: none;
  pointer-events: none;
  .multiselect__tags {
    border: solid 1px #dedee0;
  }
  .multiselect__placeholder,
  .multiselect__current,
  .multiselect__select {
    // background: $multiselectDisabledBgColor;
    color: $multiselectDisabledColor;
  }
}
.multiselect__option--disabled {
  background: $multiselectDisabledBgColor;
  color: $multiselectDisabledColor;
  cursor: text;
  pointer-events: none;

  &:visited {
    color: $multiselectDisabledColor;
  }

  &:hover,
  &:focus {
    background: $multiselectDisabledOptionBgColor;
  }
}
.multiselect-transition {
  transition: all .3s ease;
}
.multiselect-enter, .multiselect-leave {
  opacity: 0;
  max-height: 0 !important;
}

.mobile {
  .multiselect {
    height: 42px;
  }
  .multiselect__single {
    line-height: 42px;
    height: 40px;
  }
  .multiselect__tags {
    height: 42px;
  }
  .multiselect__select {
    height: 42px;
  }
  .multiselect__option {
    min-height: 2.625rem;
    padding: 0.5rem;
    line-height: 1.625rem;
  }
  .multiselect__placeholder {
    line-height: 42px;
  }
}

</style>
