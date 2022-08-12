import { IsNotEmpty, IsString, MaxLength, IsNumber } from "class-validator";
import ClassFieldsValidator from "./class-fields-validator";

class StubRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  field: string;

  @IsNumber()
  @IsNotEmpty()
  field2: number;

  constructor(data: any) {
    Object.assign(this, data);
  }
}

class StubClassValidator extends ClassFieldsValidator<StubRules> {
  validate(data: any): boolean {
    return super.validate(new StubRules(data));
  }
}

describe("ClassValidatorFields Integration Tests", () => {
  it("should validate for errors", () => {
    const validator = new StubClassValidator();
    expect(validator.validate(null)).toBeFalsy();
    expect(validator.errors).toStrictEqual({
      field: [
        "field should not be empty",
        "field must be a string",
        "field must be shorter than or equal to 255 characters",
      ],
      field2: [
        "field2 should not be empty",
        "field2 must be a number conforming to the specified constraints",
      ],
    });
  });

  it("should validate for success", () => {
    const validator = new StubClassValidator();
    expect(validator.validate({ field: "test", field2: 1 })).toBeTruthy();
    expect(validator.validatedData).toStrictEqual(
      new StubRules({ field: "test", field2: 1 })
    );
  });
});
