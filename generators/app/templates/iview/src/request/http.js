import axios from 'axios'
import { Message } from 'view-design'
import QS from 'qs'
import store from '@/store/index'
import router from '../router'
import constant from '@/assets/constant'

/**
 * 上次提示时间
 * @type {null}
 */
let lastTiptime = null

// 设置请求超时
axios.defaults.timeout = 100000
// post请求头设置
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'

// 请求request拦截器
axios.interceptors.request.use(
  config => {
    // 请求拦截器，调用loading插件
    // 显示loading
    // 判断是否重复提交请求，也就是loading是否还存在，如果存在则不显示新的loading
    // let isShow = window.app.$vux.loading.isVisible()
    // if (!isShow && config.showLoading) {
    //   window.app.$vux.loading.show({
    //     text: 'Loading'
    //   })
    // }
    // 每次发送请求之前判断vuex中是否存在token
    // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    // const token = store.state.user.token
    // token && (config.headers.Authorization = token)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

/**
 * 单次提示
 * @param type
 * @param message
 */
const singleTip = (type, message) => {
  const nowTime = new Date().getTime()
  if (lastTiptime == null || nowTime - lastTiptime > 2000) {
    lastTiptime = nowTime
    Message[type](message)
  } else {
    lastTiptime = nowTime
  }
}

/**
 * 跳转至登录
 */
const toLogin = () => {
  if (store.state.user.isLogin) {
    const nowRouter = router.history.current
    store.dispatch('user/logout', true)
    if (nowRouter.meta.requireLogin) {
      // store.commit('loginSuccess', null)
      // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
      window.globalVue.$router.push({
        path: '/login',
        query: { referrer: nowRouter.fullPath }
      })
      Message.error('登录超时，请重新登录')
    }
  }
}
// 响应response拦截器
axios.interceptors.response.use(
  response => {
    store.commit('common/SET_IS_SHOW_LOADING', false)
    // window.app.$vux.loading.hide()
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (response.data.code === constant['COMMON|CODE'].success) {
      return Promise.resolve(response)
    }
    errorHandler(response)
    return Promise.reject(response)
  },
  // 服务器状态码不是2开头的的情况
  // 可以跟后台开发人员协商好统一的错误状态码
  // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
  error => {
    store.commit('common/SET_IS_SHOW_LOADING', false)
    singleTip('error', '系统繁忙，请稍后再试')
    console.warn(error)
  }
)

const errorHandler = (response) => {
  const data = response.data
  // const tipType = data.tipType == null ? 'error' : data.tipType
  // const message = data.message == null ? '系统繁忙，请稍后再试' : data.message
  switch (data.code) {
    // 登录过期
    case constant['COMMON|CODE'].expire:
      toLogin()
      break
    default:
    // 这里可以做全局提示 暂时屏蔽 这块还没考虑好
    // Message[tipType](message)
  }
}
/**
 * 显示加载
 * @param config 加载配置
 * @param noLoading 是否不显示Loading
 * @param loadingOptions loading配置
 * @param isShowLoading: false, // 是否展示等待框
 * @param loadingText: '正在加载中', // 加载文字
 * @param iconClass: 默认'pk-huluobu' // 加载图片
 */
const showLoading = (config) => {
  if (config) {
    if (!config.noLoading) {
      if (config.loadingOptions) {
        store.commit('common/SET_IS_SHOW_LOADING', config.loadingOptions)
      } else {
        store.commit('common/SET_IS_SHOW_LOADING', true)
      }
    }
  } else {
    store.commit('common/SET_IS_SHOW_LOADING', true)
  }
}
//  get方法，对应get请求
//  @param {String} url [请求的url地址]
//  @param {Object} params [请求时携带的参数]
//  @param {Object} config [请求时携带的配置项]
export function get(url, params, config) {
  return new Promise((resolve, reject) => {
    showLoading(config)
    axios.get(url, { params: params }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}

//  post方法，对应post请求
//  @param {String} url [请求的url地址]
//  @param {Object} params [请求时携带的参数]
//  @param {Object} config [请求时携带的配置项]
export function post(url, params, config) {
  return new Promise((resolve, reject) => {
    showLoading(config)
    axios.post(url, QS.stringify(params)).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}

export function postFile(url, params, config) {
  return new Promise((resolve, reject) => {
    showLoading(config)
    axios.post(url, params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}
