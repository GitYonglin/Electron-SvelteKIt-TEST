import { build } from "tsup";

(() => {
  build({
    name: "plugin",
    entry: ['src/plugin/index.ts'],
    splitting: false,
    sourcemap: true,
    clean: true,
    format: ["cjs", "esm"],
    outDir: "./lib/plugin",
    external: [
      "electron",
      "app-root-path",
      "bytenode",
      'electron-builder',
      'esbuild',
      'commander',
      'inquirer',
      "tsup",
      "child_process",
      "electron",
      "bytenode",
      'chalk',
      'electron-builder',
      "fs-extra",
      'vite',
    ],
    platform: "node",
    bundle: true,
    dts: true
  })
})()

