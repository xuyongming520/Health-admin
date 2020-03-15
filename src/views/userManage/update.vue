<template>
  <div class="app-container" id="CreateNews">
    <el-form :rules="rules" ref="form" :model="form" label-width="150px">
      <div style="width:600px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </div>
      <el-form-item label="用户类型" prop="classId">
        <el-select v-model="form.classId" placeholder="请选择用户类型" style="width:320px" @change="numStatus">
          <el-option label="老师" value="1"></el-option>
          <el-option label="学生" value="2"></el-option>
        </el-select>
      </el-form-item>
      <div style="width:400px">
        <el-form-item label="证件号" prop="model">
          <el-input v-model="form.uniqueId"></el-input>
        </el-form-item>
      </div>
      <div style="width:400px">
        <el-form-item label="余额" prop="company">
          <el-input v-model="form.balance"></el-input>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">修改</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import * as users from '@/api/users'
import { API_IP } from '@/utils/request'
export default {
  name: 'CreateNews',
  data() {
    return {
      loading: true,
      form: {
        name: '',
        uniqueId: '',
        classId: '',
        num: 0,
        balance: 0,
        img: null
      },
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        uniqueId: [{ required: true, message: '请输入证件号', trigger: 'blur' }],
        classId: [{ required: true, message: '请选择用户类型', trigger: 'blur' }],
        balance: [{ required: true, message: '请输入用户余额', trigger: 'blur' }]
      },
      ip: API_IP
    }
  },
  methods: {
    numStatus(selVal) {
      this.selVal = selVal
      if (selVal === '1') {
        this.form.num = 20
      } else if (selVal === '2') {
        this.form.num = 10
      } else {
        this.form.num = 0
      }
    },
    onSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.updateUsers()
        } else {
          return false
        }
      })
    },
    updateUsers() {
      console.log(this.form)
      users.update(this.form)
        .then((result) => {
          this.$message({
            type: 'success',
            message: '保存成功!'
          })
          this.$router.push({ name: 'Users' })
        })
    },
    getData() {
      this.loading = true
      users.queryById(this.$route.params.id)
        .then((result) => {
          this.form = result.data
          // if (result.data.classId === 1) {
          //   this.form.classId = '老师'
          // } else if (result.data.classId === 2) {
          //   this.form.classId = '学生'
          // }
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
