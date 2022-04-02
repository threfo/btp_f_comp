import { Directive } from "./directive/type";

export interface ActionFuncParams {
  that: any;
  props: Event[] | any[];
  command?: any;
}

export type ActionFunc = (params: ActionFuncParams) => void;

export interface Action {
  [key: string]: string | string[] | ActionFunc | ActionFunc[];
}

export interface SlotItem {
  slot: string;
  // eslint-disable-next-line no-use-before-define
  value: JsonCompValue;
}

export type HookType =
  | "created"
  | "mounted"
  | "modelDataChange"
  | "asyncData"
  | "routeChange";

// 在vue 的组件声明周期的钩子
export type Hook = {
  [key in HookType]?: string | string[] | Directive | Directive[];
};

export interface ForProps {
  value: string | any[]; // 需要循环的变量名或者数组
  itemName?: string; // 循环的时候的变量量 没有配置用 `${value || ''}_item`
}

export interface JsonCompValue {
  id?: string; // 用于定位
  is: string;
  html?: string;
  children?: JsonCompValue[];
  slotArr?: SlotItem[];
  props?: any; // 组件属性
  attrs?: any; // 普通的 HTML attribute
  domProps?: any; // DOM property
  action?: Action; // 所有可提供的事件
  nativeOn?: Action;
  hook?: Hook; // 声明周期
  data?: any; // 初始时的数据
  isComponent?: boolean; // 是否不使用jsonComp 渲染（只能用在children或者slotArr内，针对第三方组件强关联结构设计如el-dropdown的el-dropdown-menu）
  for?: string | ForProps; // 开启循环的配置

  [key: string]: any;
}

export interface Template {
  value: JsonCompValue;
  props: any; // 该模版可以配置的参数，用于配置表单的自动生成
  name: string;
}

export interface Command {
  type: string;
  value: any;
  target?: string[];
}
