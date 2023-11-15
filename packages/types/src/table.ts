import { TABLE_FLAG_ALIGNS } from './constant'

export interface TableHeaderItem {
  label: string
  value: string
  align?: 'left' | 'right' | 'center'
  transform?: Function
}

export type TableDataItem = Record<string, any>

export interface GenerateMarkdownTableOptions {
  options: TableHeaderItem[]
  data: TableDataItem[]
  // eslint-disable-next-line no-unused-vars
  transformItem?: (propName: string, propValue: any) => void
}

/** 生成 Markdown 表格 */
export function generateMarkdownTable(
  generateOptions: GenerateMarkdownTableOptions
) {
  const { options, data, transformItem } = generateOptions
  const lines: string[] = []
  const headerLine: string[] = []
  const flagLine: string[] = []
  const props: string[] = []
  const transforms: Record<string, Function> = {}
  for (const h of options) {
    headerLine.push(h.label)
    const align = h.align || 'left'
    flagLine.push(TABLE_FLAG_ALIGNS[align])
    props.push(h.value)
    if (h.transform) {
      transforms[h.value] = h.transform
    }
  }
  lines.push(`| ${headerLine.join(' | ')} |`)
  lines.push(`| ${flagLine.join(' | ')} |`)
  for (const row of data) {
    const line: any = []
    for (const prop of props) {
      let propData = row[prop]
      if (transforms[prop]) {
        propData = transforms[prop](propData)
      }
      if (transformItem) {
        transformItem(prop, propData)
      }
      line.push(propData)
    }
    lines.push(`| ${line.join(' | ')} |`)
  }
  return lines.join('\n')
}
