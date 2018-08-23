<template>
  <div class="app-container">
    <el-input placeholder="请输入关键字" v-model="filterText" style="margin-bottom:30px;"></el-input>

    <el-table :data="list" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='' width="95">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
    
      <el-table-column label="好友">
        <template slot-scope="scope">
          <user :data="scope.row.to"></user>
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
import User from '@/components/Popover/user.vue'
export default {
  components: {
    User
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      request({url: '/member/friend',method: 'get',params: this.filterText}).then(response => {
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

