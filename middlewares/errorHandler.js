//here we are creating a middleware for error handling

import joi from "joi";
import { DEBUG_MODE } from "../config/index.js";
import CustomErrorHandler from "../helpers/CustomErrorHandler.js";

const errorHandler = function (err, req, res, next) {
  console.log(err);

  let statusCode = 500;
  let status = false;
  

  let data = {
    status: false,
    message: " Internal server error ",
    data: null,
    ...(DEBUG_MODE === "true" && { originalError: err.message }),
  };

  if(err?.config?.params?.route == "otp"){

    data = {
      status: false,
      message: " Phone Number is Not valid ",
      data: null,
      ...(DEBUG_MODE === "true" && { originalError: err.message }),
    };
  }

  //any Validation error
  if (err instanceof joi.ValidationError) {
    statusCode = 420;
    data = {
      message: err.message,
      status: status,
      data: null,
    };
  }

  //if want to send any custom error message
  if (err instanceof CustomErrorHandler) {
    statusCode = err.status;
    data = {
      message: err.message,
      status: status,
      data: null,
    };
  }

  return res.status(statusCode).json(data);
};

export default errorHandler;
