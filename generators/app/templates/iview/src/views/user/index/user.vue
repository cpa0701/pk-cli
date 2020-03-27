<template>
  <div class="table-container">
    <search ref="baseSearch"></search>
    <base-table ref="baseTable" :table-columns-config="tableColumnsConfig"></base-table>
    <!-- 修改弹框 -->
    <Drawer
      v-model="isUpdateDrawerShow"
      :title="'修改'"
      :mask-closable="true"
      closable
      width="420px"
      class="drawer"
    >
      <update-drawer ref="updateDrawer" :is-show.sync="isUpdateDrawerShow"></update-drawer>
    </Drawer>
  </div>
</template>

<script>
import { API_USER } from '@/api/api'
import Util from '@/assets/js/util'
import dayJs from 'dayjs'
import baseMain from '@/assets/mixins/baseMain'
import BaseTable from '@/components/common/base-table'
import tableColumnsConfig from './config/tableColumnsConfig.js'
import search from './form/search'
import updateDrawer from './form/updateDrawer'
export default {
  components: {
    BaseTable,
    updateDrawer,
    search
  },
  mixins: [baseMain],
  data() {
    return {
      isAddDrawerShow: false,
      isUpdateDrawerShow: false,
      // 表格生成规则
      tableColumnsConfig: tableColumnsConfig.call(this)
    }
  },
  methods: {
    /* ========================== ajax请求 以fetch开头 ===================    */
    /* 获取数据 */
    fetchData(params) {
      this.genParams(params)
      const url = API_USER.list
      return this.$post(url, params)
    },
    /**
     * 改变用户状态
     * @param userModel
     */
    changeStatus(userModel) {
      if (this.$store.state.user.userInfo.uid === userModel.uid) {
        return
      }
      const url = API_USER.update
      const params = {
        uid: userModel.uid,
        status: userModel.status === 0 ? 1 : 0
      }
      this.$post(url, params).then(re => {
        this.$refs.baseTable.getData()
      }).catch(err => {
        console.error(err)
      })
    },
    /**
     * 格式化参数
     * @param params
     */
    genParams(params) {
      if (params.time) {
        params.startTime = params.time[0]
        params.endTime = params.time[1]
        delete params.time
        params.startTime = Util.isEmpty(params.startTime) ? null : dayJs(params.startTime).format('YYYY-MM-DD HH:mm:ss')
        params.endTime = Util.isEmpty(params.endTime) ? null : dayJs(params.endTime).format('YYYY-MM-DD HH:mm:ss')
      }
      params.mobile = Util.isEmpty(params.name) ? null : params.name
      params.nickName = Util.isEmpty(params.name) ? null : params.name
      params.isBoss = Util.isEmpty(params.isBoss) || params.isBoss === 0 ? null : params.isBoss === 2
    }
  }
}
</script>
