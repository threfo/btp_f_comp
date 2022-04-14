const fs = require('fs-extra')
const handlebars = require('handlebars')
const { resolve } = require('path')

const compFilesTplReplacer = meta => {
  const files = [
    'index.zh-CN.md',
    'index.en-US.md',
    'index.vue',
    'index.test.ts',
    'demo/BaseDemo.vue'
  ]

  files.forEach(fileName => {
    const fileTpl = fs.readFileSync(
      resolve(__dirname, `./.template/comp/${fileName}.tpl`),
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

// 读取 docs/.vitepress/list.json 并更新
const listJsonTplReplacer = meta => {
  const listFilePath = '../../docs/.vitepress/list.json'
  const listFileTpl = fs.readFileSync(resolve(__dirname, listFilePath), 'utf-8')
  const listFileContent = JSON.parse(listFileTpl)
  listFileContent.push(meta)
  const newListFileContentFile = JSON.stringify(listFileContent, null, 2)
  fs.writeFile(
    resolve(__dirname, listFilePath),
    newListFileContentFile,
    err => {
      if (err) console.log(err)
    }
  )
  return listFileContent
}

// 更新 src/index.ts
const indexTsTplReplacer = listFileContent => {
  const installFileFrom = './.template/index.ts.tpl'
  const installFileTo = '../../src/index.ts' // 这里没有写错，别慌
  const installFileTpl = fs.readFileSync(
    resolve(__dirname, installFileFrom),
    'utf-8'
  )

  const installMeta = {
    importPlugins: listFileContent
      .map(
        ({ compName }) => `import ${compName} from './${compName}/index.vue';`
      )
      .join('\n'),
    exportPlugins: listFileContent
      .map(({ compName }) => `${compName},`)
      .join('\n')
  }
  const installFileContent = handlebars.compile(installFileTpl, {
    noEscape: true
  })(installMeta)
  fs.outputFile(resolve(__dirname, installFileTo), installFileContent, err => {
    if (err) console.log(err)
  })
}

module.exports = meta => {
  compFilesTplReplacer(meta)
  const listFileContent = listJsonTplReplacer(meta)
  indexTsTplReplacer(listFileContent)

  console.log(`组件新建完毕，请前往 src/${meta.compName} 目录进行开发`)
}
