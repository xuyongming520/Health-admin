<template>
  <div class="app-container" id="CreateNews">
    <el-form :rules="rules" ref="form" :model="form" label-width="150px">
      <div style="width:600px">
        <el-form-item label="商品类别名称" prop="name">
          <el-input v-model="form.name"></el-input>
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
import * as productsClass from '@/api/productsClass'
import { API_IP } from '@/utils/request'
export default {
  name: 'ProductsClass',
  data() {
    return {
      loading: true,
      form: {
        name: ''
      },
      rules: {
        name: [{ required: true, message: '请输入图书分类名称', trigger: 'blur' }]
      },
      ip: API_IP
    }
  },
  methods: {
    onSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.updateProductClass()
        } else {
          return false
        }
      })
    },
    updateProductClass() {
      productsClass.update(this.form)
        .then((result) => {
          this.$message({
            type: 'success',
            message: '保存成功!'
          })
          this.$router.push({ name: 'ProductClasses' })
        })
    },
    getData() {
      this.loading = true
      productsClass.queryById(this.$route.params.id)
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
