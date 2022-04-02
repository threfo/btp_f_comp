import { resolveVariable } from 'amis-formula'

/**
 * 如果当前传入字符为：'xxx'或者"xxx"，则返回字符xxx
 * 否则去数据域中，获取变量xxx
 *
 * @param value 传入字符
 * @param data 数据域
 */
export const getStrOrVariable = (value: any, data: any, ast?: any) => {
  // 通过读取 ast 来判断，只有 literal 才可能是变量，也可能是字符串
  // 其他的直接返回值即可。
  if (ast?.type && ast.type !== 'literal') {
    return value
  }

  return typeof value === 'string' && /,/.test(value)
    ? value.split(/\s*,\s*/).filter(item => item)
    : typeof value === 'string'
    ? resolveVariable(value, data)
    : value
}
