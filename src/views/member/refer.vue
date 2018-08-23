<template>
  <div class="app-container">
    <h3>我的推荐</h3>
    <el-table :data="list" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='序号' width="95">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column label="用户名">
        <template slot-scope="scope">
          <user :data="scope.row"></user>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.st | statusFilter">{{scope.row.st | stFilter}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="注册时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.created_at}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="updated_at" label="最后登录" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.updated_at}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import request from '@/utils/request'
import { statusFilter,stFilter } from '@/api/config'
import User from '@/components/Popover/user.vue'
export default {
  components: {
    User
  },
  data() {
    return {
      list       : null,
      listLoading: true
    }
  },
  filters: {
    statusFilter,
    stFilter
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      request({url: '/member/refer',method: 'get'}).then(response => {
        this.list        = response.data
        this.listLoading = false
      })
    }
  }
}
</script>
