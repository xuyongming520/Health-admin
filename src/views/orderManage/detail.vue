<template>
  <div class="app-container" id="CreateNews">
    <el-row>
      <el-col :span="8">
        <h4>订单编号：{{detail_orderId}}</h4>
      </el-col>
      <el-col :span="8">
        <h4>订单状态：{{orderStatus[detail_status].display_name }}</h4>
      </el-col>
      <el-col :span="8">
        <h4>创建日期:{{detail_createTime}}</h4>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <h4>用户编号：{{detail_userId}}</h4>
      </el-col>
      <el-col :span="8">
        <h4>用户姓名：{{detail_userName }}</h4>
      </el-col>
    </el-row>
    <el-row v-for="(item, key) of detail" :key="key">
      <el-col :span="24">
        <el-card :body-style="{ padding: '0px' }">
          <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
          <div class="content">
            <el-row>
              <h4 style="float:left">商品编号:</h4><div class="word">{{detail[key].proId}}</div>
            </el-row>
             <el-row>
              <h4 style="float:left">商品名称:</h4><div class="word">{{detail[key].proName}}</div>
            </el-row>
            <el-row>
              <h4 style="float:left">商品数量:</h4><div class="word">{{detail[key].number}}</div>
            </el-row>
            <el-row>
              <h4 style="float:left">商品单价:</h4><div class="word">{{detail[key].proPrice}}</div>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4" style="float:right" v-show="!this.detail_status">
        <el-button type="primary" style="width:200px" @click="changeStatus(detail_orderId)">发货</el-button>
      </el-col>

      <el-col :span="4" style="float:right;margin-top:10px">
        订单总价(元)：<strong>{{orderTotal}}</strong>
      </el-col>
      <el-col :span="4" style="float:right;margin-top:10px">
        商品数量：<strong>{{detail.length}}</strong>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import * as orders from '@/api/orders'
import { API_IP, IMG_URL } from '@/utils/request'
export default {
  name: 'CreateNews',
  data() {
    return {
      loading: true,
      detail_orderId: 0,
      orderStatus: [
        { key: 0, display_name: '未发货' },
        { key: 1, display_name: '已完成' },
        { key: 2, display_name: '配送中' }
      ],
      detail_createTime: '',
      detail_userId: 0,
      detail_userName: '',
      orderTotal: 0,
      detail: [],
      ip: API_IP,
      imgUrl: IMG_URL
    }
  },
  methods: {
    // onSubmit() {
    //   this.$refs['form'].validate((valid) => {
    //     if (valid) {
    //       this.updateOrdersStatus()
    //     } else {
    //       return false
    //     }
    //   })
    // },
    // updateOrdersStatus() {
    //   orders.update(this.form)
    //     .then((result) => {
    //       this.$message({
    //         type: 'success',
    //         message: '保存成功!'
    //       })
    //       this.$router.push({ name: 'Orders' })
    //     })
    changeStatus(id) {
      orders.update(id, 2)
        .then((result) => {
          this.$message({
            type: 'success',
            message: '发货成功!'
          })
        })
      location.reload()
    },
    getData() {
      this.loading = true
      orders.queryById(this.$route.params.id)
        .then((result) => {
          this.detail_orderId = result.data[0].orderId
          this.detail_status = result.data[0].status
          this.detail_createTime = result.data[0].createTime
          this.detail_userId = result.data[0].userId
          this.detail_userName = result.data[0].userName
          this.detail = result.data
          for (let i = 0; i < this.detail.length; i++) {
            this.orderTotal = this.detail[i].total + this.orderTotal
          }
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
  .el-card{
    padding: 15px;
  }
  .image{
    float: left;
  }
  .content{
    float:left;
    padding-left: 30px;
    .el-row{
      margin-bottom: 0px;
    }
    .word{
      float: left;
      font-size: 14px;
      padding: 20px;
    }
  }
</style>
