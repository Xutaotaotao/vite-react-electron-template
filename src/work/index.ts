import { unauthorizedFetch } from "@/http/service"
import { gloabWriteDbData } from "@/lowdb"
import { ipcRenderer } from "electron"


export const initWork = () => {
  console.log('initWork')
  setTimeout(() => {
    gloabWriteDbData({
      key: 'work',
      value: 'workDatatest1111'
    })
  },5000)
  
}


ipcRenderer.on('msgFormRender',(event:any,msg:any) => {
  console.log('msgFormRender:',msg)
  if (msg === 'unauthorizedFetch') {
    unauthorizedFetch()
  }
})

ipcRenderer.on('port', e => {
  const electronMessagePort = e.ports[0]
  electronMessagePort.onmessage = (msg:any) => {
    console.log('window.electronMessagePort.onmessage work:',msg.data)
  }
})


initWork()