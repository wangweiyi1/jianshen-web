<template>
  <div class="home-container">
    <el-container style="height: 100%;">
      <el-aside class="aside-container" width="200px">
        <div class="logo-container">
          <img src="../assets/logo.jpeg"></img>
          打包健身
        </div>
        <el-menu :default-active="menuActive" router background-color="#545c64"
                 text-color="#fff"
                 active-text-color="#ffd04b">
          <el-menu-item index="/gym/list">
            <i class="el-icon-tickets"></i>
            <span slot="title">健身房列表</span>
          </el-menu-item>
          <el-menu-item index="/order/list">
            <i class="el-icon-tickets"></i>
            <span slot="title">订单列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>王小虎</span>
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
        menuActive:"/order/list"
      }
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
