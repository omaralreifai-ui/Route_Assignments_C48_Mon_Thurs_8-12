export class AppError extends Error {
  statusCode;
  inoperational;

  constructor(message, statusCode, inoperational = true) {
    super(message);
    this.inoperational = inoperational;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}
const error = new AppError('message',400,  );
