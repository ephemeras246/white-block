import { describe, expect, it } from 'vitest'
import { transformExportVariable, transformExportTypeVariable } from '../src'

describe('# Transform', () => {
  it('## TransformExportVariable', () => {
    const exportVariable = {
      base: {
        comment: '* 基础类型 ',
        type: 'Number',
        default: 0
      },
      properties: {
        comment: '* 基础类型 + 属性 ',
        type: 'Boolean',
        default: false,
        required: true
      },
      custom: {
        comment: '* 自定义TS类型 ',
        type: 'String as CustomType',
        default: 'a1b2c3',
        required: true
      },
      union: {
        comment: '* 联合类型 ',
        type: 'String as AAA|BBB',
        default: 'aaa'
      },
      intersection: {
        comment: '* 交叉类型 ',
        type: 'Object as AAA&BBB',
        default: { a: 'bbb' }
      },
      complex1: {
        comment: '* 复杂类型1 ',
        type: 'Array as (AAA|BBB)[]',
        default: ['aaa', 'bbb']
      },
      complex2: {
        comment: '* 复杂类型2 ',
        type: 'Array as (AAA|BBB)[]',
        default: {
          a: 1,
          b: '2',
          c: false
        }
      }
    }
    expect(transformExportVariable(exportVariable)).toEqual([
      {
        name: 'base',
        comment: '* 基础类型 ',
        required: false,
        type: 'Number',
        ts: 'number',
        default: 0
      },
      {
        name: 'properties',
        comment: '* 基础类型 + 属性 ',
        required: true,
        type: 'Boolean',
        ts: 'boolean',
        default: false
      },
      {
        name: 'custom',
        comment: '* 自定义TS类型 ',
        required: true,
        type: 'String',
        ts: 'CustomType',
        default: 'a1b2c3'
      },
      {
        name: 'union',
        comment: '* 联合类型 ',
        required: false,
        type: 'String',
        ts: 'AAA|BBB',
        default: 'aaa'
      },
      {
        name: 'intersection',
        comment: '* 交叉类型 ',
        required: false,
        type: 'Object',
        ts: 'AAA&BBB',
        default: { a: 'bbb' }
      },
      {
        name: 'complex1',
        comment: '* 复杂类型1 ',
        required: false,
        type: 'Array',
        ts: '(AAA|BBB)[]',
        default: ['aaa', 'bbb']
      },
      {
        name: 'complex2',
        comment: '* 复杂类型2 ',
        required: false,
        type: 'Array',
        ts: '(AAA|BBB)[]',
        default: {
          a: 1,
          b: '2',
          c: false
        }
      }
    ])
  })
  it('## transformExportTypeVariable', () => {
    const exportVariable = {
      click: {
        comment: '* 导出类型 ',
        params: { e: 'MouseEvent' }
      }
    }
    expect(transformExportTypeVariable(exportVariable)).toEqual([
      {
        name: 'click',
        comment: '* 导出类型 ',
        params: { e: 'MouseEvent' }
      }
    ])
  })
})
