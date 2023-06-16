import { WriteDbDataParams } from "./low"

export const gloabReadDbData = (key:string) => {
  if (import.meta.env.VITE_CURRENT_RUN_MODE === "main") {
    const {readDbData } = require('./low')
    return readDbData(key)
  }
  return window.nativeBridge.readDbData(key)
}

export const gloabWriteDbData = (data:WriteDbDataParams) => {
  if (import.meta.env.VITE_CURRENT_RUN_MODE === "main") {
    const {writeDbData } = require('./low')
    return writeDbData(data)
  }
  return window.nativeBridge.writeDbData(data)
}