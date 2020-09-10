import { IncomingHttpHeaders } from "http";
import { Handler } from "aws-lambda";
import { AxiosResponse } from "axios";

export type { AxiosRequestConfig } from "axios";

type GraphQLResolverEvent = {
  typeName: "Mutation" | "Query";
  fieldName: string;
  arguments: {
    input: any;
    recordId: number;
  };
  source: any;
  request: {
    headers: IncomingHttpHeaders;
  };
  prev: any;
};

export type GraphQLResolverHandler = Handler<GraphQLResolverEvent, AxiosResponse>;
