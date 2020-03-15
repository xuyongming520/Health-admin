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
import * as booksClass from '@/api/booksClass'
import { API_IP } from '@/utils/request'
export default {
  name: 'BooksClass',
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
          this.createdBookClass()
        } else {
          return false
        }
      })
    },
    createdBookClass() {
      booksClass.update(this.form)
        .then((result) => {
          this.$message({
            type: 'success',
            message: '保存成功!'
          })
          this.$router.push({ name: 'BookClasses' })
        })
    },
    getData() {
      this.loading = true
      booksClass.queryById(this.$route.params.id)
        .then((result) => {
          console.log(result)
          this.form = result.data
          // result.data.pathList.forEach(value => {
          //   const url = value.split('/')
          //   this.fileList.push({
          //     name: url[url.length - 1],
          //     url: value
          //   })
          // })
          this.loading = false
        })
    }
  },
  created() {
    this.getData()
  }
}
</script>
