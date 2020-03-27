<template>
  <div class="login-box">
    <p class="password-title">忘记密码</p>
    <PkInput
      ref="mobile"
      v-model="mobile"
      v-focus
      name="mobile"
      placeholder="请输入手机号码"
      maxlength="11"
      autofocus
      @keyup="onKeyup"
      @keydown.enter.native="nextFocus('verifyCode')"
    />
    <div class="pk-password-sms">
      <PkInput
        ref="verifyCode"
        v-model="verifyCode"
        name="verifyCode"
        placeholder="请输入验证码"
        maxlength="6"
        @keydown.enter.native="nextFocus('password')"
      />
      <Sendms
        ref="sendms"
        @getSms="getSms"
      />
    </div>
    <PkInput
      ref="password"
      v-model="password"
      name="password"
      type="password"
      placeholder="请输入密码，6-32位字母和数字的组合"
      maxlength="32"
      @keydown.enter.native="isSure"
    />
    <p class="pk-error-mess">{{ errorMess }}</p>
    <a href="javascript:" class="common-password-btn" @click="isSure">确定</a>
  </div>
</template>
<script>
import PkInput from '@/components/common/pk-input'
import Sendms from '@/components/common/sendms'
import { validate } from '@/assets/js/validate'
import { API_USER } from '@/api/api'
export default {
  components: {
    Sendms,
    PkInput
  },
  data() {
    return {
      mobile: '',
      nickName: '',
      verifyCode: '',
      password: '',
      errorMess: ''
    }
  },
  methods: {
    onKeyup() {
      this.$refs.mobile.value = this.$refs.mobile.value.replace(/\D/g, '')
    },
    nextFocus(dom) {
      this.$refs[dom].$el.focus()
    },
    getSms() {
      if ('classList' in document.documentElement) {
        const inputs = document.getElementsByClassName('common-input')
        for (let i = 0; i < 1; i++) {
          inputs[i].classList.remove('error-input')
        }
      }
      const eleList = document.querySelectorAll('[vail-type]')
      for (let i = 0; i < 1; i++) {
        const name = eleList[i].getAttribute('name')
        if (eleList[i].getAttribute('vail-type') === 'vail') { // 通过validate校验
          if (!validate[name](this.$refs[name].value)) {
            if ('classList' in document.documentElement) {
              this.$refs[name].$el.classList.add('error-input')
            }
            this.errorMess = validate.validateInfo
            return false
          }
        }
      }
      const url = API_USER.genCheckCode
      const params = {
        mobile: this.$refs.mobile.value,
        checkType: 1
      }
      this.$post(url, params).then(res => {
        this.$refs.sendms.start()
      }).catch(err => {
        this.$refs.sendms.reset()
        this.errorMess = err.message
        console.error(err)
      })
    },
    isSure() {
      this.errorMess = ''
      if ('classList' in document.documentElement) {
        const inputs = document.getElementsByClassName('common-input')
        for (let i = 0; i < inputs.length; i++) {
          inputs[i].classList.remove('error-input')
        }
      }
      const eleList = document.querySelectorAll('[vail-type]')
      for (let i = 0; i < eleList.length; i++) {
        const name = eleList[i].getAttribute('name')
        if (eleList[i].getAttribute('vail-type') === 'vail') { // 通过validate校验
          if (!validate[name](this.$refs[name].value)) {
            if ('classList' in document.documentElement) {
              this.$refs[name].$el.classList.add('error-input')
            }
            this.errorMess = validate.validateInfo
            return false
          }
        }
      }
      const url = API_USER.resetPassword
      const params = {
        mobile: this.$refs.mobile.value,
        verificationCode: this.$refs.verifyCode.value,
        password: this.$refs.password.value
      }
      this.$post(url, params).then(res => {
        this.$store.dispatch('user/logout', true)
        this.$router.push({ path: '/success' })
      }).catch(err => {
        this.errorMess = err.message
        console.error(err)
      })
    }
  }
}
</script>
