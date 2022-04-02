import { isFunction, cloneDeep, isString } from 'lodash'
import { DoDirectiveProps, RunDirectiveProps, Directive } from './type'

import directiveInitFuncMap from './directiveInitFuncMap'
import { runModifiers } from './modifierHelp'

/**
 * directive 内的 callback的执行顺序 为深度递归后再执行下一个
 * @param props
 */
export const doDirective = async (props: DoDirectiveProps) => {
  // console.log('doDirective', props)
  let directiveContext: any = {}
  try {
    const { directive } = props
    console.log('doDirective directive', directive)
    ;({ directiveContext = {} } = props)

    const { action, callback, id, callbackModel = 'flow' } = directive || {}

    const isReturn = runModifiers(props)
    // console.log('doDirective isReturn', isReturn)

    if (isReturn) {
      return
    }

    const initFunc = directiveInitFuncMap[action]
    if (!initFunc) {
      console.error(`action: ${action} not exist`, props)
      return
    }

    const directiveFunc = await initFunc(props)

    if (!isFunction(directiveFunc)) {
      console.error(`action: ${action} init after not a function`, props)
      return
    }

    const result = await directiveFunc(props)

    if (id && result) {
      directiveContext[id] = cloneDeep(result)
    }

    if (!callback) {
      return directiveContext
    }

    if (callbackModel === 'flow') {
      for (let i = 0; i < callback.length; i++) {
        await doDirective({
          ...props,
          directive: callback[i]
        })
      }
    } else {
      const callbackDirectives = callback.map(item =>
        doDirective({
          ...props,
          directive: item
        })
      )
      await (Promise as any)[callbackModel](callbackDirectives)
    }
  } catch (error) {
    console.error(error)
  }

  return directiveContext
}

export const getDirective = (directive: Directive | string): Directive => {
  if (isString(directive)) {
    return {
      action: directive
    }
  }
  return directive
}

export const getDirectives = (
  directives: Directive | Directive[] | string | string[]
): Directive[] => {
  if (Array.isArray(directives)) {
    return directives.map(getDirective)
  }
  return [getDirective(directives)]
}

export const runDirectives = async (props: RunDirectiveProps): Promise<any> => {
  const { directiveList } = props || {}

  let returnData
  console.log('runDirectives props:', props)
  for (let i = 0; i < directiveList.length; i++) {
    returnData = await doDirective({
      ...props,
      directive: directiveList[i]
    })
  }

  return returnData
}
