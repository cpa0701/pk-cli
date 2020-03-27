import Vue from 'vue'
import store from '../store'
import Home from '../layout/basic.vue'
import Password from '../layout/password.vue'
import Success from '../views/user/password/success.vue'
import Markdown from '../views/markdown.vue'
import UserPassword from './userPassword'
import iView from 'view-design'
/* 文件引入 */
const files = require.context('.', false, /\.js$/)
const routeList = []
files.keys().forEach(key => {
  if (key === './index.js' || key === './userPassword.js') return
  routeList.push({
    path: files(key).default.base,
    component: Home,
    children: files(key).default.routes
  })
})

Vue.use(VueRouter)

var routes = [
  {
    path: '',
    component: Home,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/success',
    component: Success
  },
  {
    path: UserPassword.base,
    component: Password,
    children: UserPassword.routes
  },
  {
    path: '/markdown',
    component: Markdown
  },
  ...routeList
]

const router = new VueRouter({
  routes: routes,
  mode: 'hash',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (!to.meta.noScroll) {
        return { x: 0, y: 0 }
      }
    }
  }
})
router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  store.dispatch('user/refreshUserFromDisk').then(() => {
    if (to.meta.requireLogin) { // 判断该路由是否需要登录权限
      if (store.state.user.isLogin === true) { // 判断本地是否存在
        next()
      } else {
        // 未登录,跳转到登陆页面，并且带上 将要去的地址，方便登陆后跳转。
        localStorage.clear()
        next({
          path: '/login',
          query: { referrer: to.fullPath }
        })
      }
    } else {
      next()
    }
  })
})
router.afterEach(() => {
  iView.LoadingBar.finish()
})

export default router
