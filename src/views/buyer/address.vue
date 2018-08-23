<template>
  <div class="app-container">
    <el-cascader size="large" :options="options" v-model="selectedOptions" @change="handleChange">
    </el-cascader>

<el-button type="primary" style="float:right"> 添 加 </el-button>
    
    <el-table :data="list" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column prop="consignee" label="收货人" width="100"></el-table-column>
      <el-table-column prop="region_name" label="地区"></el-table-column>
      <el-table-column prop="address" label="详细地址"></el-table-column>
      <el-table-column prop="zipcode" label="邮编"></el-table-column>
    
      
      <el-table-column label="联系电话">
        <template slot-scope="scope">
          {{scope.row.phone_tel}} {{scope.row.phone_mob}}
        </template>
      </el-table-column>
      
      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle></el-button>
          <el-button type="danger" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import request from '@/utils/request'
import { regionData } from 'element-china-area-data'
export default {
  created() {
    this.fetchData()
  },
  methods: {
    handleChange (value) {
        console.log(value)
    },
    fetchData() {
      this.listLoading = true
      request({url: '/buyer/address',method: 'get'}).then(response => {
        this.list        = response.data
        this.listLoading = false
      })
    }
  },

  data() {
    return {
      options        : regionData,
      selectedOptions: [],
      list           : null,
      listLoading    : true,
    }
  }
}
</script>