import doNotWaitForEmptyEventLoop from "@middy/do-not-wait-for-empty-event-loop";
import httpHeaderNormalizer from "@middy/http-header-normalizer";
import { errorHandler } from "./middleware/error-handler";
import { logger } from "./logger";

export const defaultMw = [
  doNotWaitForEmptyEventLoop(),
  httpHeaderNormalizer(),
  errorHandler(logger),
];
