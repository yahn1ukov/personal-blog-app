import { PrismaPg } from "@prisma/adapter-pg";
import { Prisma, PrismaClient } from "~~/prisma/generated/client";
import { AppError, BadRequestError, ConflictError, InternalServerError, NotFoundError } from "./errors";

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

export function handlePrismaError(error: unknown, entity: string = "Entity"): AppError {
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
  try {
    return await fn();
  } catch (error: unknown) {
    throw handlePrismaError(error, entity);
  }
}
