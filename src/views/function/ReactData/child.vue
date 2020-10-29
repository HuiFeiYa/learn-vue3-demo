<template>
  <div>
    <button @click="onChildButtonClick">子组件按钮</button>
  </div>
</template>

<script>
export default {
  name: '',

  data() {
    return {}
  },

  methods: {
    onChildButtonClick() {
      this.$emit('change', 'childValue')
    }
  }
}
</script>

<style lang="less" scoped></style>
