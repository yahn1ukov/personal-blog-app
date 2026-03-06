import { UnauthorizedError } from "./unauthorized.error";

export class TokenExpiredError extends UnauthorizedError {
  constructor() {
    super("Token has expired");
  }
}
