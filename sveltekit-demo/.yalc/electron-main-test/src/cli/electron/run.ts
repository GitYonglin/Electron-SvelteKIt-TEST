import { spawn } from "child_process";
import electron from "electron";
import chalk from 'chalk';
import path from "path";
import { getConfig, runPath } from "./ulity";
import { pathExistsSync } from "fs-extra";
import { indexBuild } from "./tsup.index";

function rootPath(p: string): string {
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
export async function runElectron(build: boolean) {
  const config = {outDir: ".electron", port: 3000, ...(await getConfig())?.dev};
  const outDir = runPath(config.outDir)
  const outDirIndexFile = runPath(config.outDir, 'index.cjs')
  if (build || !pathExistsSync(outDirIndexFile)) {
    await indexBuild(outDir);
  }

  process.env.VITE_PORT = config.port;
  console.log(chalk.yellow(`启动Electron监听 ${process.env.VITE_PORT} ...`));

  runMainProcess(outDirIndexFile)
}
