<template>
  <div>
    <Child @change="childClick(arguments[0], 'domValue')"></Child>
    <!-- <img src="./test2.png" alt="" /> -->
    <div v-for="item in list" :key="item.name">
      <input
        :value="item.name"
        type="text"
        @change="onValueChange($event, item)"
      />
    </div>
  </div>
</template>

<script>
import Child from './child'
export default {
  name: '',
  components: {
    Child
  },
  data() {
    return {
      list: [
        {
          name: 'dd'
        },
        {
          name: '李四'
        },
        {
          name: '王五'
        }
      ]
    }
  },

  methods: {
    childClick(childValue, bindValue) {
      console.log(childValue, bindValue)
    },
    onValueChange(e, item) {
      item.name = e.target.value
    }
  }
}
</script>

<style lang="less" scoped>
img {
  width: 100%;
  vertical-align: middle;
}
</style>
