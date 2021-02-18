<template>
  <HelloWorld v-model="pageTitle" />
  <SyncModel v-model:title.capitalize="title" v-model:content="content"></SyncModel>
  <input type="text" v-model="content">
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from '../../components/HelloWorld.vue';
import SyncModel from '../../components/syncModel.vue'
export default defineComponent({
  name: 'App',
  components: {
    HelloWorld,
    SyncModel
  },
  data() {
    return {
      pageTitle:'这里是标题',
      title:'model:title',
      content:'这里是内容'
    }
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
