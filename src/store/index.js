import Vue from 'vue'
import Vuex from 'vuex'
import {
  login,
  places
} from "@/modules"
Vue.use(Vuex)

import * as constants from "@/mixins/constants.js"

import { setCookie, getCookie } from "@/utils.js"

export default new Vuex.Store({
  state: {
    token: null,
    expireTokenDate: null
  },
  mutations: {
  },
  actions: {
    login({ state }, data) {
      return new Promise((resolve, reject) => {
        login(data).then(response => {
          if(response && response.accessToken) {
            state.token = response.accessToken
            state.expireTokenDate = response.expirationDate

            setCookie(constants.COOKIE_NAME__TOKEN, state.token , 7)
            setCookie(constants.COOKIE_NAME__EXPIRE_TOKEN_DATE, state.expireTokenDate, 7)

            resolve(response)
          }

          if(response && response.errorCode) {
            reject(response)
          }

        }).catch(error => {
          reject(error)
        })
      })
    },

    places({ state }) {
      const token = state.token || getCookie('token')
      return new Promise((resolve, reject) => {
        places(token).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  },
  modules: {
  }
})
