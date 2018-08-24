<template>
<div class="app-container">
    <h3>
        欢迎您，{{name}} </h3>
    <el-row>
      <el-col :md="6" v-for="(item, index) in items" :key="index" class="item-card"><el-card class="center">
        <h1><i :class="item.ico">{{ money[index] }}</i></h1><br>
        {{ item.name }}</el-card></el-col>
    </el-row>
    <el-table :data="list" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='序号' width="95">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
       <el-table-column label="流动">
        <template slot-scope="scope">
          <el-tag :type="scope.row.flow | statusFilter">{{scope.row.flow | flowFilter}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="金额">
        <template slot-scope="scope">
          {{scope.row.money | moneyFilter}}
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.st | statusFilter">{{scope.row.st | stFilter}}</el-tag>
        </template>
      </el-table-column>
      
      <el-table-column align="center" prop="created_at" label="时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.created_at}}</span>
        </template>
      </el-table-column>
    </el-table>
</div>
  

  
</template>

<script>
import { mapGetters } from 'vuex'
import request from '@/utils/request'
import { statusFilter,stFilter,flowFilter } from '@/api/config'
export default {
  name: '资金',
  created() {
    this.fetchData()
  },
  filters: {
    statusFilter,
    stFilter,
    flowFilter
  },
  methods: {
    fetchData() {
      this.listLoading = true
      request({url: '/member/money',method: 'get'}).then(response => {
        this.list        = response.data.items
        this.money       = response.data.money
        this.listLoading = false
      })
    }
  },
  data() {
    return {
      money: [0,0],
      items: [
        {name:'资金',ico:'el-icon-sort'},
        {name:'冻结款',ico:'el-icon-sort-down'},
      ]
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size  : 30px;
    line-height: 46px;
  }
}
.item-card{
  padding: 10px;
}
.center {
	text-align: center;
}
</style>
