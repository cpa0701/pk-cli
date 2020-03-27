const User = () => import(/* webpackChunkName: 'user' */ '../views/user/index/user.vue')

export default {
  base: '/',
  routes: [
    {
      path: '/user/index',
      name: 'user/index',
      component: User,
      meta: {
        requireLogin: true
      }
    }
  ]
}
