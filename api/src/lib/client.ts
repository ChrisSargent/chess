import http from "http";
import https from "https";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export const client = (): AxiosInstance => {
  // TODO: get token dynamically
  const token = "6b17554bb93bbb45580eb85b085e6a78bee348b9d081ed5ec46d";
  const base: AxiosRequestConfig = {
    baseURL: "https://localhost/fmi/data/vLatest/databases/contacts",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    // keepAlive pools and reuses TCP connections, so it's faster
    // HACK: allow self signed certs
    httpAgent: new http.Agent({ keepAlive: true }),
    httpsAgent: new https.Agent({ keepAlive: true, rejectUnauthorized: false }),
    // cap the maximum content length we'll accept to 50MBs, just in case
    maxContentLength: 50 * 1000 * 1000,
    maxRedirects: 10,
    timeout: 60000,
  };
  return axios.create(base);
};
