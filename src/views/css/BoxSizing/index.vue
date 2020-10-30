<template>
  <div>
    <!--  -->
    <div class="wrap">
      parent
      <div class="inner">inner</div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',

  data() {
    return {}
  },

  methods: {}
}
</script>

<style lang="less" scoped>
.wrap {
  background-color: #f66;
  width: 200px;
  height: 400px;
  border: 10px solid #ffc129;
  box-sizing: border-box;
  .inner {
    background-color: #999;
    width: 100%;
    // box-sizing: content-box;
    box-sizing: border-box;
    padding: 5px;
    border: 3px solid green;
  }
}
</style>
