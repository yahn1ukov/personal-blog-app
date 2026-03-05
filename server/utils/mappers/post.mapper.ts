import type { PostDto } from "~~/server/dto/post.dto";
import { formatDateToISO, formatImageURL } from "../formatters";
import type { PostWithRelations } from "../types/post.type";

export class PostMapper {
  static toDetailDto(post: PostWithRelations): PostDto {
    return {
      id: post.id,
      title: post.title,
      slug: post.slug,
      content: post.content,
      coverImageURL: formatImageURL(post.coverImageURL),
      author: {
        firstName: post.author.firstName,
        lastName: post.author.lastName,
        avatarImageURL: formatImageURL(post.author.avatarImageURL),
      },
      categories: post.categories.map((category) => ({
        name: category.name,
        slug: category.slug,
      })),
      createdAt: formatDateToISO(post.createdAt),
    };
  }

  static toPreviewDto(post: PostWithRelations): Omit<PostDto, "author"> {
    const { author: _, ...preview } = this.toDetailDto(post);
    return preview;
  }
}
