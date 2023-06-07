"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const electron = require("electron");
const initWork = () => {
  console.log("initWork");
};
electron.ipcRenderer.on("msgFormRender", (event, msg) => {
  console.log("msgFormRender:", msg);
});
electron.ipcRenderer.on("port", (e) => {
  const electronMessagePort = e.ports[0];
  electronMessagePort.onmessage = (msg) => {
    console.log("window.electronMessagePort.onmessage work:", msg.data);
  };
});
initWork();
exports.initWork = initWork;
