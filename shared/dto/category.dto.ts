export interface CategoryDto {
  name: string;
  slug: string;
}

export type GetCategoriesResponseDto = CategoryDto[];
