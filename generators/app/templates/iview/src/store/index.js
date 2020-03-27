import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'
import modules from './modules'
import getters from './getters'
import constant from '@/assets/constant'
Vue.use(Vuex)
const options = {
  modules,
  getters,
  plugins: [createPersistedState({
    key: constant['COMMON|LOCAL_STORAGE'].base
  })]
}
if (!isLocalStorageSupported()) {
  options.plugins = [
    createPersistedState({
      storage: {
        key: constant['COMMON|LOCAL_STORAGE'].base,
        getItem: key => Cookies.get(key),
        setItem: (key, value) => Cookies.set(key, value, { expires: 3, secure: true }),
        removeItem: key => Cookies.remove(key)
      }
    })
  ]
}

export default new Vuex.Store(options)

function isLocalStorageSupported() {
  const testKey = 'test'
  const storage = window.sessionStorage
  try {
    storage.setItem(testKey, 'testValue')
    storage.removeItem(testKey)
    return true
  } catch (error) {
    return false
  }
}
