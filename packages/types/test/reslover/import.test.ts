import { describe, expect, it } from 'vitest'
import { VueTypeResolver } from '../../src'

describe('# VueTypeResolver Import', () => {
  it('## ImportSpecifier default', () => {
    const code = `import Vue from 'vue'
    import AAA from './type'`

    const resolver = new VueTypeResolver(code)
    expect(resolver.imports).toEqual({
      Vue: 'vue',
      AAA: './type'
    })
  })
  it('## ImportSpecifier named', () => {
    const code = `import type { PropType } from 'vue'
    import { ButtonType, ButtonShape, ButtonSize } from './type'
    import { AAA } from './not-exist'`

    const resolver = new VueTypeResolver(code)

    expect(resolver.imports).toEqual({
      PropType: 'vue',
      ButtonType: './type',
      ButtonShape: './type',
      ButtonSize: './type',
      AAA: './not-exist'
    })
  })
  it('## ImportSpecifier as', () => {
    const code = `import { AAA as BBB } from './not-exist'`

    const resolver = new VueTypeResolver(code)
    expect(resolver.imports).toEqual({
      AAA: './not-exist'
    })
  })
  it('## ImportSpecifier multiple', () => {
    const code = `import Vue from 'vue'
    import AAA from './type'
    import type { PropType } from 'vue'
    import { BBB } from './type'
    import { CCC as DDD } from './type'`

    const resolver = new VueTypeResolver(code)
    expect(resolver.imports).toEqual({
      Vue: 'vue',
      AAA: './type',
      PropType: 'vue',
      BBB: './type',
      CCC: './type'
    })
  })
})
