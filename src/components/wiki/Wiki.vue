<template>
  <div>
    <el-container style="border: 1px solid #eee">
      <el-aside width="300px" style="background-color: rgb(238, 241, 246)">
        <el-header style="text-align: right; font-size: 12px">
          <router-link tag="div" to="/edit" class="newnotes" @mouseover.native="overxJ" @mouseout.native="outxJ">
            <i :class="xJ == true ? 'el-icon-circle-plus-outline' : 'el-icon-circle-plus'" alt="" title="新建笔记"></i>
          </router-link>
        </el-header>

        <!-- 笔记条数和选项 -->
        <div>
          <div>{{allNoteList.length}} 条文档</div>
        </div>


        <router-link tag="div" v-for="(item, index) in allNoteList" :key="item.id" :to="/wiki/+item.id" @click.native="state=item.id"
          :class="state == item.id ? 'sel' : ''" v-show="!$store.state.notelistNumber">
          <el-menu>
            <el-submenu index="index">
              <template slot="title">{{item.title}}</template>
            </el-submenu>
          </el-menu>

          <div class="n-times">{{item.createTime}}</div>
          <div class="n-wrap" v-show="$store.state.showTextState">
            {{item.content}}
          </div>
          <!--选项组件-->
        </router-link>

      </el-aside>

      <el-container>
        <el-main>
          <div class="article">
            <el-row>
              <el-col :span="18">
                <div class="grid-content bg-purple-dark">
                  {{titleValue}}
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple-light">
                  <el-button @click="md_htmlCode">导出html</el-button>
                  <el-button @click="()=>{mavonEditorshow =!mavonEditorshow}">切换编辑</el-button>
                </div>
              </el-col>
            </el-row>
            <!-- <div class="editTitle">
              <input type="text" v-model="titleValue" class="editValue">
            </div> -->

            <div class="markdown-body" v-if="!mavonEditorshow">
              <area shape="" coords="" href="" alt="">
              <!-- <textarea v-model="textareaValue"></textarea>  -->
              <div v-html="textareaValue_md"></div>
            </div>
            <textarea v-model="textareaValue"></textarea> 
            <textarea v-model="textareaValue"></textarea> 
            <editor  :value="textareaValue" v-if="mavonEditorshow"
            @on-result-change="onResultChange"
            @parent-save="mavonSave"></editor>

          </div>
        </el-main>
      </el-container>

    </el-container>
<!-- <ve-line :data="chartData" :settings="chartSettings"></ve-line> -->

  </div>
</template>

<script>
  import md2text from '../../filters/md2text.js'
  import Editor from './Common/Editor.vue'
  import axios from 'axios'
  // import {clientAuto} from '../../assets/js/client'

  export default {
    components: {
      Editor
    },
    data() {
      this.chartSettings = {
        axisSite: { right: ['下单率'] },
        yAxisType: ['KMB', 'percent'],
        yAxisName: ['数值', '比率']
      }
      return {
        chartData: {
          columns: ['日期', '访问用户', '下单用户', '下单率'],
          rows: [
            { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
            { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
            { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
            { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
            { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
            { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
          ]
        },
        allNoteList: [], //全部的笔记
        noteContent: {}, // title 和 textarea展示内容的对象  也是Home组件消息弹窗的数据
        titleValue: '', //标题
        textareaValue: '', //内容
        EditTitle: '', //修改后的标题
        EditTextarea: '', //修改后的内容
        EditId: '', //编辑的Id
        state: 1,
        Pid: '', // noteContent对象的pid
        moveNote: false, //移动笔记本显隐

        findNotes: '', //查找笔记本

        // iView数据
        tagVal: '', //绑定tag输入框数据
        count: [], //保存标签数据
        editTagShow: false, //自定义标签输入框的显示隐藏

        kJshow: false, //快捷方式显示隐藏
        tkJshow: false, //顶部快捷方式显示隐藏
        sCshow: false, //删除图标显示和隐藏
        delNextId: 1, //删除对象下一个兄弟的id

        searchValue: '', //搜索关键字
        open: true,
        messageState: false, // 弹窗显隐

        xJ: true, //新建显隐

        mavonEditorshow: false,
      }
    },

    methods: {
      mavonSave(val){
          axios({
            url:'http://localhost:8080/wiki/' + this.$route.params.id,
            method:'post',
            data: val,
          }).then((val)={
            // this.textareaValue=this.value
          })
      },
      //子组件props双向绑定
      onResultChange(val) {
        this.textareaValue = val
      },
      /*
          @ synchronous
         * 同步textarea实时修改,左侧笔记列表实时更新
         * */
      synchronous() {

        //切换路由对象的时候 提交更新后的title和textarea内容
        //将item.id 不等于 this.EditId的找出来
        let changeObj = this.allNoteList.filter(item => item.id == this.EditId)[0];

        if (this.EditTitle === '') {
          this.EditTitle = '无标题内容'
        }

        // this.EditTitle === '' || this.EditTextarea === '' &&
        // console.log(this.EditTitle !== changeObj.title && this.EditTextarea !== changeObj.content);
        if (changeObj) {
          if (this.EditId !== '' && (this.EditTitle != changeObj.title || this.EditTextarea != changeObj.content)) {
            // 提交vuex 修改数据
            this.$store.commit('editChange', {
              id: this.EditId,
              title: this.EditTitle,
              content: this.EditTextarea,
            })
          }
        }
      },
      /*
       * @ getList
       * 对mock数据的异步请求
       * */
      getList() {
        this.$api.getList().then(({
          data
        }) => {
          this.$store.dispatch('success', data);
          localStorage.setItem('wiki', JSON.stringify(data));
        }).then(() => {
          // 请求成功之后
          this.allNoteList = this.$store.state.allList; //全部的笔记
          this.initContent();
          // this.getDateTimes.getDateTimes.call(this,this.allNoteList);
          //关闭loading动画
          // this.$store.commit('closeLoadding');
        }).catch((err) => {
          alert('网络延迟,请刷新重试')
        })
      },

      /*
       * @ vxDeleteInfo, 进入不同的场景,同步vuex当前场景的标识,为删除笔记的时候,根据这个标识进行操作
       * @ name 标识  type:string
       * @ name === deleteNoteState 避免两次提交的问题
       * */
      vxDeleteInfo(name) {
        let deleteNoteState = this.$store.state.deleteNotesState;
        if (name === deleteNoteState) return;

        if (typeof name !== 'string') {
          throw new Error(name + ' typeof should string');
        }
        this.$store.commit('deleteNoteState', name);
      },

      /*
       * @ initContent init
       * @ 初始化操作, change router is down initContent;
       * 路由对象发生变化,就执行 initContent 函数, 自动更新组件需要的数据
       * */
      initContent() {
        /*
         * 对笔记列表滚动条,以及笔记信息textarea 滚动条的整理
         * */
        let editScroll = this.$refs.editScroll;
        let homeScroll = this.$refs.homeScroll; //笔记列表滚动条
        if (editScroll) {
          editScroll.scrollTo(0, 0)
        }

        // //判断 如果是点击了Home
        // if(this.$route.params.id === '11111111' && homeScroll){
        //     homeScroll.scrollTo(0,0)
        // }

        let userId = this.$route.params.id || this.allNoteList[0].id;
        this.state = userId;
        if (userId) {
          // 根据路由元对象信息从vuex中获取到要展示的数据
          let n = this.allNoteList.filter(item => item.id == userId)[0];
          if (n) {
            this.noteContent = n;
            this.titleValue = n.title;
            this.textareaValue = n.content;
            this.Pid = n.pid; //单条笔记的pid
            this.$store.commit('notecontent', this.noteContent); //将当前展示的对象同步到vuex状态中
          } else {
            // 重定向
            this.$router.replace({
              path: '/wiki'
            })
          }
        }

        // /*
        // * 路由发生变化的时候,window.title 标题更新为当前展示的笔记的标题,
        // * 同步标签 this.count
        // * */
        // window.document.title = this.noteContent.title;
        // this.count = this.noteContent.label;

        // //选项列表数据
        // this.sortWay.sortWay.call(this,this.allNoteList);

        // // 根据Pid过滤不同阶段的笔记
        // // 在笔记本列表中过滤出与Pid一样的数据,就是当前显示数据的父亲
        // /*
        // * 路由更新,调用synchronous 同步数据
        // * */
        this.synchronous();
      },
      BlurFn() {
        //保存数据 提交mutations 修改当前对象的标签
      },
      overxJ() {
        this.xJ = false;
      },
      outxJ() {
        this.xJ = true;
      },
      md_htmlCode(b, s) {
        console.log(b)
        console.log(s)

        // console.log(md2text(s))          
      },

    },

    computed: {

      //搜索笔记
      filterNoteBooks() {
        return this.allNoteBook.filter(item => {
          return item.title.trim().match(this.findNotes)
        })
      },
      //tag输入框的动态宽度计算
      tagWidth() {
        return {
          width: this.tagVal.length * 12 + 26 + 'px'
        }
      },
      textareaValue_md: function () {
        // console.log(this.textareaValue)
        return md2text(this.textareaValue)
      }
    },

    // 钩子函数 请求数据同步vuex
    // 先从本地localStorage取数据，如果数据为空，再请求一次
    //created: 实例创建完成之后执行的钩子
    created() {
      let Storage = JSON.parse(localStorage.getItem('wiki'));
      this.getList();
      // 调试过程中，不从lacalStorage取数据
      if (Storage === null) {
        this.getList();
      } else {
        // 从locaLStorage中取数据
        this.$store.dispatch('success', {
          data: Storage
        });
        this.allNoteList = this.$store.state.allList;
        let id = this.$route.params.id;

        //     //防止胡乱修改路由动态id
            // let n = this.allNoteList.some(item => item.id == id);
            // if(n){
            //   this.initContent();
            // }else{
            //   this.$router.push({
            //     path:'/home/123456'
            //   })
            // }
            // this.$store.commit('closeLoadding'); //关闭加载loading
            // this.getDateTimes(); //localStorage中获取之后同步时间
            // this.getDateTimes.getDateTimes.call(this,this.allNoteList)
      }
    },
    // 编译好的HTML挂载到页面完成后执行的事件钩子，此钩子函数中一般会做一些ajax请求，进行数据初始化
    // mounted在整个实例中只执行一次
    mounted() {
      // clientAuto();
    },
    // 侦听路由对象变化
    watch: {
      $route() {
        this.initContent();
        // this.moveNote = false;
      },
      // 监听标题信息
      titleValue(newTitle) {
        this.EditTitle = newTitle;
        //如果前面的存在，就取前面的值，不存在，就取后面的值
        this.EditId = this.$route.params.id || this.allNoteList[0].id.toString(); // 字符串类型的id
      },
      // 监听textarea内容
      textareaValue(newTextarea) {
        this.EditTextarea = newTextarea;
        this.EditId = this.$route.params.id || this.allNoteList[0].id.toString();
      },

      /*
       * 同步vuex最新的数据到本地存储
       * 应该有一个点击事件，以向服务器更改数据！
       * */
      // 监听vuex的state
      '$store.state.dataList': {
        handler(changeData) {
          localStorage.setItem('wiki', JSON.stringify(changeData));
        },
        deep: true,
      },
      '$store.state.notelistNumber'(newState) {
        if (newState) {
          this.allNoteList = [];
        }
      }
    },
    //自定义指令
    directives: {
      focus: {
        inserted: function (el) {
          el.focus();
        }
      }
    }


  }

</script>

<style>
  .el-header,
  .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

</style>
