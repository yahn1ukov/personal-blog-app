export class AppError extends Error {
  constructor(
    public readonly code: number,
    message: string,
  ) {
    super(message);
  }
}

export class InternalServerError extends AppError {
  constructor(message: string = "An unexpected error occurred") {
    super(500, message);
  }
}

export class BadRequestError extends AppError {
  constructor(message: string = "Invalid request") {
    super(400, message);
  }
}

export class NotFoundError extends AppError {
  constructor(entity: string) {
    super(404, `${entity} not found`);
  }
}

export class ConflictError extends AppError {
  constructor(entity: string) {
    super(409, `${entity} already exists`);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = "Unauthorized") {
    super(401, message);
  }
}

export class TokenExpiredError extends UnauthorizedError {
  constructor() {
    super("Token has expired");
  }
}

export class InvalidTokenError extends UnauthorizedError {
  constructor() {
    super("Invalid token");
  }
}
