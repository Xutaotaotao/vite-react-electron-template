import {baseRequest} from "./index";

export const testFetch = () => {
  return baseRequest('/s',{})
}