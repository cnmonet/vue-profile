<template>
  <div class="app-container">
    <el-row>
      <el-col :sm=12> <h3>我的信用积累：{{sum.count}}</h3></el-col><el-col :sm=12 class="right">好评率：{{sum|haopingFilter}}% </el-col>
    </el-row>
    <el-table :data="count" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label="" width="95">
        <template slot-scope="scope">
          {{scope.$index|setIndex}}
        </template>
      </el-table-column>
      <el-table-column v-for="(item,index) in pingjia" :label="item.title" :key="index">
        <template slot-scope="scope">
          {{scope.row|pingjiaFilter(item.row)}}
        </template>
      </el-table-column>
      
    </el-table>
  <h3>评价列表</h3>
    <el-table :data="list" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column label="我的评分" width="100">
        <template slot-scope="scope">
          <div class="center"><i :class="pingIcoFilter(scope.row.evaluation_buyer)" :title="pingTitleFilter(scope.row.evaluation_buyer)" :style="'color:'+pingColorFilter(scope.row.evaluation_buyer)"></i></div>
        </template>
      </el-table-column>
      <el-table-column prop="evaluation_seller" label="商家评分" width="100">
        <template slot-scope="scope">
          <div class="center"><i :class="pingIcoFilter(scope.row.evaluation_seller)" :title="pingTitleFilter(scope.row.evaluation_seller)" :style="'color:'+pingColorFilter(scope.row.evaluation_seller)"></i></div>
          
        </template>
      </el-table-column>
      <el-table-column prop="comment" label="评论">
        <template slot-scope="scope">
          <span v-if="scope.row.comment">购买方：{{scope.row.comment}}</span>
          <span style="color:#aaa" v-else>购买方无评论</span>
          <br />
          <span v-if="scope.row.comment">出售方：{{scope.row.reply_content}}</span>
          <span style="color:#aaa" v-else>出售方无评论</span>
        </template>
      </el-table-column>
      <el-table-column prop="order.store.title" label="商户"></el-table-column>
      <el-table-column prop="title" label="宝贝"></el-table-column>
      <el-table-column label="操作"> </el-table-column>
    </el-table>
  
  
  </div>
</template>

<script>
import request from '@/utils/request'
import { statusFilter,stFilter,pingjia } from '@/api/config'
export default {
  data() {
    return {
      sum: {count:0,countall:0},
      pingjia,
      list       : null,
      count      : null,
      listLoading: true
    }
  },
  filters: {
    statusFilter,
    stFilter,
    haopingFilter:function(t0){
      if(t0.count<1) return 0
      return Math.round(t0.count/t0.countall*100)
    },
    pingjiaFilter:function(t0,t1){
      const row=t0.find(
        function (n){
          if(n.evaluation_seller==t1)return true
          else return false
        }
      )
      if(row) return row.count_eva
      else return 0
    },
    setIndex:function(t0){
      const index=[
        {'title':'本周','row':'a1'},
        {'title':'本月','row':'a2'},
        {'title':'最近半年','row':'a3'},
        {'title':'半年前','row':'a4'},
        {title:'总计',row:'a0'},
      ];
      return index.find(
        function (n){
          if(n.row==t0)return true
          else return false
        }
      ).title
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    pingIcoFilter(t0){
      return this.pingjia.find(
        function(n){
          if(n.row==t0)return true
          return false
        }
      ).ico
    },
    pingColorFilter(t0){
      return this.pingjia.find(
        function(n){
          if(n.row==t0)return true
          return false
        }
      ).color
    },
    pingTitleFilter(t0){
      return this.pingjia.find(
        function(n){
          if(n.row==t0)return true
          return false
        }
      ).title
    },
    fetchData() {
      this.listLoading = true
      request({url: '/buyer/evaluation',method: 'get'}).then(response => {
        this.count = response.count
        this.sum   = response.sum
        this.list  = response.data.data
        
        this.listLoading = false
      })
    }
  }
}
</script>
