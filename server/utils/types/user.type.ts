import { Prisma } from "~~/prisma/generated/client";

export type UserPayload = Prisma.UserGetPayload<{
  select: {
    id: true;
    firstName: true;
    lastName: true;
    username: true;
    avatarImageURL: true;
    createdAt: true;
  };
}>;

export type UserWithPasswordPayload = Pick<UserPayload, "id"> & {
  password: string;
};

export interface CreateUserPayload {
  firstName: string;
  lastName?: string;
  username: string;
  password: string;
}

export type UpdateUserPayload = Partial<
  Omit<CreateUserPayload, "password"> & {
    avatarImageURL?: string;
  }
>;
