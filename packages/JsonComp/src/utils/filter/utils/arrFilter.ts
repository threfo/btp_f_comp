import isFunction from 'lodash/isFunction'
import { getStrOrVariable } from '../helper'

type ModelType = 'notMatch' | 'match'

type RuleModelFunc = (input: any[], arr: any | any[]) => any[]
type RuleModelMap = {
  [key in ModelType]?: RuleModelFunc
}

export const notMatchFn = (input: any[], arr: any | any[]) => {
  if (Array.isArray(input)) {
    if (Array.isArray(arr)) {
      return input.filter(item => {
        return !arr.includes(item)
      })
    }
    return input.filter(item => item !== arr)
  }
  return []
}

export const matchFn = (input: any[], arr: any | any[]) => {
  if (Array.isArray(input)) {
    if (Array.isArray(arr)) {
      return input.filter(item => {
        return !!arr.find(arrItem => item.includes(arrItem))
      })
    }

    return input.filter(item => {
      return item.includes(arr || '')
    })
  }
  return []
}

const getModelFuncMap = (): RuleModelMap => ({
  notMatch: notMatchFn,
  match: matchFn
})

export const fn = (input: any[], arr: any | any[], model: ModelType) => {
  const func = getModelFuncMap()[model]

  let returnArr
  if (isFunction(func)) {
    returnArr = func(input, arr)
  }
  return returnArr || []
}

const filter: any = {
  fn(input: any[], arg: string, model?: ModelType) {
    const arr = getStrOrVariable(arg, this?.data, this?.filter?.args[2])

    return fn(input, arr, model || 'notMatch')
  }
}

export default filter.fn
