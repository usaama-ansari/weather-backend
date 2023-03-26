import { ApplicationError } from "./ApplicationError";
import { IS_DEV } from "@Common/config";


const toUserFormat = (error: unknown): Record<string, any> => {
  const format = (
    message = "Some unexpected error occured",
    statusCode = 500,
  ) => {
    const obj: Record<string, any> = {
      statusCode,
      message,
    };

    if (IS_DEV && error instanceof Error) {
      obj.stack = error.stack;
    }

    return obj;
  };

  if (error instanceof ApplicationError) {
    return format(error.message, error.errorCode);
  } 
    return format();
  
};

const toLoggingFormat = (error: unknown): Record<string, any> => ({});

const toReportingFormat = (error: unknown): Record<string, any> => ({});

export const errorFormatter = {
  toUserFormat,
  toLoggingFormat,
  toReportingFormat,
};
