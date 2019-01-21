<template>
  <div>
    <el-card>
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="会馆名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="会馆等级">
          <el-input v-model="form.grade"></el-input>
        </el-form-item>
        <el-form-item label="会馆简介">
          <el-input v-model="form.description" type="textarea" style="width:400px;"></el-input>
        </el-form-item>
        <el-form-item label="会馆类型">
          <el-input v-model="form.type"></el-input>
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
          <el-input v-model="form.popularity"></el-input>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "",
    data(){
      return{
        form:{
          name:"",
          grade:5,
          description:"",
          lng:"",
          lat:"",
          businessHours:[],
          location:"",
          feature:"",
          openingDate:"",
          isFlagBusiness:false,
          shutdownReason:"",
          popularity:5,
        }
      }
    }
  }
</script>

<style scoped>

</style>
