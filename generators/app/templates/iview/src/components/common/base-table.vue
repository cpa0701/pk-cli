<template>
  <div ref="tableBox" class="table-box">
    <div id="table-box-content" class="table-box-content">
      <Table
        ref="table"
        size="small"
        :height="height"
        :columns="tableColumnsConfig"
        :data="tableDataList"
        :no-data-text="noDataText"
        @on-selection-change="SelectChange"
        @on-sort-change="sortChange"
      />
    </div>
    <!-- 分页组件 -->
    <div class="table-box-pagination">
      <Page
        ref="page"
        :current="pageNo"
        :total="totalNum"
        :page-size="pageSize"
        show-elevator
        show-sizer
        placement="bottom"
        @on-change="changePage"
        @on-page-size-change="changePageSize"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tableColumnsConfig: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      // 表格数据
      tableDataList: [],
      // 搜索对象
      searchModel: {},
      // 选择列表
      selectList: [],
      // 排序对象
      orderData: {},
      // 总数量
      totalNum: 0,
      // 当前页
      pageNo: 1,
      // 每页多少条
      pageSize: 20,
      // 是否获取数据
      isFetchData: false,
      // 表格最大高度，超出将出现滚动条
      height: 0,
      // 暂无数据文字
      noDataText: ''
    }
  },
  mounted() {
    const container = document.getElementById('table-box-content')
    this.getData()
    this.$nextTick(() => {
      this.height = container.offsetHeight
    })
    window.onresize = () => { // 定义窗口大小变更时更改表格高度
      this.height = container.offsetHeight
    }
  },
  methods: {
    /* 排序 */
    sortChange(orderObj) {
      if (orderObj.order === 'normal') {
        this.orderData = {}
      } else {
        this.orderData = {
          columnName: orderObj.key,
          isAsc: orderObj.order === 'asc'
        }
      }
      this.pageNo = 1
      this.getData()
    },
    /* 选择列表改变 */
    SelectChange(selectList) {
      this.selectList = selectList
    },
    /* 切换分页 */
    changePage(pageNo) {
      this.pageNo = pageNo
      this.getData()
    },
    /* 切换每页多少条 */
    changePageSize(pageSize) {
      this.pageNo = 1
      this.pageSize = pageSize
      this.getData()
    },
    /* 搜索 */
    search() {
      this.pageNo = 1
      this.getData()
    },
    /* 获取数据 */
    getData() {
      if (this.isFetchData) {
        return
      }
      this.isFetchData = true
      let params = {
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
      const searchModel = Object.assign({}, this.$parent.$refs.baseSearch.baseModel)
      for (const searchName in searchModel) {
        params[searchName] = searchModel[searchName]
      }
      params = Object.assign(params, this.orderData)
      this.tableDataList = []
      this.noDataText = ''
      this.$parent.fetchData(params).then(res => {
        this.tableDataList = res.data
        this.noDataText = res.data.length === 0 ? '暂无数据' : ''
        this.totalNum = res.totalNum
      }).catch(err => {
        console.error(err)
      }).finally(() => {
        this.isFetchData = false
      })
    }
  }
}
</script>
<style scoped lang="scss">
  .table-box {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: calc(100% - 40px);

    .table-box-content {
      // overflow: auto;
      height: calc(100% - 40px - 10px);
      // height: 100%;
    }

    .table-box-pagination {
      margin: 0 -8px;
      height: 40px;
      line-height: 40px;
      background: $pk-bacNormal;
      text-align: right;
      padding-right: 20px;
      margin-top: 10px;

      /deep/ .ivu-page {
        height: 40px;
      }
    }
  }
</style>
