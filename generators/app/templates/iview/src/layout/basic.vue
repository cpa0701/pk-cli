<template>
  <div class="layout greatwall-layout">
    <Header />
    <Layout id="greatwall-main" class="greatwall-main">
      <Sider
        ref="side"
        v-model="isCollapsed"
        collapsible
        hide-trigger
        collapsed-width="55"
        width="196"
        class="index-sider"
      >
        <div v-show="!isCollapsed">
          <div class="search-box">
            <Input v-model="searchMenu" search placeholder="搜索菜单" clearable />
            <!-- <img src="./../assets/images/menu/search.png" alt="" width="25" @click="search"> -->
          </div>
          <Menu
            v-if="hasMenu"
            ref="menus"
            :active-name="activeName"
            :open-names="openNames"
            theme="light"
            width="auto"
            class="menu-item"
          >
            <template v-for="(item,index) in menuList">
              <side-menu v-if="item.children&&item.children.length" :key="index" :parent-item="item" />
              <menu-item v-else :key="index" :to="item.url" :name="item.url">
                <img v-if="item.src" :src="item.src" alt="" width="20">
                <Icon v-else-if="item.icon" :type="item.icon" />
                <span>{{ item.name }}</span>
              </menu-item>
            </template>
          </Menu>
          <div v-else class="no-menu">
            <img src="./../assets/images/menu/no-menu.png" alt="" width="55">
            <p>找不到对应的菜单</p>
          </div>
        </div>
        <div v-show="isCollapsed" class="collapsed-menu">
          <template v-for="(item,index) in menuList">
            <collapsed-menu
              v-if="item.children&&item.children.length"
              :key="index"
              :active-name="activeName"
              :parent-url="parentUrl"
              :menu-obj="item"
            />
            <router-link
              v-else
              :key="item.url"
              class="drop-menu-a"
              :to="item.url"
              :class="item.url===parentUrl?'activeMenu':''"
            >
              <Icon v-if="item.icon" :type="item.icon" />
            </router-link>
          </template>
        </div>
        <div slot="trigger" class="index-collapse" :style="{'width':isCollapsed?'54px':'195px'}" @click="collapsedSider">
          <span v-if="isCollapsed">
            <Icon type="ios-arrow-forward" />
            <Icon type="ios-arrow-forward" />
          </span>
          <span v-else>
            <i class="sider-name">菜单管理</i>
            <Icon type="ios-arrow-back" />
            <Icon type="ios-arrow-back" />
          </span>
        </div>
      </Sider>
      <Layout>
        <Content>
          <Card class="card-container">
            <Breadcrumb>
              <BreadcrumbItem v-for="(item,index) in currentMenu" :key="index">{{ item }}</BreadcrumbItem>
            </Breadcrumb>
            <div class="pk-content">
              <router-view />
            </div>
          </Card>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>
<script>
import Header from '@/components/menu/header.vue'
import CollapsedMenu from '@/components/menu/collapsed-menu.vue'
import SideMenu from '@/components/menu/side-menu.vue'

export default {
  components: {
    Header,
    CollapsedMenu,
    SideMenu
  },
  data() {
    return {
      isCollapsed: false,
      allMenuList: [
        {
          name: '用户管理',
          src: require('./../assets/images/menu/icon3.png'),
          url: '/user',
          children: [
            { name: '用户管理', url: '/user/index' }
          ]
        }
      ],
      activeName: this.$route.path,
      searchMenu: ''
    }
  },
  computed: {
    openNames() { // 根据路由计算出要打开的菜单list
      const currentPath = this.$route.path
      const openNames = []
      const countList = currentPath.split('/')// 由斜杠切出数组
      if (countList.length > 2) { // 大于2则有子菜单
        countList.forEach((c) => {
          if (c) {
            if (openNames.length === 0) {
              openNames.push('/' + c)
            } else {
              openNames.push(openNames[openNames.length - 1] + '/' + c)
            }
          }
        })
      }
      return openNames
    },
    parentUrl() {
      return '/' + this.$route.path.split('/')[1]
    },
    currentMenu() {
      const currentPath = this.$route.path
      const currentMenu = []
      this.allMenuList.map((item) => {
        if (item.url === currentPath) {
          currentMenu.push(item.name)
        } else if (item.children && item.children.length) {
          item.children.map((child) => {
            if (currentPath === child.url) {
              currentMenu.push(item.name)
              currentMenu.push(child.name)
            }
          })
        }
      })
      return currentMenu
    },
    menuList() {
      if (!this.searchMenu) {
        this.$nextTick(() => {
          this.$refs.menus.updateOpened()
          this.$refs.menus.updateActiveName()
        })
        return this.allMenuList
      }
      const listArr = []
      this.allMenuList.map((item) => {
        if (item.name.indexOf(this.searchMenu) > -1) {
          listArr.push(item)
        } else if (item.children && item.children.length) {
          item.children.map((child) => {
            if (child.name.indexOf(this.searchMenu) > -1) {
              listArr.push(item)
            }
          })
        }
      })
      const curMenuList = [...new Set(listArr)]
      this.$nextTick(() => {
        this.$refs.menus.updateOpened()
        this.$refs.menus.updateActiveName()
      })
      return curMenuList
    },
    hasMenu() {
      if (this.menuList.length) {
        return true
      } else {
        return false
      }
    }
  },
  watch: {
    '$route'() {
      this.activeName = this.$route.path
    }
  },
  methods: {
    // 触发side切换
    collapsedSider() {
      this.isCollapsed = !this.isCollapsed
      this.$refs.side.toggleCollapse()
    }
  }
}
</script>
<style lang="scss">
  .greatwall-layout {
    height: 100%;

    .greatwall-main {
      overflow-y: auto;
      // height: calc(~"100% - 50px");
      height: calc(100% - 50px);
    }

    .ivu-layout {
      background-color: #fff;
    }

    .ivu-card-bordered {
      border: none;
    }

    .ivu-layout-sider-children {
      overflow-y: auto;
      overflow-x: hidden;
    }

    .search-box {
      position: relative;
      margin: 0 10px;
      input{
        width: 100%;
        color: $pk-mainText;
        font-size: 12px;
        background-color: #fff;
        border-left: none;
        border-right: none;
        border-top: none;
        border-radius: 0;
        height: 39px;
        line-height: 39px;
        outline: none;
      }
      .ivu-input-icon{
        font-size: 24px;
        top: 4px;
      }
      img{
        position: absolute;
        right: 0;
        top: 4px;
        cursor: pointer;
      }
    }

    .no-menu {
      background: #F2F4F5;
      margin: 15px 10px;
      padding: 12px 0 20px;

      img {
        display: block;
        margin: 0 auto;
      }

      p {
        font-size: 14px;
        text-align: center;
        line-height: 20px;
        color: $pk-lightenText;
        margin-top: 8px;
      }
    }

    .index-sider {
      background: #fff;
      height: 100%;
      padding-bottom: 40px;
      overflow-y: auto;
      position: static;
      border-right: 1px solid $pk-lineNormal;
      z-index: 2;
      // box-shadow:0px 2px 10px 5px rgba(87,100,165,0.12);
      .index-collapse {
        font-size: 14px;
        text-align: center;
        height: 40px;
        background: $pk-bacNormal;
        position: fixed;
        bottom: 0;
        cursor: pointer;
        color: #fff;
        z-index: 1000;
        line-height: 20px;

        span {
          color: $pk-mainText;
          line-height: 40px;

          .ivu-icon {
            color: #6F6F6F;
            font-size: 16px;
          }

          > i:last-child {
            margin-left: -8px;
          }
        }

        .sider-name {
          font-size: 14px;
          margin: 0 47px 0 47px;
        }
      }
    }

    .card-container {
      height: 100%;

      .ivu-card-body {
        display: flex;
        flex-direction: column;
        height: 100%;
        padding: 0;

        .pk-content {
          display: flex;
          flex: 1;
          flex-direction: column;
          height: calc(100% - 40px);

          /deep/ .ivu-tabs{
            display: flex;
            flex: 1;
            flex-direction: column;
            .ivu-tabs-content {
              height: calc(100% - 36px);
            }
          }

          .table-container {
            overflow: hidden;
            display: flex;
            height: 100%;
            flex-direction: column;
            padding: 0 8px 0;

          }
        }
      }
    }
  }
</style>
