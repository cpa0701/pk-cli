<template>
  <div class="pk-header clear">
    <div class="pk-logo left">
      <img class="left" src="../../assets/images/logo.png" width="24">
      <p class="pk-header-name">{{ $constant['COMMON|HEADERNAME'].main }} <span class="font16px">{{ $constant['COMMON|HEADERNAME'].minor }}</span></p>
    </div>
    <div class="handle-nav right">
      <Dropdown @on-click="changeSkin">
        <Icon type="ios-shirt-outline" size="26" />
        <DropdownMenu slot="list">
          <DropdownItem name="green"><i class="pk-header-circle" style="background: #00b0a0"></i>绿色</DropdownItem>
          <DropdownItem name="blue"><i class="pk-header-circle" style="background: #213F66"></i>蓝色</DropdownItem>
          <DropdownItem name="yellow"><i class="pk-header-circle" style="background: #ffb700"></i>黄色</DropdownItem>
          <DropdownItem name="red"><i class="pk-header-circle" style="background: #8D0077"></i>紫色</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Icon type="ios-expand" size="24" @click="fullScreen" />
      <Avatar :src="avatarImg" />
      <Dropdown class="user-dropdown" @on-click="handle">
        <span class="user-name">
          {{ userInfo.nickName }}
          <Icon type="ios-arrow-down"></Icon>
        </span>
        <DropdownMenu slot="list">
          <DropdownItem name="exit">退出登录</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { toggle } from '@/assets/js/fullScreen'
export default {
  name: 'Head',
  data() {
    return {
    }
  },
  computed: {
    ...mapState('user', [
      'userInfo'
    ]),
    avatarImg() {
      return this.userInfo.avatar ? this.userInfo.avatar : require('./../../assets/images/header/head.png')
    }
  },
  methods: {
    handle(name) {
      if (name === 'exit') {
        this.logout()
      }
    },
    logout() {
      this.$store.dispatch('user/logout').then(() => {
        this.$router.push({ name: 'login' })
      })
    },
    fullScreen() {
      toggle.toggleFullScreen()
    },
    changeSkin(name) {
      const body = document.getElementsByTagName('body')[0]
      this.$store.commit('user/SET_SKIN', name)
      body.removeAttribute('class')
      body.setAttribute('class', `${name}-skin`)
    }
  }
}
</script>
<style scoped lang="scss">
.pk-header{
  height: 50px;
  color: #fff;
  line-height: 50px;
  overflow: hidden;
  .pk-logo {
    margin-left: 20px;
    font-size: 16px;
    img {
      margin: 13px 10px 0 0;
    }
  }
  .pk-header-name{
    color: #fff;
    .password-solid{
      background: #fff;
    }
  }
  .ivu-icon-ios-shirt-outline{
    position: relative;
    top: 3px;
  }
  .handle-nav{
    display: flex;
    flex-direction: row;
    align-items: center;
    .ivu-icon{
      padding-right: 18px;
      cursor: pointer;
    }
    .ivu-icon-ios-expand{
      border-right: 1px solid #fff;
    }
    .ivu-avatar-image{
      margin-left: 20px;
    }
    .pk-header-circle{
      display: inline-block;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 3px solid $pk-lineNormal;
      vertical-align: middle;
      margin-right: 10px;
      position: relative;
      top: -2px;
    }
  }
  .user-name{
    cursor: pointer;
    font-size: 14px;
    .ivu-icon{
      font-size: 20px;
    }
  }
  .user-dropdown{
    margin: 0 20px;
  }
}
</style>
