import { ipcMain, IpcMainEvent, shell } from "electron";
import {
  callNativeSumByDylib,
  callNativeSumByRustnode,
  callNativeSubtractionByRustnode,
} from "../native";
import { intsallUpdateApp } from "../update";
import { readDbData, writeDbData, WriteDbDataParams} from "@/lowdb/low";
import { unauthorizedFetch } from "@/http/service";

const openUrlByDefaultBrowser = (e: IpcMainEvent, args: any) => {
  shell.openExternal(args);
};

export const initIpc = (mainWindow: any, workWindow: any) => {
  ipcMain.on("openUrlByDefaultBrowser", openUrlByDefaultBrowser);

  ipcMain.on("communicateWithEachOtherSend", (event, arg) => {
    event.reply("communicateWithEachOtherReply", `I got ${arg},ok`);
  });
  ipcMain.on("communicateWithEachOtherSendSync", (event, arg) => {
    event.returnValue = `I got ${arg},ok`;
  });
  ipcMain.handle("communicateWithEachOtherSendPromise", async (event, arg) => {
    return `I got ${arg},ok`;
  });

  ipcMain.on("renderSendMsgToWork", (_event: any, msg: any) => {
    workWindow && workWindow.webContents.send("msgFormRender", msg);
  });

  ipcMain.handle("callNativeSumByDylib", (_event: any, arg) => {
    return callNativeSumByDylib(arg.parmasOne, arg.parmasTwo);
  });

  ipcMain.handle("callNativeSumByRustnode", (_event: any, arg) => {
    return callNativeSumByRustnode(arg.parmasOne, arg.parmasTwo);
  });

  ipcMain.handle("callNativeSubtractionByRustnode", (_event: any, arg) => {
    return callNativeSubtractionByRustnode(arg.parmasOne, arg.parmasTwo);
  });

  ipcMain.handle("intsallUpdateApp", () => {
    intsallUpdateApp();
  });

  ipcMain.handle("readDbData", (_event: any, key: string) => {
    return readDbData(key);
  });

  ipcMain.handle("writeDbData", (_event: any, data: WriteDbDataParams) => {
    return writeDbData(data);
  });

  ipcMain.handle('unauthorizedFetch', () => {
    return unauthorizedFetch()
  })
};
