<template>
  <div>
    <input type="text" :value="val" @input="onInputChange" />
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    val: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },

  methods: {
    onInputChange(e) {
      this.$emit('update:val', e.target.value)
    }
  }
}
</script>

<style lang="less" scoped></style>
