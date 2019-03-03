<template>
  <div>
    <el-card>
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="会馆照片">
          <input ref="image1" type="file" name="file" @change="preview('image1')"/>
          <img class="preview-img" :src="image.image1_src" v-show="image.image1"/>
        </el-form-item>
        <el-form-item label="会馆名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="会馆等级">
          <el-input-number v-model="form.grade" :step="1" :max="5" class="input-number"></el-input-number>
        </el-form-item>
        <el-form-item label="会馆简介">
          <el-input v-model="form.description" type="textarea" style="width:400px;"></el-input>
        </el-form-item>
        <el-form-item label="会馆类型">
          <el-radio-group v-model="form.type">
            <el-radio label="gymnasium">健身馆</el-radio>
            <el-radio label="yoga_gym">瑜伽馆</el-radio>
            <el-radio label="fight_club">搏击馆</el-radio>
            <el-radio label="work_room">工作室</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="经纬度">
          <el-input v-model="form.lng" placeholder="经度" style="width:100px;"></el-input>
          <el-input v-model="form.lat" placeholder="纬度" style="width:100px;"></el-input>
        </el-form-item>
        <el-form-item label="营业时间">
          <el-time-picker is-range v-model="form.businessHours" range-separator="至"
                          start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围">
          </el-time-picker>
        </el-form-item>
        <el-form-item label="会馆地址">
          <el-input v-model="form.location"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="form.callNumber"></el-input>
        </el-form-item>
        <el-form-item label="特色或优势">
          <el-input v-model="form.feature"></el-input>
        </el-form-item>
        <el-form-item label="开业日期">
          <el-date-picker v-model="form.openingDate" type="date" placeholder="选择开业日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="是否停业">
          <el-radio-group v-model="form.isFlagBusiness">
            <el-radio :label="false">否</el-radio>
            <el-radio :label="true">是</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="停业原因" v-if="form.isFlagBusiness">
          <el-input v-model="form.shutdownReason"></el-input>
        </el-form-item>
        <el-form-item label="人气值">
          <el-input-number v-model="form.popularity" :precision="2" :step="0.5" :max="5"></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="submit">创建</el-button>
          <el-button size="small">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import {createFitnessRoom} from '../../api/api'
  import util from '../../util/index'
  export default {
    name: "",
    data(){
      return{
        update:false,
        image:{
          image1:false,
          image1_src:"#",
        },
        form:{
          name:"",
          grade:5,
          description:"",
          lng:"",
          lat:"",
          callNumber:"",
          businessHours:[new Date(2016, 9, 10, 9, 0), new Date(2016, 9, 10, 17, 0)],
          location:"",
          feature:"",
          openingDate:"",
          isFlagBusiness:false,
          shutdownReason:"",
          popularity:5,
          type:"gymnasium",
        }
      }
    },
    methods:{
      preview(){
        console.log(this.$refs.image1.value);
        let filePath = this.$refs.image1.value; //获取到input的value，里面是文件的路径
        let fileFormat = filePath.substring(filePath.lastIndexOf(".")).toLowerCase();
        let src = window.URL.createObjectURL(this.$refs.image1.files[0]); //转成可以在本地预览的格式

        // 检查是否是图片
        if(!fileFormat.match(/.png|.jpg|.jpeg/)) {
          error_prompt_alert('上传错误,文件格式必须为：png/jpg/jpeg');
          return;
        }else{
          this.image.image1 = true;
          this.image.image1_src = src;
        }
      },
      submit(){
        let para = new FormData();
        para.append("name",this.form.name);
        para.append("grade",this.form.grade);
        para.append("description",this.form.description);
        para.append("lng",this.form.lng);
        para.append("lat",this.form.lat);
        para.append("type",this.form.type);
        para.append("businessHours",util.formatDate(this.form.businessHours[0],"hh:mm") + " - " + util.formatDate(this.form.businessHours[1],"hh:mm"));
        para.append("location",this.form.location);
        para.append("feature",this.form.feature);
        para.append("callNumber",this.form.callNumber);
        para.append("openingDate",util.formatDate(this.form.openingDate,"yyyy-MM-dd"));
        para.append("isFlagBusiness",this.form.isFlagBusiness);
        para.append("shutdownReason",this.form.shutdownReason);
        para.append("popularity",this.form.popularity);
        para.append("profilePhoto",this.$refs.image1.files[0]);
        createFitnessRoom(para).then(res => {
          if(res.data.success){
            this.$message.success(res.data.msg);
            this.$router.push({path: '/gym/list',});
          }else{
            this.$message.error(res.data.msg);
          }
        });
      }
    },
    mounted(){

    },
  }
</script>

<style scoped>
  .preview-img{
    width:100px;
    height:100px;
  }
</style>
