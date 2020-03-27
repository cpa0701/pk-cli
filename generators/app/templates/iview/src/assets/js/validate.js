export const validate = {
  regexp: {
    mobile: /^(1[3456789]\d{9})$/,
    password: /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{8,32}$/, // 8-32位字母和数字
    nickName: /^[a-zA-Z0-9\u4E00-\u9FA5]{2,16}$/, // 英文，数字，中文
    verifyCode: /^\d{6}$/, // 短信验证码
    mail: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/ // 邮箱
  },
  validateInfo: '',
  // 手机号
  mobile(value) {
    if (this.regexp.mobile.test(value)) {
      return true
    } else {
      this.validateInfo = '请填写正确的手机号'
      return false
    }
  },
  // 密码
  password(value) {
    if (this.regexp.password.test(value)) {
      return true
    } else {
      this.validateInfo = '8~32位密码，包含两种及以上大、小写字母、数字或符号'
      return false
    }
  },
  nickName(value) {
    if (this.regexp.nickName.test(value)) {
      return true
    } else {
      this.validateInfo = '请填写正确的昵称,由2-16位中文、字母或数字组成'
      return false
    }
  },
  verifyCode(value) {
    if (this.regexp.verifyCode.test(value)) {
      return true
    } else {
      this.validateInfo = '请填写正确的短信验证码'
      return false
    }
  },
  mail(value) {
    if (this.regexp.mail.test(value)) {
      return true
    } else {
      this.validateInfo = '请填写正确的邮箱'
      return false
    }
  }
}
