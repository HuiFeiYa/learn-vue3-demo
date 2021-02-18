<template>
    <div>
      <div v-for="item in list" :ref="setItemRef" :key="item">{{ item }}</div>
      <button @click="list.push(list.length + 1)">+</button>
    </div>
</template>
<script lang='ts'>
  import { defineComponent } from 'vue';
  export default defineComponent({
    data() {
      return {
        list:[1,2,3],
        itemRefs: []
      }
    },
    methods: {
      setItemRef(el) {
          this.itemRefs.push(el)
        }
      },
      beforeUpdate() {
        this.itemRefs = []
      },
      updated() {
        console.log(this.itemRefs)
      }
  });
</script>
<style lang='less' scoped >

</style>