import { contextBridge, ipcRenderer } from "electron";

interface callNativeSumParmas {
  parmasOne: number;
  parmasTwo: number;
}

const openUrlByDefaultBrowser = (url: string) =>
  ipcRenderer.send("openUrlByDefaultBrowser", url);
const communicateWithEachOtherSendMsg = (msg: string) =>
  ipcRenderer.send("communicateWithEachOtherSend", msg);

const communicateWithEachOtherSendMsgSendSync = (msg: string) =>
  ipcRenderer.sendSync("communicateWithEachOtherSendSync", msg);

const communicateWithEachOtherSendMsgPromise = (msg: string) =>
  ipcRenderer.invoke("communicateWithEachOtherSendPromise", msg);

const onUpdateCounterByMain = (callback: any) => {
  ipcRenderer.on("update-counter", (e, value) => {
    callback(e, value);
  });
};
const renderSendMsgToWork = (msg: any) => {
  ipcRenderer.send("renderSendMsgToWork", msg);
};
const renderSendMsgToWorkByMessagePort = (msg: any) => {
  window.electronMessagePort && window.electronMessagePort.postMessage(msg);
};
const callNativeSumByDylib = (arg: callNativeSumParmas) => {
  return ipcRenderer.invoke("callNativeSumByDylib", arg);
};
const callNativeSumByRustnode = (arg: callNativeSumParmas) => {
  return ipcRenderer.invoke("callNativeSumByRustnode", arg);
};
const callNativeSubtractionByRustnode = (arg: callNativeSumParmas) => {
  return ipcRenderer.invoke("callNativeSubtractionByRustnode", arg);
};
const onAppUpdateDownloaded = (callback: Function) => {
  ipcRenderer.on("app-update-downloaded", (e, value) => {
    callback(e, value);
  });
};
const intsallUpdateApp = () => {
  ipcRenderer.invoke("intsallUpdateApp");
};
export const readDbData = (key: string) => {
  return ipcRenderer.invoke("readDbData", key);
};
export const writeDbData = (data: any) => {
  return ipcRenderer.invoke("writeDbData", data);
};
const unauthorizedFetch = () => {
  return ipcRenderer.invoke("unauthorizedFetch");
};
const onLoginOutFromMain = (callback: Function) => {
  ipcRenderer.on("login-out", () => {
    callback();
  });
};
export const loginOutFromWork = () => {
  ipcRenderer.invoke("loginOutFromWork");
}

contextBridge.exposeInMainWorld("nativeBridge", {
  openUrlByDefaultBrowser,
  communicateWithEachOtherSendMsg,
  communicateWithEachOtherSendMsgSendSync,
  communicateWithEachOtherSendMsgPromise,
  onUpdateCounterByMain,
  renderSendMsgToWork,
  renderSendMsgToWorkByMessagePort,
  callNativeSumByDylib,
  callNativeSumByRustnode,
  callNativeSubtractionByRustnode,
  onAppUpdateDownloaded,
  intsallUpdateApp,
  readDbData,
  writeDbData,
  unauthorizedFetch,
  onLoginOutFromMain
});

ipcRenderer.on("communicateWithEachOtherReply", (_event, arg) => {
  alert(arg);
});

ipcRenderer.on("port", (e) => {
  window.electronMessagePort = e.ports[0];
});
