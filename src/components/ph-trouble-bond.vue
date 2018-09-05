<template>
  <div>
    <div>
      <!--<div class="basetable" v-loading="loading" element-loading-text="拼命加载中">-->
      <div class="selectMenu">
        <!--<el-date-picker v-model="value6" type="daterange" placeholder="选择日期范围">-->
        <!--</el-date-picker>-->
        <el-button type="primary" @click="troubleAdd">新增</el-button>
      </div>

    </div>

    <div class="tableMain">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="troubleDate" label="日期" width="100">
        </el-table-column>
        <el-table-column prop="troubleType" label="类型">
        </el-table-column>
        <el-table-column prop="troubleTroubler" label="责任人">
        </el-table-column>
        <el-table-column prop="phTrader" label="交易员">
        </el-table-column>
        <el-table-column prop="phManager" label="经理">

        </el-table-column>
        <el-table-column prop="dealerCorp" label="经纪商">
        </el-table-column>
        <el-table-column prop="dealerPeople" label="经纪人">
        </el-table-column>
        <el-table-column prop="counterpartyCorp" label="终端机构">
        </el-table-column>
        <el-table-column prop="counterpartyPeople" label="终端交易员">
        </el-table-column>
        <el-table-column prop="troubleDetail" label="事件经过" width="200">
        </el-table-column>
        <el-table-column prop="troubleProblem" label="暴露问题">
        </el-table-column>
        <el-table-column prop="troubleSolve" label="解决措施">
        </el-table-column>
        <el-table-column prop="troubleSolvePeople" label="解决人员">
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="small" icon="el-icon-edit" circle @click="troubleEdit(scope.$index, scope.row)">
            </el-button>
            <el-button size="small" type="danger" icon="el-icon-remove"  circle @click="troubleDelete(scope.$index, scope.row)">
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>


    <el-dialog title="风险事件" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules = "rules" ref="form">
        <el-form-item label="日期" prop="troubleDate" :label-width="formLabelWidth">
          <el-date-picker :value="form.troubleDate" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>

        <el-form :inline="true">
          <el-form-item label="类型" :label-width="formLabelWidth" prop="troubleType">
            <el-input v-model="form.troubleType" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="责任人" :label-width="formLabelWidth" prop="troubleTroubler">
            <el-input v-model="form.troubleTroubler" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>

        <el-form :inline="true">
          <el-form-item label="交易员" :label-width="formLabelWidth" prop="phTrader">
            <el-input v-model="form.phTrader" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="经理" :label-width="formLabelWidth" prop="phManager">
            <el-input v-model="form.phManager" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>

        <el-form :inline="true">
          <el-form-item label="经纪商" :label-width="formLabelWidth" prop="dealerCorp">
            <el-input v-model="form.dealerCorp" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="经纪人" :label-width="formLabelWidth" prop="dealerPeople">
            <el-input v-model="form.dealerPeople" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>

        <el-form :inline="true">
          <el-form-item label="终端机构" :label-width="formLabelWidth" prop="counterpartyCorp">
            <el-input v-model="form.counterpartyCorp" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="终端交易员"  prop="counterpartyPeople">
            <el-input v-model="form.counterpartyPeople" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>

        <el-form-item label="事件经过" :label-width="formLabelWidth" prop="troubleDetail">
          <el-input
            type='textarea'
            :rows="2"
            v-model="form.troubleDetail" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="暴露问题" :label-width="formLabelWidth" prop="troubleProblem">
          <el-input v-model="form.troubleProblem" auto-complete="off"></el-input>
        </el-form-item>

        <el-form :inline="true">
          <el-form-item label="解决措施" :label-width="formLabelWidth" prop="troubleSolve">
            <el-input v-model="form.troubleSolve" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="解决人员" :label-width="formLabelWidth" prop="troubleSolvePeople">
            <el-input v-model="form.troubleSolvePeople" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>

      </el-form>
      <div slot="footer" class="dialog-footer" >
        <el-button type="primary" @click="dialogAdd(form)" :disabled="dialogFormAddDisabled">新 增</el-button>
        <el-button type="primary" @click="dialogUpdate(form)" :disabled="dialogFormUpdateDisabled">更 新</el-button>
        <el-button @click="dialogCancel">取 消</el-button>

      </div>
    </el-dialog>


  </div>

</template>

<script>
  import {reformat} from '../common/reformatDate'
  import axios from 'axios';
  axios.defaults.baseURL = 'http://localhost:8080';
  axios.CancelToken.source().token;

  export default {
    methods: {
      troubleAdd() {
        this.form = {
          troubleDate: '',
          troubleType: '',
          troubleTroubler: '',
          phTrader: '',
          phManager:'',
          dealerCorp:'',
          dealerPeople:'',
          counterpartyCorp:'',
          counterpartyPeople:'',
          troubleDetail:'',
          troubleProblem:'',
          troubleSolve:'',
          troubleSolvePeople:''
        };
        this.dialogFormAddDisabled = false;
        this.dialogFormUpdateDisabled = true;
        this.dialogFormVisible = true;

      },

      //编辑
      troubleEdit(index, row) {
        this.currentIndex = index;
        this.form = this.tableData[this.currentIndex];
        this.dialogFormAddDisabled = true;
        this.dialogFormUpdateDisabled = false;
        this.dialogFormVisible = true;
      },
      troubleDelete(index, row) {

        const _this = this;
        this.$confirm('此记录将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then( function(){
          const fd=new FormData();
          fd.append("troubleId",_this.tableData[index]["troubleId"]);
          // _this.tableData.splice(index, 1);
          axios({
              method:"post",
              url:"/trouble-bond/deleteById",
              data:fd
            }).then(function (res) {
              console.log(res.status)
              _this.tableData.splice(index, 1);
                _this.$message({
                  type: 'success',
                  message: '删除成功!'
              })
            });
          console.log(2);
        }).catch(()=> {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      dialogCancel() {
        this.dialogFormVisible = false;
      },
      dialogUpdate(form) {
        // this.form.date = reformat(this.form.date)
        const _this=this;
        axios({
          method:"post",
          url:"/trouble-bond/update",
          data:form
        }).then(function(res){
          _this.dialogFormVisible = false;
          console.log(res)
        }).catch((err)=>{
            console.log(err)
        });
      },
      dialogAdd(formName) {
        const _this = this;


            axios({
              method:"post",
              url:'/trouble-bond/add',
              data:this.form
            }).then(function(){
              _this.form.troubleDate = reformat(_this.form.troubleDate)
              _this.tableData.push(_this.form);
              _this.dialogFormVisible = false;
            }).catch((err)=>{
              console.log(err)
            });


      }
    },

    data () {
      return {
        visible2: false,
        dialogFormVisible: false,
        dialogFormAddDisabled:true,
        dialogFormUpdateDisabled:false,
        rowId:'',
        formLabelWidth: '80px',
        value6: '',
        currentPage3: 1,
        currentIndex: '',
        form: {},
        tableData:[],
        rules: {
          troubleDate: [{type: 'date', required: true, message: '请选择日期', trigger: 'change'}]
        }
      }
    },

    mounted: function () {
      axios.get('/trouble-bond/select')
        .then((response) => {
          this.tableData = response.data;
        })
        .catch((err) => {
          console.log(err)
        })

    }
  }


</script>

<style scoped>

</style>
