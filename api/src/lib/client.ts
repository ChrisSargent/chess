import http from "http";
import https from "https";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export const client = (basicAuth?: string): AxiosInstance => {
  const base: AxiosRequestConfig = {
    baseURL: "https://localhost:3000/fmi/data/vLatest/databases/chess",
    // keepAlive pools and reuses TCP connections, so it's faster
    httpAgent: new http.Agent({ keepAlive: true }),
    httpsAgent: new https.Agent({ keepAlive: true }),
    // cap the maximum content length we'll accept to 50MBs, just in case
    maxContentLength: 50 * 1000 * 1000,
    maxRedirects: 10,
    timeout: 60000,
  };
  if (basicAuth) {
    base.headers = {
      Authorization: basicAuth,
    };
  }
  return axios.create(base);
};
