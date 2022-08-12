import { validateSync } from "class-validator";
import {
  FieldErrors,
  FieldsValidatorInterface,
} from "./fields-validator-interface";

export default abstract class ClassFieldsValidator<ValidatedProps>
  implements FieldsValidatorInterface<ValidatedProps>
{
  errors: FieldErrors = null;
  validatedData: ValidatedProps = null;
  validate(data: any): boolean {
    const errors = validateSync(data);
    if (errors.length > 0) {
      this.errors = {};

      for (const error of errors) {
        const field = error.property;
        this.errors[field] = Object.values(error.constraints);
      }
    } else {
      this.validatedData = data;
    }

    return !errors.length;
  }
}
