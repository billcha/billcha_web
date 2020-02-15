export default {
  rootTest: 'vuex state',
  error: null,
  loading: {
    isShow: false
  },
  isMobile: false,
  // isMobile: {
  //   status: false
  // },
  accessToken: null,
  userInfo: {
    name: null,
    email: null,
    id: null,
    roles: null,
    favoriteBillboard: [],
    issuedBillingKeyCards: null,
    phoneNumber: null,
    affiliationAndPosition: null,
    isAcceptMarketingEmail: null
  },
  footerShow: true,
  rootScrollHide: false,
  showSlideDim: false,
  openGlobalAlert: { open: false },
  menuActive: ''
}
