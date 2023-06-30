module.exports = class ValidationError extends Error {
  constructor(message = 'Validation Error', statusCode = 422) {
    super(message)
    this.statusCode = statusCode;
  }
};
