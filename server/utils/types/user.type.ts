import { Prisma } from "~~/prisma/generated/client";

export interface CreateUserPayload {
  firstName: string;
  lastName?: string;
  username: string;
  password: string;
}

export type User = Prisma.UserGetPayload<{
  select: {
    id: true;
    firstName: true;
    lastName: true;
    username: true;
    avatarImageURL: true;
    createdAt: true;
  };
}>;

export type UserWithPassword = Pick<User, "id"> & {
  password: string;
};

export type UpdateUserPayload = Partial<
  Omit<CreateUserPayload, "password"> & {
    avatarImageURL?: string;
  }
>;
