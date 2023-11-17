import { ComponentResolver } from 'unplugin-vue-components'

export function resolver(): ComponentResolver {
  return {
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
}
