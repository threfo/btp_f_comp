const fs = require('fs-extra')
const util = require('util')
const { resolve } = require('path')
const listFilePath = '../../docs/.vitepress/list.json'
const handlebars = require('handlebars')

const childProcess = require('child_process')

const getListJson = () => {
  return fs.readJSONSync(resolve(__dirname, listFilePath))
}
//  更新 docs/.vitepress/list.json
const listJsonTplSave = listFileContent => {
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

// 读取 docs/.vitepress/list.json 并更新
const listJsonTplReplacer = meta => {
  const listFileContent = getListJson()
  listFileContent.push(meta)

  return listJsonTplSave(listFileContent)
}

// 更新 src/index.ts
const indexTsTplReplacer = listFileContent => {
  const installFileFrom = '../.template/index.ts.tpl'
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

const runTest = async () => {
  const exec = util.promisify(childProcess.exec)
  await exec('pnpm test')
}

module.exports = {
  listJsonTplSave,
  listJsonTplReplacer,
  indexTsTplReplacer,
  getListJson,
  runTest
}
