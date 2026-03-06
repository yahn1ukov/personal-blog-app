import { BaseError } from "./base.error";

export class ConflictError extends BaseError {
  constructor(entity: string) {
    super(409, `${entity} already exists`);
  }
}
