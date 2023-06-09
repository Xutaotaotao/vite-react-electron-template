"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("nativeBridge", {
  openUrlByDefaultBrowser: (url) => electron.ipcRenderer.send("openUrlByDefaultBrowser", url),
  communicateWithEachOtherSendMsg: (msg) => electron.ipcRenderer.send("communicateWithEachOtherSend", msg),
  communicateWithEachOtherSendMsgSendSync: (msg) => electron.ipcRenderer.sendSync("communicateWithEachOtherSendSync", msg),
  communicateWithEachOtherSendMsgPromise: (msg) => electron.ipcRenderer.invoke("communicateWithEachOtherSendPromise", msg),
  onUpdateCounterByMain: (callback) => {
    electron.ipcRenderer.on("update-counter", (e, value) => {
      callback(e, value);
    });
  },
  renderSendMsgToWork: (msg) => {
    electron.ipcRenderer.send("renderSendMsgToWork", msg);
  },
  renderSendMsgToWorkByMessagePort: (msg) => {
    window.electronMessagePort && window.electronMessagePort.postMessage(msg);
  },
  callNativeSumByDylib: (arg) => {
    return electron.ipcRenderer.invoke("callNativeSumByDylib", arg);
  },
  callNativeSumByRustnode: (arg) => {
    return electron.ipcRenderer.invoke("callNativeSumByRustnode", arg);
  },
  callNativeSubtractionByRustnode: (arg) => {
    return electron.ipcRenderer.invoke("callNativeSubtractionByRustnode", arg);
  },
  onAppUpdateDownloaded: (callback) => {
    electron.ipcRenderer.on("app-update-downloaded", (e, value) => {
      callback(e, value);
    });
  },
  intsallUpdateApp: () => {
    electron.ipcRenderer.invoke("intsallUpdateApp");
  }
});
electron.ipcRenderer.on("communicateWithEachOtherReply", (_event, arg) => {
  alert(arg);
});
electron.ipcRenderer.on("port", (e) => {
  window.electronMessagePort = e.ports[0];
});
