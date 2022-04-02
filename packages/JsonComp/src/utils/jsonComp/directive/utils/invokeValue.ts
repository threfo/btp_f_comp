import set from 'lodash/set'
import get from 'lodash/get'
import invoke from 'lodash/invoke'
import isString from 'lodash/isString'

import isFunction from 'lodash/isFunction'
import { DoDirectiveProps } from '../type'

import { resolve, resolveObj } from '../../../resole'
import { createObject, isPromise } from '../../../index'

type StepItemTargetType = 'that' | 'window' | 'actionProps' | 'invokeResult'
interface StepItem {
  key?: string // 在执行命令的目标上需要执行的路径
  isReturn?: string // 跳出执行的条件
  value?: any // 执行时的参数
  varName?: string // 定义后会以这个值作为上下文的声明
  defaultValue?: any // 获取指的时候的默认值
  target?: StepItemTargetType // 执行命令的目标，没有声明时为当前组件的this
}

export const checkIsReturn = (stepItem: StepItem, contextData: any) => {
  const { isReturn } = stepItem
  // console.log('invokeValue isReturn', isReturn)
  const resolveIsReturn = false
  if (isReturn !== undefined) {
    const resolveIsReturn = resolve(isReturn, contextData)
    // console.log('invokeValue resolveIsReturn', resolveIsReturn)
    if (resolveIsReturn) {
      return
    }
  }

  return resolveIsReturn
}

export const getInvokeTarget = ({
  that,
  stepItem,
  actionProps,
  invokeResultMap
}: {
  that: any
  stepItem: StepItem
  actionProps: any
  invokeResultMap: any
}) => {
  let invokeTarget = that
  const { target } = stepItem || {}
  if (target === 'window') {
    invokeTarget = window
  } else if (target === 'actionProps') {
    invokeTarget = actionProps
  } else if (target === 'invokeResult') {
    invokeTarget = invokeResultMap
  }

  return invokeTarget
}

export const invokeValue = async (props: DoDirectiveProps) => {
  const { that, directive, props: p } = props
  const { value: directiveValue } = directive
  const { steps } = directiveValue || {}

  // console.log('invokeValue', directive, props)
  // console.log('invokeValue that', that)
  // 缓存上一步的执行结构，给下一步可以调用
  const invokeResultMap: any = {}

  if (that && steps !== undefined) {
    const resoleData = createObject(that.__showData, { actionProps: p })
    // console.log('invokeValue resoleData', resoleData)

    let arr: StepItem[] = steps

    if (isString(steps)) {
      arr = resolve(steps, resoleData)
    }

    // console.log('invokeValue arr', arr)

    if (Array.isArray(arr)) {
      for (let i = 0; i < arr.length; i++) {
        const stepItem = arr[i] || {}
        const { key, value, varName, defaultValue } = stepItem
        // console.log('invokeValue stepItem', stepItem)

        const contextData = createObject(resoleData, {
          invokeResult: invokeResultMap
        })
        // console.log('invokeValue contextData', contextData)

        if (checkIsReturn(stepItem, contextData)) {
          // console.log('invokeValue isReturn')
          return
        }

        const invokeTarget = getInvokeTarget({
          that,
          stepItem,
          actionProps: p,
          invokeResultMap
        })

        const resolveKey = resolve(key || '', contextData)
        let invokeResult: any = get(invokeTarget, resolveKey)
        if (invokeResult === undefined) {
          invokeResult = defaultValue
        }

        // console.log('invokeValue resolveKey', resolveKey)
        // console.log('invokeValue invokeResult 1', invokeResult)
        let resolveValue
        if (value !== undefined) {
          resolveValue = resolveObj({
            obj: value,
            data: contextData,
            deep: true
          })
        }

        // console.log('invokeValue resolveValue', resolveValue)
        // console.log('invokeValue that', that)

        if (isFunction(invokeResult)) {
          invokeResult = invoke(
            invokeTarget,
            resolveKey,
            ...(resolveValue || [])
          )
          // console.log('invokeValue invokeResult is function')
          if (isPromise(invokeResult)) {
            // console.log('invokeValue invokeResult is Promise')
            invokeResult = await invokeResult

            // console.log('invokeValue await invokeResult:', invokeResult)
          }
        } else if (value !== undefined && resolveKey !== undefined) {
          const compDataKey = 'compData.'

          if (resolveKey.indexOf(compDataKey) === 0) {
            if (that.compData === undefined) {
              that.compData = {}
            }
          }

          if (resolveKey.indexOf(compDataKey) === 0 && !that.res) {
            // console.log('invokeValue Vue.set')
            const willSetKey = resolveKey.replace(compDataKey, '')
            if (that.$set) {
              that.$set(that.compData, willSetKey, resolveValue)
            } else {
              that.compData[willSetKey] = resolveValue
            }
          } else {
            // console.log(
            //   'invokeValue set',
            //   invokeTarget,
            //   resolveKey,
            //   resolveValue
            // )
            set(invokeTarget, resolveKey, resolveValue)
          }
        }

        // console.log('invokeValue invokeResult 2', invokeResult)

        const invokeResultMapKey = varName
        if (invokeResultMapKey && !isFunction(invokeResult)) {
          invokeResultMap[invokeResultMapKey] = invokeResult
        }
      }
    }
  }

  // console.log('invokeValue that.compData', that.compData)

  return await Promise.resolve(invokeResultMap)
}

export default async () => {
  return await Promise.resolve(invokeValue)
}
