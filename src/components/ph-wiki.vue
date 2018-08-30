<template>
  <div>
    <h1>知识平台</h1>
    <vue-markdown>i am a ~~tast~~ **test**.</vue-markdown>
  </div>

</template>

<script>

  import VueMarkdown from 'vue-markdown'


  // var simplemde = new SimpleMDE();


  export default {
      name: "ph-wiki",
      components: {
        VueMarkdown
      },
    }
</script>

<style scoped>

</style>
