class CustomErrorHandler extends Error {
  constructor(status, msg) {
    super();
    this.status = status;
    this.message = msg;
  }

  static alreadyExist(message) {
    return new CustomErrorHandler(409, message);
  }
  static wrongCredential(message = "email or password is wrong") {
    return new CustomErrorHandler(401, message);
  }
  static unAuthorize(message = "unAuthorize") {
    return new CustomErrorHandler(401, message);
  }
  static notFound(message = "404 Not Found") {
    return new CustomErrorHandler(404, message);
  }
  static serverError(message = "Internal server error") {
    return new CustomErrorHandler(500, message);
  }
}

export default CustomErrorHandler;
