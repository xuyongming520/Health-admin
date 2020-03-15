<template>
  <div class="app-container">
    <div class="filter-container" style="margin-bottom:20px">
      <el-input v-model="listQuery.name" placeholder="标题" style="width: 200px;" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 1px;" type="success" icon="el-icon-edit" @click="handleCreate">增加</el-button>
    </div>
    <el-table
      :data="bookClassList"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="分类编号" >
        <template slot-scope="scope">
          {{ scope.row.pkId }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="类别名称"  align="center">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.name }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="250" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row.pkId)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.pkId)">删除
          </el-button>
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
import * as bookClassList from '@/api/booksClass'

export default {
  name: 'bookClassList',
  data() {
    return {
      loading: true,
      bookClassList: [],
      total: 0,
      listQuery: {
        limit: 10,
        page: 1,
        classId: 0,
        name: ''
      },
      dialogVisible: false,
      dialogImageUrl: ''
    }
  },
  methods: {
    handleUpdate(id) {
      this.$router.push({ path: `/bookClassManage/update/${id}` })
    },
    handleDelete(id) {
      this.$confirm('此操作将永久删除该产品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        bookClassList.deleteById(id)
          .then((result) => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getList()
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleCreate() {
      this.$router.push({ name: 'CreateBookClass' })
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
      bookClassList.query(this.listQuery)
        .then((result) => {
          this.bookClassList = result.data.list
          this.total = result.data.totalCount
          this.loading = false
        })
    }
  },
  created() {
    this.getList()
  }
}
</script>

<style lang="scss" scoped>
</style>
