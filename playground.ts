/****   基础类型   *****/

// 数字，二、八、十六进制都支持
let decLiteral: number = 6
let hexLiteral: number = 0xf00d

// 字符串
let name: string = 'bob'
let sentence: string = `Hello , my name is ${name}`

// 数组
let list: number[] = [12, 23, 1] // 常用格式
let list1: Array<string> = ['1', '12'] // 另外一种写法

/****   特殊类型   *****/

const tuple: [number, string, string] = [23, '1', 'sf'] // 按照特定的预设要求排列 可以看作是有组织的数组
const dynamic = 21
enum Color { // 像C#等其它语言一样，使用枚举类型可以为一组数值赋予友好的名字。
  Red = 1,
  Green = 2,
  Blue = 3,
  dynamic // 通过 Color.dynamic 来获取值
}

function fn(): string {
  return 'ad'
}
function fn1(): void {}

// any定义后任何值都可以赋值给变量
// 接入第三方库可以使用 any 不去考虑它都逻辑
let person: any = '前端劝退师'
person = 25
person = true

// Never是你永远得不到的爸爸。
/*
 * throw new Error(message)
 * return error("Something failed")
 * while (true) {} // 存在无法达到的终点
 */
const error = (message: string): never => {
  throw new Error(message)
}

/****   类型断言   *****/
let someValue: string | number | object = {} // 当赋值 {} 时候就推断出 someValue 类型为 object
let strLength = ((someValue as unknown) as string).length // 这里如果直接使用 someValue as string 会报错，因为已经知道 someValue 为object类型，需要将 someValue 断言为 unknown 然后在断言为 string

let str1: unknown = 'this is a string' // 这里即使赋值的是 string 类型的值，但是 str1 定义的类型是 unknown 任何类型都可以赋值给 unknown ,所以不知道 str1 的具体类型是什么，所以我们需要使用断言
let str1Length = (str1 as string).length
let str1TwinsLength = (<string>str1).length

// 使用实例

function getLength(something: string | number): number {
  if ((something as string).length) {
    return (something as string).length
  } else {
    return something.toString().length
  }
}

/****   泛型   *****/

// gen_fun1<T>() 此处的 T 是获取参数1的类型，而后面两个 T 是复用泛型提取出的参数类型
function gen_fun1<T>(arg: T): T {
  return arg
}

let a = gen_fun1('1111') // 由于我们传入的 string 类型，得到的返回值也是 string 类型

function gen_fun2<T, U>(arg1: T, arg2: U): T | U {
  if (arg1) return arg1
  return arg2
}

// 传入子项为任意值的数组,并且限制返回的数组项类型为 T 中的任意一种
function any_func<T>(arg: T[]): T[] {
  return arg.slice(0, 1)
}
// 传入数组项可以是字符串和数字，此时 T 的类型就是 string | number ，所以返回的数组项只要是该类型中的一种即可。
let result = any_func(['12', 1])

/****   自定义类型：Interface vs Type alias    *****/
// Interface，国内翻译成接口。 Type alias，类型别名。

interface User {
  name: string
  age: number
  say(word: string): void
}
// 用法类似于 declare 定义一个类型变量
type User1 = {
  name: string
  age: number
}
interface Teacher {
  language: string[]
}
interface User2 extends Teacher {
  learn(skill: string): string[]
}
// 接口、类型别名的继承
let people: User2 = {
  language: ['11'],
  learn(skill) {
    return [skill]
  }
}

type User3 = Teacher & {
  learn(skill: string): string[]
}
let people1: User3 = {
  language: ['11'],
  learn(skill) {
    return [skill]
  }
}

// 接口别名可以通过 typeof 来获取别人的数据类型
// 当你想获取一个变量的类型时，使用 typeof
let div = document.createElement('div')
type B = typeof div

// interface 声明合并,多次声明同一个 interface 名会将声明项都合并
interface User {
  name: string
  age: number
}

interface User {
  sex: string
}

/*
User 接口为 {
  name: string
  age: number
  sex: string 
}
*/

// interface 有可选属性和只读属性
interface Person {
  name: string
  age?: number
  readonly gender: string
}
const boy: Person = { name: '张三', gender: 'man' }
boy.name = '李四'
// boy.gender = 'girl' Cannot assign to 'gender' because it is a read-only property

// 非空断言
function expect(arg: { son: string | null | undefined }) {
  // 非空断言会排除调 null 和 undefined 的情况，如果类型中还有 number 类型还是会报错
  return arg.son!.length
}
let c = expect({ son: undefined })
let nullableString: string | null | undefined

function checkNotEmpty(s: unknown): boolean {
  return typeof s === 'string' && s.length > 0
}

if (checkNotEmpty(nullableString)) {
  console.log(nullableString!.slice(0, -1))
}

function foo(s?: string) {
  if (checkNotEmpty(s)) {
    console.log(s!.length)
  }
}

export {}
