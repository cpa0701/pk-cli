<template>
  <Submenu :name="parentItem.url">
    <template slot="title">
      <img v-if="parentItem.src" :src="parentItem.src" alt="" width="20">
      <Icon v-else :type="parentItem.icon" class="side-menu-icon" />
      <span>{{ parentItem.name }}</span>
    </template>
    <template v-for="menu in parentItem.children">
      <side-menu v-if="menu.children && menu.children.length" :key="menu.url" :parent-item="menu" />
      <menu-item v-else :key="menu.url" :to="menu.url" :name="menu.url">
        <span>{{ menu.name }}</span>
      </menu-item>
    </template>
  </Submenu>
</template>

<script>
export default {
  name: 'SideMenu',
  props: {
    parentItem: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style lang="scss">
  .greatwall-layout{
    .ivu-menu-vertical.ivu-menu-light:after {
      background: #fff;
    }
    .menu-item {
      > .ivu-menu-submenu { // 有子菜单
        .ivu-menu-submenu-title {
          line-height: 20px;
          padding: 10px 10px;
          img{
            vertical-align: middle;
            margin-right: 10px;
          }
          i{
            right: 10px;
            margin-right: 0;
          }
          i, span {
            color: $pk-mainText;
          }
          span{
            font-weight: 600;
          }
          .side-menu-icon{
            font-size: 20px;
            margin-right: 10px;
          }
        }
        .ivu-menu {
          .ivu-menu-item {
            padding: 10px 10px 10px 40px !important;
            span {
              color: $pk-mainText;
            }
          }
          .ivu-menu-item-active, .ivu-menu-item:hover {
            &:after {
              display: none;
            }
          }
          .ivu-menu-item-active {
            &:before {
              content: '';
              display: block;
              width: 10px;
              height: 10px;
              border-radius: 50%;
              border: 2px solid $pk-mainText;
              position: absolute;
              top: 16px;
              left: 15px;
              background: #FFFF00;
            }
          }
        }
      }
      > .ivu-menu-item { // 没有子菜单
        padding: 10px 16px 10px 10px;
        span {
          color: $pk-mainText;
          font-size: 14px;
          transition: width .2s ease .2s;
          vertical-align: middle;
        }

        img{
          margin-right: 10px;
          vertical-align: middle;
        }
      }
      .ivu-icon-ios-arrow-down:before{
        color: transparent;
        width: 17px;
        height: 10px;
        background: url('../../assets/images/menu/arrow.png');
        background-size: contain;
      }
    }
  }
</style>
