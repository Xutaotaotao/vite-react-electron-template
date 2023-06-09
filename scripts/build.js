#!/usr/bin/node
import pkgJson from "../package.json" assert { type: "json" };
import { build } from 'vite'
import { dirname, resolve } from 'path'
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const processArgv = process.argv.splice(2);
const mode = processArgv && processArgv.length > 0 ? processArgv[0] :  "production";
const packagesConfigs = [
  resolve(__dirname, '../vite/main.js'),
  resolve(__dirname, '../vite/preload.js'),
  resolve(__dirname, '../vite/render.js'),
  resolve(__dirname, '../vite/work.js'),
]


// 设置环境变量
process.env.VITE_CURRENT_RUN_MODE = 'render'

// 设置版本号
process.env.VITE_CURRENT_VERSION = pkgJson.version

// 设置mode
process.env.MODE = mode

// 当前运行平台
process.env.VITE_CURRENT_OS = process.platform


const buildByConfig = (configFile) => build({ configFile, mode })

;(async () => {
  try {
    const totalTimeLabel = 'Total bundling time'
    console.time(totalTimeLabel)

    for (const packageConfigPath of packagesConfigs) {
      if(packageConfigPath.includes('main')) {
        process.env.VITE_CURRENT_RUN_MODE = 'main'
      }
      if(packageConfigPath.includes('render')) {
        process.env.VITE_CURRENT_RUN_MODE = 'render'
      }
      if(packageConfigPath.includes('preload')) {
        process.env.VITE_CURRENT_RUN_MODE = 'preload'
      }
      if(packageConfigPath.includes('work')) {
        process.env.VITE_CURRENT_RUN_MODE = 'work'
      }
      const consoleGroupName = `${dirname(packageConfigPath)}/`
      console.group(consoleGroupName)

      const timeLabel = 'Bundling time'
      console.time(timeLabel)
      await buildByConfig(packageConfigPath)

      console.timeEnd(timeLabel)
      console.groupEnd()
      console.log('\n') // Just for pretty print
    }
    console.timeEnd(totalTimeLabel)
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
})()