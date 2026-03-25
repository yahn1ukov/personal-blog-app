import { BaseError } from "./base.error";

export class InternalServerError extends BaseError {
  constructor(message: string = "An unexpected error occurred") {
    super(message, 500);
  }
}
