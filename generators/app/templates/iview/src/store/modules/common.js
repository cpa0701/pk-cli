/**
 * Create by chenpengan on 2019/7/2
 */
const state = {
  isShowLoading: false, // 是否展示等待框
  loadingText: '正在加载中', // 加载文字
  iconClass: 'pk-huluobu', // 加载图片
  sysDic: [] // 数据字典
}
const mutations = {
  SET_SYS_DIC(state, sysDic) {
    state.sysDic = sysDic
  },
  SET_IS_SHOW_LOADING(state, isShowLoading) {
    if (typeof isShowLoading === 'object') { // 对象则需要设置文字
      state.isShowLoading = isShowLoading.isShow
      state.loadingText = isShowLoading.text
      state.iconClass = isShowLoading.iconClass
    } else {
      state.isShowLoading = isShowLoading
      state.loadingText = '正在加载中'
      state.iconClass = 'pk-huluobu'
    }
  }
}
export default {
  namespaced: true,
  state, mutations
}
