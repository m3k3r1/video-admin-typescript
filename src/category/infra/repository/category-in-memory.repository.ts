import { InMemorySearchableRepository } from "@seedwork/domain/repository/in-memory.repository";
import { Category } from "category/domain/entities/category";
import CategoryRepository from "category/domain/repository/category.repository.interface";

export default class CategoryInMemoryRepository
  extends InMemorySearchableRepository<Category>
  implements CategoryRepository {}
