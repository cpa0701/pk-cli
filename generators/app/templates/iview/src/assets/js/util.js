export default {
  /**
   * 判断参数是否为空
   * @param params
   */
  isEmpty (params) {
    return params === null || typeof (params) === 'undefined' || params === ''
  }
}
