'use strict'
// const path = require('path')
// const resolve = dir => path.join(__dirname, dir)

module.exports = {
  // 配置打包时的相对路径
  publicPath: '/framework/',

  devServer: {
    port: '8080', // 代理端口 8080
    open: false, // 项目启动时是否自动打开浏览器，我这里设置为false,不打开，true表示打开
    proxy: {
      // '/user-api': { // 代理api
      //   target: 'http://42.48.104.46:15016', // 服务器api地址
      //   changeOrigin: true, // 是否跨域
      //   // ws: true // proxy websockets
      //   pathRewrite: { // 重写路径
      //     '^/user-api': '/mock/7/user-api'
      //   }
      // }
      '/user-api': {
        target: 'http://42.48.104.46:15012', // 服务器api地址
        changeOrigin: true // 是否跨域
      }
    }
  },
  configureWebpack: config => {
    config.externals = {
      'vue': 'Vue',
      'vuex': 'Vuex',
      'axios': 'axios'
    }
  },
  productionSourceMap: false,
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/assets/style/common.scss";
        `
      }
    }
  }
}
