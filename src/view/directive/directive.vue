<template>
    <div>
      <p v-highlight="'yellow'" class="text" data-size='12' @click="onTitleClick">高亮显示此文本亮黄色</p>
    </div>
</template>
<script lang='ts'>
  import { defineComponent } from 'vue';
  export default defineComponent({
    methods:{
      onTitleClick() {
        console.log('title-click')
      }
    }
  });
</script>
<style lang='less' scoped >

</style>