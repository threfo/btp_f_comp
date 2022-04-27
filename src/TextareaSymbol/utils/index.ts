import {
  SymbolsPolicyProps,
  SymbolsPolicy,
  SetupRef,
  EventThatWinSetupRef,
  EventThatWinPropsSetupRef,
  ThatWinPropsSetupRef,
  OnLiMousedownProps,
  InitEditorEleProps
} from './type'

import { nextTick } from 'vue-demi'

import {
  isArrowUp,
  isArrowDown,
  isEnter,
  isEscape,
  onInputKeyDownArrowDown,
  onInputKeyDownArrowUp,
  preventAfterAction,
  selectData,
  findWatchSymbolsPolicyByInputEvent,
  showDefaultDropdown,
  updateEditorValue,
  getEditorRange,
  getSearchStr,
  findWatchSymbolsPolicyByString,
  showSearchDropdown,
  getPastedText,
  insertHtml,
  editorValueToHtmlDocument,
  getRefEle
} from './helper'

export const onInputKeyDown = ({
  e,
  that,
  win,
  setupRef
}: EventThatWinSetupRef): void => {
  const { isShowDropdown, activeIndex, list } = setupRef

  if (isShowDropdown.value) {
    if (isArrowDown(e) || isArrowUp(e)) {
      // 上下移动光标，用于调整 dropdown 里的人
      if (isArrowDown(e)) {
        onInputKeyDownArrowDown(setupRef)
      }
      if (isArrowUp(e)) {
        onInputKeyDownArrowUp(activeIndex)
      }
      preventAfterAction({ e, setupRef })
    } else if (isEnter(e)) {
      // 如果有弹窗，则代表确认搜索
      isShowDropdown.value = false
      preventAfterAction({ e, setupRef })
      selectData({
        data: list.value[activeIndex.value],
        that,
        doc: win.document,
        setupRef
      })
    } else if (isEscape(e)) {
      isShowDropdown.value = false
      preventAfterAction({ e, setupRef })
    }
  }
}

export const onInputText = ({
  e,
  that,
  win,
  props,
  setupRef
}: EventThatWinPropsSetupRef): void => {
  const { preventKeyUp } = setupRef

  if (preventKeyUp.value) {
    preventKeyUp.value = false
    return
  }
  preventKeyUp.value = false

  // console.log('onInputText', that)

  const symbolsPolicy = findWatchSymbolsPolicyByInputEvent({ e, props })

  // console.log('onInputText symbolsPolicy', symbolsPolicy)

  // 这是输入了@，那就直接弹选人浮层
  if (symbolsPolicy) {
    showDefaultDropdown({
      symbolsPolicy,
      that,
      win,
      setupRef
    })
  } else {
    // 这里是输入的不是@，但是可能前方有@，因此需要进行检测看看是否要展示选人浮层
    doToggleDropdown({
      that,
      win,
      props,
      setupRef
    })

    nextTick(() => {
      updateEditorValue({ that, setupRef })
    })
  }
}

export const doToggleDropdown = ({
  that,
  win,
  props,
  setupRef
}: ThatWinPropsSetupRef) => {
  const rangeInfo = getEditorRange(win)

  const searchStr = getSearchStr(rangeInfo)

  if (searchStr === null) return

  // console.log('doToggleDropdown searchStr=', searchStr)
  // 判断光标位置前方是否有at，只有一个at则展示默认dropdown，除了at还有关键字则展示searchDropdown

  const symbolsPolicy = findWatchSymbolsPolicyByString({
    props,
    str: searchStr
  })

  if (symbolsPolicy) {
    const { getKeywords } = symbolsPolicy

    const keywords = getKeywords(searchStr)
    if (keywords) {
      showSearchDropdown({
        keywords,
        symbolsPolicy,
        that,
        win,
        setupRef
      })
    } else {
      showDefaultDropdown({
        symbolsPolicy,
        that,
        win,
        setupRef
      })
    }

    if (rangeInfo) {
      const { editorRange } = setupRef
      // 重点：记下弹窗前光标位置range
      editorRange.value = rangeInfo
    }
  }

  onCloseDropdown(setupRef)
}

export const onCloseDropdown = ({ list, isShowDropdown }: SetupRef) => {
  list.value = []
  isShowDropdown.value = false
}

export const doOnPaste = ({ e, that, win, setupRef }: EventThatWinSetupRef) => {
  const pastedText = getPastedText(e, win)
  // console.log('doOnPaste pastedText', pastedText)

  // 放到光标位置
  if (pastedText) {
    insertHtml({
      htmlDom: pastedText,
      that,
      win,
      setupRef
    })
  }
  e.preventDefault()
  return false
}

export const onLiMousedown = ({
  e,
  data,
  that,
  win,
  setupRef
}: OnLiMousedownProps) => {
  const { isShowDropdown } = setupRef

  isShowDropdown.value = false
  preventAfterAction({ e, setupRef })

  selectData({
    data,
    that,
    doc: win.document,
    setupRef
  })
}

export const onCompositionEnd = ({
  win,
  setupRef
}: {
  win: Window
  setupRef: SetupRef
}) => {
  const { isShowDropdown, editorRange } = setupRef
  if (isShowDropdown.value) {
    // 重置光标位置，因为此时中文会填进去。。
    editorRange.value = getEditorRange(win)
  }
}

export const initEditorEle = ({
  that,
  doc,
  value,
  setupRef
}: InitEditorEleProps) => {
  let needInsertDom
  const { length: valueLength } = value || []

  if (valueLength) {
    needInsertDom = editorValueToHtmlDocument(value, doc)
  }
  const { length: needInsertDomLength } = needInsertDom || []
  if (needInsertDomLength) {
    const frag = doc.createElement('div')
    ;(needInsertDom || []).forEach((dom: Node) => {
      frag.appendChild(dom)
    })

    const ele = getRefEle(that, 'editorEle')

    ele.innerHTML = frag.innerHTML

    updateEditorValue({ that, setupRef })

    // console.log('frag', frag.innerHTML)
  }
}

export const initSymbolsPolicy = ({
  symbol,
  regExp,
  watchInputEvent,
  getListByKeywords,
  watchStr,
  getKeywords
}: SymbolsPolicyProps): SymbolsPolicy => {
  const defWatchStr = (str: string) => {
    const keywords = regExp.exec(str)
    return !!(keywords && keywords.length >= 2)
  }

  const defGetKeywords = (str: string) => {
    const [allMathStr, keywords] = regExp.exec(str) || []
    if (allMathStr === symbol) {
      return ''
    }
    return keywords
  }

  return {
    symbol,
    regExp,
    watchStr: watchStr || defWatchStr,
    getKeywords: getKeywords || defGetKeywords,
    watchInputEvent,
    getListByKeywords
  }
}
