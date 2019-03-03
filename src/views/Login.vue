<template>
  <el-row class="container">
    <div class="form-container">
      <el-form :model="form" :rules="rules" ref="form" label-position="left" label-width="0px" class="demo-ruleForm login-container">
        <el-form-item prop="account" style="margin-top: 22px">
          <el-input type="text" v-model="form.account" auto-complete="off" placeholder="账号" @keyup.enter.native="loginRequest"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="form.password" auto-complete="off" placeholder="密码" @keyup.enter.native="loginRequest"></el-input>
          <el-button type="text" style="float: right;color:rgb(32, 160, 255)" @click.native.prevent="forgetPwd">忘记密码</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%;" @click.native.prevent="loginRequest">登&nbsp;&nbsp;&nbsp;录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-row>
</template>

<script>
  import {login} from '../api/api';
  export default {
    data() {
      return {
        form: {
          account: '',
          password: ''
        },
        rules: {
          account: [
            {required: true, message: '请输入账号', trigger: 'blur'},
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
          ]
        },
      };
    },
    mounted () {

    },
    methods: {
      loginRequest() {
        let para = new FormData();
        para.append('account', this.form.account);
        para.append('password', this.form.password);
        login(para).then(data => {
          let Data = data.data;
          let status = Data.status;
          if (status) {
            let loginTime = Date.parse(new Date());
            let loginParams = {
              userId: Data.userId,
              userName: Data.userName,
              token: Data.token,
              authority:Data.authority
            };
            if(Data.authority == 'manager'){
              loginParams.roomId = Data.roomId;
            }
            localStorage.setItem('user', JSON.stringify(loginParams));
            if(Data.authority == 'supermanager'){
              this.$router.push({path: "/gym/list"});
            }else{
              this.$router.push({path: "/gym/detail"});
            }
          } else {
            this.$message.error(Data.retMsg);
          }
        })
      }
    }
  }
</script>
<style scoped>
  .container{
    height:100%;
  }

  .form-container {
    position: absolute;
    top: 0px;
    width: 100%;
  }

  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 0px auto;
    margin-top: 180px;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    opacity: 0.9;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
</style>
