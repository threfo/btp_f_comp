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

export interface TextareaSymbolComponent {
  modelValue: EditorValueItem[]

  isShowDropdown: boolean
  preventKeyUp: boolean
  symbolsPolicy: SymbolsPolicy | null
  editorRange: EditorRange | null
  editorValue: EditorValueItem[]
  list: DropdownListItem[]
  dropdownPos: DropdownPos
  activeIndex: number

  watchSymbolsPolicy: SymbolsPolicy[]

  $nextTick: any
  $refs: any
}
