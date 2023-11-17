import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { TDesignResolver } from 'unplugin-vue-components/resolvers'
// import { resolver as WhiteBlockResolver } from '@white-block/resolver'

export default defineConfig({
  ssr: {
    noExternal: ['postprocessing']
  },
  resolve: {
    alias: [
      {
        find: '@/',
        replacement: `${resolve(__dirname, 'src')}/`
      }
    ]
  },
  plugins: [
    UnoCSS(),
    Components({
      dirs: ['src/components'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        {
          type: 'component',
          resolve: name => {
            if (name.match(/^T[A-Z]/)) {
              const importName = name.match(/^T[A-Z]/) ? name.slice(1) : name
              return {
                name: importName,
                from: `tdesign-vue-next`
              }
            }
          }
        },
        {
          type: 'component',
          // eslint-disable-next-line consistent-return
          resolve: name => {
            if (name.match(/^Wb[A-Z]/)) {
              const importName = name.match(/^Wb[A-Z]/) ? name.slice(2) : name
              return {
                name: importName,
                from: `white-block`
              }
            }
          }
        }
        // WhiteBlockResolver()
      ]
    }),
    AutoImport({
      resolvers: [
        {
          type: 'component',
          resolve: name => {
            if (name.match(/^T[A-Z]/)) {
              const importName = name.match(/^T[A-Z]/) ? name.slice(1) : name
              return {
                name: importName,
                from: `tdesign-vue-next`
              }
            }
          }
        },
        {
          type: 'component',
          // eslint-disable-next-line consistent-return
          resolve: name => {
            if (name.match(/^Wb[A-Z]/)) {
              const importName = name.match(/^Wb[A-Z]/) ? name.slice(2) : name
              return {
                name: importName,
                from: `white-block`
              }
            }
          }
        }
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
