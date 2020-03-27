/**
 * Create by chenpengan on 2019/9/12
 */
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  resolve: {
    alias: {
      '@': resolve('src'),
      '_c': resolve('src/components')
    }
  }
}
