export type CallbackModel = 'flow' | 'all' | 'any' | 'race'

export type CapitalizeType = 'AUTO_INCREMENT'

export type ModifierType =
  | 'stop'
  | 'prevent'
  | 'self'
  | 'enter'
  | 'ctrl'
  | 'alt'
  | 'shift'
  | 'meta'
  | 'keyCode|*'
export interface Directive {
  id?: string // 标识符，定义后会把执行结果记录在上下文供后面的指令获取
  action: string // 指令名
  value?: any // 对应指令需要的参数
  callback?: Directive[] // 嵌套指令，当天指令执行完后，再执行那些子指令，所有子指令执行完后再执行数组的下一个指令
  callbackModel?: CallbackModel // 使用Promise 的对应方法来执行指令
  modifiers?: ModifierType[] // 指令执行时的修饰符，更多用于触发指令时的交互有PointEvent的情景
}

export interface DoDirectiveProps {
  context?: any
  directive: Directive
  directiveContext?: any // 用于指令间结构暂存，在剩下的指令中使用该变量 id做为key
  that?: any
  props?: any
}

export interface RunDirectiveProps {
  context?: any
  directiveList: Directive[]
  that?: any
  props?: any
}
