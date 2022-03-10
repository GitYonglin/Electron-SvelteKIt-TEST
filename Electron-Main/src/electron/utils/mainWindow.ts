/*
 * @Author: lx000
 * @Date: 2021-11-05 10:21:41
 * @LastEditTime: 2021-12-03 09:07:46
 * @Description: mianWindow
 */
import { app, BrowserWindow } from "electron";
// import { setContextMenu } from "./setContextMenu";
import * as path from "path";
import { join } from "path";
import serve from 'electron-serve';


/** 创建窗口方法 */
async function mainWindow(loading, isDev: boolean) {
  console.log("运行环境", isDev);

  console.log('URL', process.env.VITE_PORT)

  const URL = isDev
    ? `http://localhost:${process.env.VITE_PORT || 3000}`
    : `file://${join(app.getAppPath(), 'dist/render/index.html')}`;
  // 生成窗口实例
  const Window = new BrowserWindow({
    width: 1920, // * 指定启动app时的默认窗口尺寸
    height: 768, // * 指定启动app时的默认窗口尺寸
    // frame: false, // * app边框(包括关闭,全屏,最小化按钮的导航栏) @false: 隐藏
    transparent: true, // * app 背景透明
    hasShadow: false, // * app 边框阴影
    show: false, // 启动窗口时隐藏,直到渲染进程加载完成「ready-to-show 监听事件」 再显示窗口,防止加载时闪烁
    // resizable: false, // 禁止手动修改窗口尺寸
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
      contextIsolation: false,
      devTools: isDev,
      // 加载脚本
      // preload: path.join(__dirname, "..", "preload.js")
    },
  });
  // console.log('__dirname', path.join(__dirname, "..", "preload.js"))

  // 启动窗口时隐藏,直到渲染进程加载完成「ready-to-show 监听事件」 再显示窗口,防止加载时闪烁
  Window.once("ready-to-show", () => {
    console.log('ready-to-show')
    loading.hide();
    loading.close();
    Window.show(); // 显示窗口
    Window.webContents.openDevTools();
  });

  /**设置全局右键菜单 */
  // setContextMenu(Window);
  isDev ?
    await Window.loadURL(URL) :
    serve({ directory: join(app.getAppPath(), 'dist/render') })(Window);
  // // * 主窗口加载外部链接
  // if (NODE_ENV === "development")
  //     Window.loadURL("http://localhost:3333/")
  // else
  //     Window.loadFile(path.join(__dirname, "..", "..", "render/index.html")); // 生产环境加载打包后文件
  // // serveURL(Window);


  return Window;
}

export { mainWindow };
