<template>
    <div>
      <Emit @accepted="number++"></Emit>
      {{ number }}
    </div>
</template>
<script lang='ts'>
  import Emit from './Emit.vue'
  import { defineComponent } from 'vue';
  export default defineComponent({
    components:{
      Emit
    },
    data() {
      return {
        number:0
      }
    }
  });
</script>
<style lang='less' scoped >

</style>