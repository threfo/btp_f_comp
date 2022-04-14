---
map:
  # 映射到docs的路径
  path: /components/{{compName}}
---

# {{compName}}({{ compZhName }})

{{ compDesc }}

## 代码演示

### 基本用法

<demo src="./demo/BaseDemo.vue"
  language="vue"
  title="基本用法"
  desc="点击切换。">
</demo>

## API

```ts
import { {{compName}} } from '@belloai/comp';
```

## Props

| 参数 | 说明 |   类型 | 可选值 |    默认值 | 是否必填 |
| ---- | ---: | -----: | -----: | --------: | -------: |
| size | 大小 | string |      - | `default` |       否 |

## Events

| 事件名 | 说明 | 参数列表 |   参数说明 |
| ------ | ---: | -------: | ---------: |
| click  | 大小 |   string | 例如'16px' |
