"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const electron = require("electron");
const openUrlByDefaultBrowser = (url) => electron.ipcRenderer.send("openUrlByDefaultBrowser", url);
const communicateWithEachOtherSendMsg = (msg) => electron.ipcRenderer.send("communicateWithEachOtherSend", msg);
const communicateWithEachOtherSendMsgSendSync = (msg) => electron.ipcRenderer.sendSync("communicateWithEachOtherSendSync", msg);
const communicateWithEachOtherSendMsgPromise = (msg) => electron.ipcRenderer.invoke("communicateWithEachOtherSendPromise", msg);
const onUpdateCounterByMain = (callback) => {
  electron.ipcRenderer.on("update-counter", (e, value) => {
    callback(e, value);
  });
};
const renderSendMsgToWork = (msg) => {
  electron.ipcRenderer.send("renderSendMsgToWork", msg);
};
const renderSendMsgToWorkByMessagePort = (msg) => {
  window.electronMessagePort && window.electronMessagePort.postMessage(msg);
};
const callNativeSumByDylib = (arg) => {
  return electron.ipcRenderer.invoke("callNativeSumByDylib", arg);
};
const callNativeSumByRustnode = (arg) => {
  return electron.ipcRenderer.invoke("callNativeSumByRustnode", arg);
};
const callNativeSubtractionByRustnode = (arg) => {
  return electron.ipcRenderer.invoke("callNativeSubtractionByRustnode", arg);
};
const onAppUpdateDownloaded = (callback) => {
  electron.ipcRenderer.on("app-update-downloaded", (e, value) => {
    callback(e, value);
  });
};
const intsallUpdateApp = () => {
  electron.ipcRenderer.invoke("intsallUpdateApp");
};
const readDbData = (key) => {
  return electron.ipcRenderer.invoke("readDbData", key);
};
const writeDbData = (data) => {
  return electron.ipcRenderer.invoke("writeDbData", data);
};
const unauthorizedFetch = () => {
  return electron.ipcRenderer.invoke("unauthorizedFetch");
};
const onLoginOutFromMain = (callback) => {
  electron.ipcRenderer.on("login-out", () => {
    callback();
  });
};
const loginOutFromWork = () => {
  electron.ipcRenderer.invoke("loginOutFromWork");
};
electron.contextBridge.exposeInMainWorld("nativeBridge", {
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
electron.ipcRenderer.on("communicateWithEachOtherReply", (_event, arg) => {
  alert(arg);
});
electron.ipcRenderer.on("port", (e) => {
  window.electronMessagePort = e.ports[0];
});
exports.loginOutFromWork = loginOutFromWork;
exports.readDbData = readDbData;
exports.writeDbData = writeDbData;
