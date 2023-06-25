module.exports = class ValidationError extends Error {
  constructor(message = 'Validation Error', statusCode = 422, innerError = null) {
    super(message)
    if (innerError && innerError.stack) {
      super.stack = innerError.stack;
    }
    this.statusCode = statusCode;
  }
};
