import { getStrOrVariable } from '../helper'

export const fn = (input: any[] | any, arr: any[]) => {
  if (Array.isArray(arr)) {
    if (Array.isArray(input)) {
      return [...arr, ...input]
    }
    return [...arr, input]
  }
  return []
}

const filter: any = {
  fn(input: any, arg: string) {
    const arr = getStrOrVariable(arg, this?.data, this?.filter?.args[2])

    return fn(input, arr)
  }
}

export default filter.fn
