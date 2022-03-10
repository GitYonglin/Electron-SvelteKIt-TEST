#!/usr/bin/env node

/**  */
import { program } from 'commander';
import inquirer from 'inquirer';
import { runElectron } from '../plugin';
import { mainBuild } from '../plugin/tsup.electron';

program
  .command('dev')
  .description('调试项目')
  .alias('c')
  .action((projectName, options) => {
    createInquirer(options, (name) => {
      console.log('选择调试：', name)
      switch (name) {
        case "编译":
          mainBuild();
          break;
        case "运行":
          runElectron(3000);
          break;
        case "打包编译":
          break;
        default:
          break;
      }
    })
  })

function createInquirer(options, callback) {
  const { _name, _description } = options
  inquirer
    .prompt([
      {
        type: 'list',
        name: _name,
        message: `请选择${_description}`,
        choices: ['编译', '运行']
      }
    ])
    .then((answer) => {
      console.log('选择结果', _name, answer[_name]);
      // console.log('路径__dirname', __dirname);
      // console.log('路径__filename', __filename);
      callback(answer[_name])
    })
}


program.version('1.0.0').parse(process.argv)
