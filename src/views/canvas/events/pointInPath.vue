<template>
  <div>
    <!-- <canvas ref="canvas" width="300" height="300"></canvas> -->
  </div>
</template>

<script>
import './ball'
export default {
  name: '',

  data() {
    return {}
  },
  // mounted() {},
  methods: {
    init() {
      const canvas = this.$refs.canvas
      const ctx = canvas.getContext('2d')
      ctx.moveTo(30, 30)
      ctx.lineTo(200, 30)
      ctx.lineTo(180, 80)
      ctx.closePath()
      // ctx.beginPath()
      ctx.moveTo(100, 100)
      ctx.lineTo(80, 300)
      ctx.lineTo(40, 40)
      ctx.closePath()
      ctx.stroke()
      canvas.addEventListener('mousemove', e => {
        const { clientX, clientY } = e
        const isIn = ctx.isPointInPath(clientX, clientY)
        console.log('isIn', isIn)
      })
    }
  }
}
</script>

<style lang="less" scoped></style>
