import ValidationError from "@seedwork/domain/errors/validation-error";
import { Category } from "./category";

describe("Category Integration tests", () => {
  describe("create", () => {
    it("should throw an error if name is invalid", () => {
      expect(() => new Category({ name: null })).toThrow(
        new ValidationError("name is required")
      );
      expect(() => new Category({ name: "" })).toThrow(
        new ValidationError("name is required")
      );
      expect(() => new Category({ name: 5 as any })).toThrow(
        new ValidationError("name must be a string")
      );
      expect(() => new Category({ name: "t".repeat(256) })).toThrow(
        new ValidationError("name must be less or equal than 255 characters")
      );
    });

    it("should throw an error if description is invalid", () => {
      expect(
        () => new Category({ name: "name", description: 5 as any })
      ).toThrow(new ValidationError("description must be a string"));
    });

    it("should throw an error if is_active is invalid", () => {
      expect(
        () => new Category({ name: "name", is_active: "asd" as any })
      ).toThrow(new ValidationError("is_active must be a boolean"));
    });
  });

  describe("update", () => {
    it("should a invalid category using name property", () => {
      const category = new Category({ name: "Movie" });
      expect(() => category.update(null, null)).toThrow(
        new ValidationError("name is required")
      );

      expect(() => category.update("", null)).toThrow(
        new ValidationError("name is required")
      );

      expect(() => category.update(5 as any, null)).toThrow(
        new ValidationError("name must be a string")
      );

      expect(() => category.update("t".repeat(256), null)).toThrow(
        new ValidationError("name must be less or equal than 255 characters")
      );
    });

    it("should a invalid category using description property", () => {
      const category = new Category({ name: "Movie" });
      expect(() => category.update("Movie", 5 as any)).toThrow(
        new ValidationError("description must be a string")
      );
    });

    it("should a valid category", () => {
      expect.assertions(0);
      const category = new Category({ name: "Movie" });
      category.update("name changed", null);
      category.update("name changed", "some description");
    });
  });
});
