<template>
  <div class="app-container">
    <h3>申请商铺</h3>
    
  

<el-steps :active="active" finish-status="success">
  <el-step title="步骤 1"></el-step>
  <el-step title="步骤 2"></el-step>
  <el-step title="步骤 3"></el-step>
</el-steps>
<br><br>
<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

  <el-form-item label="商铺名称" prop="title">
    <el-input v-model="ruleForm.title"></el-input>
  </el-form-item>
  <el-form-item label="所在区域" prop="region">
    <el-cascader filterable size="large" :options="options" v-model="ruleForm.region" @change="handleChange">
    </el-cascader>
  </el-form-item>
  <el-form-item label="联系人" prop="user_name">
    <el-input v-model="ruleForm.user_name"></el-input>
  </el-form-item>
  <el-form-item label="手机号码" required>
    <el-col :xs="12" :sm="10">
      <el-form-item prop="phone">
        <el-input v-model="ruleForm.phone" maxlength="11"></el-input>
      </el-form-item>
    </el-col>
    <el-col :xs="12" :sm="5"><el-button type="primary" @click="getcode" :loading="yanzhengmaLoad">{{yanzhengmaText}}</el-button></el-col>
    </el-form-item>
    
      <el-form-item prop="code">
        <el-col :xs="6" :sm="4" ><el-input v-model="ruleForm.code" maxlength="6"></el-input></el-col>
      </el-form-item>
    
  </el-form-item>

  
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">确认申请</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
</div>
</template>
<script>
  import request from '@/utils/request'
  import qs from 'qs';
  import { regionData,CodeToText } from 'element-china-area-data'
  import { Message } from 'element-ui'
  export default {
    data() {
      var checkPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号不能为空'));
        } else {
          const reg = /^1[0-9]\d{9}$/
          console.log(reg.test(value));
          if (reg.test(value)) {
            callback();
          } else {
            return callback(new Error('请输入正确的手机号'));
          }
        }
      };

      return {
        yanzhengmaText    : '获得验证码',
        yanzhengmaText_old: '获得验证码',
        yanzhengmaLoad    : false,
        yanzhengmaTime    : 2,
        yanzhengmaTime_old: 12,
        yaozhengmatimeOut : null,
        active            : 0,
        options           : regionData,
        CodeToText,
        listLoading: false,
        data       : null,
        ruleForm   : {
          title      : '',
          region     : '',
          region_name: '',
          user_name  : '',
          phone      : '',
          code       : '',
        },
        rules:{
          title:[
            { required:true, message:'请输入商铺名称', trigger:'blur' }
          ],
          region:[
            { required:true, message:'请选择活动区域', trigger:'change' }
          ],
          user_name:[
            { required:true, message:'请输入联系人姓名', trigger:'change' },
            { min:2, max:20, message:'长度在 2 到 20 个字符', trigger:'blur' }
          ],
          phone: [
            { required:true, message:'请输入联系人手机号码', trigger:'change' },
            {validator: checkPhone, trigger: 'blur'}
          ],
          code: [
            { required:true, message:'请输入手机验证码', trigger:'change' },
            { min:6, max:6, message:'长度在 6 个字符', trigger:'blur' }
          ],
        }
      }
  },
    methods:{
      SetYanZhengMa(){
        if(this.yanzhengmaTime>0){
          this.yanzhengmaTime--;this.yanzhengmaLoad = true;this.yanzhengmaText = '重新发送('+this.yanzhengmaTime+')';let _this = this;this.yaozhengmatimeOut = setTimeout(() => {_this.SetYanZhengMa();}, 1000);
        }else{
          this.yanzhengmaLoad = false;
          this.yanzhengmaText = this.yanzhengmaText_old;
          clearTimeout(this.yaozhengmatimeOut);
        }
      },
      getcode(){
        if(this.ruleForm.phone){
          this.listLoading = true
          request({url: '/user/phone?phone='+this.ruleForm.phone+'&code='+this.ruleForm.code,method: 'get'}).then(response => {
            //this.data = response.data
            Message({
              message : response.message,
              type    : 'info',
              duration: 5 * 1000
            })
            this.listLoading    = false
            this.yanzhengmaTime = this.yanzhengmaTime_old
            this.SetYanZhengMa()
            if(response.c>0){this.code = response.c}
          }).catch((error)=>{
            this.code = ''
          })
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.ruleForm.region_name = ''
            for (const key in this.ruleForm.region) {
              console.log('key=',key,this.ruleForm.region[key])
                const element                    = this.ruleForm.region[key];
                      this.ruleForm.region_name += this.CodeToText[element]+"\n"
            }
            var data             = qs.stringify(this.ruleForm);
                this.listLoading = true
      request({url: '/seller/apply',method: 'post',data}).then(response => {
        this.listLoading = false
        this.$message({
          message: '您的开店申请已经提交，稍后有客户服务人员联系您。',
          type   : 'success'
        })
      }).catch(
        (err) => { this.listLoading = false }
      );

          } else {
              console.log('error submit!!')
            return false
          }
        })
    },
      handleChange(value) {
        console.log(value, this.ruleForm.region)
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
    }
    }
  }
</script>




