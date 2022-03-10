import { build } from "tsup";

(() => {
  build({
    entry: ['src/cli'],
    splitting: false,
    sourcemap: false,
    // clean: true,
    format: ["cjs"],
    outDir: "./lib",
    platform: "node",
    bundle: false,
    dts: false
  })
  build({
    entry: ['src/cli/index.ts'],
    splitting: false,
    sourcemap: false,
    format: ["cjs"],
    outDir: "./lib",
    platform: "node",
    bundle: false,
    dts: true
  })
})()
