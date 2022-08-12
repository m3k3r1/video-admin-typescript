import ClassFieldsValidator from "./class-fields-validator";
import * as libClassValidator from "class-validator";

class StubClassValidator extends ClassFieldsValidator<{ field: string }> {}

describe("ClassValidatorFields Unit Tests", () => {
  it("should initialize with empty errors and data", () => {
    const validator = new StubClassValidator();
    expect(validator.errors).toBeNull();
    expect(validator.validatedData).toBeNull();
  });

  it("should validate for errors", () => {
    const spyValidateSync = jest
      .spyOn(libClassValidator, "validateSync")
      .mockReturnValue([
        { property: "field", constraints: { isRequired: "some error" } },
      ]);

    const validator = new StubClassValidator();
    expect(validator.validate({ field: "" })).toBeFalsy();
    expect(spyValidateSync).toHaveBeenCalledWith({ field: "" });
    expect(validator.errors).toStrictEqual({ field: ["some error"] });
    expect(validator.validatedData).toBeNull();
  });

  it("should validate with no errors", () => {
    const spyValidateSync = jest
      .spyOn(libClassValidator, "validateSync")
      .mockReturnValue([]);

    const validator = new StubClassValidator();
    expect(validator.validate({ field: "value" })).toBeTruthy();
    expect(spyValidateSync).toHaveBeenCalledWith({ field: "value" });
    expect(validator.errors).toBeNull();
    expect(validator.validatedData).toStrictEqual({ field: "value" });
  });
});
