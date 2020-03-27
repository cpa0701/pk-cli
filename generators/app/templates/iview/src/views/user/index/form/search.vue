<template>
  <!--搜索栏-->
  <Form ref="userFormSearch" :model="baseModel" :label-width="80" inline class="form search-form">
    <FormItem prop="isBoss">
      <Select v-model="baseModel.isBoss" placeholder="请选择是否为管理员">
        <Option
          v-for="(optionItem, optionIndex) in isBossOptions"
          :key="optionIndex"
          :value="optionItem.id"
        >
          {{ optionItem.name }}
        </Option>
      </Select>
    </FormItem>
    <FormItem prop="time">
      <DatePicker v-model="baseModel.time" type="daterange" placeholder="请选择注册时间段" format="yyyy年MM月dd日"></DatePicker>
    </FormItem>
    <FormItem prop="name">
      <Input v-model="baseModel.name" placeholder="手机号码/用户名查找" clearable></Input>
    </FormItem>
    <!-- 搜索按钮 -->
    <FormItem :label-width="0">
      <Button icon="md-search" type="success" @click="userSearch">查 询</Button>
    </FormItem>
    <FormItem :label-width="0">
      <Button icon="md-refresh" @click="userHandleReset()">重 置</Button>
    </FormItem>
  </Form>
</template>

<script>
export default {
  data() {
    return {
      baseModel: {
        specification: null,
        status: null,
        time: null
      },
      isBossOptions: [
        { id: 0, name: '全部' },
        { id: 2, name: '是' },
        { id: 1, name: '否' }
      ]
    }
  },
  methods: {
    /* 搜索 */
    userSearch() {
      this.$parent.$refs.baseTable.search()
    },
    userHandleReset() {
      this.$refs.userFormSearch.resetFields()
      this.$parent.$refs.baseTable.getData()
    }
  }
}
</script>
