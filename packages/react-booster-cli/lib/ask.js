const { prompt } = require('inquirer');

const questions = [
  {
    name: 'platform',
    type: 'list',
    message: '您的web应用需要在哪种环境下运行?',
    choices: [{
      name: 'PC',
      value: 'pc',
    }, {
      name: '移动端',
      value: 'mobile',
    }]
  }, 
  {
    name: 'isMPA',
    type: 'list',
    message: '生成单页or多页模板?',
    choices: [{
      name: '单页 SPA',
      value: false,
    }, {
      name: '多页 MPA',
      value: true,
    }]
  },
  {
    name: 'stateLibrary',
    type: 'list',
    message: '您希望安装的状态管理库是?',
    choices: [{
      name: 'mobx',
      value: 'mobx',
    }, {
      name: 'redux',
      value: 'redux',
    }]
  },
  {
    name: 'reactRouterVersion',
    type: 'list',
    message: '选择react-router的版本?',
    choices: [{
      name: 'v5 (推荐)',
      value: 'v5',
    }, {
      name: 'v6 (对hook支持度较好，但api不够稳定)',
      value: 'v6',
    }]
  }
]

module.exports = function ask () {
  return prompt(questions)
}