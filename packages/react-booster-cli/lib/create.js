const path = require('path');
const fs = require('fs');

// 检测目录是否存在
const exists = fs.existsSync;
// 删除文件
const rm = require('rimraf').sync;
// 询问cli输入参数
const ask = require('./ask');
// 命令行loading
const ora = require('ora');
// 输出增色
const chalk = require('chalk');
// 检测版本
const checkVersion = requrie('./check-version');

const generate = require('./generate');

const { writeFileTree } = require('./util/file');
const runCommand = require('./util/run');

// loading
const spinner = ora();
async function create(projectName) {
  const cwd = process.cwd(); // 当前运行node命令的目录
  const projectPath = path.resolve(cwd, projectName);
  // 假如当前已存在同名项目，询问是否覆盖
  if (exists(projectPath)) {
    const answers = await inquirer.prompt([
      {
        type: 'confirm',
        messages: 'Target directory exists. Do you want to replace it?',
        name: 'ok',
      }
    ]);
    if (answers.ok) {
      console.log(chalk.yellow('Deleting old project ...'));
      rm(projectPath);
      await create(projectName);
    }
  } else {
    // 收集用户输入选项
    const answers = await ask();
    spinner.start('check version');
    // 检测脚本
    await checkVersion();
    spinner.succeed();
    console.log(`✨ creating project in ${chalk.yellow(projectPath)}.`);
    // 更新package.json
    const pkg = require('../template/package.json');
    
    // 生成项目配置文件, app.config.json
  }
}