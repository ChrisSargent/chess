import middy from "@middy/core";
import { HTTPMethod } from "http-method-enum";
import { AxiosRequestConfig, client, defaultMw, GraphQLResolverHandler, logger } from "../lib";

const chessinvoke: GraphQLResolverHandler = async (event) => {
  let method = HTTPMethod.GET;
  const [url, objectType] = event.fieldName.split(/(?=[A-Z])/);
  console.log(objectType);
  const data = {
    fieldData: event.arguments.input || {},
  };

  // Set the method to POST if this is a mutation
  if (event.typeName === "Mutation") {
    method = HTTPMethod.POST;
  }

  const request: AxiosRequestConfig = {
    data,
    method,
    url,
  };
  const response = await client().request(request);
  return response.data.data;
};

export const handler = logger.handler(middy(chessinvoke).use(defaultMw));
