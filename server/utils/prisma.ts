import { PrismaPg } from "@prisma/adapter-pg";
import { Prisma, PrismaClient } from "~~/prisma/generated/client";
import { BadRequestError } from "~~/shared/errors/bad-request.error";
import { BaseError } from "~~/shared/errors/base.error";
import { ConflictError } from "~~/shared/errors/conflict.error";
import { InternalServerError } from "~~/shared/errors/internal-server.error";
import { NotFoundError } from "~~/shared/errors/not-found.error";

function prismaClientSingleton() {
  const pool = new PrismaPg({ connectionString: process.env.DATABASE_URL! });

  return new PrismaClient({ adapter: pool });
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export function handlePrismaError(error: unknown, entity: string = "Entity"): BaseError {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        throw new ConflictError(entity);
      case "P2025":
        throw new NotFoundError(entity);
      case "P2003":
        throw new BadRequestError(`Related ${entity} not found`);
      default:
        throw new InternalServerError(`Database error during ${entity} operation`);
    }
  }

  throw new InternalServerError();
}

export async function withPrismaErrorHandling<T>(entity: string, fn: () => Promise<T>): Promise<T> {
  return fn().catch((error: unknown) => {
    throw handlePrismaError(error, entity);
  });
}
