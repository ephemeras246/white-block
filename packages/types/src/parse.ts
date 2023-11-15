export interface ResolveVueProp {
  type: string
  required?: boolean
  comment?: string
  default?: any
}
export interface ResolveVueEmit {
  // name: string
  comment: string
  params: Record<string, string>
}

function resolveNode(node: any): any {
  const { type } = node
  if (type === 'Identifier') {
    return node.name
  }
  if (type === 'Literal') {
    return node.value
  }
  if (type === 'CommentBlock') {
    return node.value
  }
  return null
}
function resolveNodeType(node: any): any {
  const { type } = node
  if (type === 'TSTypeReference') {
    if (node.typeParameters) {
      return resolveNodeType(node.typeParameters)
    }
    return node.typeName.name
  }
  if (type === 'TSIntersectionType') {
    return node.types.map((i: any) => resolveNodeType(i)).join('&')
  }
  if (type === 'TSUnionType') {
    return node.types.map((i: any) => resolveNodeType(i)).join('|')
  }
  if (type === 'TSArrayType') {
    return `${resolveNodeType(node.elementType)}[]`
  }
  if (type === 'TSParenthesizedType') {
    return `(${resolveNodeType(node.typeAnnotation)})`
  }
  if (type === 'TSTypeParameterInstantiation') {
    return resolveNodeType(node.params[0])
  }
  if (type === 'TSAsExpression') {
    return `${resolveNode(node.expression)} as ${resolveNodeType(node.typeAnnotation)}`
  }
  return 'Unknow'
}

/** 解析Vue Emits 类型 */
export function resolveVueEmits(node: any): any {
  const { type } = node
  if (type === 'Identifier') {
    return resolveNode(node)
  }
  if (type === 'CommentBlock') {
    return resolveNode(node)
  }
  if (type === 'TSTypeReference') {
    return resolveVueEmits(node.typeName)
  }
  if (type === 'TSNamedTupleMember') {
    return {[resolveVueEmits(node.label)]: resolveVueEmits(node.elementType) }
  }
  if (type === 'TSTupleType') {
    let result: any = {}
    node.elementTypes.forEach((i: any) => {
      result = {
        ...result,
        ...resolveVueEmits(i)
      }
    })
    return result
  }
  if (type === 'TSTypeAnnotation') {
    return resolveVueEmits(node.typeAnnotation)
  }
  if (type === 'TSPropertySignature') {
    const property: ResolveVueEmit = {
      comment: node.leadingComments.map((i: any) => resolveVueEmits(i)).join('\n'),
      params: resolveVueEmits(node.typeAnnotation)
    }
    return property
  }
  if (type === 'TSTypeLiteral') {
    const result: any = {}
    node.members.forEach((i: any) => {
      result[resolveVueEmits(i.key)] = resolveVueEmits(i)
    })
    return result
    // return node.members.map((i: any) => resolveVueEmits(i))
  }
  if (type === 'TSTypeAliasDeclaration') {
    return { [resolveVueEmits(node.id)]: resolveVueEmits(node.typeAnnotation) }
  }
  if (type === 'ExportNamedDeclaration') {
    return resolveVueEmits(node.declaration)
  }
  return null
}
/** 解析Vue Props 类型 */
export function resolveVueProps(node: any): any {
  const { type } = node
  if (type === 'Identifier') {
    return resolveNode(node)
  }
  if (type === 'Literal') {
    return resolveNode(node)
  }
  if (type === 'ReturnStatement') {
    return resolveVueProps(node.argument)
  }
  if (type === 'FunctionExpression') {
    return resolveVueProps(node.body.body[0])
  }
  if (type === 'ArrowFunctionExpression') {
    if (node.body.elements) {
      return node.body.elements.map((i: any) => resolveNode(i))
    }
    return resolveVueProps(node.body)
  }
  if (type === 'TSAsExpression') {
    return resolveNodeType(node)
  }
  if (type === 'Property') {
    return resolveVueProps(node.value)
  }
  if (type === 'ObjectExpression') {
    const result: Record<string, ResolveVueProp> = {}
    node.properties.forEach((i: any) => {
      const data = resolveVueProps(i)
      if (i.leadingComments) {
        data.comment = i.leadingComments?.map((c: any) => resolveNode(c))?.join('\n') || ''
      }
      result[resolveNode(i.key)] = data
    })
    return result
  }
  if (type === 'VariableDeclarator') {
    return resolveVueProps(node.init)
  }
  if (type === 'VariableDeclaration') {
    return { [resolveNode(node.declarations[0].id)]: resolveVueProps(node.declarations[0]) }
  }
  if (type === 'ExportNamedDeclaration') {
    return resolveVueProps(node.declaration)
  }
  if (type === 'ExportDefaultDeclaration') {
    return { default:resolveVueProps(node.declaration) }
  }
  return null
}
