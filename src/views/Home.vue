<template>
  <div class="home-container">
    <el-container style="height: 100%;">
      <el-aside class="aside-container" width="200px">
        <div class="logo-container">
          <img src="../assets/logo.jpeg"></img>
          打包健身
        </div>
        <el-menu :default-active="menuActive" router background-color="#545c64"
                 text-color="#fff" active-text-color="#ffd04b">
          <el-menu-item index="/gym/list" v-show="authority == 'supermanager'">
            <i class="el-icon-tickets"></i>
            <span slot="title">会馆列表</span>
          </el-menu-item>
          <el-menu-item index="/coach/list" v-show="authority == 'supermanager'">
            <i class="el-icon-tickets"></i>
            <span slot="title">个人教练列表</span>
          </el-menu-item>
          <el-menu-item index="/gym/detail" v-show="authority == 'manager'">
            <i class="el-icon-tickets"></i>
            <span slot="title">会馆详情</span>
          </el-menu-item>
          <el-menu-item index="/order/list" v-show="authority == 'manager'">
            <i class="el-icon-tickets"></i>
            <span slot="title">订单列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <span style="cursor: pointer;">{{user.userName}}</span>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>

        <el-main>
          <transition name="fade" mode="out-in">
            <router-view/>
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data () {
      return {
        menuActive:"/gym/list",
        user:{},
        authority:"",
      }
    },
    methods:{
      logout(){
        this.$confirm('是否确认退出登录', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          localStorage.removeItem('user');
          this.$router.push({ path: '/login' });
        }).catch(() => {

        });
      }
    },
    mounted(){
      this.user = JSON.parse(localStorage.getItem('user'));
      if(this.user.authority == 'supermanager'){
        this.menuActive = '/gym/list';
      }else{
        this.menuActive = '/gym/detail';
      }
      this.authority = this.user.authority;
    }
  }
</script>

<style>
  @import "../style/global.css";
</style>

<style scoped>
  .home-container{
    height:100%;
  }

  .el-header {
    background-color: #fff;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }

  .aside-container{
    background: #545c64;
    /*border-right:1px solid #545c64;*/
    box-shadow: rgba(0, 0, 0, 0.05) 2px 0px 1px 0px;
  }

  .el-menu{
    border:0;
  }

  .logo-container{
    display: flex;
    justify-items: center;
    align-items: center;
    padding:10px 20px;
    font-size:18px;
    background: #fff;
    font-weight: 500;
    /*text-align: center;*/
  }

  .logo-container img{
    width:40px;
    height:40px;
  }
</style>
