import middy from "@middy/core";
import { HTTPMethod } from "http-method-enum";
import { AxiosRequestConfig, client, defaultMw, GraphQLResolverHandler } from "../lib";

export const contactsGet: GraphQLResolverHandler = async () => {
  const request: AxiosRequestConfig = {
    method: HTTPMethod.GET,
    url: "/layouts/contactdetails/records",
  };
  const response = await client().request(request);
  return response.data;
};

export const handler = middy(contactsGet).use(defaultMw);
