/// <reference types="vite/client" />
declare global {
  interface Window {
    nativeBridge: any;
    electronMessagePort:any;
  }
}

declare module 'ffi-napi'

export {};