const common = '/user-api'

const API = {
  list: `${common}/user/list` // 模板测试模块
}

// 用户模块
const API_USER = {
  login: `${common}/user/login`, // 登陆
  logout: `${common}/user/logout`, // 退出登陆
  myselfInfo: `${common}/user/myselfInfo`, // 用户信息
  genCheckCode: `${common}/user/genCheckCode`, // 发送短信验证码
  resetPassword: `${common}/user/resetPassword`, // 忘记密码
  list: `${common}/user/list`, // 获取用户数据
  update: `${common}/user/update` // 更新用户数据
}

export { API, API_USER }
