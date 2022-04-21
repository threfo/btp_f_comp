---
map:
  # 映射到docs的路径
  path: /components/TextareaSymbol
---

# TextareaSymbol(特殊符号提示输入框)

当输入定义的特殊符号时会把符号后的内容请求对应的 api 提供内容选择

## 代码演示

### 基本用法

<demo src="./demo/BaseDemo.vue"
  language="vue"
  title="基本用法"
  desc="点击切换。">
</demo>

## API

```ts
export { TextareaSymbol } from '@belloai/comp'
```

## Props

| 参数               | 说明 |   类型 | 可选值 | 默认值 | 是否必填 |
| ------------------ | ---: | -----: | -----: | -----: | -------: |
| watchSymbolsPolicy | 大小 | string |      - |      - |       是 |

```js
export interface SymbolsPolicy {
  symbol: string
  regExp: RegExp
  watchInputEvent: (e: Event | any) => boolean
  watchStr: (str: string) => boolean
  getKeywords: (str: string) => string
  getListByKeywords: (str: string) => Promise<DropdownListItem[]>
}

export interface DropdownListItem {
  id: string
  symbol: string
  label?: string
  type?: string
  componentName?: string
  componentProps?: any
}
```

## Events

| 事件名            |                   说明 |           参数列表 | 参数说明 |
| ----------------- | ---------------------: | -----------------: | -------: |
| initSymbolsPolicy | 快速构建 SymbolsPolicy | SymbolsPolicyProps |        - |

## 设计分析

### 技术上要考虑的点

- 如何能反解出输入框中人名的信息
- 后台提交接口该如何设计
- 人名检索接口设计。用户键入关键字后，要通过搜索接口实时拉取人名，api 接口该如何设计
- 如何检测@字符。如何区分是出默认人选还是按输入模糊检索。
- 选人后如何替换掉原来的检索文案。
- 选人浮层的定位。如何定位光标位置，如何将浮层放置在页面中最合适的位置；当浮层还没渲染时，如何知道浮层宽高从而进行位置选择
- 中文输入 bug。中文输入时，编辑器内会先出现拼音，等用户按“空格”或“回车”后变成中文，应该如何处理这种场景
- 如何实现整个人名一次性删除
- 人名隔离问题。即如何确保输入人名之后，再输入其他字符时自动产生一个新的 textNode 类型的节点，而不是插入到人名标签中
- placeholder 怎样实现
- 粘贴操作的处理。当用户粘贴富文本时，我们要不允许其粘贴或者将其粘贴内容转成纯文本

### at 字符和输入的检测

- 当用户输入 @ 时，我们要调起默认选人
- 当用户输入@，且后方跟着大于等于 1 个字符时，要调起搜索选人
- 当用户鼠标点击到某个字符处，要判断光标前方字符是否有 @，且区分是调起默认选人还是搜素选人
- 当用户键盘键入 “上箭头” “下箭头” 时，要将行为拦截并转换成对选人浮层人选的上下切换
- 当用户输入“回车”时，要拦截并转换成对选人浮层人选的确认操作
- 当用户输入“ESC 返回”时，要转成对选人浮层的关闭操作

### 参考

- [在输入框实现@ At 功能的一些思考](https://juejin.cn/post/6982251438332182542)
- [基于 contenteditable 技术实现@选人功能](https://segmentfault.com/a/1190000037660531)
