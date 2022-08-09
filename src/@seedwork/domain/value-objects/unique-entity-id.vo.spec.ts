import InvalidUUIDError from "@seedwork/errors/invalid-uuid.error";
import UniqueEntityId from "./unique-entity-id.vo";

const spyValidateMethod = () =>
  jest.spyOn(UniqueEntityId.prototype as any, "validate");

describe("UnitqueEntityId tests", () => {
  it("should throw an error if id is not a valid uuid", () => {
    const spy = spyValidateMethod();
    expect(() => new UniqueEntityId("invalid-uuid")).toThrow(InvalidUUIDError);
    expect(spy).toHaveBeenCalled();
  });

  it("should accept a valid uuid", () => {
    const spy = spyValidateMethod();
    const uuid = "123e4567-e89b-12d3-a456-426655440000";
    const vo = new UniqueEntityId(uuid);
    expect(vo.id).toBe(uuid);
    expect(spy).toHaveBeenCalled();
  });

  it("should create a unique entity id", () => {
    const spy = spyValidateMethod();
    const vo = new UniqueEntityId();
    expect(vo.value).toBeTruthy();
    expect(spy).toHaveBeenCalled();
  });
});
