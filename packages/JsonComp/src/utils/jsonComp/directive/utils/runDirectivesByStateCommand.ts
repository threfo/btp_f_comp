import isFunction from 'lodash/isFunction'
import { DoDirectiveProps } from '../type'

import { resolveObj } from '../../../resole'
import { createObject } from '../../../index'

export const runDirectivesByStateCommand = async (props: DoDirectiveProps) => {
  const { that, directive, props: p } = props

  const { setStateCommand } = that || {}
  // console.log('runDirectivesByStateCommand', directive, props)
  if (!isFunction(setStateCommand)) {
    console.error('this.setStateCommand not exist or not a function')
    return
  }

  const resoleData = createObject(that.__showData, { actionProps: p })

  const value = resolveObj({
    obj: directive.value || {},
    data: resoleData,
    deep: true
  })

  const { value: directiveList } = value || {}

  if (!directiveList) {
    console.error('value.value not exist')
    return
  }

  // console.log('runDirectivesByStateCommand value:', value)

  that.setStateCommand({
    ...value,
    type: 'runCommandDirectives'
  })

  return await Promise.resolve(that.compData)
}

export default async () => {
  return await Promise.resolve(runDirectivesByStateCommand)
}
