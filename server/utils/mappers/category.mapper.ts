import type { CategoryDto } from "~~/shared/dto";
import type { CategoryPayload } from "../types/category.type";

export class CategoryMapper {
  static toDto(category: CategoryPayload): CategoryDto {
    return {
      name: category.name,
      slug: category.slug,
    };
  }
}
