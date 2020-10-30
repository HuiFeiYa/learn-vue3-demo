<template>
  <div>
    <div class="wrap">
      <div class="item item1" style="background:red;height: 100%;">1</div>
      <div class="item item2" style="background:yellow;height: 100%;">2</div>
      <div class="item item3" style="background:green;height: 100%;">3</div>
    </div>
    <div class="wrap1">
      <div class="border-box1">知道我的身份是否史蒂夫</div>
      <div class="border-box">知道我的身份是否史蒂夫</div>
      <div class="width">我设置了width:100px，同时box-sizing: border-box</div>
    </div>
    <by-zhangxinxu>
      <item-zxx>我设置了width:100px</item-zxx>
      <item-zxx class="box">
        我设置了width:100px，同时box-sizing: border-box
      </item-zxx>
      <item-zxx>我设置了flex-:100px</item-zxx>
      <item-zxx>我设置了-:100px，同时box-sizing: border-box</item-zxx>
    </by-zhangxinxu>
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
  width: 600px;
  border: 3px solid #000;
  display: flex;
}
.item {
  width: 200px;
  text-align: center;
  // flex-basis: 100px;
  // min-width: 150px;
  // width: 100px;
  border: 10px solid blue;
}
.item3 {
  flex-basis: 150px;
}
.item2 {
  flex-basis: 150px;
  box-sizing: border-box;
}
.wrap1 {
  display: flex;
  .border-box {
    flex-basis: 100px;
    height: 100px;
    background-color: green;
    box-sizing: border-box;
    border: 10px solid #eee;
  }
  .border-box1 {
    flex-basis: 100px;
    height: 100px;
    background-color: yellow;
    border: 10px solid #eee;
  }
}
.width {
  width: 100px;
  box-sizing: border-box;
  background-color: #f66;
  border: 10px solid #000;
}
by-zhangxinxu {
  display: flex;
}
item-zxx {
  // padding: 1em;
  border: 1em solid deepskyblue;
  color: deepskyblue;
  // outline: 1px dashed #fff;
}
item-zxx:nth-child(1) {
  width: 100px;
}
// item-zxx:nth-child(2) {
//   width: 100px;
//   box-sizing: border-box;
// }
.box {
  width: 100px;
  box-sizing: border-box;
}
item-zxx:nth-child(3) {
  flex-basis: 100px;
}
item-zxx:nth-child(4) {
  flex-basis: 100px;
  box-sizing: border-box;
}
</style>
