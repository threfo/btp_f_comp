import {
  resolveVariableAndFilter,
  resolveVariable,
  registerFilter
} from 'amis-formula'
import isString from 'lodash/isString'
import isObject from 'lodash/isObject'
import cloneDeep from 'lodash/cloneDeep'

import { createObject } from '.'

import { initFilter } from './filter'

initFilter(registerFilter)

export const resolve = (path: string, data: any) => {
  if (!path) {
    return path
  }

  if (path === '$$') {
    return data
  }

  const [f, s] = path.split('')
  if (f === '$' && s !== '{') {
    return resolveVariable(path, data || {})
  }
  return resolveVariableAndFilter(path, data || {})
}

export const resolveObj = ({
  data,
  obj,
  deep = false
}: {
  data: any
  obj: any
  deep?: boolean
}) => {
  if (isString(obj)) {
    return resolve(obj, data)
  }

  const returnObj: any = cloneDeep(obj || {})

  const contextCacheMap: any = {}

  Object.keys(returnObj).forEach(key => {
    const val = returnObj[key]

    const contextData = createObject(data, contextCacheMap)

    const resolveKey = resolve(key, contextData)
    let resolveVal = val
    if (isString(resolveVal)) {
      try {
        resolveVal = resolve(resolveVal, contextData)
      } catch (error) {
        console.error(
          `resolveObj key: ${key}, val: ${val} resolveVariableAndFilter error`,
          error
        )
      }
    }
    if (deep && isObject(resolveVal)) {
      if (Array.isArray(resolveVal)) {
        resolveVal = resolveVal.map(item =>
          resolveObj({
            data: contextData,
            obj: item,
            deep
          })
        )
      } else {
        resolveVal = resolveObj({
          data: contextData,
          obj: resolveVal,
          deep
        })
      }
    }

    returnObj[resolveKey] = resolveVal

    contextCacheMap[resolveKey] = resolveVal

    if (key !== resolveKey) {
      delete returnObj[key]
    }
  })

  return returnObj
}

export const resolveToObj = (obj: any, data: any) => {
  let returnProps = obj
  if (isString(returnProps)) {
    returnProps = resolve(returnProps, data || {})
  }

  if (isObject(returnProps) && !Array.isArray(returnProps)) {
    returnProps = resolveObj({
      data: data || {},
      obj: returnProps,
      deep: true
    })
  } else {
    returnProps = undefined
  }

  return returnProps
}

export const resolveToArr = (strOrArr: any, data: any): any[] => {
  let returnArr = strOrArr
  if (isString(strOrArr)) {
    returnArr = resolve(strOrArr, data || {})
  }

  if (returnArr) {
    if (isString(returnArr)) {
      returnArr = [returnArr]
    }
    if (Array.isArray(returnArr)) {
      returnArr = returnArr
        .filter(isString)
        .map(item => resolve(item, data || {}))
    }
  }

  if (!Array.isArray(returnArr)) {
    returnArr = []
  }

  return returnArr
}
