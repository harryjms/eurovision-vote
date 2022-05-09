export default class HTTPError extends Error {
  statusCode: number = 500;
  constructor(message, statusCode?: number) {
    super(message);
    if (statusCode) {
      this.statusCode = statusCode;
    }
  }
}
