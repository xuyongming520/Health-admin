<template>
  <div class="app-container" id="CreateNews">
    <el-form :rules="rules" ref="form" :model="form" label-width="150px">
      <div style="width:600px">
        <el-form-item label="详情编号" prop="classId">
          <el-input v-model="form.infoId"></el-input>
        </el-form-item>
      </div>
      <div style="width:600px">
        <el-form-item label="是否借阅" prop="name">
          <el-select v-model="form.status" placeholder="请选择图书状态" style="width:320px">
            <el-option label="未借阅" value="0"></el-option>
            <el-option label="已借阅" value="1"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div style="width:600px">
        <el-form-item label="图书馆位置" prop="name">
          <el-input v-model="form.location"></el-input>
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
import * as books from '@/api/books'
import { API_IP } from '@/utils/request'
export default {
  name: 'CreateNews',
  data() {
    return {
      loading: true,
      form: {
        status: '',
        location: '',
        infoId: ''
      },
      rules: {
        status: [{ required: true, message: '请输入借阅状态', trigger: 'blur' }],
        location: [{ required: true, message: '请输入图书管位置', trigger: 'blur' }],
        infoId: [{ required: true, message: '请选择图书详情', trigger: 'blur' }]
      },
      ip: API_IP
    }
  },
  methods: {
    onSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.createdBooks()
        } else {
          return false
        }
      })
    },
    createdBooks() {
      books.update(this.form)
        .then((result) => {
          this.$message({
            type: 'success',
            message: '保存成功!'
          })
          this.$router.push({ name: 'Books' })
        })
    },
    getData() {
      this.loading = true
      books.queryById(this.$route.params.id)
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
