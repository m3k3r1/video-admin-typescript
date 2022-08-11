export default class ValidationError extends Error {
  constructor(message?: string) {
    super(message || "ValidationError");
    this.name = "ValidationError";
  }
}
