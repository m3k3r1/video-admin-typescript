import Entity from "../entity/entity";
import NotFoundError from "../errors/not-found-error";
import UniqueEntityId from "../value-objects/unique-entity-id.vo";
import { RepositoryInterface } from "./repository.interface";
import { SearchableRepositoryInterface } from "./searchable-repository.interface";

export abstract class InMemoryRepository<E extends Entity>
  implements RepositoryInterface<E>
{
  items: E[] = [];

  async insert(entity: E): Promise<void> {
    this.items.push(entity);
  }
  async update(entity: E): Promise<void> {
    await this._get(entity.id);
    const index = this.items.findIndex((item) => item.id === entity.id);
    this.items[index] = entity;
  }
  async delete(id: string | UniqueEntityId): Promise<void> {
    const _id = `${id}`;
    await this._get(_id);
    const index = this.items.findIndex((item) => item.id === _id);
    this.items.splice(index, 1);
  }
  async findById(id: string | UniqueEntityId): Promise<E> {
    const _id = `${id}`;
    return this._get(_id);
  }
  async findAll(): Promise<E[]> {
    return this.items;
  }

  protected async _get(id: string): Promise<E> {
    const entity = this.items.find((item) => item.id === id);

    if (!entity) {
      throw new NotFoundError(`Entity with id: ${id} not found`);
    }

    return entity;
  }
}

export abstract class InMemorySearchableRepository<E extends Entity>
  extends InMemoryRepository<E>
  implements SearchableRepositoryInterface<E, any, any>
{
  search(props: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
