import type { EventHandler, EventHandlerRequest } from "h3";
import { AppError } from "../errors";

export function defineController<T extends EventHandlerRequest, D>(handler: EventHandler<T, D>) {
  return defineEventHandler(async (event) => {
    try {
      return await handler(event);
    } catch (error: unknown) {
      if (error instanceof AppError) {
        throw createError({
          statusCode: error.code,
          message: error.message,
        });
      }

      throw createError({
        statusCode: 500,
        message: "Internal server error",
      });
    }
  });
}
