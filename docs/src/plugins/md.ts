import { resolve } from 'node:path'
import { readFileSync } from 'node:fs'
import MarkdownIt from 'markdown-it'
import mdContainer from 'markdown-it-container'
// import { VueTypeResolver } from '@white-block/types'

export default (md: MarkdownIt) => {
  md.use(mdContainer, 'demo', {
    validate(params: string) {
      return !!params.trim().match(/^demo\s*(.*)$/)
    },
    render(tokens: any, idx: number) {
      const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/)
      if (tokens[idx].nesting === 1) {
        const description = m && m.length > 1 ? m[1] : ''
        const sourceFileToken = tokens[idx + 2]
        const sourceFile = sourceFileToken.children?.[0].content ?? ''
        const sourceCode = readFileSync(
          resolve(
            __dirname,
            '../../../packages/core/src/components',
            `${sourceFile}`
          ),
          'utf-8'
        )
        return `<DemoBlock
                  description="${description}"
                  path="${sourceFile}"
                  source="${encodeURIComponent(sourceCode)}"
                >`
      }
      return '</DemoBlock>'
    }
  })
  md.use(mdContainer, 'usage', {
    validate(params: string) {
      return !!params.trim().match(/^usage\s*(.*)$/)
    },
    render(tokens: any, idx: number) {
      const m = tokens[idx].info.trim().match(/^usage\s*(.*)$/)
      if (tokens[idx].nesting === 1) {
        const component = m && m.length > 1 ? m[1] : ''
        const sourceFileToken = tokens[idx + 2]
        let contentProps = {}
        if (sourceFileToken.children) {
          const data = sourceFileToken.children.reduce(
            (pre, cur) => pre + cur.content,
            ''
          )
          contentProps = JSON.parse(data)
        }
        const typeContent = readFileSync(
          resolve(
            __dirname,
            '../../../packages/core/src/components',
            `${component}/api.ts`
          ),
          'utf-8'
        )
        const resolver = new VueTypeResolver(typeContent)
        const props = resolver.getExports().Props

        const propOptions: any = {
          toggle: [],
          select: []
        }
        // const defaultValue = {}
        for (const prop in props) {
          const data: any = props[prop]
          // defaultValue[prop] = data.default
          if (data.type === 'Boolean') {
            const [description] = data.comment
              .replace(/\n/g, '')
              .split(/\s\*\s/)
              .map(i => i.trim())
              .filter(i => i)
            propOptions.toggle.push({
              name: prop,
              description,
              value: data.default
            })
          } else if (data.type.indexOf('String as') > -1) {
            const [description, optionString] = data.comment
              .replace(/\n/g, '')
              .split(/\s\*\s/)
              .map(i => i.trim())
              .filter(i => i)
            propOptions.select.push({
              name: prop,
              description,
              value: data.default,
              options: JSON.parse(optionString)
            })
          }
        }

        // const resolveProps = {
        //   ...defaultValue,
        //   ...contentProps
        // }
        return `<UsageBlock
                  component="${component}"
                  options="${encodeURIComponent(JSON.stringify(propOptions))}"
                  data="${encodeURIComponent(JSON.stringify(contentProps))}"
                >`
      }
      return '</UsageBlock>'
    }
  })
}
