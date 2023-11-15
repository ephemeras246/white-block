import * as components from './components'
import type { App } from 'vue'

export * from './components'

export function install(app: App) {
  for (const key in components) {
    app.use(components[key])
  }
}

export default {
  install,
  version: '0.1.0'
}
