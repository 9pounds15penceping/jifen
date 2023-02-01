import Vue from 'vue'
import Vuex from 'vuex'
import showLoginModal from './showLoginModal'
import showToast from './showToast'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    showLoginModal,showToast
  }
})
