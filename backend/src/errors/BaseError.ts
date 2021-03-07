class BaseError extends Error {
  statusCode: number;
  message: string;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }
}

export default BaseError;
