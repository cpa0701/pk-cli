<template>
  <div class="pk-password">
    <div class="password-nav">
      <div class="pk-container clear">
        <img src="../assets/images/password/logo.png" alt="" width="30">
        <p class="pk-header-name">{{ $constant['COMMON|HEADERNAME'].main }} <span class="font16px">{{ $constant['COMMON|HEADERNAME'].minor }}</span></p>
        <router-link to="/login">登陆</router-link>
      </div>
    </div>
    <div class="main-bac">
      <div class="password-box">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {
  }
}
</script>
