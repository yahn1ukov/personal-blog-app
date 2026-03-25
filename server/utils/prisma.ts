import { PrismaPg } from "@prisma/adapter-pg";
import { Prisma, PrismaClient } from "~~/prisma/generated/client";
import { BadRequestError, ConflictError, InternalServerError, NotFoundError } from "~~/shared/errors";

function prismaClientSingleton() {
  const config = useRuntimeConfig();

  const pool = new PrismaPg({ connectionString: config.databaseURL });

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

export function handlePrismaError(error: unknown, entity: string = "Entity"): never {
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
