import { defineConfig } from 'unocss/vite'
import {
  presetAttributify,
  presetIcons,
  presetMini,
  transformerDirectives
} from 'unocss'

export default defineConfig({
  presets: [presetAttributify(), presetIcons(), presetMini()],
  transformers: [transformerDirectives()]
})
