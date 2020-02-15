export function actionRootTestNull ({ state }) {
  state.rootTest = null
}

export function validityCheckToken ({ state }) {
  let self = this
  this._vm.$axios.get('/api/v1/auth', {
  }).then(function (resp) {
    self.commit('setUserInfo', resp.data)
  }).catch(function (error) {
    console.log(error)
  })
}
