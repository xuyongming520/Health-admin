<template>
  <div class="app-container" id="CreateNews">
    <el-form :rules="rules" ref="form" :model="form" label-width="150px">
      <div style="width:600px">
        <el-form-item label="用户分类名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="可借数量" prop="number">
          <el-input v-model="form.number"></el-input>
        </el-form-item>
        <el-form-item label="借阅天数" prop="lendTime">
          <el-input v-model="form.lendTime"></el-input>
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
import * as author from '@/api/author'
import { API_IP } from '@/utils/request'
export default {
  name: 'authorUpdate',
  data() {
    return {
      loading: true,
      form: {
        name: '',
        number: 0,
        lendTime: 0
      },
      rules: {
        name: [{ required: true, message: '请输入图书分类名称', trigger: 'blur' }],
        number: [{ required: true, message: '请输入可借数量', trigger: 'blur' }],
        lendTime: [{ required: true, message: '请输入借阅天数', trigger: 'blur' }]
      },
      ip: API_IP
    }
  },
  methods: {
    onSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.updateAuthorClass()
        } else {
          return false
        }
      })
    },
    updateAuthorClass() {
      author.update(this.form)
        .then((result) => {
          this.$message({
            type: 'success',
            message: '保存成功!'
          })
          this.$router.push({ name: 'UserClasses' })
        })
    },
    getData() {
      this.loading = true
      author.queryById(this.$route.params.id)
        .then((result) => {
          console.log(result)
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
