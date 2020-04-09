import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    getters:getters,
    user:user,
  }
})
