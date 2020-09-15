<template>
  <div class="iconSetting">
    <Header />
    <div class="icon">
      <Circles class="cir" radius="3.5rem" activeColor="#f0f0f0">
        <icon name="kite" slot="icon" />
      </Circles>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Header from 'COMPONENTS/Header.vue'
import Circles from 'COMPONENTS/Circle.vue'
@Component({
  components: {
    Header,
    Circles
  }
})
export default class TodoCreate extends Vue {}
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
