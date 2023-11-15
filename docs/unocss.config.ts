import { defineConfig } from 'unocss/vite'
import {
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives
} from 'unocss'

export default defineConfig({
  presets: [presetUno(), presetAttributify(), presetIcons()],
  transformers: [transformerDirectives()],
  shortcuts: {
    'layout-card-1':
      'bg-slate-900/80 border-0 border-b-px border-solid border-$wb-c-border',
    'flex-center': 'flex items-center justify-center',
    'flex-row': 'flex flex-row items-center',
    'flex-col': 'flex flex-col items-center',
    'hover-transition': 'all duration-500 ease-in-out'
  }
  // theme: {
  // colors: {
  // WbColorBorder: '#64748b4d',
  // WbColorBorderDark: '#1e293b0f',
  // WbColorDemoBg: '#1e1e1e',
  // WbColorCodeBg: 'var(--vp-code-block-bg)',
  // borderColorLight: 'var(--vp-c-divider)',
  // WbBorderColor: 'var(--vp-c-border)'
  // mainColor: 'var(--td-brand-color)',
  // mainColorLight: 'var(--td-brand-color-light)',
  // pageColor: 'var(--td-bg-color-page)',
  // containerColor: 'var(--td-bg-color-container)'
  // }
  // }
})
