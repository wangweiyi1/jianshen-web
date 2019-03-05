<template>
  <div>
    <el-card>
      <el-row>
        <el-col :span="24" class="gym-attribute">
          <img v-if="information.profilePhoto && information.profilePhoto.length > 0" style="width:200px;height:200px;"
               :src="'http://www.dabaojianshen.com:9001/' + information.profilePhoto[0].visitPath">
        </el-col>
        <el-col :span="12" class="gym-attribute">
          <span class="title">会馆名:</span>
          {{information.name}}
        </el-col>
        <el-col :span="12" class="gym-attribute">
          <span class="title">营业时间:</span>
          {{information.businessHours}}
        </el-col>
        <el-col :span="12" class="gym-attribute">
          <span class="title">开业时间:</span>
          {{information.openingDate}}
        </el-col>
        <el-col :span="12" class="gym-attribute">
          <span class="title">会馆类型:</span>
          {{information.typeName}}
        </el-col>

        <el-col :span="24" class="gym-attribute">
          <span class="title">会馆简介:</span>
          {{information.description}}
        </el-col>

        <el-col :span="24" class="gym-attribute" style="text-align: right;">
          <el-button size="mini" @click="dialog.updatePhoto = true">修改首页图</el-button>
          <el-button size="mini" @click="dialog.detailPhotos = true">修改轮播图</el-button>
          <el-button size="mini" @click="dialog.updateGym = true">修改会馆信息</el-button>
        </el-col>
      </el-row>
    </el-card>

    <el-card style="margin-top:15px;">
      <el-button @click="coachDialog" size="small">新建教练</el-button>
      <el-table :data="coachTable" border style="width: 100%;margin-top:10px;" v-loading="loading.coath"
                max-height="300">
        <el-table-column prop="name" label="教练">
        </el-table-column>
        <el-table-column prop="age" label="年龄">
        </el-table-column>
        <el-table-column prop="tel" label="联系电话">
        </el-table-column>
        <el-table-column prop="goodness" label="特色">
        </el-table-column>
        <el-table-column prop="level" label="星级">
        </el-table-column>
        <el-table-column prop="amount" label="单次价格">
        </el-table-column>
        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            <el-button @click="getSchedule(scope.row)" size="mini">查看日程</el-button>
            <el-button @click="updateCoach(scope.row)" size="mini">修改</el-button>
            <el-button @click="deleteCoach(scope.row.id)" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-card style="margin-top:15px;">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-button @click="cardDialog" size="small">新建卡片</el-button>
          <el-table :data="cardTable" border style="width: 100%;margin-top:10px;" v-loading="loading.detail"
                    max-height="300">
            <el-table-column prop="name" label="卡片名称">
            </el-table-column>
            <el-table-column prop="subtitle" label="副标题">
            </el-table-column>
            <el-table-column prop="description" label="类型">
            </el-table-column>
            <el-table-column label="价格">
              <template slot-scope="scope">
                {{scope.row.price}}{{scope.row.unit}}
              </template>
            </el-table-column>
            <el-table-column label="操作" min-width="120">
              <template slot-scope="scope">
                <el-button @click="updateCard(scope.row)" size="mini">修改</el-button>
                <el-button @click="removedCard(scope.row.id)" size="mini">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>

        <el-col :span="12">
          <el-button @click="sportDialog" size="small">新建项目</el-button>
          <el-table :data="sportTable" border style="width: 100%;margin-top:10px;" v-loading="loading.detail"
                    max-height="300">
            <el-table-column prop="name" label="卡片名称">
            </el-table-column>
            <el-table-column prop="description" label="简介">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button @click="updateSport(scope.row)" size="mini">修改</el-button>
                <el-button @click="removedSport(scope.row.id)" size="mini">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-card>

    <el-dialog title="修改会馆信息" :visible.sync="dialog.updateGym" width="40%">
      <el-form ref="gymForm" :model="gymForm" label-width="120px">
        <el-form-item label="会馆名称">
          <el-input v-model="gymForm.name"></el-input>
        </el-form-item>
        <el-form-item label="会馆等级">
          <el-input-number v-model="gymForm.grade" :step="1" :max="5" class="input-number"></el-input-number>
        </el-form-item>
        <el-form-item label="会馆简介">
          <el-input v-model="gymForm.description" type="textarea" style="width:400px;"></el-input>
        </el-form-item>
        <el-form-item label="会馆类型">
          <el-radio-group v-model="gymForm.type">
            <el-radio label="gymnasium">健身馆</el-radio>
            <el-radio label="yoga_gym">瑜伽馆</el-radio>
            <el-radio label="fight_club">搏击馆</el-radio>
            <el-radio label="work_room">工作室</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="经纬度">
          <el-input v-model="gymForm.lng" placeholder="经度" style="width:100px;"></el-input>
          <el-input v-model="gymForm.lat" placeholder="纬度" style="width:100px;"></el-input>
        </el-form-item>
        <el-form-item label="营业时间">
          <el-time-picker is-range v-model="gymForm.businessHours" range-separator="至"
                          start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围">
          </el-time-picker>
        </el-form-item>
        <el-form-item label="会馆地址">
          <el-input v-model="gymForm.location"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="gymForm.callNumber"></el-input>
        </el-form-item>
        <el-form-item label="特色或优势">
          <el-input v-model="gymForm.feature"></el-input>
        </el-form-item>
        <el-form-item label="开业日期">
          <el-date-picker v-model="gymForm.openingDate" type="date" placeholder="选择开业日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="是否停业">
          <el-radio-group v-model="gymForm.isFlagBusiness">
            <el-radio :label="false">否</el-radio>
            <el-radio :label="true">是</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="停业原因" v-if="gymForm.isFlagBusiness">
          <el-input v-model="gymForm.shutdownReason"></el-input>
        </el-form-item>
        <el-form-item label="人气值">
          <el-input-number v-model="gymForm.popularity" :precision="2" :step="0.5" :max="5"></el-input-number>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog.updateGym = false">取 消</el-button>
        <el-button type="primary" @click="updateGym">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog :title="cardTitle" :visible.sync="dialog.card" width="40%">
      <el-form ref="cardForm" :model="cardForm" label-width="120px">
        <el-form-item label="卡片名称">
          <el-input v-model="cardForm.name"></el-input>
        </el-form-item>
        <el-form-item label="副标题">
          <el-input v-model="cardForm.subtitle"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-input v-model="cardForm.description"></el-input>
        </el-form-item>
        <el-form-item label="单价">
          <el-input v-model="cardForm.price"></el-input>
          <el-input v-model="cardForm.unit" style="width:50px;"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog.card = false">取 消</el-button>
        <el-button type="primary" @click="creatCards">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog :title="sportTitle" :visible.sync="dialog.sport" width="40%">
      <el-form ref="sportForm" :model="sportForm" label-width="120px">
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

    <el-dialog title="更换首页图" :visible.sync="dialog.updatePhoto" width="40%">
      <input ref="image1" type="file" name="file"/>

      <span slot="footer" class="dialog-footer">
          <el-button @click="dialog.updatePhoto = false">取 消</el-button>
          <el-button type="primary" @click="uploadprofilePhoto">确 定</el-button>
        </span>
    </el-dialog>

    <el-dialog title="修改轮播图" :visible.sync="dialog.detailPhotos" width="800">
      <el-row :gutter="20">
        <!--<template v-for="(photo,index) in detailPhotos">-->
          <!--<el-col :span="6" style="text-align: center;position: relative;">-->
            <!--<input :ref="'detailPhoto'+index" type="file" name="file" style="position: absolute;left:0;top:0;opacity: 0;"-->
                   <!--@change="uploadDetailsPhoto(index)"/>-->
            <!--<img :src="'http://www.dabaojianshen.com:9001/' + photo.visitPath" class="detail-photo"/><br>-->
            <!--<el-button @click="removedPhoto(photo.id)" size="mini">删除图{{index + 1}}</el-button>-->
          <!--</el-col>-->
        <!--</template>-->
        <el-upload
          action="https://www.dabaojianshen.com/fitnessRoom/uploadDetailsPhoto" name="detailsPhoto" :file-list="fileList"
          list-type="picture-card" :data="fileData" :before-remove="removedPhoto">
          <i class="el-icon-plus"></i>
        </el-upload>
        <!--<el-col :span="6">-->
          <!--<div class="avatar-uploader" @click="addDetailPhoto">-->
            <!--<i class="el-icon-plus avatar-uploader-icon"></i>-->
          <!--</div>-->
        <!--</el-col>-->
      </el-row>

      <span slot="footer" class="dialog-footer">
          <el-button @click="dialog.detailPhotos = false">取 消</el-button>
          <el-button type="primary" @click="dialog.detailPhotos = false">确 定</el-button>
        </span>
    </el-dialog>

    <el-dialog :title="coachTitle" :visible.sync="dialog.coath" width="50%">
      <el-form :model="coathForm" label-width="160px">

        <el-form-item label="" v-if="coathForm.path != ''">
          <img style="width:100px;height:100px;"
               :src="'http://www.dabaojianshen.com:9001/' + coathForm.path">
        </el-form-item>
        <el-form-item label="照片">
          <input ref="coathPhoto" type="file" name="file"/>
        </el-form-item>
        <el-form-item label="教练名">
          <el-input v-model="coathForm.name"></el-input>
        </el-form-item>
        <el-form-item label="简介">
          <el-input v-model="coathForm.introduction"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="coathForm.email"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="coathForm.gender">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="coathForm.tel"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="coathForm.age"></el-input>
        </el-form-item>
        <el-form-item label="评级">
          <el-input v-model="coathForm.level"></el-input>
        </el-form-item>
        <el-form-item label="单次预约价格">
          <el-input v-model="coathForm.amount"></el-input>
        </el-form-item>
        <el-form-item label="擅长项目(逗号分隔)">
          <el-input v-model="coathForm.goodness"></el-input>
        </el-form-item>
        <el-form-item label="预约时间" v-if="coachTitle == '新建教练'">
          <el-time-select
            placeholder="起始时间" v-model="coathForm.schedules[0].beginTime"
            :picker-options="{start: '09:00',step: '01:00',end: '20:00'}">
          </el-time-select>
          <el-time-select
            placeholder="结束时间" v-model="coathForm.schedules[0].endTime"
            :picker-options="{start: '09:00',step: '01:00',end: '20:00',minTime: coathForm.schedules[0].beginTime}">
          </el-time-select>
        </el-form-item>
        <template v-for="(item,index) in coathForm.schedules" v-if="coachTitle == '新建教练'">
          <el-form-item label=" " v-if="index != 0">
            <el-time-select
              placeholder="起始时间" v-model="coathForm.schedules[index].beginTime"
              :picker-options="{start: '09:00',step: '01:00',end: '20:00'}">
            </el-time-select>
            <el-time-select
              placeholder="结束时间" v-model="coathForm.schedules[index].endTime"
              :picker-options="{start: '09:00',step: '01:00',end: '20:00',minTime: coathForm.schedules[index].beginTime}">
            </el-time-select>
            <i class="icon el-icon-error" @click="deleteSchedules(index)"></i>
          </el-form-item>
        </template>
        <template v-else>
          <el-form-item label="预约时间">
            <template v-for="item in coathForm.scheduleVoList">
              {{item.beginTime}} - {{item.endTime}}<br>
            </template>
          </el-form-item>
        </template>
        <el-form-item label=" " v-if="coachTitle == '新建教练'">
          <el-button size="mini" @click="addSchedules">添加预约时间</el-button>
        </el-form-item>

      </el-form>

      <span slot="footer" class="dialog-footer">
          <el-button @click="dialog.coath = false">取 消</el-button>
          <el-button type="primary" @click="createCoach">确 定</el-button>
        </span>
    </el-dialog>

    <el-dialog title="日程信息" :visible.sync="dialog.schedule" width="40%">
      <el-table :data="scheduleTable" style="width: 100%" max-height="400" v-loading="loading.coachTable">
        <el-table-column prop="beginTime" label="开始时间">
        </el-table-column>
        <el-table-column prop="endTime" label="结束时间">
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            {{scope.row.status == '1' ? '已预约' : '未预约'}}
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
  import {
    queryFitnessRoomById,
    creatCards,
    removedCard,
    creatSport,
    removedSport,
    uploadprofilePhoto,
    getSchedule,
    updateCoach,
    uploadDetailsPhoto,
    removedPhoto,
    listCondition,
    createCoach,
    updateFitnessRoom,
    updateSport,
    updateCards,
    deleteCoach
  } from '../../api/api'
  import util from '../../util/index'

  export default {
    data() {
      return {
        dialog: {
          card: false,
          sport: false,
          coath: false,
          updatePhoto: false,
          detailPhotos: false,
          updateGym: false,
          schedule: false,
        },
        loading: {
          detail: false,
          coath: false,
          coachTable: false,
        },
        gymForm: {
          name: "",
          grade: 5,
          description: "",
          lng: "",
          lat: "",
          callNumber: "",
          businessHours: [new Date(2016, 9, 10, 9, 0), new Date(2016, 9, 10, 17, 0)],
          location: "",
          feature: "",
          openingDate: "",
          isFlagBusiness: false,
          shutdownReason: "",
          popularity: 5,
          type: "gymnasium",
        },
        cardForm: {
          name: "",
          subtitle: "",
          description: "",
          price: 0,
          unit: "元"
        },
        sportForm: {
          name: "",
          description: "",
        },
        coathForm: {
          name: "",
          introduction: "",
          email: "",
          gender: "男",
          tel: "",
          age: "",
          level: "",
          amount: "",
          goodness: "",
          beginTime: "",
          endTime: "",
          schedules: [{
            beginTime: "",
            endTime: "",
          }],
          path: "",
        },
        cardTitle: "新建卡片",
        sportTitle: "新建项目",
        coachTitle: "新建教练",
        cardTable: [],
        sportTable: [],
        coachTable: [],
        information: {},
        detailPhotos: [],
        scheduleTable: [],
        fileList:[],
        fitnessId: 0,
        fileData:{
          id:0
        }
      }
    },
    methods: {
      coachDialog() {
        this.dialog.coath = true;
        this.coachTitle = "新建教练";
        this.coathForm = {
          name: "",
          introduction: "",
          email: "",
          gender: "男",
          tel: "",
          age: "",
          level: "",
          amount: "",
          goodness: "",
          beginTime: "",
          endTime: "",
          schedules: [{
            beginTime: "",
            endTime: "",
          }],
          path: "",
        };
      },
      updateCoach(row) {
        this.coachTitle = "修改教练";
        this.dialog.coath = true;
        this.coathForm = {
          id:row.id,
          name: row.name,
          introduction: row.introduction,
          email: row.email,
          gender: row.gender,
          tel: row.tel,
          age: row.age,
          level: row.level,
          amount: row.amount,
          goodness: row.goodness,
          beginTime: row.beginTime,
          endTime: row.endTime  ,
          schedules: [{
            beginTime: "",
            endTime: "",
          }],
          path: row.headPic.visitPath,
          scheduleVoList:row.scheduleVoList,
        };
      },
      deleteCoach(id){
        this.$confirm('是否确认删除', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let para = new FormData();
          para.append("roomId", this.fitnessId);
          para.append("id", id);
          deleteCoach(para).then(res => {
            if (res.data.success) {
              this.$message.success(res.data.msg);
              this.getCoathList();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        }).catch(() => {

        });
      },
      getSchedule(row) {
        this.dialog.schedule = true;
        let para = new FormData();
        para.append("coachId", row.id);
        this.loading.coachTable = true;
        getSchedule(para).then(res => {
          this.loading.coachTable = false;
          this.scheduleTable = res.data.data;
        });
      },
      cardDialog() {
        this.cardTitle = "新建卡片";
        this.dialog.card = true;
        this.cardForm = {
          name: "",
          subtitle: "",
          description: "",
          price: 0,
          unit: "元"
        };
      },
      updateCard(row) {
        this.cardTitle = "修改卡片";
        this.dialog.card = true;
        this.cardForm = {
          name: row.name,
          subtitle: row.subtitle,
          description: row.description,
          price: row.price,
          unit: row.unit,
          id: row.id
        };
      },
      sportDialog() {
        this.sportTitle = "新建项目";
        this.dialog.sport = true;
        this.sportForm = {
          name: "",
          description: ""
        };
      },
      updateSport(row) {
        this.sportTitle = "修改项目";
        this.dialog.sport = true;
        this.sportForm = {
          name: row.name,
          description: row.description,
          id: row.id
        };
      },
      creatCards() {
        let para = new FormData();
        para.append("fitnessId", this.fitnessId);
        para.append("name", this.cardForm.name);
        para.append("subtitle", this.cardForm.subtitle);
        para.append("description", this.cardForm.description);
        para.append("price", this.cardForm.price);
        para.append("unit", this.cardForm.unit);
        if (this.cardTitle == "新建卡片") {
          creatCards(para).then(res => {
            if (res.data.success) {
              this.$message.success(res.data.msg);
              this.dialog.card = false;
              this.getDetail();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          para.append("cardId", this.cardForm.id);
          updateCards(para).then(res => {
            if (res.data.success) {
              this.$message.success(res.data.msg);
              this.dialog.card = false;
              this.getDetail();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        }
      },
      removedCard(id) {
        this.$confirm('是否确认删除', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let para = new FormData();
          para.append("fitnessId", this.fitnessId);
          para.append("cardId", id);
          removedCard(para).then(res => {
            if (res.data.success) {
              this.$message.success(res.data.msg);
              this.getDetail();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        }).catch(() => {

        });
      },
      removedSport(id) {
        this.$confirm('是否确认删除', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let para = new FormData();
          para.append("fitnessId", this.fitnessId);
          para.append("sportId", id);
          removedSport(para).then(res => {
            if (res.data.success) {
              this.$message.success(res.data.msg);
              this.getDetail();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        }).catch(() => {

        });
      },
      uploadprofilePhoto() {
        let para = new FormData();
        para.append("id", this.fitnessId);
        para.append("profilePhoto", this.$refs.image1.files[0]);
        uploadprofilePhoto(para).then(res => {
          if (res.data.success) {
            this.$message.success(res.data.msg);
            this.dialog.updatePhoto = false;
            this.getDetail();
          } else {
            this.$message.error(res.data.msg);
          }
        });
      },
      addDetailPhoto() {
        this.detailPhotos.push({});
        this.$nextTick(() => {
          console.log(this.$refs['detailPhoto' + (this.detailPhotos.length - 1)][0]);
          this.$refs['detailPhoto' + (this.detailPhotos.length - 1)][0].click();
        });
      },
      uploadDetailsPhoto(index) {
        let para = new FormData();
        para.append("id", this.fitnessId);
        para.append("detailsPhoto", this.$refs['detailPhoto' + index][0].files[0]);
        uploadDetailsPhoto(para).then(res => {
          if (res.data.success) {
            this.$message.success(res.data.msg);
            this.getDetail();
          } else {
            this.$message.error(res.data.msg);
          }
        });
      },
      removedPhoto(file) {
        let para = new FormData();
        para.append("id", file.id);
        removedPhoto(para).then(res => {
          if (res.data.success) {
            this.$message.success(res.data.msg);
            // this.getDetail();
          } else {
            this.$message.error(res.data.msg);
          }
        })
      },
      addSchedules() {
        this.coathForm.schedules.push({
          beginTime: "",
          endTime: "",
        })
      },
      deleteSchedules(i) {
        this.coathForm.schedules.splice(i, 1);
      },
      creatSport() {
        let para = new FormData();
        para.append("fitnessId", this.fitnessId);
        para.append("name", this.sportForm.name);
        para.append("description", this.sportForm.description);
        if (this.sportTitle == "新建项目") {
          creatSport(para).then(res => {
            if (res.data.success) {
              this.$message.success(res.data.msg);
              this.dialog.sport = false;
              this.getDetail();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          para.append("sportId", this.sportForm.id);
          updateSport(para).then(res => {
            if (res.data.success) {
              this.$message.success(res.data.msg);
              this.dialog.sport = false;
              this.getDetail();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        }
      },
      createCoach() {
        let para = new FormData();
        para.append("roomId", this.fitnessId);
        para.append("name", this.coathForm.name);
        para.append("introduction", this.coathForm.introduction);
        para.append("email", this.coathForm.email);
        para.append("gender", this.coathForm.gender);
        para.append("tel", this.coathForm.tel);
        para.append("age", this.coathForm.age);
        para.append("level", this.coathForm.level);
        para.append("amount", this.coathForm.amount);
        para.append("goodness", this.coathForm.goodness);
        if(this.coachTitle == '新建教练'){
          para.append("file", this.$refs.coathPhoto.files[0]);
          for (let i = 0; i < this.coathForm.schedules.length; i++) {
            para.append("scheduleVoList[" + i + "].beginTime", this.coathForm.schedules[i].beginTime + ":00");
            para.append("scheduleVoList[" + i + "].endTime", this.coathForm.schedules[i].endTime + ":00");
          }
          createCoach(para).then(res => {
            if (res.data.success) {
              this.$message.success(res.data.msg);
              this.dialog.coath = false;
              this.getCoathList();
            } else {
              this.$message.error(res.data.msg);
            }
          })
        }else{
          if(this.$refs.coathPhoto.files[0] != "undefined"){
            para.append("file", this.$refs.coathPhoto.files[0]);
          }
          para.append("id", this.coathForm.id);
          updateCoach(para).then(res => {
            if (res.data.success) {
              this.$message.success(res.data.msg);
              this.dialog.coath = false;
              this.getCoathList();
            } else {
              this.$message.error(res.data.msg);
            }
          })
        }
      },
      getDetail() {
        let para = new FormData();
        para.append("id", this.fitnessId);
        queryFitnessRoomById(para).then(res => {
          let data = res.data.data;
          this.information = data;
          this.cardTable = data.cards;
          this.sportTable = data.sports;
          this.detailPhotos = res.data.data.detailsPhotos;
          console.log(res.data.data.detailsPhotos);
          for(let i=0;i<res.data.data.detailsPhotos.length;i++){
            res.data.data.detailsPhotos[i].url = 'http://www.dabaojianshen.com:9001/' + res.data.data.detailsPhotos[i].visitPath
          }
          this.fileList = res.data.data.detailsPhotos;
          // fileList
          this.gymForm = {
            name: data.name,
            grade: data.grade,
            description: data.description,
            lng: data.lng,
            lat: data.lat,
            callNumber: data.callNumber,
            businessHours: [new Date(2016, 9, 10, data.businessHours.split("-")[0].split(":")[0], data.businessHours.split("-")[0].split(":")[1]),
              new Date(2016, 9, 10, data.businessHours.split("-")[1].split(":")[0], data.businessHours.split("-")[0].split(":")[1])],
            location: data.location,
            feature: data.location,
            openingDate: new Date(data.openingDate),
            isFlagBusiness: data.isFlagBusiness,
            shutdownReason: data.shutdownReason,
            popularity: data.popularity,
            type: data.type,
          };
        });
      },
      updateGym() {
        let para = new FormData();
        para.append("id", this.fitnessId);
        para.append("name", this.gymForm.name);
        para.append("grade", this.gymForm.grade);
        para.append("description", this.gymForm.description);
        para.append("lng", this.gymForm.lng);
        para.append("lat", this.gymForm.lat);
        para.append("type", this.gymForm.type);
        para.append("businessHours", util.formatDate(this.gymForm.businessHours[0], "hh:mm") + " - " + util.formatDate(this.gymForm.businessHours[1], "hh:mm"));
        para.append("location", this.gymForm.location);
        para.append("feature", this.gymForm.feature);
        para.append("callNumber", this.gymForm.callNumber);
        para.append("openingDate", util.formatDate(this.gymForm.openingDate, "yyyy-MM-dd"));
        para.append("isFlagBusiness", this.gymForm.isFlagBusiness);
        para.append("shutdownReason", this.gymForm.shutdownReason);
        para.append("popularity", this.gymForm.popularity);
        updateFitnessRoom(para).then(res => {
          if (res.data.success) {
            this.$message.success(res.data.msg);
            this.getDetail();
            this.dialog.updateGym = false;
          } else {
            this.$message.error(res.data.msg);
          }
        });
      },
      getCoathList() {
        let para = new FormData();
        para.append("roomId", this.fitnessId);
        this.loading.coath = true;
        listCondition(para).then(res => {
          this.loading.coath = false;
          this.coachTable = res.data.data;
        })
      }
    },
    mounted() {
      let user = JSON.parse(localStorage.getItem('user'));
      if (user.authority == 'supermanager') {
        this.fitnessId = this.$route.query.id;
      } else {
        this.fitnessId = user.roomId;
      }
      this.fileData = {
        id:this.fitnessId
      };
      this.getDetail();
      this.getCoathList();
    }
  }
</script>

<style scoped>
  .icon {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }

  .gym-attribute {
    margin-top: 5px;
    margin-bottom: 5px;
  }

  .gym-attribute .title {
    font-weight: 500;
  }

  .avatar-uploader {
    width: 150px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }

  .detail-photo {
    width: 150px;
    height: 150px;
  }
</style>
