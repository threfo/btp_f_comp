const mkdirTreeMd = require('mkdir-file-tree-md')
const { resolve } = require('path')

async function run() {
  mkdirTreeMd({
    entryDirPath: resolve(__dirname, '../..'),
    treeFilePath: resolve(__dirname, '../../DIR_TREE.md'),
    ignore: [
      'node_modules',
      '.git',
      '.DS_Store',
      'dist',
      '.temp',
      '.vscode',
      '.github'
    ]
  })
}

run()
