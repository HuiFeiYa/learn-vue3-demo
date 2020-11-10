<template>
  <div>
    <button @click="onDynamicClick">动态加载ma.js</button>
  </div>
</template>

<script>
  export default {
    name: '',

    data() {
      return {
      }
    },

    methods: {
      onDynamicClick() {
        import('./ma').then(module=>{
          console.log('module',module)
          const { fn,NAME_TYPE } = module
          const result = fn(1,2)
          console.log('result',result)
          console.log('NAME_TYPE',NAME_TYPE)
        })
      }
    }
  }
</script>

<style lang='less' scoped>

</style>
