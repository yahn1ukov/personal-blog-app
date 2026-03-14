import { Prisma } from "~~/prisma/generated/client";
import { prisma, withPrismaErrorHandling } from "../utils/prisma";
import type { CreatePostPayload, PostWithRelationsPayload, UpdatePostPayload } from "../utils/types/post.type";

class PostRepository {
  private readonly selectOptions = {
    id: true,
    title: true,
    slug: true,
    content: true,
    coverImageURL: true,
    createdAt: true,
    author: {
      select: {
        firstName: true,
        lastName: true,
        username: true,
        avatarImageURL: true,
      },
    },
    categories: {
      select: {
        name: true,
        slug: true,
      },
    },
  };

  async create(authorId: string, payload: CreatePostPayload): Promise<void> {
    const { categories, ...data } = payload;

    await withPrismaErrorHandling("Post", () =>
      prisma.$transaction(async (tx) => {
        await tx.post.create({
          data: {
            ...data,
            author: { connect: { id: authorId } },
            categories: {
              connectOrCreate: categories.map((category) => ({
                where: { slug: category.slug },
                create: category,
              })),
            },
          },
        });
      }),
    );
  }

  async getAll(
    offset: number,
    limit: number,
    categories?: string[],
  ): Promise<{ count: number; posts: PostWithRelationsPayload[] }> {
    const where: Prisma.PostWhereInput = {};
    if (categories?.length) {
      where.categories = { some: { slug: { in: categories } } };
    }

    const [count, posts] = await Promise.all([
      prisma.post.count({ where }),
      prisma.post.findMany({
        where,
        take: limit,
        skip: offset,
        select: this.selectOptions,
        orderBy: { createdAt: "desc" },
      }),
    ]);

    return { count, posts };
  }

  async getByIdOrSlug(idOrSlug: string): Promise<PostWithRelationsPayload> {
    return withPrismaErrorHandling("Post", () =>
      prisma.post.findFirstOrThrow({
        where: { OR: [{ id: idOrSlug }, { slug: idOrSlug }] },
        select: this.selectOptions,
      }),
    );
  }

  async updateById(id: string, authorId: string, payload: UpdatePostPayload): Promise<PostWithRelationsPayload> {
    const { categories, ...data } = payload;

    return withPrismaErrorHandling("Post", () =>
      prisma.$transaction(async (tx) =>
        tx.post.update({
          where: { id, authorId },
          select: this.selectOptions,
          data: {
            ...data,
            ...(categories && {
              categories: {
                set: [],
                connectOrCreate: categories.map((category) => ({
                  where: { slug: category.slug },
                  create: category,
                })),
              },
            }),
          },
        }),
      ),
    );
  }

  async deleteById(id: string, authorId: string): Promise<Pick<PostWithRelationsPayload, "id">> {
    return withPrismaErrorHandling("Post", () =>
      prisma.post.delete({
        where: { id, authorId },
        select: { id: true },
      }),
    );
  }
}

export const postRepository = new PostRepository();
