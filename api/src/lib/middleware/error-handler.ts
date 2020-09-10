/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-param-reassign */
import middy from "@middy/core";
import { AxiosError } from "axios";
import { GATEWAY_TIMEOUT, getReasonPhrase, INTERNAL_SERVER_ERROR } from "http-status-codes";
import { LambdaLog } from "lambda-log";

const removeUndefined = (obj: Record<string, any>) =>
  Object.entries(obj).reduce((a, [k, v]) => (v === undefined ? a : { ...a, [k]: v }), {});

// A generic server error
const serverErrResponse = {
  code: INTERNAL_SERVER_ERROR,
  message: getReasonPhrase(INTERNAL_SERVER_ERROR),
};
// A gateway timeout error
const gwTOutErrResponse = {
  code: GATEWAY_TIMEOUT,
  message: getReasonPhrase(GATEWAY_TIMEOUT),
};

export const errorHandler: middy.Middleware<LambdaLog> = (logger) => ({
  onError: (handler, next) => {
    if (!logger || !(handler.error instanceof Error)) {
      return next();
    }

    // HACK - logger.error not printing to console in mock mode
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      logger.error = logger.info;
    }

    try {
      const { context, event } = handler;
      const error = handler.error as AxiosError;
      const { baseURL, data, headers, method, params } = error.config;
      const axiosRequest = removeUndefined({
        baseURL,
        data,
        headers,
        method,
        params,
      });
      logger.options.meta = { axiosRequest, context, event };

      // The request was made and the server responded with a status code that falls out of the range of 2xx
      if (error.response) {
        const { data: respData, status, statusText } = error.response;
        const response = {
          ...respData,
          status,
          statusText,
        };
        logger.error("gateway_error", { response });
        handler.response = response;
        return next();
      }

      // The request was made but no response was received
      if (error.request) {
        logger.error("gateway_timeout");
        handler.response = { messages: [gwTOutErrResponse] };
        return next();
      }

      // Something unknown happened during function invocation that triggered an Error
      logger.error("function_error", { error: handler.error.message });
      // If response.error has not already been set, set to generic error
      if (!handler.response?.error) {
        handler.response = { messages: [serverErrResponse] };
      }
      return next();
    } catch (error) {
      // Something happened in this function that caused an error
      logger.error("caught_error", { error });
      handler.response = { messages: [serverErrResponse] };
      return next();
    }
  },
});
