<template>
  <div class="app-container">
    <el-row class="panel-group" :gutter="40" v-loading="listLoading">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col"  v-for="(item, index) in list" :key="index">
      <el-card class='card-panel' @click="handleSetLineChartData('newVisitis')">
        
        <div class="card-panel-icon-wrapper" v-if="item.set.bonus_class==1"><count-to class="card-panel-num" :startVal="0" :endVal="Math.trunc(item.set.discount_money)" :duration="2600"></count-to>
        <div v-show="(item.set.discount_money*100-Math.trunc(item.set.discount_money)*100)>0">.{{(item.set.discount_money*100-Math.trunc(item.set.discount_money)*100)}}</div>
        元</div>
        <div class="card-panel-icon-wrapper" v-else><count-to class="card-panel-num" :startVal="10" :endVal="Math.trunc((100-item.set.discount_percent)/10)" :duration="2600"></count-to><font v-show="((100-item.set.discount_percent)%10)>0">.{{((100-item.set.discount_percent)%10)}}</font>
        折</div>
        <div class="card-panel-description">
          <div class="card-panel-store">{{item.store.title}}</div>
          <div class="card-panel-text">满{{Math.trunc(item.set.min_percent)}}元可用</div>
          <div class="card-panel-date" v-show="item.end_at">{{item.end_at}}过期</div>
        </div>
      </el-card>
    </el-col></el-row>


    
    

  </div>
</template>

<script>
import request from '@/utils/request'
import CountTo from 'vue-count-to'
export default {
  components: {
    CountTo
  },
  created() {
    this.fetchData()
  },
  filters: {
  },
  methods: {
    handleChange (value) {
        console.log(value)
    },
    
    fetchData() {
      this.listLoading = true
      
      request({url: '/buyer/coupon',method: 'get'}).then(response => {
        this.list        = response.data
        this.listLoading = false
      })
    }
  },

  data() {
    return {
      list       : null,
      listLoading: true,
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .card-panel-col{
    margin-bottom: 32px;
  }
  .card-panel {
    height      : 108px;
    cursor      : pointer;
    font-size   : 12px;
    position    : relative;
    overflow    : hidden;
    color       : #fff;
    background  : #f99;
    box-shadow  : 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    &:hover {
      background: #f66;
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-message {
        background: #36a3f7;
      }
      .icon-money {
        background: #f4516c;
      }
      .icon-shoppingCard {
        background: #34bfa3
      }
    }
    .icon-message {
      color: #36a3f7;
    }
    .icon-money {
      color: #f4516c;
    }
    .icon-shoppingCard {
      color: #34bfa3
    }
    .card-panel-icon-wrapper {
      font-size : 24px;
      float     : left;
      transition: all 0.38s ease-out;
    }
    .card-panel-icon {
      float    : left;
      font-size: 48px;
    }
    .card-panel-description {
      float      : right;
      font-weight: bold;
      margin-left: 0px;
      .card-panel-store {
        line-height  : 18px;
        color        : rgba(0, 0, 0, 0.45);
        font-size    : 20px;
        margin-bottom: 12px;
      }
      .card-panel-text {
        font-size: 14px;
      }
      .card-panel-date {
        color    : #99999990;
        font-size: 14px;
      }
    }
  }
}
</style>







