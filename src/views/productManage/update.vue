<template>
  <div class="app-container" id="CreateNews">
    <el-form :rules="rules" ref="form" :model="form" label-width="150px">
      <el-form-item label="商品图片" prop="pic">
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
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content">
            <el-form-item label="商品名称" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <el-form-item label="商品类别" prop="classId">
              <el-input v-model="form.classId"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <el-form-item label="商品单价" prop="price">
              <el-input v-model="form.price"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <el-form-item label="库存量" prop="storage">
              <el-input v-model="form.storage"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content">
            <el-form-item label="保质期" width="" prop="shelfLife">
              <el-input v-model="form.shelfLife"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <el-form-item label="厂家联系方式" width="" prop="manufacturerCon">
              <el-input v-model="form.manufacturerCon"></el-input>
            </el-form-item>
           </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <el-form-item label="生产许可证编号" width="" prop="proNumber">
              <el-input v-model="form.proNumber"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <el-form-item label="保质期" width="" prop="shelfLife">
              <el-input v-model="form.shelfLife"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content">
            <el-form-item label="系列" width="" prop="series">
              <el-input v-model="form.series"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <el-form-item label="省份" width="" prop="provinces">
              <el-input v-model="form.provinces"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <el-form-item label="厂名" width="" prop="factoryName">
              <el-input v-model="form.factoryName"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <el-form-item label="净含量" width="" prop="netContent">
              <el-input v-model="form.netContent"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content">
            <el-form-item label="储藏方法" width="" prop="storeMethod">
              <el-input v-model="form.storeMethod"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <el-form-item label="品牌" width="" prop="brand">
              <el-input v-model="form.brand"></el-input>
            </el-form-item>
          </div>
         </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <el-form-item label="型号" width="" prop="model">
              <el-input v-model="form.model"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <el-form-item label="颜色" width="" prop="color">
              <el-input v-model="form.color"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="grid-content">
            <el-form-item label="配料表" width="" prop="ingredients">
              <el-input
                type="textarea"
                :rows="5"
                placeholder="配料表"
                v-model="form.ingredients">
              </el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            <el-form-item label="商品介绍" prop="introduce">
              <el-input
                type="textarea"
                :rows="5"
                placeholder="商品介绍"
                v-model="form.introduce">
              </el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即发布</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import * as product from '@/api/product'
import { API_IP } from '@/utils/request'
export default {
  name: 'CreateNews',
  data() {
    return {
      loading: true,
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
        introduce: [{ required: true, message: '请输入图书简短介绍', trigger: 'blur' }],
        author: [{ required: true, message: '请输入作者', trigger: 'blur' }]

      },
      imageList: [],
      dialogImageUrl: '',
      dialogVisible: false,
      ip: API_IP
    }
  },
  methods: {
    onBeforeUploadCover(file) {
      const isIMAGE = (file.type === ('image/jpeg' || 'image/png' || 'image/jpg'))
      if (!isIMAGE) {
        this.$message.error('上传文件只能是jpg/png格式!')
      }
      return isIMAGE
    },
    handleExceed() {
      this.$message({
        type: 'warning',
        message: '只支持1张图片!'
      })
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
          this.updateProduct()
        } else {
          return false
        }
      })
    },
    updateProduct() {
      console.log(456)
      console.log(this.form)
      product.update(this.form)
        .then((result) => {
          this.$message({
            type: 'success',
            message: '保存成功!'
          })
          this.$router.push({ name: 'Product' })
        })
    },
    getData() {
      this.loading = true
      product.queryById(this.$route.params.id)
        .then((result) => {
          console.log(result)
          this.form = result.data
          const image = result.data.image
          const url = result.data.image.split('/')
          this.form.image = url[url.length - 1]
          this.imageList.push({
            name: url[url.length - 1],
            url: image
          })
          this.loading = false
        })
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
 .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>
