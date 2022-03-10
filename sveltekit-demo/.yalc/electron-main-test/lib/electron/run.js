var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
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
var run_exports = {};
__export(run_exports, {
  runElectron: () => runElectron
});
var import_child_process = require("child_process");
var import_electron = __toESM(require("electron"));
var import_chalk = __toESM(require("chalk"));
var import_path = __toESM(require("path"));
var import_ulity = require("./ulity");
var import_fs_extra = require("fs-extra");
var import_tsup = require("./tsup.index");
function rootPath(p) {
  return import_path.default.resolve(import_path.default.join("./", p)).replaceAll("\\", "/");
}
function runMainProcess(mainFile) {
  return (0, import_child_process.spawn)(import_electron.default, [mainFile], {
    stdio: "inherit"
  });
}
;
async function runElectron(build) {
  var _a;
  const config = __spreadValues({ outDir: ".electron", port: 3e3 }, (_a = await (0, import_ulity.getConfig)()) == null ? void 0 : _a.dev);
  const outDir = (0, import_ulity.runPath)(config.outDir);
  const outDirIndexFile = (0, import_ulity.runPath)(config.outDir, "index.cjs");
  if (build || !(0, import_fs_extra.pathExistsSync)(outDirIndexFile)) {
    await (0, import_tsup.indexBuild)(outDir);
  }
  process.env.VITE_PORT = config.port;
  console.log(import_chalk.default.yellow(`\u542F\u52A8Electron\u76D1\u542C ${process.env.VITE_PORT} ...`));
  runMainProcess(outDirIndexFile);
}
module.exports = __toCommonJS(run_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  runElectron
});
