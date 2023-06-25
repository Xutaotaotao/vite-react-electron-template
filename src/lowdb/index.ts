import { WriteDbDataParams,readDbData,writeDbData } from "./low"

export const gloabReadDbData = (key:string) => {
  if (import.meta.env.VITE_CURRENT_RUN_MODE === "main") {
    return readDbData(key)
  }
  if (import.meta.env.VITE_CURRENT_RUN_MODE === "work" ) {
    return new Promise((resolve) => {
      import('@/preload/index').then(res => {
        const {readDbData} = res
        readDbData(key).then((res) => {
          resolve(res)
        }).catch(() => {
          resolve('')
        })
      }).catch(() => {
        resolve('')
      })
    })
  }
  return window.nativeBridge.readDbData(key)
}

export const gloabWriteDbData = (data:WriteDbDataParams) => {
  console.log(import.meta.env.VITE_CURRENT_RUN_MODE)
  if (import.meta.env.VITE_CURRENT_RUN_MODE === "main") {
    return writeDbData(data)
  }
  if (import.meta.env.VITE_CURRENT_RUN_MODE === "work" ) {
    return import('@/preload/index').then(res => {
      const {writeDbData} = res
      writeDbData(data)
    })
  }
  return window.nativeBridge.writeDbData(data)
}