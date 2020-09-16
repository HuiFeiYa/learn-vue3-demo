<template>
  <div class="circle" :style="styleObj">
    <slot name="icon" />
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
@Component({})
export default class Circles extends Vue {
  @Prop() private radius!: string
  @Prop() private activeColor!: string

  private get styleObj() {
    return {
      background: this.activeColor || 'red',
      width: this.radius || '3rem',
      height: this.radius || '3rem'
    }
  }
  // @Watch('activeColor')
  // private changeColor(val: string) {
  //   this.styleObj.background = val
  //   console.log('changeColor')
  // }
}
</script>
<style lang="less" scoped>
.circle {
  border: solid 2px black;
  border-radius: 50%;
  margin: 0;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
