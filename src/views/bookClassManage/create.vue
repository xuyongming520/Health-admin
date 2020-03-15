<template>
  <div class="app-container" id="CreateNews">
    <el-form :rules="rules" ref="form" :model="form" label-width="150px">
      <div style="width:600px">
        <el-form-item label="图书分类名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即发布</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import * as bookClass from '@/api/booksClass'
import { API_IP } from '@/utils/request'
export default {
  name: 'CreateNews',
  data() {
    return {
      form: {
        name: ''
      },
      rules: {
        name: [{ required: true, message: '请输入类别名称', trigger: 'blur' }]
      },
      ip: API_IP
    }
  },
  methods: {
    onSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.createdBookClass()
        } else {
          return false
        }
      })
    },
    createdBookClass() {
      bookClass.insert(this.form)
        .then((result) => {
          this.$message({
            type: 'success',
            message: '创建成功!'
          })
          this.$router.push({ name: 'BookClasses' })
        })
    }
  }
}
</script>
