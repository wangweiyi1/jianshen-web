<template>
    <div>
      <el-card>
        <el-table :data="tableData" style="width: 100%" v-loading="loading" max-height="400">
          <el-table-column label="姓名" prop="name">
          </el-table-column>
          <el-table-column prop="gender" label="性别">
          </el-table-column>
          <el-table-column prop="introduction" label="简介">
          </el-table-column>
          <el-table-column prop="goodness" label="标签">
          </el-table-column>
          <el-table-column prop="auditStatus" label="审核状态">
          </el-table-column>
          <el-table-column prop="type" label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="detail(scope.row.id)">详细信息</el-button>
              <template v-if="scope.row.auditStatus == '待审核'">
                <el-button type="text" @click="audit(scope.row.id,'pass')">通过</el-button>
                <el-button type="text" @click="audit(scope.row.id,'fail')">拒绝</el-button>
              </template>
              <el-button type="text" @click="audit(scope.row.id,'pass')">通过</el-button>
              <el-button type="text" @click="audit(scope.row.id,'fail')">拒绝</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>

      <el-dialog title="教练详情" :visible.sync="coachDialog" width="60%">
        <el-form ref="coach" :model="coach" label-width="120px">
          <el-form-item label="" v-if="coach.headPic">
            <img :src="'http://www.dabaojianshen.com:9001/' + coach.headPic.visitPath" width="100px" height="100px">
          </el-form-item>
          <el-form-item label="教练姓名">
            {{coach.name}}
          </el-form-item>
          <el-form-item label="联系方式">
            {{coach.tel}}
          </el-form-item>
          <el-form-item label="教练简介">
            {{coach.introduction}}
          </el-form-item>
          <el-form-item label="教练标签">
            <template v-for="item in coach.goodness">
              <el-tag style="margin-right:10px;">{{item}}</el-tag>
            </template>
          </el-form-item>
          <el-form-item label="工作周期">
            {{coach.workDay}}
          </el-form-item>
          <el-form-item label="工作时间">
            <template v-for="item in coach.scheduleVoList">
              <span>{{item.beginTime}} - {{item.endTime}}</span><br>
            </template>
          </el-form-item>
          <el-form-item label="收费">
            {{coach.amount}}/小时
          </el-form-item>
          <el-form-item label="身份证照片" v-if="coach.headPic">
            <img :src="'http://www.dabaojianshen.com:9001/' + coach.frontIDCardPic" width="200px" height="100px">
            <img :src="'http://www.dabaojianshen.com:9001/' + coach.backIdCardPic" width="200px" height="100px">
            <img :src="'http://www.dabaojianshen.com:9001/' + coach.personIdCardPic" width="200px" height="100px">
          </el-form-item>
          <el-form-item label="证件照" v-if="coach.headPic">
            <img :src="'http://www.dabaojianshen.com:9001/' + coach.credentialsPic" width="200px" height="100px">
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
</template>

<script>
  import {listCondition,review} from '../../api/api'
  export default {
    data(){
      return {
        loading:false,
        tableData:[],
        coachDialog:false,
        coach:{},
      }
    },
    methods:{
      audit(id,state){
        if(state == 'pass'){
          this.$confirm('确定给该教练通过审核？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          }).then(() => {
            let para = new FormData();
            para.set("coachId",id);
            para.set("status",state);
            review(para).then(res=>{
              this.$message({
                type: 'success',
                message: '审核成功'
              });
              this.getList();
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消操作'
            });
          });
        }else{
          this.$prompt('', '请写出拒绝原因', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          }).then((value) => {
            let para = new FormData();
            para.set("coachId",id);
            para.set("status",state);
            para.set("review",value.value);
            review(para).then(res=>{
              this.$message({
                type: 'success',
                message: '操作成功'
              });
              this.getList();
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消操作'
            });
          });
        }
      },
      detail(id){
        this.coach = {...this.tableData.find((item) => {
          return item.id == id;
        })};
        this.coach.goodness = this.coach.goodness.split(",");
        this.coachDialog = true;
      },
      getList(){
        let para = new FormData();
        para.append("roomId", -1);
        this.loading = true;
        listCondition(para).then(res => {
          this.loading = false;
          let data = res.data.data;
          this.tableData = data;
        })
      }
    },
    created(){
      this.getList();
    }
  }
</script>

<style scoped>

</style>
