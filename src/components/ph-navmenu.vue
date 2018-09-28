<template>
    <div>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
               background-color="#545c64"
               text-color="#fff"
               active-text-color="#ffd04b">

        <el-submenu index="1">
        <template slot="title">债券成交管理</template>
          <el-menu-item index="1-1" >
            <router-link class="router-link-active" to="/deal">本方成交查询</router-link>
          </el-menu-item>
          <el-menu-item index="1-2">市场成交查询</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">风险事件登记</template>
          <el-menu-item index="2-1">
            <router-link class="router-link-active" to="/trouble-bond">现券交易风险登记</router-link>
          </el-menu-item>
          <el-menu-item index="2-2">
            <router-link class="router-link-active" to="/trouble-cash">资金交易风险登记</router-link>
          </el-menu-item>



        </el-submenu>
        <el-submenu index="3">
          <template slot="title">知识管理平台</template>
          <el-menu-item index="3-1">
            <router-link class="router-link-active" to="/wiki">银行间资金</router-link>
          </el-menu-item>
          <el-menu-item index="3-2">现券</el-menu-item>
          <el-menu-item index="3-3">开基</el-menu-item>
          <el-menu-item index="3-4">开户/销户</el-menu-item>
        </el-submenu>
        <el-menu-item index="4">通知</el-menu-item>
        <el-submenu index="5">
          <template slot="title">其他</template>
          <el-menu-item index="3-1">
            <router-link class="router-link-active" to="/heytea">喜茶</router-link>
          </el-menu-item>
        </el-submenu>
      </el-menu>
      <div class="line"></div>

        <!--</el-col>-->
      <!--</el-row>-->
    </div>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
    },
  }

</script>

<style scoped>
.router-link-active {
  text-decoration: none;
}
</style>
