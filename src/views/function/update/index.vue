<template>
  <div>
    <Child1 :val.sync="value1"></Child1>
  </div>
</template>

<script>
import Child1 from './child1'
export default {
  name: '',
  components: {
    Child1
  },
  data() {
    return {
      value1: '1'
    }
  },

  methods: {}
}
</script>

<style lang="less" scoped></style>
