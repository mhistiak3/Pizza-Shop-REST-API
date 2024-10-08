import { ValidationError } from "joi";
import { DEBUG_MODE } from "../config";
import CustomErrorHandler from "../services/CustomErrorHandler";

const errorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let data = {
    message: "Internal server error",
    ...(DEBUG_MODE === "true" && { originalError: err.message }),
  };

  // cheking the error is validation error
  if (err instanceof ValidationError) {
    statusCode = 422;
    data.message = err.message;
  }
  
  // cheking the error is Custom Error
  if (err instanceof CustomErrorHandler) {
    statusCode = err.status;
    data.message = err.message;
  }

  return res.status(statusCode).json(data);
};

export default errorHandler;
