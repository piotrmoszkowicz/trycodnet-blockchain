import axios from "axios";

const axiosWrapper = axios.create();

axiosWrapper.defaults.headers.Accept = "application/json";
axiosWrapper.defaults.headers["Content-Type"] = "application/json";
axiosWrapper.defaults.headers["User-Agent"] =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.75 Safari/537.36";

export default axiosWrapper;
