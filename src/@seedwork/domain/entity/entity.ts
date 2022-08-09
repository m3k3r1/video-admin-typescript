import UniqueEntityId from "../value-objects/unique-entity-id.vo";

export default abstract class Entity<Props> {
  public readonly unityEntityId: UniqueEntityId;

  constructor(public readonly props: Props, id?: UniqueEntityId) {
    this.unityEntityId = id || new UniqueEntityId();
  }

  get id(): string {
    return this.unityEntityId.value;
  }

  toJSON(): Required<{ id: string } & Props> {
    return {
      id: this.id,
      ...this.props,
    } as Required<{ id: string } & Props>;
  }
}
