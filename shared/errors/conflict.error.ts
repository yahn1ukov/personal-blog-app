import { BaseError } from "./base.error";

export class ConflictError extends BaseError {
  constructor(entity: string) {
    super(`${entity} already exists`, 409);
  }
}
