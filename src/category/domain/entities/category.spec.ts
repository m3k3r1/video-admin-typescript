import UniqueEntityId from "@seedwork/domain/value-objects/unique-entity-id.vo";
import { omit } from "lodash";
import { Category, CategoryProps } from "./category";

describe("Category tests", () => {
  test("constructor of category", () => {
    const props = {
      name: "test",
      description: "description",
      is_active: true,
      created_at: new Date(),
    };

    const category = new Category(props);

    expect(category.props).toStrictEqual(props);
  });
  test("constructor of category - optional properties", () => {
    let category = new Category({
      name: "test",
    });

    let props = omit(category.props, "created_at");
    expect(props).toStrictEqual({
      name: "test",
      description: null,
      is_active: true,
    });

    const props1 = {
      name: "test",
      description: "description",
      is_active: false,
      created_at: new Date(),
    };

    category = new Category(props1);

    expect(category.props).toStrictEqual(props1);

    const props2 = {
      name: "test",
      description: "description",
    };
    category = new Category(props2);

    expect(category.props).toMatchObject(props2);

    const props3 = {
      name: "test",
      is_active: true,
    };
    category = new Category(props3);
    expect(category.props).toMatchObject(props3);

    const props4 = {
      name: "test",
      created_at: new Date(),
    };
    category = new Category(props4);
    expect(category.props).toMatchObject(props4);
  });

  test("id property", () => {
    type CategoryData = { props: CategoryProps; id?: UniqueEntityId };

    const data: CategoryData[] = [
      { props: { name: "Movie" } },
      { props: { name: "Movie" }, id: null },
      { props: { name: "Movie" }, id: undefined },
      { props: { name: "Movie" }, id: new UniqueEntityId() },
    ];

    data.forEach((i) => {
      const category = new Category(i.props, i.id as any);
      expect(category.id).not.toBeNull();
    });
  });

  test("getter and setter of prop name", () => {
    const props = {
      name: "test",
      description: "description",
      is_active: true,
      created_at: new Date(),
    };

    const category = new Category(props);

    expect(category.name).toBe(props.name);
  });

  test("getter and setter of prop description", () => {
    const props = {
      name: "test",
      description: "description",
      is_active: true,
      created_at: new Date(),
    };

    const category = new Category(props);

    expect(category.description).toBe(props.description);
  });

  test("getter and setter of prop created_at", () => {
    const props = {
      name: "test",
      description: "description",
      is_active: true,
      created_at: new Date(),
    };

    const category = new Category(props);

    expect(category.created_at).toBe(props.created_at);
  });
});
