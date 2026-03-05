import { prisma, withPrismaErrorHandling } from "../utils/prisma";
import type { CreateUserPayload, UpdateUserPayload, User, UserWithPassword } from "../utils/types/user.type";

class UserRepository {
  private readonly selectOptions = {
    id: true,
    firstName: true,
    lastName: true,
    username: true,
    avatarImageURL: true,
    createdAt: true,
  };

  async findByIdOrUsername(idOrUsername: string): Promise<UserWithPassword | null> {
    return prisma.user.findFirst({
      where: { OR: [{ id: idOrUsername }, { username: idOrUsername }] },
      select: {
        id: true,
        password: true,
      },
    });
  }

  async create(payload: CreateUserPayload): Promise<Pick<UserWithPassword, "id">> {
    return withPrismaErrorHandling("User", () =>
      prisma.user.create({
        data: payload,
        select: { id: true },
      }),
    );
  }

  async getByIdOrUsername(idOrUsername: string): Promise<User> {
    return withPrismaErrorHandling("User", () =>
      prisma.user.findFirstOrThrow({
        where: { OR: [{ id: idOrUsername }, { username: idOrUsername }] },
        select: this.selectOptions,
      }),
    );
  }

  async updateById(id: string, payload: UpdateUserPayload): Promise<void> {
    await withPrismaErrorHandling("User", () =>
      prisma.user.update({
        where: { id },
        data: payload,
      }),
    );
  }

  async updatePasswordById(id: string, hashedPassword: string): Promise<void> {
    await withPrismaErrorHandling("User", () =>
      prisma.user.update({
        where: { id },
        data: { password: hashedPassword },
      }),
    );
  }

  async deleteById(id: string): Promise<void> {
    await withPrismaErrorHandling("User", () =>
      prisma.user.delete({
        where: { id },
      }),
    );
  }
}

export const userRepository = new UserRepository();
