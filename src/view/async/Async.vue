<template>
    <div>
      <Asy1 v-if="isShowAsync1"></Asy1>
      <button @click="isShowAsync1 = !isShowAsync1">async1 开关</button>
      <Asy2 v-if="isShowAsync2"></Asy2>
      <button @click="isShowAsync2 = !isShowAsync2">async2 开关</button>
    </div>
</template>
<script lang='ts'>
  import { defineAsyncComponent,defineComponent } from 'vue';
  import Loading from './Loading.vue'
  const Asy1 = defineAsyncComponent(() => import('./asy1.vue') )
  const Asy2 = defineAsyncComponent({
    // @ts-ignore
    loader:()=>
        new Promise(res=>{
          setTimeout(() => {
            // @ts-ignore
            res(import('./asy2.vue')) 
          }, 1000);
        }),
    // @ts-ignore
    loadingComponent:Loading,
    delay:200
  })
  export default defineComponent({
    components:{
      Asy1,
      Asy2,
    },
    data() {
      return {
        isShowAsync1:false,
        isShowAsync2:false
      }
    }
  });
</script>