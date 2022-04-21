import { getAdapterPosition } from './dropdown'
import { getOffset } from './caret'
import {
  SymbolsPolicyProps,
  SymbolsPolicy,
  EditorRange,
  EditorValueItem,
  TextareaSymbolComponent,
  DropdownListItem
} from './type'

export const preventAfterAction = (
  e: Event,
  that: TextareaSymbolComponent
): void => {
  e.preventDefault()
  that.preventKeyUp = true
}

export const isArrowDown = (e: Event | any): boolean => e.code === 'ArrowDown'

export const isArrowUp = (e: Event | any): boolean => e.code === 'ArrowUp'

export const isEnter = (e: Event | any): boolean => e.code === 'Enter'

export const isEscape = (e: Event | any): boolean => e.code === 'Escape'

export const onInputKeyDownArrowDown = (
  that: TextareaSymbolComponent
): void => {
  that.activeIndex++
  if (that.activeIndex === that.list.length) {
    that.activeIndex = that.list.length - 1
  }
}

export const onInputKeyDownArrowUp = (that: TextareaSymbolComponent): void => {
  that.activeIndex--
  if (that.activeIndex === -1) {
    that.activeIndex = 0
  }
}

export const onInputKeyDown = ({
  e,
  that,
  win
}: {
  e: Event
  that: TextareaSymbolComponent
  win: Window
}): void => {
  if (that.isShowDropdown) {
    if (isArrowDown(e) || isArrowUp(e)) {
      // 上下移动光标，用于调整 dropdown 里的人
      if (isArrowDown(e)) {
        onInputKeyDownArrowDown(that)
      }
      if (isArrowUp(e)) {
        onInputKeyDownArrowUp(that)
      }
      preventAfterAction(e, that)
    } else if (isEnter(e)) {
      // 如果有弹窗，则代表确认搜索
      that.isShowDropdown = false
      preventAfterAction(e, that)
      selectData({
        data: that.list[that.activeIndex],
        that,
        doc: win.document
      })
    } else if (isEscape(e)) {
      that.isShowDropdown = false
      preventAfterAction(e, that)
    }
  }
}

export const findWatchSymbolsPolicyByInputEvent = (
  e: Event,
  that: TextareaSymbolComponent
): SymbolsPolicy | undefined => {
  const { watchSymbolsPolicy } = that

  const symbolsPolicy = watchSymbolsPolicy.find((item: SymbolsPolicy) => {
    const { watchInputEvent } = item || {}
    return watchInputEvent(e)
  })
  return symbolsPolicy
}

export const findWatchSymbolsPolicyByString = (
  str: string,
  that: TextareaSymbolComponent
): SymbolsPolicy | undefined => {
  const { watchSymbolsPolicy } = that

  const symbolsPolicy = watchSymbolsPolicy.find((item: SymbolsPolicy) => {
    const { watchStr } = item || {}
    return watchStr(str)
  })
  return symbolsPolicy
}

export const onInputText = (
  e: Event,
  that: TextareaSymbolComponent,
  win: Window
): void => {
  if (that.preventKeyUp) {
    that.preventKeyUp = false
    return
  }
  that.preventKeyUp = false

  const symbolsPolicy = findWatchSymbolsPolicyByInputEvent(e, that)

  // 这是输入了@，那就直接弹选人浮层
  if (symbolsPolicy) {
    showDefaultDropdown({ symbolsPolicy, that, win })
  } else {
    // 这里是输入的不是@，但是可能前方有@，因此需要进行检测看看是否要展示选人浮层
    doToggleDropdown(that, win)

    that.$nextTick(() => {
      updateEditorValue(that)
    })
  }
}

export const getSearchStr = (editorRange: EditorRange | null) => {
  const { range, selection } = editorRange || {}
  const { endContainer } = range || {}
  const { nodeName, textContent } = endContainer || {}

  const { focusOffset } = selection || {}

  // console.log('getSearchStr nodeName=', nodeName)
  // console.log('getSearchStr textContent=', textContent)
  // console.log('getSearchStr focusOffset=', focusOffset)

  let searchStr = null
  if (nodeName === '#text' && textContent) {
    searchStr = textContent.slice(0, focusOffset)
  }
  return searchStr
}

export const doToggleDropdown = (
  that: TextareaSymbolComponent,
  win: Window
) => {
  const rangeInfo = getEditorRange(win)

  const searchStr = getSearchStr(rangeInfo)

  if (searchStr === null) return

  // console.log('doToggleDropdown searchStr=', searchStr)
  // 判断光标位置前方是否有at，只有一个at则展示默认dropdown，除了at还有关键字则展示searchDropdown

  const symbolsPolicy = findWatchSymbolsPolicyByString(searchStr, that)

  if (symbolsPolicy) {
    const { getKeywords } = symbolsPolicy

    const keywords = getKeywords(searchStr)
    if (keywords) {
      showSearchDropdown({
        keywords,
        symbolsPolicy,
        that,
        win
      })
    } else {
      showDefaultDropdown({ symbolsPolicy, that, win })
    }
    // 重点：记下弹窗前光标位置range
    that.editorRange = rangeInfo
  }

  onCloseDropdown(that)
}

export const getEditorRange = (win: Window | any): EditorRange | null => {
  let editorRange = null
  let range = null
  let selection: Selection | any = null
  if (win.getSelection) {
    selection = win.getSelection()
    if (selection.getRangeAt && selection.rangeCount) {
      range = selection.getRangeAt(0)
      editorRange = {
        range,
        selection
      }
    }
  }

  // console.log('getEditorRange editorRange', editorRange)
  return editorRange
}

export const getSymbolDocument = (data: DropdownListItem, doc: Document) => {
  // console.log('getSymbolDocument', data)
  const { label, symbol } = data || {}
  const btn = doc.createElement('button') as any
  btn.dataset['value'] = JSON.stringify(data)
  btn.textContent = `${symbol || '@'}${label || ''}`
  btn.contentEditable = false
  btn.addEventListener(
    'click',
    () => {
      return false
    },
    false
  )
  btn.tabindex = '-1'

  return btn
}

export const getTextDocument = (text: string, doc: Document) => {
  return doc.createTextNode(text)
}

export const getBrDocument = (doc: Document) => {
  return doc.createElement('br')
}

// 不可见字符，为了放光标方便
export const getNoSeeText = (doc: Document) => {
  return getTextDocument('\u200b', doc)
}

export const selectData = ({
  data,
  that,
  doc
}: {
  data: DropdownListItem
  that: TextareaSymbolComponent
  doc: Document
}) => {
  // console.log('selectData data', data)
  that.isShowDropdown = false
  const editor = that.$refs['editorEle']
  if (editor) {
    editor.focus()
    // 删掉草稿start
    const { symbolsPolicy, editorRange: cacheEditorRange } = that
    const { range: editorRange } = cacheEditorRange || {}
    if (!editorRange) return
    if (!symbolsPolicy) return
    // 光标位置
    const { endContainer: textNode, endOffset } = editorRange || {}
    // 拿到末尾文本节点
    const { nodeValue: textNodeValue } = textNode || {}
    // 找出光标前的at符号位置

    const { regExp } = symbolsPolicy || {}
    const expRes = regExp.exec(textNodeValue)
    // console.log('selectData expRes', expRes)

    if (expRes && expRes.length > 1) {
      editorRange.setStart(textNode, expRes.index)
      editorRange.setEnd(textNode, endOffset)
      // console.log('要插入at的位置range', editorRange, editorRange.startOffset, editorRange.endOffset)
      editorRange.deleteContents() // 删除草稿end
      // console.log('delete后的range', editorRange, editorRange.startOffset, editorRange.endOffset)

      const btn = getSymbolDocument(data, doc)
      const bSpaceNode = getNoSeeText(doc)

      if (that.editorRange) {
        insertHtmlAtCaret({
          html: [btn, bSpaceNode],
          selection: that?.editorRange?.selection,
          range: that?.editorRange?.range,
          that,
          doc
        })
      }
    }
  }
}

export const getMsgStructure = (elem: Node) => {
  // console.log('getMsgStructure elem', elem)
  let res: EditorValueItem[] = []
  if (elem) {
    Array.from(elem.childNodes).forEach(function (child: Node | any) {
      if (child.nodeName === '#text') {
        let str = child.nodeValue
        if (str && str.length > 0) {
          const lastChar = str[str.length - 1]
          if (lastChar.charCodeAt(0) === 0x200b) {
            // 零宽字符去掉
            str = str.slice(0, -1)
          }
        }
        // console.log('str', str)
        if (str) {
          res.push({ type: 'text', data: str })
        }
      } else if (child.nodeName === 'BR') {
        res.push({ type: 'br', data: '\n' })
      } else if (child.nodeName === 'BUTTON') {
        res.push({ type: 'symbol', data: JSON.parse(child.dataset.value) })
      } else if (child.nodeName === 'SPAN') {
        res.push({ type: 'text', data: child.textContent })
      }
    })
  }
  res = defRagMentation(res)

  // console.log('getMsgStructure', res)
  return res
}

const defRagMentation = (msgs: EditorValueItem[]) => {
  // msgs 就是上文说说的消息数据结构
  const newMsgs: EditorValueItem[] = []
  msgs.forEach(msg => {
    const last = newMsgs[newMsgs.length - 1]
    if (last && last.type && last.type === 'text' && msg.type === 'text') {
      last.data = last.data + msg.data
    } else {
      newMsgs.push(msg)
    }
  })
  return newMsgs
}

export const showDefaultDropdown = ({
  symbolsPolicy,
  that,
  win
}: {
  symbolsPolicy: SymbolsPolicy
  that: TextareaSymbolComponent
  win: Window
}) => {
  // const {} = symbolsPolicy

  // console.log('showDefaultDropdown symbolsPolicy', symbolsPolicy)

  showDropdown({ that, symbolsPolicy, win })

  symbolsPolicy.getListByKeywords().then((list: any[]) => {
    that.list = list

    showDropdown({ that, symbolsPolicy, win })
  })
}

export const showSearchDropdown = ({
  symbolsPolicy,
  that,
  keywords,
  win
}: {
  symbolsPolicy: SymbolsPolicy
  that: TextareaSymbolComponent
  keywords: string
  win: Window
}) => {
  // const {} = symbolsPolicy
  // console.log('showSearchDropdown keywords', keywords)
  // console.log('showSearchDropdown symbolsPolicy', symbolsPolicy)

  showDropdown({ that, symbolsPolicy, win })

  symbolsPolicy.getListByKeywords(keywords).then((list: DropdownListItem[]) => {
    that.list = list
    showDropdown({ that, symbolsPolicy, win })
  })
}

export const showDropdownRun = (that: TextareaSymbolComponent, win: Window) => {
  // 等隐藏完毕，且最新lists数据dom生成后，可基于此时的dom去获取最新的dropdown宽高和坐标
  const el = that.$refs['editorEle']
  const dropdownEle = that.$refs['dropdownEle']
  if (!el) return
  const caret = getOffset(el, win)
  const realPosition = getAdapterPosition({
    caret,
    dropdownEle,
    scrollingEle: win.document.scrollingElement
  }) // 获取正确的放置坐标，防止超出边界。本文基于offset
  that.dropdownPos = {
    left: realPosition.left + 'px',
    top: realPosition.top + 'px'
  }
  that.activeIndex = 0
  that.isShowDropdown = true // 此时再展示出来
}

export const showDropdown = ({
  that,
  symbolsPolicy,
  win
}: {
  that: TextareaSymbolComponent
  symbolsPolicy: SymbolsPolicy
  win: Window
}) => {
  that.isShowDropdown = false // 先隐藏
  that.symbolsPolicy = null
  that.$nextTick(() => {
    // 等隐藏完毕，且最新lists数据dom生成后，可基于此时的dom去获取最新的dropdown宽高和坐标
    showDropdownRun(that, win)
    that.symbolsPolicy = symbolsPolicy
  })
}

export const insertHtmlAtCaret = ({
  html,
  selection,
  range,
  that,
  doc
}: {
  html: string | Node[]
  selection: Selection
  range: any
  that: TextareaSymbolComponent
  doc: Document
}) => {
  // console.log('insertHtmlAtCaret', html, selection, range)
  if (range && selection) {
    const el = doc.createElement('div')

    let selectionExtendStep = 1

    if (typeof html === 'string') {
      el.innerHTML = html
      selectionExtendStep = html.length
    } else if (Array.isArray(html)) {
      html.forEach(item => {
        el.appendChild(item)
      })
    } else {
      el.appendChild(html)
    }
    const frag = doc.createDocumentFragment()
    let node
    let lastNode
    while ((node = el.firstChild)) {
      lastNode = frag.appendChild(node)
    }
    range.insertNode(frag)
    if (lastNode) {
      selection.extend(lastNode, selectionExtendStep)
      selection.collapseToEnd()
    }

    updateEditorValue(that)
  }

  // console.log('selectData end')
}

export const onCloseDropdown = (that: TextareaSymbolComponent) => {
  that.list = []
  that.isShowDropdown = false
}

export const getPastedText = (e: Event | any, win: Window | any) => {
  let pastedText = undefined
  if (win.clipboardData && win.clipboardData.getData) {
    // IE
    pastedText = win.clipboardData.getData('Text')
  } else if (e.clipboardData && e.clipboardData.getData) {
    pastedText = e.clipboardData.getData('text/plain')
  }

  return pastedText
}

export const insertHtml = ({
  htmlDom,
  that,
  win
}: {
  htmlDom: any
  that: TextareaSymbolComponent
  win: Window
}) => {
  const rangeInfo = getEditorRange(win)
  if (rangeInfo && htmlDom) {
    rangeInfo?.range?.deleteContents()

    insertHtmlAtCaret({
      html: htmlDom,
      selection: rangeInfo.selection,
      range: rangeInfo.range,
      that,
      doc: win.document
    })
  }
}

export const doOnPaste = (
  e: Event,
  that: TextareaSymbolComponent,
  win: Window
) => {
  const pastedText = getPastedText(e, win)
  // console.log('doOnPaste pastedText', pastedText)

  // 放到光标位置
  if (pastedText) {
    insertHtml({
      htmlDom: pastedText,
      that,
      win
    })
  }
  e.preventDefault()
  return false
}

export const onCompositionEnd = (
  that: TextareaSymbolComponent,
  win: Window
) => {
  if (that.isShowDropdown) {
    // 重置光标位置，因为此时中文会填进去。。
    that.editorRange = getEditorRange(win)
  }
}

export const onLiMousedown = ({
  e,
  data,
  that,
  win
}: {
  e: Event
  data: DropdownListItem
  that: TextareaSymbolComponent
  win: Window
}) => {
  that.isShowDropdown = false
  preventAfterAction(e, that)
  selectData({
    data,
    that,
    doc: win.document
  })
}

export const updateEditorValue = (that: TextareaSymbolComponent) => {
  const res = getMsgStructure(that.$refs.editorEle)
  // console.log('updateEditorValue res', res)

  that.editorValue = res
}

export const editorValueToHtmlDocument = (
  arr: EditorValueItem[],
  doc: Document
) => {
  const domArr: Node[] = []

  arr.forEach((item: EditorValueItem) => {
    const { type, data } = item

    if (type === 'symbol') {
      const btn = getSymbolDocument(data, doc)
      domArr.push(btn)
    } else if (type === 'br') {
      domArr.push(getBrDocument(doc))
    } else {
      domArr.push(getTextDocument(data, doc))
    }
  })
  // console.log('editorValueToHtmlDocument domArr', domArr)
  return domArr
}

export const initEditorEle = (that: TextareaSymbolComponent, doc: Document) => {
  const { modelValue } = that || {}

  let needInsertDom
  const { length: valueLength } = modelValue || []

  if (valueLength) {
    needInsertDom = editorValueToHtmlDocument(modelValue, doc)
  }
  const { length: needInsertDomLength } = needInsertDom || []
  if (needInsertDomLength) {
    const frag = doc.createElement('div')
    ;(needInsertDom || []).forEach((dom: Node) => {
      frag.appendChild(dom)
    })

    const ele = that.$refs.editorEle || {}

    ele.innerHTML = frag.innerHTML

    updateEditorValue(that)

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
