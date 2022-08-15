import Entity from "../entity/entity";
import NotFoundError from "../errors/not-found-error";
import UniqueEntityId from "../value-objects/unique-entity-id.vo";
import { RepositoryInterface } from "./repository.interface";
import {
  SearchableRepositoryInterface,
  SearchParams,
  SearchResult,
} from "./searchable-repository.interface";

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
  async search(props: SearchParams): Promise<SearchResult<E>> {
    const filteredItems = await this.applyFilter(this.items, props.filter);
    const sortedItems = await this.applySort(
      filteredItems,
      props.sort,
      props.sort_dir
    );
    const paginatedItems = await this.applyPagination(
      sortedItems,
      props.page,
      props.per_page
    );

    return new SearchResult({
      items: paginatedItems,
      total: filteredItems.length,
      current_page: props.page,
      per_page: props.per_page,
      sort: props.sort,
      sort_dir: props.sort_dir,
      filter: props.filter,
    });
  }

  protected abstract applyFilter(
    items: E[],
    filter: string | null
  ): Promise<E[]>;

  protected abstract applySort(
    items: E[],
    sort: string | null,
    sortDir: SearchParams["sort_dir"]
  ): Promise<E[]>;

  protected abstract applyPagination(
    items: E[],
    page: SearchParams["page"],
    perPage: SearchParams["per_page"]
  ): Promise<E[]>;
}
