<template>
<div class="app-container">
    <h3>
        欢迎您，{{name}} 会员等级: <span v-for='role in roles' :key='role'>{{role}}</span><br>
会员成长值：0 </h3>
    <el-row>
      <el-col :md="6" v-for="o in item" :key="o" class="item-card"><el-card class="center">
        <h1><i :class="o.ico">{{ o.number }}</i></h1><br>
        {{ o.name }}</el-card></el-col>
    </el-row>
    <p>
      上次登录时间：2018-08-09 15: 20: 39 上次登录 IP：183.226.225.21<br>
您有 0 条短消息，点击查看<br>
账户总金额： 0元  冻结金额： 0元 
    </p>
</div>
  

  
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'dashboard',
  data() {
    return {
      item: [
        {name:'收藏夹',ico:'el-icon-star-off',number:10},
        {name:'消息',ico:'el-icon-bell',number:999},
        {name:'购物夹',ico:'el-icon-goods',number:999},
        {name:'资金',ico:'el-icon-sort',number:999},
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
