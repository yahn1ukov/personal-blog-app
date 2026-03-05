import type { GetCategoriesResponseDto } from "../dto/category.dto";
import { categoryRepository } from "../repositories/category.repository";
import { CategoryMapper } from "../utils/mappers/category.mapper";

class CategoryService {
  async getAll(): Promise<GetCategoriesResponseDto> {
    const categories = await categoryRepository.getAll();

    return categories.map((category) => CategoryMapper.toDto(category));
  }
}

export const categoryService = new CategoryService();
