import { build, InlineConfig } from 'vite'
import { getEntries, getBundleConfig, TSupportFormat } from './vite'

const BUILD_FORMATS: TSupportFormat[] = ['esm', 'es', 'cjs']
const components = getEntries()
for (const format of BUILD_FORMATS) {
  // all
  const config = getBundleConfig({ format }) as InlineConfig
  build(config)

  // components
  for (const component in components) {
    const compConfig = getBundleConfig({
      component,
      format
    }) as InlineConfig
    build(compConfig)
  }
}
