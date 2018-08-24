<template>
  <div class="app-container">
    <h3>我的关联账号</h3>
    <el-table :data="list" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='' width="95">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column label="帐号类型">
        <template slot-scope="scope">
          {{scope.row.oauth_type|oauthFilter}}
        </template>
      </el-table-column>
      <el-table-column label="帐号">
        <template slot-scope="scope"><center>
          <img width="100" class="img-fluid img-thumbnail" :src="scope.row.user_info.headimgurl" /><br>
         {{scope.row.user_info.nickname}}</center>
        </template>
      </el-table-column>
      
      <el-table-column align="center" prop="created_at" label="添加时间" width="200">
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
import {oauthFilter} from '@/api/config'

export default {
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      request({url: '/member/oauth',method: 'get'}).then(response => {
        this.list        = response.data
        this.listLoading = false
      })
    }
  },
  filters: {
    oauthFilter
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

