import { createStore } from 'vuex'

export default createStore({
  state: {
    userID: ''
  },
  getters: {
  },
  mutations: {
    setUserID(context, userID) {
      context.userID = userID
    }
  },
  actions: {
  },
  modules: {
  }
})
