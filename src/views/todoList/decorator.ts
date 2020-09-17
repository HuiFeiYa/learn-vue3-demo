function method(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  console.log(target)
  console.log('prop', propertyKey)
  console.log('desc', JSON.stringify(descriptor) + '\n\n')
  descriptor.writable = false
}
function changeName(constructor: Function) {
  console.log(constructor)
  constructor.prototype.name = 'dd'
}
function staticProp(constructor: any, propName: string) {
  console.log(constructor, propName)
  constructor.time = '北京时间 2020-9-17'
}
function factor(this: Foo, params: any) {
  console.log('this-', this)
  console.log('params', params)
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    console.log('target---', target, propertyKey, descriptor)
    descriptor.writable = false
  }
}
@changeName
export class Foo {
  name!: string
  // @staticProp
  time!: string
  // @method
  say() {
    return 'instance method'
  }
  @factor('我要调用 factor 函数了')
  jump() {
    console.log('i want to jump')
  }
}
