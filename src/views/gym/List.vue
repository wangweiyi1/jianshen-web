<template>
    <div>
      <el-card>
        <el-button @click="createOrder" size="mini">新建会馆</el-button>
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
    </div>
</template>

<script>
  import {queryFitnessRoomByType,removedFitnessRoomById} from '../../api/api'
  export default {
    data() {
      return {
        loading:false,
        tableData: []
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
            this.queryFitnessRoomByType();
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
        })
      }
    },
    mounted(){
      this.queryFitnessRoomByType();
    }
  }
</script>

<style scoped>

</style>
