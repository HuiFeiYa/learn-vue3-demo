<template>
  <div>
    <canvas ref="canvas" width="400" height="400"></canvas>
  </div>
</template>

<script>
export default {
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const canvas = this.$refs.canvas
      const ctx = canvas.getContext('2d')
      ctx.fillStyle = 'red'
      ctx.arc(200, 200, 60, 0, Math.PI * 2)
      ctx.fill()
    }
  }
}
</script>

<style lang="less" scoped></style>
