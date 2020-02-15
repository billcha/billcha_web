<style lang="css">
</style>
<script>
import Vue from 'vue'

// Random guid 생성
let getNewGUID = function () {
  function s4 () {
    return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1)
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
}
// LoadingPanel 컴포넌트 정의
let LoadingPanelTemplate = {
  template: '<div class="common-loading-panel" v-if="isShow" v-bind:class="{\'body-panel\': body, \'dropdown-panel\': dropdown, \'image-only\': imageOnly}" @click.stop>' +
  '<div class="common-loading-panel-container">' +
  '<div class="common-loading-panel-inner">' +
  '<div class="common-loading-panel-image"></div>' +
  '<div class="common-loading-panel-text">{{ text }}</div>' +
  '</div>' +
  '</div>' +
  '<div class="common-loading-panel-image-only"></div>' +
  '<div class="common-loading-panel-color"></div>' +
  '</div>'
}
let LoadingPanel = {
  install: function (vue) {
    let LoadingPanelConstructor = vue.extend(LoadingPanelTemplate)
    let loading = {} // 생성된 LoadingPanel 컴포넌트 관리

    // https://kr.vuejs.org/v2/guide/custom-directive.html 참조
    /*
  디렉티브
  훅 함수 : bind, inserted, update, componentUpdated, unbind
  훅 전달인자
  el : 디렉티브가 바인딩된 엘리먼트. DOM 조작에 사용
  binding
  binding.name : 디렉티브 이름, v- 전치사가 없음
  binding.value : 디렉티브에서 전달받은 값
  binding.oldValue : 이전값
  binding.expression : 표현식 문자열
  ex) v-my-directive="1 + 1" => value = 2, expression = "1 + 1"
  binding.arg : 디렉티브의 전달인자
  ex) v-my-directive:foo => arg = foo
  binding.modifiers : 포함된 수식어 객체
  vnode : Vue 컴파일러가 만든 버추얼노드
  oldVnode 이전의 버추얼 노드. update와 componentUpdated에서만 사용 가능
  * 훅 전달인자는 읽기 전용으로 사용 할 것
  */
    vue.directive('common-loading-panel', {
      // 디렉티브가 처음 엘리먼트에 바인딩 될 때 한번만 호출
      bind: function (el, binding) {
        let newId = getNewGUID()
        let value, text
        let elem = null
        if (!el.dataset) {
          el.dataset = {}
        }
        if (!loading[newId]) {
          // 새 LoadingPanel 컴포넌트 생성
          value = binding.value.isShow || binding.value
          text = binding.value.text || '잠시만 기다려주세요.'
          loading[newId] = new LoadingPanelConstructor({
            el: document.createElement('div'),
            data: function () {
              return {
                isShow: value,
                body: binding.modifiers.body || false,
                dropdown: binding.modifiers.dropdown || false,
                imageOnly: binding.modifiers.imageonly || false,
                text: text
              }
            }
          })
          el.dataset.loadingId = newId
        }
        if (binding.modifiers.body) {
          document.body.appendChild(loading[newId].$el) // .body 옵션일 경우 body에 생성
        } else if (binding.modifiers.dropdown) {
          elem = el.querySelector('.common-dropdown-wrapper')
          if (!elem) {
            elem = el
          }
          elem.prepend(loading[newId].$el)
        } else {
          el.appendChild(loading[newId].$el) // 디렉티브의 el에 로딩패널 append
        }
      },
      // 바인딩 된 엘리먼트가 부모 노드에 삽입 되었을 때 호출(부모 노드의 존재를 보장, 반드시 document 내에 있는 것은 아님)
      inserted: function () {},
      // 포함하는 컴포넌트가 업데이트 된 후 호출(자식이 업데이트 되기 전일 가능성이 있다.) 바인딩의 현재 값과 이전 값을 비교하여 불필요한 업데이트를 건너 뛸 수 있음
      update: function (el, binding) {
        let target = el.dataset.loadingId
        loading[target].isShow = binding.value
      },
      // 포함하고 있는 컴포넌트와 그 자식들이 업데이트 된 후 호출
      componentUpdated: function () {},
      // 디렉티브가 엘리먼트로부터 언바인딩된 경우에만 한번 호출
      unbind: function (el, binding) {
        let target = binding.expression
        delete loading[target]
      }
    })
  }
}

Vue.use(LoadingPanel)
export default {}
</script>
