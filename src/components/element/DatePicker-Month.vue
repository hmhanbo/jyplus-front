<template>
  <div class="block">
    <el-date-picker
      v-model="value4"
      type="month"
      placeholder="选择月">
    </el-date-picker>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        value4: '',
      };
    }
  };
</script>

<style scoped>

</style>
