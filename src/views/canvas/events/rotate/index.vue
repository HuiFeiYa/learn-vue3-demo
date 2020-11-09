<template>
  <div>
  </div>
</template>

<script lang="ts">
  import { State } from '../rect/board/utils'
  import { Shape } from '../rect/board/scaleConfig'
  import Canvas  from  '../rect/board/version-1.1'
  export default {
    name: '',

    data() {
      return {
      }
    },
    created() {
      const shapeList: Shape[] = [
        {
          type: 'rect',
          x: 150,
          y: 150,
          w: 100,
          h: 100,
          fillStyle: 'green',
          // 表示当前图形的层级，用于重叠时候判断哪个在上面
          zIndex: 0,
          rotateDeg:45
        },
              {
        type: 'circle',
        x: 300,
        y: 200,
        r: 50,
        fillStyle: 'red',
        zIndex: 1,
        rotateDeg:0
      }
      ]
      const state = new State(shapeList)
      const instance = new Canvas(state)
      instance.initDraw()
    },
    methods: {}
  }
</script>

<style lang='less' scoped>

</style>
