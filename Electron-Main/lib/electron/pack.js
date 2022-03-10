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
var pack_exports = {};
__export(pack_exports, {
  copyElectronFiles: () => copyElectronFiles,
  copyRenderFiles: () => copyRenderFiles,
  pack: () => pack
});
var import_bytenode = require("bytenode");
var import_fs_extra = require("fs-extra");
var import_os = require("os");
var import_ulity = require("./ulity");
var import_chalk = __toESM(require("chalk"));
var import_path = require("path");
var import_electron_builder = require("electron-builder");
const runPath = process.cwd().replaceAll("\\", "/");
async function afterEsbuildBuild() {
  console.log(import_chalk.default.yellow("\u5F00\u59CB bytenode ..."));
  await (0, import_bytenode.compileFile)({
    filename: (0, import_ulity.rootPath)("dev/electron/index.js"),
    output: (0, import_ulity.rootPath)("dist/electron/main.jsc"),
    electron: true
  });
  (0, import_fs_extra.writeFileSync)((0, import_ulity.rootPath)("dist/electron/index.js"), "require('bytenode');require('./main.jsc')");
  console.log(import_chalk.default.green("bytenode \u5B8C\u6210"));
}
async function copyRenderFiles() {
  if (runPath !== (0, import_ulity.rootPath)("")) {
    await (0, import_fs_extra.copy)((0, import_path.join)(runPath, "dist/output"), (0, import_ulity.rootPath)(`dist/render`));
    console.log(import_chalk.default.green("\u590D\u5236\u6E32\u67D3\u8FDB\u7A0B\u6587\u4EF6\u5B8C\u6210"));
  }
}
async function copyElectronFiles() {
  var _a, _b;
  if (runPath !== (0, import_ulity.rootPath)("")) {
    const rootElectronPath = (0, import_ulity.rootPath)("node_modules/electron/package.json");
    const runElectronPath = (0, import_path.join)(runPath, `node_modules/electron/package.json`);
    if (await (0, import_fs_extra.pathExists)(runElectronPath)) {
      if (await (0, import_fs_extra.pathExists)(rootElectronPath)) {
        const rootVersion = (_a = JSON.parse(await (0, import_fs_extra.readFile)(rootElectronPath, "utf-8"))) == null ? void 0 : _a.version;
        const runVersion = (_b = JSON.parse(await (0, import_fs_extra.readFile)(runElectronPath, "utf-8"))) == null ? void 0 : _b.version;
        console.log({ rootVersion, runVersion });
        if (rootVersion !== runVersion) {
          await (0, import_fs_extra.copy)((0, import_path.join)(runPath, `node_modules/electron`), (0, import_ulity.rootPath)(`node_modules/electron`));
        }
      } else {
        await (0, import_fs_extra.copy)((0, import_path.join)(runPath, `node_modules/electron`), (0, import_ulity.rootPath)(`node_modules/electron`));
      }
    } else {
      console.log(import_chalk.default.red("\u8BF7\u5B89\u88C5 electron \u4F9D\u8D56"));
      return false;
    }
  }
}
async function pack(config = {
  appId: "electron.test",
  copyright: "\xA9\u6D4B\u8BD5",
  productName: "\u6D4B\u8BD5electron\u7A0B\u5E8F",
  buildVersion: "0.0.0"
}, renderDir) {
  await copyElectronFiles();
  await (0, import_ulity.copyLoginHTML)("dist");
  await afterEsbuildBuild();
  process.chdir((0, import_ulity.rootPath)(""));
  console.log(import_chalk.default.yellow(`electronBuilder \u5F00\u59CB\u6253\u5305${process.env.OS}...`));
  let packInfo = {};
  switch ((0, import_os.platform)()) {
    case "win32":
      packInfo = {
        win: {
          icon: (0, import_path.join)(runPath, "electron/icons/256x256.ico"),
          target: [
            {
              target: "nsis",
              arch: [
                "x64"
              ]
            }
          ]
        },
        nsis: {
          oneClick: false,
          allowElevation: true,
          allowToChangeInstallationDirectory: true,
          createDesktopShortcut: true,
          createStartMenuShortcut: true
        }
      };
      break;
    case "linux":
      packInfo = {
        linux: {
          target: [
            "deb"
          ],
          icon: (0, import_path.join)(runPath, "electron/icons")
        }
      };
      break;
    default:
      break;
  }
  await (0, import_electron_builder.build)({
    config: __spreadValues({
      artifactName: "${productName}${buildVersion}.${ext}",
      buildVersion: config.buildVersion,
      appId: config.appId,
      copyright: config.copyright,
      productName: config.productName,
      extraResources: {
        "from": "./extraResources",
        "to": "extraResources"
      },
      directories: {
        output: (0, import_path.join)(runPath, "pack")
      },
      npmRebuild: false,
      buildDependenciesFromSource: true,
      electronDownload: {
        mirror: "https://npm.taobao.org/mirrors/electron/"
      },
      files: [
        "dist/electron/**/*",
        {
          "from": (0, import_path.join)(runPath, renderDir),
          "to": "dist/render"
        }
      ],
      asar: false
    }, packInfo)
  });
  console.log(import_chalk.default.green("\u6253\u5305\u5B8C\u6210"));
}
module.exports = __toCommonJS(pack_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  copyElectronFiles,
  copyRenderFiles,
  pack
});
