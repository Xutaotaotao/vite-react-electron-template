import axios from "axios";
import baseUrl from "./baseUrl";
import { gloabReadDbData, gloabWriteDbData } from "@/lowdb";
// import { mainWindow } from "@/main";

interface BaseParams {
  url: string;
  data: any;
  contentType?: string;
}

interface HttpOption {
  url: string;
  data: any;
  method: string;
  headers: any;
}

const loginOutAction = () => {
  if (import.meta.env.VITE_CURRENT_RUN_MODE === "main") {
    import('@/main').then(res=>{ 
      const {mainWindow} = res
      mainWindow.webContents.send("login-out", true);
    })
  } else {
    window.location.hash = "/login";
  }
  gloabWriteDbData({
    key: "user",
    value: "",
  });
};

const responseErrorHandle = (error: any) => {
  console.log(error, "eeeeeeeeeee");
  if (error.response) {
    const { status } = error.response;
    if (status === 401) {
      loginOutAction();
    }
  }
};

axios.interceptors.response.use();

const baseOptions = async (params: BaseParams, method = "post") => {
  const userData = await gloabReadDbData("user");
  const Authorization = userData ? `Bearer ${userData.token}` : "";
  let { url, data } = params;
  let contentType = "application/json";
  contentType = params.contentType || contentType;
  const option: HttpOption = {
    url: baseUrl + url,
    data: data,
    method: method,
    headers: {
      "content-type": contentType,
      Authorization,
    },
  };
  return option;
};

const netRequest = (option: HttpOption) => {
  return new Promise(async (resolve, reject) => {
    const { net } = require("electron");
    const request = net.request(option);
    let Data = {};
    request.on("response", (response) => {
      console.log(`STATUS: ${response.statusCode}`);
      console.log(`HEADERS: ${JSON.stringify(response.headers)}`);
      response.on("data", (chunk) => {
        console.log(`BODY: ${chunk}`);
        Data = chunk;
      });
      response.on("end", () => {
        console.log("No more data in response.");
        if (response.statusCode !== 200) {
          reject({
            response: {
              status: response.statusCode,
              data: Data,
            },
          });
        }
        resolve(Data);
      });
    });
    request.end();
  });
};

const axiosRequest = (option: HttpOption) => {
  return axios(option);
};

export const baseRequest = (url: string, data: any, method = "post") => {
  return new Promise(async (resolve, reject) => {
    const option = await baseOptions(
      {
        url,
        data,
      },
      method
    );
    if (import.meta.env.VITE_CURRENT_RUN_MODE === "main") {
      netRequest(option)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          responseErrorHandle(err);
          reject(err);
        });
    } else {
      axiosRequest(option)
        .then((res) => {
          console.log(res);
          resolve(res);
        })
        .catch((err) => {
          console.log(err);
          responseErrorHandle(err);
          reject(err);
        });
    }
  });
};

export const postRequest = (url: string, data = {}) => {
  return baseRequest(url, data, "post");
};

export const getRequest = (url: string, data = {}) => {
  return baseRequest(url, data, "get");
};
