<template>
  <div class="app-container" id="CreateNews">
    <el-form :rules="rules" ref="form" :model="form" label-width="150px">
      <div style="width:600px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </div>
      <div style="width:400px">
        <el-form-item label="邮箱" prop="model">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
      </div>
      <div style="width:400px">
        <el-form-item label="地址" prop="model">
          <el-input v-model="form.address"></el-input>
        </el-form-item>detail
      </div>
      <div style="width:400px">
        <el-form-item label="余额" prop="company">
          <el-input v-model="form.balance"></el-input>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import * as orders from '@/api/orders'
import { API_IP } from '@/utils/request'
export default {
  name: 'CreateNews',
  data() {
    return {
      loading: true,
      form: {
        name: '',
        email: '',
        address: '',
        balance: 0
      },
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }]
      },
      ip: API_IP
    }
  },
  methods: {
    onSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.updateOrdersStatus()
        } else {
          return false
        }
      })
    },
    updateOrdersStatus() {
      orders.update(this.form)
        .then((result) => {
          this.$message({
            type: 'success',
            message: '保存成功!'
          })
          this.$router.push({ name: 'Orders' })
        })
    },
    getData() {
      this.loading = true
      orders.queryById(this.$route.params.id)
        .then((result) => {
          this.form = result.data
          this.loading = false
        })
    }
  },
  created() {
    this.getData()
  }
}
</script>
