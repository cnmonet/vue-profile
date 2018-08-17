<template>
  <div class="app-container">
    
    <el-tabs type="card">
  <el-tab-pane label="商品收藏">
    <el-table :data="list" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='序号' width="95">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
    
      <el-table-column label="商品">
        <template slot-scope="scope">
          {{scope.row.item_id | goodsFilter}}
        </template>
      </el-table-column>
      
      <el-table-column align="center" prop="created_at" label="添加时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.created_at}}</span>
        </template>
      </el-table-column>
    </el-table></el-tab-pane>
  <el-tab-pane label="店铺收藏">
    
    <el-table :data="list2" v-loading="listLoading2" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='序号' width="95">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
    
      <el-table-column label="店铺">
        <template slot-scope="scope">
          {{scope.row.item_id | storeFilter}}
        </template>
      </el-table-column>
      
      <el-table-column align="center" prop="created_at" label="添加时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.created_at}}</span>
        </template>
      </el-table-column>
    </el-table></el-tab-pane>
    </el-tabs>
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
      this.listLoading  = true
      this.listLoading2 = true
      request({url: '/member/favorite',method: 'get'}).then(response => {
        this.list        = response.data.items
        this.listLoading = false
      })
      request({url: '/member/favorite?type=store',method: 'get'}).then(response => {
        this.list2        = response.data.items
        this.listLoading2 = false
      })
    }
  },

  data() {
    return {
      list        : null,
      list2       : null,
      listLoading : true,
      listLoading2: true,
    }
  }
}
</script>