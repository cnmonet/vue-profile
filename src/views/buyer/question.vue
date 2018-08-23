<template >
  <div style="padding:30px;">
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
    <el-tab-pane label="全部咨询" name="first">
<div v-for="(item, index) in list" :key="index">
  <el-row class="table-head-mod">
    <el-col :span="16" style="text-align:left;"><div v-if="item.type=='goods'"><a :href="'/goods?id='+item.item_id" target="_blank">{{item.item_name}}</a></div></el-col>
    <el-col :span="8">商品咨询</el-col>
  </el-row>
  <el-row class="goods_row">
    <el-col :span="4" :xs=24 style="text-align:left;">咨询内容：</el-col>
    <el-col :span="20"><font color="#909399">{{item.question_content}}</font></el-col>
  </el-row>
  <el-row class="goods_row" v-if="item.reply_content">
    <el-col :span="4" :xs=24 style="text-align:left;">回复内容：</el-col>
    <el-col :span="20"><font color="#F56C6C">{{item.reply_content}}</font></el-col>
  </el-row>
</div>
    </el-tab-pane>
    <el-tab-pane label="已回复咨询" name="second">
<div v-for="(item, index) in list" :key="index" v-if="item.reply_content">
  <el-row class="table-head-mod">
    <el-col :span="16" style="text-align:left;"><div v-if="item.type=='goods'"><a :href="'/goods?id='+item.item_id" target="_blank">{{item.item_name}}</a></div></el-col>
    <el-col :span="8">商品咨询</el-col>
  </el-row>
  <el-row class="goods_row">
    <el-col :span="4" :xs=24 style="text-align:left;">咨询内容：</el-col>
    <el-col :span="20"><font color="#909399">{{item.question_content}}</font></el-col>
  </el-row>
  <el-row class="goods_row" v-if="item.reply_content">
    <el-col :span="4" :xs=24 style="text-align:left;">回复内容：</el-col>
    <el-col :span="20"><font color="#F56C6C">{{item.reply_content}}</font></el-col>
  </el-row>
</div>      
    </el-tab-pane>
  </el-tabs>
  </div>
</template>
<script>
import request from '@/utils/request'
export default {
  data() {
    return {
      activeName2: 'first',
      list       : null,
      listLoading: true,
      filterText : '',
    };
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      request({ url:'/buyer/question', method:'get', params:this.filterText }).then(response => {
        this.list        = response.data
        this.listLoading = false
      })
    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>
<style scoped>
.table-head-mod {
    margin-top      : 2rem;
    background-color: #f5f5f5;
    border          : 1px solid #e8e8e8;
    text-align      : center;
    width           : 100%;
    border-collapse : collapse;
    border-spacing  : 0;
    color           : #3c3c3c;
    table-layout    : fixed;
}
.el-col {
  padding: 10px;
  font   : .8em sans-serif;
}
.goods_row{
  border: 1px  solid #e8e8e8;
}
</style>


