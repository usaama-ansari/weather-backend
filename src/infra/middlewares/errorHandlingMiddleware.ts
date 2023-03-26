import { ErrorRequestHandler } from "express";
import {
  ErrorHandler,
  errorFormatter,
  ApplicationError,
} from "@Common/errorUtils";

export const errorHandlingMiddleware: ErrorRequestHandler = async function (
  error,
  req,
  res,
  next
) {
  try {
    const errorHandler = new ErrorHandler(null, null);
    const formattedError = errorFormatter.toUserFormat(error);
    const errorResponse = {
      success: false,
      error: formattedError,
    };
    // sending error response to client
    res.status(formattedError.statusCode).json(errorResponse);
    // handling error reporting and logging etc
    await errorHandler.handleError(error);
    // if not a trusted error then exit process
    if (!errorHandler.isTrustedError(error)) {
      process.exit(1);
    }
  } catch (err) {
    res.status(502).json({ message: "Something went wrong" });
  }
};
