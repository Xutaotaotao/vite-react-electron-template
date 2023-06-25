import { LowSync, JSONFileSync } from "lowdb";
let dbInstance: any = null;

export interface WriteDbDataParams {
  key: string;
  value: any;
}

// 初始化数据库
export const initDb = () => {
  const {app} = require('electron')
  const { join } = require("path");
  return new Promise(async (resolve) => {
    const file = join(app.getAppPath(), "db.json");
    const adapter = new JSONFileSync(file);
    dbInstance = new LowSync(adapter);
    await dbInstance.read();
    if (dbInstance.data && dbInstance.data["vite-react-electron-template"]) {
      resolve(true)
    } else {
      dbInstance.data = {
        "vite-react-electron-template": "yyds",
      };
      await dbInstance.write();
      resolve(true)
    }
  });
};

// 写数据
export const writeDbData = async (data: WriteDbDataParams) => {
  if (dbInstance) {
    try {
      await dbInstance.read();
      dbInstance.data[data.key] = data.value;
      console.log(data)
      await dbInstance.write();
    } catch (err) {
      console.error(err);
    }
  }
};

// 读数据
export const readDbData = (key: string) => {
  return new Promise(async (resolve) => {
    if (dbInstance) {
      try {
        await dbInstance.read();
        const res = dbInstance.data[key];
        resolve(res || "");
      } catch {
        resolve("");
      }
    } else {
      resolve("");
    }
  });
};


