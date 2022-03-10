import { build } from "tsup";
import chalk from 'chalk';
import { copyLoginHTML, rootPath } from "./ulity";
import { esbuildDecorators } from "@anatine/esbuild-decorators";

/** 编译 */
export async function mainBuild() {
  console.log(chalk.yellow(`tsup 开始编译...`));
  console.log(process.cwd());
  await copyLoginHTML()
  return build({
    name: "electron",
    entry: [rootPath('src/electron/index.ts')],
    splitting: false,
    sourcemap: true,
    clean: false,
    dts: false,
    format: ["cjs"],
    platform: "node",
    outDir: rootPath(`dev/electron`),
    external: ["electron", "@nestjs", "electron-serve"],
    bundle: true,
    // esbuildOptions: (options: BuildOptions, context: { format: Format }) => {
    //   // console.log(options)
    //   // console.log(context)
    // }
    esbuildPlugins: [
      esbuildDecorators({tsconfig: "tsconfig.json"})
    ]
  }).then(() => {
    console.log(chalk.green('编译完成'));
  })

}
/** 调试运行 */
// export async function devRun(PORT: number = NaN) {
//   await mainBuild();
//   runElectron(PORT);
// }





