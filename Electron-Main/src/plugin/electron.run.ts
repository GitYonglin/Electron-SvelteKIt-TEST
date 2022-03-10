import { spawn } from "child_process";
import electron from "electron";
import chalk from 'chalk';
import path from "path";

function rootPath(p: string): string {
  // return path.join(path.resolve(__dirname), '../../', p).replaceAll("\\", "/");
  return path.resolve(path.join('./', p)).replaceAll("\\", "/");
}
/** 运行electron */
function runMainProcess(mainFile: string) {
  return spawn(electron as any, [mainFile],
    {
      stdio: 'inherit',
      // shell: true
    }); // 执行electron 主程序
};
/** 运行 */
export function runElectron(PORT: number = NaN) {
  if (PORT) {
    process.env.VITE_PORT = PORT.toString();
  }
  console.log(chalk.yellow(`启动Electron监听 ${process.env.VITE_PORT} ...`));

  runMainProcess(rootPath('dev/electron/index.js'))
}
