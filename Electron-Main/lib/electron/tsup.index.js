var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, copyDefault, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toESM = (module2, isNodeMode) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", !isNodeMode && module2 && module2.__esModule ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __toCommonJS = /* @__PURE__ */ ((cache) => {
  return (module2, temp) => {
    return cache && cache.get(module2) || (temp = __reExport(__markAsModule({}), module2, 1), cache && cache.set(module2, temp), temp);
  };
})(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);
var tsup_index_exports = {};
__export(tsup_index_exports, {
  copyLoginHTML: () => copyLoginHTML,
  indexBuild: () => indexBuild
});
var import_tsup = require("tsup");
var import_chalk = __toESM(require("chalk"));
var import_ulity = require("./ulity");
var import_esbuild_decorators = require("@anatine/esbuild-decorators");
var import_path = require("path");
var import_fs_extra = require("fs-extra");
async function copyLoginHTML(outDir) {
  const filePath = (0, import_path.join)(outDir, "loading.html");
  console.log("filePath", filePath);
  try {
    if (!await (0, import_fs_extra.pathExists)(filePath)) {
      await (0, import_fs_extra.copy)((0, import_ulity.rootPath)(`loading.html`), filePath);
      console.log(import_chalk.default.green(`\u590D\u5236 loading.html \u5B8C\u6210`));
    }
  } catch (r) {
    console.log(import_chalk.default.yellow(`\u590D\u5236loading.html \u53D1\u751F\u9519\u8BEF`));
    console.log(r);
  }
}
async function indexBuild(outDir) {
  console.log(import_chalk.default.yellow(`\u5F00\u59CB\u7F16\u8BD1...`));
  await copyLoginHTML(outDir);
  return (0, import_tsup.build)({
    name: "electron",
    entry: [(0, import_ulity.rootPath)("src/electron/index.ts")],
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
      (0, import_esbuild_decorators.esbuildDecorators)({ tsconfig: (0, import_ulity.rootPath)("tsconfig.json") })
    ]
  }).then(() => {
    console.log(import_chalk.default.green("\u7F16\u8BD1\u5B8C\u6210"));
  });
}
module.exports = __toCommonJS(tsup_index_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  copyLoginHTML,
  indexBuild
});
