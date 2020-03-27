<template>
  <div class="login-box">
    <p class="password-title">账号登录</p>
    <PkInput
      ref="mobile"
      v-model="mobile"
      v-focus
      name="mobile"
      placeholder="请输入手机号码"
      maxlength="11"
      autofocus
      @keyup="keyup"
      @keydown.enter.native="nextFocus"
    />
    <PkInput
      ref="password"
      v-model="password"
      name="password"
      type="password"
      placeholder="请输入密码"
      maxlength="32"
      @keydown.enter.native="login"
    />
    <p class="pk-error-mess">{{ errorMess }}</p>
    <a href="javascript:" class="common-password-btn" @click="login">登录</a>
    <div class="password-bottom right">
      <router-link to="/forgetPassword">忘记密码</router-link>
    </div>
    <div v-if="showLoading" class="login-spin-col">
      <Spin fix>
        <Icon type="ios-loading" size="68" class="login-spin-icon-load"></Icon>
        <div>正在加载中</div>
      </Spin>
    </div>
  </div>
</template>
<script>
import PkInput from '@/components/common/pk-input'
import { validate } from '@/assets/js/validate'

export default {
  components: {
    PkInput
  },
  data() {
    return {
      mobile: '',
      password: '',
      errorMess: '',
      showLoading: false
    }
  },
  mouted() {
    this.resetLogin()
  },
  methods: {
    resetLogin() {
      if (this.$store.state.user.isLogin) {
        this.$store.dispatch('user/logout', true)
      }
    },
    keyup() {
      this.$refs.mobile.value = this.$refs.mobile.value.replace(/\D/g, '')
    },
    nextFocus() {
      this.$refs.password.$el.focus()
    },
    login() {
      this.errorMess = ''
      if ('classList' in document.documentElement) {
        const inputs = document.getElementsByClassName('common-input')
        for (let j = 0; j < inputs.length; j++) {
          inputs[j].classList.remove('error-input')
        }
      }
      const eleList = document.querySelectorAll('[vail-type]')
      for (let i = 0; i < eleList.length; i++) {
        const name = eleList[i].getAttribute('name')
        if (eleList[i].getAttribute('vail-type') === 'vail') { // 通过validate校验
          if (!validate[name](this.$refs[name].value)) {
            this.errorMess = validate.validateInfo
            if ('classList' in document.documentElement) {
              this.$refs[name].$el.classList.add('error-input')
            }
            return false
          }
        }
      }
      const params = {
        mobile: this.$refs.mobile.value,
        password: this.$refs.password.value,
        userType: this.$constant['USER|TYPE'].framework
      }
      this.showLoading = true
      this.$store.dispatch('user/login', params).then(() => {
        this.showLoading = false
        this.$nextTick(() => {
          const ways = (this.$route.query && this.$route.query.referrer) || '/user/index'
          this.$router.push({ path: ways })
        })
      }).catch(err => {
        this.showLoading = false
        console.error(err)
        this.errorMess = err.message
      })
    }
  }
}
</script>
<style lang="scss">
  .login-spin-icon-load {
    animation: ani-login-spin 1s linear infinite;
  }

  @keyframes ani-login-spin {
    from {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(180deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .login-spin-col {
    position: fixed;
    top: 50%;
    height: 331px;
    width: 378px;
    left: 50%;
    transform: translate(-50%, -50%);

    .ivu-spin {

      .ivu-spin-fix .ivu-spin-main {
        transform: translate(-50%, -65%);

      }

      > div {
        font-size: 24px;
      }
    }
  }
</style>
