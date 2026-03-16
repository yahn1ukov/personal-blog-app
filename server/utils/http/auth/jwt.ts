import * as jose from "jose";
import { UnauthorizedError } from "~~/shared/errors";
import type { JwtPayload } from "../../types/auth.type";

function getJwtSecret() {
  const config = useRuntimeConfig();

  return new TextEncoder().encode(config.jwtSecret);
}

export async function generateToken(userId: string) {
  const config = useRuntimeConfig();

  const payload: JwtPayload = { id: userId };

  return new jose.SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(config.jwtExpiresIn)
    .setAudience(config.jwtAudience)
    .setIssuer(config.jwtIssuer)
    .sign(getJwtSecret());
}

export async function verifyToken(token: string): Promise<JwtPayload> {
  const config = useRuntimeConfig();

  const { payload } = await jose
    .jwtVerify(token, getJwtSecret(), {
      audience: config.jwtAudience,
      issuer: config.jwtIssuer,
    })
    .catch((error: unknown) => {
      if (error instanceof jose.errors.JWTExpired) {
        throw new UnauthorizedError("Token has expired");
      }
      if (error instanceof jose.errors.JWSInvalid || error instanceof jose.errors.JWTInvalid) {
        throw new UnauthorizedError("Invalid token");
      }

      throw new UnauthorizedError("Invalid token");
    });

  return {
    id: payload.id,
  } as JwtPayload;
}
