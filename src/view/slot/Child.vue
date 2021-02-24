
<script lang='ts'>
  import { h } from 'vue';
  export default {
    // @ts-ignore
    render() {
      // @ts-ignore
      return h('div',[this.$slots.title(),this.$slots.header({year:2021})])
    }
  }
</script>
<style lang='less' scoped >

</style>