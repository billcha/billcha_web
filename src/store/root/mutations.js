import router from '@/router/index'

function _lockBody () {
  document.getElementsByTagName('html')[0].style.overflow = 'hidden'
  document.body.style.maxHeight = '100%'
  document.body.style.height = '100%'
  document.body.style.overflow = 'hidden'
  /* Disable scroll */
  window.$('html').on('scroll touchmove', function (e) {
    e.preventDefault()
    e.stopPropagation()
    return false
  })
  window.$('body').on('scroll touchmove', function (e) {
    e.preventDefault()
    e.stopPropagation()
    return false
  })
}

function _unlockBody () {
  document.getElementsByTagName('html')[0].style.overflow = ''
  document.body.style.maxHeight = ''
  document.body.style.height = ''
  document.body.style.overflow = ''
  window.$('html').off('scroll touchmove')
  window.$('body').off('scroll touchmove')
}

export function lockBody () {
  _lockBody()
}

export function unlockBody () {
  _unlockBody()
}

export function setRootTest (state, payload) {
  state.rootTest = payload
}

export function setIsMobile (state, payload) {
  this._vm.$set(state, 'isMobile', payload)
  // state.isMobile = payload
  // Vue.set(state.isMobile, 'status', payload)
}

export function setRootLoading (state, payload) {
  if (payload) _lockBody()
  else _unlockBody()
  state.loading.isShow = payload
}

export function setAccessToken (state, payload) {
  state.accessToken = payload
  this._vm.$cookies.remove('accessToken')
  this._vm.$cookies.set('accessToken', payload, null)
  this._vm.$axios.defaults.headers.Authorization = 'JWT ' + payload
}

export function setUserInfo (state, payload) {
  state.userInfo = {
    name: payload.name,
    email: payload.email,
    id: payload.id,
    favoriteBillboard: payload.favorite_billboards,
    issuedBillingKeyCards: payload.issued_billing_key_cards,
    phoneNumber: payload.phone_number,
    affiliationAndPosition: payload.affiliation_and_position,
    isAcceptMarketingEmail: payload.is_accept_marketing_email
  }
}

export function resetUserinfo (state, payload) {
  this._vm.$cookies.remove('accessToken')
  this._vm.$axios.defaults.headers.Authorization = ''
  state.accessToken = null
  state.userInfo = {
    email: null,
    id: null,
    favoriteBillboard: [],
    issuedBillingKeyCards: null,
    phoneNumber: null
  }
}

export function logout (state, payload) {
  this._vm.$cookies.remove('accessToken')
  this._vm.$axios.defaults.headers.Authorization = ''
  state.accessToken = null
  state.userInfo = {
    email: null,
    id: null,
    favoriteBillboard: [],
    issuedBillingKeyCards: null,
    phoneNumber: null
  }
  router.push('/')
}

export function setFooterShow (state, payload) {
  state.footerShow = payload
}

export function setRootScrollHide (state, payload) {
  state.rootScrollHide = payload
}

export function setApiError (state, payload) {
  state.error = payload
}

export function openGlobalAlert (state, payload) {
  state.openGlobalAlert = payload
}

export function setShowSlideDim (state, payload) {
  if (!payload) {
    setTimeout(() => {
      state.showSlideDim = payload
    }, 470)
  } else {
    state.showSlideDim = payload
  }
}

export function setMenuActive (state, payload) {
  state.menuActive = payload
}
