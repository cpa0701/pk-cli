<template>
  <div class="pk-success pk-container">
    <img src="../../../assets/images/password/success-icon.png" alt="">
    <p>重置密码成功！</p>
    <span>请谨慎保管和记忆你的密码，以免泄露和丢失</span>
    <a href="javascript:" @click="goHome">立即跳转{{ time }}s…..</a>
  </div>
</template>
<script>
import { setTimeout } from 'timers'
export default {
  data() {
    return {
      time: 3,
      timer: null
    }
  },
  mounted() {
    this.$store.dispatch('user/logout')
    this.handleTimer()
  },
  beforeDestroy() {
    if (this.timer) {
      clearTimeout(this.timer)
    }
  },
  methods: {
    handleTimer() {
      this.timer = setTimeout(() => {
        this.time--
        if (this.time > 0) {
          this.handleTimer()
        } else {
          clearTimeout(this.timer)
          this.$router.push({ name: 'login' })
        }
      }, 1000)
    },
    goHome() {
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
<style lang="scss" scoped>
  .pk-success{
    text-align: center;
    color: $pk-mainText;
    img{
      display: block;
      margin: 0 auto;
      padding: 320px 0 20px;
    }
    p{
      font-weight: 600;
      font-size: 20px;
      line-height: 28px;
    }
    span{
      display: block;
      color: $pk-mainText;
      font-size: 16px;
      line-height: 22px;
      margin: 17px 0 46px;
    }
    a{
      font-size: 16px;
    }
  }
</style>
