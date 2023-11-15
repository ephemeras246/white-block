import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJSX from '@vitejs/plugin-vue-jsx'
import Unocss from 'unocss/vite'

export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@/',
        replacement: `${resolve(__dirname, 'src')}/`
      }
    ]
  },
  plugins: [Unocss(), vue(), vueJSX()],
  build: {
    emptyOutDir: false,
    minify: false,
    cssMinify: false,
    lib: {
      entry: 'src/index.ts'
    },
    rollupOptions: {
      output: [
        {
          dir: 'dist',
          format: 'es',
          assetFileNames: 'styles/index.css',
          entryFileNames: `es/index.js`,
          chunkFileNames: `es/_chunks/dep-[hash].js`,
          sourcemap: true
        }
      ],
      external: ['vue']
    }
  }
})
