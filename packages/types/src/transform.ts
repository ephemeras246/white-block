import { TS_TYPE_MAP } from './constant'
import type { ResolveVueProp, ResolveVueEmit } from './parse'

export interface TransformExportVariable {
  name: string
  comment: string
  type: string
  ts: string
  default: any
  required: boolean
}
export function transformExportVariable(exportVariable: Record<string, ResolveVueProp>) {
  const result: TransformExportVariable[] = []
  for(const name in exportVariable) {
    const { comment = '', type,  required = false, default: defaultValue = null  } = exportVariable[name]
    const [VueType, TSType] = type.split(' as ')
    const ts = TSType ?? TS_TYPE_MAP[VueType] ?? ''
    result.push({
      name,
      comment,
      type: VueType,
      ts,
      required,
      default: defaultValue,
    })
  }
  return result
}

export interface TransformExportTypeVariable {
  name: string
  comment: string
  params: Record<string, string>
}
export function transformExportTypeVariable(exportVariable: Record<string, ResolveVueEmit>) {
  const result: TransformExportTypeVariable[] = []
  for(const name in exportVariable) {
    const { comment = '', params } = exportVariable[name]
    result.push({
      name,
      comment,
      params
    })
  }
  return result
}
