import { UnauthorizedError } from "./unauthorized.error";

export class InvalidTokenError extends UnauthorizedError {
  constructor() {
    super("Invalid token");
  }
}
