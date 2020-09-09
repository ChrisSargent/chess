import middy from "@middy/core";
import { HTTPMethod } from "http-method-enum";
import { AxiosRequestConfig, client, defaultMw, GraphQLResolverHandler } from "../lib";
import { contactsGet } from "../contactsGet";

const contactsCreate: GraphQLResolverHandler = async (event, context, callback) => {
  const request: AxiosRequestConfig = {
    data: event.arguments.input,
    method: HTTPMethod.POST,
    url: "/layouts/contactdetails/records",
  };
  await client().request(request);
  return contactsGet(event, context, callback);
};

export const handler = middy(contactsCreate).use(defaultMw);
