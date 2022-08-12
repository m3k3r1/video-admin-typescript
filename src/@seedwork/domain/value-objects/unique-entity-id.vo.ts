import InvalidUUIDError from "@seedwork/domain/errors/invalid-uuid.error";
import { v4 as uuid, validate as UUIDvalidate } from "uuid";
import ValueObject from "./value-object";

export default class UniqueEntityId extends ValueObject<string> {
  constructor(readonly id?: string) {
    super(id || uuid());
    this.validate();
  }

  private validate() {
    const isValid = UUIDvalidate(this.value);
    if (!isValid) {
      throw new InvalidUUIDError();
    }
  }
}
