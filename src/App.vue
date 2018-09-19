<template>
  <div>
    <PhNavMenu></PhNavMenu>
    <div id="app">
      <router-view ></router-view>
    </div>


  </div>
</template>

<script>
  import store from './vuex/store'
  import PhNavMenu from './components/ph-navmenu.vue'

  export default {
    name: 'app',
    components: {PhNavMenu},
    store,

  }

</script>

<style lang="stylus">
#app {
/*此处引用css文件*/
@import '~simplemde/dist/simplemde.min.css';
@import '~highlight.js/styles/atom-one-dark.css';
// @import '~github-markdown-css';

  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
  margin-left: 30px;
}
</style>
