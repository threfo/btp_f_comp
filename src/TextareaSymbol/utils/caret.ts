export const initRange = (win: any) => {
  let range = null

  let sel
  const { getSelection } = win || {}
  if (getSelection) {
    sel = win.getSelection()

    const { rangeCount } = sel || {}
    if (rangeCount > 0) {
      range = sel.getRangeAt(0)
    }
  }
  return range
}

export const getOldIEOffset = (selection: any) => {
  const range = selection?.createRange()?.duplicate()
  range?.moveStart('character', -1)
  const rect = range?.getBoundingClientRect()

  const { bottom = 0, top = 0, left = 0 } = rect || {}

  return {
    height: bottom - top,
    left,
    top
  }
}

export const getDefOffset = (range: any) => {
  const clonedRange = range?.cloneRange()
  clonedRange?.setStart(range.endContainer, range.endOffset - 1)
  clonedRange?.setEnd(range.endContainer, range.endOffset)
  const rect = clonedRange?.getBoundingClientRect()

  const { height = 0, top = 0, left = 0, width = 0 } = rect || {}

  const offset = {
    height,
    left: left + width,
    top
  }
  clonedRange?.detach()

  return offset
}

export const getHeight0Offset = (range: any, doc: any) => {
  const clonedRange = range?.cloneRange()

  const shadowCaret = doc?.createTextNode('|')
  clonedRange?.insertNode(shadowCaret)
  clonedRange?.selectNode(shadowCaret)
  const rect = clonedRange?.getBoundingClientRect()

  const { height = 0, left = 0, top = 0 } = rect || {}

  const offset = {
    height,
    left,
    top
  }
  shadowCaret?.remove()
  clonedRange?.detach()

  return offset
}

export const getOffset = (el: any, win: any, funcs?: any) => {
  const { _initRange, _getDefOffset, _getHeight0Offset, _getOldIEOffset } =
    funcs || {
      _initRange: initRange,
      _getDefOffset: getDefOffset,
      _getHeight0Offset: getHeight0Offset,
      _getOldIEOffset: getOldIEOffset
    }

  let offset: any

  const range = _initRange(win)
  const { document: doc } = win || {}
  const { selection } = doc || {}
  if (range) {
    // console.log('getOffset range.endOffset', range.endOffset)
    // console.log('getOffset range.endContainer', range.endContainer)
    // console.log('getOffset el', el)
    // console.log(
    //   'getOffset range.endContainer !== el',
    //   range.endContainer !== el
    // )

    if (range.endOffset - 1 > 0 && range.endContainer !== el) {
      offset = _getDefOffset(range)
      // console.log('getOffset getDefOffset', { ...offset })
    }
    const { height = 0 } = offset || {}
    if (height === 0) {
      offset = _getHeight0Offset(range, doc)
    }
  } else if (selection) {
    offset = _getOldIEOffset(selection)
  }

  if (offset) {
    // console.log('getOffset win.pageYOffset', win.pageYOffset)
    offset.top += win.pageYOffset
    offset.left += win.pageXOffset
  }

  return offset
}
