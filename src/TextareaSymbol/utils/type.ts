import { Ref, ComponentInternalInstance } from 'vue-demi'
export interface SymbolsPolicyProps {
  symbol: string
  regExp: RegExp
  watchInputEvent: (e: Event | any) => boolean
  watchStr?: (str: string) => boolean
  getKeywords?: (str: string) => string
  getListByKeywords: (str?: string) => Promise<DropdownListItem[]>
}

export type SymbolsPolicy = Required<SymbolsPolicyProps>

export interface EditorRange {
  range: any
  selection: Selection
}

export interface EditorValueItem {
  type: string
  data: any
}

export interface DropdownListItem {
  id: string
  symbol: string
  label?: string
  type?: string
  componentName?: string
  componentProps?: any
}

export interface DropdownPos {
  left: string
  top: string
}

export interface SetupRef {
  list: Ref<DropdownListItem[]>
  activeIndex: Ref<number>
  dropdownPos: Ref<DropdownPos>
  isShowDropdown: Ref<boolean>
  editorValue: Ref<EditorValueItem[]>
  preventKeyUp: Ref<boolean>
  symbolsPolicy: Ref<SymbolsPolicy | null>
  editorRange: Ref<EditorRange | null>
}

export interface _Event {
  e: Event
}

export interface _That {
  that: ComponentInternalInstance | null
}

export interface _Win {
  win: Window
}

export interface _Doc {
  doc: Document
}

export interface _Props {
  props: any
}

export interface _SetupRef {
  setupRef: SetupRef
}

export interface _Str {
  str: string
}

export interface _Data {
  data: DropdownListItem
}

export interface _SymbolsPolicy {
  symbolsPolicy: SymbolsPolicy
}

export type EventThatWin = _Event & _That & _Win
export type EventProps = _Event & _Props
export type EventThatWinProps = EventThatWin & _Props
export type EventThatWinSetupRef = EventThatWin & _SetupRef
export type EventThatWinPropsSetupRef = EventThatWinProps & _SetupRef

export type ThatWinSetupRef = _That & _Win & _SetupRef
export type ThatWinPropsSetupRef = ThatWinSetupRef & _Props

export type StrProps = _Str & _Props
export type EventSetupRef = _Event & _SetupRef

export type SelectDataProps = _Data & _That & _Doc & _SetupRef
export type ShowDefaultDropdownProps = _SymbolsPolicy & _That & _Win & _SetupRef
export type ShowDropdownProps = ShowDefaultDropdownProps

export type ShowSearchDropdownProps = _SymbolsPolicy &
  _That &
  _Win &
  _SetupRef & {
    keywords: string
  }

export type InsertHtmlAtCaretProps = _That &
  _Doc &
  _SetupRef & {
    html: string | Node[]
    selection: Selection
    range: any
  }

export type OnLiMousedownProps = _Event & _Data & _That & _Win & _SetupRef
export type InsertHtmlProps = _That &
  _Win &
  _SetupRef & {
    htmlDom: any
  }

export type InitEditorEleProps = _That &
  _Doc &
  _SetupRef & {
    value: EditorValueItem[]
  }
