import * as jose from "jose";
import { InvalidTokenError } from "~~/shared/errors/invalid-token.error";
import { TokenExpiredError } from "~~/shared/errors/token-expired.error";
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
        throw new TokenExpiredError();
      }
      if (error instanceof jose.errors.JWSInvalid || error instanceof jose.errors.JWTInvalid) {
        throw new InvalidTokenError();
      }

      throw new InvalidTokenError();
    });

  return {
    id: payload.id,
  } as JwtPayload;
}
