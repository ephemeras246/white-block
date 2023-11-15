---
title: White Block
description: 更具可用性的 Vue 组件库。
---

## 安装

推荐使用 pnpm 方式进行开发

```shell
pnpm add white-block
```

## 使用

White Block 提供了三种方式使用组件，具体使用方式如下：
### 基础使用

基础使用会全量注册所有组件，如果您的项目大规模使用组件，请放心使用这种方式。

```js
import { createApp } from 'vue'
import WhiteBlock from 'white-block'
import App from './App.vue'

// 引入组件库的少量全局样式变量
import 'white-block/dist/styles/index.css'

const app = createApp(App)
app.use(WhiteBlock)
```

### 按需引入使用

如果您对产物大小有严格的要求，可以通过 按需引入具体组件 的方式来使用。

借助 Webpack 或 Rollup 等支持 tree-shaking 特性的构建工具，可以达到按需引入的使用效果。

```js
import { createApp } from 'vue'
import { Button as WbButton } from 'white-block'
import App from './app.vue'

// 引入组件库的少量全局样式变量
import 'white-block/dist/styles/index.css'

const app = createApp(App)
app.use(WbButton)
```

### 通过插件按需引用使用

除此之外，也可以使用 `unplugin-vue-components` 和 `unplugin-auto-import` 来实现自动导入：

您仍需在项目引入组件库的少量全局样式变量
```js
import { createApp } from 'vue'
// 引入组件库的少量全局样式变量
import 'white-block/dist/styles/index.css'

const app = createApp(App);
```
并安装两个 unplugin 相关的第三方包和当前组件库对应的 resolver 方法。
```bash
npm install -D unplugin-vue-components unplugin-auto-import @white-block/unplugin-vue-resolver
```

然后在 Vite 对应的配置文件添加上述插件。

```js
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { WhiteBlockResolver } from '@white-block/unplugin-vue-resolver'
export default {
  plugins: [
    // ...
    AutoImport({
      resolvers: [WhiteBlockResolver()]
    }),
    Components({
      resolvers: [WhiteBlockResolver()]
    })
  ]
}
```

## 浏览器兼容性

| [<img src="https://tdesign.gtimg.com/docs/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/> IE / Edge | [<img src="https://tdesign.gtimg.com/docs/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://tdesign.gtimg.com/docs/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://tdesign.gtimg.com/docs/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari |
| --- | --- | --- | --- |
| Edge >=84 | Firefox >=83 | Chrome >=84 | Safari >=14.1 |