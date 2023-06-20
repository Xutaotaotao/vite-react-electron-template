import {getRequest, postRequest} from "./index";

export const loginFetch = (data:any) => {
  return getRequest(`/api/user?username=${data.username}`,{})
}

export const unauthorizedFetch = () => {
  return postRequest('/api/unauthorized',{})
}