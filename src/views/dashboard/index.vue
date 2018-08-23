<template>
<div class="app-container">
    <h3>欢迎您，{{name}} </h3>
    您的服务为： <span v-for='role in roles' :key='role'> <i :class="'iconfont icon-'+role">{{role|roleFilter}} </i>　</span><br>
会员成长值：<star :data="info.star" :fen="true"></star>
    <el-row>
      <el-col :md="6" v-for="(item,index) in items" :key="index" class="item-card"><el-card class="center">
        <h1><i :class="item.ico">{{ items_number[index] }}</i></h1><br>
        {{ item.name }}</el-card></el-col>
    </el-row>
    <p>
      您的注册时间：{{userdata.created_at|formatTime}}<br>
      最后登录时间：{{userdata.updated_at|formatTime}}<br>

    </p>
</div>
  

  
</template>

<script>
import { mapGetters } from 'vuex'
import {roleFilter} from '@/api/config'
import Star from '@/components/User/star.vue'
import {formatTime} from '@/utils'
export default {
  name      : 'dashboard',
  components: {
    Star
  },
  created() {
    console.log(this.info.items)
    if(this.info.items)this.items_number = this.info.items
  },
  data() {
    return {
      items_number: [0,0,0,0],
      items       : [
        {name:'收藏夹',ico:'el-icon-star-off'},
        {name:'消息',ico:'el-icon-bell'},
        {name:'购物夹',ico:'el-icon-goods'},
        {name:'资金',ico:'el-icon-sort'},
      ]
    }
  },
  filters: {
    roleFilter,formatTime
  },
  computed: {
    ...mapGetters([
      'name',
      'roles',
      'info',
      'userdata',
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
