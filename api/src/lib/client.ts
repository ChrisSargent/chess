import http from "http";
import https from "https";
import { HTTPMethod } from "http-method-enum";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const createConfig = (Authorization: string): AxiosRequestConfig => ({
  baseURL: "https://localhost/fmi/data/vLatest/databases/contacts",
  headers: {
    Authorization,
    "Content-Type": "application/json",
  },
  // keepAlive pools and reuses TCP connections, so it's faster
  httpAgent: new http.Agent({ keepAlive: true }),
  // HACK: allow self signed certs
  httpsAgent: new https.Agent({ keepAlive: true, rejectUnauthorized: false }),
  // cap the maximum content length we'll accept to 50MBs, just in case
  maxContentLength: 50 * 1000 * 1000,
  maxRedirects: 10,
  timeout: 60000,
});

const getSessionToken = async (): Promise<string> => {
  const config: AxiosRequestConfig = {
    ...createConfig("Basic RGF0YUFQSTphZG1pbg=="),
    method: HTTPMethod.POST,
    url: "/sessions",
  };
  const response = await axios(config);
  return response?.data?.response?.token;
};

export const client = async (): Promise<AxiosInstance> => {
  const token = await getSessionToken();
  const config = createConfig(`Bearer ${token}`);
  return axios.create(config);
};
