import { BaseError } from "./base.error";

export class NotFoundError extends BaseError {
  constructor(entity: string) {
    super(404, `${entity} not found`);
  }
}
