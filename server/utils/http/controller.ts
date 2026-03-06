import type { EventHandler, EventHandlerRequest } from "h3";
import { BaseError } from "~~/shared/errors/base.error";

export function defineController<T extends EventHandlerRequest, D>(handler: EventHandler<T, D>) {
  return defineEventHandler(async (event) => {
    try {
      return await handler(event);
    } catch (error: unknown) {
      if (error instanceof BaseError) {
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
