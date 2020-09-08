import { Logger } from "lambda-logger-node";

export const logger = Logger({
  minimumLogLevel: "INFO",
  useGlobalErrorHandler: false,
});
