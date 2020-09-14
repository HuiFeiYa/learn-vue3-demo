# stand_vue_project

实现一套标准的参考项目配置

## 项目结构

- shims-tsx.d.ts，允许你以.tsx 结尾的文件，在 Vue 项目中编写 jsx 代码
- shims-vue.d.ts 主要用于 TypeScript 识别.vue 文件，Ts 默认并不支持导入 vue 文件，这个文件告诉 ts 导入.vue 文件都按 VueConstructor\<Vue>处理。
