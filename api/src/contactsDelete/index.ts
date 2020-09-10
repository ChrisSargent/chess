import middy from "@middy/core";
import { HTTPMethod } from "http-method-enum";
import { AxiosRequestConfig, client, defaultMw, GraphQLResolverHandler } from "../lib";
import { contactsGet } from "../contactsGet";

export const contactsDelete: GraphQLResolverHandler = async (event, context, callback) => {
  const request: AxiosRequestConfig = {
    method: HTTPMethod.DELETE,
    url: `/layouts/contactdetails/records/${event.arguments.recordId}`,
  };
  const axiosClient = await client();
  await axiosClient.request(request);
  return contactsGet(event, context, callback);
};

export const handler = middy(contactsDelete).use(defaultMw);
