import {getRequest} from "./index";

export const loginFetch = (data:any) => {
  return getRequest(`/user?username=${data.username}`,{})
}