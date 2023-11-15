import { describe, expect, it } from 'vitest'
import { VueTypeResolver } from '../../src'

describe('# VueTypeResolver const', () => {
  it('## TransformExportVariable Props', () => {
    const code = `export const Props = {
      /** 基础类型 */
      base: {
        type: Number,
        default: 0
      },
      /** 基础类型 + 属性 */
      properties: {
        type: Boolean,
        default: false,
        required: true
      },
      /** 自定义TS类型 */
      custom: {
        type: String as PropType<CustomType>,
        default: () => 'a1b2c3',
        required: true
      },
      /** 联合类型 */
      union: {
        type: String as PropType<AAA | BBB>,
        default: 'aaa'
      },
      /** 交叉类型 */
      intersection: {
        type: Object as PropType<AAA & BBB>,
        default() { return  { a: 'bbb' } }
      },
      /** 复杂类型1 */
      complex1: {
        type: Array as PropType<(AAA | BBB)[]>,
        default: () => ['aaa', 'bbb']
      },
      /** 复杂类型2 */
      complex2: {
        type: Array as PropType<(AAA | BBB)[]>,
        default: () => ({
          a: 1,
          b: '2',
          c: false
        })
      }
    }`
    const resolver = new VueTypeResolver(code)
    expect(resolver.getTransformExports('Props')).toEqual([
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
  it('## TransformExportVariable type', () => {
    const code = `export type Emits = {
      /** 导出类型 */
      click: [e: MouseEvent]
    }`
    const resolver = new VueTypeResolver(code)
    expect(resolver.getTransformTypeExports('Emits')).toEqual([
      {
        name: 'click',
        comment: '* 导出类型 ',
        params: { e: 'MouseEvent' }
      }
    ])
  })
})
