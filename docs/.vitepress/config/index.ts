import { defineConfig } from 'vitepress'
import mdPlugin from '../../src/plugins/md'
import siteConfig from './site'

const ogUrl = 'https://kythuen.github.io/white-block/'
const ogImage = `${ogUrl}logo.png`
const title = 'White Block'
const description = 'More user friendly components for Vue'

export default defineConfig({
  lang: 'en-US',
  title,
  titleTemplate: title,
  description,
  head: [
    ['link', { rel: 'icon', href: '/logo.png', type: 'image/png' }],
    ['meta', { name: 'author', content: 'Kythuen' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { name: 'og:title', content: title }],
    ['meta', { name: 'og:description', content: description }],
    ['meta', { property: 'og:image', content: ogImage }]
  ],
  srcDir: 'content',
  outDir: './dist',
  base: '/white-block/',
  themeConfig: siteConfig,
  vite: {
    configFile: 'vite.config.ts'
  },
  markdown: {
    config: md => mdPlugin(md)
  }
  // transformPageData
})
