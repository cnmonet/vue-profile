<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClickTable">
    <el-tab-pane label="角色管理" name="first">

    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="用户头像"  class="img-user">
        <template slot-scope="scope" style="line-height: inherit;">
        <croppa v-model="form.myCroppa" :width="250"
         :height="250" :initial-image="form.avatar" ></croppa>
         </template>
      </el-form-item>
      
      <el-form-item label="用户名">
        {{form.name}}
      </el-form-item>
      <el-form-item label="邮箱">
        {{form.email}}
      </el-form-item>
      <el-form-item label="真名">
        <el-input v-model="form.real_name"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="form.gender">
          <el-option label="未知" value="0"></el-option>
          <el-option label="男" value="1"></el-option>
          <el-option label="女" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="生日">
        <el-date-picker v-model="form.birthday" align="right" type="date" placeholder="选择日期">
    </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定修改</el-button>
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
        <el-button type="primary" @click="onSubmitp">修改密码</el-button>
      </el-form-item>
      </el-form>
    </el-tab-pane>

    <el-tab-pane label="我的位置" name="third">
      <el-form label-width="120px" :model="location" status-icon :rules="rules3" ref="location" >
        <div id="allmap" ref="allmap" style="margin-top:20px;width:800px;height:600px;"></div>

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
        <el-button type="primary" @click="onSubmitl">修改位置</el-button>
      </el-form-item>
      </el-form>
    </el-tab-pane>
    
  </el-tabs>
  </div>
</template>

<script>
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
          this.$refs.formpass.validateField('opassword');
        }
        callback();
      }
    };
    return {
      activeName: 'first',
      form      : {
        myCroppa : {},
        avatar   : 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name     : 'admin',
        email    : 'zxg321@qq.com',
        real_name: 'zxg321',
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
      if(tab.name='third'){
        setTimeout(() => {
          this.map()
        }, 1000);
        
      }
    },
    onSubmitp(){},
    onSubmitl(){},
    onSubmit() {
      var dataUrl = this.form.myCroppa.generateDataUrl('image/jpeg', 0.8)
      console.log(dataUrl)
      this.$message(dataUrl)
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
    this.map()
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
.img-user .el-form-item__content {
  line-height: inherit;
}
</style>

