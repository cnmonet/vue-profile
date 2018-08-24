<template>
  <div class="app-container">
    
<el-tabs v-model="activeName" @tab-click="handleClick" v-loading="listLoading" element-loading-text="Loading">
    <el-tab-pane label="系统消息" name="first">
      <el-table :data="list[0]" border fit highlight-current-row>
      <el-table-column label="系统消息">
        <template slot-scope="scope">
          <h4 v-show="scope.row.title">{{scope.row.title}}</h4>
          <p>{{scope.row.content}}</p>
          <span class="text-right"><i class="el-icon-time">{{scope.row.created_at}}</i></span>
        </template>
      </el-table-column>
    </el-table></el-tab-pane>



    <el-tab-pane label="服务消息" name="second"><el-table :data="list[1]" border fit highlight-current-row>
      <el-table-column label="服务消息">
        <template slot-scope="scope">
          <h4 v-show="scope.row.title">{{scope.row.title}}</h4>
          <p>{{scope.row.content}}</p>
          <span class="text-right"><i class="el-icon-time">{{scope.row.created_at}}</i></span>
        </template>
      </el-table-column>
    </el-table></el-tab-pane>


    <el-tab-pane label="商铺消息" name="third"><el-table :data="list[2]" border fit highlight-current-row>
      <el-table-column label="商铺消息">
        <template slot-scope="scope">
          <h4 v-show="scope.row.title">{{scope.row.title}}</h4>
          <p>{{scope.row.content}}</p>
          <span class="text-right"><i class="iconfont icon-maijia"> <store :data="scope.row.store"></store> </i> <i class="el-icon-time">{{scope.row.created_at}}</i></span>
        </template>
      </el-table-column>
    </el-table></el-tab-pane>



    <el-tab-pane label="个人消息" name="fourth"><el-table :data="list[3]" border fit highlight-current-row>
      <el-table-column label="个人消息">
        <template slot-scope="scope">
          <h4 v-show="scope.row.title">{{scope.row.title}}</h4>
          <p>{{scope.row.content}}</p>
          <span class="text-right"><i class="iconfont icon-haoyou"> <user :data="scope.row.from"></user> </i> <i class="el-icon-time">{{scope.row.created_at}}</i></span>
        </template>
      </el-table-column>
    </el-table></el-tab-pane>
  </el-tabs>

<el-pagination layout="prev, pager, next" v-show="currentPage.last_page>1" :page-size="currentPage.per_page" :total="currentPage.total" class="text-right" @current-change="handleCurrentChange" :current-page="currentPage.current_page"></el-pagination>
  
    
  </div>
</template>

<script>
import request from '@/utils/request'
import Store from '@/components/Popover/store.vue'
import User from '@/components/Popover/user.vue'
export default {
  components: {
    User,Store
  },
  created() {
    this.fetchData()
  },
  methods: {
    handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.fetchData(val)
    },
    handleClick(tab, event) {
        console.log(tab.name, event);
        if(tab.name=='first'){
          this.message_type = 0;
        }else if(tab.name=='second'){
          this.message_type = 1;
        }else if(tab.name=='third'){
          this.message_type = 2;
        }else if(tab.name=='fourth'){
          this.message_type = 3;
        }
        if  (this.PageList[this.message_type])this.currentPage = this.PageList[this.message_type]
        else this.currentPage                                  = {last_page:0}
        if(!this.list[this.message_type])this.fetchData()
    },
    fetchData(page) {
      if(page<1){page = 1;}
      this.listLoading = true;
      request({url: '/member/message',method: 'get',params: {type:this.message_type,page}}).then(response => {
        this.list     [this.message_type] = response.data.data
        this.PageList[this.message_type]  = response.data
                      this.currentPage    = response.data
                      this.listLoading    = false
      })
    }
  },

  data() {
    return {
      activeName  : 'first',
      message_type: 0,
      list        : [],
      listLoading : true,
      filterText  : '',
      PageList    : [],
      currentPage : {last_page:0},
    }
  }
}
</script>

