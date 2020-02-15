import Vue from 'vue'
import VeeValidate from 'vee-validate'
import ko from 'vee-validate/dist/locale/ko.js'

ko.messages.email = (field) => `올바른 ${field} 형식이 아닙니다.`
ko.messages.required = function (field) {
  if (field === '비밀번호') return `${field}는 필수 입력 항목입니다.`
  return `${field}은 필수 입력 항목입니다.`
}

Vue.use(VeeValidate, {
  locale: 'ko',
  dictionary: {
    ko
  }
})

export default VeeValidate
