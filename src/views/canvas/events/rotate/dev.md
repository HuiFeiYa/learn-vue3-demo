# canvas 多个图形可视化操作:拖拽、缩放、旋转

## 前言

- canvas 可以绘制图形，此处说明 使用 canvas 的好处

* 来实现一个 canvas 拖拽、缩放、旋转的效果，如下效果图。

## 管理

统一使用 typescript 来编写，在面对状态操作复杂的流程， ts 提供了状态标注，类型提示等。便于我们维护和梳理流程思路。比如类型标注提供了类似注释的功能，将对象描述清楚的同时，在我们使用相关属性或方法都会有提示和类型判断，十分的方便。

为了统一管理，创建 Cavans 、State、Shape 来分别管理 canvas 图像操作，状态和不同类图像的对外的统一接口封装

### canvas 类

- 用于创建 canvans ，初始化

* 事件监听 mousedown、mousemove、mouseup 来响应用户操作
* 提供基础的通用方法如 : initDraw(重新绘制画板图像)、windowLocToCanvas(获取鼠标位置相对于 canvas 画板的位置)更多可以查看 github 地址的代码。

#### constructor

- 创建 canvas 元素，并初始化相关属性
- 保存当前画板的初始状态
- 设置监听事件通过 mousedown、mousemove 、mouseover 来监听 canvas 画板的事件。

### State 类

- 记录当前选中图形的相关信息

* 将在其他地方需要重复用到的数据、方法封装好暴露给外部，如:

```
    // 获取当前选中图形
    get currentShape() {
      return this.shapeList[this.index]
    }
    // 更新当前选中的图形序号
    updateIndex(index: number){
      this.index = index
    }
```

### 图形类

这里分为 BaseShape 和 Rect 、 Circle 等自定义的类。我们绘制的图形可能有很多种类型，将他们抽离成类并且对外暴露的接口都相同，那我们使用方法的时候就不需要考虑这个图形到底属于什么类型，

比如下面的栗子，创建 Circle 类和 Rect 类，他们对外暴露的都是 drawShape 的方法都是相同的，只需要调用 drawShape 即可，而不需要考虑内部的实现逻辑。这样可以更好的抽离复杂的逻辑，维护性更好。

```
  // Circle 类
  drawShape(ctx: CanvasRenderingContext2D) {
    const { x, y, fillStyle, r } = this.shape
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fillStyle = fillStyle
    ctx.fill()
  }
  // Rect 类
  drawShape(ctx: CanvasRenderingContext2D) {
    const { x, y, fillStyle, w, h } = this.shape
    ctx.beginPath()
    ctx.rect(x, y, w, h)
    ctx.fillStyle = fillStyle
    ctx.fill()
  }
```

#### BaseShape 类

将图形需要的基础方法和属性都统一抽离到该类中,例如 x,y 都表示图形绘制的起点的位置。这样减少重复代码，阅读体验更好

```
export default class BaseShape {
  x!: number;
  y!: number;
  zIndex?: number;
  rotateDeg = 0
  // 旋转控制点距离边的距离
  rotateY= 80
  // 控制点的大小
  point = { w:20,h:20 }
  state: State
  // 当前图形处于列表中的位置
  index: number
  constructor(shape: Shape,state: State,index: number) {
    const { x,y,zIndex,rotateDeg } = shape
    this.x = x
    this.y = y
    this.zIndex = zIndex
    this.rotateDeg = rotateDeg || 0
    this.state = state
    this.index = index
  }
}
```

#### Rect 类

由于不同 Shape 类提供外部的接口是相同的，那么这些 shape 类内部就是如何实现具体的操作，例如上面提到的 drawShape ，在不同类的实现方式是不一样的，rect 是使用 ctx.rect()来绘制图形，cicle 是使用 ctx.arc(),线段是通过 ctx.lineTo()。这样将相同类的操作聚合在一个同一个类中，同样也使代码更加有条理和可维护。

```
  // Rect 类
  drawShape(ctx: CanvasRenderingContext2D) {
    const { x, y, fillStyle, w, h } = this.shape
    ctx.beginPath()
    ctx.rect(x, y, w, h)
    ctx.fillStyle = fillStyle
    ctx.fill()
  }
```

## 操作

### 怎么给图形绑定事件

由于 canvas 中绘制的图形不像 html 中的 dom 一样可以绑定事件，如果我们想要给指定的图形添加事件需要代理到 canvas 元素上。

[点击查看：给图形添加事件 codepen 实例](https://codepen.io/gwx-code/pen/BazvKax)

通过实例给矩形添加了 move 事件，在这个例子中做了哪些事？

1. 开始绘制了一个矩形
2. 当我们点击 canvas 画布的时候通过，canvas 来做事件代理，通过 ctx.isPointerInPath(clientX,clientY) 来判断点击位置是否落在图形中
3. 如果落在图形中，当 mousemove 事件中重新绘制矩形，达到图形移动的效果，起始每次移动的矩形都是重新绘制的，而不是之前的那个。
4. 例子中的 ctx.getImageData() 和 ctx.putImageData 后面会继续介绍，现在只需要知道 canvas 实现物体移动的大致流程是这样的。这一切看起来都挺很顺利的。

### 多个图形时判断点中物体出错

当我们在 canvas 上绘制多个图形的时候会发现,使用 ctx.isPointerInPath()来判断是否点击最后一个图形是可以，但是前面绘制的图形无效。

这里需要介绍一下路径的概念,那画一条直线为例

1. 可以将 ctx.moveTo(x,y) 看作是落笔点，就是画笔点笔头，用于设置画笔点起点位置
2. ctx.lineTo(x,y) 将画笔从上一个起点开始，画一条线到 lineTo 设置的位置。
3. 通过上面的操作，我们已经得到一条直线的路径，但是此时画板上没有出现一条直线，因为路径只是设置了绘制的路径，并没有实际的绘制线。如果我们想绘制出这条线使用 ctx.stroke() 来绘制。
4. ctx.stroke()绘制当前或者已存在的路径。我们可以使用 ctx.lineTo() 、ctx.rect() 等绘制路径等方法绘制多条路径，然后使用 ctx.stroke() 将这些路径一次绘制出来。

有了上面的认识以后我们可以开始绘制我们想要的路径，假设我们想要绘制 (0,0) 到 (100,100) 的一条直线 为蓝色，再绘制一条路径(100,100) 到(200,200) 为绿色。写下如下代码

```
ctx.moveTo(0,0)
ctx.strokeStyle = 'blue'
ctx.lineTo(100,100)
ctx.strokeStyle = 'green'
ctx.lineTo(200,200)
ctx.stroke()
```

会很奇怪的发现，这两条线最终都变成了绿色，咋回事。原来 ctx.stroke()是对已有的所有路径都进行绘制，并且最后一次设置的绘制颜色 ctx.strokeStyle = 'green' 。所以所有路径都重新绘制并应用了绿色。
那我想要实现前面的需求该怎么办？
这里要使用 ctx.beginPath()

#### ctx.beginPath()

清空子路径开始一个新路径的方法。代码如下

```
// step1
ctx.beginPath()
ctx.moveTo(0,0)
ctx.strokeStyle = 'blue'
ctx.lineTo(100,100)
// step2 应用的样式只会作用在新的路径上
ctx.strokeStyle = 'green'
ctx.beginPath()
ctx.lineTo(200,200)
ctx.stroke()
```

有人可能会有疑问，我使用 ctx.beginPath()以后会不会影响到之前绘制的图形。答案是不会，因为路径是定义我们图形的形状，你在 step1 结束后，你已经得到了线段 1，他已经绘制在 canvas 上，你后序该路径并不会影响已经绘制的路径。

### 多物体时候绘制出错的原因

有了上面的认识以后，我们可以得到为什么 ctx.isPointerInPath(clientX,clientY) 无法判断前面绘制的图形了，因为每次绘制图形都会使用 ctx.beginPath()清除之前绘制的路径。 而 ctx.isPointerInPath 是根据路径来判断目标位置是否在路径中。

那我们有上面方法去解决呢？
开始我用的一种方法就是重新绘制所有路径，在每次绘制的时候判断当前点击位置是否存在在路径中。这样就可以判断我们点击位置在那个路径上了。

假设我们有一个

```
const pathList = [
  {
    type:'circle',
    x:100,
    y:100,
    r:30
  },
  {
    type:'rect',
    x:200,
    y:100,
    w:40,
    h:40
  }
]
```

现在我们通过列表绘制了一个圆和一个矩形。当我们点击时候，我们遍历这个 pathList ,将这个数组里的图形都绘制一遍，然后使用 ctx.isPointerInPath(clientX,clientY) 来判断是否点击中了图形。如果有说明我们命中该图形。

[点击查看多个图形选中判断方式](https://codepen.io/gwx-code/pen/xxOmRgE?editors=1010)
查看上面 demo 后解决了多个图形事件的问题，这一切看起来都挺很顺利的。

### 绘制可缩放的图形

当我们绘制如图当形状当时候，当我们点击矩形四个角的  框时候移动可以拉伸矩形的大小。根据前面的知识，我们绘制多个 path 路径，然后使用一次 ctx.stroke() 将图形绘制出来，我们就可以根据 ctx.isPointerInPath(clientX,clientY) 来判断当前是否命中图形。  
但是当我们需要判断是否点击中四个角的小矩形的时候就麻烦了。

1. 可以通过计算的方式判断当前点击位置
2. 将最后四个控制框分别绘制判断是否落在其中
3. 使用 Path2D 创建绘制路径,然后通过 ctx.isPointerInPath(path,x,y) 来判断是否落在指定路径中。

```
  const path = new Path2D()
  ctx.beginPath()
  path.rect(x, y, w, h)
  ctx.fillStyle = fillStyle
  ctx.fill(path)
```

### 绘制旋转图形

在 canvas 中使用 ctx.rotate(angle) 来实现图形旋转，有两点要注意:

1. 这里是 angle 是弧度，弧度和角度的关系：rad = 45 \* Math.PI / 180 45 度对应的弧度值
2. 旋转的中心点默认是原点(0,0),所以一切旋转的都是以原点旋转。如果你想根据图形的中心点旋转要通过 ctx.translate(x,y) 来设置旋转中心点。
   ![](https://misc.aotu.io/Yettyzyt/2017-05-25-canvas-img-rotate-and-flip/rotate_coke_join.png)

通过上图可以看出使用 ctx.translate(100,100) 就是将坐标系向右移动 100px 向下移动 100px，以后(100,100) 就相当于之前的原点，参考点就改变了。
旋转套用的公式如下：相当于我们将坐标原点移动到物体的中心点，完成旋转，自然达到了中心旋转的效果，但是后序的图形绘制参考点都以(100,100) 为原点这可不行，我们需要重置。这里需要介绍一下 canvas 上下文环境。

```
ctx.save()
ctx.translate(x + width / 2,  y + height / 2)
ctx.rotate(angle * Math.PI / 180)
ctx.rect( -width / 2,  -height / 2, width, height)
ctx.restore()

```

通过 ctx.save() 是将 canvas 2d 当前的环境状态放入栈中，保存 canvas 当前的状态。可保存的分为四类。

- 当前的变换矩阵。
- 当前的剪切区域。
- 当前的虚线列表.
- 以下属性当前的值： strokeStyle, fillStyle, globalAlpha, lineWidth, lineCap, lineJoin, miterLimit, lineDashOffset, shadowOffsetX, shadowOffsetY, shadowBlur, shadowColor, globalCompositeOperation, font, textAlign, textBaseline, direction, imageSmoothingEnabled.

当我们旋转完图形后需要恢复坐标系就需要使用 ctx.restore() 将之前保存最近一次的状态,例如坐标系(变换矩阵)等保存的属性。

### 如果根据当前鼠标移动判断旋转角度

#### Math.atan2(y,x)

> Math.atan2() 返回从原点(0,0)到(x,y)点的线段与 x 轴正方向之间的平面角度(弧度值)，也就是 Math.atan2(y,x),返回的夹角是与 X 轴的夹角 返回的是弧度值
> 弧度 = deg(角度) _Math.PI / 180 由此推导出 deg(角度) = 弧度_ 180 / Math.PI

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/15370fc95a1f416e87d37ad09506d902~tplv-k3u1fbpfcp-watermark.image)
如上图，如果我们用角度来描述 (10,10) 和 (10,-10) 和(0,0) 都是 45 度。而使用 Math.atan2 可以描述当前位置相对于 (0,0)所在的象限(角度的正负)。

```
Math.atan2(10,10) = 0.7853981633974483
Math.atan2(-10,10) = -0.7853981633974483
```

#### 具体实现

```
  // 当鼠标点击的时候记录初始鼠标位置
  mouseDown() {
    const canvas = this.canvas
    canvas.addEventListener('mousedown',e=>{
      const {x,y} = this.windowLocToCanvas(e)
      this.state.mouseDown = {x,y}
    })
  },
  mouseMove() {
    const canvas = this.canvas
    canvas.addEventListener('mousemove',e=>{
      const loc = this.windowLocToCanvas(e)
      const { isRotating } = this.state
      // 判断当前物体是否处于旋转控制点
      if(isRotating) {
        this.calcRotateAngle(loc)
      }
    })
  }
  calcRotateAngle(loc){
    const { mouseDown:{x:mx,y:my} } = this.state
    const shape = this.state.currentShape
    // 取出当前图形的中心位置
    const [cx,cy] = this.adaptShape(shape,this.state.index).centerPosition
    const { x,y } = loc
    // 计算鼠标点击的时候相对于中心点的旋转角度
    const initDeg = Math.atan2(my-cy,mx-cx)
    // 计算当前鼠标位置相对于中心点的旋转角度
    const currentDeg = Math.atan2(y-cy,x-cx)
    // 两者相减就是旋转的角度
    this.state.updateAngle(currentDeg-initDeg)
    this.initDraw()
  }
```

### 说说 ctx.getImageData(sy,sy) ctx.putImageData(imageData,dx,dy)

> CanvasRenderingContext2D.getImageData() 返回一个 ImageData 对象，用来描述 canvas 区域隐含的像素数据，这个区域通过矩形表示，起始点为(sx, sy)、宽为 sw、高为 sh。

getImageData 就是将当前 canvas 上的数据存储起来返回一个 ImageData 这样的对象来描述当前保存的 canvas 像素数据。

> CanvasRenderingContext2D.putImageData() 是 Canvas 2D API 将数据从已有的 ImageData 对象绘制到位图的方法。 如果提供了一个绘制过的矩形，则只绘制该矩形的像素。此方法不受画布转换矩阵的影响。
> putImageData 就是将存储的 ImageData 数据重新绘制到 canvas 上。

### ctx.getImageData(sy,sy) 和 ctx.save() 的区别

- ctx.getImageData(sy,sy) 存储的是指定区域的像素，而 ctx.save() 存储的是状态，之前介绍的四种类型的状态。
- ctx.getImageData(sy,sy) 配合 ctx.putImageData(imageData,dx,dy) 来使用。ctx.save() 配合 ctx.restore() 使用。

### ctx.putImageData() 和 ctx.clearRect() 的区别

- ctx.clearRect()是将指定区域的像素清除掉，会形成空白的画板。 ctx.putImageData() 是将之前存储的整个指定区域的像素重新绘制到指定区域的。如果存储的像素都是空白，那么两者看起来的效果是相同的。
- 但是 ctx.putImageData() 用途并不是清理的，而是重置画板像素区域的。例如我们绘制来一个网格背景，当我们重新绘制图形的时候，网格背景一直需要，那可以使用 imageData 来存储这个背景，而不需要调用绘制方法重新绘制一次。

* [点击查看 ctx.putImageData() 和 ctx.clearRect()的使用](https://codepen.io/gwx-code/pen/abZPJRo?editors=1010)

### 判断是否在路径中 使用 ctx.isPointInPath(path1,x,y)

问题点：

- 当我们绘制完一个旋转的图形，会先使用 ctx.save() 保持画板状态，然后使用 ctx.restore() 重置画板，导致我们后序使用 path 判断出现问题。因为画板的 rotate translate 已经被重置了。

思路:

- 当我们点击的时候重新绘制图形赋值框，判断是否点击了某个点。

## 图形操作

### 旋转

## 图形切换

- 当前没有选中图形时候，mousedown 的时候判断是否选中矩形
- 当有图形选中的时候， mousedown 的时候判断是否选中矩形或者控制点

- 判断参数：当前有无选中图形、是否点击中了选中控制点(首先要有选中图形)，

## 参考

[canvas 图像旋转与翻转姿势解锁 by Yetty on 2017-05-25](https://aotu.io/notes/2017/05/25/canvas-img-rotate-and-flip/index.html)
