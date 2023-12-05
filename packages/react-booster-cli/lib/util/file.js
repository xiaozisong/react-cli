// 导入模块
const fs = require('fs-extra');
const path = require('path');

function deleteRemovedFiles (directory, newFiles, previousFiles) {
  // 获取在新文件夹中不存在 但他处确实纯在的文件
  const filesToDelete = Object.keys(previousFiles)
    .filter(filename => !newFiles[filename])

  // 删除当前文件中的每一个
  return Promise.all(filesToDelete.map(filename => {
    // 删除
    return fs.unlink(path.join(directory, filename))
  }))
}


/**
 * @param {*} dir 目标目录
 * @param {*} files 文件路径为key， 文件内容为value eg:{'/a/b', 'file-text'}
 * @param {*} previousFiles
 */
async function writeFileTree (dir, files, previousFiles) {
  if (previousFiles) {
    await deleteRemovedFiles(dir, files, previousFiles)
  }
  Object.keys(files).forEach((name) => {
    const filePath = path.join(dir, name);
    // 判断目录是否存在，否则创建目录
    fs.ensureDirSync(path.dirname(filePath));
    // 将数据写入文件中
    fs.writeFileSync(filePath, files[name])
  })
}

module.exports = {
  writeFileTree
}