<template>
  <div class="hello">
    <input type="text" :value="modelValue" @input="onTextInput" >
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HelloWorld',
  props: {
    modelValue:{
      type:String,
      default:''
    }
  },
  methods:{
    onTextInput(e: { target: { value: any; }; }) {
      const value = e.target.value
      // this.$emit('input',value)
      this.$emit('update:modelValue',value)
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
