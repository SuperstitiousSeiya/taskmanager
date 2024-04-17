import { DataResponseInterface } from "../models/tasks/task.types";

const DEFAULT_STATUS = 200;
const DEFAULT_MESSAGE = "";
const DEFAULT_ERROR = false;

export function generateResponseData(
  status: number = DEFAULT_STATUS,
  data: any,
  message: string = DEFAULT_MESSAGE,
  error: boolean = DEFAULT_ERROR
): DataResponseInterface {
  return {
    status,
    data,
    message,
    error,
  };
}

export function handleError(error: string) {
  return generateResponseData(500, [], error || "Internal server error" , true);
}
