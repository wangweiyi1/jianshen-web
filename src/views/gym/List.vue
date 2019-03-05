<template>
    <div>
      <el-card>
        <el-button @click="createOrder" size="mini">新建会馆</el-button>
        <el-button @click="userDialog = true" size="mini">创建会馆账号</el-button>
        <el-table :data="tableData" style="width: 100%" v-loading="loading">
          <el-table-column label="会馆名称">
            <template slot-scope="scope">
              <el-button type="text" @click="linkDetail(scope.row.id)">{{scope.row.name}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="typeName" label="会馆类型">
          </el-table-column>
          <el-table-column prop="callNumber" label="联系电话">
          </el-table-column>
          <el-table-column prop="location" label="地址">
          </el-table-column>
          <el-table-column prop="type" label="操作">
            <template slot-scope="scope">
              <el-button @click="removedFitnessRoomById(scope.row.id)" size="mini">删除会馆</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>

      <el-dialog title="创建账号" :visible.sync="userDialog" width="500px" v-loading="userLoading">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="手机号">
            <el-input v-model="form.tel"></el-input>
          </el-form-item>
          <el-form-item label="会馆">
            <el-select v-model="form.user" placeholder="请选择">
              <el-option v-for="item in userOptions" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="userDialog = false">取 消</el-button>
          <el-button type="primary" @click="createUser">创 建</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
  import {queryFitnessRoomByType,removedFitnessRoomById,listAccount,createUser} from '../../api/api'
  export default {
    data() {
      return {
        userLoading:false,
        loading:false,
        userDialog:false,
        tableData: [],
        userOptions:[],
        form:{
          user:"",
          tel:"",
        },
      }
    },
    methods:{
      createOrder(){
        this.$router.push({ path: '/gym/create' })
      },
      linkDetail(id){
        this.$router.push({ path: '/gym/detail' , query:{id:id} })
      },
      removedFitnessRoomById(id){
        let para = new FormData();
        para.append("id",id);
        removedFitnessRoomById(para).then(res=>{
          if(res.data.success){
            this.$message.success(res.data.msg);
            this.listAccount();
          }else{
            this.$message.error(res.data.msg);
          }
        });
      },
      queryFitnessRoomByType(){
        this.loading = true;
        queryFitnessRoomByType().then(res => {
          this.loading = false;
          this.tableData = res.data.data;
        });
      },
      listAccount(){
        this.form.user = "";
        this.form.tel = "";
        listAccount().then(res => {
          this.userOptions = res.data.data;
        });
      },
      createUser(){
        if(this.form.tel == ""){
          this.$message.error("请输入手机号");
          return;
        }
        if(this.form.user == ""){
          this.$message.error("请选择会馆");
          return;
        }
        let gym = {};
        for(let i=0;i<this.userOptions.length;i++){
          if(this.userOptions[i].id == this.form.user){
            gym = this.userOptions[i];
            break;
          }
        }
        let para = new FormData();
        para.append("roomId",gym.id);
        para.append("account",this.form.tel);
        para.append("name",gym.name);
        para.append("tel",this.form.tel);
        para.append("roleIds[0]","38");
        this.userLoading = true;
        createUser(para).then(res => {
          this.userLoading = false;
          if (res.data.success) {
            this.$message.success(res.data.msg);
            this.userDialog = false;
            this.listAccount();
          } else {
            this.$message.error(res.data.msg);
          }
        });
      },
    },
    mounted(){
      this.queryFitnessRoomByType();
      this.listAccount();
    }
  }
</script>

<style scoped>

</style>
