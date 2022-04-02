import isFunction from 'lodash/isFunction'
import { DoDirectiveProps } from '../type'

export const setStateCommand = async (props: DoDirectiveProps) => {
  const { that, directive } = props
  const { value } = directive
  const { type } = value || {}
  const { setStateCommand } = that || {}

  if (!type) {
    console.error('value.type not exist')
    return
  }

  if (!isFunction(setStateCommand)) {
    console.error('this.setStateCommand not exist or not a function')
    return
  }

  that.setStateCommand(value)

  return await Promise.resolve(that.compData)
}

export default async () => {
  return await Promise.resolve(setStateCommand)
}
