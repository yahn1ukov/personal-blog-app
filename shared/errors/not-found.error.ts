import { BaseError } from "./base.error";

export class NotFoundError extends BaseError {
  constructor(entity: string) {
    super(`${entity} not found`, 404);
  }
}
