<template>
  <span :class="isGray ? 'gray-btn' : ''" @click="send">
    {{ lable }}
  </span>
</template>
<script>
import { setTimeout } from 'timers'
export default {
  data() {
    return {
      lable: '发送验证码',
      time: 0,
      timer: null
    }
  },
  computed: {
    isGray() {
      return this.time > 0
    }
  },
  beforeDestroy() {
    if (this.timer) {
      clearTimeout(this.timer)
    }
  },
  methods: {
    send() {
      !this.isGray && this.$emit('getSms', false)
    },
    start(val) {
      this.time = val || 60
      this.lable = `${this.time}s`
      this.handlerTimer()
    },
    handlerTimer() {
      this.timer = setTimeout(() => {
        this.time--
        if (this.time <= 0) {
          this.reset()
        } else {
          this.lable = `${this.time}s`
          this.handlerTimer()
        }
      }, 1000)
    },
    reset() {
      this.time = 0
      this.lable = '重新发送'
      clearTimeout(this.timer)
    }
  }
}
</script>
