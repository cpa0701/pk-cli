import Vue from 'vue'
import iView from 'view-design'
import mavonEditor from 'mavon-editor'

import './assets/style/theme.scss'
import App from './App.vue'
import router from './router/index'
import store from './store'
import { get, post } from './request/http' // 导入api接口
import constant from '@/assets/constant'
import './icon/iconfont'
import IconSvg from '@/components/common/icon-svg'// 图标组件 不能动态加载否则会出现加载组件图标一开始没有的情况

// css
// import 'iview/dist/styles/common.scss'
import 'view-design/dist/styles/iview.css'
import '@/assets/style/theme.scss'
import '@/assets/style/main.scss'
import 'mavon-editor/dist/css/index.css'
Vue.use(iView)
Vue.use(mavonEditor)

Vue.config.productionTip = false

Vue.prototype.$post = post
Vue.prototype.$get = get
Vue.prototype.$constant = constant

Vue.component('icon-svg', IconSvg)

Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function(el) {
    // 聚焦元素
    el.focus()
  }
})

window.globalVue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
