import { IncomingHttpHeaders } from "http";
import { Handler } from "aws-lambda";
import { AxiosResponse } from "axios";

export type { AxiosRequestConfig } from "axios";

export type ErrorResponse = {
  code?: string;
  detail?: string;
  status: number;
  source: "graph";
  title: string;
};

export type APIResponse = {
  data?: string;
  error?: ErrorResponse;
};

type GraphQLResolverEvent = {
  typeName: "Mutation" | "Query";
  fieldName: string;
  arguments: {
    input: any;
  };
  source: any;
  request: {
    headers: IncomingHttpHeaders;
  };
  prev: any;
};

export type GraphQLResolverHandler = Handler<GraphQLResolverEvent, AxiosResponse>;
