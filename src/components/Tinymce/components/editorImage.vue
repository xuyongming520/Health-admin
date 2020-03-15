<template>
  <div class="upload-container">
    <el-button icon="el-icon-upload" size="mini" @click=" dialogVisible=true">上传图片</el-button>
    <el-dialog :visible.sync="dialogVisible" width="30%">
      <el-upload
        :multiple="true"
        :file-list="fileList"
        :show-file-list="true"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        class="editor-slide-upload"
        :action="`${ip}/markdown/temp`"
        style="margin-bottom:20px"
        list-type="picture-card">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </el-dialog>
  </div>
</template>

<script>
import { API_IP } from '@/utils/request'

export default {
  name: 'EditorSlideUpload',
  props: {
    color: {
      type: String,
      default: '#1890ff'
    }
  },
  data() {
    return {
      dialogVisible: false,
      listObj: {},
      fileList: [],
      ip: API_IP
    }
  },
  methods: {
    handleSubmit() {
      const arr = []
      for (const key in this.listObj) {
        if (this.listObj.hasOwnProperty(key)) {
          const element = this.listObj[key]
          arr.push({ url: element })
        }
      }
      this.$emit('successCBK', arr)
      this.listObj = {}
      this.fileList = []
      this.dialogVisible = false
    },
    handleSuccess(response, file) {
      this.listObj[file.uid] = response.url
      console.log(this.listObj)
    },
    handleRemove(file) {
      delete this.listObj[file.uid]
      console.log(this.listObj)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.editor-slide-upload {
  /deep/ .el-upload--picture-card {
    width: 100%;
  }
}
</style>
