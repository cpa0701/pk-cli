/**
 * Create by chenpengan on 2019/7/2
 */
import { API_USER } from '@/api/api'
import { post } from '@/request/http'
import constant from '@/assets/constant'
const state = {
  isLogin: false, // 是否登录
  token: '',
  userInfo: { // 用户信息
    nickName: '',
    avatar: ''
  },
  skin: 'green' // 用户皮肤
}
const mutations = {
  SET_IS_LOGIN(state, isLogin) {
    state.isLogin = isLogin
  },
  SET_TOKEN(state, token) {
    state.token = token
  },
  SET_SKIN(state, skin) {
    state.skin = skin
  },
  SET_USER_INFO(state, userInfo) {
    state.userInfo = userInfo
  }
}
const actions = {
  login({ commit }, params) {
    return new Promise((resolve, reject) => {
      const url = API_USER.login
      post(url, params, { noLoading: true }).then(res => {
        commit('SET_IS_LOGIN', true)
        commit('SET_USER_INFO', res.data)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  logout({ commit }, isExpire) {
    commit('SET_IS_LOGIN', false)
    localStorage.clear()
    const url = API_USER.logout
    const data = {
      t: Math.random()
    }
    if (!isExpire) {
      post(url, data).then(res => {
        commit('SET_IS_LOGIN', false)
        localStorage.clear()
      }).catch(err => {
        console.error(err)
      })
    }
  },
  updateUserInfo({ commit, state }) {
    if (!state.isLogin) {
      return
    }
    const url = API_USER.myselfInfo
    const params = {
      t: Math.random()
    }
    post(url, params).then(res => {
      commit('SET_USER_INFO', res.data)
    }).catch(err => {
      console.error(err)
    })
  },
  refreshUserFromDisk({ commit }) {
    try {
      const localStorageStr = localStorage.getItem(constant['COMMON|LOCAL_STORAGE'].base)
      // console.log(localStorageStr)
      if (localStorageStr == null) {
        return
      }
      const localStorageObj = JSON.parse(localStorageStr)
      commit('SET_USER_INFO', localStorageObj.user.userInfo)
      commit('SET_IS_LOGIN', localStorageObj.user.isLogin)
    } catch (e) {
      console.warn('加载localStorage失败')
    }
  }
}
export default {
  namespaced: true,
  state, mutations, actions
}
