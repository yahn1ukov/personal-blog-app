import type { GetPostsResponseDto, PostDto } from "~~/shared/dto/post.dto";
import { formatImageURL } from "../formatters";
import type { PostWithRelationsPayload } from "../types/post.type";

export class PostMapper {
  static toDto(post: PostWithRelationsPayload): PostDto {
    return {
      id: post.id,
      title: post.title,
      slug: post.slug,
      content: post.content,
      coverImageURL: formatImageURL(post.coverImageURL),
      author: {
        firstName: post.author.firstName,
        lastName: post.author.lastName,
        username: post.author.username,
        avatarImageURL: formatImageURL(post.author.avatarImageURL),
      },
      categories: post.categories.map((category) => ({
        name: category.name,
        slug: category.slug,
      })),
      createdAt: post.createdAt,
    };
  }

  static toPaginateDto(totalPages: number, posts: PostWithRelationsPayload[]): GetPostsResponseDto {
    return {
      totalPages,
      posts: posts.map((post) => this.toDto(post)),
    };
  }
}
