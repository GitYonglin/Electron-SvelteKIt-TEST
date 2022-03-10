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
var ulity_exports = {};
__export(ulity_exports, {
  getConfig: () => getConfig,
  rootPath: () => rootPath,
  runPath: () => runPath
});
var import_fs_extra = require("fs-extra");
var import_chalk = __toESM(require("chalk"));
var import_path = require("path");
function rootPath(...paths) {
  return (0, import_path.join)((0, import_path.resolve)(__dirname), "../../", ...paths).replaceAll("\\", "/");
}
function runPath(...paths) {
  return (0, import_path.join)(process.cwd(), ...paths).replaceAll("\\", "/");
}
async function getConfig() {
  try {
    const configPath = runPath("electron.config.json");
    return JSON.parse(await (0, import_fs_extra.readFile)(configPath, "utf-8"));
  } catch (error) {
    console.log(import_chalk.default.red("\u83B7\u53D6\u914D\u7F6E\u6587\u4EF6\u9519\u8BEF\uFF01"));
    console.log(error);
  }
}
module.exports = __toCommonJS(ulity_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getConfig,
  rootPath,
  runPath
});
