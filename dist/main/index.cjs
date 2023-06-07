"use strict";
const electron = require("electron");
const path = require("path");
const koffi = require("koffi");
const rsNative = require(path.resolve(
  __dirname,
  "../../resources/rs-native.darwin-x64.node"
));
const sumLib = koffi.load(path.resolve(
  __dirname,
  "../../resources/sum.dylib"
));
const nativeSum = sumLib.stdcall("sum", "int", ["int", "int"]);
const callNativeSumByDylib = (a, b) => {
  return nativeSum(a, b);
};
const callNativeSumByRustnode = (a, b) => {
  return rsNative.sum(a, b);
};
const callNativeSubtractionByRustnode = (a, b) => {
  return rsNative.subtraction(a, b);
};
const openUrlByDefaultBrowser = (e, args) => {
  electron.shell.openExternal(args);
};
const initIpc = (mainWindow2, workWindow2) => {
  electron.ipcMain.on("openUrlByDefaultBrowser", openUrlByDefaultBrowser);
  electron.ipcMain.on("communicateWithEachOtherSend", (event, arg) => {
    event.reply("communicateWithEachOtherReply", `I got ${arg},ok`);
  });
  electron.ipcMain.on("communicateWithEachOtherSendSync", (event, arg) => {
    event.returnValue = `I got ${arg},ok`;
  });
  electron.ipcMain.handle("communicateWithEachOtherSendPromise", async (event, arg) => {
    return `I got ${arg},ok`;
  });
  electron.ipcMain.on("renderSendMsgToWork", (event, msg) => {
    workWindow2 && workWindow2.webContents.send("msgFormRender", msg);
  });
  electron.ipcMain.handle("callNativeSumByDylib", (event, arg) => {
    return callNativeSumByDylib(arg.parmasOne, arg.parmasTwo);
  });
  electron.ipcMain.handle("callNativeSumByRustnode", (event, arg) => {
    return callNativeSumByRustnode(arg.parmasOne, arg.parmasTwo);
  });
  electron.ipcMain.handle("callNativeSubtractionByRustnode", (event, arg) => {
    return callNativeSubtractionByRustnode(arg.parmasOne, arg.parmasTwo);
  });
};
let workWindow = null;
let mainWindow = null;
const createWindow = () => {
  mainWindow = new electron.BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.join(__dirname, "../preload/index.cjs")
    }
  });
  {
    {
      mainWindow.loadURL("http://localhost:5173/");
      mainWindow.webContents.openDevTools();
    }
  }
  workWindow = new electron.BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "../work/index.cjs")
    }
  });
  workWindow.hide();
  {
    workWindow.webContents.openDevTools();
  }
  workWindow.loadFile(path.resolve(__dirname, "../work/index.html"));
  const { port1, port2 } = new electron.MessageChannelMain();
  mainWindow.once("ready-to-show", () => {
    mainWindow.webContents.postMessage("port", null, [port1]);
  });
  workWindow.once("ready-to-show", () => {
    workWindow.webContents.postMessage("port", null, [port2]);
  });
};
const creatMenu = () => {
  const menu = electron.Menu.buildFromTemplate([
    {
      label: electron.app.name,
      submenu: [
        {
          click: () => {
            mainWindow.webContents.send("update-counter", 1);
          },
          label: "IncrementNumber"
        }
      ]
    }
  ]);
  electron.Menu.setApplicationMenu(menu);
};
electron.app.whenReady().then(() => {
  createWindow();
  creatMenu();
  initIpc(mainWindow, workWindow);
  electron.app.on("activate", () => {
    if (electron.BrowserWindow.getAllWindows().length === 0)
      createWindow();
  });
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin")
    electron.app.quit();
});
