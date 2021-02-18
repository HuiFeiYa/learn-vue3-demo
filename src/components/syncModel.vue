<template>
    <div>
      <input type="text" :value="title" @input="onTextInput">
      <h1>{{ content }}</h1>
    </div>
</template>
<script lang='ts'>
  import { defineComponent } from 'vue';
  export default defineComponent({
    props:{
      title:{
        type:String,
        default:''
      },
      content:{
        type:String,
        default:''
      },
      titleModifiers:{
        type:Object,
        default:()=>{}
      }
    },
    methods:{
      onTextInput(e: { target: { value: any; }; }) {
        const value = e.target.value
        this.$emit('update:title',value)
      }
    },
    created() {
      // console.log('-',this.titleModifiers)
    }
  });
</script>
<style lang='less' scoped >

</style>