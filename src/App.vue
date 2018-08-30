<template>
  <div>
    <PhNavMenu></PhNavMenu>
    <div id="app">
      <router-view ></router-view>
    </div>


  </div>
</template>

<script>

  import PhNavMenu from './components/ph-navmenu.vue'


  export default {
    name: 'app',
    components: {PhNavMenu},

  }



</script>

<style>
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
  margin-left: 30px;
}
</style>
