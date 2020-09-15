<template>
  <div>
    <Header />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Header from 'COMPONENTS/Header.vue'
@Component({
  components: {
    Header
  }
})
export default class TodoCreate extends Vue {}
</script>
<style lang="less" scoped></style>
