<template>
  <div id="home">
    <h1>欢迎来到债券交易辅助办公平台</h1>
  </div>

</template>

<script>
  import VueMarkdown from 'vue-markdown'

    export default {
      name: "home",
      components: {
        VueMarkdown
      },
    }
</script>

<style scoped>
  #home {
    /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
    /*-webkit-font-smoothing: antialiased;*/
    /*-moz-osx-font-smoothing: grayscale;*/
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    margin-left: 30px;
  }
</style>
