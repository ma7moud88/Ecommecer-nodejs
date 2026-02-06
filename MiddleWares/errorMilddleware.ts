// error handling
// video 38-nodejss

export const globalError = (err: any, req: any, res: any, next: any) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    sendErrorForDev(err, res);
  } else {
    sendErrorForProd(err, res);
  }
};
// run ==> develop mode
const sendErrorForDev = (err: any, res: any) => {
  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack, // stack === مكان error
  });
};
// run ==> production mode
const sendErrorForProd = (err: any, res: any) => {
  return res.status(err.statusCode).json({
    error: err,
    message: err.message,
  });
};
