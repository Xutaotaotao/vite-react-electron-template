import { WriteDbDataParams,readDbData,writeDbData } from "./low"

export const gloabReadDbData = (key:string) => {
  if (import.meta.env.VITE_CURRENT_RUN_MODE === "main") {
    return readDbData(key)
  }
  return window.nativeBridge.readDbData(key)
}

export const gloabWriteDbData = (data:WriteDbDataParams) => {
  if (import.meta.env.VITE_CURRENT_RUN_MODE === "main") {
    return writeDbData(data)
  }
  return window.nativeBridge.writeDbData(data)
}