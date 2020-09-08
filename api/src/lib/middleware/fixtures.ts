import createError from "axios/lib/core/createError";

export const config = {
  baseURL: "http://localhost:8081",
  headers: {
    Accept: "application/json, text/plain, */*",
  },
  method: "get",
  params: { objectType: "orderBook", userID: "investor1" },
  url: "/partial",
};

export const request = {
  method: "GET",
  noshow: "remove this field",
  path: "/partial?objectType=orderBook&userID=investor1",
};

export const response = {
  data: {
    error: {
      status: 401,
      title: "User authentication failed: user not found",
    },
  },
  headers: {
    "content-type": "application/problem+json; charset=utf-8",
    "x-content-type-options": "nosniff",
  },
  status: 401,
  statusText: "Unauthorized",
};

export const axios401 = createError(null, config, null, request, response);
export const axiosNoResponse = createError(null, config, null, request, null);
export const unknownErr = new Error("UNKNOWN ERROR");
export const unAuthResp = {
  error: {
    detail: "No identity",
    status: 401,
    title: "Unauthorised",
  },
};
