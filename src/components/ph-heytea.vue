<template>
    <div>
      <!--日期-->
      <el-form>
        <el-form-item label="日期">
          <el-col :span="3">
            <DatePickerDay></DatePickerDay>
          </el-col>
        </el-form-item>
      </el-form>

      <!--菜单-->

      <el-form :model="teaMenu" ref="teaMenu" label-width="100px" class="demo-dynamic">
        <el-form-item
          v-for="(food, index) in teaMenu.foods"
          :label="'菜单' + index"
          :key="food.key"
          :prop="'foods.' + index + '.value'"
        >
          <el-col :span="6">
            <el-input v-model="food.value" ></el-input>
          </el-col>
          <el-button @click.prevent="addFood(food)" icon="el-icon-circle-plus" circle></el-button>
          <el-button @click.prevent="removeFood(food)" icon="el-icon-remove"  circle></el-button>
        </el-form-item>
      </el-form>


      <!--点餐情况-->
      <el-table
        :data="teaOrder"
        style="width: 100%">
        <el-table-column
          label="姓名"
          width="180"
          :filters="[{text: '韩博', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
          :filter-method="filterHandler">
            <template slot-scope="scope" >
              <div >
                <el-input
                  placeholder="请输入内容"
                  v-show="scope.row.inputShow"
                  v-model="scope.row.date"
                  @blur="saveClick(scope.row)"></el-input>
                <span v-show="!scope.row.inputShow"><i class="el-icon-edit" @click="cellClick(scope.row)"></i>&nbsp;{{scope.row.date}}</span>
              </div>
            </template>
        </el-table-column>
        <el-table-column
          label="志愿1"
          width="180"
          sortable>
          <template slot-scope="scope" >
            <div >

              <el-select v-model="scope.row.name" placeholder="请选择">
                <el-option
                  v-for="item in teaMenu.foods"
                  :key="item.value"
                  :label="item.value"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="备注">
          <template slot-scope="scope" >
            <div >
              <el-input
                placeholder="请输入内容"
                v-show="scope.row.inputShow"
                v-model="scope.row.address"
                @blur="saveClick(scope.row)"></el-input>
              <span v-show="!scope.row.inputShow"><i class="el-icon-edit" @click="cellClick(scope.row)"></i>&nbsp;{{scope.row.address}}</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <br>

    </div>


</template>

<script>
    import DatePickerDay from './element/DatePicker-Day.vue'
    import axios from 'axios'
    export default {
      name: "ph-heytea",
      data() {
        return {
          teaMenu: {
            foods: [{
              value: '芝士霉霉',
            },{
              value: '多肉葡萄',
            }],
          },
          teaOrder: [{
            inputShow :false,
            date: '韩博',
            name: '',
            address: ''
          }, {
            inputShow :false,
            date: '卢楠',
            name: '',
            address: ''
          }, {
            inputShow :false,
            date: '罗佳',
            name: '',
            address: ''
          },]
        }
      },
      methods:{
        cellClick(row) {
          console.log(row.inputShow);
          console.log(row);
          row.inputShow = !row.inputShow;
        },
        saveClick(row){
          console.log('save');
          row.inputShow = !row.inputShow;
        },
        removeFood(item) {
          const index = this.teaMenu.foods.indexOf(item);
          if (index !== -1) {
            this.teaMenu.foods.splice(index, 1);
            axios({
              method:"post",
              url:"http://localhost:8080/heyTea/removeFood",
              data:"&id=" + index
            }).then(response => {
              console.log(response);
              this.getData();
            }).catch(error => {
              console.log(error);
            })
          }
        },
        addFood(item) {
          var index = this.teaMenu.foods.indexOf(item);
          if (index !== -1) {
            this.teaMenu.foods.splice(index+1,0,{
              value: '',
              key: Date.now()
            });
            axios({
              method:"post",
              url:"http://localhost:8080/heytea/add",
              data: {
                teaId: "",
                teaName: '芝士',
                teaPrice:"99"
              }
            }).then(response => {
              console.log(response);
            }).catch(error => {
              console.log(error)
            })
          }
        },
        filterHandler(value, row, column) {
          const property = column['property'];
          return row[property] === value;
        }
      },
      components:{DatePickerDay},
    }
</script>

<style scoped>

</style>
