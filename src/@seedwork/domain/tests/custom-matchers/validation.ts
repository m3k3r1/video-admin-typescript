import ClassFieldsValidator from "@seedwork/domain/validators/class-fields-validator";
import { FieldErrors } from "@seedwork/domain/validators/fields-validator-interface";
import { objectContaining } from "expect";

type Expected = { validator: ClassFieldsValidator<any>; data: any };

expect.extend({
  containsErrorMessages(expected: Expected, received: FieldErrors) {
    const { validator, data } = expected;
    const isValid = validator.validate(data);
    if (isValid) {
      return {
        pass: false,
        message: () => "the data is valid",
      };
    }

    const isMatch = objectContaining(received).asymmetricMatch(
      validator.errors
    );

    return isMatch
      ? {
          pass: true,
          message: () => "",
        }
      : {
          pass: false,
          message: () =>
            `The validation errors not contains ${JSON.stringify(
              received
            )}. Current: ${JSON.stringify(validator.errors)}`,
        };
  },
});
