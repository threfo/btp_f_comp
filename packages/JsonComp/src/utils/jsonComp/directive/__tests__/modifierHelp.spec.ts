import {
  runModifiers,
  stopModifier,
  preventModifier,
  getCode,
  keyCodeModifier,
  enterModifier,
  ctrlModifier,
  altModifier,
  shiftModifier,
  metaModifier,
  selfModifier
} from '../modifierHelp'

describe('utils/jsonComp/directive/modifierHelp.ts', () => {
  it('getCode', () => {
    expect(getCode('121')).toBeUndefined()

    expect(getCode('keyCode|1')).toBe(1)
  })

  it('keyCodeModifier', () => {
    const directive = {
      action: ''
    }
    const props = {
      directive,
      props: [
        {
          keyCode: 13,
          ctrlKey: true,
          altKey: true,
          shiftKey: true,
          metaKey: true,
          target: 1,
          currentTarget: 1
        }
      ]
    }
    expect(keyCodeModifier(props, 13)).toBeFalsy()

    expect(keyCodeModifier(props, 12)).toBeTruthy()

    expect(enterModifier(props)).toBeFalsy()

    expect(ctrlModifier(props)).toBeFalsy()
    expect(altModifier(props)).toBeFalsy()
    expect(shiftModifier(props)).toBeFalsy()
    expect(metaModifier(props)).toBeFalsy()

    expect(selfModifier(props)).toBeFalsy()

    expect(
      enterModifier({
        directive,
        props: [
          {
            keyCode: 12
          }
        ]
      })
    ).toBeTruthy()

    expect(
      ctrlModifier({
        directive,
        props: [{}]
      })
    ).toBeTruthy()

    expect(
      altModifier({
        directive,
        props: [{}]
      })
    ).toBeTruthy()

    expect(
      shiftModifier({
        directive,
        props: [{}]
      })
    ).toBeTruthy()

    expect(
      metaModifier({
        directive,
        props: [{}]
      })
    ).toBeTruthy()

    expect(
      selfModifier({
        directive,
        props: [
          {
            target: 2,
            currentTarget: 1
          }
        ]
      })
    ).toBeTruthy()
  })

  it('stopModifier', () => {
    const e = {
      runStopPropagation: false,
      stopPropagation() {
        this.runStopPropagation = true
      }
    }
    expect(e.runStopPropagation).toBeFalsy()

    expect(
      stopModifier({
        directive: {
          action: ''
        },
        props: [e]
      })
    ).toBeFalsy()

    expect(e.runStopPropagation).toBeTruthy()
  })

  it('preventModifier', () => {
    const e = {
      runPreventDefault: false,
      preventDefault() {
        this.runPreventDefault = true
      }
    }
    expect(e.runPreventDefault).toBeFalsy()

    expect(
      preventModifier({
        directive: {
          action: ''
        },
        props: [e]
      })
    ).toBeFalsy()

    expect(e.runPreventDefault).toBeTruthy()
  })

  it('runModifiers', () => {
    const e = {
      keyCode: 0,
      ctrlKey: false,
      runStopPropagation: false,
      stopPropagation() {
        this.runStopPropagation = true
      },
      runPreventDefault: false,
      preventDefault() {
        this.runPreventDefault = true
      },
      reset() {
        this.runStopPropagation = false
        this.runPreventDefault = false
        this.keyCode = 0
        this.ctrlKey = false
      }
    }

    const isPointerEventFunc = () => true

    expect(e.runStopPropagation).toBeFalsy()
    expect(e.runPreventDefault).toBeFalsy()

    expect(
      runModifiers(
        {
          directive: {
            action: '',
            modifiers: ['stop', 'prevent', 'enter']
          },
          props: [e]
        },
        isPointerEventFunc
      )
    ).toBeTruthy()
    expect(e.runStopPropagation).toBeTruthy()
    expect(e.runPreventDefault).toBeTruthy()

    e.reset()
    expect(e.runStopPropagation).toBeFalsy()
    expect(e.runPreventDefault).toBeFalsy()

    const test1: any = {
      directive: {
        action: '',
        modifiers: ['enter', 'stop', 'prevent']
      },
      props: [e]
    }

    expect(runModifiers(test1, isPointerEventFunc)).toBeTruthy()
    expect(e.runStopPropagation).toBeFalsy()
    expect(e.runPreventDefault).toBeFalsy()

    e.keyCode = 13
    expect(runModifiers(test1, isPointerEventFunc)).toBeFalsy()
    expect(e.runStopPropagation).toBeTruthy()
    expect(e.runPreventDefault).toBeTruthy()

    e.reset()
    expect(e.runStopPropagation).toBeFalsy()
    expect(e.runPreventDefault).toBeFalsy()

    const test2: any = {
      directive: {
        action: '',
        modifiers: ['ctrl', 'enter', 'stop', 'prevent']
      },
      props: [e]
    }

    expect(runModifiers(test2, isPointerEventFunc)).toBeTruthy()
    expect(e.runStopPropagation).toBeFalsy()
    expect(e.runPreventDefault).toBeFalsy()

    e.ctrlKey = true
    expect(runModifiers(test2, isPointerEventFunc)).toBeTruthy()
    expect(e.runStopPropagation).toBeFalsy()
    expect(e.runPreventDefault).toBeFalsy()

    e.keyCode = 13
    expect(runModifiers(test2, isPointerEventFunc)).toBeFalsy()
    expect(e.runStopPropagation).toBeTruthy()
    expect(e.runPreventDefault).toBeTruthy()
  })
})
