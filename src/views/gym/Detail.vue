<template>
    <div>
      <el-card>
        <el-button @click="cardDialog">新建卡片</el-button>
        <el-button @click="sportDialog">新建项目</el-button>

        <el-table :data="cardTable" border style="width: 100%">
          <el-table-column prop="name" label="卡片名称">
          </el-table-column>
          <el-table-column prop="subtitle" label="副标题">
          </el-table-column>
          <el-table-column prop="description" label="简介">
          </el-table-column>
          <el-table-column label="价格">
            <template slot-scope="scope">
              {{scope.row.price}}{{scope.row.unit}}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="removedCard(scope.row.id)">删除卡片</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-table :data="sportTable" border style="width: 100%">
          <el-table-column prop="name" label="卡片名称">
          </el-table-column>
          <el-table-column prop="description" label="简介">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="removedSport(scope.row.id)">删除卡片</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>

      <el-dialog title="新建卡片" :visible.sync="dialog.card" width="40%">
        <el-form :model="cardForm" label-width="120px">
          <el-form-item label="卡片名称">
            <el-input v-model="cardForm.name"></el-input>
          </el-form-item>
          <el-form-item label="副标题">
            <el-input v-model="cardForm.subtitle"></el-input>
          </el-form-item>
          <el-form-item label="简介">
            <el-input v-model="cardForm.description"></el-input>
          </el-form-item>
          <el-form-item label="单价">
            <el-input v-model="cardForm.price"></el-input>  <el-input v-model="cardForm.unit" style="width:50px;"></el-input>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialog.card = false">取 消</el-button>
          <el-button type="primary" @click="creatCards">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog title="新建项目" :visible.sync="dialog.sport" width="40%">
        <el-form :model="sportForm" label-width="120px">
          <el-form-item label="项目名称">
            <el-input v-model="sportForm.name"></el-input>
          </el-form-item>
          <el-form-item label="简介">
            <el-input v-model="sportForm.description"></el-input>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialog.card = false">取 消</el-button>
          <el-button type="primary" @click="creatSport">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
  import {queryFitnessRoomById,creatCards,removedCard,creatSport,removedSport} from '../../api/api'
  export default {
    data() {
      return {
        dialog:{
          card:false,
          sport:false,
        },
        cardForm:{
          name:"",
          subtitle:"",
          description:"",
          price:0,
          unit:"元"
        },
        sportForm:{
          name:"",
          description:"",
        },
        cardTable:[],
        sportTable:[],
      }
    },
    methods:{
      cardDialog(){
        this.dialog.card = true;
      },
      sportDialog(){
        this.dialog.sport = true;
      },
      creatCards(){
        let para = new FormData();
        para.append("fitnessId",6);
        para.append("name",this.cardForm.name);
        para.append("subtitle",this.cardForm.subtitle);
        para.append("description",this.cardForm.description);
        para.append("price",this.cardForm.price);
        para.append("unit",this.cardForm.unit);
        creatCards(para).then(res => {
          if(res.data.success){
            this.$message.success(res.data.msg);
          }else{
            this.$message.error(res.data.msg);
          }
        });
      },
      removedCard(id){
        let para = new FormData();
        para.append("fitnessId",6);
        para.append("cardId",id);
        removedCard(para).then(res => {
          if(res.data.success){
            this.$message.success(res.data.msg);
          }else{
            this.$message.error(res.data.msg);
          }
        });
      },
      removedSport(id){
        let para = new FormData();
        para.append("fitnessId",6);
        para.append("sportId",id);
        removedSport(para).then(res => {
          if(res.data.success){
            this.$message.success(res.data.msg);
          }else{
            this.$message.error(res.data.msg);
          }
        });
      },
      creatSport(){
        let para = new FormData();
        para.append("fitnessId",6);
        para.append("name",this.sportForm.name);
        para.append("subtitle",this.sportForm.subtitle);
        creatSport(para).then(res => {
          if(res.data.success){
            this.$message.success(res.data.msg);
          }else{
            this.$message.error(res.data.msg);
          }
        });
      },
    },
    mounted(){
      let para = new FormData();
      para.append("id",6);
      queryFitnessRoomById(para).then(res=>{
        let data = res.data.data;
        console.log(data);
        this.cardTable = data.cards;
        this.sportTable = data.sports;
      });
    }
  }
</script>

<style scoped>

</style>
