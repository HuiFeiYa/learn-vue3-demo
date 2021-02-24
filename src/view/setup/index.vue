<template>
    <div>text</div>
</template>
<script>
import { onMounted,ref } from 'vue'
  export default {
    setup() {
      const getUserRepositories = ref([1])
      onMounted(getUserRepositories)
      return {
        getUserRepositories
      }
    }
  }
</script>
<style lang='less' scoped >

</style>