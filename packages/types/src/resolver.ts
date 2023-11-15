import { parser as ASTParser, ASTParseResult } from './ast'
import { transformExportVariable, transformExportTypeVariable } from './transform'
import {
  getImportDeclaration,
  getExportDeclaration,
  GetImportDeclaration,
  GetExportDeclarationEmit,
  GetExportDeclarationProp
} from './declaration'

export type VueTypeResolverImports = GetImportDeclaration
export type VueTypeResolverExports = Record<string, (GetExportDeclarationEmit | GetExportDeclarationProp)[]>

export class VueTypeResolver {
  ast: ASTParseResult
  imports: VueTypeResolverImports = {}
  exports: VueTypeResolverExports = {}

  constructor(code: string) {
    this.ast = ASTParser(code)
    const { body } = this.ast.program
    body.forEach(item => {
      if (item.type === 'ImportDeclaration') {
        this.imports = { ...this.imports, ...getImportDeclaration(item) }
      } else if (
        ['ExportDefaultDeclaration', 'ExportNamedDeclaration'].includes(
          item.type
        )
      ) {
        this.exports = { ...this.exports, ...getExportDeclaration(item) }
      }
    })
  }

  getAST() {
    return this.ast
  }
  getImports() {
    return this.imports
  }
  getExports() {
    return this.exports
  }
  getTransformExports(exportKey: string) {
    const exportKeyData = this.exports[exportKey] || {}
    return transformExportVariable(exportKeyData as any)
  }
  getTransformTypeExports(exportKey: string) {
    const exportKeyData = this.exports[exportKey] || {}
    return transformExportTypeVariable(exportKeyData as any)
  }
}
