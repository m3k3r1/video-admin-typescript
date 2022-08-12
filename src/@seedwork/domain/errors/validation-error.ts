import { FieldErrors } from "../validators/fields-validator-interface";

export class ValidationError extends Error {
  constructor(message?: string) {
    super(message || "ValidationError");
    this.name = "ValidationError";
  }
}

export class EntityValidationError extends ValidationError {
  constructor(public error: FieldErrors) {
    super("EntityValidationError");
    this.name = "EntityValidationError";
  }
}
