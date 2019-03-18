<template>
    <div>
      <el-card>
        预约订单列表
        <!--<el-button @click="createOrder" size="small">新建订单</el-button>-->
        <el-table :data="appointmentData" style="width: 100%" max-height="400" v-loading="loading">
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

      <el-card style="margin-top:15px;">
        购卡订单列表
        <!--<el-button @click="createOrder" size="small">新建订单</el-button>-->
        <el-table :data="cardData" style="width: 100%" max-height="400" v-loading="loading">
          <el-table-column prop="idStr" label="订单编号">
          </el-table-column>
          <el-table-column prop="name" label="订单名称">
          </el-table-column>
          <el-table-column prop="dataType" label="订单类型" width="80">
          </el-table-column>
          <el-table-column prop="creation" label="下单时间">
          </el-table-column>
          <el-table-column prop="totalPrice" label="金额" width="80">
          </el-table-column>
          <el-table-column label="激活状态">
            <template slot-scope="scope">
              <div v-if="scope.row.isValidCard">已激活</div>
              <div v-else>未激活</div>
            </template>
          </el-table-column>
          <el-table-column prop="type" label="订单状态">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <template v-if="!scope.row.isValidCard">
                <el-button @click="openActivationDialog(scope.row.id)" size="mini">激活卡片</el-button>
              </template>
              <template v-if="scope.row.type != '已取消' && scope.row.type != '已完成'">
                <el-button @click="cancelOrder(scope.row.id)" size="mini">取消订单</el-button>
              </template>
            </template>
          </el-table-column>
        </el-table>
      </el-card>

      <el-dialog title="激活卡片" :visible.sync="dialog.activation" width="40%" v-loading="loadingCard">
        <el-form ref="activationForm" :model="activationForm" label-width="120px">
          <el-form-item label="有效期">
            <el-date-picker v-model="activationForm.date" type="daterange" range-separator="至"
                            start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialog.activation = false">取 消</el-button>
          <el-button type="primary" @click="activationCard">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
  import {getOrderListByFitnessId,updateOrderByFitnessId,updateCardValid} from '../../api/api'
  import util from '../../util/index'
  export default {
    data() {
      return {
        loading:false,
        loadingCard:false,
        tableData: [],
        appointmentData:[],
        cardData:[],
        fitnessId:0,
        orderId:0,
        dialog:{
          activation:false,
        },
        activationForm:{
          date:[],
        }
      }
    },
    methods:{
      openActivationDialog(id){
        this.orderId = id;
        this.dialog.activation = true;
      },
      activationCard(){
        let para = new FormData();
        para.append("id",this.orderId);
        para.append("fitnessId",this.fitnessId);
        para.append("beginTime",util.formatDate(this.activationForm.date[0],"yyyy-MM-dd"));
        para.append("endTime",util.formatDate(this.activationForm.date[1],"yyyy-MM-dd"));
        para.append("valid",true);
        this.loadingCard = true;
        updateCardValid(para).then(res=>{
          this.loadingCard = false;
          if (res.data.success) {
            this.$message.success(res.data.msg);
            this.getOrderList();
            this.dialog.activation = false;
          } else {
            this.$message.error(res.data.msg);
          }
        });
      },
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
        this.appointmentData = [];
        this.cardData =[]
        getOrderListByFitnessId(para).then(res=>{
          let data = res.data.data;
          console.log(data);
          for(let i=0;i<data.length;i++){
            if(data[i].dataType == "约课"){
              this.appointmentData.push(data[i]);
            }else{
              this.cardData.push(data[i]);
            }
          }
          this.loading = false;
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
