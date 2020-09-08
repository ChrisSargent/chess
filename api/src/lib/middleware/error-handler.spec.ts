import middy from "@middy/core";
import { AxiosError } from "axios";
import { errorHandler } from "./error-handler";
import * as fixtures from "./fixtures";

describe("Error Handling Middleware", () => {
  const defHandler: middy.HandlerLambda = {
    callback: jest.fn(),
    context: {
      awsRequestId: "awsIdxxx",
      callbackWaitsForEmptyEventLoop: true,
      done: jest.fn(),
      fail: jest.fn(),
      functionName: "TestFn",
      functionVersion: "1.0",
      getRemainingTimeInMillis: jest.fn(),
      invokedFunctionArn: "arnxxx",
      logGroupName: "lgnxxx",
      logStreamName: "lsnxxx",
      memoryLimitInMB: "128",
      succeed: jest.fn(),
    },
    error: {
      message: "",
      name: "",
    },
    event: {},
    response: "Original Response",
  };

  const next = jest.fn();

  const sublogger = {
    createSubLogger: jest.fn(),
    debug: jest.fn(),
    error: jest.fn(),
  };

  const logger = {
    createSubLogger: jest.fn(() => sublogger),
    debug: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Doesn't alter the function result if there is no error", () => {
    const handler: middy.HandlerLambda = { ...defHandler };
    errorHandler(logger).onError(handler, next);

    expect(handler.response).toMatchSnapshot();
    expect(logger.createSubLogger).toHaveBeenCalledTimes(0);
    expect(sublogger.error).toHaveBeenCalledTimes(0);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it("Returns the error response data from a completed network call", () => {
    const handler: middy.HandlerLambda = { ...defHandler, error: fixtures.axios401 };
    errorHandler(logger).onError(handler, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(handler.response).toMatchSnapshot();
    expect(logger.createSubLogger).toHaveBeenCalledTimes(1);
    expect(logger.createSubLogger).toHaveBeenCalledWith("gateway_error");

    const error = handler.error as AxiosError;
    expect(sublogger.error).toHaveBeenCalledWith(error.response!.data);
  });

  it("Returns gateway timeout message from an uncomplete network call", () => {
    const handler: middy.HandlerLambda = { ...defHandler, error: fixtures.axiosNoResponse };
    errorHandler(logger).onError(handler, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(handler.response).toMatchSnapshot();
    expect(logger.createSubLogger).toHaveBeenCalledTimes(1);
    expect(logger.createSubLogger).toHaveBeenCalledWith("gateway_timeout");

    const error = handler.error as AxiosError;
    const { baseURL, data, headers, method, params } = error.config;
    expect(sublogger.error).toHaveBeenCalledWith({
      baseURL,
      data,
      headers,
      method,
      params,
    });
  });

  it("Returns generic error message if there's an unknown code error", () => {
    const handler: middy.HandlerLambda = { ...defHandler, error: fixtures.unknownErr };
    errorHandler(logger).onError(handler, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(handler.response).toMatchSnapshot();
    expect(logger.createSubLogger).toHaveBeenCalledTimes(1);
    expect(logger.createSubLogger).toHaveBeenCalledWith("function_error");
    expect(sublogger.error).toHaveBeenCalledWith(fixtures.unknownErr.message);
  });

  it("Returns response as is, if included", () => {
    const handler: middy.HandlerLambda = {
      ...defHandler,
      error: fixtures.unknownErr,
      response: fixtures.unAuthResp,
    };
    errorHandler(logger).onError(handler, next);

    expect(handler.response).toMatchSnapshot();
    expect(next).toHaveBeenCalledTimes(1);
    expect(logger.createSubLogger).toHaveBeenCalledTimes(1);
    expect(logger.createSubLogger).toHaveBeenCalledWith("function_error");
    expect(sublogger.error).toHaveBeenCalledWith(fixtures.unknownErr.message);
  });

  it("Returns response in case of an error inside the error handler - the catch", () => {
    // Cause the try/catch in the function to throw an error
    const next2 = jest.fn(() => {
      throw new Error("Shoud be in Catch");
    });
    const handler: middy.HandlerLambda = {
      ...defHandler,
      error: fixtures.unknownErr,
    };

    // Ensures the assertions in the try/catch to ensure we're hitting it
    expect.hasAssertions();
    try {
      errorHandler(logger).onError(handler, next2);
    } catch (error) {
      expect(handler.response).toMatchSnapshot();
      // Will be called twice because of the way we're causing the error
      expect(next2).toHaveBeenCalledTimes(2);
      expect(logger.createSubLogger).toHaveBeenCalledTimes(2);
      expect(logger.createSubLogger).toHaveBeenCalledWith("caught_error");
      expect(sublogger.error).toHaveBeenCalledWith(fixtures.unknownErr.message);
    }
  });
});
