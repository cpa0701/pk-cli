<template>
  <div class="popup-main">
    <Form ref="userBaseForm" :model="userBaseModel" :rules="userBaseRule" :label-width="100" class="popup-form">
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
        { id: 0, name: '有效' },
        { id: 1, name: '无效' }
      ],
      isChangeValue: false,
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
    userDrawerShow(updateModel) {
      updateModel = Object.assign({}, updateModel)
      this.$refs['userBaseForm'].resetFields()
      this.setUserDrawer(updateModel)
      this.$emit('update:isShow', true)
    },
    setUserDrawer(updateModel) {
      for (const name in updateModel) {
        this.$set(this.userBaseModel, name, updateModel[name])
      }
    },
    userSave() {
      this.$refs['userBaseForm'].validate((valid) => {
        if (!valid) {
          return
        }
      })
      this.userUpdate(Object.assign({}, this.userBaseModel))
    },
    userUpdate(params) {
      const url = API_USER.update
      this.$post(url, params).then(res => {
        if (res.code === 200) {
          this.$Message.success('保存成功')
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
