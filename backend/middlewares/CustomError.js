class CustomError extends Error {
  constructor(custom_message, code) {
    super(custom_message);
    this.name = this.constructor.name;
    this.error_code = code;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = CustomError;
