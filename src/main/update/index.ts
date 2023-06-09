import { autoUpdater } from "electron-updater";
import logger from "@/log";
import { mainWindow } from "..";

// 定义更新链接地址
const updateUrl = 'http://127.0.0.1:8089'

// 设置日志输出
autoUpdater.logger = logger;

// 初始化更新
export const initUpadate = () => {  
  autoUpdater.forceDevUpdateConfig = true // 强制使用开发环境进行更新
  autoUpdater.autoDownload = true // 设置自动下载更新
  autoUpdater.setFeedURL(updateUrl) // 设置更新地址
  autoUpdater.checkForUpdates(); // 检查更新
  autoUpdater.checkForUpdatesAndNotify() // 检查更新并通知

  // 注册更新过程中的各种事件
  autoUpdater.on("error", function (error:Error) {
    printUpdaterMessage('error')
    console.log(error)
  });
  
  autoUpdater.on("checking-for-update", function () {
    printUpdaterMessage('checking-for-update')
  });
  
  autoUpdater.on("update-available", function (info) {
    printUpdaterMessage('update-available')
    logger.info(info)
  });
  
  autoUpdater.on("update-not-available", function (info) {
    printUpdaterMessage('update-not-available')
    logger.info(info)
  });
  
  autoUpdater.on("download-progress", function (info) {
    printUpdaterMessage('download-progress')
    logger.info(info)
  });
  
  autoUpdater.on("update-downloaded", function (info) {
    printUpdaterMessage('update-downloaded')
    setTimeout(() => {
      mainWindow.webContents.send("app-update-downloaded", true);
    },3000)
    logger.info(info)
  });
}

// 打印更新过程中的消息
function printUpdaterMessage(key:string) {
  let message:any = {
    'error': "更新出错",
    'checking-for-update': "正在检查更新",
    'update-available': "检测到新版本",
    'download-progress': "下载中",
    'update-not-available': "无新版本",
    'update-downloaded': "新版本下载完成"
  };
  logger.info("printUpdaterMessage", message[key])
}

// 安装更新
export const intsallUpdateApp = () => {
  logger.info('update','intsallUpdateApp')
  autoUpdater.quitAndInstall() // 退出并安装更新
}
