import { ipcRenderer } from "electron"


export const initWork = () => {
  console.log('initWork')
}


ipcRenderer.on('msgFormRender',(event:any,msg:any) => {
  console.log('msgFormRender:',msg)
})

ipcRenderer.on('port', e => {
  const electronMessagePort = e.ports[0]
  electronMessagePort.onmessage = (msg:any) => {
    console.log('window.electronMessagePort.onmessage work:',msg.data)
  }
})


initWork()