import isFunction from 'lodash/isFunction'

import { DoDirectiveProps, ModifierType } from './type'

type ModifierFunc = (props: DoDirectiveProps) => boolean

type ModifierMap = {
  [modifier in ModifierType]?: ModifierFunc
}

const getEvent = (props: DoDirectiveProps) => {
  console.log('getEvent props:', props)
  const { props: actionProps } = props

  const [e] = actionProps || []
  return e
}

export const stopModifier: ModifierFunc = (props: DoDirectiveProps) => {
  getEvent(props).stopPropagation()
  return false
}

export const preventModifier: ModifierFunc = (props: DoDirectiveProps) => {
  getEvent(props).preventDefault()
  return false
}

export const selfModifier: ModifierFunc = (props: DoDirectiveProps) => {
  const e = getEvent(props)

  return e.target !== e.currentTarget
}
// 不是这个code 就跳出
export const keyCodeModifier = (
  props: DoDirectiveProps,
  code: number
): boolean => {
  const { keyCode } = getEvent(props)
  return keyCode !== code
}

export const enterModifier: ModifierFunc = (props: DoDirectiveProps) => {
  return keyCodeModifier(props, 13)
}

export const ctrlModifier: ModifierFunc = (props: DoDirectiveProps) => {
  const { ctrlKey } = getEvent(props)
  return !ctrlKey
}

export const altModifier: ModifierFunc = (props: DoDirectiveProps) => {
  const { altKey } = getEvent(props)
  return !altKey
}

export const shiftModifier: ModifierFunc = (props: DoDirectiveProps) => {
  const { shiftKey } = getEvent(props)
  return !shiftKey
}

export const metaModifier: ModifierFunc = (props: DoDirectiveProps) => {
  const { metaKey } = getEvent(props)
  return !metaKey
}

const getModifierMap = (): ModifierMap => {
  return {
    stop: stopModifier,
    prevent: preventModifier,
    self: selfModifier,
    enter: enterModifier,
    ctrl: ctrlModifier,
    alt: altModifier,
    shift: shiftModifier,
    meta: metaModifier
  }
}

const defIsPointerEvent = (props: DoDirectiveProps): boolean => {
  const e = getEvent(props)
  return e instanceof Event
}

export const getCode = (modifier: string) => {
  const preKey = 'keyCode|'
  let code
  if (modifier.indexOf(preKey) === 0) {
    code = parseInt(modifier.replace(preKey, ''), 10)
  }

  return code
}

export const isKeyCodeModifier = (modifier: ModifierType) => {
  const code = getCode(modifier)
  if (code !== undefined) {
    return true
  }

  return ['enter', 'ctrl', 'alt', 'shift', 'meta'].includes(modifier)
}

export const getKeyCodeModifiers = (modifiers: ModifierType[]) => {
  return modifiers.filter(isKeyCodeModifier)
}

export const runModifiers = (
  props: DoDirectiveProps,
  isPointerEventFunc?: ModifierFunc
): boolean => {
  const { directive } = props
  const { modifiers } = directive || {}

  let isReturn = false
  if (modifiers) {
    const isPointerEvent = isPointerEventFunc || defIsPointerEvent

    if (isPointerEvent(props)) {
      console.log('runModifiers isPointerEvent')
      for (let i = 0; i < modifiers.length; i++) {
        if (isReturn) {
          break
        }

        const modifier = modifiers[i]

        const code = getCode(modifier)
        if (code !== undefined) {
          isReturn = keyCodeModifier(props, code)
        } else {
          const func = getModifierMap()[modifier]
          if (isFunction(func)) {
            isReturn = func(props)
          }
        }
      }
    }
  }

  return isReturn
}
