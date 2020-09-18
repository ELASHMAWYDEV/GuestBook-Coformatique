import axios from "axios";
import { API } from "./config/config";

/*
*
*   THIS FUNCTION IS USED TO CHECK IF USER HAS LOGGED IN OR NOT
*   USE IT IN EVERY PRIVATE ROUTE OR TO DISPLAY ANY PRIAVTE DATA
*
*/


const checkAuth = () => {
  let response = axios.post(`${API}/auth/check`, {}, { withCredentials: true });
  let data = response.data;

  console.log(data);
  if (data.success) return true;
  else return false;
}

export default checkAuth;