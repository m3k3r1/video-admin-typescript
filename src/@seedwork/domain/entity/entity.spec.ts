import UniqueEntityId from "../value-objects/unique-entity-id.vo";
import Entity from "./entity";
import { validate as uuidValidate } from "uuid";

class StubEntity extends Entity<{ props1: string; prop2: string }> {}

describe("Entity Unit tests", () => {
  it("should set props and id", () => {
    const arrange = { props1: "props1", prop2: "prop2" };
    const entity = new StubEntity(arrange);

    expect(entity.props).toStrictEqual(arrange);
    expect(entity.unityEntityId).toBeInstanceOf(UniqueEntityId);
    expect(entity.id).toBeDefined();
    expect(uuidValidate(entity.id)).toBeTruthy();
  });

  it("should accept a valid uuid", () => {
    const arrange = { props1: "props1", prop2: "prop2" };
    const uniqueEntityId = new UniqueEntityId();
    const entity = new StubEntity(arrange, uniqueEntityId);

    expect(entity.props).toStrictEqual(arrange);
    expect(entity.unityEntityId).toBeInstanceOf(UniqueEntityId);
    expect(entity.id).toBe(uniqueEntityId.value);
  });

  it("should convert to json", () => {
    const arrange = { props1: "props1", prop2: "prop2" };
    const entity = new StubEntity(arrange);

    expect(entity.toJSON()).toStrictEqual({
      id: entity.id,
      ...arrange,
    });
  });
});
