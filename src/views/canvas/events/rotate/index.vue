<template>
    <div></div>
</template>
<script lang='ts'>
  import { Component, Vue } from 'vue-property-decorator'
  import './index'
  import { Shape } from './types/index'
  import Canvas  from './index'
  import State from './State'
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
        rotateDeg:0,
        // 初始角度值
        initDeg:40*Math.PI / 180,
        shapePath:new Path2D(),
        controlPathList:[]
      },
      {
        type: 'rect',
        x: 300,
        y: 150,
        w: 100,
        h: 100,
        fillStyle: 'red',
        // 表示当前图形的层级，用于重叠时候判断哪个在上面
        zIndex: 0,
        rotateDeg:0,
         // 初始角度值
        initDeg:0,
        shapePath:new Path2D(),
        controlPathList:[]
      },
      // ,
      // {
      //   type: 'circle',
      //   x: 330,
      //   y: 200,
      //   r: 50,
      //   fillStyle: 'red',
      //   zIndex: 1,
      //   rotateDeg:0
      // }
    ]
  @Component({})
  export default class Rotate extends Vue {
    created() {
        const state = new State(shapeList)
        const instance = new Canvas(state)
        instance.initDraw()
    }
  }
</script>
<style lang='less' scoped >

</style>