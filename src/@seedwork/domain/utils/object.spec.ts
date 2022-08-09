import { deepFreeze } from "./object";

describe("object utils test", () => {
  it("should not freeze a scalar value", () => {
    const str = deepFreeze("a");
    expect(typeof str).toBe("string");

    const boolean = deepFreeze(true);
    expect(typeof boolean).toBe("boolean");

    const num = deepFreeze(5);
    expect(typeof num).toBe("number");
  });
  it("should be immutable", () => {
    const obj = deepFreeze({
      prop1: "a",
      deep: { prop2: "b", prop3: new Date() },
    });

    expect(() => ((obj as any).prop1 = "aaa")).toThrow(
      "Cannot assign to read only property 'prop1' of object '#<Object>"
    );

    expect(() => ((obj as any).deep.prop2 = "aaa")).toThrow(
      "Cannot assign to read only property 'prop2' of object '#<Object>"
    );
  });
});
