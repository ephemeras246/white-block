import { App, Plugin, Component } from 'vue'

export function withInstall(component: Component) {
  const comp = component as Component & Plugin
  comp.install = (app: App) => {
    if (comp.name) {
      app.component(comp.name, comp)
    }
  }
  return comp
}
