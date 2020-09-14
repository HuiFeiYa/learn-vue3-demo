<template>
  <div class="hello">
    <button ref="button" @click="onButtonClick">点击</button>
    <h1 v-if="isShow">{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,
      <br />
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">
        vue-cli documentation
      </a>
      .
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State, Mutation } from 'vuex-class'
import { MyITodoItem } from '../store/state'
@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string
  isShow = true
  $refs!: {
    button: HTMLInputElement
  }

  // 这里应该是通过结构赋值的方式直接获取 state 中的值
  // 相当于 { todoList, a } = state
  @State private todoList!: MyITodoItem[]
  @State private a!: number
  // 引入Mutation 定义的 createTodoItem 方法
  @Mutation private createTodoItem!: (todoItem: MyITodoItem) => void
  onButtonClick() {
    this.isShow = !this.isShow
    this.createTodoItem({
      id: '1',
      name: '张三',
      isDone: true,
      iconName: '图标名称',
      color: 'red',
      mode: 0
    })
  }
  created() {
    console.log('todoItem', this.todoList)
  }
  @Watch('isShow')
  onIsShowChange() {
    console.log('变化了')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
