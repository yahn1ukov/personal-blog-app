import { prisma } from "../utils/prisma";
import type { CategoryPayload } from "../utils/types/category.type";

class CategoryRepository {
  private readonly selectOptions = {
    name: true,
    slug: true,
  };

  async getAll(): Promise<CategoryPayload[]> {
    return prisma.category.findMany({
      select: this.selectOptions,
    });
  }
}

export const categoryRepository = new CategoryRepository();
