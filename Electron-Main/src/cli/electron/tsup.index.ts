import { build } from "tsup";
import chalk from 'chalk';
import { rootPath } from "./ulity";
import { esbuildDecorators } from "@anatine/esbuild-decorators";
import { join } from "path";
import { copy, pathExists } from "fs-extra";


/** 复制loading 文件 */
export async function copyLoginHTML(outDir: string) {
  const filePath = join(outDir, 'loading.html');
  console.log('filePath', filePath)
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

/**
 * 编译主进程
 * @param outDir 保存编译文件目录
 * @returns
 */
export async function indexBuild(outDir: string) {
  console.log(chalk.yellow(`开始编译...`));
  await copyLoginHTML(outDir)
  return build({
    name: "electron",
    entry: [rootPath('src/electron/index.ts')],
    splitting: false,
    sourcemap: true,
    clean: false,
    dts: false,
    format: ["cjs"],
    platform: "node",
    outDir,
    external: ["electron", "@nestjs", "electron-serve"],
    bundle: true,
    esbuildPlugins: [
      esbuildDecorators({tsconfig: rootPath("tsconfig.json")})
    ]
  }).then(() => {
    console.log(chalk.green('编译完成'));
  })

}
