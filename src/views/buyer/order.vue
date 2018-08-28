<template>
  <div class="app-container">
    
    <el-input placeholder="请输入关键字" v-model="filterText" style="margin-bottom:30px;"></el-input>
    
<el-row class="table-head-mod">
  <el-col :sm="12" :xs="18">宝贝</el-col>
  <el-col :sm="3" :xs="6">单价</el-col>
  <el-col :sm="3" class="hidden-xs-only">数量</el-col>
  <el-col :sm="6" class="hidden-xs-only">商品操作</el-col>
</el-row>
<div v-for="(item, index) in (data && data.data)" :key="index">
<el-row class="table-head-mod">
  <el-col :span="4" style="text-align:left;"><div v-if="item.store">{{item.store.title}}</div><div v-else-if="item.store_id==0">系统商城</div><div v-else>其它商城</div></el-col>
  <el-col :span="12">订单号：{{item.order_sn}}  下单时间：{{item.created_at}}</el-col>
  <el-col :span="8">买家已付款</el-col>
</el-row>

<div v-if="item.goods.length>0">
<el-row v-for="(item1, index1) in item.goods" :key="index1" class="goods_row">
  <el-col :sm="12" :xs="18" class="goods_item">
    <a :href="'/goods?id='+item1.id" target="_blank"><img :src="goods_img_path + item1.goods_image" width="80" height="80"></a>
    <a :href="'/goods?id='+item1.id" target="_blank">{{item1.title}}</a>
  </el-col>
  <el-col :sm="3" :xs="6">{{item1.price}}</el-col>
  <el-col :xs="6" class="v-xs-only">x{{item1.quantity}}</el-col>
  <el-col :sm="3" class="hidden-xs-only">{{item1.quantity}}</el-col>
  <el-col :sm="6" class="hidden-xs-only">退款/退货<br>投诉商家</el-col>
</el-row>

<el-row >
  <el-col :span="14" style="text-align:left;">共 {{item.goods.length}} 件商品 合计：￥{{item.goods_amount}}(含运费：￥0.00) </el-col>
  <el-col :span="5"> 查看物流 </el-col>
  <el-col :span="5"><button>确认收货</button></el-col>
</el-row>


</div>
<div v-else>暂时没有商品</div>

</div>
    
  </div>
</template>

<script>
import request from '@/utils/request'
export default {
  created() {
    this.fetchData()
  },
  methods:{
    fetchData() {
      this.listLoading = true
      request({ url:'/buyer/order', method:'get', params:this.filterText }).then(response => {
        this.data           = response.data
        this.goods_img_path = response.goods_img_path
        this.listLoading    = false
      })
    }
  },

  data() {
    return {
      data          : null,
      goods_img_path: 'http://zmall.laravel/upload/',
      listLoading   : true,
      filterText    : '',
    }
  }
}
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
.goods_item img{
  float : left;
  margin: 5px;
}
.goods_row{
  border: 1px  solid #e8e8e8;
}
.v-xs-only{display:none;color: #888;}
@media only screen and (max-width:767px){.v-xs-only{display:block!important}}
</style>




