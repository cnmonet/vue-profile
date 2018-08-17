<template>
  <div class="app-container">
    <el-input placeholder="请输入关键字" v-model="filterText" style="margin-bottom:30px;"></el-input>

    <el-table :data="list" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='序号' width="95">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
    
      <el-table-column label="用户名">
        <template slot-scope="scope">
          {{scope.row.from_id | userFilter}}
        </template>
      </el-table-column>
      <el-table-column label="内容">
        <template slot-scope="scope">
          <h4>{{scope.row.title}}</h4>
          {{scope.row.content}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="发送时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.created_at}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import request from '@/utils/request'
export default {
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      request({url: '/member/message',method: 'get',params: this.filterText}).then(response => {
        this.list        = response.data.items
        this.listLoading = false
      })
    }
  },

  data() {
    return {
      list       : null,
      listLoading: true,
      filterText : '',
    }
  }
}
</script>

