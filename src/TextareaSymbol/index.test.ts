import { mount } from '@vue/test-utils'
import Comp from './index.vue'

import { isArrowDown, isArrowUp, isEnter, isEscape } from './utils'

// https://test-utils.vuejs.org/guide/
describe('src/TextareaSymbol/index.vue', () => {
  it('Comp', () => {
    const wrapper = mount(Comp as any)
    expect(wrapper.find('.btp-textarea-symbol').exists()).toBe(true)
  })

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
