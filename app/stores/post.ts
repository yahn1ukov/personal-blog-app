import { withRequestState, type RequestState } from "@/utils/request-state";
import type { GetPostResponseDto, GetPostsQueryDto, GetPostsResponseDto } from "~~/shared/dto/post.dto";

export const usePostStore = defineStore(PINIA_STORE_KEY.POST, () => {
  const posts = ref<GetPostsResponseDto>([]);
  const post = ref<GetPostResponseDto | null>(null);
  const state = reactive<RequestState>({
    isLoading: false,
    error: null,
  });

  async function getAll(query: GetPostsQueryDto) {
    const data = await withRequestState(state, () => $fetch<GetPostsResponseDto>("/api/posts", { query }));
    if (data) {
      posts.value = data;
    }
  }

  async function getByIdOrSlug(idOrSlug: string) {
    post.value = null;

    const data = await withRequestState(state, () => $fetch<GetPostResponseDto>(`/api/posts/${idOrSlug}`));
    if (data) {
      post.value = data;
    }
  }

  return {
    posts,
    post,
    state,
    getAll,
    getByIdOrSlug,
  };
});
