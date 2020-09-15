<template>
  <div class="iconSetting">
    <Header />
    <!-- 当前图表 -->
    <div class="icon">
      <Circles class="cir" radius="3.5rem" activeColor="#f0f0f0">
        <icon name="kite" slot="icon" />
      </Circles>
      <!-- 任务名称 -->
    </div>
    <section>
      <van-cell-group>
        <van-field input-align="center" placeholder="请输入任务名" />
      </van-cell-group>
    </section>
    <!-- 备选图标 -->
    <section class="alternative">
      <div
        class="alternativeIcon"
        v-for="(item, index) in iconSetting"
        :key="index"
      >
        <icon :name="item" />
      </div>
    </section>
    <!-- 图标背景 -->
    <section class="colorSetting">
      <div
        class="background"
        v-for="(item, index) in colorSetting"
        :key="index"
      >
        <div v-bind:style="{ backgroundColor: item }"></div>
      </div>
    </section>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { SwipeCell, Cell, CellGroup, Field } from 'vant'
import Header from 'COMPONENTS/Header.vue'
import Circles from 'COMPONENTS/Circle.vue'
import { Mutation, State, Getter } from 'vuex-class'
// import { MyITodoItem } from '../../store/state'
import { MyITodoItem } from 'STORE/state'
import { config } from './config'
@Component({
  components: {
    Header,
    Circles,
    [SwipeCell.name]: SwipeCell,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Field.name]: Field
  }
})
export default class TodoCreate extends Vue {
  private iconSetting: string[] = config.iconSetting
  private colorSetting: string[] = config.colorSetting
  @Getter private getCurrentTodoList!: MyITodoItem[]
  @State private todoList!: MyITodoItem[]
}
</script>
<style lang="less" scoped>
.iconSetting {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  .icon {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 4rem;
    margin-top: 1rem;
    .cir {
      border-radius: 50%;
      border: solid black 2px;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      svg {
        margin: 0;
        width: 95%;
        height: 95%;
      }
    }
  }
  .alternative {
    margin: 2rem;
    height: 10rem;
    width: 100%;
    overflow: auto;
    .alternativeIcon {
      display: inline-block;
      svg {
        width: 2rem;
        height: 2rem;
        border: none;
        margin: 0.8rem;
      }
    }
  }
  .colorSetting {
    margin: 2rem;
    height: 15rem;
    width: 100%;
    overflow: auto;
    .background {
      display: inline-block;
      width: 2rem;
      height: 2rem;
      div {
        display: block;
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        margin: 0.5rem;
      }
    }
  }
}
</style>
