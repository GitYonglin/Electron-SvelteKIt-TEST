import { copy, pathExists, readFile } from "fs-extra";
import chalk from 'chalk';
import { join, resolve } from "path";

/** 本项目根目录 */
export function rootPath(...paths: string[]): string {
  return join(resolve(__dirname), '../../', ...paths).replaceAll("\\", "/");
}

export function runPath(...paths: string[]) {
  return join(process.cwd(), ...paths).replaceAll("\\", "/");
}

export async function getConfig() {
  try {
    const configPath = runPath('electron.config.json');
    return JSON.parse(await readFile(configPath, 'utf-8'));
  } catch (error) {
    console.log(chalk.red("获取配置文件错误！"));
    console.log(error);
  }
}
