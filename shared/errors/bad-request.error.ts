import { BaseError } from "./base.error";

export class BadRequestError extends BaseError {
  constructor(message: string = "Invalid request") {
    super(message, 400);
  }
}
