[![Unit Test](https://github.com/threfo/btp_f_comp/actions/workflows/test.yml/badge.svg?branch=master)](https://github.com/threfo/btp_f_comp/actions/workflows/test.yml)

# @belloai/comp

build with [vitepress-for-component](https://github.com/dewfall123/vitepress-for-component)

## Start up

```bash
pnpm
pnpm dev # 文档调试开发组件

pnpm test # 跑测试

pnpm run new-comp # 添加新的组件
```

### 发版相关

```bash

pnpm build

pnpm release # 发布到npm， 会自动跑 build 和 docs-build-deploy

pnpm docs-build-serve # 文档系统的构建和web服务
pnpm docs-build-deploy # 文档系统的构建和发布到github page

pnpm changelog # 生成changelog
```

## 文件结构

```
├── .test
·    ├── README.md
·    └── setup.ts                          // vitest 初始化文件
├── CHANGELOG.md
├── docs                                   // vitepress 文档系统
·    ├── .vitepress
·    ·    ├── config.js                    // vitepress 文档系统 配置
·    ·    └── list.json                    // 文档中显示的组件定义，用命令自动维护
·    ├── components
·    ·    └── index.zh-CN.md
·    ├── index.zh-CN.md
·    ├── public                            // vitepress 文档系统 静态文件
·    ·    └── logo.svg
·    └── vite.config.ts                    // vitepress 文档系统 构建配置
├── package.json
├── pnpm-lock.yaml
├── scripts                                // 相关脚本
·    ├── .template                         // 脚本用到的模版
·    ·    ├── comp
·    ·    ·    ├── demo
·    ·    ·    ·    └── BaseDemo.vue.tpl
·    ·    ·    ├── index.test.ts.tpl
·    ·    ·    ├── index.vue.tpl
·    ·    ·    └── index.zh-CN.md.tpl
·    ·    └── index.ts.tpl
·    ├── README.md
·    ├── del-comp
·    ·    └── index.js
·    ├── dir-tree
·    ·    └── index.js
·    ├── new-comp
·    ·    ├── index.js
·    ·    ├── infoCollector.js
·    ·    └── tplReplacer.js
·    └── utils                             // 脚本用到的工具方法
·    ·    └── index.js
├── src                                    // 组件代码
·    ├── TextareaSymbol                    // 每一个需要导出的组件一个文件夹
·    ·    ├── demo                         // 组件 调用示例代码
·    ·    ·    └── BaseDemo.vue
·    ·    ├── index.test.ts                // 组件 单测，会自动用 vue2和vue3跑
·    ·    ├── index.vue
·    ·    ├── index.zh-CN.md               // 组件 介绍文档，会自动构建到 vitepress
·    ·    └── utils
·    ·    ·    ├── __test__
·    ·    ·    ·    ├── __snapshots__
·    ·    ·    ·    ·    └── caret.test.ts.snap
·    ·    ·    ·    └── caret.test.ts
·    ·    ·    ├── caret.ts
·    ·    ·    ├── dropdown.ts
·    ·    ·    ├── index.ts
·    ·    ·    └── type.ts
·    ├── index.ts                          // 导出的组件定义，用命令自动维护
·    └── shim.d.ts
├── tsconfig.json
├── vite.config.ts                         // 打包组件时的配置
└── vitest.config.ts                       // 测试组件时的配置
```

## We use

- [vite](https://cn.vitejs.dev/) - 构建工具
- [vue-demi](https://github.com/vueuse/vue-demi) - 开发出待兼容性的 vue 组件
- [vitepress-for-component](https://github.com/dewfall123/vitepress-for-component) - 改写[vitepress](https://vitepress.vuejs.org/) 像 [dumi](https://d.umijs.org/zh-CN) 文件结构的文档构建架构
- [np](https://github.com/sindresorhus/np) - 控制台交互式发版工具
- [ls-lint](https://ls-lint.org/) - 文件名校验工具([配置](./.ls-lint.yml))
- [vitest](https://vitest.dev/) - 基于 vite 的测试工具类似 jest

## Todo List

- [x] 基于[@vue/test-utils](https://test-utils.vuejs.org/guide/)的组件单元测试
- [x] 基于[vue-demi](https://github.com/vueuse/vue-demi)的 vue2 及 vue3 的兼容
- [x] vue2 及 vue3 的版本测试

## 相关资源

- [vite](https://cn.vitejs.dev/) - vite 官方文档
- [awesome-vite](https://github.com/vitejs/awesome-vite#plugins) - vite 相关的推荐内容
- [fs](http://nodejs.cn/api/fs.html) - fs api
