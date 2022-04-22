const fs = require('fs-extra')

const { resolve } = require('path')

const ignore = [
  'node_modules',
  '.git',
  '.DS_Store',
  'dist',
  '.temp',
  '.vscode',
  '.github'
]

const tree = []

const readdir = (dirName, parentName, pre) => {
  const filePath = `${parentName}/${dirName}`
  let dirList = []
  try {
    dirList = fs.readdirSync(resolve(__dirname, filePath))
  } catch (error) {}

  if (dirList.length) {
    for (let i = 0; i < dirList.length; i++) {
      const newFileName = dirList[i]

      if (!ignore.includes(newFileName)) {
        const isLast = dirList.length - 1 === i
        const preStr = isLast ? '└── ' : '├── '

        tree.push(`${pre}${preStr}${newFileName}`)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        readdir(newFileName, filePath, `·    ${pre}`)
      }
    }
  }
}

async function run() {
  readdir('..', '..', '')
  console.log('tree', tree)

  fs.writeFile(
    resolve(__dirname, '../../DIR_TREE.md'),
    ['```', ...tree, '```'].join('\n')
  )
}

run()
