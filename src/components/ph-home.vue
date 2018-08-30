<template>
  <div id="home">
    <h1>欢迎来到债券交易辅助办公平台</h1>

  <div>
    <input type="button" value="增加" @click="increment">
    <input type="button" value="减少" @click="decrement">
    <input type="button" value="异步" @click="clickAsync">
    <a href="http://localhost:8090/index">点我连接后台</a>
    <p>现在的数字为:{{count}}，是偶数还是奇数：{{getOdd}}</p>
  </div>
    <!--<p>marked('# Marked in the browser\n\nRendered by **marked**.')</p>-->

  </div>

</template>

<script>
  import VueMarkdown from 'vue-markdown'
  import {mapGetters, mapActions} from 'vuex'

    export default {
      name: "home",
      components: {
        VueMarkdown
      },
      computed:mapGetters([                       //变量的集合
        'count',
        'getOdd'
      ]),
      methods: mapActions([
        'increment',                               //1. 映射入方法集合,把@click后面的方法写到这里
        'decrement',
        'clickAsync'
      ])
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
