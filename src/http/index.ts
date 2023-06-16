import axios from "axios";
import baseUrl from "./baseUrl";

interface BaseParams {
  url: string;
  data: any;
  contentType?: string;
}

interface HttpHeader {
  "content-type": string;
  Authorization?: string;
}

interface HttpOption {
  url: string;
  data: any;
  method: string;
  header: HttpHeader;
}

const responseHandle = () => {

}

axios.interceptors.response.use()

const  baseOptions = (params: BaseParams, method = "post") => {
    let { url, data } = params;
    let contentType = "application/json";
    contentType = params.contentType || contentType;
    const option: HttpOption = {
      url: baseUrl + url,
      data: data,
      method: method,
      header: {
        "content-type": contentType,
        Authorization: "",
      },
    };
    return option;
  }

const  netRequest = (option: HttpOption) => {
    return new Promise(async (resolve,reject) => {
      const { net } = require('electron')
      const request = net.request(option)
      let Data = {}
      request.on('response', (response) => {
        console.log(`STATUS: ${response.statusCode}`)
        console.log(`HEADERS: ${JSON.stringify(response.headers)}`)
        response.on('data', (chunk) => {
          console.log(`BODY: ${chunk}`)
          Data = chunk
        })
        response.on('end', () => {
          console.log('No more data in response.')
          resolve(Data)
        })
      })
      request.end()
    })
  }

  const axiosRequest = (option: HttpOption) => {
    return axios({
      method: option.method,
      url: option.url,
      data: option.data
    });
  }

  export const baseRequest = (url: string, data: any, method = "post") => {
    const option = baseOptions({
      url,
      data,
    },method);
    if (import.meta.env.VITE_CURRENT_RUN_MODE === "main") {
      return netRequest(option);
    } else {
      return axiosRequest(option);
    }
  }

  export const postRequest = (url: string, data: any) => {
    return baseRequest(url, data, "post")
  }

  export const getRequest = (url: string, data: any) => {
    return baseRequest(url, data, "get")
  }
