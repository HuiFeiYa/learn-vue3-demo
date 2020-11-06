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
          x: 50,
          y: 50,
          w: 100,
          h: 100,
          fillStyle: 'green',
          // 表示当前图形的层级，用于重叠时候判断哪个在上面
          zIndex: 0
        },
              {
        type: 'circle',
        x: 250,
        y: 100,
        r: 50,
        fillStyle: 'red',
        zIndex: 1
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
