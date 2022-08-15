import Entity from "../entity/entity";
import NotFoundError from "../errors/not-found-error";
import UniqueEntityId from "../value-objects/unique-entity-id.vo";
import { InMemoryRepository } from "./in-memory.repository";

type StubEntityProps = {
  name: string;
  price: number;
};

class StubEntity extends Entity<StubEntityProps> {}

class StubInMemoryRepository extends InMemoryRepository<StubEntity> {}

describe("InMemoryRepository", () => {
  let repository: StubInMemoryRepository;

  beforeEach(() => {
    repository = new StubInMemoryRepository();
  });

  it("should insert an entity", async () => {
    const entity = new StubEntity({ name: "test", price: 1 });
    await repository.insert(entity);
    expect(entity.toJSON()).toStrictEqual(repository.items[0].toJSON());
  });

  it("should throw error when entity not found", async () => {
    expect(repository.findById("test")).rejects.toThrow(
      new NotFoundError("Entity with id: test not found")
    );

    const id = new UniqueEntityId();
    expect(repository.findById(id)).rejects.toThrow(
      new NotFoundError(`Entity with id: ${id} not found`)
    );
  });

  it("should find and entity by id", async () => {
    const entity = new StubEntity({ name: "test", price: 1 });
    await repository.insert(entity);
    let foundEntity = await repository.findById(entity.id);
    expect(foundEntity.toJSON()).toStrictEqual(entity.toJSON());

    foundEntity = await repository.findById(entity.uniqueEntityId);
    expect(foundEntity.toJSON()).toStrictEqual(entity.toJSON());
  });

  it("should find all entities", async () => {
    const entity = new StubEntity({ name: "test", price: 1 });
    await repository.insert(entity);
    const foundEntities = await repository.findAll();
    expect(foundEntities.length).toBe(1);
    expect(foundEntities).toStrictEqual([entity]);
  });

  it("should throw error when entity not found on update", async () => {
    const entity = new StubEntity({ name: "name value", price: 5 });
    expect(repository.update(entity)).rejects.toThrow(
      new NotFoundError(`Entity with id: ${entity.id} not found`)
    );
  });

  it("should update an entity", async () => {
    const entity = new StubEntity({ name: "name value", price: 5 });
    await repository.insert(entity);

    const entityUpdated = new StubEntity(
      { name: "updated", price: 1 },
      entity.uniqueEntityId
    );
    await repository.update(entityUpdated);
    expect(entityUpdated.toJSON()).toStrictEqual(repository.items[0].toJSON());
  });

  it("should throws error on delete when entity not found", () => {
    expect(repository.delete("fake id")).rejects.toThrow(
      new NotFoundError("Entity with id: fake id not found")
    );

    expect(
      repository.delete(
        new UniqueEntityId("9366b7dc-2d71-4799-b91c-c64adb205104")
      )
    ).rejects.toThrow(
      new NotFoundError(
        `Entity with id: 9366b7dc-2d71-4799-b91c-c64adb205104 not found`
      )
    );
  });

  it("should deletes an entity", async () => {
    const entity = new StubEntity({ name: "name value", price: 5 });
    await repository.insert(entity);

    await repository.delete(entity.id);
    expect(repository.items).toHaveLength(0);

    await repository.insert(entity);

    await repository.delete(entity.uniqueEntityId);
    expect(repository.items).toHaveLength(0);
  });
});
