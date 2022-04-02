import isFunction from 'lodash/isFunction'
import isString from 'lodash/isString'
import { DoDirectiveProps } from '../type'

import { resolveObj, resolve } from '../../../resole'
import { createObject } from '../../..'

export const runRouter = async (props: DoDirectiveProps) => {
  const { that, directive, props: p } = props
  const { value } = directive
  console.log('runRouter', directive, p)
  if (that && value !== undefined) {
    const { path: valuePath, method: valueMethod = 'push' } = value

    let { query: valueQuery } = value

    const { query: routeQuery, path: routerPath } = that.$route || {}

    const resoleData = createObject(that.__showData, { actionProps: p })

    // console.log('valueQuery', valueQuery)
    // console.log('routeQuery', routeQuery)
    console.log('runRouter resoleData', resoleData)

    if (isString(valueQuery)) {
      valueQuery = resolve(valueQuery, resoleData)
    }

    let query = resolveObj({
      obj: {
        ...(routeQuery || {}),
        ...(valueQuery || {})
      },
      data: resoleData,
      deep: true
    })

    const path = resolve(valuePath || routerPath, resoleData)

    const method = resolve(valueMethod, resoleData)

    console.log('runRouter query', query)
    // console.log('path', path)
    // console.log('method', method)

    if (query) {
      query = Object.keys(query).reduce((obj: any, key: string) => {
        const val = query[key]
        if (val !== null) {
          obj[key] = val
        }

        return obj
      }, {})
    }

    const func = that.$router[method]
    if (isFunction(func)) {
      that.$router[method]({
        path,
        query
      })
    } else {
      console.error(`runRouter method: ${method} not a function`)
    }
  }

  return await Promise.resolve(that.compData)
}

export default async () => {
  return await Promise.resolve(runRouter)
}
