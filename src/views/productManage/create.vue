<template>
  <div class="app-container" id="CreateNews">
    <el-form :rules="rules" ref="form" :model="form" label-width="150px">
      <el-form-item label="商品图片" prop="pic">
        <el-upload
          class="avatar-uploader"
          action=""
          :show-file-list="false"
          :on-change="getFile"
          :limit="1"
          list-type="picture"
          :auto-upload="false"
          >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content">
            <el-form-item label="商品名" prop="name">
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
            <el-form-item label="储藏方法" width="" prop="storeMethod">
              <el-input v-model="form.storeMethod"></el-input>
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
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import * as product from '@/api/product'
import { API_IP } from '@/utils/request'
export default {
  name: 'CreateProducts',
  data() {
    return {
      form: {
        name: '',
        classId: '',
        price: '',
        storage: '',
        introduce: ''
      },
      rules: {
        name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
        classId: [{ required: true, message: '请选择商品类别', trigger: 'blur' }],
        price: [{ required: true, message: '请输入商品单价', trigger: 'blur' }],
        introduce: [{ required: true, message: '请输入商品介绍', trigger: 'blur' }],
        storage: [{ required: true, message: '请输入作者', trigger: 'blur' }]
      },
      fileList: [],
      imageList: [],
      dialogImageUrl: '',
      dialogVisible: false,
      ip: API_IP,
      imageUrl: ''
    }
  },
  methods: {
    getFile(file, fileList) {
      this.getBase64(file.raw).then(res => {
        this.imageUrl = res
        product.images(res)
          .then((result) => {
            this.form.pic = result.data
          })
      })
    },
    getBase64(file) {
      return new Promise(function(resolve, reject) {
        const reader = new FileReader()
        let imgResult = ''
        reader.readAsDataURL(file)
        reader.onload = function() {
          imgResult = reader.result
        }
        reader.onerror = function(error) {
          reject(error)
        }
        reader.onloadend = function() {
          resolve(imgResult)
        }
      })
    },
    onSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.createdProduct()
        } else {
          return false
        }
      })
    },
    createdProduct() {
      product.insert(this.form)
        .then((result) => {
          this.$message({
            type: 'success',
            message: '创建成功!'
          })
          this.$router.push({ name: 'Products' })
        })
    }
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
  .avatar-uploader .el-upload {

    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
        border: 1px dashed #d9d9d9;
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
