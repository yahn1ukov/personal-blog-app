import { FILE_TYPE } from "~~/shared/constants";
import type {
  CreatePostRequestDto,
  DeletePostResponseDto,
  GetPostResponseDto,
  GetPostsQueryDto,
  GetPostsResponseDto,
  UpdatePostRequestDto,
  UpdatePostResponseDto,
} from "~~/shared/dto";
import { postRepository } from "../repositories/post.repository";
import { formatSlug } from "../utils/formatters";
import { PostMapper } from "../utils/mappers/post.mapper";
import type { CreateCategoryPayload } from "../utils/types/category.type";
import { fileService } from "./file.service";

class PostService {
  async create(authorId: string, dto: CreatePostRequestDto): Promise<void> {
    const { coverImage, categories, ...data } = dto;

    const slug = this.generateSlug(dto.title);
    const coverImageURL = coverImage && (await fileService.upload(authorId, FILE_TYPE.COVER, coverImage));
    const transformedCategories = this.transformCategoriesToPayload(categories);

    try {
      return await postRepository.create(authorId, {
        ...data,
        slug,
        coverImageURL,
        categories: transformedCategories,
      });
    } catch (error: unknown) {
      if (coverImageURL) {
        await fileService.remove(coverImageURL).catch(() => {});
      }

      throw error;
    }
  }

  async getAll(dto: GetPostsQueryDto): Promise<GetPostsResponseDto> {
    const { page = 1, limit = 6, categories } = dto;

    const offset = (page - 1) * limit;

    const { count, posts } = await postRepository.getAll(offset, limit, categories);
    const totalPages = Math.ceil(count / limit);

    return PostMapper.toPaginateDto(totalPages, posts);
  }

  async getByIdOrSlug(idOrSlug: string): Promise<GetPostResponseDto> {
    const post = await postRepository.getByIdOrSlug(idOrSlug);

    return PostMapper.toDto(post);
  }

  async updateById(id: string, authorId: string, dto: UpdatePostRequestDto): Promise<UpdatePostResponseDto> {
    const { coverImage, categories, ...data } = dto;

    const slug = data.title && this.generateSlug(data.title);
    const coverImageURL = coverImage && (await fileService.upload(authorId, FILE_TYPE.COVER, coverImage));
    const transformedCategories = categories && this.transformCategoriesToPayload(categories);

    try {
      const post = await postRepository.updateById(id, authorId, {
        ...data,
        slug,
        coverImageURL,
        categories: transformedCategories,
      });

      return PostMapper.toDto(post);
    } catch (error: unknown) {
      if (coverImageURL) {
        await fileService.remove(coverImageURL).catch(() => {});
      }

      throw error;
    }
  }

  async deleteById(id: string, authorId: string): Promise<DeletePostResponseDto> {
    return postRepository.deleteById(id, authorId);
  }

  private generateSlug(title: string): string {
    return `${Date.now()}-${formatSlug(title)}`;
  }

  private transformCategoriesToPayload(categories: Array<{ name: string }>): CreateCategoryPayload[] {
    return categories.map((category) => ({
      name: category.name,
      slug: formatSlug(category.name),
    }));
  }
}

export const postService = new PostService();
