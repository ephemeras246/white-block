import { describe, expect, it } from 'vitest'
import { VueTypeResolver } from '../../src'

describe('# VueTypeResolver Export', () => {
  it('## ExportNamed type', () => {
    const code = `export type Emits = {
      /** 导出类型 */
      click: [e: MouseEvent]
    }`
    const resolver = new VueTypeResolver(code)
    expect(resolver.getExports().Emits).toEqual({
      click: {
        comment: '* 导出类型 ',
        params: { e: 'MouseEvent' }
      }
    })
  })
  it('## ExportNamed const', () => {
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
    expect(resolver.getExports().Props).toEqual({
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
    })
  })
  it('## ExportNamed default', () => {
    const code = `export default {
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
    expect(resolver.getExports().default).toEqual({
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
    })
  })
  it('## ExportNamed combine', () => {
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
    }

    export default {
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
    expect(resolver.getExports().default).toEqual({
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
    })
    expect(resolver.getExports().Props).toEqual({
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
    })
  })
})
