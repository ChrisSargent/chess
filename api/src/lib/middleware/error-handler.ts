/* eslint-disable no-param-reassign */
import middy from "@middy/core";
import { AxiosError } from "axios";
import HttpStatus from "http-status-codes";
import { ErrorResponse } from "../types";

const removeUndefined = (obj: any) =>
  Object.entries(obj).reduce((a, [k, v]) => (v === undefined ? a : { ...a, [k]: v }), {});

// A generic server error
const serverErrResponse: ErrorResponse = {
  source: "graph",
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  title: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
};
const gwTOutErrResponse: ErrorResponse = {
  source: "graph",
  status: HttpStatus.GATEWAY_TIMEOUT,
  title: HttpStatus.getStatusText(HttpStatus.GATEWAY_TIMEOUT),
};

export const errorHandler = (logger: any) => ({
  onError: (handler: middy.HandlerLambda, next: middy.NextFunction) => {
    logger.debug(handler);
    if (!(handler.error instanceof Error)) {
      return next();
    }
    try {
      const error = handler.error as AxiosError;

      // The request was made and the server responded with a status code that falls out of the range of 2xx
      if (error.response) {
        logger.createSubLogger("gateway_error").error(error.response.data);
        handler.response = error.response.data;
        return next();
      }

      // The request was made but no response was received
      if (error.request) {
        const { baseURL, data, headers, method, params } = error.config;
        const logMe = removeUndefined({
          baseURL,
          data,
          headers,
          method,
          params,
        });
        logger.createSubLogger("gateway_timeout").error(logMe);

        handler.response = { error: gwTOutErrResponse };
        return next();
      }
      // Something unknown happened during function invocation that triggered an Error
      logger.createSubLogger("function_error").error(handler.error.message);

      // If response.error has already been set, leave as is
      if (handler.response && handler.response.error) {
        return next();
      }

      handler.response = { error: serverErrResponse };
      return next();
    } catch (err) {
      // Something happened in this function that caused an error
      logger.createSubLogger("caught_error").error(err);

      handler.response = { error: serverErrResponse };
      return next();
    }
  },
});
