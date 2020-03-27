
const Login = () => import(/* webpackChunkName: 'login' */'../views/user/password/login.vue')
const ForgetPassword = () => import(/* webpackChunkName: 'forget-password' */'../views/user/password/forget-password.vue') // 忘记密码

export default {
  base: '/',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/forgetPassword',
      name: 'forgetPassword',
      component: ForgetPassword
    }
  ]
}
