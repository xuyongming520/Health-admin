<template>
  <div class="app-container">
    <!-- <div class="filter-container" style="margin-bottom:20px">
      <el-input v-model="listQuery.name" placeholder="标题" style="width: 200px;" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <!-- <el-select v-model="listQuery.classId" placeholder="类别" clearable class="filter-item" style="width: 180px">
        <el-option v-for="item in usersClasses" :key="item.key" :label="item.display_name" :value="item.key"/>
      </el-select> -->
      <!-- <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 1px;" type="success" icon="el-icon-edit" @click="handleCreate">增加</el-button>
    </div> -->

    <el-table
      :data="users"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="编号" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="姓名">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row.name)">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" width="220" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
            <el-table-column label="邮箱" width="180" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column label="地址" width="180" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.address }}</span>
        </template>
      </el-table-column>
      <el-table-column label="余额" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.balance }}</span>
        </template>
      </el-table-column>
      <el-table-column label="注册时间" width="180" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | formatDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="250" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row.pkId)">编辑</el-button>
          <!-- <el-button size="mini" type="danger" @click="handleDelete(scope.row.pkId)">删除</el-button> -->
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
import * as users from '@/api/users'

export default {
  name: 'Users',
  data() {
    return {
      loading: true,
      users: [],
      total: 0,
      // usersClasses: [
      //   { key: 0, display_name: '全部' },
      //   { key: 1, display_name: '老师' },
      //   { key: 2, display_name: '学生' }
      // ],
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
      this.$router.push({ path: `/userManage/update/${id}` })
    },
    handleDelete(id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        users.deleteById(id)
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
      console.log(this.listQuery.classId)
      this.listQuery.page = 1
      if (this.listQuery.classId === '0') {
        this.listQuery.classId = null
      }
      this.getList()
    },
    handleCreate() {
      this.$router.push({ name: 'CreateUser' })
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
      users.query(this.listQuery)
        .then((result) => {
          if (result.code === 0) {
            this.users = result.data.list
            this.total = result.data.totalCount
            this.loading = false
          } else {
            this.$message.error('未检索到内容')
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
      const day = date.getDate() > 9 ? date.getDate() - 1 : `0${date.getDate()}`
      return `${year}-${month}-${day} `
    }
  }
}
</script>

