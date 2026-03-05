import type { CategoryDto } from "~~/server/dto/category.dto";
import type { Category } from "../types/category.type";

export class CategoryMapper {
  static toDto(category: Category): CategoryDto {
    return {
      name: category.name,
      slug: category.slug,
    };
  }
}
