
<script lang='ts'>
  import { h } from 'vue';
  import Child from './Child.vue'
  export default {
    components:{
      Child
    },
    render() {
      return h(Child,{},
        { 
          header:(props:{year:number})=>{
            return h('div',`this year is ${props.year}`)
          },
          title:()=> h('h1', {
            innerHTML:'标题',
            onClick(){
              console.log('点击了标题')
            },
            style:{
              color:'#f66'
            }
          })
        }
      )
    }
  }
</script>