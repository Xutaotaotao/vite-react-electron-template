import koffi from 'koffi'
import path from 'path'

const resolveBuildResourcesPath = (pathData:string) => {
  return import.meta.env.MODE === "dev" ? path.resolve(
    __dirname,
    pathData
  ) : path.resolve(
    __dirname,
    `../${pathData}`
  )
}

const rsNative = require(resolveBuildResourcesPath('../../buildResources/rs-native.darwin-x64.node'))

const sumLib = koffi.load(resolveBuildResourcesPath('../../buildResources/sum.dylib'))

const nativeSum = sumLib.stdcall('sum','int',['int','int'])

export const callNativeSumByDylib = (a:number,b:number) => {
  return nativeSum(a,b)
}

export const callNativeSumByRustnode = (a:number,b:number) => {
  return rsNative.sum(a,b)
}

export const callNativeSubtractionByRustnode  = (a:number,b:number) => {
  return rsNative.subtraction(a,b)
}