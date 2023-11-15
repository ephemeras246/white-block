import { resolveVueEmits, resolveVueProps, ResolveVueEmit,
  ResolveVueProp } from './parse'

/** 获取导入声明 */
export type GetImportDeclaration = Record<string, string>
export function getImportDeclaration(declaration: any) {
  const identifiers: GetImportDeclaration = {}
  declaration.specifiers.forEach((identifier: any) => {
    if (identifier.imported) {
      identifiers[identifier.imported.name] = declaration.source.value
    } else {
      identifiers[identifier.local.name] = declaration.source.value
    }
  })
  return identifiers
}

/** 获取导出声明 */
export type GetExportDeclarationEmit = ResolveVueEmit
export type GetExportDeclarationProp = ResolveVueProp
export function getExportDeclaration(declaration: any) {
  if (declaration.exportKind === 'type') {
    return resolveVueEmits(declaration)
  }
  if (declaration.exportKind === 'value') {
    return resolveVueProps(declaration)
  }
  return null
}
