import { SearchableRepositoryInterface } from "@seedwork/domain/repository/searchable-repository.interface";
import { Category } from "../entities/category";

export default interface CategoryRepository
  extends SearchableRepositoryInterface<Category, any, any> {}
