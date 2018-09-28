<template>
  <div id="bondtrade">

    <el-form  label-width="80px">

      <el-form-item label="期限">
        <el-checkbox-group v-model="checkboxGroup1">
          <el-checkbox-button  v-for="filterTerm in filterTerms" :label="filterTerm" :key="filterTerm">
            {{filterTerm}}
          </el-checkbox-button>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="评级">
        <el-checkbox-group v-model="checkboxGroup2">
          <el-checkbox-button  v-for="filterRating in filterRatings" :label="filterRating" :key="filterRating">
            {{filterRating}}
          </el-checkbox-button>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="成交日期">
        <el-col :span="3">
          <DatePickerDay></DatePickerDay>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="3">
          <DatePickerDay></DatePickerDay>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="searcher" >查询</el-button>

      </el-form-item>
      <hr>
      <el-form-item>
        <el-button type="success" :span="11">布局设置</el-button>
      </el-form-item>
    </el-form>
    <router-link to="/news">News News</router-link>

  </div>
</template>

<script>
  import DatePickerDay from '../element/DatePicker-Day.vue'
  const filterTermOptions = ['<3M','3M-6M','6M-9M','9M-12M','1Y-3Y','3Y-5Y','5Y-10Y','>10Y'];
  const filterRatingOptions = ['AAA','AA+','AA','AA-','其他'];
  export default {
    name: 'HelloWorld',
    data () {
      return {
        checkboxGroup1: [],
        checkboxGroup2: [],
        filterTerms: filterTermOptions,
        filterRatings: filterRatingOptions,
      }
    },
    components:{DatePickerDay},
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#bondtrade  {
  margin-left: 60px;
}
</style>
