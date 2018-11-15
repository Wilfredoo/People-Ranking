//need to change to
//import axios from './axios',
import axios from "axios";

var instance = axios.create({
  xsrfCookieName: "mytoken",
  xsrfHeaderName: "csrf-token"
});

export default instance;
