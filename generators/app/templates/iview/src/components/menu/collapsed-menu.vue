<template>
  <div>
    <div :class="(menuObj.url===activeName||menuObj.url===parentUrl)?'activeMenu menu-small-left':'menu-small-left'">
      <div v-if="menuObj.src || menuObj.icon">
        <img v-if="menuObj.src" :src="menuObj.src" alt="" width="22">
        <Icon v-else :type="menuObj.icon" />
      </div>
      <router-link v-else :to="menuObj.url">
        {{ menuObj.name }}
        <Icon type="ios-arrow-forward" class="collapsed-menu-right-arrow" />
      </router-link>
      <div class="menu-small-right">
        <div class="menu-right-top">
          <img v-if="menuObj.src" :src="menuObj.src" alt="" width="20">
          <Icon v-else :type="menuObj.icon" />
          <span>{{ menuObj.name }}</span>
        </div>
        <template v-for="(item) in menuObj.children">
          <collapsed-menu v-if="item.children&&item.children.length" :key="item.url" :active-name="activeName" :menu-obj="item" />
          <div v-else :key="item.url" :class="item.url===activeName?'menu-right-list activeMenu':'menu-right-list'">
            <router-link :to="item.url">
              {{ item.name }}
            </router-link>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CollapsedMenu',
  props: {
    menuObj: {
      type: Object,
      default() {
        return {}
      }
    },
    activeName: {
      type: String,
      default() {
        return ''
      }
    },
    parentUrl: {
      type: String,
      default() {
        return ''
      }
    }
  },
  mounted() {
    // console.log(this.menuObj)
  }
}
</script>

<style scoped lang="scss">
  .menu-small-left{
    position: relative;
    width: 54px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    cursor: pointer;
    background-color: #fff;
    img{
      vertical-align: middle;
    }
    .ivu-icon{
      font-size: 22px;
    }
    &::before{
      content: "";
      display: block;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
    }
    .menu-small-right{
      display: none;
      position: fixed;
      top: 50px;
      left: 0;
      z-index: 4;
      height: 100%;
      width: 120px;
      background-color: #F3F3F3;
      box-shadow:2px 2px 6px 1px rgba(87,100,165,0.12);
      font-size: 14px;
      color: $pk-mainText;
      .menu-right-top{
        margin: 0 10px;
        border-bottom: 1px solid #E7EBF0;
        cursor: default;
        img{
          margin-right: 13px;
        }
        .ivu-icon{
          margin-right: 13px;
        }
      }
      a{
        color: $pk-mainText;
      }
    }
    &.activeMenu{
      background-color: rgba(11,186,110,0.08);
      &::before{
        width: 3px;
      }
    }
    &:hover{
      background-color: rgba(11,186,110,0.08);
      &::before{
        width: 3px;
      }
      .menu-small-right{
        display: block;
        left: 55px;
      }
    }
  }
  @keyframes menuMove{
    0%{
      left: 0;
      z-index: -111;
    }
    100%{
      left: 55px;
      z-index: 22;
    }
  }
</style>
