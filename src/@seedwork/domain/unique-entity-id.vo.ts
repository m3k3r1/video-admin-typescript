import InvalidUUIDError from "@seedwork/errors/invalid-uuid.error";
import { v4 as uuid, validate as UUIDvalidate } from "uuid";

export default class UniqueEntityId {
  constructor(public readonly id?: string) {
    this.id = id || uuid();
    this.validate();
  }

  private validate() {
    const isValid = UUIDvalidate(this.id);
    if (!isValid) {
      throw new InvalidUUIDError();
    }
  }
}
