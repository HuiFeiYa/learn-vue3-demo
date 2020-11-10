# canvas 多个图形可视化操作:拖拽、缩放、旋转

## 实现

统一使用 typescript 来编写，在面对状态操作复杂的流程， ts 提供了状态标注，类型提示等。便于我们维护和梳理流程思路。比如类型标注提供了类似注释的功能，将对象描述清楚的同时，在我们使用相关属性或方法都会有提示和类型判断，十分的方便。

### canvas 类

用于创建 canvans ，并实现 canvas 操作的方法，保存对应的属性

#### constructor

- 创建 canvas 元素，并初始化相关属性
- 保存当前画板的初始状态
- 设置监听事件通过 mousedown、mousemove 、mouseover 来监听 canvas 画板的事件。

### State 类

### 图形类

## 判断是否在路径中

### 使用 ctx.isPointInPath(path1,x,y)

问题点：

- 当我们绘制完一个旋转的图形，会先使用 ctx.save() 保持画板状态，然后使用 ctx.restore() 重置画板，导致我们后序使用 path 判断出现问题。因为画板的 rotate translate 已经被重置了。

思路:

- 当我们点击的时候重新绘制图形赋值框，判断是否点击了某个点。
