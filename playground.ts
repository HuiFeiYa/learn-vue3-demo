type Foo = {
  kind: 'foo'; // 字面量类型
  foo: number;
};

type Bar = {
  kind: 'bar'; // 字面量类型
  bar: number;
};

function doStuff(arg: Foo | Bar) {
  // if (arg.kind === 'foo') {
  //   console.log(arg.foo); // ok
  //   console.log(arg.bar); // Error
  // } else {
  //   console.log(arg.foo); // Error
  //   console.log(arg.bar); // ok
  // }
  if('foo' in arg){
    arg.foo * arg.foo
  }
}