import DemoBlock from '@/components/DemoBlock.vue'
import UsageBlock from '@/components/UsageBlock.vue'
import ComponentOverview from '@/components/ComponentOverview.vue'
import Layout from '@/layouts/index.vue'
import 'uno.css'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
// import WhiteBlock from 'white-block'
import 'tdesign-vue-next/es/style/index.css'
import 'white-block/dist/styles/index.css'
import './styles/index.less'

const theme: Theme = {
  ...DefaultTheme,
  Layout,
  enhanceApp(ctx) {
    // ctx.app.use(WhiteBlock)
    ctx.app.component('DemoBlock', DemoBlock)
    ctx.app.component('UsageBlock', UsageBlock)
    ctx.app.component('ComponentOverview', ComponentOverview)
  }
}

export default theme
