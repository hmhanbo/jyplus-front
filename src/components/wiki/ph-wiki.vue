<template>
  <div>
    <!--<h1>知识平台</h1>-->
    <!--<vue-markdown>i am a ~~tast~~ **test**.</vue-markdown>-->


    <post></post>


    <div>
      <!--<div class="editor theme">-->
      <!--&lt;!&ndash; use v-model control value &ndash;&gt;-->
      <!--<markdown-editor-->
      <!--v-model="content"-->
      <!--:highlight="true"-->
      <!--preview-class="markdown-body"></markdown-editor>-->

      <!--</div>-->
    </div>

    <!--<div>-->
      <!--<mavon-editor v-model="content"-->
      <!--/>-->
    <!--</div>-->
  </div>

</template>

<script>

  import VueMarkdown from 'vue-markdown'

  import markdownEditor from 'vue-simplemde/src/markdown-editor'
  import hljs from 'highlight.js';
  window.hljs = hljs;

  import Post from './Post'



  export default {
    name: "ph-wiki",
    components: {
      VueMarkdown,
      markdownEditor,
      Post
    },
    data () {
      return {
        content: '``` \nconsole.log("lalala") \n```',
        catalogShow: false,
        configs: {
          status: false,
          toolbar: ['image'],
        },
      }
    },

  }
</script>

<style >

</style>
