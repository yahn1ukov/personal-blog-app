import { PINIA_STORE_KEY } from "@/utils/constants/pinia.constant";
import { withRequestState, type RequestState } from "@/utils/http/request-state";
import type { GetPostResponseDto, GetPostsQueryDto, GetPostsResponseDto } from "~~/shared/dto/post.dto";

export const usePostStore = defineStore(PINIA_STORE_KEY.POST, () => {
  const posts = ref<GetPostsResponseDto>([]);
  const post = ref<GetPostResponseDto | null>(null);
  const state = reactive<RequestState>({
    isLoading: false,
    error: null,
  });

  async function getAll(query: GetPostsQueryDto) {
    const result = await withRequestState(state, () => $fetch<GetPostsResponseDto>("/api/posts", { query }));
    if (result.ok) {
      posts.value = result.data;

      return result.data;
    }

    return null;
  }

  async function getByIdOrSlug(idOrSlug: string) {
    post.value = null;

    const result = await withRequestState(state, () => $fetch<GetPostResponseDto>(`/api/posts/${idOrSlug}`));
    if (result.ok) {
      post.value = result.data;

      return result.data;
    }

    return null;
  }

  return {
    posts,
    post,
    state,
    getAll,
    getByIdOrSlug,
  };
});
