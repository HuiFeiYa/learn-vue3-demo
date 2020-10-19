<template>
  <div>
    <h1>ts练习</h1>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import './playGround'
import { numIslands } from './test'
@Component({})
export default class TsIndex extends Vue {
  mounted() {
    const list = [['1', '0', '1', '1', '0', '1', '1']]
    const n = numIslands(list)
    console.log('n', n)
  }
}
</script>
<style lang="less" scoped></style>
