export function transformDefaultValue(value: any) {
  if (typeof value === 'string') return `\`'${value}'\``
  return `\`${value}\``
}
