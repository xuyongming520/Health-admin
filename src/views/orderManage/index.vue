<template>
  <div class="app-container">
    <!-- <div class="filter-container" style="margin-bottom:20px">
      <el-input v-model="listQuery.userId" placeholder="用户编号" style="width: 200px;" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
    </div> -->

    <el-table
      :data="orders"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="编号" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="订单编号" width="110" align="center">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.orderId}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="商品编号" width="120" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.proId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户编号" width="120" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.userId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="数量" >
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.total }}</span>
        </template>
      </el-table-column>
      <el-table-column label="总价" width="120" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.total}}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.status }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="120" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | formatDate }}</span>
        </template>
      </el-table-column>

    </el-table>

    <div class="pagination-container" style="margin-top:10px;">
      <el-pagination
        v-show="total>0"
        :current-page="listQuery.page"
        :page-sizes="[10,20,30,50]"
        :page-size="listQuery.limit"
        :total="total"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import * as orders from '@/api/orders'

export default {
  name: 'Orders',
  data() {
    return {
      loading: true,
      orders: [],
      total: 0,
      ordersClasses: [
        { key: 0, display_name: '未归还' },
        { key: 1, display_name: '已归还' }
      ],
      listQuery: {
        limit: 10,
        page: 1
      },
      dialogVisible: false,
      dialogImageUrl: ''
    }
  },
  methods: {
    handleFilter() {
      // this.listQuery.userId = parseInt(this.listQuery.userId)
      this.listQuery.page = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    getList() {
      this.loading = true
      console.log(this.listQuery)
      orders.query(this.listQuery)
        .then((result) => {
          console.log(result.data.list)
          if (result.code === 0) {
            this.orders = result.data.list
            this.total = result.data.totalCount
            this.loading = false
          } else {
            this.orders = []
          }
        })
    }
  },
  created() {
    this.getList()
  },
  filters: {
    formatDate(val) {
      const date = new Date(val)
      const year = date.getFullYear()
      const month = date.getMonth() > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
      const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate() - 1}`
      return `${year}-${month}-${day}`
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
