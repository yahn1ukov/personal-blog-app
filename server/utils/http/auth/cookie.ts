import { deleteCookie, H3Event, setCookie } from "h3";

function getCookieOptions() {
  const config = useRuntimeConfig();

  return {
    httpOnly: config.jwtCookieHttpOnly,
    secure: config.jwtCookieSecure,
    maxAge: config.jwtCookieMaxAge,
    path: config.jwtCookiePath,
    sameSite: config.jwtCookieSameSite as "lax" | "strict" | "none",
  };
}

export function getAuthCookieName() {
  const config = useRuntimeConfig();

  return config.jwtCookieName;
}

export function setAuthCookie(event: H3Event, token: string) {
  setCookie(event, getAuthCookieName(), token, getCookieOptions());
}

export function clearAuthCookie(event: H3Event) {
  deleteCookie(event, getAuthCookieName(), getCookieOptions());
}
