---
map:
  path: /components/{{compName}}
---

# {{compName}}

{{ compDesc }}

## Demo

### Base

<demo src="./demo/BaseDemo.vue"
  language="vue"
  title="Base"
  desc="click show code">
</demo>

## API

```ts
import { {{compName}} } from '@belloai/comp';
```

## Props

| Property | Description |   Type | Choose |   Default | Require |
| -------- | ----------: | -----: | -----: | --------: | ------: |
| size     |        size | string |      - | `default` |      No |

## Events

| Method |  Description | Args | Args Description |
| ------ | -----------: | ---: | ---------------: |
| click  | Click method |    - |                - |
