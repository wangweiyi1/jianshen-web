<template>
    <div>
      <el-card>
        <!--<el-button @click="createOrder" size="small">新建订单</el-button>-->
        <el-table :data="tableData" style="width: 100%" max-height="600" v-loading="loading">
          <el-table-column prop="idStr" label="订单编号">
          </el-table-column>
          <el-table-column prop="name" label="订单名称">
          </el-table-column>
          <el-table-column prop="dataType" label="订单类型" width="80">
          </el-table-column>
          <el-table-column prop="address" label="上门地址" width="200">
          </el-table-column>
          <el-table-column prop="creation" label="下单时间">
          </el-table-column>
          <el-table-column prop="totalPrice" label="金额" width="80">
          </el-table-column>
          <el-table-column prop="type" label="订单状态">
          </el-table-column>
          <el-table-column prop="type" label="购买人">
            <template slot-scope="scope">
              <template v-if="scope.row.dataType == '约课'">
                {{scope.row.user.name}}
              </template>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <template v-if="scope.row.type != '已取消' && scope.row.type != '已完成'">
                <el-button @click="cancelOrder(scope.row.id)" size="mini">取消订单</el-button>
              </template>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
</template>

<script>
  import {getOrderListByFitnessId,updateOrderByFitnessId} from '../../api/api'
  export default {
    data() {
      return {
        loading:false,
        tableData: [],
        fitnessId:0,
      }
    },
    methods:{
      createOrder(){
        this.$router.push({ path: '/order/create' });
      },
      cancelOrder(id){
        let para = new FormData();
        para.append("fitnessId",this.fitnessId);
        para.append("id",id);
        para.append("type",'cancel');
        updateOrderByFitnessId(para).then(res=>{
          if (res.data.success) {
            this.$message.success(res.data.msg);
            this.getOrderList();
          } else {
            this.$message.error(res.data.msg);
          }
        });
      },
      getOrderList(){
        let para = new FormData();
        para.append("fitnessId",this.fitnessId);
        this.loading = true;
        getOrderListByFitnessId(para).then(res=>{
          let data = res.data.data;
          this.loading = false;
          this.tableData = data;
        });
      }
    },
    mounted(){
      let user = JSON.parse(localStorage.getItem('user'));
      this.fitnessId = user.roomId;
      this.getOrderList();
    }
  }
</script>

<style scoped>

</style>
