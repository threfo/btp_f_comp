import { isArrowDown, isArrowUp, isEnter, isEscape } from '../helper'

// https://test-utils.vuejs.org/guide/
describe('src/TextareaSymbol/utils/helper.ts', () => {
  it('utils isArrowDown', () => {
    expect(isArrowDown({ code: 'ArrowDown' })).toBe(true)
    expect(isArrowDown({ code: 'ArrowUp' })).toBe(false)
  })
  it('utils isArrowUp', () => {
    expect(isArrowUp({ code: 'ArrowUp' })).toBe(true)
    expect(isArrowUp({ code: 'ArrowDown' })).toBe(false)
  })
  it('utils isEnter', () => {
    expect(isEnter({ code: 'Enter' })).toBe(true)
    expect(isEnter({ code: 'ArrowDown' })).toBe(false)
  })
  it('utils isEscape', () => {
    expect(isEscape({ code: 'Escape' })).toBe(true)
    expect(isEscape({ code: 'ArrowDown' })).toBe(false)
  })
})
