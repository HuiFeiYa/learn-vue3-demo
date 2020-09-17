<template>
  <div>
    <Header></Header>
    <TodoItem
      v-for="item in TodoListComputed"
      :key="item.id"
      @click-right="delHandle(item.id)"
      @click-left="doneHandle(item.id)"
      rightValue="删除"
      leftValue="完成"
      :id="item.id"
      :color="item.color"
      :name="item.name"
      :isDone="item.isDone"
      :iconName="item.iconName"
    />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Header from 'COMPONENTS/Header.vue'
import { Mutation, Getter } from 'vuex-class'
import TodoItem from './TodoItem.vue'
import { MyITodoItem, Mode } from 'STORE/state'
import { Foo } from './decorator'
@Component({
  components: {
    Header,
    TodoItem
  }
})
export default class TodoHome extends Vue {
  @Mutation private deleteTodoItem!: (id: string) => void
  @Mutation private doneTodoItem!: (id: string) => void
  @Getter private getCurrentTodoList!: MyITodoItem[]
  private get TodoListComputed() {
    const list = this.getCurrentTodoList.filter(item => item.mode === Mode.edit)

    return list
  }

  private delHandle(id: string) {
    this.deleteTodoItem(id)
  }

  private doneHandle(id: string) {
    this.doneTodoItem(id)
  }
  created() {
    const instance = new Foo()
    console.log('name', instance)
  }
}
</script>
<style lang="less" scoped></style>
