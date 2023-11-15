<h1 align="center">@white-block/types</h1>
<br>

[![npm publish](https://img.shields.io/github/actions/workflow/status/DIYgod/RSSHub/npm-publish.yml?branch=master&label=npm%20publish&logo=npm&style=flat-square)](https://www.npmjs.com/package/rsshub)
[![test](https://img.shields.io/github/actions/workflow/status/DIYgod/RSSHub/test.yml?branch=master&label=test&logo=github&style=flat-square)](https://github.com/DIYgod/RSSHub/actions/workflows/test.yml?query=event%3Apush+branch%3Amaster)
[![Test coverage](https://img.shields.io/codecov/c/github/DIYgod/RSSHub.svg?style=flat-square&logo=codecov)](https://app.codecov.io/gh/DIYgod/RSSHub/branch/master)

[中文文档](./README.zh.md)

## 简介
`@white-block/types`用于解析 Vue3.x 中 Props 和 Emits 类型。搭配 white-block 实现 Vue 中 Props 和 Emits 类型定义和解析的一体化。

支持解析成对象形式和数组形式，更方便使用。还额外提供了数据快速转换成 markdown 表格的工具函数，用于方便搭建组件库相关文档。
## 使用


### 定义并解析Props 和 Emits
```js
import { VueTypeResolver } from '@white-block/types'

const code = `export const Props = {
      /** 基础类型 */
      base: {
        type: Number,
        default: 0
      },
      /** 基础类型 + 属性 */
      properties: {
        type: Boolean,
        default: false,
        required: true
      },
      /** 自定义TS类型 */
      custom: {
        type: String as PropType<CustomType>,
        default: () => 'a1b2c3',
        required: true
      },
      /** 联合类型 */
      union: {
        type: String as PropType<AAA | BBB>,
        default: 'aaa'
      },
      /** 交叉类型 */
      intersection: {
        type: Object as PropType<AAA & BBB>,
        default() { return  { a: 'bbb' } }
      },
      /** 复杂类型 */
      complex: {
        type: Array as PropType<(AAA | BBB)[]>,
        default: () => ['aaa', 'bbb']
      }
    }

    export type Emits = {
      /** 导出类型 */
      click: [e: MouseEvent]
    }
    
    export default {
      /** 按钮类型 */
      type: {
        type: String as PropType<ButtonType>,
        default: 'default'
      },
      /** 组件尺寸 */
      size: {
        type: String as PropType<ButtonSize>,
        default: 'medium',
        required: true
      }
    }`
    const resolver = new VueTypeResolver(code)
    
```
### 获取类型定义

####  获取 Props 的类型定义 - 对象形式
```ts
resolver.getExports().Props
```
##### 输出
```ts
  {
    base: {
      comment: '* 基础类型 ',
      type: 'Number',
      default: 0
    },
    properties: {
      comment: '* 基础类型 + 属性 ',
      type: 'Boolean',
      default: false,
      required: true
    },
    custom: {
      comment: '* 自定义TS类型 ',
      type: 'String as CustomType',
      default: 'a1b2c3',
      required: true
    },
    union: {
      comment: '* 联合类型 ',
      type: 'String as AAA|BBB',
      default: 'aaa'
    },
    intersection: {
      comment: '* 交叉类型 ',
      type: 'Object as AAA&BBB',
      default: { a: 'bbb' }
    },
    complex: {
      comment: '* 复杂类型 ',
      type: 'Array as (AAA|BBB)[]',
      default: ['aaa', 'bbb']
    }
  }
```

####  获取 Props 的类型定义 - 数组形式
```ts
resolver.getTransformExports('Props')
```
##### 输出
```ts
  [
    {
      name: 'base',
      comment: '* 基础类型 ',
      required: false,
      type: 'Number',
      ts: 'number',
      default: 0
    },
    {
      name: 'properties',
      comment: '* 基础类型 + 属性 ',
      required: true,
      type: 'Boolean',
      ts: 'boolean',
      default: false
    },
    {
      name: 'custom',
      comment: '* 自定义TS类型 ',
      required: true,
      type: 'String',
      ts: 'CustomType',
      default: 'a1b2c3'
    },
    {
      name: 'union',
      comment: '* 联合类型 ',
      required: false,
      type: 'String',
      ts: 'AAA|BBB',
      default: 'aaa'
    },
    {
      name: 'intersection',
      comment: '* 交叉类型 ',
      required: false,
      type: 'Object',
      ts: 'AAA&BBB',
      default: { a: 'bbb' }
    },
    {
      name: 'complex1',
      comment: '* 复杂类型1 ',
      required: false,
      type: 'Array',
      ts: '(AAA|BBB)[]',
      default: ['aaa', 'bbb']
    },
    {
      name: 'complex2',
      comment: '* 复杂类型2 ',
      required: false,
      type: 'Array',
      ts: '(AAA|BBB)[]',
      default: {
        a: 1,
        b: '2',
        c: false
      }
    }
  ]
```

####  获取 Emits 的类型定义 - 对象形式
```ts
resolver.getExports().Emits
```
##### 输出
```ts
  {
    click: {
      comment: '* 导出类型 ',
      params: { e: 'MouseEvent' }
    }
  }
```

####  获取 Emits 的类型定义 - 数组形式
```ts
resolver.getTransformTypeExports('Emits')
```
##### 输出
```ts
  [
    {
      name: 'click',
      comment: '* 导出类型 ',
      params: { e: 'MouseEvent' }
    }
  ]
```

## 工具函数

### VueTypeResolver
解析器类，用于解析 Vue3.x 中 Props 和 Emits 类型。

### generateMarkdownTable
工具类，用于从解析的类型数据生成 markdown表格。

### ...

## 应用例子
具体使用可参考 `test` 文件夹

#### Emits定义如下
```ts
  export type Emits = {
    /** 导出类型 */
    click: [e: MouseEvent]
  }
```

#### 输出
| 名称 | 参数 | 描述 |
| :-------- | :-------- | :-------- |
| click | `(e: MouseEvent, payload: Data)` | 点击时触发 |

#### Props定义如下
```ts
  export const Props = {
    /** 按钮类型 */
    type: {
      type: String as PropType<ButtonType>,
      default: 'default'
    },
    /** 组件尺寸 */
    size: {
      type: String as PropType<ButtonSize>,
      default: 'medium',
      required: true
    }
  }
```

#### 输出如下

| 名称 | 类型 | TS类型 | 默认值 | 说明 | 必传 |
| :-------- | :-------- | :-------- | :-------- | :-------- | :--------: |
| type | String | ButtonType | `'default'` | 按钮类型 | N |
| size | String | ButtonSize | `'medium'` | 组件尺寸 | Y |