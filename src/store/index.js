import Vue from 'vue'
import Vuex from 'vuex'
import {
  login,
  places
} from "@/modules"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    login({ commit }, data) {
      return new Promise((resolve, reject) => {
        login(data).then(response => {
          if(response) {
            console.log("response login", response)
            resolve(response)
          }
        }).catch(error => {
          reject(error)
        })
      })
    }
  },
  modules: {
  }
})
