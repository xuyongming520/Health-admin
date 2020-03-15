<template>
  <div class="app-container">
    <div class="filter-container" style="margin-bottom:20px">
      <el-input v-model="listQuery.name" placeholder="标题" style="width: 200px;" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <!-- <el-select v-model="listQuery.classId" placeholder="类别" clearable class="filter-item" style="width: 180px">
        <el-option v-for="item in productsClasses" :key="item.key" :label="item.display_name" :value="item.key"/>
      </el-select> -->
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 1px;" type="success" icon="el-icon-edit" @click="handleCreate">增加</el-button>
    </div>

    <el-table
      :data="booksInfo"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="编号" width="95">
        <template slot-scope="scope">
          {{ scope.row.pkId }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="分类编号" width="110" align="center">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.classId }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="缩略图" width="200" align="center">
        <template slot-scope="scope">
          <img
            :src='scope.row.image'
            width="100px"
            height="100px"
            @click="handlePictureCardPreview(scope.row.image)"/>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </template>
      </el-table-column>
      <el-table-column label="书名" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row.pkId)">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="出版社" width="250" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.publishers }}</span>
        </template>
      </el-table-column>
      <el-table-column label="作者" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="数量" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.num }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="180" class-name="small-padding fixed-width">
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
import * as booksInfo from '@/api/booksInfo'

export default {
  name: 'booksInfo',
  data() {
    return {
      loading: true,
      booksInfo: [],
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
    handlePictureCardPreview(url) {
      this.dialogImageUrl = url
      this.dialogVisible = true
    },
    handleUpdate(id) {
      this.$router.push({ path: `/bookInfoManage/update/${id}` })
    },
    handleDelete(id) {
      this.$confirm('此操作将永久删除该产品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        booksInfo.deleteById(id)
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
      this.$router.push({ name: 'CreateBookInfo' })
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
      booksInfo.query(this.listQuery)
        .then((result) => {
          console.log(result)
          this.booksInfo = result.data.list
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
