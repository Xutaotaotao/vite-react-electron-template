import { autoUpdater } from "electron-updater";
import logger from "@/log";
import { mainWindow } from "..";

const updateUrl = 'http://127.0.0.1:8089'

autoUpdater.logger = logger;

export const initUpadate = () => {  
  autoUpdater.forceDevUpdateConfig = true
  autoUpdater.autoDownload = true
  autoUpdater.setFeedURL(updateUrl)
  autoUpdater.checkForUpdates();
  autoUpdater.checkForUpdatesAndNotify()
  
  autoUpdater.on("error", function (error:Error) {
    printUpdaterMessage('error')
    console.log(error)
  });
  
  autoUpdater.on("checking-for-update", function () {
  
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

function printUpdaterMessage(key:string) {
  let message:any = {
    'error': "更新出错",
    'checking': "正在检查更新",
    'update-available': "检测到新版本",
    'download-progress': "下载中",
    'update-not-available': "无新版本",
    'update-downloaded': "新版本下载完成"
  };
  logger.info("printUpdaterMessage", message[key])
}

export const intsallUpdateApp = () => {
  logger.info('update','intsallUpdateApp')
  autoUpdater.quitAndInstall()
}





