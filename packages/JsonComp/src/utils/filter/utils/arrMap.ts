import isString from 'lodash/isString'
import isObject from 'lodash/isObject'
import get from 'lodash/get'
import set from 'lodash/set'

import { resolveVariableAndFilter } from 'amis-formula'
import { createObject } from '../../index'

type ModelType = 'join' | 'map'

interface RuleItem {
  model?: ModelType // 解析策略 默认是 map
  key: string
  valueKeyMap?: any // key 获取到的值的映射map
  otherProps?: any
}
interface RuleMapItem {
  key?: string // 在新对象中的 key
  rule?: string | RuleItem // 字符串时为amis-formula filter的用法
}

interface RuleMap {
  [key: string]: RuleMapItem // 旧对象中的key: 对应的解析策略
}
interface ArrMapFilterInput {
  data: any
  ruleMap: RuleMap
  otherProps?: any
}

type RuleModelFunc = ({
  rule,
  data,
  value,
  obj,
  key
}: {
  rule: RuleItem | string
  data: any
  value: any
  obj: any
  key: string
}) => any

interface RuleModelMap {
  [key: string]: RuleModelFunc
}

export const valueKeyMapModel: RuleModelFunc = ({ rule, data, value }) => {
  // ruleKey 优先使用该 key 的值来操作
  const { key: ruleKey, valueKeyMap } = rule as RuleItem
  let ruleKeyValue
  if (ruleKey) {
    ruleKeyValue = get(data, ruleKey)

    if (valueKeyMap) {
      ruleKeyValue = valueKeyMap[ruleKeyValue]
    }
  }

  return ruleKeyValue || value
}

export const joinModel: RuleModelFunc = ({ rule, value, obj, key }) => {
  const { key: objKey, otherProps } = rule as RuleItem
  const arr = get(obj, key, [])

  if (value === undefined) {
    return arr
  }

  let valObj = value

  if (objKey) {
    valObj = {}
    set(valObj, objKey, value)

    if (otherProps) {
      valObj = {
        ...(otherProps || {}),
        ...valObj
      }
    }
  }

  arr.push(valObj)

  return arr
}

export const getRuleModelMap = (): RuleModelMap => ({
  map: valueKeyMapModel,
  join: joinModel
})

export const fn = (input: ArrMapFilterInput, showData: any) => {
  // console.log('registerFilter arrMap input:', input)

  const { data, ruleMap, otherProps } = input || {}

  if (!Array.isArray(data)) {
    console.warn('registerFilter arrMap input.data is not array', data)
    return []
  }

  const returnData = data.map((item: any) => {
    if (!isObject(item)) {
      if (isString(item) && isString(ruleMap)) {
        return {
          [ruleMap]: item
        }
      }

      return {}
    }

    return Object.keys(ruleMap || {}).reduce(
      (obj: any, ruleKey: string) => {
        const ruleItem = ruleMap[ruleKey]

        const { key = ruleKey, rule } = ruleItem

        const inputItem = item as any

        let value: any = get(inputItem, ruleKey)
        const contextData = createObject(showData, {
          v: value
        })
        if (rule) {
          if (isString(rule)) {
            // console.log('rule', rule)
            if (rule.includes('${')) {
              value = resolveVariableAndFilter(rule, contextData)
            } else {
              value = resolveVariableAndFilter(
                '${v' + ` | ${rule} ` + '}',
                contextData
              )
            }
          } else if (!Array.isArray(rule)) {
            const { model = 'map' } = rule

            const func = getRuleModelMap()[model]

            if (func) {
              value = func({
                rule,
                data: inputItem,
                value,
                obj,
                key
              })
            }
          }
        }

        set(obj, key, value)

        return obj
      },
      {
        ...(otherProps || {})
      } as any
    )
  })
  // console.log('registerFilter arrMap returnData:', returnData)
  return returnData
}

const filter: any = {
  fn(input: any) {
    return fn(input, this?.data)
  }
}

export default filter.fn
