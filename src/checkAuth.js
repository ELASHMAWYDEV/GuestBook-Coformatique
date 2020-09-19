import axios from "axios";
import { API } from "./config/config";

/*
*
*   THIS FUNCTION IS USED TO CHECK IF USER HAS LOGGED IN OR NOT
*   USE IT IN EVERY PRIVATE ROUTE OR TO DISPLAY ANY PRIAVTE DATA
*
*/


const checkAuth = async () => {
  let response = await axios.post(`${API}/auth/check`, {}, { withCredentials: true });
  let data = await response.data;

  if (data.success) return await true;
  else return await false;
}

export default checkAuth;