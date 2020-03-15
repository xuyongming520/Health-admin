<template>
  <div class="app-container" id="CreateNews">
    <el-form :rules="rules" ref="form" :model="form" label-width="150px">
      <el-form-item label="图书图片" prop="image">
        <el-upload
          :action="`${ip}/books/information/temp`"
          list-type="picture-card"
          :limit="1"
          :before-upload="onBeforeUploadCover"
          :on-success="handleSuccess"
          :on-preview="handlePictureCardPreview"
          :on-exceed="handleExceed"
          accept="image/jpeg,image/png"
          :file-list="imageList">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <div style="width:600px">
        <el-form-item label="书名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </div>
      <div style="width:400px">
        <el-form-item label="图书类别" prop="classId">
          <el-input v-model="form.classId"></el-input>
        </el-form-item>
      </div>
      <div style="width:400px">
        <el-form-item label="出版社" prop="publishers">
          <el-input v-model="form.publishers"></el-input>
        </el-form-item>
      </div>
      <div style="width:400px">
        <el-form-item label="作者" prop="author">
          <el-input v-model="form.author"></el-input>
        </el-form-item>
      </div>
      <div style="width:400px">
        <el-form-item label="数量" width="" prop="num">
          <el-input v-model="form.num"></el-input>
        </el-form-item>
      </div>
      <div style="width:600px">
        <el-form-item label="图书简短介绍" prop="shortIntroduce">
          <el-input
            type="textarea"
            :rows="5"
            placeholder="产品简短介绍"
            v-model="form.shortIntroduce">
          </el-input>
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
import * as bookInfo from '@/api/booksInfo'
import { API_IP } from '@/utils/request'
export default {
  name: 'CreateNews',
  data() {
    return {
      form: {
        name: '',
        classId: '',
        publishers: '',
        author: '',
        shortIntroduce: '',
        image: ''
      },
      rules: {
        name: [{ required: true, message: '请输入图书名称', trigger: 'blur' }],
        classId: [{ required: true, message: '请选择图书类别', trigger: 'blur' }],
        publishers: [{ required: true, message: '请输入图书出版社', trigger: 'blur' }],
        shortIntroduce: [{ required: true, message: '请输入图书简短介绍', trigger: 'blur' }],
        author: [{ required: true, message: '请输入作者', trigger: 'blur' }],
        image: [{ required: true, message: '请上传产品图片', trigger: 'blur' }]
      },
      fileList: [],
      imageList: [],
      dialogImageUrl: '',
      dialogVisible: false,
      ip: API_IP
    }
  },
  methods: {
    handleExceed() {
      this.$message({
        type: 'warning',
        message: '只支持1张图片!'
      })
    },
    onBeforeUploadCover(file) {
      const isIMAGE = (file.type === ('image/jpeg' || 'image/png' || 'image/jpg'))
      if (!isIMAGE) {
        this.$message.error('上传文件只能是jpg/png格式!')
      }
      return isIMAGE
    },
    handleSuccess(response, file) {
      const url = response.data.split('/')
      this.form.image = url[url.length - 1]
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    onSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.createdBookInfo()
        } else {
          return false
        }
      })
    },
    createdBookInfo() {
      console.log(123)
      bookInfo.insert(this.form)
        .then((result) => {
          this.$message({
            type: 'success',
            message: '创建成功!'
          })
          this.$router.push({ name: 'BookInfos' })
        })
    }
  }
}
</script>
