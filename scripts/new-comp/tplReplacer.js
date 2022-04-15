const fs = require('fs-extra')
const handlebars = require('handlebars')
const { resolve } = require('path')
const { indexTsTplReplacer, listJsonTplReplacer, runTest } = require('../utils')

const compFilesTplReplacer = meta => {
  const files = [
    'index.zh-CN.md',
    'index.vue',
    'index.test.ts',
    'demo/BaseDemo.vue'
  ]

  files.forEach(fileName => {
    const fileTpl = fs.readFileSync(
      resolve(__dirname, `../.template/comp/${fileName}.tpl`),
      'utf-8'
    )
    const fileContent = handlebars.compile(fileTpl)(meta)
    fs.outputFile(
      resolve(__dirname, `../../src/${meta.compName}/${fileName}`),
      fileContent,
      err => {
        if (err) console.log(err)
      }
    )
  })
}

module.exports = async meta => {
  compFilesTplReplacer(meta)
  const listFileContent = listJsonTplReplacer(meta)
  indexTsTplReplacer(listFileContent)

  await runTest()
  console.log(`组件新建完毕，请前往 src/${meta.compName} 目录进行开发`)
}
