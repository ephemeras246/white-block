import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { TDesignResolver } from 'unplugin-vue-components/resolvers'
import { resolver as WhiteBlockResolver } from '@white-block/resolver'

export default defineConfig({
  ssr: {
    noExternal: ['postprocessing']
  },
  resolve: {
    alias: [
      {
        find: '@/',
        replacement: `${resolve(__dirname, 'src')}/`
      },
      {
        find: '@white-block/types',
        replacement: '@white-block/types/dist/index.js'
      }
    ]
  },
  plugins: [
    UnoCSS(),
    Components({
      dirs: ['src/components'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        TDesignResolver({
          library: 'vue-next'
        })
        // WhiteBlockResolver()
      ]
    }),
    AutoImport({
      resolvers: [
        TDesignResolver({
          library: 'vue-next'
        })
        // WhiteBlockResolver()
      ]
    })
  ],
  optimizeDeps: {
    exclude: ['vitepress']
  },
  server: {
    hmr: {
      overlay: false
    }
  }
})
