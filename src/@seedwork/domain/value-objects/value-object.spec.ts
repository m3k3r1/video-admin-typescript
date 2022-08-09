import ValueObject from "./value-object";

class StubValueObject extends ValueObject {}

describe("ValueObject Unit Tests", () => {
  it("should set value", () => {
    let vo = new StubValueObject("test");
    expect(vo.value).toBe("test");

    vo = new StubValueObject({ prop: "test" });
    expect(vo.value).toStrictEqual({ prop: "test" });
  });

  it("should convert to string", () => {
    const date = new Date();
    const arrange = [
      { value: "test", expected: "test" },
      { value: { prop: "test" }, expected: '{"prop":"test"}' },
      { value: true, expected: "true" },
      { value: 5, expected: "5" },
      { value: date, expected: date.toString() },
    ];

    arrange.forEach((data) => {
      const vo = new StubValueObject(data.value);
      expect(vo.toString()).toBe(data.expected);
    });
  });

  it("should be a immutable object", () => {
    const obj = {
      prop1: "value1",
      deep: { prop2: "value2", prop3: new Date() },
    };
    const vo = new StubValueObject(obj);

    expect(() => {
      (vo as any).value.prop1 = "test";
    }).toThrow(
      "Cannot assign to read only property 'prop1' of object '#<Object>'"
    );

    expect(() => {
      (vo as any).value.deep.prop2 = "test";
    }).toThrow(
      "Cannot assign to read only property 'prop2' of object '#<Object>'"
    );

    expect(vo.value.deep.prop3).toBeInstanceOf(Date);
  });
});
