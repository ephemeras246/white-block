import { describe, expect, it } from 'vitest'
import { generateMarkdownTable, TableDataItem, TableHeaderItem } from '../src'

describe('# Table', () => {
  it('## GenerateMarkdownTable Props', () => {
    const options: TableHeaderItem[] = [
      { label: '名称', value: 'name' },
      { label: '类型', value: 'type' },
      { label: 'TS类型', value: 'ts' },
      { label: '默认值', value: 'default' },
      {
        label: '说明',
        value: 'comment',
        transform: (val: string) => val.match(/\*\s+(.*)\s*$/)?.[1]?.trim() || '-'
      },
      {
        label: '必传',
        value: 'required',
        align: 'center',
        transform: (val: boolean) => (val ? 'Y' : 'N')
      }
    ]
    const data: TableDataItem[] = [
      {
        name: 'type',
        comment: '* 按钮类型 ',
        required: false,
        type: 'String',
        ts: 'ButtonType',
        default: 'default'
      },
      {
        name: 'size',
        comment: '* 组件尺寸 ',
        required: false,
        type: 'String',
        ts: 'ButtonSize',
        default: 'medium'
      }
    ]
    const tableOptions = { options, data }
    expect(generateMarkdownTable(tableOptions)).toBe(`| 名称 | 类型 | TS类型 | 默认值 | 说明 | 必传 |
| :-------- | :-------- | :-------- | :-------- | :-------- | :--------: |
| type | String | ButtonType | default | 按钮类型 | N |
| size | String | ButtonSize | medium | 组件尺寸 | N |`)
  })
  it('## GenerateMarkdownTable Emits', () => {
    const options: TableHeaderItem[] = [
      { label: '名称', value: 'name' },
      { label: '参数',
        value: 'params',
        transform: (params: Record<string, string>) => {
          const result: string[] = []
          for(const event in params) {
            result.push(`${event}: ${params[event]}`)
          }
          return `\`(${result.join(', ')})\``
        }
      },
      { label: '描述', value: 'comment', transform: (comment: string) => comment.match(/\*\s+(\S*)\s*$/)?.[1]?.trim() || '-'}
    ]
    const data: TableDataItem[] = [
      {
        "name": "click",
        "comment": "* 点击时触发 ",
        "params": {e: 'MouseEvent', payload: 'Data' }
      }
    ]
    const tableOptions = { options, data }
    expect(generateMarkdownTable(tableOptions)).toBe(`| 名称 | 参数 | 描述 |
| :-------- | :-------- | :-------- |
| click | \`(e: MouseEvent, payload: Data)\` | 点击时触发 |`)
  })
})


