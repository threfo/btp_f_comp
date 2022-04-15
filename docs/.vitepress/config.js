const base = process.env.NODE_ENV === 'production' ? '/btp_f_comp' : '/'
const { resolve } = require('path')

const compList = require('./list.json')

module.exports = {
  title: '@belloai/comp',
  description: '',
  // 扫描srcIncludes里面的 *.md文件
  srcIncludes: ['src'],
  alias: {
    // 为了能在demo中正确的使用  import { X } from '@belloai/comp'
    [`@belloai/comp`]: resolve('./src')
  },
  base,
  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }]],
  themeConfig: {
    logo: '/logo.svg',
    lang: 'zh-CN',
    locales: {
      '/': {
        lang: 'zh-CN',
        title: '@belloai/comp',
        description: '',
        nav: [
          { text: '介绍', link: '/' },
          { text: '组件', link: '/components/' }
        ],
        sidebar: [
          { text: '开始', link: '/components/' },
          ...compList.map(({ compName }) => ({
            text: compName,
            link: `/components/${compName}/`
          }))
        ],
        editLinkText: '欢迎帮助我们改善页面!'
      }
    },
    search: {
      searchMaxSuggestions: 10
    },
    repo: 'threfo/btp_f_comp',
    repoLabel: 'Github',
    lastUpdated: true,
    prevLink: true,
    nextLink: true,
    docsDir: 'docs',
    docsBranch: 'master',
    editLinks: true
  }
}
