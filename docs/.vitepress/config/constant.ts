import { transformDefaultValue } from '../../src/utils'

export const propsHeader: any = [
  { label: '名称', value: 'name' },
  { label: '类型', value: 'type' },
  { label: 'TS类型', value: 'ts' },
  {
    label: '默认值',
    value: 'default',
    transform: (val: any) => transformDefaultValue(val)
  },
  {
    label: '说明',
    value: 'comment',
    transform: (val: string) => {
      const comments = val
        .match(/\*\s+(.*)\s*/g)
        ?.map(i => i.match(/\*\s(.*)\s*/)?.[1] || '')
      return comments?.join('枚举类型：') || '-'
    }
  },
  {
    label: '必传',
    value: 'required',
    align: 'center',
    transform: (val: boolean) => (val ? 'Y' : 'N')
  }
]
export const emitsHeader: any = [
  { label: '名称', value: 'name' },
  {
    label: '参数',
    value: 'params',
    transform: (params: Record<string, string>) => {
      const result: string[] = []
      for (const event in params) {
        result.push(`${event}: ${params[event]}`)
      }
      return `\`(${result.join(', ')})\``
    }
  },
  {
    label: '描述',
    value: 'comment',
    transform: (comment: string) =>
      comment.match(/\*\s+(.*)\s*$/)?.[1]?.trim() || '-'
  }
]
