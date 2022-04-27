import { getAdapterPosition } from './dropdown'
import { getOffset } from './caret'
import {
  SymbolsPolicy,
  EditorRange,
  EditorValueItem,
  DropdownListItem,
  EventSetupRef,
  SetupRef,
  EventProps,
  StrProps,
  SelectDataProps,
  ShowDefaultDropdownProps,
  ShowDropdownProps,
  ThatWinSetupRef,
  ShowSearchDropdownProps,
  InsertHtmlAtCaretProps,
  InsertHtmlProps
} from './type'

import { nextTick, toRefs, Ref, ComponentInternalInstance } from 'vue-demi'

export const getRefEle = (that: ComponentInternalInstance, key: string) => {
  const { refs } = that

  const thatRef = refs || {}

  // console.log('getRefEle that', that)
  // console.log('getRefEle thatRef', thatRef)

  const ele = thatRef[key] as any
  // console.log('getRefEle', key, ele)
  return ele
}

export const preventAfterAction = ({ e, setupRef }: EventSetupRef): void => {
  const { preventKeyUp } = setupRef
  e.preventDefault()
  preventKeyUp.value = true
}

export const isArrowDown = (e: Event | any): boolean => e.code === 'ArrowDown'

export const isArrowUp = (e: Event | any): boolean => e.code === 'ArrowUp'

export const isEnter = (e: Event | any): boolean => e.code === 'Enter'

export const isEscape = (e: Event | any): boolean => e.code === 'Escape'

export const onInputKeyDownArrowDown = (setupRef: SetupRef): void => {
  const { activeIndex, list } = setupRef

  activeIndex.value++
  if (activeIndex.value === list.value.length) {
    activeIndex.value = list.value.length - 1
  }
}

export const onInputKeyDownArrowUp = (activeIndex: Ref<number>): void => {
  activeIndex.value--
  if (activeIndex.value === -1) {
    activeIndex.value = 0
  }
}

export const findWatchSymbolsPolicyByInputEvent = ({
  props,
  e
}: EventProps): SymbolsPolicy | undefined => {
  // 不能使用 es6 解构，因为是响应式  https://v3.cn.vuejs.org/guide/composition-api-setup.html#props
  const { watchSymbolsPolicy } = toRefs(props || {})

  // console.log('findWatchSymbolsPolicyByInputEvent', watchSymbolsPolicy)

  const symbolsPolicy = watchSymbolsPolicy.value.find((item: SymbolsPolicy) => {
    const { watchInputEvent } = item || {}
    // console.log('findWatchSymbolsPolicyByInputEvent item', item)
    return watchInputEvent(e)
  })

  // console.log('findWatchSymbolsPolicyByInputEvent symbolsPolicy', symbolsPolicy)
  return symbolsPolicy
}

export const findWatchSymbolsPolicyByString = ({
  str,
  props
}: StrProps): SymbolsPolicy | undefined => {
  const { watchSymbolsPolicy } = toRefs(props || {})

  const symbolsPolicy = watchSymbolsPolicy.value.find((item: SymbolsPolicy) => {
    const { watchStr } = item || {}
    return watchStr(str)
  })
  return symbolsPolicy
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

export const selectData = ({ data, that, doc, setupRef }: SelectDataProps) => {
  // console.log('selectData data', data)

  const {
    isShowDropdown,
    editorRange: cacheEditorRange,
    symbolsPolicy
  } = setupRef

  isShowDropdown.value = false
  const editor = getRefEle(that, 'editorEle')
  if (editor) {
    editor.focus()
    // 删掉草稿start
    const { range: editorRange } = cacheEditorRange.value || {}
    if (!editorRange) return
    if (!symbolsPolicy.value) return
    // 光标位置
    const { endContainer: textNode, endOffset } = editorRange || {}
    // 拿到末尾文本节点
    const { nodeValue: textNodeValue } = textNode || {}
    // 找出光标前的at符号位置

    const { regExp } = symbolsPolicy.value || {}
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

      if (cacheEditorRange.value) {
        insertHtmlAtCaret({
          html: [btn, bSpaceNode],
          selection: cacheEditorRange.value?.selection,
          range: cacheEditorRange.value?.range,
          that,
          doc,
          setupRef
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
  win,
  setupRef
}: ShowDefaultDropdownProps) => {
  // console.log('showDefaultDropdown symbolsPolicy', symbolsPolicy)

  const { list } = setupRef

  showDropdown({
    that,
    symbolsPolicy,
    win,
    setupRef
  })

  symbolsPolicy.getListByKeywords().then((dataList: any[]) => {
    list.value = dataList

    showDropdown({
      that,
      symbolsPolicy,
      win,
      setupRef
    })
  })
}

export const showSearchDropdown = ({
  symbolsPolicy,
  that,
  keywords,
  win,
  setupRef
}: ShowSearchDropdownProps) => {
  // const {} = symbolsPolicy
  // console.log('showSearchDropdown keywords', keywords)
  // console.log('showSearchDropdown symbolsPolicy', symbolsPolicy)

  showDropdown({
    that,
    symbolsPolicy,
    win,
    setupRef
  })

  const { list } = setupRef

  symbolsPolicy
    .getListByKeywords(keywords)
    .then((dataList: DropdownListItem[]) => {
      list.value = dataList
      showDropdown({
        that,
        symbolsPolicy,
        win,
        setupRef
      })
    })
}

export const showDropdownRun = ({ that, win, setupRef }: ThatWinSetupRef) => {
  // 等隐藏完毕，且最新lists数据dom生成后，可基于此时的dom去获取最新的dropdown宽高和坐标
  const el = getRefEle(that, 'editorEle')
  const dropdownEle = getRefEle(that, 'dropdownEle')

  // console.log('showDropdownRun el', el)
  // console.log('showDropdownRun dropdownEle', dropdownEle)
  if (!el) return
  const caret = getOffset(el, win)
  const realPosition = getAdapterPosition({
    caret,
    dropdownEle,
    scrollingEle: win.document.scrollingElement
  }) // 获取正确的放置坐标，防止超出边界。本文基于offset

  const { dropdownPos, isShowDropdown, activeIndex } = setupRef

  dropdownPos.value = {
    left: realPosition.left + 'px',
    top: realPosition.top + 'px'
  }
  activeIndex.value = 0
  isShowDropdown.value = true // 此时再展示出来
}

export const showDropdown = ({
  that,
  symbolsPolicy,
  win,
  setupRef
}: ShowDropdownProps) => {
  const { isShowDropdown, symbolsPolicy: symbolsPolicyRef } = setupRef

  isShowDropdown.value = false // 先隐藏
  symbolsPolicyRef.value = null

  // console.log('showDropdown that', that)
  // console.log('showDropdown symbolsPolicy', symbolsPolicy)
  nextTick(() => {
    // 等隐藏完毕，且最新lists数据dom生成后，可基于此时的dom去获取最新的dropdown宽高和坐标
    showDropdownRun({
      that,
      win,
      setupRef
    })
    symbolsPolicyRef.value = symbolsPolicy
  })
}

export const insertHtmlAtCaret = ({
  html,
  selection,
  range,
  that,
  doc,
  setupRef
}: InsertHtmlAtCaretProps) => {
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

    updateEditorValue({ that, setupRef })
  }

  // console.log('selectData end')
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
  win,
  setupRef
}: InsertHtmlProps) => {
  const rangeInfo = getEditorRange(win)
  if (rangeInfo && htmlDom) {
    rangeInfo?.range?.deleteContents()

    insertHtmlAtCaret({
      html: htmlDom,
      selection: rangeInfo.selection,
      range: rangeInfo.range,
      that,
      doc: win.document,
      setupRef
    })
  }
}

export const updateEditorValue = ({
  that,
  setupRef
}: {
  that: ComponentInternalInstance
  setupRef: SetupRef
}) => {
  const res = getMsgStructure(getRefEle(that, 'editorEle'))
  // console.log('updateEditorValue res', res)
  const { editorValue } = setupRef
  editorValue.value = res
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
