<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClickTable" v-loading="listLoading">
    <el-tab-pane label="角色管理" name="first">

    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="用户头像"  class="img-user">
        <template slot-scope="scope" style="line-height: inherit;">
        <croppa v-model="form.myCroppa" :width="250"
         :height="250" :initial-image="avatar" ></croppa>
         </template>
      </el-form-item>
      
      <el-form-item label="用户名">
        {{name}}
      </el-form-item>
      <el-form-item label="邮箱" v-show="userdata.email">
        {{userdata.email}}
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="userdata.nickname"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="getgender">
          <el-option label="未知" value="0"></el-option>
          <el-option label="男" value="1"></el-option>
          <el-option label="女" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="生日">
        <el-date-picker value-format="yyyy-MM-dd" v-model="userdata.birthday" align="right" type="date" placeholder="选择日期">
    </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmitInfo">确定修改</el-button>
      </el-form-item>
    </el-form>
    </el-tab-pane>

    <el-tab-pane label="登录密码" name="second">
      <el-form label-width="120px" :model="formpass" status-icon :rules="rules2" ref="formpass" >
      <el-form-item label="您的密码" prop="opassword">
        <el-input type="password" v-model="formpass.opassword" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="pass">
    <el-input type="password" v-model="formpass.pass" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="checkPass">
    <el-input type="password" v-model="formpass.checkPass" auto-complete="off"></el-input>
  </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmitPass">修改密码</el-button>
      </el-form-item>
      </el-form>
    </el-tab-pane>

    <el-tab-pane label="我的位置" name="third">
      <el-form label-width="120px" :model="location" status-icon :rules="rules3" ref="location" >
      <el-form-item label="地图">
        <div id="allmap" ref="allmap" style="margin-top:20px;width:800px;height:600px;"></div>
      </el-form-item>
        

      <el-form-item label="经度">
        <el-input v-model="location.lng"></el-input>
      </el-form-item>
      <el-form-item label="纬度">
        <el-input v-model="location.lat"></el-input>
      </el-form-item>
      <el-form-item label="层级">
        <el-input v-model="location.zoom"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmitlocal">修改位置</el-button>
      </el-form-item>
      </el-form>
    </el-tab-pane>
    
  </el-tabs>
  </div>
</template>

<script>
import request from '@/utils/request'
import qs from 'qs';
import { mapGetters } from 'vuex'
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.formpass.checkPass !== '') {
          this.$refs.formpass.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.formpass.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    var validateoPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.formpass.opassword !== '') {//加入远程验证
          //this.$refs.formpass.validateField('opassword');
          var data    = qs.stringify({
            subtype: 'pass',
            opass  : this.formpass.opassword,
          });
          request({url: '/user/info',method: 'post',data}).then(response => {
            //alert('ok');
            callback();
            
          }).catch(
            (err) => { callback(new Error('原密码不正确!')); }
          );

          return true;
          
        }
        callback();
      }
    };
    
    return {
      activeName : 'first',
      gender     : '0',
      listLoading: false,
      form       : {
        myCroppa : {},
        avatar   : 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name     : '',
        email    : '',
        real_name: '',
        gender   : '0',
        birthday : null,
      },
      formpass:{
        opassword: '',
        pass     : '',
        checkPass: '',
      },
      location:{
        lng : '106.54169800',
        lat : '29.57848400',
        zoom: '19',
      },
      rules2: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        opassword: [
          { validator: validateoPass, trigger: 'blur' }
        ]
      },
      rules3: {}
    }
  },
  methods: {
    handleClickTable(tab, event) {
      console.log(tab.name, event);
      if(tab.name=='third'){
        setTimeout(() => {
          this.map()
        }, 1000);
        
      }
    },
    onSubmitlocal(){
      var data    = qs.stringify({
        subtype: 'local',
        local  : this.location,
      });
      this.listLoading = true
      request({url: '/user/info',method: 'post',data}).then(response => {
        this.listLoading = false
        this.$message({
          message: '坐标修改成功',
          type   : 'success'
        })
      }).catch(
        (err) => { this.listLoading = false }
      );
    },
    onSubmitPass(){
      if(this.formpass.pass!=this.formpass.checkPass || (!this.formpass.opassword)){
        this.$message({
          message: '您输入的密码错误！',
          type   : 'warning'
        });
        return false;
      }
      var data    = qs.stringify({
        subtype: 'pass',
        opass  : this.formpass.opassword,
        npass  : this.formpass.pass,
      });
      this.listLoading = true
      request({url: '/user/info',method: 'post',data}).then(response => {
        this.list        = response.data
        this.listLoading = false
        this.$message({
          message: '您的密码修改成功了',
          type   : 'success'
        })
      }).catch(
        (err) => { this.listLoading = false }
      );
    },
    
    onSubmitInfo() {
      var dataUrl = this.form.myCroppa.generateDataUrl('image/jpeg', 0.8)
      var data    = qs.stringify({
        subtype : 'info',
        avatar  : dataUrl,
        nickname: this.userdata.nickname,
        gender  : this.userdata.gender,
        birthday: this.userdata.birthday,
      });
      this.listLoading = true
      request({url: '/user/info',method: 'post',data}).then(response => {
        this.list        = response.data
        this.listLoading = false
        this.$message({
          message: '您的资料修改成功了',
          type   : 'success'
        });
      })
      //console.log(dataUrl)
      //this.$message(dataUrl)
    },
    uploadCroppedImage() {
       this.myCroppa.generateBlob((blob) => {
         // write code to upload the cropped image file (a file is a blob)
       }, 'image/jpeg', 0.8) // 80% compressed jpeg file
     },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type   : 'warning'
      })
    },
    map(){
      let map   = new BMap.Map(this.$refs.allmap);                       // 创建Map实例
      var point = new BMap.Point(this.location.lng, this.location.lat);
      map.centerAndZoom(point, this.location.zoom);

      map.addControl(new BMap.NavigationControl());
      map.enableScrollWheelZoom();                            //启用滚轮放大缩小


      var marker = new BMap.Marker(point);  // 创建标注
      map.addOverlay(marker);              // 将标注添加到地图中
      marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
      
      var mylocation = this.location;
      map.addEventListener("click", function(e){
          
          map.clearOverlays();  //清除标注  或者可以把market 放入数组
          var point  = new BMap.Point(e.point.lng , e.point.lat);
          var marker = new BMap.Marker(point);
          map.addOverlay(marker);
          marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
          //alert(e.point.lng + ", " + e.point.lat);
          mylocation.lng  = e.point.lng;
          mylocation.lat  = e.point.lat;
          mylocation.zoom = map.getZoom(10);
      });

    }
  },
  mounted(){
    if(this.info.local){
      this.location = this.info.local
    }
    this.map();
    
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'info',
      'userdata',
    ]),
    getgender:{
      get(){
        return this.userdata.gender.toString();
      },
      set(newVal){
        this.userdata.gender = newVal;
      }
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
.img-user div{
  line-height: normal;
}
</style>

