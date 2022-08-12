export type FieldErrors = {
  [field: string]: string[];
};

export interface FieldsValidatorInterface<ValidatedProps> {
  errors: FieldErrors;
  validatedData: ValidatedProps;
  validate(data: any): boolean;
}
