<template>
  <div>
    <canvas ref="canvas" class="canvas"></canvas>
    <button @click="getData">getData</button>
  </div>
</template>

<script>
import { src1, src2 } from './config'
export default {
  name: '',

  data() {
    return {
      image1Data: {},
      image2Data: {}
    }
  },
  mounted() {
    const canvas = this.$refs.canvas
    this.ctx = canvas.getContext('2d')
    this.init()
  },
  methods: {
    init() {
      const img = document.createElement('img')
      const img2 = document.createElement('img')
      img.src = src1
      img2.src = src2
      img.crossOrigin = 'anonymous'
      const ctx = this.ctx
      ctx.fillStyle = 'red'
      ctx.arc(30, 30, 5, Math.PI * 2, false)
      ctx.arc(40, 40, 5, Math.PI * 2, false)
      ctx.arc(50, 40, 5, Math.PI * 2, false)
      ctx.fill()
      img.onload = () => {
        ctx.save()
        ctx.drawImage(img, 0, 0, img.width, img.height, 30, 30, 30, 30)
        ctx.restore()
        this.image1Data = this.ctx.getImageData(50, 40, 10, 100).data
        // console.log('image1Data', this.image1Data)
      }
      img2.onload = () => {
        ctx.drawImage(img2, 0, 0, img.width, img.height, 50, 30, 30, 30)
        this.image2Data = this.ctx.getImageData(50, 40, 10, 100).data
      }
    },
    // 判断是否撞击是根据我们 getImageData(x,y,sw,sh) 采集指定区域的像素透明度来判断的。有时候我们肉眼看见它是重叠了，但是判断的时候没有，可能是因为我采集的区域太小，没有采集到重叠的区域。
    getData() {
      const { image2Data, image1Data } = this
      console.log('image1Data', image2Data, image1Data)
      for (let i = 3, len = image1Data.length; i < len; i += 4) {
        if (image1Data[i] > 0 && image2Data[i] > 0) {
          console.log('撞了')
          return true
        }
      }
      for (const [v, i] of image1Data.entries()) {
        // console.log('img1', image2Data[i])
        if (v) {
          console.log('i1', i)
          break
        }
      }
      for (const [v, i] of image2Data.entries()) {
        if (v) {
          console.log('i2', i)
          break
        }
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
