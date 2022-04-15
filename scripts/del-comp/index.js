const inquirer = require('inquirer')
const fs = require('fs-extra')
const { resolve } = require('path')

const {
  listJsonTplSave,
  indexTsTplReplacer,
  getListJson,
  runTest
} = require('../utils')

const getQuestions = listData => [
  {
    type: 'checkbox',
    message: '请选择你需要删除的组件',
    name: 'compNameList',
    choices: listData.map(({ compName: name }) => ({ name })),
    validate(answer) {
      if (answer.length < 1) {
        return '至少选择一个'
      }

      return true
    }
  },
  {
    type: 'confirm',
    name: 'toBeDel',
    message: '确认删除？',
    default: true
  }
]

async function run() {
  const listData = getListJson()
  if (listData.length === 0) {
    console.log('没有任何组件可以操作，请先使用 pnpm new-comp 创建组件')
    return
  }
  const answers = await inquirer.prompt(getQuestions(listData))

  if (answers.toBeDel) {
    const newListFileContent = listData.filter(
      ({ compName }) => !answers.compNameList.includes(compName)
    )
    listJsonTplSave(newListFileContent)
    indexTsTplReplacer(newListFileContent)

    answers.compNameList.forEach(compName => {
      fs.removeSync(resolve(__dirname, `../../src/${compName}`))
    })

    await runTest()
    console.log(`${answers.compNameList.join(', ')} 已删除`)
  }
}

run()
