import { type EventHandler, type EventHandlerRequest, getCookie } from "h3";
import { UnauthorizedError } from "../../errors";
import { defineController } from "../controller";
import { getAuthCookieName } from "./cookie";
import { verifyToken } from "./jwt";

export function defineProtectedController<T extends EventHandlerRequest, D>(handler: EventHandler<T, D>) {
  return defineController(async (event) => {
    const token = getCookie(event, getAuthCookieName());
    if (!token) {
      throw new UnauthorizedError();
    }

    event.context.user = await verifyToken(token);

    return handler(event);
  });
}
