<template>
  <div class="popup-main">
    <Form ref="userBaseForm" :model="userBaseModel" :rules="userBaseRule" :label-width="85" class="popup-form">
      <div class="popup-form-content">
        <FormItem prop="nickName" label="用户名">
          <Input v-model="userBaseModel.nickName" placeholder="用户名" clearable></Input>
        </FormItem>
        <FormItem prop="mobile" label="手机号码">
          <Input v-model="userBaseModel.mobile" placeholder="手机号码" clearable></Input>
        </FormItem>
        <FormItem prop="name" label="真实姓名">
          <Input v-model="userBaseModel.name" placeholder="用户名" clearable></Input>
        </FormItem>
        <FormItem prop="status" label="状态">
          <Select v-model="userBaseModel.status" placeholder="请选择状态">
            <Option
              v-for="(optionItem, optionIndex) in statusOptions"
              :key="optionIndex"
              :value="optionItem.id"
            >
              {{ optionItem.name }}
            </Option>
          </Select>
        </FormItem>
      </div>
      <div class="popup-form-btn">
        <FormItem>
          <Button type="success" @click="userSave">保 存</Button>
        </FormItem>
      </div>
    </Form>
  </div>
</template>

<script>
import { API_USER } from '@/api/api'
export default {
  data() {
    return {
      statusOptions: [
        { id: 2, name: '是' },
        { id: 1, name: '否' }
      ],
      userBaseModel: {
        nickName: null,
        mobile: null,
        name: null,
        status: null
      },
      userBaseRule: {
        nickName: {
          required: true,
          type: 'string',
          message: '用户名不能为空'
        },
        mobile: {
          required: true,
          message: '手机号码不能为空'
        }
      }
    }
  },
  methods: {
    userDrawerShow() {
      this.$refs['userBaseForm'].resetFields()
      setTimeout(() => {
        this.$refs['userBaseForm'].resetFields()
        this.$emit('update:isShow', true)
      }, 20)
    },
    userSave() {
      this.$refs['userBaseForm'].validate((valid) => {
        if (!valid) {
          return
        }
        this.userAdd(Object.assign({}, this.userBaseModel))
      })
    },
    userAdd(params) {
      const url = API_USER.update
      this.$post(url, params).then(res => {
        if (res.code === 200) {
          this.$Message.success('新增成功')
          this.$parent.$parent.$refs.baseTable.getData()
          this.$emit('update:isShow', false)
        } else {
          this.$Message.error(res.message)
        }
      })
    }
  }
}
</script>
