import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import MarkdownIt from 'markdown-it'
import { VueTypeResolver, generateMarkdownTable } from '@white-block/types'
import { propsHeader, emitsHeader } from './constant'

const Md = MarkdownIt()

export async function transformPageData(pageData) {
  const { frontmatter } = pageData
  const extendData: any = {}
  if (frontmatter.component) {
    const propsSource = readFileSync(
      resolve(
        __dirname,
        `../../../packages/core/src/components/${frontmatter.component}/api.ts`
      ),
      'utf-8'
    )
    // TODO: 此处可以获取到相对于core仓库的路径，替换imports里面的路径， transform中做转换
    const resolver = new VueTypeResolver(propsSource)
    const propsData = resolver.getTransformExports('Props') ?? []
    const emitsData = resolver.getTransformTypeExports('Emits') ?? []
    const propsTable = generateMarkdownTable({
      options: propsHeader,
      data: propsData
    })
    const emitsTable = generateMarkdownTable({
      options: emitsHeader,
      data: emitsData
    })
    extendData.props = JSON.stringify(Md.render(propsTable))
    extendData.events = JSON.stringify(Md.render(emitsTable))
  }
  return extendData
}
