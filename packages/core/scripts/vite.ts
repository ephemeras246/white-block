import { resolve } from 'node:path'
import glob from 'fast-glob'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import type { WatcherOptions, ModuleFormat } from 'rollup'

export { ModuleFormat }

export function getEntries() {
  const components = glob.sync(['src/components/*/index.ts'])
  const regex = /^src\/components\/(.+)\/index\.ts$/
  const result: any = {}

  for (const file of components) {
    const match = file.match(regex)
    if (match) {
      result[match[1]] = file
    }
  }
  return result
}

export type TSupportFormat = 'cjs' | 'esm' | 'es'
const plugins = [vue(), Unocss()]
const FORMAT_DIR_MAP: Record<TSupportFormat, { dir: string; ext: string }> = {
  cjs: { dir: 'lib', ext: 'js' },
  esm: { dir: 'esm', ext: 'mjs' },
  es: { dir: 'es', ext: 'js' }
}

export interface GetBundleConfigOptions {
  component?: string
  format: TSupportFormat
  sourcemap?: boolean
  watch?: WatcherOptions
  emptyOutDir?: boolean
  minify?: boolean
  cssMinify?: boolean
}
export function getBundleConfig(options: GetBundleConfigOptions) {
  const {
    component,
    format,
    sourcemap = true,
    emptyOutDir = false,
    watch = false,
    minify = false,
    cssMinify = false
  } = options
  const { dir, ext } = FORMAT_DIR_MAP[format]
  const jsExt = minify ? `min.${ext}` : ext
  const cssExt = cssMinify ? 'min.css' : 'css'
  return {
    configFile: false,
    plugins,
    resolve: {
      alias: [
        {
          find: '@/',
          replacement: `${resolve(__dirname, '../src')}/`
        }
      ]
    },
    build: {
      emptyOutDir,
      minify,
      cssMinify,
      lib: {
        entry: component
          ? `src/components/${component}/index.ts`
          : 'src/index.ts'
      },
      rollupOptions: {
        output: [
          {
            // banner,
            dir: 'dist',
            format,
            assetFileNames: component
              ? `styles/${component}.${cssExt}`
              : `styles/index.${cssExt}`,
            entryFileNames: component
              ? `${dir}/${component}/index.${jsExt}`
              : `${dir}/index.${jsExt}`,
            chunkFileNames: `${dir}/_chunks/dep-[hash].${jsExt}`,
            sourcemap
          }
        ],
        external: ['vue']
      },
      watch
    }
  }
}
