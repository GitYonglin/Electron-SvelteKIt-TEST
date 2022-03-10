import { copy, pathExists } from "fs-extra";
import path from "path";
import chalk from 'chalk';

/** 本项目根目录 */
export function rootPath(p: string): string {
  // return path.join(path.resolve(__dirname), '../../', p).replaceAll("\\", "/");
  return path.resolve(path.join('./', p)).replaceAll("\\", "/");
}

/** 复制loading 文件 */
export async function copyLoginHTML(dirPath: string = 'dev') {
  const filePath = rootPath(`${dirPath}/electron/loading.html`);
  try {
    if (!await pathExists(filePath)) {
      await copy(rootPath(`loading.html`), filePath);
      console.log(chalk.green(`复制 loading.html 完成`));
    }
  } catch (r) {
    console.log(chalk.yellow(`复制loading.html 发生错误`));
    console.log(r)
  }
}
