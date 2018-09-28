<template>
  <div class="youbian clearfix">
        <!--最右侧笔记本内容信息区域-------------------------------->
        <!--左侧区域-->
        <div class="yinxDet clearfix" id="yinxdet">
            <el-button type="warning" @click="editCancelHander">
                取消
            </el-button>
            <el-button type="success" :disabled="!editTextarea.trim().length" @click="xJnotesHander">
                保存
            </el-button>

          <!--/***********/-->
          <div class="editCount">

            <div class="root">
              <div class="editTitle">
                <input type="text" v-model="inputValue" class="editValue">
              </div>
              <div class="textArea edit-textarea">
                <textarea v-model="editTextarea" placeholder="写入笔记内容...">

                </textarea>
              </div>
            </div>

          </div>
        </div>
  </div>
</template>

<script>
    // import {editclient} from '@/assets/js/client'
    // let dayjs = require('dayjs');
    // dayjs().format();

    export default {
        name: "edit",
        data(){
          return {
            inputValue:'写下笔记标题',
            editTextarea:'',  // 双向数据绑定textarea框

            editOk:false,   //完成图标显示


            beginTime:'', //当前笔记创建时间
          }
        },
        // mounted(){
        //    editclient();
        // },


        methods:{
          //新建完成
          xJnotesHander(){
             if(this.inputValue.trim() === '写下笔记标题'){
               this.inputValue = '无标题内容'
             }
             // "id":this.$store.state.allList.length + 16,
             // 这样给定新建笔记的Id有bug,如果新建一个笔记。这个笔记的id是根据vuex中的allList笔记本列表的长度加上一个数字
             // 组成的id,如果新建完再随意删除一个笔记,再新建一个笔记。这两个笔记引用同一个Id的Bug
            let obj = {
               "title":this.inputValue,
               "id":parseInt(Math.random()*10000000),
               "pid":this.state,
               "shortcut":this.shortcut,
               "remind":false,
               "remindTime":"",
               "completeState":false,
               "label":this.count,
               "sel":false,
               "createTime":"",
               "Shared":false,
               "size":"1KB",
               "url": "https://github.com/qiqingfu",
               "author": "9116895@qq.com",
               "content":this.editTextarea,
               "beginTime":this.beginTime,  //同步创建笔记的时间
               "updateTime":'', //更新的时间暂时未空
            };
              // 新建笔记对象保存到vuex状态
            if(obj){
               this.$store.commit('addNotes',{
                  obj:obj,
                  id:this.state
               });
               // 提交到vuex之后,立马存储到本地,因为路由跳转的create的生命周期钩子函数比 watch要早
               // 如果现在不存,跳转到home路由去本地取出的数据还是最新的
              localStorage.setItem('yinxiang',JSON.stringify(this.$store.state.dataList));
              this.$router.push({
                 path:'/wiki/'+obj.id
              })
            }

              // 如果当搜索框为显示的时候再关闭
              if(this.$store.state.searchBox){
                this.$store.commit('hideSearchShow')
              }
          },

          // 取消保存
          editCancelHander(){
             this.$router.go(-1);
             this.beginTime = '';
          },
           // 失去焦点保存,如果输入的内容不为空

          editDelHander(){
             // 判断标题有没有输入内容
             let o = {};
             if(this.inputValue.trim() === '写下笔记标题'){
                o = {title:'无标题内容'};
             }else{
               o = {title:this.inputValue};
             }
              this.$store.commit('delClickHander',{
                obj:o,
                id:1,
              })
          },
          
        },


        computed:{
        },

        created(){
            // 初始化笔记本数据
            let n = this.$store.state.dataList;
            if(n.length > 0){
               this.noteBookList = n;
            }else if(n.length < 1){
              this.$router.push({
                path:'/wiki'
              })
            }
            // 组件初始化,获取创建笔记的时间戳
            // this.beginTime = dayjsdayjs().unix();
        },
    }
</script>

<style scoped>
  .yinxDet{
    margin-left: 0px;
  }
  .youbian {
    margin-left: 0;
  }
  .definfo {
    width: 24px;
    height: 24px;
    /* background: url("../assets/images/defbijixinxipng.png") no-repeat; */
  }
  .definfo:hover{
    /* background: url("../assets/images/bijixinxihover.png") no-repeat; */
  }
</style>
