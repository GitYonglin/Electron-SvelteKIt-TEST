import { app, BrowserWindow } from "electron";
import path from "path";

export const showLoading = () => {
    const loading = new BrowserWindow({
        show: false,
        frame: false, // 无边框（窗口、工具栏等），只包含网页内容
        width: 360,
        height: 360,
        resizable: false,
        transparent: true, // 窗口是否支持透明，如果想做高级效果最好为true
    });

    // loading.once("show", cb);
    loading.loadFile(path.join(__dirname,"loading.html"));
    loading.once("ready-to-show", () => {
        loading.show(); // 显示窗口
    });
    return loading;
};
