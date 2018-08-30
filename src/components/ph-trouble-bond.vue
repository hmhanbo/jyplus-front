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
          <!--<template scope="scope">-->
                <!--<el-select v-model="scope.row.city" placeholder="请选择">-->
                  <!--<el-option v-for="item in cityList" :key="item.name" :label="item.name" :value="item.name">-->
                    <!--&lt;!&ndash; <span style="float: left">{{ item.name }}</span> &ndash;&gt;-->
                    <!--&lt;!&ndash; <span style="float: right; color: #8492a6; font-size: 13px">{{ item.name }}</span> &ndash;&gt;-->
                  <!--</el-option>-->
                <!--</el-select>-->
              <!--</template>-->
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
              <template scope="scope">
                <el-button size="small" icon="el-icon-edit" circle @click="troubleEdit(scope.$index, scope.row)">
                </el-button>
                <el-button size="small" type="danger" icon="el-icon-remove"  circle @click="troubleDelete(scope.$index, scope.row)">
                </el-button>
              </template>
            </el-table-column>
      </el-table>
    </div>


    <el-dialog title="风险事件" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="日期" :label-width="formLabelWidth">
          <el-date-picker v-model="form.troubleDate" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>

        <el-form :inline="true">
          <el-form-item label="类型" :label-width="formLabelWidth">
            <el-input v-model="form.troubleType" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="责任人" :label-width="formLabelWidth">
            <el-input v-model="form.troubleTroubler" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>

        <el-form :inline="true">
          <el-form-item label="交易员" :label-width="formLabelWidth">
            <el-input v-model="form.phTrader" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="经理" :label-width="formLabelWidth">
            <el-input v-model="form.phManger" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>

        <el-form :inline="true">
          <el-form-item label="经纪商" :label-width="formLabelWidth">
            <el-input v-model="form.dealerCorp" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="经纪人" :label-width="formLabelWidth">
            <el-input v-model="form.dealerPeople" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>

        <el-form :inline="true">
          <el-form-item label="终端机构" :label-width="formLabelWidth">
            <el-input v-model="form.counterpartyCorp" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="终端交易员" >
            <el-input v-model="form.counterpartyPeople" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>

        <el-form-item label="事件经过" :label-width="formLabelWidth">
          <el-input
            type='textarea'
            :rows="2"
            v-model="form.troubleDetail" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="暴露问题" :label-width="formLabelWidth">
          <el-input v-model="form.troubleProblem" auto-complete="off"></el-input>
        </el-form-item>

        <el-form :inline="true">
          <el-form-item label="解决措施" :label-width="formLabelWidth">
            <el-input v-model="form.troubleSolve" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="解决人员" :label-width="formLabelWidth">
            <el-input v-model="form.troubleSolvePeople" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>

      </el-form>
      <div slot="footer" class="dialog-footer" >
        <el-button type="primary" @click="dialogAdd" :disabled="dialogFormAddDisabled">新 增</el-button>
        <el-button type="primary" @click="dialogUpdate" :disabled="dialogFormUpdateDisabled">更 新</el-button>
        <el-button @click="dialogCancel">取 消</el-button>

      </div>
    </el-dialog>


  </div>

</template>

<script>
  import axios from 'axios';




  export default {
    methods: {

      // created(){
      //     // 载入config数据
      //     //this.$store.dispatch("config/reload");
      //   axios({
      //     method:"get",
      //     url:"http://localhost:8080/touble-bond/findAll",
      //   }).then(response => {
      //     console.log(response.data);
      //   }).catch(error => {
      //     console.log(error)
      //   })
      // },
      troubleAdd() {
        this.form = {
          troubleDate: '',
          troubleType: '',
          troubleTroubler: '',
          phTrader: '',
          phManger:'',
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
        this.form = this.tableData[index];
        this.currentIndex = index;
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
        }).then(function(){
          const fd=new FormData();
          fd.append("troubleId",_this.tableData[index]["troubleId"]);
          // _this.tableData.splice(index, 1);
          axios({
            method:"post",
            url:"http://localhost:8080/trouble-bond/deleteById",
            data:fd
          }).then(function (res) {
            console.log(res.status)
            _this.tableData.splice(index, 1);
            //   _this.$message({
            //     type: 'success',
            //     message: '删除成功!'
            // })
          })
            .catch(function (err) {
              console.log(err);
            });
          console.log(2);
        }).catch(()=> {
          // _this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // })
        })
      },

      dialogCancel() {
        this.dialogFormVisible = false;
      },
      dialogUpdate() {
        // this.form.date = reformat(this.form.date)
        const _this=this;
        axios({
          method:"post",
          url:"http://localhost:8080/trouble-bond/update",
          data:_this.form
        }).then(function(res){
          _this.dialogFormVisible = false;
          console.log(res)
        }).catch((err)=>{
            console.log(err)
        }
        );

        // this.tableData.push(this.form);
        // this.dialogFormVisible = false;

      },
      dialogAdd() {
        //逻辑上应该在异步请求成功后，再执行下面这条命令，但是放在axios里面发现无法执行，可能需要别的方法，promise？
        this.tableData.push(this.form);
        axios({
            method:"post",
            url:'http://localhost:8080/trouble-bond/add',
            data:this.form
          }).then(function(response){

            return console.log(response.status);
          })
            .catch(function(err){
              return console.log(err);
            });

        this.dialogFormVisible = false;

        // this.form.date = reformat(this.form.date)
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
        tableData:[]
      }
    },

    mounted: function () {
      axios.get('http://localhost:8080/trouble-bond/select')
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
