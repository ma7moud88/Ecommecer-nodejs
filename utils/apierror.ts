class ApiError extends Error {
  statusCode: any;
  status: any;
  isOperational: any;
  constructor(message: any, statusCode: any) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fial" : "error";
    this.isOperational = true;
  }
}

export default ApiError;
