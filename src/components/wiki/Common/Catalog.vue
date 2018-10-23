<template>
    <div style="height:600px;">
      <!-- <el-scrollbar class="el-scrollbar_catalog" style="height:100%"> -->
      <el-aside 
      v-show="catalogShow" 
      width="200px" 
      style="background-color: rgb(238, 241, 246)">
        <el-tree
          :data="nodeArr"
          :props="defaultProps"
          accordion
          :expand-on-click-node="false"
          @node-click="handleNodeClick">
        </el-tree>
      </el-aside>
      <!-- </el-scrollbar> -->
                <!-- 标题树形图 -->


        <!-- <el-scrollbar style="height:100%">
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
          </router-link>
        </el-scrollbar> -->
    </div>
</template>

<script>
function addHeaderToArr(resultArr, domArr) {
  var h1 = -1;
  var h2 = -1;
  var h3 = -1;
  try {
    for (var i = 0; i < domArr.length; i++) {
      if (~~domArr[i].tagName[1] === 1) {
        resultArr.push({
          label: domArr[i].innerText
        });
        h1++;
        h2 = -1;
      } else if (~~domArr[i].tagName[1] === 2) {
        //  新建children
        if (!resultArr[h1]["children"]) {
          resultArr[h1]["children"] = [];
        }
        resultArr[h1]["children"].push({
          label: domArr[i].innerText
        });
        h2++;
        h3 = -1;
      } else if (~~domArr[i].tagName[1] === 3) {
        //  新建children
        if (!resultArr[h1]["children"][h2]["children"]) {
          resultArr[h1]["children"][h2]["children"] = [];
        }
        resultArr[h1]["children"][h2]["children"].push({
          label: domArr[i].innerText
        });
        h3++;
      }
    }
    return resultArr;
  } catch (err) {
    return [{ label: "请按规范写入标题" }];
  }
}

export default {
  data() {
    return {
      nodeArr: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      // catalogShow: false
    };
  },

  props: {
    catalogShow: {
      type: Boolean
    }
  },
  components: {},
  mounted() {
    this.$nextTick(()=>{
      this.buildCatalog();
    })
  },
  methods: {
    handleNodeClick(data, node, vueComponet) {
      console.log(data);
      console.log(node);
      console.log(vueComponet);
      window.scrollTo(0,0)
    },
    buildCatalog() {
      // this.$nextTick(() => {
        let result = [];
        let doms = document.querySelectorAll("h1, h2, h3")
        this.nodeArr = addHeaderToArr(result, doms);
      // })
    },
          toTop () {
        window.scrollTo(0,0)
      }
  },
  computed:{
    // doms: function(){
    //   return document.querySelectorAll("h1, h2, h3")
    // }
  },
  event: {
    "catalog-refresh": function() {
      this.buildCatalog();
    }
  },

};
</script>


<style>
.el-scrollbar_catalog{
  overflow-x: hidden;
}


</style>